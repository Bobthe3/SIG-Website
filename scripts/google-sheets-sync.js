// Google Sheets + Drive Automation for SIG Website
// Automatically syncs member data and photos from Google Workspace

class GoogleSheetsSync {
    constructor(config = {}) {
        this.sheetsApiKey = config.sheetsApiKey || '';
        this.spreadsheetId = config.spreadsheetId || '';
        this.driveApiKey = config.driveApiKey || '';
        this.photoFolderId = config.photoFolderId || '';
        this.sheets = {
            executives: config.executiveSheetName || 'Executive Board',
            members: config.memberSheetName || 'General Members', 
            alumni: config.alumniSheetName || 'Alumni'
        };
        this.lastSync = localStorage.getItem('lastSheetsSync') || 0;
        this.syncInterval = config.syncInterval || 30 * 60 * 1000; // 30 minutes
    }

    // Initialize the sync system
    async initialize() {
        console.log('🔄 Initializing Google Sheets sync...');
        
        // Check if we have required API keys
        if (!this.sheetsApiKey || !this.spreadsheetId) {
            console.warn('⚠️ Google Sheets API credentials not configured');
            this.showConfigurationHelper();
            return;
        }

        // Perform initial sync
        await this.syncData();

        // Set up automatic syncing
        this.startAutoSync();

        console.log('✅ Google Sheets sync initialized successfully');
    }

    // Sync data from Google Sheets
    async syncData() {
        try {
            console.log('📊 Syncing member data from Google Sheets...');
            
            const memberData = {
                executiveBoard: await this.fetchSheetData(this.sheets.executives),
                generalMembers: await this.fetchSheetData(this.sheets.members),
                alumni: await this.fetchSheetData(this.sheets.alumni)
            };

            // Process and sync photos
            await this.syncPhotos(memberData);

            // Update local member data
            await this.updateMemberData(memberData);

            // Update last sync time
            localStorage.setItem('lastSheetsSync', Date.now());
            
            this.showSyncStatus('✅ Member data synced successfully', 'success');
            
            return memberData;

        } catch (error) {
            console.error('❌ Failed to sync Google Sheets data:', error);
            this.showSyncStatus('❌ Sync failed: ' + error.message, 'error');
            throw error;
        }
    }

