// global variables 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const apiKey = 'a903e090203cb951093bb90d5f213895';
const searchHistory = [];

// helper function to convert K to F
function k2F(tempK) {
	return Math.floor((tempK - 273.15) * 1.8 + 32);
}

// gets current weather, uv index, and 5-day forecast
function getOpenWeatherData (requestedCity) {

  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${requestedCity}&appid=${apiKey}`

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
      let currentDate = new Date(
        data.dt * 1000
      );

      // get current year, month, and date
      let currentYear = currentDate.getFullYear();
      console.log("currentYear:", currentYear);

      // get current year, month, and date
      let currentMonth = currentDate.getMonth() + 1;
      console.log("currentMonth:", currentMonth);

      // get current year, month, and date
      let currentDay = currentDate.getDate();
      console.log("currentDay", currentDay);

      // get lat and long from api call
      let cityLat = data.coord.lat;
      let cityLon = data.coord.lon;

      // create request url to get uv index
      let uviRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&cnt=1`

      // get uv index
      fetch(uviRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** data is: **\n", data);
        })
      
      // get 5-day forecast
      let fiveDayRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${requestedCity}&appid=${apiKey}`

      fetch(fiveDayRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** forecast data is: **\n", data)
        })
      
    })
  }

// call getOpenWeatherData when search button clicked
searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  requestedCity = cityInput.value;
  getOpenWeatherData(requestedCity);

  searchHistory.push(requestedCity);
  localStorage.setItem("",JSON.stringify(searchHistory));
});
  