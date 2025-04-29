/**
 * UI utilities for the anniversary page
 */

// Format date to Vietnamese format
function formatDateVN(date) {
	const d = new Date(date);
	return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// Scroll to element smoothly
function scrollToElement(elementId) {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
	// Remove existing toast if present
	const existingToast = document.querySelector('.anniversary-toast');
	if (existingToast) {
		existingToast.remove();
	}

	const toast = document.createElement('div');
	toast.className = `anniversary-toast toast-${type}`;
	toast.textContent = message;

	document.body.appendChild(toast);

	// Show animation
	setTimeout(() => {
		toast.classList.add('show');
	}, 10);

	// Hide after duration
	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => {
			toast.remove();
		}, 300);
	}, duration);

	return toast;
}

// Share content using Web Share API or clipboard fallback
function shareContent(
	title = 'Kỷ Niệm 3 Năm Yêu',
	text = 'Hãy xem câu chuyện tình yêu của chúng tôi!',
	url = window.location.href
) {
	if (navigator.share) {
		navigator
			.share({
				title: title,
				text: text,
				url: url,
			})
			.then(() => {
				showToast('Đã chia sẻ thành công!', 'success');
			})
			.catch((error) => {
				console.log('Có lỗi khi chia sẻ:', error);
				showToast('Có lỗi khi chia sẻ', 'error');
			});
	} else {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				showToast('Đã sao chép liên kết vào clipboard!', 'success');
			})
			.catch(() => {
				showToast('Không thể sao chép liên kết', 'error');
			});
	}
}

// Add CSS for toast notifications
function addToastStyles() {
	if (document.getElementById('toast-styles')) return;

	const style = document.createElement('style');
	style.id = 'toast-styles';
	style.innerHTML = `
    .anniversary-toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(43, 45, 66, 0.9);
      color: white;
      padding: 12px 24px;
      border-radius: 30px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
      font-family: 'Montserrat', sans-serif;
    }
    
    .anniversary-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    
    .toast-success {
      background: rgba(46, 204, 113, 0.9);
    }
    
    .toast-error {
      background: rgba(231, 76, 60, 0.9);
    }
    
    .toast-info {
      background: rgba(52, 152, 219, 0.9);
    }
  `;
	document.head.appendChild(style);
}

export { formatDateVN, scrollToElement, showToast, shareContent, addToastStyles };
