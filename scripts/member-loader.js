// Member Loader - Dynamically loads members from JSON data
// This makes it easy to update member information without editing HTML

document.addEventListener('DOMContentLoaded', function() {
    loadMembersFromJSON();
});

async function loadMembersFromJSON() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        
        // Load executive board
        loadExecutiveBoard(data.executiveBoard);
        
        // Load general members  
        loadGeneralMembers(data.generalMembers);
        
        // Load alumni
        loadAlumni(data.alumni);
        
        console.log('Members loaded successfully from JSON');
    } catch (error) {
        console.error('Error loading members:', error);
        // Fallback to existing HTML if JSON fails to load
    }
}

function loadExecutiveBoard(executives) {
    const boardGrid = document.querySelector('.board-grid');
    if (!boardGrid) return;
    
    // Clear existing content
    boardGrid.innerHTML = '';
    
    executives.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card executive';
        
        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}" onerror="this.src='assets/members/placeholder-member.jpg'">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-major">${member.major}</p>
                <p class="member-year">${member.year}</p>
                <div class="member-social">
                    <a href="${member.linkedin}" class="social-link"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        `;
        
        boardGrid.appendChild(memberCard);
    });
}

function loadGeneralMembers(members) {
    const membersGrid = document.querySelector('.members-grid');
    if (!membersGrid) return;
    
    // Clear existing general member cards (keep executive board)
    const generalCards = membersGrid.querySelectorAll('.member-card.general');
    generalCards.forEach(card => card.remove());
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card general ${member.category}`;
        memberCard.setAttribute('data-category', member.category);
        
        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}" onerror="this.src='assets/members/placeholder-member.jpg'">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-major">${member.major}</p>
                <p class="member-year">${member.year}</p>
                <p class="member-interest">${member.interest}</p>
            </div>
        `;
        
        membersGrid.appendChild(memberCard);
    });
}

function loadAlumni(alumni) {
    const alumniGrid = document.querySelector('.alumni-grid');
    if (!alumniGrid) return;
    
    // Clear existing content
    alumniGrid.innerHTML = '';
    
    alumni.forEach(member => {
        const alumniCard = document.createElement('div');
        alumniCard.className = 'alumni-card';
        
        alumniCard.innerHTML = `
            <div class="alumni-image">
                <img src="${member.image}" alt="${member.name}" onerror="this.src='assets/members/placeholder-member.jpg'">
            </div>
            <div class="alumni-info">
                <h3>${member.name}</h3>
                <p class="alumni-role">${member.role}</p>
                <p class="alumni-company">${member.company}</p>
                <p class="alumni-year">${member.year}</p>
                <div class="member-social">
                    <a href="${member.linkedin}" class="social-link"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        `;
        
        alumniGrid.appendChild(memberCard);
    });
}

// Function to export current member data (for backup/migration)
function exportMemberData() {
    const data = {
        executiveBoard: [],
        generalMembers: [],
        alumni: []
    };
    
    // Extract executive board data
    document.querySelectorAll('.board-grid .member-card').forEach(card => {
        const member = {
            name: card.querySelector('h3').textContent,
            role: card.querySelector('.member-role').textContent,
            major: card.querySelector('.member-major').textContent,
            year: card.querySelector('.member-year').textContent,
            image: card.querySelector('img').src,
            linkedin: card.querySelector('.social-link').href
        };
        data.executiveBoard.push(member);
    });
    
    // Extract general members data
    document.querySelectorAll('.members-grid .member-card.general').forEach(card => {
        const member = {
            name: card.querySelector('h3').textContent,
            major: card.querySelector('.member-major').textContent,
            year: card.querySelector('.member-year').textContent,
            interest: card.querySelector('.member-interest').textContent,
            image: card.querySelector('img').src,
            category: card.getAttribute('data-category')
        };
        data.generalMembers.push(member);
    });
    
    // Extract alumni data
    document.querySelectorAll('.alumni-grid .alumni-card').forEach(card => {
        const member = {
            name: card.querySelector('h3').textContent,
            role: card.querySelector('.alumni-role').textContent,
            company: card.querySelector('.alumni-company').textContent,
            year: card.querySelector('.alumni-year').textContent,
            image: card.querySelector('img').src,
            linkedin: card.querySelector('.social-link').href
        };
        data.alumni.push(member);
    });
    
    // Download as JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members-backup.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add export functionality to admin users (can be called from browser console)
window.exportMemberData = exportMemberData;
