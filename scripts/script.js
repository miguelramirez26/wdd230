// CURRENT YEAR
const d = new Date();
let currentYear = d.getFullYear();
document.querySelector('#currentYear').textContent = currentYear;

// LAST MODIFIED
let text = document.lastModified;
const date = new Date(document.lastModified);
document.querySelector('#lastModified').textContent = text;

// HAM BUTTON
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// NUM VISITS
// 1. Initialize display element variable
const visitsDisplay = document.querySelector(".visits");

// 2. Get the stored Value for the numVisits 
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

// 3. Determine if this is the first visit or display the num of visits
if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = 'This is your first visit. 🥳 Welcome!';
}

// 4. Increment the number of visits by one
numVisits++;

// 5. Store the new visit total into localStorage
localStorage.setItem("numVisits-ls", numVisits)

// PASSWORD
const p1 = document.getElementById("password");
const p2 = document.getElementById("password-confirm");
const message = document.getElementById("password-mismatch-message");

p2.addEventListener("focusout", checkSame);

function checkSame() {
    if (p1.value !== p2.value) {
        message.style.visibility = "show";
        p2.style.backgroundColor = "#fff0f3";
        p2.value = "";
        p2.focus();
    } else {
        message.style.display = "none";
        p2.style.backgroundColor = "#fff";
        p2.style.color = "#000";
    }
}

// RANGE
const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("r");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}