// global variables 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
// ** testing element **
const testingElement = document.getElementById('testing-element');
const apiKey = 'a903e090203cb951093bb90d5f213895';
const searchHistory = [];

// helper function to convert K to F
function k2F(tempK) {
	return Math.floor((tempK - 273.15) * 1.8 + 32);
}

// gets current weather, uv index, and 5-day forecast
function getOpenWeatherData (requestedCity) {
  
  // get current weather for city
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${requestedCity}&units=imperial&appid=${apiKey}`

  fetch(requestUrl)
    .then(function (response) {
      // console.log("** response is: **\n", response);
      // console.log("** json is: **\n", response.json());
      return response.json();
    })
    .then(function (data) {
      console.log("** current weather data is: **\n", data);

      // get current city
      let currentCity = data.name;
      console.log("currentCity is", currentCity);

      // format date from api call
      let currentDate = new Date(
        data.dt * 1000
      );

      // get current year, month, and date
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();
      console.log(`current Date is: ${currentMonth}/${currentDay}/${currentYear}`);

      // ** TEST ** adding date to testing element
      testingElement.innerHTML = `Date: ${currentMonth}/${currentDay}/${currentYear}`;

      // get current temp in F
      let currentTemp = Math.round(data.main.temp); 
      console.log("rounded currentTemp is: ", currentTemp);

      // get current wind in mph

      // get current humidity

      // get latitude and longitude from api call
      let cityLat = data.coord.lat;
      let cityLon = data.coord.lon;

      // get uv index for city
      // let uviRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&cnt=1`
      let uviRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${apiKey}&cnt=1`

      fetch(uviRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** uv data is: **\n", data);

          // log current uv index
          console.log("** current uv index is:", data.current.uvi);
        })
      
      // get 5-day forecast for city
      // let fiveDayRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${requestedCity}&appid=${apiKey}`
      let fiveDayRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${requestedCity}&units=imperial&appid=${apiKey}`

      fetch(fiveDayRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** 5-day forecast data is: **\n", data)
        })
      
    })
  }

// call getOpenWeatherData when search button clicked
searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  // set requested city
  requestedCity = cityInput.value;
  getOpenWeatherData(requestedCity);

  // save requested city to local storage
  searchHistory.push(requestedCity);
  localStorage.setItem("",JSON.stringify(searchHistory));
});
  