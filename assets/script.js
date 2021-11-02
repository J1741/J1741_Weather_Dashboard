// global variables 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
// ** testing element **
const testingElement = document.getElementById('testing-element');
const apiKey = 'a903e090203cb951093bb90d5f213895';
const searchHistory = [];

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

      // get current date
      let currentDate = new Date(
        data.dt * 1000
      );
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();
      let currentMDY = `${currentMonth}/${currentDay}/${currentYear}`
      console.log("current MDY is:", currentMDY);

      // ** TEST ** adding date to testing element
      testingElement.innerHTML = `Date: ${currentMonth}/${currentDay}/${currentYear}`;

      // get current temp in F
      let currentTemp = Math.round(data.main.temp); 
      console.log("currentTemp is: ", currentTemp);

      // get current wind in mph
      let currentWind = data.wind.speed;
      console.log("currentWind is:", currentWind);

      // get current humidity
      let currentHumidity = data.main.humidity
      console.log("currentHumidity is:", currentHumidity);
      console.log("----")        

      // get latitude and longitude from api call
      let cityLat = data.coord.lat;
      let cityLon = data.coord.lon;

      // get uv index for city
      let uviRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}&cnt=1`

      fetch(uviRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** current uvi data is: **\n", data);
          let currentUvi = data.current.uvi
          console.log("currentUvi is:", currentUvi);
          console.log("----")        
        })
      

      // get 5-day forecast for city
      let fiveDayRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${requestedCity}&units=imperial&appid=${apiKey}`

      fetch(fiveDayRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log("** 5-day forecast data is: **\n", data)

        // Need: date, temp, wind, and humidity

        // get day 1 weather

        // console.log("** day 1 data is: **", data.list[0]);
        // let day1Date = new Date(
        //   data.dt * 1000
        // );

        // let day1Date = new Date(); let day1Year = day1Date.getFullYear();
        // let day1Month = day1Date.getMonth() + 1;
        // let day1Day = day1Date.getDate();
        // console.log(`day1 date is: ${day1Month}/${day1Day}/${day1Year}`);

        let day1Temp = Math.round(data.list[1].main.temp); 
        console.log("day1Temp is: ", day1Temp);
        console.log("----");
        
        // get day 2 weather
        let day2Temp = Math.round(data.list[1].main.temp); 
        console.log("day2Temp is: ", day2Temp);
        console.log("----")        

        // get day 3 weather
        let day3Temp = Math.round(data.list[2].main.temp); 
        console.log("day3Temp is: ", day3Temp);
        console.log("----")        

        // get day 4 weather
        let day4Temp = Math.round(data.list[3].main.temp); 
        console.log("day4Temp is: ", day4Temp);
        console.log("----")        

        // get day 5 weather
        let day5Temp = Math.round(data.list[4].main.temp); 
        console.log("day5Temp is: ", day5Temp);
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
  