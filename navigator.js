function WriteHTML(elementId, innerHTML)
{
	var element = document.getElementById(elementId);
	if(element!=null)
		element.innerHTML = innerHTML;	
}

const symbolMap = {
	'★': '<star_f></star_f>',
	'☆': '<star_e></star_e>',
	'*': '<star_half></star_half>'
};

function WriteHeader()
{
	var imgText = "<img src=\"https://www.f-counter.net/j/65/1746146213/\">";
	var addCounter = localStorage.getItem('lev_frontier_counter_skip') !== 'true';
	WriteHTML("header",
		"<div align=\"center\">"
		+"	<img style=\"padding-top: 8px;\" src=\"images/logo.gif\" width=\"320pt\"/>"
		+"	<h1>Lev on the horizon</h1>"
		+"</div>"

		+"<div align=\"center\">"
		+ (addCounter ? imgText : "")
		+"</div>"
		
		+"<div class=\"navibox\" align=\"center\">"
		+"<a href=\"index.html\">◀返回首頁</a>"
		+"</div>"
	);
}

function WriteFooter()
{
	WriteHTML("footer",
		"<div align=\"center\">"
		+"<span class=\"navibox\"><a href=\"index.html\">◀返回首頁</a></span>．<span class=\"navibox\"><a href=\"#header\">▲捲動回頁面上方</a></span>"
		+"</div>"
	);
}

function ReplaceRatingStar()
{
	// REPLACE RATING STAR:
	document.querySelectorAll('.rating').forEach(el => {
		let content = el.textContent;
		for (const [key, value] of Object.entries(symbolMap)) {
			content = content.split(key).join(value);
			// 或使用正規式（若 key 有特殊符號可考慮加 escape）
			// content = content.replace(new RegExp(key, 'g'), value);
		}
		el.innerHTML = content;
	});
}


function WriteAlcoholStoveNavigator()
{
	WriteHTML("alcoholstovenavigator",
		"<div class=\"graybox autofit\" align=\"left\">	"
		+"	<h3 class=\"tab\">酒精爐專區</h3>"
		+"	<ul>"
		+"		<li><a href=\"alcoholstove_intro.html\">酒精爐介紹</a></li>"
		+"		<li><a href=\"alcoholstove_effectivity.html\">酒精爐vs高山瓦斯爐</a></li>"
		+"		<li><a href=\"alcoholstove_warning.html\"><warningicon></warningicon>警告！！！</a></li>"
		+"		<li><a href=\"alcoholstove_type.html\">酒精爐類型</a></li>"
		+"		<li><a href=\"alcoholstove_lev.html\">阿前的酒精爐</a></li>"
		+"		<li><a href=\"alcoholstove_stand.html\">阿前的酒精爐爐架</a></li>"
		+"		<li><a href=\"alcoholstove_windscreen.html\">阿前的擋風板</a></li>"
		+"		<li><a href=\"alcoholstove_material.html\">爐心材料測試</a></li>"
		+"		<li><a href=\"alcoholstovecalc.html\">酒精(乙醇)消耗計算機</a></li>"
		+"	</ul>"
		+"</div>"
	);
}


function ToggleArrowButton()
{
	var html = 
	"<button class=\"circle-toggle\" onclick=\"toggleNextDiv(this);\">"
	+"<!-- 收合狀態的 SVG -->"
    +"<svg id=\"collapseIcon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"6 6 12 12\" width=\"24\" height=\"24\">"
    +" <path d=\"M9 6l6 6-6 6V6z\"/>"
    +"</svg>"
    +"</button>";
	document.write(html);
}

function toggleNextDiv(button) {
  let el = button.parentElement.nextElementSibling;
  
  if (el && el.tagName === 'DIV') {
    const isExpanded = el.classList.toggle('expanded');
    
    // 切換收合/展開的 SVG
    const svg = button.querySelector('svg');
    if (isExpanded) {
      svg.innerHTML = '<path d="M6 9l6 6 6-6H6z"/>';  // 展開狀態的箭頭（▼）
    } else {
      svg.innerHTML = '<path d="M9 6l6 6-6 6V6z"/>';  // 收合狀態的箭頭（▶）
    }
  }
}