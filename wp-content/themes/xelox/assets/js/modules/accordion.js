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
 * JS przełącza is-open + aria-expanded. Single-open: otwarcie jednej zamyka
 * pozostałe w obrębie tej samej sekcji [data-scope-acc] (jak Bootstrap collapse).
 */
export function initScopeAcc() {
	document.querySelectorAll('[data-scope-acc]').forEach((group) => {
		const rows = group.querySelectorAll('.xelox-scope-acc__row[aria-controls]');
		rows.forEach((btn) => {
			btn.addEventListener('click', () => {
				const item = btn.closest('.xelox-scope-acc__item');
				const willOpen = btn.getAttribute('aria-expanded') !== 'true';
				// Zamknij wszystkie w tej sekcji…
				rows.forEach((other) => {
					other.setAttribute('aria-expanded', 'false');
					const otherItem = other.closest('.xelox-scope-acc__item');
					if (otherItem) otherItem.classList.remove('is-open');
				});
				// …i otwórz klikniętą (jeśli była zamknięta — klik w otwartą ją zamyka).
				if (willOpen) {
					btn.setAttribute('aria-expanded', 'true');
					if (item) item.classList.add('is-open');
				}
			});
		});
	});
}
