<h1 align="center">
  <br>
  <a href="https://nomnio-weather-forecast.herokuapp.com/#/home" target="_blank"><img src="/img/favicon.png" alt="Weather logo" width="200"></a>
  <br>
  Weather Forecast
  <br>
</h1>

<h4 align="center">
A simple ionic application deployed to <a href="https://nomnio-weather-forecast.herokuapp.com/#/home" target="_blank">Heroku</a>.
</h4>

<p align="center">

  <a href="https://github.com/ionic-team/ionic-framework">
    <img src="https://img.shields.io/badge/ionic-6.1.9-blue?logo=Ionic"
         alt="Ionic">
  </a>
  
  <a href="https://github.com/angular/angular">
    <img src="https://img.shields.io/badge/angular-14.0.0-red?logo=Angular"
         alt="Angular">
  </a>
  
  <a href="https://github.com/Leaflet/Leaflet">
      <img src="https://img.shields.io/badge/leaftlet-1.8.0-green?logo=Leaflet"
         alt="Leaflet">
  </a>
  
  <a href="https://dashboard.heroku.com/">
    <img src="https://img.shields.io/badge/heroku-deployment-purple?logo=Heroku"
         alt="Heroku">
  </a>
  
</p>

<p align="center">
  <a href="#general-information">General Information</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#structure">Structure</a> •
  <a href="#how-to">How to</a> •
  <a href="#to-do">TO-DO</a> •
  <a href="#credits">Credits</a>
</p>

![screenshot](https://github.com/JanaJankovic/weather-forecast/blob/master/img/home.png)

## General Information

This application is developed as a test task for the job interview. 
Main goal is to demonstrate set of skills in the front-end development and knowledge of the required technologies.
Application is developed in Ionic/Angular technology and uses other thrid-party dependencies for the required/added features.


## Key Features

* Shows current weather and forecast data
  - Fetches forecast and weather data from the ![OpenWeather](https://openweathermap.org/) and shows the formatted date using ![moment.js](https://github.com/moment/moment/)
* Language selection
  - Application lets you pick prefered a language implemented with the ![ngx-translate](https://github.com/ngx-translate/)
* Allows to refresh without loading of the entire page
* User-friendly experience 
  - Application saves the last chosen location and weather/forecast data in the local storage
* Easy location look-up
  - User can search for location in the Search Page or selected any prefered point on the Map Page
* Access to the saved favorite cities from menu
* Desired settings 
  - Application saves the preferences for units of measure and language in the local storage
* Responsive design
* Cross platform
  - Progressive Web, Android and iOS.

## Structure

This application is made with ``` <ion-menu> ``` as it allows for cleaner look of the following pages:
  * **Home** - main page that displays weather/forecast information
  * **Search** - page for looking up the location of desired city based on the name
  * **Maps** - page for manually clicking the location on the map for the desired coordinates
  * **Settings** - page for settings the preferences of the app
  
Data structure of this application is achieved by model.ts files in models folder and it consists of the following:
  * **CityModel** - stores coordinates, name and country of desired location
  * **ErrorModel** - used for handling error messages
  * **ForecastModel** - made after API documentation for easier coding experience
  * **LanguageModel** - used for structuring global list of available languages
  * **PageModel** - used for structuriong global list of available pages
  * **QueryModel** - used for creating url query from required parameters
  * **SettingsModel** - used for structuring user preferences
  * **WeatherModel** - made after API documentation for easier coding experience
  
 Services used in this application are the following:
   * **EventService** - used for publishing/subscribing for the change of state of globally available varibales
   * **NetworkService** - used for API communication
   * **StateService** - used for managing state of global variables and handling local storage operations
   
Other structure element worth mentioning is the global folder that holds the following files:
  * **constants.ts** - static unchangeable variables like supported pages/languages
  * **endpoints.ts** - API endpoints
  * **utils.ts** - Utility function used for minor data modification like getting correct icon and formatting date
  
## How To

To install weather application do the following commads:

```bash
# Clone this repository
$ git clone https://github.com/JanaJankovic/weather-forecast

# Go into the repository
$ cd weather-forecast

# Install dependencies
$ npm install

# Run the app
$ ionic serve
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## TO DO

* Test application on Android native device with generating project using capacitor
* Test application on iOS native device with generating project using capacitor
* Debug/fix iOS style problems
* Change behaviour of weather details data on tablet sized devices
* Debug why scrolling functions don't work
* Find safer way to access API keys from Heroku environment variables

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Ionic](https://github.com/ionic-team/ionic-framework)
- [Angular](https://github.com/angular/angular)
- [Capacitor](https://capacitorjs.com/)
- [Cordova geolocation plugin](https://cordova.apache.org/docs/en/10.x/reference/cordova-plugin-geolocation/)
- [Leaflet](https://github.com/Leaflet/Leaflet)
- [ngx-translate](https://github.com/ngx-translate/)
- [moment.js](https://github.com/moment/moment/)
