// Current Year
const d = new Date();
let currentYear = d.getFullYear();
document.querySelector('#currentYear').textContent = currentYear;

// Last Modified
let text = document.lastModified;
const date = new Date(document.lastModified);
document.querySelector('#lastModified').textContent = text;

// Ham Button
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Dark Mode
const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");

modeButton.addEventListener("click", () => {
	if (modeButton.textContent.includes("🕶️")) {
		main.style.background = "#000";
		main.style.color = "#fff";
		modeButton.textContent = "🔆";

		const cards = document.querySelectorAll(".card-review .card");
		const h3Elements = document.querySelectorAll(".card h3");
		cards.forEach(card => {
			card.style.border = "2px solid lightgray";
			card.style.margin = "10px";
		});
		h3Elements.forEach(h3 => {
			h3.style.color = "#ffff";
		});
	} else {
		main.style.background = "#fff";
		main.style.color = "#000";
		modeButton.textContent = "🕶️";

		const cards = document.querySelectorAll(".card-review .card");
		const h3Elements = document.querySelectorAll(".card h3");
		cards.forEach(card => {
			card.style.border = "";
			card.style.margin = "";
		});
		h3Elements.forEach(h3 => {
			h3.style.color = "";
		});
	}
});
