const searchButton = document.querySelector('.search-bar button');
const searchInput = document.getElementById('search-form-input');
const cityElement = document.getElementById('city');

searchButton.addEventListener('click', handleSearchSubmit);

function handleSearchSubmit() {
  cityElement.textContent = searchInput.value;
  searchInput.value = ''; // clear the input field
}