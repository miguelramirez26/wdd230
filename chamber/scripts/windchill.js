// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
        return windChill.toFixed(2) + " ºF";
    } else {
        return "N/A";
    }
}

// Get temperature and wind speed elements
const temperatureElement = document.getElementById("current-temp");
const windSpeedElement = document.getElementById("currentWindSpeed");

// Extract temperature and wind speed values
const temperature = parseFloat(temperatureElement.textContent);
const windSpeed = parseFloat(windSpeedElement.textContent);

// Calculate wind chill
const windChill = calculateWindChill(temperature, windSpeed);

// Display the wind chill value in an HTML element with ID "windChillValue"
const windChillElement = document.getElementById("windChillValue");
windChillElement.textContent = "Wind Chill: " + windChill;