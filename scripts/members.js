// Members page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Member filtering functionality
    const filterButtons = document.querySelectorAll('.category-filters .filter-btn');
    const memberCards = document.querySelectorAll('.member-card.general');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter members
            memberCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Update visible count
            updateMemberCount(filterValue);
        });
    });

    // Update member count display
    function updateMemberCount(filter) {
        const totalMembers = document.querySelectorAll('.member-card.general').length;
        const visibleMembers = filter === 'all' ? totalMembers : 
            document.querySelectorAll(`.member-card.general[data-category*="${filter}"]`).length;
        
        // Create or update count display
        let countDisplay = document.querySelector('.member-count');
        if (!countDisplay) {
            countDisplay = document.createElement('p');
            countDisplay.className = 'member-count';
            countDisplay.style.cssText = `
                text-align: center;
                color: var(--text-secondary);
                font-size: var(--font-size-sm);
                margin-bottom: var(--spacing-6);
            `;
            document.querySelector('.members-grid').parentNode.insertBefore(countDisplay, document.querySelector('.members-grid'));
        }
        
        countDisplay.textContent = `Showing ${visibleMembers} of ${totalMembers} members`;
    }

    // Initial count
    updateMemberCount('all');

    // Member card click handlers for more details
    const allMemberCards = document.querySelectorAll('.member-card');
    allMemberCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on social links
            if (e.target.closest('.member-social')) return;
            
            const memberName = card.querySelector('h3').textContent;
            const memberRole = card.querySelector('.member-role, .alumni-role')?.textContent || 'Member';
            const memberMajor = card.querySelector('.member-major, .alumni-company')?.textContent || '';
            const memberYear = card.querySelector('.member-year, .alumni-year')?.textContent || '';
            const memberInterest = card.querySelector('.member-interest')?.textContent || '';
            
            showMemberModal(memberName, memberRole, memberMajor, memberYear, memberInterest);
        });
    });

    // Member modal functionality
    function showMemberModal(name, role, major, year, interest) {
        const modal = document.createElement('div');
        modal.className = 'member-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${name}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="member-details">
                            <p><strong>Role:</strong> ${role}</p>
                            ${major ? `<p><strong>Major/Company:</strong> ${major}</p>` : ''}
                            ${year ? `<p><strong>Year:</strong> ${year}</p>` : ''}
                            ${interest ? `<p><strong>Interest:</strong> ${interest}</p>` : ''}
                        </div>
                        <div class="member-bio">
                            <p><em>Member bio and additional information would be displayed here.</em></p>
                            <p>To connect with ${name.split(' ')[0]}, please reach out through our organization or use the contact information below.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary">Connect</button>
                        <button class="btn btn-secondary modal-close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalOverlay = modal.querySelector('.modal-overlay');
        modalOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            padding: 24px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 24px;
        `;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.cssText = `
            padding: 0 24px;
            line-height: 1.6;
        `;

        const memberDetails = modal.querySelector('.member-details');
        memberDetails.style.cssText = `
            background: var(--gray-50);
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 16px;
        `;

        const modalFooter = modal.querySelector('.modal-footer');
        modalFooter.style.cssText = `
            padding: 24px;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            border-top: 1px solid #e5e7eb;
            margin-top: 24px;
        `;

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Close modal handlers
        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }

        closeBtn.addEventListener('click', closeModal);
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Connect button handler
        modal.querySelector('.btn-primary').addEventListener('click', function() {
            window.location.href = 'mailto:sustainableinvestment@ucsd.edu?subject=Connect with ' + encodeURIComponent(name);
        });
    }

    // Search functionality
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'member-search';
        searchContainer.style.cssText = `
            margin-bottom: var(--spacing-6);
            text-align: center;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search members by name, major, or interest...';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: var(--spacing-3);
            border: 2px solid var(--gray-300);
            border-radius: var(--radius-md);
            font-size: var(--font-size-base);
            transition: border-color 0.3s ease;
        `;

        searchInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-green)';
        });

        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'var(--gray-300)';
        });

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            memberCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const major = card.querySelector('.member-major, .alumni-company')?.textContent.toLowerCase() || '';
                const interest = card.querySelector('.member-interest')?.textContent.toLowerCase() || '';
                const year = card.querySelector('.member-year, .alumni-year')?.textContent.toLowerCase() || '';
                
                const isVisible = name.includes(searchTerm) || 
                                major.includes(searchTerm) || 
                                interest.includes(searchTerm) ||
                                year.includes(searchTerm);
                
                if (isVisible) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (!isVisible) card.style.display = 'none';
                    }, 300);
                }
            });

            // Update count for search results
            const visibleCards = Array.from(memberCards).filter(card => 
                card.style.display !== 'none'
            );
            updateSearchCount(visibleCards.length, memberCards.length);
        });

        searchContainer.appendChild(searchInput);
        
        // Insert search before member grid
        const membersGrid = document.querySelector('.members-grid');
        membersGrid.parentNode.insertBefore(searchContainer, membersGrid);
    }

    function updateSearchCount(visible, total) {
        let countDisplay = document.querySelector('.member-count');
        if (countDisplay) {
            countDisplay.textContent = `Showing ${visible} of ${total} members`;
        }
    }

    // Add search functionality
    addSearchFunctionality();

    // Add hover effects to member cards
    allMemberCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        card.style.cursor = 'pointer';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        });
    });

    // Social link click prevention for card modal
    const socialLinks = document.querySelectorAll('.member-social .social-link, .social-links .social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            // Add placeholder functionality for social links
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('linkedin') ? 'LinkedIn' : 
                           this.querySelector('i').className.includes('envelope') ? 'Email' : 'Social';
            alert(`${platform} profile would open here.`);
        });
    });

    // Add join button functionality
    const joinButton = document.querySelector('.join-section .btn-primary');
    if (joinButton) {
        joinButton.addEventListener('click', function(e) {
            e.preventDefault();
            showJoinModal();
        });
    }

    function showJoinModal() {
        const modal = document.createElement('div');
        modal.className = 'join-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Join SIG</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Thank you for your interest in joining the Sustainable Investment Group!</p>
                        <p>To apply for membership, please send us an email with the following information:</p>
                        <ul style="text-align: left; margin: 16px 0; padding-left: 20px;">
                            <li>Your name and year</li>
                            <li>Major and academic interests</li>
                            <li>Why you're interested in sustainable investing</li>
                            <li>Any relevant experience or goals</li>
                        </ul>
                        <p>We review applications on a rolling basis and will get back to you within a week.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="window.location.href='mailto:sustainableinvestment@ucsd.edu?subject=SIG Membership Application'">Send Application</button>
                        <button class="btn btn-secondary modal-close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Apply modal styles (reusing from events.js pattern)
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalOverlay = modal.querySelector('.modal-overlay');
        modalOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        // Apply other modal styles...
        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            padding: 24px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 24px;
        `;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.cssText = `
            padding: 0 24px;
            line-height: 1.6;
            color: #6b7280;
        `;

        const modalFooter = modal.querySelector('.modal-footer');
        modalFooter.style.cssText = `
            padding: 24px;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            border-top: 1px solid #e5e7eb;
            margin-top: 24px;
        `;

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Close modal handlers
        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }

        closeBtn.addEventListener('click', closeModal);
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    console.log('Members page scripts loaded successfully!');
});
