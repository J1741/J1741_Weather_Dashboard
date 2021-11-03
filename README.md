# J1741 Weather Dashboard

## Overview

Weather Dashboard is a front-end Javascript application that lets users search for a city by name, then view the city's current weather conditions and its 5-day forecast.

Technologies used by the application include the `JavaScript` and server-side API calls to the [Open Weather Map API](https://openweathermap.org/api). Installation requirements, steps, and usage instructions are provided below.

The deployed application can be accessed here:
https://j1741.github.io/J1741_Weather_Dashboard

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Future Development](#future-development)
- [Questions](#questions)
- [Screenshots](#screenshots)

## Installation

### Requirements

There are no specific installation requirements for the Weather Dashboard, other than a modern browser and an internet connection.

Optionally, you can want to obtain your own API key from Open Weather Map to replace the one provided in the app.

Read more about getting started with Open Weather Map's API's [here](https://openweathermap.org/appid)

### Steps

Clone the project repo here: https://github.com/J1741/J1741_Weather_Dashboard

## Usage

After you have completed the installation steps above, do the following to use the Weather Dashboard:

### Step 1. Launch the application

Navigate to the root of the project directory, and open the index.html file in your default browser.

When the page loads, you will be presented with a form where you can search for a city.

### Step 2. Search for a city

Enter the name of city whose weather you would like to view, and hit Enter or the Search button in the application.

This will issue API calls to Open Weather Map to obtain the current conditions, UV index, and 5-day forecast for the requested city.

Once the API calls have completed, the application will display the current conditions and 5-day forecast in a dashboard format.

The current conditions area displays the requested city's name, the current date, and its current weather data:

- Weather conditions icon
- Temperature (ºF)
- Wind speed (MPH)
- Humidity (%)
- UV Index

The 5-day forecast for city is displayed below current conditions, with a card containing the following information for each forecast day:

- Forecast Date (MM/DD/YYYY)
- Weather conditions icon
- Temperature (ºF)
- Wind speed (MPH)
- Humidity (%)

Additionally, the application stores previously searched cities in Local Storage in an array with a key of `prevCity`, and console logs the history each time a new city's weather is searched.

## Future Development

Directions for future development include:

- Displaying each city as button below the search form, such clicking a previously searched city's button will display that city's weather again
- Adding a button to clear search history

## Contributing

Contributions to the Weather Dashboard project are welcome!

The project repo can be forked here: https://github.com/J1741/J1741_Weather_Dashboard

## Questions

Questions and inquiries about the Weather Dashboard project can be directed to the developer via GitHub: https://github.com/J1741

Or via email: jseventeen41@gmail.com

## Screenshots

The following screenshots illustrate the deployed application in desktop and mobile-friendly views:
![Alt text](./screenshot_desktop.png?raw=true "Screenshot of desktop view")
![Alt text](./screenshot_mobile.png?raw=true "Screenshot of mobile-friendly view")
