// Check if localStorage has a visit date stored
if (localStorage.getItem("lastVisit")) {
    // Get the stored visit date
    const lastVisitDate = new Date(localStorage.getItem("lastVisit"));
    const currentDate = new Date();
    const timeDifference = currentDate - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Display a message based on the time difference
    const messageElement = document.getElementById("message");

    if (daysDifference === 0) {
        messageElement.textContent = "Back so soon! 🥳 Awesome!";
    } else if (daysDifference === 1) {
        messageElement.textContent = "You last visited 1 day ago.";
    } else {
        messageElement.textContent = `You last visited ${daysDifference} days ago.`;
    }
} else {
    // First visit, display a welcome message
    const messageElement = document.getElementById("message");
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
}

// Store the current visit date in localStorage
const currentDate = new Date();
localStorage.setItem("lastVisit", currentDate);