/**
 * Utility functions for the anniversary page
 * This file re-exports all utilities from the modularized files
 */

import * as animationUtils from './animations.js';
import * as storageUtils from './storage.js';
import * as uiUtils from './ui.js';
import * as dateUtils from '../js/dateCalculator.js';

// Initialize toast styles
uiUtils.addToastStyles();

// Initialize keyframe animations
animationUtils.addKeyframes();

// Export all utilities
window.anniversaryUtils = {
	// Animation utilities
	createFloatingElement: animationUtils.createFloatingElement,
	addBackgroundElements: animationUtils.addBackgroundElements,
	initTimelineAnimation: animationUtils.initTimelineAnimation,
	highlightSpecialDates: animationUtils.highlightSpecialDates,

	// Storage utilities
	saveWish: storageUtils.saveWish,
	getWishes: storageUtils.getWishes,
	hasVisitedBefore: storageUtils.hasVisitedBefore,
	markAsVisited: storageUtils.markAsVisited,
	getVisitCount: storageUtils.getVisitCount,

	// UI utilities
	formatDateVN: dateUtils.formatDateVN || uiUtils.formatDateVN, // Use dateCalculator's formatDateVN if available
	scrollToElement: uiUtils.scrollToElement,
	showToast: uiUtils.showToast,
	shareContent: uiUtils.shareContent,

	// Date calculator utilities
	calculateRelationshipDuration: dateUtils.calculateRelationshipDuration,
	getCurrentAnniversaryYear: dateUtils.getCurrentAnniversaryYear,
	getFormattedDuration: dateUtils.getFormattedDuration,
	getDaysUntilAnniversary: dateUtils.getDaysUntilAnniversary,
	updateTimelineDates: dateUtils.updateTimelineDates,
};

export default window.anniversaryUtils;
