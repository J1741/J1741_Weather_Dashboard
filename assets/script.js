// global variables 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');

const apiKey = 'a903e090203cb951093bb90d5f213895';

const weatherAreaEl = document.getElementById('weather-area');

// get current weather elements
const cityInfoEl = document.getElementById('city-info');
const cityIconEl = document.getElementById('city-icon');
const cityTempEl = document.getElementById('city-temp');
const cityWindEl = document.getElementById('city-wind');
const cityHumidityEl = document.getElementById('city-humidity');
const cityUviEl = document.getElementById('city-uvi');

// get day1 elements
const day1DateEl = document.getElementById('day1-date');
const day1IconEl = document.getElementById('day1-icon');
const day1TempEl = document.getElementById('day1-temp');
const day1WindEl = document.getElementById('day1-wind');
const day1HumidityEl = document.getElementById('day1-humidity');

// get day2 elements
const day2DateEl = document.getElementById('day2-date');
const day2IconEl = document.getElementById('day2-icon');
const day2TempEl = document.getElementById('day2-temp');
const day2WindEl = document.getElementById('day2-wind');
const day2HumidityEl = document.getElementById('day2-humidity')

// get day3 elements
const day3DateEl = document.getElementById('day3-date');
const day3IconEl = document.getElementById('day3-icon');
const day3TempEl = document.getElementById('day3-temp');
const day3WindEl = document.getElementById('day3-wind');
const day3HumidityEl = document.getElementById('day3-humidity')

// get day4 elements
const day4DateEl = document.getElementById('day4-date');
const day4IconEl = document.getElementById('day4-icon');
const day4TempEl = document.getElementById('day4-temp');
const day4WindEl = document.getElementById('day4-wind');
const day4HumidityEl = document.getElementById('day4-humidity')

// get day5 elements
const day5DateEl = document.getElementById('day5-date');
const day5IconEl = document.getElementById('day5-icon');
const day5TempEl = document.getElementById('day5-temp');
const day5WindEl = document.getElementById('day5-wind');
const day5HumidityEl = document.getElementById('day5-humidity')

const searchHistory = [];

