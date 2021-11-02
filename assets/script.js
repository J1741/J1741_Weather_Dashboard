// get access to search button
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const apiKey = 'a903e090203cb951093bb90d5f213895';

// **TESTING** hard-coded API call
function getOpenWeatherData (requestedCity) {

  let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + requestedCity + '&appid=a903e090203cb951093bb90d5f213895'

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

      // format date from api call
      currentDate = new Date(
        data.dt * 1000
      );

      // get current year, month, and date
      currentYear = currentDate.getFullYear();
      console.log("currentYear:", currentYear);

      // get current year, month, and date
      currentMonth = currentDate.getMonth() + 1;
      console.log("currentMonth:", currentMonth);

      // get current year, month, and date
      currentDay = currentDate.getDate();
      console.log("currentDay", currentDay);

      // get lat and long from api call
      cityLat = data.coord.lat;
      cityLon = data.coord.lon;

      // create request url to get uv index
      uviRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&cnt=1`

      // get uv index
      fetch(uviRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** data is: **\n", data);
        })
    })
  }

// call getOpenWeatherData when search button clicked
searchButton.addEventListener('click', function(event) {
  event.preventDefault();
  requestedCity = cityInput.value;
  getOpenWeatherData(requestedCity);
});
  