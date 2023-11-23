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

// Get the current day
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

displayBanner();

// --- SPOTLIGHT INFO ---
const fetchData = async () => {
	try {
		const response = await fetch('chamber/members.json');
		const data = await response.json();
		return data.companies;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

// Function to filter members by status
const filterMembersByStatus = (members, status) => {
	return members.filter(member => member.membershiplevel === status);
};

// Function to randomly select members
const getRandomMembers = (members, count) => {
	const randomMembers = [];
	while (randomMembers.length < count && members.length > 0) {
		const randomIndex = Math.floor(Math.random() * members.length);
		randomMembers.push(members.splice(randomIndex, 1)[0]);
	}
	return randomMembers;
};

// Function to display spotlight information
const displaySpotlight = async () => {
	const chamberMembers = await fetchData();

	// Filter silver and gold members
	const silverGoldMembers = filterMembersByStatus(chamberMembers, 2); // Assuming 2 is silver and 3 is gold

	// Randomly select two or three members
	const selectedMembers = getRandomMembers(silverGoldMembers, Math.floor(Math.random() * 2) + 2);

	// Display spotlight information
	const spotlightContainer = document.getElementById('spotlight-container');
	spotlightContainer.innerHTML = '';

	selectedMembers.forEach(member => {
		const memberDiv = document.createElement('div');
		memberDiv.innerHTML = `
			<h3>${member.name}</h3>
			<p>Address: ${member.address}</p>
			<p>Phone: ${member.phone}</p>
			<p>Website: <a href="${member.websiteurl}" target="_blank">${member.websiteurl}</a></p>
			<img src="${member.imageurl}" alt="${member.name}" style="max-width: 100px;">
		`;
		spotlightContainer.appendChild(memberDiv);
	});
};