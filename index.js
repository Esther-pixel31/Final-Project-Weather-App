function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date-time').textContent = `Today, ${timeString}`;
}
updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

const proxyUrl = 'https://api.weatherapi.com/v1/current.json';
const apiKey = 'cdaed428fc7b46b79f3221134242609';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-form-input');
const forecastDayElement = document.querySelector("#forecastday");


searchButton.addEventListener('click', handleSearchSubmit);

function handleSearchSubmit(event) {
  event.preventDefault();
  const city = searchInput.value;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  axios.get(apiUrl).then(response => {
    refreshWeather(response);
    getForecastData(response.data.location.name);
  });
  searchInput.value = '';
}

function getForecastData(city) {
  const forecastApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
  axios.get(forecastApiUrl).then(response => {
    const forecastData = response.data.forecast.forecastday.slice(1, 5); // Get the next 4 days
    forecastDayElement.innerHTML = "";
    forecastData.forEach((day, index) => {
      const forecastDayItem = document.createElement("div");
      const dayName = getDayName(day.date);
      const iconUrl = day.day.condition.icon;
      const temp = day.day.maxtemp_c;
      forecastDayItem.innerHTML = `
        <div class="icon"><img src="${iconUrl}" alt="Weather Icon"></div>
        <div class="temp">${temp}°</div>
        <div class="day">${dayName}</div>
      `;
      forecastDayElement.appendChild(forecastDayItem);
    });
  });
}

function getDayName(dateString) {
  const date = new Date(dateString);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.current.temp_c;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.current.humidity;

  let windElement = document.querySelector("#wind");
  let wind = response.data.current.wind_kph;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.location.name;

  let weather = response.data.current.condition;
  let weatherId = weather.code;

  // Use OpenWeatherMap API to fetch weather description
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${response.data.location.name}`;
  axios.get(apiUrl).then(response => {
  const weatherDescription = response.data.current.condition.text;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.textContent = weatherDescription;

  const weatherIconUrl = response.data.current.condition.icon;
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.innerHTML = `<img src="${weatherIconUrl}" alt="Weather Icon">`;
  
});

  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  humidityElement.innerHTML = `<i class="fas fa-tint"></i> ${humidity}%`;
  windElement.innerHTML = `<i class="fas fa-wind"></i> ${wind.toFixed(0)}km/h`;

  let uvIndex = response.data.current.uv;
  let pollutionIndex = response.data.current.pollution;
  let pollenIndex = response.data.current.pollen;

  let uvIndicator = document.querySelector(".high");
  let pollutionIndicator = document.querySelector(".low");
  let pollenIndicator = document.querySelector(".moderate");

  if (uvIndex < 3) {
    uvIndicator.textContent = "Low";
    uvIndicator.style.color = "green";
  } else if (uvIndex < 6) {
    uvIndicator.textContent = "Moderate";
    uvIndicator.style.color = "orange";
  } else {
    uvIndicator.textContent = "High";
    uvIndicator.style.color = "red";
  }

  if (pollutionIndex < 50) {
    pollutionIndicator.textContent = "Low";
    pollutionIndicator.style.color = "green";
  } else if (pollutionIndex < 100) {
    pollutionIndicator.textContent = "Moderate";
    pollutionIndicator.style.color = "orange";
  } else {
    pollutionIndicator.textContent = "High";
    pollutionIndicator.style.color = "red";
  }

  if (pollenIndex < 50) {
    pollenIndicator.textContent = "Low";
    pollenIndicator.style.color = "green";
  } else if (pollenIndex < 100) {
    pollenIndicator.textContent = "Moderate";
    pollenIndicator.style.color = "orange";
  } else {
    pollenIndicator.textContent = "High";
    pollenIndicator.style.color = "red";
  }


}

function handleSearchSubmit(event) {
  event.preventDefault();
  const city = searchInput.value;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  axios.get(apiUrl).then(refreshWeather);
    
  searchInput.value = '';
}




