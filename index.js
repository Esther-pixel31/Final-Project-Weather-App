function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date-time').textContent = `Today, ${timeString}`;
}
updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-form-input');
const cityElement = document.getElementById('city');

searchButton.addEventListener('click', handleSearchSubmit);

function handleSearchSubmit(event) {
    event.preventDefault();
    cityElement.textContent = searchInput.value;
    searchInput.value = ''; 
    }

