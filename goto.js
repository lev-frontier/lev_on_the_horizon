window.addEventListener('load', () => {
	scrollToSectionFromUrl();
});

function scrollToSectionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const target = params.get('goto');

  if (!target) return;

  const selectorList = [
    `[data-section="${target}"]`,
    `#${CSS.escape(target)}`,
    `[name="${target}"]`
  ];

  let el = null;

  // 先用 selectorList 搜尋精確屬性
  for (const selector of selectorList) {
    el = document.querySelector(selector);
    if (el) break;
  }

  // 若無結果，再用文字比對 data-section 元素
  if (!el) {
    const allDataSection = document.querySelectorAll('[data-section]');
    for (const candidate of allDataSection) {
      if (candidate.textContent.trim() === target) {
        el = candidate;
        break;
      }
    }
  }

  // 找到目標就捲動 + 清除網址參數
  if (el) {
    el.scrollIntoView({ behavior: 'auto' });

    params.delete('goto');
    const newUrl =
      window.location.pathname +
      (params.toString() ? '?' + params.toString() : '') +
      window.location.hash;

    history.replaceState(null, '', newUrl);
  }
}
