
document.addEventListener("DOMContentLoaded",	()	=>	{
	const	images	=	document.querySelectorAll(".lazy-img");

	images.forEach((img)	=>	{
		const	lowResSrc	=	img.getAttribute('src');

		//	判斷要用	data-src	還是自動	replace
		const	fullResSrc	=	img.getAttribute('data-src')	||	(
				lowResSrc.includes('/small/') ? lowResSrc.replace('/small/',	'/') : null
		);

		if	(!fullResSrc)	return;	//	無法取得高解析圖就跳過

		//	預先載入高解析圖
		const	highRes	=	new	Image();
		highRes.src	=	fullResSrc;

		highRes.onload	=	()	=>	{
				img.src	=	fullResSrc;
				img.classList.add('loaded');
		};
	});
});
