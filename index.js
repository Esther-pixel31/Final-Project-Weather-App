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

function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.current.temp_c;

    let humidityElement = document.querySelector("#humidity ");
    let humidity = response.data.current.humidity;

    let windElement = document.querySelector("#wind ");
    let wind = response.data.current.wind_kph;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.location.name;
    
    temperatureElement.innerHTML= `${Math.round(temperature)}°`;
    humidityElement.innerHTML = `<i class="fas fa-tint"></i> ${humidity}%`;
    windElement.innerHTML = `<i class="fas fa-wind"></i> ${wind}km/h`;

    

}
function handleSearchSubmit(event) {
  event.preventDefault();
  const city = searchInput.value;
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  axios.get(apiUrl).then(refreshWeather);
    

}


