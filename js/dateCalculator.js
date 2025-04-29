/**
 * Date calculator for anniversary page
 */

// The relationship start date (30/4/2022)
const START_DATE = new Date(2022, 3, 30); // Month is 0-indexed in JavaScript (3 = April)

/**
 * Calculate years, months, and days since the relationship started
 * @returns {Object} Object containing years, months, days and total days
 */
function calculateRelationshipDuration() {
	const today = new Date();
	const yearDiff = today.getFullYear() - START_DATE.getFullYear();
	const monthDiff = today.getMonth() - START_DATE.getMonth();
	const dayDiff = today.getDate() - START_DATE.getDate();

	// Calculate total days
	const totalDays = Math.floor((today - START_DATE) / (1000 * 60 * 60 * 24));

	// Adjust for negative month/day differences
	let years = yearDiff;
	let months = monthDiff;
	let days = dayDiff;

	if (dayDiff < 0) {
		months--;
		// Get days in previous month
		const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
		days = lastMonth.getDate() + dayDiff;
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	return {
		years,
		months,
		days,
		totalDays,
	};
}

/**
 * Get the current anniversary year (1 for first year, 2 for second, etc.)
 * @returns {number} Current anniversary year
 */
function getCurrentAnniversaryYear() {
	const duration = calculateRelationshipDuration();
	return duration.years + 1; // +1 because we're in the next year
}

/**
 * Get the next anniversary date
 * @returns {Date} Date of next anniversary
 */
function getNextAnniversaryDate() {
	const today = new Date();
	const currentYear = today.getFullYear();

	// Create this year's anniversary date
	let nextAnniversary = new Date(currentYear, START_DATE.getMonth(), START_DATE.getDate());

	// If this year's anniversary has passed, use next year's
	if (today > nextAnniversary) {
		nextAnniversary = new Date(currentYear + 1, START_DATE.getMonth(), START_DATE.getDate());
	}

	return nextAnniversary;
}

/**
 * Get days remaining until next anniversary
 * @returns {number} Days until next anniversary
 */
function getDaysUntilAnniversary() {
	const today = new Date();
	const nextAnniversary = getNextAnniversaryDate();

	const diffTime = nextAnniversary - today;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
}

/**
 * Format duration as human-readable text
 * @returns {string} Formatted duration text
 */
function getFormattedDuration() {
	const duration = calculateRelationshipDuration();

	if (duration.years > 0) {
		if (duration.months > 0) {
			return `${duration.years} năm ${duration.months} tháng`;
		}
		return `${duration.years} năm`;
	} else if (duration.months > 0) {
		return `${duration.months} tháng ${duration.days} ngày`;
	} else {
		return `${duration.days} ngày`;
	}
}

/**
 * Generate a date object for each anniversary
 * @param {number} yearOffset - Years from start date (0 for first year, 1 for second, etc)
 * @returns {Date} Anniversary date
 */
function getAnniversaryDate(yearOffset = 0) {
	return new Date(START_DATE.getFullYear() + yearOffset, START_DATE.getMonth(), START_DATE.getDate());
}

/**
 * Format a date in VN format (DD/MM/YYYY)
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDateVN(date) {
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

/**
 * Update timeline cards with correct dates
 */
function updateTimelineDates() {
	const timelineCards = document.querySelectorAll('.timeline-card');

	// Skip if no timeline cards found
	if (!timelineCards.length) return;

	// First meeting date (start date)
	if (timelineCards[0]) {
		const firstMeetingDateElement = timelineCards[0].querySelector('.timeline-date');
		if (firstMeetingDateElement) {
			firstMeetingDateElement.textContent = formatDateVN(START_DATE);
		}
	}

	// First anniversary date
	if (timelineCards[1]) {
		const firstAnniversaryElement = timelineCards[1].querySelector('.timeline-date');
		if (firstAnniversaryElement) {
			const firstAnniversaryDate = getAnniversaryDate(1);
			firstAnniversaryElement.textContent = formatDateVN(firstAnniversaryDate);
		}
	}

	// Second anniversary date
	if (timelineCards[2]) {
		const secondAnniversaryElement = timelineCards[2].querySelector('.timeline-date');
		if (secondAnniversaryElement) {
			const secondAnniversaryDate = getAnniversaryDate(2);
			secondAnniversaryElement.textContent = formatDateVN(secondAnniversaryDate);
		}
	}

	// Date range for memorable moments
	if (timelineCards[3]) {
		const dateRangeElement = timelineCards[3].querySelector('.timeline-date');
		if (dateRangeElement) {
			dateRangeElement.textContent = `${START_DATE.getFullYear()} - ${new Date().getFullYear()}`;
		}
	}

	// Current anniversary date
	if (timelineCards[4]) {
		const currentAnniversaryElement = timelineCards[4].querySelector('.timeline-date');
		if (currentAnniversaryElement) {
			const currentYear = new Date().getFullYear();
			const currentAnniversaryDate = new Date(currentYear, START_DATE.getMonth(), START_DATE.getDate());

			currentAnniversaryElement.textContent = formatDateVN(currentAnniversaryDate);
			currentAnniversaryElement.classList.add('special-date');
		}
	}
}

/**
 * Update UI elements with correct anniversary information
 */
function updateAnniversaryUI() {
	// Update the counter in the heart-counter element
	const counterElement = document.querySelector('.heart-counter .counter');
	if (counterElement) {
		counterElement.textContent = getFormattedDuration();
	}

	// Update any year mentions in the page title or headings
	const mainTitle = document.querySelector('title');
	if (mainTitle) {
		mainTitle.textContent = `${getCurrentAnniversaryYear() - 1} Năm Yêu Thương`;
	}

	const heroHeading = document.querySelector('.hero h1');
	if (heroHeading) {
		heroHeading.textContent = `${getCurrentAnniversaryYear() - 1} Năm – Một Hành Trình Gọi Tên Hạnh Phúc`;
	}

	// Update special date in hero section
	const specialDateSpan = document.querySelector('.hero .special-date');
	if (specialDateSpan) {
		const dateString = `${START_DATE.getDate()}/${START_DATE.getMonth() + 1}`;
		specialDateSpan.textContent = dateString;
	}

	// Update countdown if available
	const daysUntilElement = document.getElementById('days-until');
	if (daysUntilElement) {
		const daysUntil = getDaysUntilAnniversary();
		if (daysUntil === 0) {
			daysUntilElement.textContent = 'Hôm nay là ngày kỷ niệm của chúng ta!';
		} else {
			daysUntilElement.textContent = `${daysUntil} ngày nữa đến kỷ niệm tiếp theo`;
		}
	}
}

export {
	calculateRelationshipDuration,
	getCurrentAnniversaryYear,
	getNextAnniversaryDate,
	getDaysUntilAnniversary,
	getFormattedDuration,
	updateAnniversaryUI,
	formatDateVN,
	updateTimelineDates,
};
