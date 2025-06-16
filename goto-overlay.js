// 取得 URL 參數
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// 顯示遮罩
function showGotoOverlay(text) {
  const overlay = document.getElementById('goto-overlay');
  const textEl = document.getElementById('goto-text');
  if (!overlay || !textEl) return;

  overlay.style.display = 'flex';
  textEl.textContent = `前往${text}`;
  overlay.classList.remove('hidden');

  // 防止淡入動畫（依前面討論）
  overlay.style.transition = 'none';
  void overlay.offsetWidth;
  overlay.style.transition = '';
}

// 淡出遮罩
function hideGotoOverlay() {
  const overlay = document.getElementById('goto-overlay');
  if (!overlay) return;

  // 觸發 CSS transition 淡出
  overlay.classList.add('hidden');

  // transition 結束後隱藏遮罩 (display:none)
  overlay.addEventListener('transitionend', function handler() {
    overlay.style.display = 'none';
    overlay.removeEventListener('transitionend', handler);
  });
}

// 你的滾動函式 (請自行實作或從 goto.js 複製過來)
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


// 主程式入口
(function() {
  const gotoTarget = getQueryParam('goto');
  if (gotoTarget) {
    showGotoOverlay(gotoTarget);

	window.addEventListener('load', () => {
		scrollToSectionFromUrl();
		setTimeout(() => {
          hideGotoOverlay();
        }, 300);
	});
  }
})();
