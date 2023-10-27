// Current Year
const d = new Date();
let currentYear = d.getFullYear();
document.querySelector('#currentYear').textContent = currentYear;

// Last Modified
let text = document.lastModified;
const date = new Date(document.lastModified);
document.querySelector('#lastModified').textContent = text;