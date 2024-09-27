function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date-time').textContent = `Today, ${timeString}`;
}
updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

const apiKey = 'cdaed428fc7b46b79f3221134242609';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-form-input');

searchButton.addEventListener('click', handleSearchSubmit);

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
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${response.data.location.name}`;
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
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  axios.get(apiUrl).then(refreshWeather);
    
  searchInput.value = '';
}




