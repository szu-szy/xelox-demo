/**
 * Formularze wyceny na stronie głównej:
 *  – hero „szybka wycena" z polem dynamicznym zależnym od typu ubezpieczenia,
 *  – kalkulator krokowy (wybór typu → parametry).
 * @package xelox
 */

/** Hero: pole dynamiczne dopasowane do wybranego typu ubezpieczenia. */
const initHeroQuote = () => {
	const select = document.getElementById('hq-typ');
	if (!select) return;

	const dyn = document.getElementById('hq-dyn');
	const label = document.getElementById('hq-param-lbl');
	const input = document.getElementById('hq-param');
	const hidden = document.getElementById('hq-param-hidden');

	const FIELDS = {
		komunikacyjne: { label: 'Rok produkcji auta', placeholder: 'np. 2018', numeric: true },
		nieruchomosci: { label: 'Metraż (m²)', placeholder: 'np. 60', numeric: true },
		zycie: { label: 'Wiek', placeholder: 'np. 35', numeric: true },
		turystyczne: { label: 'Liczba osób', placeholder: 'np. 2', numeric: true },
		firmowe: { label: 'Branża działalności', placeholder: 'np. transport', numeric: false },
	};

	select.addEventListener('change', () => {
		const field = FIELDS[select.value];
		if (!field) {
			dyn.hidden = true;
			input.required = false;
			input.value = '';
			hidden.value = '';
			return;
		}
		label.textContent = field.label;
		input.placeholder = field.placeholder;
		hidden.value = field.label;
		input.setAttribute('inputmode', field.numeric ? 'numeric' : 'text');
		input.required = true;
		dyn.hidden = false;
	});
};

/** Kalkulator krokowy: wybór kafelka typu → krok z parametrami. */
const initCalculator = () => {
	const form = document.querySelector('.xelox-calc');
	if (!form) return;

	const typ = form.querySelector('#xelox-calc-typ');
	const chosen = form.querySelector('#xelox-calc-chosen');
	const card = form.closest('.xelox-calc-card');
	const progressLabel = card?.querySelector('[data-cp-label]') ?? null;
	const progressFill = card?.querySelector('[data-cp-fill]') ?? null;

	const setStep = (step) => {
		form.setAttribute('data-step', String(step));
		if (progressLabel) progressLabel.textContent = `Krok ${step} z 2`;
		if (progressFill) progressFill.style.width = step === 2 ? '100%' : '50%';
	};

	form.querySelectorAll('.xelox-calc__tile').forEach((tile) => {
		tile.addEventListener('click', () => {
			typ.value = tile.getAttribute('data-typ');
			if (chosen) chosen.textContent = tile.getAttribute('data-label');
			setStep(2);
			const firstInput = form.querySelector('.xelox-calc__step--2 input');
			if (firstInput) window.setTimeout(() => firstInput.focus(), 60);
		});
	});

	const back = form.querySelector('.xelox-calc__back');
	if (back) back.addEventListener('click', () => setStep(1));
};

export const initQuoteForms = () => {
	initHeroQuote();
	initCalculator();
};
