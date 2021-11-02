// get access to search button
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');

// test function for event listeners
// function sayHello(event) {
//   event.preventDefault();
//   console.log("Hello There!");
// }

// **TESTING** hard-coded API call
function getOpenWeatherData (requestedCity) {

  let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + requestedCity + '&appid=a903e090203cb951093bb90d5f213895'

  // prevent page from reloading on click
  // event.preventDefault();

  // **hard-coded** request url
  // let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Louisville&appid=a903e090203cb951093bb90d5f213895'


  // get current weather for city
  fetch(requestUrl)
    .then(function (response) {
      // console.log("** response is: **\n", response);
      // console.log("** json is: **\n", response.json());
      return response.json();
    })
    .then(function (data) {
      console.log("** data is: **\n", data);
      console.log("data.name")
    });
  }

// call getOpenWeatherData when search button clicked
searchButton.addEventListener('click', function(event) {
  event.preventDefault();
  requestedCity = cityInput.value;
  getOpenWeatherData(requestedCity);
});
  