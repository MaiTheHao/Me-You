/**
 * Wish section functionality
 */

// Initialize the wish section
function initWishSection() {
	// Display existing wishes if any
	displayExistingWishes();

	// Set up submit wish event
	const submitWish = document.getElementById('submit-wish');
	if (submitWish) {
		submitWish.addEventListener('click', handleWishSubmission);
	}

	// Set up textarea auto-resize
	const wishTextArea = document.getElementById('wish-text');
	if (wishTextArea) {
		wishTextArea.addEventListener('input', autoResizeTextarea);
	}
}

// Handle wish submission
function handleWishSubmission() {
	const wishText = document.getElementById('wish-text').value;
	if (wishText.trim()) {
		const totalWishes = anniversaryUtils.saveWish(wishText);
		showWishConfirmation(wishText);
		document.getElementById('wish-text').value = '';

		// Update stats if available
		const wishStats = document.getElementById('wish-stats');
		if (wishStats) {
			wishStats.textContent = `${totalWishes} lời chúc đã được gửi`;
		}
	} else {
		anniversaryUtils.showToast('Vui lòng nhập lời chúc của bạn', 'error');
	}
}

// Show wish confirmation
function showWishConfirmation(wish) {
	const wishDisplay = document.getElementById('wish-display');
	if (wishDisplay) {
		wishDisplay.textContent = wish;
		wishDisplay.style.display = 'block';

		// Create heart animation for the wish
		const wishBox = document.querySelector('.wish-box');
		for (let i = 0; i < 3; i++) {
			anniversaryUtils.createFloatingElement('heart', wishBox);
		}

		// Show thank you message
		anniversaryUtils.showToast('Cảm ơn vì lời chúc của bạn! ♥', 'success');
	}
}

// Display existing wishes
function displayExistingWishes() {
	const wishes = anniversaryUtils.getWishes();
	const wishList = document.getElementById('wish-list');
	if (!wishList || wishes.length === 0) return;

	// Clear existing content
	wishList.innerHTML = '';

	// Add a header if there are wishes
	if (wishes.length > 0) {
		const header = document.createElement('h3');
		header.textContent = 'Lời Chúc Từ Mọi Người';
		wishList.appendChild(header);
	}

	// Display the last 5 wishes
	const recentWishes = wishes.slice(-5).reverse();

	recentWishes.forEach((wish) => {
		const wishItem = document.createElement('div');
		wishItem.className = 'wish-item';

		const wishText = document.createElement('p');
		wishText.textContent = wish.text;

		const wishDate = document.createElement('small');
		wishDate.textContent = anniversaryUtils.formatDateVN(wish.timestamp);

		wishItem.appendChild(wishText);
		wishItem.appendChild(wishDate);
		wishList.appendChild(wishItem);
	});

	// Add stats
	const wishStats = document.createElement('p');
	wishStats.id = 'wish-stats';
	wishStats.textContent = `${wishes.length} lời chúc đã được gửi`;
	wishList.appendChild(wishStats);
}

// Auto-resize textarea based on content
function autoResizeTextarea(e) {
	const textarea = e.target;
	textarea.style.height = 'auto';
	textarea.style.height = textarea.scrollHeight + 'px';
}

// Add wish list styles
function addWishListStyles() {
	const style = document.createElement('style');
	style.innerHTML = `
        .wish-item {
            background: var(--champagne);
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 15px;
            text-align: left;
            position: relative;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            border-left: 3px solid var(--dusty-rose);
        }
        
        .wish-item p {
            margin-bottom: 5px;
            font-style: italic;
        }
        
        .wish-item small {
            color: var(--dusty-rose);
            display: block;
            text-align: right;
            font-size: 0.8rem;
        }
        
        #wish-stats {
            font-size: 0.9rem;
            color: var(--midnight-blue);
            margin-top: 10px;
            font-style: italic;
        }
    `;
	document.head.appendChild(style);
}

export { initWishSection, addWishListStyles };
