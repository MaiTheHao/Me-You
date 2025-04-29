/**
 * Animation utilities for the anniversary page
 */

// Create element with floating animation
function createFloatingElement(type, parent) {
	const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	element.classList.add('bg-icon');

	let viewBox, path, className;

	if (type === 'heart') {
		viewBox = '0 0 24 24';
		path =
			'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
		className = 'heart';
	} else if (type === 'star') {
		viewBox = '0 0 24 24';
		path = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';
		className = 'star';
	} else if (type === 'flag') {
		viewBox = '0 0 24 24';
		path = 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z';
		className = 'flag';
	} else if (type === 'flower') {
		viewBox = '0 0 24 24';
		path =
			'M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M15.89,8.14C15.5,7.46 15,6.86 14.3,6.4L12.33,9.75L16.13,12.67L18.56,10.85C18.11,9.77 17.11,8.67 15.89,8.14M6.13,8.15C4.9,8.67 3.91,9.77 3.44,10.85L5.87,12.67L9.67,9.75L7.7,6.4C7.03,6.86 6.5,7.46 6.13,8.14M18,13C17.7,13 17.4,13.1 17.18,13.23L12,16.25L6.82,13.23C6.61,13.1 6.32,13 6,13H5.55L12,20.4L18.45,13H18M1,22H3V20H1V22M5,22H7V20H5V22M9,22H11V20H9V22M13,22H15V20H13V22M17,22H19V20H17V22M21,22H23V20H21V22Z';
		className = 'flower';
	}

	element.setAttribute('width', Math.floor(Math.random() * 30) + 20);
	element.setAttribute('height', Math.floor(Math.random() * 30) + 20);
	element.setAttribute('viewBox', viewBox);
	element.classList.add(className);

	const pathElem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	pathElem.setAttribute('d', path);
	element.appendChild(pathElem);

	// Random position
	element.style.top = `${Math.random() * 80}%`;
	element.style.left = `${Math.random() * 80}%`;

	// Random animation duration
	const duration = Math.floor(Math.random() * 15) + 10;
	element.style.animation = `float ${duration}s infinite ease-in-out`;

	// Random delay
	element.style.animationDelay = `${Math.random() * 5}s`;

	parent.appendChild(element);
	return element;
}

// Add background elements to a section
function addBackgroundElements(section, config = {}) {
	const { hearts = 5, stars = 3, flags = 0, flowers = 0 } = config;

	// Add decorative elements
	for (let i = 0; i < hearts; i++) {
		createFloatingElement('heart', section);
	}

	for (let i = 0; i < stars; i++) {
		createFloatingElement('star', section);
	}

	for (let i = 0; i < flags; i++) {
		createFloatingElement('flag', section);
	}

	for (let i = 0; i < flowers; i++) {
		createFloatingElement('flower', section);
	}
}

// Initialize timeline fade-in animations
function initTimelineAnimation() {
	const cards = document.querySelectorAll('.timeline-card');
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		},
		{ threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
	);

	cards.forEach((card) => observer.observe(card));
}

// Add animation to special date mentions
function highlightSpecialDates() {
	const specialDateElements = document.querySelectorAll('.special-date');
	specialDateElements.forEach((element) => {
		element.style.color = 'var(--accent-color)';
		element.style.fontWeight = 'bold';
		element.style.display = 'inline-block';
		element.style.animation = 'pulse 2s infinite';
	});
}

// Create keyframes for animations
function addKeyframes() {
	if (document.getElementById('anniversary-keyframes')) return;

	const style = document.createElement('style');
	style.id = 'anniversary-keyframes';
	style.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes heartBeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.3); }
      28% { transform: scale(1); }
      42% { transform: scale(1.3); }
      70% { transform: scale(1); }
    }
  `;
	document.head.appendChild(style);
}

export { createFloatingElement, addBackgroundElements, initTimelineAnimation, highlightSpecialDates, addKeyframes };
