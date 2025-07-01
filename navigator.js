
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

// 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

const alcoholStoveNavItems = [
	{
		href: "alcoholstove_intro.html",
		icon: "<fire_f></fire_f>",
		label: "介紹",
		desc: "輕量化到不知道還可以輕什麼？來玩酒精爐吧！",
		thumb: "images/introdution/thumb.jpg"
	},
	{
		href: "alcoholstove_effectivity.html",
		icon: "<fire_f></fire_f>",
		label: "對比高山瓦斯爐效益",
		desc: "比較酒精爐在重量上的優勢，以及講講高山瓦斯爐的不可取代性。",
		thumb: "images/effectivity/thumb.jpg"
	},
	{
		href: "alcoholstove_warning.html",
		icon: "<warningicon></warningicon>",
		label: "警告！！！",
		desc: "談論使用酒精爐的一些細節所導致的危險性。",
		thumb: "images/warning/thumb.jpg"
	},
	{
		href: "alcoholstove_type.html",
		icon: "<fire_f></fire_f>",
		label: "酒精爐類型",
		desc: "介紹幾種不同類型的酒精爐燃燒的原理。",
		thumb: "images/stovetype/thumb.jpg"
	},
	{
		href: "alcoholstove_current.html",
		icon: "<fire_f></fire_f>",
		label: "現役酒精爐",
		desc: "介紹阿前購買與DIY自製的酒精爐。",
		thumb: "images/stove/thumb.gif"
	},
	{
		href: "alcoholstove_dispose.html",
		icon: "<fire_f></fire_f>",
		label: "已丟棄的酒精爐",
		desc: "將一些製作失敗效果不好而丟棄的酒精爐移駕至此。",
		thumb: "images/stove/thumb_discard.jpg"
	},
	{
		href: "alcoholstove_stand.html",
		icon: "<fire_f></fire_f>",
		label: "爐架",
		desc: "酒精爐沒設計自帶爐架的話，都需要額外的爐架。",
		thumb: "images/stovestand/thumb.gif"
	},
	{
		href: "alcoholstove_windscreen.html",
		icon: "<fire_f></fire_f>",
		label: "擋風板",
		desc: "酒精爐非常容易受風影響，擋風板可以避免熱源過度散失。",
		thumb: "images/windscreen/thumb.gif"
	},
	{
		href: "alcoholstove_fuel.html",
		icon: "<fire_f></fire_f>",
		label: "燃料",
		desc: "不同類型酒精燃料的比較，與混合燃料、焰色反應實驗。",
		thumb: "images/fuel/thumb.jpg"
	},
	{
		href: "alcoholstove_ignition.html",
		icon: "<fire_f></fire_f>",
		label: "點火方式",
		desc: "酒精在低溫或缺氧狀態下如何增加點燃的成功率。",
		thumb: "images/fire_e.svg"
	},
	{
		href: "alcoholstove_material.html",
		icon: "<fire_f></fire_f>",
		label: "爐心材料測試",
		desc: "吸附式酒精爐（如防火綿酒精爐），填充的爐心使用不同吸附材質的比較。",
		thumb: "images/material/thumb.jpg"
	},
	{
		href: "alcoholstove_spinoff.html",
		icon: "<fire_f></fire_f>",
		label: "番外篇",
		desc: "一些固態燃料測試之類的。",
		thumb: "images/solidfuelstove/thumb.jpg"
	}
];

function WriteAlcoholStoveNavigator() {
	let html = '<div class="graybox" align="left">';
	html += '<h3 class="tab">酒精爐專區</h3>';
	html += '<div class="naviGrid">';
	
	for (const item of alcoholStoveNavItems) {
		html += `<a href="${item.href}">${item.icon}${item.label}</a>`;
	}
	
	html += '</div></div>';
	WriteHTML("alcoholstovenavigator", html);
}


function WriteAlcoholStoveNavigatorLarge() {
	let html = '<div class="naviGridLarge">';
	
	for (const item of alcoholStoveNavItems) {
		html += `<a href="${item.href}">` +
				`<navi-thumb style="background-image: url('${item.thumb}');"></navi-thumb>` +
				`<navi-card>` +
					`<navi-title>${item.icon}${item.label}</navi-title>` +
					`<navi-desc>${item.desc}</navi-desc>` +
				`</navi-card>` +
				`</a>`;
	}
	
	html += '</div>';
	WriteHTML("alcoholstovenavigator_large", html);
}

// 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

const ulNavItems = [
	{
		href: "ul_tent.html",
		icon: "<mountain></mountain>",
		label: "阿前的帳篷",
		desc: "介紹阿前登山一路上使用的帳篷。",
		thumb: "images/tent/thumb.jpg"
	},
	{
		href: "ul_backpack.html",
		icon: "<mountain></mountain>",
		label: "阿前的登山包",
		desc: "包包的體積與重量很大程度影響整體背負的重量。",
		thumb: "images/backpack/thumb.jpg"
	}
];
function WriteULNavigator() {
	let html = '<div class="graybox" align="left">';
	html += '<h3 class="tab">輕量化登山</h3>';
	html += '<div class="naviGrid">';
	
	for (const item of ulNavItems) {
		html += `<a href="${item.href}">${item.icon}${item.label}</a>`;
	}
	
	html += '</div></div>';
	WriteHTML("ul_navigator", html);
}
function WriteULNavigatorLarge() {
	let html = '<div class="naviGridLarge">';
	
	for (const item of ulNavItems) {
		html += `<a href="${item.href}">` +
				`<navi-thumb style="background-image: url('${item.thumb}');"></navi-thumb>` +
				`<navi-card>` +
					`<navi-title>${item.icon}${item.label}</navi-title>` +
					`<navi-desc>${item.desc}</navi-desc>` +
				`</navi-card>` +
				`</a>`;
	}
	
	html += '</div>';
	WriteHTML("ulnavigator_large", html);
}

// 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

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