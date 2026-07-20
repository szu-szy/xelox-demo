/**
 * Entry ES module — ładuje moduły interakcji po DOM ready.
 * @package xelox
 */
import { initDrawer } from './modules/mobile-drawer.js';
import { initReveal } from './modules/scroll-reveal.js';
import { initHeader } from './modules/header.js';
import { initForms } from './modules/forms.js';
import { initAccordion, initScopeAcc } from './modules/accordion.js';
import { initCounters } from './modules/counters.js';
import { initReadingProgress } from './modules/reading-progress.js';
import { initExitIntent } from './modules/exit-intent.js';
import { initEffects } from './modules/effects.js';
import { initQuoteForms } from './modules/quote-form.js';

const boot = () => {
	initHeader();
	initDrawer();
	initReveal();
	initForms();
	initAccordion();
	initScopeAcc();
	initCounters();
	initReadingProgress();
	initExitIntent();
	initEffects();
	initQuoteForms();
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', boot);
} else {
	boot();
}
