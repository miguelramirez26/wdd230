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
		const cardContainers = document.querySelectorAll(".card-container .card");
		const h3Elements = document.querySelectorAll(".card h3");
		cards.forEach(card => {
			card.style.border = "2px solid lightgray";
			card.style.margin = "10px";
			card.style.backgroundColor = "#000"
		});
		h3Elements.forEach(h3 => {
			h3.style.color = "#ffff";
		});
		cardContainers.forEach(container => {
			container.style.backgroundColor = "#000";
		});
	} else {
		main.style.background = "#fff";
		main.style.color = "#000";
		modeButton.textContent = "🕶️";

		const cards = document.querySelectorAll(".card-review .card");
		const h3Elements = document.querySelectorAll(".card h3");
		const cardContainers = document.querySelectorAll(".card-container .card");
		cards.forEach(card => {
			card.style.border = "";
			card.style.margin = "";
			card.style.backgroundColor = "";
		});
		h3Elements.forEach(h3 => {
			h3.style.color = "";
		});
		cardContainers.forEach(container => {
			container.style.backgroundColor = "";
		});
	}
});

// Time Stamp
document.getElementById('timestamp').value = new Date().toUTCString();

// --- BANNER ---
// Attach event listener to close button
const closeButton = document.getElementById('closeBannerBtn');
closeButton.addEventListener('click', function () {
	closeBanner();
});

function closeBanner() {
    const banner = document.getElementById('chamberBanner');
    banner.style.display = 'none';
}

function getCurrentDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    return currentDay;
}

function displayBanner() {
    const currentDay = getCurrentDay();

    // If the current day is Monday, Tuesday, or Wednesday
    if (currentDay === 1 || currentDay === 2 || currentDay === 3) {
        const banner = document.getElementById('chamberBanner');
        banner.style.display = 'block';
    }
}

// Call this function to check and display the banner as per the requirement
displayBanner();