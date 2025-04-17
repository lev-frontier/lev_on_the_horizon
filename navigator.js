function WriteHTML(elementId, innerHTML)
{
	var element = document.getElementById(elementId);
	if(element!=null)
		element.innerHTML = innerHTML;	
}


function WriteHeaderAndFooter()
{
	WriteHTML("header",
		"<div align=\"center\">"
		+"	<img style=\"padding-top: 8px;\" src=\"images/logo.png\" width=\"320pt\"/>"
		+"	<h1>Lev on the horizon</h1>"
		+"</div>"

		+"<div class=\"navibox\" align=\"center\">"
		+"<a href=\"index.html\">←返回主頁</a>"
		+"</div>"
	);
	
	WriteHTML("footer",
		"<div class=\"navibox\" align=\"center\">"
		+"<a href=\"index.html\">←返回主頁</a>．<a href=\"#header\">↑返回頁首</a>"
		+"</div>"
	);
}




function WriteAlcoholStoveNavigator()
{
	WriteHTML("alcoholstovenavigator",
		"<div class=\"graybox autofit\" align=\"left\">	"
		+"	<h3 class=\"tab\">酒精爐專區</h3>"
		+"	<ul>"
		+"		<li><a href=\"alcoholstove_intro.html\">酒精爐介紹</a></li>"
		+"		<li><a href=\"alcoholstove_lev.html\">阿前的酒精爐</a></li>"
		+"		<li><a href=\"alcoholstove_stand.html\">阿前的酒精爐爐架</a></li>"
		+"		<li><a href=\"alcoholstovecalc.html\">酒精(乙醇)消耗計算機</a></li>"
		+"	</ul>"
		+"</div>"
	);
}