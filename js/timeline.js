/**
 * Timeline section functionality
 */

// Initialize the timeline section
function initTimeline() {
	// Initialize animations for timeline cards
	anniversaryUtils.initTimelineAnimation();

	// Add click event to timeline images to show them in a modal
	const timelineImages = document.querySelectorAll('.timeline-image');
	timelineImages.forEach((image) => {
		image.addEventListener('click', () => {
			const imageUrl = image.style.backgroundImage.slice(4, -1).replace(/"/g, '');
			showImageModal(imageUrl);
		});
	});
}

// Create and show an image modal
function showImageModal(imageUrl) {
	// Create modal container
	const modal = document.createElement('div');
	modal.className = 'image-modal';

	// Create image element
	const img = document.createElement('img');
	img.src = imageUrl;
	img.alt = 'Timeline memory';

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

// Add modal styles
function addModalStyles() {
	const style = document.createElement('style');
	style.innerHTML = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .image-modal img {
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
	document.head.appendChild(style);
}

// Export timeline functions
export { initTimeline, addModalStyles };
