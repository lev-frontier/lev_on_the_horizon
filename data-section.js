/*
document.addEventListener('DOMContentLoaded', function () {
  const toc = document.getElementById('toc');
  const sections = document.querySelectorAll('[data-section]');

  sections.forEach((section, index) => {
    // 先讀 data-section 屬性
    let title = section.getAttribute('data-section');

    // 如果 title 為 null 或 空字串，且標籤是 H1~H6，就用 innerText 做替代
    if ((!title || title.trim() === '') && /^H[1-6]$/i.test(section.tagName)) {
      title = section.innerText.trim();
    }

    // 如果還是空，就不加入目錄
    if (!title) return;

    // 設定 section 的 id
    const sectionId = `section${String(index + 1).padStart(2, '0')}`;
    section.id = sectionId;

    // 建立 TOC 條目
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = `#${sectionId}`;
    a.textContent = title;
    li.appendChild(a);
    toc.appendChild(li);
  });
});
*/document.addEventListener('DOMContentLoaded', function () {
  const tocContainer = document.getElementById('toc');
  const sectionIndex = document.getElementById('sectionIndex');
  
  if (!tocContainer || !sectionIndex) return;

  const nodes = Array.from(document.querySelectorAll('[data-section]'));
  const counters = [null, 0, 0, 0, 0, 0, 0];
  const stack = [{ ul: tocContainer, level: 0 }];

  nodes.forEach((node) => {
    // 取得標題
    let title = node.getAttribute('data-section')?.trim() || '';
    if (!title) {
      if (/^H[1-6]$/i.test(node.tagName)) {
        title = node.innerText.trim();
      } else {
        const firstHeading = node.querySelector('h1,h2,h3,h4,h5,h6');
        if (firstHeading) title = firstHeading.innerText.trim();
      }
    }
    if (!title) return;

    // 決定層級
    let level;
    if (/^H[1-6]$/i.test(node.tagName)) {
      level = parseInt(node.tagName.charAt(1), 10);
    } else {
      const childHeading = node.querySelector('h1,h2,h3,h4,h5,h6');
      level = childHeading ? parseInt(childHeading.tagName.charAt(1), 10) : 6;
    }

    // 更新 counters
    counters[level]++;
    for (let i = level + 1; i <= 6; i++) counters[i] = 0;

    // 生成 id
    const idParts = [String(counters[1]).padStart(2, '0')];
    for (let i = 2; i <= level; i++) {
      idParts.push(String(counters[i]).padStart(3, '0'));
    }
    const sectionId = 'section' + idParts.join('_');
    node.id = sectionId;

    // 找到要放入的 li
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    const parentUl = stack[stack.length - 1].ul;

    // 建立 li > a
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${sectionId}`;
    a.textContent = title;
    li.appendChild(a);
    parentUl.appendChild(li);

    // 準備子層 ul（等未來有更小 heading 的時候加進來）
    const newUl = document.createElement('ul');
    li.appendChild(newUl);
    stack.push({ ul: newUl, level: level });
  });

  // 清除空的 <ul>（那些沒有子項目的）
  tocContainer.querySelectorAll('ul').forEach(ul => {
    if (!ul.children.length) {
      ul.remove();
    }
  });

  // 給 #sectionIndex 加上 'show' 類別，觸發動畫
  sectionIndex.classList.add('show');
});



