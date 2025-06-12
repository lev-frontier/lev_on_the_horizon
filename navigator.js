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

function IsIndexPage()
{
	// 取得目前網址的路徑部分，例如 /folder/index.html
	const path = window.location.pathname;
	// 取得檔名部分（最後一段）
	const page = path.substring(path.lastIndexOf('/') + 1);
	// 如果網址沒有指定檔名，通常是資料夾，視為 index
	return page === '' || page.startsWith('index.');	
}

function WriteHeader()
{
	var imgText = "<img src=\"https://www.f-counter.net/j/65/1746146213/\">";
	var addCounter = localStorage.getItem('lev_frontier_counter_skip') !== 'true';
	
	var subtitle = IsIndexPage() ?
		"<p class=\"no-select\" style=\"font-size: 0.8em;\">阿前的小工具、教學、遊記分享（也許應該）</p>"
		: "<div class=\"navibox\" align=\"center\"><a href=\"index.html\">◀返回首頁</a></div>"
	
	WriteHTML("header",
		"<div align=\"center\">"
		+"	<img style=\"padding-top: 8px;\" src=\"images/logo.gif\" width=\"320pt\"/>"
		+"	<h1>Lev on the horizon</h1>"
		+"</div>"

		+"<div align=\"center\">"
		+ (addCounter ? imgText : "")
		+"</div>"
		
		+ subtitle
	);
}


function WriteFooter()
{
	var navigateLinks = IsIndexPage() ?
		"<span class=\"navibox\"><a href=\"#header\">▲捲動回頁面上方</a></span>" 
		: "<span class=\"navibox\"><a href=\"index.html\">◀返回首頁</a></span>．<span class=\"navibox\"><a href=\"#header\">▲捲動回頁面上方</a></span>";
	
	const contact = "聯絡阿前：<a href=\"mailto:lev.on.the.horizon@gmail.com\">lev.on.the.horizon@gmail.com</a>";
	
	WriteHTML("footer",
		"<div align=\"center\" style=\"margin: 20px;\">"
		+navigateLinks
		+"</div>"
		+"<div align=\"center\" style=\"margin: 20px;\">"
		+ "<h6><span class=\"navibox\">" + contact + "</span></h6>"
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


function WriteAlcoholStoveNavigator() {
	WriteHTML("alcoholstovenavigator",
		"<div class=\"graybox\" align=\"left\">" +
		"  <h3 class=\"tab\">酒精爐專區</h3>" +
		"  <div class=\"naviGrid\">" +
		"    <a href=\"alcoholstove_intro.html\"><fire_f></fire_f>介紹</a>" +
		"    <a href=\"alcoholstove_effectivity.html\"><fire_f></fire_f>對比高山瓦斯爐效益</a>" +
		"    <a href=\"alcoholstove_warning.html\"><warningicon></warningicon>警告！！！</a>" +
		"    <a href=\"alcoholstove_type.html\"><fire_f></fire_f>酒精爐類型</a>" +
		"    <a href=\"alcoholstove_current.html\"><fire_f></fire_f>現役酒精爐</a>" +
		"    <a href=\"alcoholstove_dispose.html\"><fire_f></fire_f>已丟棄的酒精爐</a>" +
		"    <a href=\"alcoholstove_stand.html\"><fire_f></fire_f>爐架</a>" +
		"    <a href=\"alcoholstove_windscreen.html\"><fire_f></fire_f>擋風板</a>" +
		"    <a href=\"alcoholstove_material.html\"><fire_f></fire_f>爐心材料測試</a>" +
		"    <a href=\"alcoholstove_spinoff.html\"><fire_f></fire_f>番外篇</a>" +
		"  </div>" +
		"</div>"
	);
}

function WriteAlcoholStoveNavigatorLarge() {
	WriteHTML("alcoholstovenavigator_large",
		"  <div class=\"naviGridLarge\">" +
		"    <a href=\"alcoholstove_intro.html\"><navi-title><fire_f></fire_f>介紹</navi-title><navi-desc>介紹酒精爐優缺、注意事項。</navi-desc></a>" +
		"    <a href=\"alcoholstove_effectivity.html\"><navi-title><fire_f></fire_f>對比高山瓦斯爐效益</navi-title><navi-desc>比較酒精爐在重量上的優勢，以及講講高山瓦斯爐的不可取代性。</navi-desc></a>" +
		"    <a href=\"alcoholstove_warning.html\"><navi-title><warningicon></warningicon>警告！！！</navi-title><navi-desc>談論使用酒精爐的一些細節所導致的危險性。</navi-desc></a>" +
		"    <a href=\"alcoholstove_type.html\"><navi-title><fire_f></fire_f>酒精爐類型</navi-title><navi-desc>介紹幾種不同類型的酒精爐燃燒的原理。</navi-desc></a>" +
		"    <a href=\"alcoholstove_current.html\"><navi-title><fire_f></fire_f>現役酒精爐</navi-title><navi-desc>介紹阿前購買與DIY自製的酒精爐。</navi-desc></a>" +
		"    <a href=\"alcoholstove_dispose.html\"><navi-title><fire_f></fire_f>已丟棄的酒精爐</navi-title><navi-desc>將一些製作失敗效果不好而丟棄的酒精爐移駕至此。</navi-desc></a>" +
		"    <a href=\"alcoholstove_stand.html\"><navi-title><fire_f></fire_f>爐架</navi-title><navi-desc>酒精爐沒設計自帶爐架的話，都需要額外的爐架。</navi-desc></a>" +
		"    <a href=\"alcoholstove_windscreen.html\"><navi-title><fire_f></fire_f>擋風板</navi-title><navi-desc>酒精爐非常容易受風影響，擋風板可以避免熱源過度散失。</navi-desc></a>" +
		"    <a href=\"alcoholstove_material.html\"><navi-title><fire_f></fire_f>爐心材料測試</navi-title><navi-desc>吸附式酒精爐（如防火綿酒精爐），填充的爐心使用不同吸附材質的比較。</navi-desc></a>" +
		"    <a href=\"alcoholstove_spinoff.html\"><navi-title><fire_f></fire_f>番外篇</navi-title><navi-desc>一些固態燃料測試之類的。</navi-desc></a>" +
		"  </div>" 
	);
}


function WriteULNavigator()
{
	WriteHTML("ul_navigator",
		"<div class=\"graybox\" align=\"left\">	"
		+" <h3 class=\"tab\">輕量化登山</h3>"
		+"  <div class=\"naviGrid\">" 
		+"    <a href=\"ul_tent.html\"><mountain></mountain>阿前的帳篷</a>"
		+"    <a href=\"ul_backpack.html\"><mountain></mountain>阿前的登山包</a>"
		+"  </div>"
		+"</div>"
	);
}
function WriteULNavigatorLarge()
{
	WriteHTML("ulnavigator_large",
		"  <div class=\"naviGridLarge\">"
		+"    <a href=\"ul_tent.html\"><navi-title><mountain></mountain>阿前的帳篷</navi-title><navi-desc>介紹阿前登山一路上使用的帳篷。</navi-desc></a>"
		+"    <a href=\"ul_backpack.html\"><navi-title><mountain></mountain>阿前的登山包</navi-title><navi-desc>包包的體積與重量很大程度影響整體背負的重量。</navi-desc></a>"
		+"  </div>"
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