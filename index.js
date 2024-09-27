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

function getIconClass(condition) {
  let iconClasses = {
    'Sunny': 'icon-sunny',
    'Partly Cloudy': 'icon-partly-cloudy',
    'Cloudy': 'icon-cloudy',
    'Overcast': 'icon-overcast',
    'Light Rain': 'icon-light-rain',
    'Heavy Rain': 'icon-heavy-rain',
    'Thunderstorm': 'icon-thunderstorm',
    'Light Snow': 'icon-light-snow',
    'Heavy Snow': 'icon-heavy-snow',
    'Light Sleet': 'icon-light-sleet',
    'Heavy Sleet': 'icon-heavy-sleet',
    'Light Freezing Rain': 'icon-light-freezing-rain',
    'Heavy Freezing Rain': 'icon-heavy-freezing-rain',
    'Light Drizzle': 'icon-light-drizzle',
    'Heavy Drizzle': 'icon-heavy-drizzle',
    'Light Freezing Drizzle': 'icon-light-freezing-drizzle',
    'Heavy Freezing Drizzle': 'icon-heavy-freezing-drizzle',
    'Light Rain Shower': 'icon-light-rain-shower',
    'Heavy Rain Shower': 'icon-heavy-rain-shower',
    'Light Sleet Shower': 'icon-light-sleet-shower',
    'Heavy Sleet Shower': 'icon-heavy-sleet-shower',
    'Light Hail': 'icon-light-hail',
    'Heavy Hail': 'icon-heavy-hail',
    'Light Hail Shower': 'icon-light-hail-shower',
    'Heavy Hail Shower': 'icon-heavy-hail-shower',
    'Light Thunderstorm': 'icon-light-thunderstorm',
    'Heavy Thunderstorm': 'icon-heavy-thunderstorm',
    'Light Fog': 'icon-light-fog',
    'Heavy Fog': 'icon-heavy-fog',
    'Light Freezing Fog': 'icon-light-freezing-fog',
    'Heavy Freezing Fog': 'icon-heavy-freezing-fog'
  };
  return iconClasses[condition];
}

function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.current.temp_c;

    let humidityElement = document.querySelector("#humidity ");
    let humidity = response.data.current.humidity;

    let windElement = document.querySelector("#wind ");
    let wind = response.data.current.wind_kph;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.location.name;
    
    let descriptionElement = document.querySelector("#description");

    temperatureElement.innerHTML= `${Math.round(temperature)}°`;
    humidityElement.innerHTML = `<i class="fas fa-tint"></i> ${humidity}%`;
    windElement.innerHTML = `<i class="fas fa-wind"></i> ${wind.toFixed(0)}km/h`;
    descriptionElement.innerHTML = description;


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




