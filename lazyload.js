
document.addEventListener("DOMContentLoaded", () => {
	const images = document.querySelectorAll(".lazy-img");

	images.forEach((img) => {
		const fullSrc = img.getAttribute("data-src");
		const highRes = new Image();
		highRes.src = fullSrc;

		highRes.onload = () => {
			img.src = fullSrc;
			img.classList.add("loaded");
		};
	});
});
