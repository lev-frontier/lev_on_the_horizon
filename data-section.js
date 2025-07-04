function hasRedHeart(el) {
  return el.querySelector && el.querySelector('redheart');
}


document.addEventListener('DOMContentLoaded', function () {
  const tocContainer = document.getElementById('toc');
  const sectionIndex = document.getElementById('sectionIndex');
  
  if (!tocContainer || !sectionIndex) return;

  const nodes = Array.from(document.querySelectorAll('[data-section]'));
  const counters = [null, 0, 0, 0, 0, 0, 0];
  const stack = [{ ul: tocContainer, level: 0 }];

  nodes.forEach((node) => {
    // 取得標題
	let rawTitle = node.getAttribute('data-section')?.trim() || '';
	let title = rawTitle;  // 最終要用的 title 字串

	// 判斷是否有 <redheart>，優先檢查 node 本身，沒找到再找裡面第一個標題
	let redheartExists = false;

	if (rawTitle) {
	  // data-section 有值，但還是要判斷 redheart
	  if (hasRedHeart(node)) {
		redheartExists = true;
	  } else {
		// 再找子標題元素看有沒有
		const firstHeading = node.querySelector('h1,h2,h3,h4,h5,h6');
		if (firstHeading && hasRedHeart(firstHeading)) {
		  redheartExists = true;
		}
	  }
	} else {
	  // data-section 沒值，要取得標題並判斷 redheart
	  if (/^H[1-6]$/i.test(node.tagName)) {
		title = node.innerText.trim();
		if (hasRedHeart(node)) redheartExists = true;
	  } else {
		const firstHeading = node.querySelector('h1,h2,h3,h4,h5,h6');
		if (firstHeading) {
		  title = firstHeading.innerText.trim();
		  if (hasRedHeart(firstHeading)) redheartExists = true;
		}
	  }
	}
	// 如果有 <redheart> 就在 title 前加標籤
	if (redheartExists && title) {
	  title = '\u2764\uFE0F' + title; /* Unicode ❤️ */
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
  
   // 處理所有指向 data-section 的連結
  const sectionIdMap = {};
  nodes.forEach((node) => {
    const sectionTitle = node.getAttribute('data-section')?.trim();
    if (sectionTitle) {
      sectionIdMap[sectionTitle] = node.id;
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const target = link.getAttribute('href')?.slice(1);
    if (sectionIdMap[target]) {
      link.setAttribute('href', `#${sectionIdMap[target]}`);
    }
  });
});


