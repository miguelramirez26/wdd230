const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecast = document.querySelector('#forecast');

const lat = 42.85;
const lon = -2.67;
const apiKey = '82424520dbb943be8b1280955698536a';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function apiFetch(url, type) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (type === 'current') {
                displayResults(data);
            } else if (type === 'forecast') {
                displayForecast(data);
            }  
        } else {
            throw Error (await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = capitalizeEachWord(data.weather[0].description);
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

function displayForecast(data) {
    forecast.innerHTML = '';

    const iconsrc = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    let desc = capitalizeEachWord(data.list[0].weather[0].description);

    for (let i =0; i < data.list.length; i += 8) {
        const timestamp = new Date(data.list[i].dt_txt);
        const day = timestamp.toLocaleDateString('en-US', { weekday: 'short'});
        const forecastItem = document.createElement('li');
        forecastItem.innerHTML = `<strong>${day}:</strong> ${data.list[i].main.temp.toFixed(0)}&deg;F`;
        forecast.appendChild(forecastItem);
    }
}

apiFetch(url, 'current');
apiFetch(forecastUrl, 'forecast');

function capitalizeEachWord(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}