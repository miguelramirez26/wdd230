// HOME PAGE
// Current Weather 
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');

const lat = 20.50;
const lon = -86.94;
const apiKey = '82424520dbb943be8b1280955698536a';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
            updateLocationName(data.name, data.sys.country);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}



function displayResults(data) {
    // Display current temp
    currentTemp.textContent = `${data.main.temp.toFixed(0)}°F`;

    // Display current humidity
    const currentHumidityElement = document.getElementById('current-humidity');
    currentHumidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    // Display weather icon and description
    const iconsrc = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    let desc = capitalizeEachWord(data.weather[0].description);

    // Debugging statements
    console.log(data.weather[0].icon); // Check the icon value
    console.log(iconsrc); // Check the generated iconsrc

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;

    // Display today's information, including the 'feels like' temperature, weather description, wind speed, and the expected low and high temperatures
    const todayInfoElement = document.getElementById('todayInfo');
    todayInfoElement.textContent = `Currently it feels like ${data.main.feels_like.toFixed(0)}°F. There is ${desc} and the winds are ${data.wind.speed} km/h. Today, expect a low of ${data.main.temp_min.toFixed(0)}°F and a high of ${data.main.temp_max.toFixed(0)}°F.`;

    // Display the expected high temperature in the closeable message
    displayCloseableMessage(data.main.temp_max); 
}

function updateLocationName(city, country) {
    const locationElement = document.querySelector('#city-country')
    locationElement.textContent = `${city}, ${country}`;
}

apiFetch();

function capitalizeEachWord(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// One Day Forecast
const forecastContainer = document.getElementById('forecast');
const forecastHoursContainer = document.getElementById('forecast-hours');
const forecastIconsContainer = document.getElementById('forecast-icons');
const forecastTempsContainer = document.getElementById('forecast-temps');

async function fetchForecast() {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const forecastList = data.list.slice(0, 9);

    let forecastDateTimeHTML = '';
    let forecastIconsHTML = '';
    let forecastTempsHTML = '';

    for (let i = 0; i < forecastList.length; i++) {
        const forecastTime = new Date(forecastList[i].dt * 1000);
        const forecastDay = forecastTime.toLocaleDateString('en-US', { weekday: 'short'});
        const forecastHour = forecastTime.getHours();
        const forecastTemp = forecastList[i].main.temp.toFixed(0);
        const forecastIcon = `https://openweathermap.org/img/w/${forecastList[i].weather[0].icon}.png`;

        forecastDateTimeHTML += `<div class="forecast-item">${forecastDay} ${forecastHour}:00</div>`;
        forecastIconsHTML += `<div class="forecast-item"><img src="${forecastIcon}" alt="${capitalizeEachWord(forecastList[i].weather[0].description)}"></div>`;
        forecastTempsHTML += `<div class="forecast-item">${forecastTemp}°F</div>`;
    }

    forecastHoursContainer.innerHTML = forecastDateTimeHTML;
    forecastIconsContainer.innerHTML = forecastIconsHTML;
    forecastTempsContainer.innerHTML = forecastTempsHTML;
}

fetchForecast();

// Closeable Message that provides the temp-max for the current day
// Function to close the message
function closeMessage() {
    document.getElementById('closeable-message').style.display = 'none';
}

// Function to display the closeable message
function displayCloseableMessage(maxTempToday) {
    const messageContent = `Today's high temperature: ${maxTempToday.toFixed(0)}°F`;
    const messageElement = document.getElementById('message-content');
    messageElement.textContent = messageContent;
    document.getElementById('closeable-message').style.display = 'block';
}

// RENTALS PAGE 
// Pricing Table
const url = 'https://raw.githubusercontent.com/miguelramirez26/wdd230/main/finalproject/data/pricing.json';
const pricingTable = document.querySelector('#pricing-table');

const displayPricing = (pricingData) => {
  // Create caption element for the table
  let caption = document.createElement('caption');
  caption.textContent = 'Max Rental Pricing';

  // Append the caption to the table
  pricingTable.appendChild(caption);

  // Create thead and tbody elements
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  // Create thead rows and cells
  let theadRow1 = document.createElement('tr');
  let theadRow2 = document.createElement('tr');

  // Create header cells with rowspan and colspan
  let rentalTypeTh = document.createElement('th');
  rentalTypeTh.textContent = 'Rental Type';
  rentalTypeTh.setAttribute('rowspan', '2'); // Add rowspan attribute
  theadRow1.appendChild(rentalTypeTh);

  let maxPersonsTh = document.createElement('th');
  maxPersonsTh.textContent = 'Max. Persons';
  maxPersonsTh.setAttribute('rowspan', '2'); // Add rowspan attribute
  theadRow1.appendChild(maxPersonsTh);

  let reservationTh = document.createElement('th');
  reservationTh.textContent = 'Reservation';
  reservationTh.setAttribute('colspan', '2'); // Add colspan attribute
  theadRow1.appendChild(reservationTh);

  let walkInTh = document.createElement('th');
  walkInTh.textContent = 'Walk-In';
  walkInTh.setAttribute('colspan', '2'); // Add colspan attribute
  theadRow1.appendChild(walkInTh);

  // Create thead row for pricing details
  theadRow2.innerHTML = '<th>Half Day (3 hrs)</th><th>Full Day</th><th>Half Day (3 hrs)</th><th>Full Day</th>';

  thead.appendChild(theadRow1);
  thead.appendChild(theadRow2);

  // Append thead to the table
  pricingTable.appendChild(thead);

  pricingData.rental_type.forEach((rental, index) => {
    let row = document.createElement('tr');
    let rentalTypeCell = document.createElement('td');
    let maxPersonsCell = document.createElement('td');
    let reservationPricingCell1 = document.createElement('td');
    let reservationPricingCell2 = document.createElement('td');
    let maxRentalPricingCell1 = document.createElement('td');
    let maxRentalPricingCell2 = document.createElement('td');

    rentalTypeCell.textContent = `${rental}`;
    maxPersonsCell.textContent = `${pricingData.max_persons[index]}`;
    reservationPricingCell1.textContent = `$${pricingData.reservation_pricing[index].half_day}`;
    reservationPricingCell2.textContent = `$${pricingData.reservation_pricing[index].full_day}`;
    maxRentalPricingCell1.textContent = `$${pricingData.walk_in_pricing[index].half_day}`;
    maxRentalPricingCell2.textContent = `$${pricingData.walk_in_pricing[index].full_day}`;

    row.appendChild(rentalTypeCell);
    row.appendChild(maxPersonsCell);
    row.appendChild(reservationPricingCell1);
    row.appendChild(reservationPricingCell2);
    row.appendChild(maxRentalPricingCell1);
    row.appendChild(maxRentalPricingCell2);

    tbody.appendChild(row);
  });

  // Append tbody to the table
  pricingTable.appendChild(tbody);
};

async function getPricingData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data. HTTP error ' + response.status);
    }
    const data = await response.json();
    displayPricing(data);
  } catch (error) {
    console.error('Error fetching pricing data: ', error);
  }
}

getPricingData();