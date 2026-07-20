/**
 * Accordion (FAQ) — toggle aria-expanded + panel hidden. A11y.
 * @package xelox
 */
export function initAccordion() {
	document.querySelectorAll('.xelox-accordion').forEach((acc) => {
		const heads = acc.querySelectorAll('.xelox-accordion__head');
		heads.forEach((head) => {
			head.addEventListener('click', () => {
				const open = head.getAttribute('aria-expanded') === 'true';
				// (opcjonalnie) zamknij pozostałe — zostawiamy multi-open
				head.setAttribute('aria-expanded', String(!open));
				const panel = document.getElementById(head.getAttribute('aria-controls'));
				if (panel) panel.hidden = open;
			});
		});
	});
}

/**
 * Szuflady „Co obejmuje polisa?" (single-usluga) — animowane grid-rows w CSS,
 * JS przełącza tylko is-open + aria-expanded. Multi-open.
 */
export function initScopeAcc() {
	document.querySelectorAll('[data-scope-acc] .xelox-scope-acc__row[aria-controls]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const item = btn.closest('.xelox-scope-acc__item');
			const open = btn.getAttribute('aria-expanded') === 'true';
			btn.setAttribute('aria-expanded', String(!open));
			if (item) item.classList.toggle('is-open', !open);
		});
	});
}
