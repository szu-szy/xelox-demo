/**
 * Header — klasa .is-scrolled po przewinięciu (cień/kompresja).
 * @package xelox
 */
export function initHeader() {
	const header = document.querySelector('[data-header]');
	if (!header) return;

	let ticking = false;
	const update = () => {
		const scrolled = window.scrollY > 8;
		header.classList.toggle('is-scrolled', scrolled);
		// <html>.is-scrolled → chowa topbar, header wjeżdża na górę (sticky bez topbara)
		document.documentElement.classList.toggle('is-scrolled', scrolled);
		ticking = false;
	};
	update();
	window.addEventListener('scroll', () => {
		if (!ticking) { requestAnimationFrame(update); ticking = true; }
	}, { passive: true });
}
