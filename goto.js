window.addEventListener('load', () => {
	scrollToSectionFromUrl();
});

function scrollToSectionFromUrl() {
	const params = new URLSearchParams(window.location.search);
	const target = params.get('goto');

	if (!target) return;

	// 優先順序：data-section > id > name
	const selectorList = [
		`[data-section="${target}"]`,
		`#${CSS.escape(target)}`, // 確保 id 中特殊符號處理正確
		`[name="${target}"]`
	];

	for (const selector of selectorList) {
		const el = document.querySelector(selector);
		if (el) {
			el.scrollIntoView({ behavior: 'auto' }); // behavior: 'smooth' 滑順捲動
			break;
		}
	}
}