    // Fetch data from a specific Google Sheet
    async fetchSheetData(sheetName) {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${encodeURIComponent(sheetName)}?key=${this.sheetsApiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${sheetName} data: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.values || data.values.length < 2) {
            console.warn(`⚠️ No data found in ${sheetName} sheet`);
            return [];
        }

        // Convert rows to objects using first row as headers
        const headers = data.values[0];
        const rows = data.values.slice(1);

        return rows.map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = row[index] ? row[index].trim() : '';
            });
            return obj;
        });
    }

    // Sync photos from Google Drive
    async syncPhotos(memberData) {
        console.log('📸 Syncing photos from Google Drive...');

        const allMembers = [
            ...memberData.executiveBoard,
            ...memberData.generalMembers,
            ...memberData.alumni
        ];

        for (const member of allMembers) {
            await this.syncMemberPhoto(member);
        }
    }

    // Sync individual member photo
    async syncMemberPhoto(member) {
        const photoFilename = member['Photo Filename'] || member['Image_Filename'] || '';
        if (!photoFilename) return;

        try {
            // Search for photo in Google Drive
            const photo = await this.findPhotoInDrive(photoFilename);
            
            if (photo) {
                // Download and cache photo locally
                await this.downloadAndCachePhoto(photo, photoFilename);
                member.localPhotoPath = `assets/members/${photoFilename}`;
            } else {
                console.warn(`⚠️ Photo not found in Drive: ${photoFilename}`);
                member.localPhotoPath = 'assets/members/placeholder-member.jpg';
            }

        } catch (error) {
            console.error(`❌ Failed to sync photo for ${member.Name}: ${error.message}`);
            member.localPhotoPath = 'assets/members/placeholder-member.jpg';
        }
    }

    // Find photo in Google Drive folder
    async findPhotoInDrive(filename) {
        if (!this.driveApiKey || !this.photoFolderId) {
            return null;
        }

        const query = `name='${filename}' and parents in '${this.photoFolderId}'`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${this.driveApiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Drive API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.files && data.files.length > 0 ? data.files[0] : null;
    }

    // Download and cache photo from Google Drive
    async downloadAndCachePhoto(photo, filename) {
        // Create a public link for the photo
        const photoUrl = `https://drive.google.com/uc?id=${photo.id}&export=download`;
        
        // In a real implementation, you'd download and save the file
        // For now, we'll use the Drive URL directly
        this.cachedPhotos = this.cachedPhotos || {};
        this.cachedPhotos[filename] = photoUrl;
        
        console.log(`📷 Cached photo: ${filename}`);
    }

    // Update member data with synced information
    async updateMemberData(memberData) {
        // Transform Google Sheets data to website format
        const websiteData = {
            executiveBoard: memberData.executiveBoard.map(member => ({
                name: member.Name || '',
                role: member.Role || '',
                major: member.Major || '',
                year: member.Year || '',
                image: member.localPhotoPath || 'assets/members/placeholder-member.jpg',
                linkedin: member['LinkedIn URL'] || member.LinkedIn || '#'
            })),
            generalMembers: memberData.generalMembers.map(member => ({
                name: member.Name || '',
                major: member.Major || '',
                year: member.Year || '',
                interest: member.Interest || member['Interest Area'] || '',
                image: member.localPhotoPath || 'assets/members/placeholder-member.jpg',
                category: (member.Category || member.Year || '').toLowerCase()
            })),
            alumni: memberData.alumni.map(member => ({
                name: member.Name || '',
                role: member['Current Role'] || member.Role || '',
                company: member.Company || '',
                year: member['Graduation Year'] || member.Year || '',
                image: member.localPhotoPath || 'assets/members/placeholder-member.jpg',
                linkedin: member['LinkedIn URL'] || member.LinkedIn || '#'
            }))
        };

        // Save to local storage for immediate use
        localStorage.setItem('syncedMemberData', JSON.stringify(websiteData));

        // Trigger member reload if on members page
        if (window.location.pathname.includes('members.html')) {
            this.reloadMembers(websiteData);
        }

        return websiteData;
    }

    // Reload members with new data
    reloadMembers(memberData) {
        // Clear existing members
        const boardGrid = document.querySelector('.board-grid');
        const membersGrid = document.querySelector('.members-grid');
        const alumniGrid = document.querySelector('.alumni-grid');

        if (boardGrid) {
            this.loadExecutiveBoard(memberData.executiveBoard, boardGrid);
        }

        if (membersGrid) {
            // Remove existing general members
            const generalCards = membersGrid.querySelectorAll('.member-card.general');
            generalCards.forEach(card => card.remove());
            
            this.loadGeneralMembers(memberData.generalMembers, membersGrid);
        }

        if (alumniGrid) {
            this.loadAlumni(memberData.alumni, alumniGrid);
        }

        console.log('🔄 Members reloaded with synced data');
    }

    // Load executive board members
    loadExecutiveBoard(executives, container) {
        container.innerHTML = '';
        
        executives.forEach(member => {
            const memberCard = this.createMemberCard(member, 'executive');
            container.appendChild(memberCard);
        });
    }

    // Load general members
    loadGeneralMembers(members, container) {
        members.forEach(member => {
            const memberCard = this.createMemberCard(member, 'general');
            memberCard.setAttribute('data-category', member.category);
            container.appendChild(memberCard);
        });
    }

    // Load alumni
    loadAlumni(alumni, container) {
        container.innerHTML = '';
        
        alumni.forEach(member => {
            const alumniCard = this.createAlumniCard(member);
            container.appendChild(alumniCard);
        });
    }

    // Create member card element
    createMemberCard(member, type) {
        const card = document.createElement('div');
        card.className = `member-card ${type}`;
        
        const photoUrl = this.getPhotoUrl(member.image);
        
        card.innerHTML = `
            <div class="member-image">
                <img src="${photoUrl}" alt="${member.name}" onerror="this.src='assets/members/placeholder-member.jpg'">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                ${member.role ? `<p class="member-role">${member.role}</p>` : ''}
                <p class="member-major">${member.major}</p>
                <p class="member-year">${member.year}</p>
                ${member.interest ? `<p class="member-interest">${member.interest}</p>` : ''}
                <div class="member-social">
                    <a href="${member.linkedin}" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        `;
        
        return card;
    }

    // Create alumni card element
    createAlumniCard(member) {
        const card = document.createElement('div');
        card.className = 'alumni-card';
        
        const photoUrl = this.getPhotoUrl(member.image);
        
        card.innerHTML = `
            <div class="alumni-image">
                <img src="${photoUrl}" alt="${member.name}" onerror="this.src='assets/members/placeholder-member.jpg'">
            </div>
            <div class="alumni-info">
                <h3>${member.name}</h3>
                <p class="alumni-role">${member.role}</p>
                <p class="alumni-company">${member.company}</p>
                <p class="alumni-year">${member.year}</p>
                <div class="member-social">
                    <a href="${member.linkedin}" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        `;
        
        return card;
    }

    // Get photo URL (handles cached Drive photos)
    getPhotoUrl(imagePath) {
        const filename = imagePath.split('/').pop();
        
        // Check if we have a cached Google Drive URL
        if (this.cachedPhotos && this.cachedPhotos[filename]) {
            return this.cachedPhotos[filename];
        }
        
        return imagePath;
    }

    // Start automatic syncing
    startAutoSync() {
        setInterval(async () => {
            const timeSinceLastSync = Date.now() - parseInt(this.lastSync);
            
            if (timeSinceLastSync >= this.syncInterval) {
                console.log('🔄 Performing automatic sync...');
                await this.syncData();
            }
        }, 5 * 60 * 1000); // Check every 5 minutes
    }

    // Show sync status to users
    showSyncStatus(message, type = 'info') {
        // Create or update status indicator
        let statusElement = document.getElementById('sync-status');
        
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = 'sync-status';
            statusElement.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 12px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(statusElement);
        }

        // Set colors based on type
        const colors = {
            success: { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
            error: { bg: '#fecaca', text: '#991b1b', border: '#ef4444' },
            info: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' }
        };

        const color = colors[type] || colors.info;
        statusElement.style.backgroundColor = color.bg;
        statusElement.style.color = color.text;
        statusElement.style.borderLeft = `4px solid ${color.border}`;
        statusElement.textContent = message;

        // Show the status
        setTimeout(() => {
            statusElement.style.transform = 'translateX(0)';
        }, 100);

        // Hide after 5 seconds
        setTimeout(() => {
            statusElement.style.transform = 'translateX(100%)';
        }, 5000);
    }

    // Show configuration helper for setup
    showConfigurationHelper() {
        console.log(`
🔧 Google Sheets Sync Configuration Needed

To enable automatic member sync, you need to:

1. Get Google Sheets API Key:
   - Go to Google Cloud Console
   - Enable Sheets API
   - Create API key

2. Get your Spreadsheet ID:
   - Open your Google Sheet
   - Copy ID from URL: docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit

3. Get Google Drive API Key (for photos):
   - Enable Drive API in Google Cloud Console
   - Get your photo folder ID from Drive URL

4. Configure the system:
   googleSheetsSync.configure({
       sheetsApiKey: 'your_sheets_api_key',
       spreadsheetId: 'your_spreadsheet_id',
       driveApiKey: 'your_drive_api_key',
       photoFolderId: 'your_drive_folder_id'
   });

See GOOGLE-SHEETS-SETUP.md for detailed instructions.
        `);
    }

    // Configure API keys (for admin use)
    configure(config) {
        Object.assign(this, config);
        localStorage.setItem('googleSheetsConfig', JSON.stringify(config));
        console.log('✅ Google Sheets sync configured');
    }

    // Load saved configuration
    loadConfiguration() {
        const saved = localStorage.getItem('googleSheetsConfig');
        if (saved) {
            const config = JSON.parse(saved);
            Object.assign(this, config);
        }
    }
}

// Initialize Google Sheets sync when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on members page or pages that need member data
    if (document.querySelector('.board-grid, .members-grid, .alumni-grid')) {
        
        window.googleSheetsSync = new GoogleSheetsSync();
        
        // Load saved configuration
        window.googleSheetsSync.loadConfiguration();
        
        // Initialize sync system
        window.googleSheetsSync.initialize();
    }
});

// Expose for admin configuration
window.GoogleSheetsSync = GoogleSheetsSync;
