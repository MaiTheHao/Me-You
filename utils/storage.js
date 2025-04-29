/**
 * Storage utilities for the anniversary page
 */

// Save a wish to localStorage
function saveWish(wish) {
	const wishes = getWishes();
	wishes.push({
		text: wish,
		timestamp: new Date().toISOString(),
	});
	localStorage.setItem('anniversary_wishes', JSON.stringify(wishes));
	return wishes.length;
}

// Get all wishes from localStorage
function getWishes() {
	const wishes = localStorage.getItem('anniversary_wishes');
	return wishes ? JSON.parse(wishes) : [];
}

// Check if user has visited before
function hasVisitedBefore() {
	return localStorage.getItem('anniversary_visited') === 'true';
}

// Mark as visited
function markAsVisited() {
	localStorage.setItem('anniversary_visited', 'true');
}

// Get total visit count
function getVisitCount() {
	const count = parseInt(localStorage.getItem('anniversary_visit_count') || '0', 10);
	localStorage.setItem('anniversary_visit_count', (count + 1).toString());
	return count + 1;
}

// Save preferences
function savePreference(key, value) {
	localStorage.setItem(`anniversary_pref_${key}`, JSON.stringify(value));
}

// Get preferences
function getPreference(key, defaultValue = null) {
	const value = localStorage.getItem(`anniversary_pref_${key}`);
	return value ? JSON.parse(value) : defaultValue;
}

export { saveWish, getWishes, hasVisitedBefore, markAsVisited, getVisitCount, savePreference, getPreference };