// gets current weather, uv index, and 5-day forecast
function getOpenWeatherData (requestedCity) {
  
  // get current weather for city
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${requestedCity}&units=imperial&appid=${apiKey}`
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    // console.log("** current weather data is: **\n", data);

      // get current city
      let currentCity = data.name;
      console.log("currentCity is:", currentCity);

      // get current weather icon
      let currentIcon = data.weather[0].icon;
      console.log("currentIcon is:", currentIcon);
      let currentIconUrl = `http://openweathermap.org/img/wn/${currentIcon}%402x.png`
      console.log(currentIconUrl);
      
      // get current date
      let currentDate = new Date(
        data.dt * 1000
      );
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();
      let currentMDY = `${currentMonth}/${currentDay}/${currentYear}`
      console.log("current MDY is:", currentMDY);

      // get current temp in F, wind in mph, and humidity
      let currentTemp = Math.round(data.main.temp); 
      console.log("currentTemp is: ", currentTemp);

      let currentWind = data.wind.speed;
      console.log("currentWind is:", currentWind);

      let currentHumidity = data.main.humidity
      console.log("currentHumidity is:", currentHumidity);
      console.log("----")        

      // display current name, icon, temp, wind, and humidity 
      weatherAreaEl.style.display = "block";
      cityInfoEl.innerHTML = `${currentCity} (${currentMDY})`;
      cityIconEl.setAttribute("src", currentIconUrl);
      cityTempEl.innerHTML = `Temp: ${currentTemp}ºF`
      cityWindEl.innerHTML = `Wind: ${currentWind} MPH`
      cityHumidityEl.innerHTML = `Humidity: ${currentHumidity} %`
      
      // get latitude and longitude from api call
      let cityLat = data.coord.lat;
      let cityLon = data.coord.lon;
      
      // get uvi index for city
      let uviRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}&cnt=1`
      fetch(uviRequestUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // console.log("** current uvi data is: **\n", data);
        let currentUvi = data.current.uvi
        console.log("currentUvi is:", currentUvi);
        console.log("----")        

        // display current uv index
        cityUviEl.innerHTML = `UV Index: ${currentUvi}`
      })
      
      // get 5-day forecast for city
      let oneRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}&cnt=1`
      fetch(oneRequestUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
        // console.log("** forecast data is: **\n", data);

          /* 
           * Day 1 Weather
          */

          // get day1 icon 
          let day1Icon = data.daily[1].weather[0].icon;
          console.log("day1Icon is:", day1Icon);
          let day1IconUrl = `http://openweathermap.org/img/wn/${currentIcon}%402x.png`
          console.log(day1IconUrl);

          // get day1 date
          let day1Date = new Date(
            data.daily[1].dt * 1000
          );
          let day1Year = day1Date.getFullYear();
          let day1Month = day1Date.getMonth() + 1;
          let day1Day = day1Date.getDate();
          let day1MDY = `${day1Month}/${day1Day}/${day1Year}`
          console.log('day1MDY is:', day1MDY);

          // get day1 temp, wind, and humidity
          let day1Temp = Math.round(data.daily[1].temp.day); 
          console.log("day1Temp is:", day1Temp);
          
          let day1Wind = data.daily[1].wind_speed;
          console.log("day1Wind is:", day1Wind);

          let day1Humidity = data.daily[1].humidity;
          console.log("day1Humidity is:", day1Humidity);
          console.log("----");

          // display day1 weather
          day1DateEl.innerHTML = day1MDY;
          day1IconEl.setAttribute("src", day1IconUrl);
          day1TempEl.innerHTML = `Temp: ${day1Temp}ºF`
          day1WindEl.innerHTML = `Wind: ${day1Wind} MPH`
          day1HumidityEl.innerHTML = `Humidity: ${day1Humidity} %`

          /* 
           * Day 2 Weather
          */

          // get day2 icon
          let day2Icon = data.daily[2].weather[0].icon;
          console.log("day2Icon is:", day2Icon);
          let day2IconUrl = `http://openweathermap.org/img/wn/${currentIcon}%402x.png`
          console.log(day2IconUrl);

          // get day2 date
          let day2Date = new Date(
            data.daily[2].dt * 1000
          );
          let day2Year = day2Date.getFullYear();
          let day2Month = day2Date.getMonth() + 1;
          let day2Day = day2Date.getDate();
          let day2MDY = `${day2Month}/${day2Day}/${day2Year}`
          console.log('day2MDY is:', day2MDY);

          // get day2 temp, wind, and humidity
          let day2Temp = Math.round(data.daily[2].temp.day); 
          console.log("day2Temp is:", day2Temp);
          
          let day2Wind = data.daily[2].wind_speed;
          console.log("day2Wind is:", day2Wind);

          let day2Humidity = data.daily[2].humidity;
          console.log("day2Humidity is:", day2Humidity);
          console.log("----");

          // display day2 weather
          day2DateEl.innerHTML = day2MDY;
          day2IconEl.setAttribute("src", day2IconUrl);
          day2TempEl.innerHTML = `Temp: ${day2Temp}ºF`
          day2WindEl.innerHTML = `Wind: ${day2Wind} MPH`
          day2HumidityEl.innerHTML = `Humidity: ${day2Humidity} %`

          /* 
           * Day 3 Weather
          */

          // get day3 icon 
          let day3Icon = data.daily[3].weather[0].icon;
          console.log("day3Icon is:", day3Icon);
          let day3IconUrl = `http://openweathermap.org/img/wn/${currentIcon}%402x.png`
          console.log(day3IconUrl);

          // get day3 date
          let day3Date = new Date(
            data.daily[3].dt * 1000
          );
          let day3Year = day3Date.getFullYear();
          let day3Month = day3Date.getMonth() + 1;
          let day3Day = day3Date.getDate();
          let day3MDY = `${day3Month}/${day3Day}/${day3Year}`
          console.log('day3MDY is:', day3MDY);

          // get day3 temp, wind, and humidity
          let day3Temp = Math.round(data.daily[3].temp.day); 
          console.log("day3Temp is:", day3Temp);
          
          let day3Wind = data.daily[3].wind_speed;
          console.log("day3Wind is:", day3Wind);

          let day3Humidity = data.daily[3].humidity;
          console.log("day3Humidity is:", day3Humidity);
          console.log("----");

          // display day3 weather
          day3DateEl.innerHTML = day3MDY;
          day3IconEl.setAttribute("src", day3IconUrl);
          day3TempEl.innerHTML = `Temp: ${day3Temp}ºF`
          day3WindEl.innerHTML = `Wind: ${day3Wind} MPH`
          day3HumidityEl.innerHTML = `Humidity: ${day3Humidity} %`

          /* 
           * Day 4 Weather
          */

          // get day4 icon
          let day4Icon = data.daily[4].weather[0].icon;
          console.log("day4Icon is:", day4Icon);
          let day4IconUrl = `http://openweathermap.org/img/wn/${currentIcon}%402x.png`
          console.log(day4IconUrl);

          // get day4 date
          let day4Date = new Date(
            data.daily[4].dt * 1000
          );
          let day4Year = day4Date.getFullYear();
          let day4Month = day4Date.getMonth() + 1;
          let day4Day = day4Date.getDate();
          let day4MDY = `${day4Month}/${day4Day}/${day4Year}`
          console.log('day4MDY is:', day4MDY);

          // get day4 temp, wind, and humidity
          let day4Temp = Math.round(data.daily[4].temp.day); 
          console.log("day4Temp is:", day4Temp);
          
          let day4Wind = data.daily[4].wind_speed;
          console.log("day4Wind is:", day4Wind);

          let day4Humidity = data.daily[4].humidity;
          console.log("day4Humidity is:", day4Humidity);
          console.log("----");

          // display day4 weather
          day4DateEl.innerHTML = day4MDY;
          day4IconEl.setAttribute("src", day4IconUrl);
          day4TempEl.innerHTML = `Temp: ${day4Temp}ºF`
          day4WindEl.innerHTML = `Wind: ${day4Wind} MPH`
          day4HumidityEl.innerHTML = `Humidity: ${day4Humidity} %`

          /* 
           * Day 5 Weather
          */

          // get day5 icon
          let day5Icon = data.daily[5].weather[0].icon;
          console.log("day5Icon is:", day5Icon);
          let day5IconUrl = `http://openweathermap.org/img/wn/${currentIcon}%402x.png`
          console.log(day5IconUrl);

          // get day5 date
          let day5Date = new Date(
            data.daily[5].dt * 1000
          );
          let day5Year = day5Date.getFullYear();
          let day5Month = day5Date.getMonth() + 1;
          let day5Day = day5Date.getDate();
          let day5MDY = `${day5Month}/${day5Day}/${day5Year}`
          console.log('day5MDY is:', day5MDY);

          // get day5 temp, wind, and humidity
          let day5Temp = Math.round(data.daily[5].temp.day); 
          console.log("day5Temp is:", day5Temp);
          
          let day5Wind = data.daily[5].wind_speed;
          console.log("day5Wind is:", day5Wind);

          let day5Humidity = data.daily[5].humidity;
          console.log("day5Humidity is:", day5Humidity);
          console.log("----");

          // display day5 weather
          day5DateEl.innerHTML = day5MDY;
          day5IconEl.setAttribute("src", day5IconUrl);
          day5TempEl.innerHTML = `Temp: ${day5Temp}ºF`
          day5WindEl.innerHTML = `Wind: ${day5Wind} MPH`
          day5HumidityEl.innerHTML = `Humidity: ${day5Humidity} %`
        });
      
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
  console.log("search history is:", searchHistory);
});