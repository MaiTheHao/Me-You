/**
 * Main JavaScript for the Anniversary Page
 */

import { initTimeline, addModalStyles } from './timeline.js';
import { initWishSection, addWishListStyles } from './wishes.js';
import { updateAnniversaryUI, updateTimelineDates } from './dateCalculator.js';

document.addEventListener('DOMContentLoaded', () => {
	// Update anniversary information
	updateAnniversaryUI();

	// Update timeline dates based on the real start date
	updateTimelineDates();

	// Add styles
	addModalStyles();
	addWishListStyles();

	// Initialize timeline and wish sections
	initTimeline();
	initWishSection();

	// Add background decorative elements
	addBackgroundElements();

	// Setup event listeners
	setupEventListeners();

	// Check if this is the first visit
	checkFirstVisit();

	// Highlight special dates
	anniversaryUtils.highlightSpecialDates();

	// Initialize gallery
	initGallery();
});

function addBackgroundElements() {
	const heroSection = document.querySelector('.hero');
	const messageSection = document.querySelector('.message');
	const wishSection = document.querySelector('.wish');
	const ctaSection = document.querySelector('.cta');
	const gallerySection = document.querySelector('.gallery');

	// Add decorative elements to hero section
	anniversaryUtils.addBackgroundElements(heroSection, {
		hearts: 7,
		stars: 5,
		flags: 3,
	});

	// Add hearts to message section
	anniversaryUtils.addBackgroundElements(messageSection, {
		hearts: 5,
		flowers: 3,
	});

	// Add stars to wish section
	anniversaryUtils.addBackgroundElements(wishSection, {
		stars: 3,
		hearts: 2,
	});

	// Add elements to CTA section
	anniversaryUtils.addBackgroundElements(ctaSection, {
		hearts: 4,
		flags: 2,
	});

	// Add elements to gallery section
	anniversaryUtils.addBackgroundElements(gallerySection, {
		stars: 3,
		flowers: 2,
	});
}

function setupEventListeners() {
	// Start journey button
	const startButton = document.getElementById('start-journey');
	if (startButton) {
		startButton.addEventListener('click', () => {
			anniversaryUtils.scrollToElement('timeline');
		});
	}

	// Share button
	const shareButton = document.getElementById('share-button');
	if (shareButton) {
		shareButton.addEventListener('click', () => {
			anniversaryUtils.shareContent();
		});
	}

	// Replay journey button
	const replayButton = document.getElementById('replay-button');
	if (replayButton) {
		replayButton.addEventListener('click', () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// Music toggle button
	const musicToggle = document.getElementById('music-toggle');
	if (musicToggle) {
		const bgMusic = document.getElementById('bg-music');
		musicToggle.addEventListener('click', () => {
			if (bgMusic.paused) {
				bgMusic.play();
				musicToggle.textContent = 'Tắt Nhạc';
				musicToggle.classList.add('active');
				anniversaryUtils.showToast('Đã bật nhạc nền', 'info');
			} else {
				bgMusic.pause();
				musicToggle.textContent = 'Bật Nhạc';
				musicToggle.classList.remove('active');
				anniversaryUtils.showToast('Đã tắt nhạc nền', 'info');
			}
		});
	}
}

function initGallery() {
	const galleryItems = document.querySelectorAll('.gallery-item');

	galleryItems.forEach((item) => {
		item.addEventListener('click', () => {
			const imageUrl = item.style.backgroundImage.slice(4, -1).replace(/"/g, '');
			showGalleryModal(imageUrl);
		});
	});
}

function showGalleryModal(imageUrl) {
	// Create modal container
	const modal = document.createElement('div');
	modal.className = 'image-modal';

	// Create image element
	const img = document.createElement('img');
	img.src = imageUrl;
	img.alt = 'Gallery image';

	// Create close button
	const closeBtn = document.createElement('button');
	closeBtn.className = 'modal-close';
	closeBtn.innerHTML = '×';
	closeBtn.addEventListener('click', () => {
		document.body.removeChild(modal);
	});

	// Append elements to modal
	modal.appendChild(img);
	modal.appendChild(closeBtn);

	// Append modal to body
	document.body.appendChild(modal);

	// Close modal when clicking outside the image
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			document.body.removeChild(modal);
		}
	});
}

function checkFirstVisit() {
	if (!anniversaryUtils.hasVisitedBefore()) {
		// First time visitor
		anniversaryUtils.markAsVisited();
		anniversaryUtils.showToast('Chào mừng đến với kỷ niệm của chúng tôi!', 'info', 5000);

		// Start the welcome animation
		setTimeout(() => {
			const hero = document.querySelector('.hero');
			if (hero) {
				hero.classList.add('welcome-animation');
			}
		}, 1000);
	} else {
		// Returning visitor
		const visitCount = anniversaryUtils.getVisitCount();
		if (visitCount > 1) {
			anniversaryUtils.showToast(`Cảm ơn bạn đã quay lại lần thứ ${visitCount}!`, 'success');
		}
	}
}
