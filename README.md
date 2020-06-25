# Weather-Dashboard-App
This application is a means to snag key weather data from a weather api and display in a dashboard format.  The intent is to create a functional app that can be dropped in other sites, pages, and applications to provide user-friendly read-out of weather based on preferred location and localMemory storage, and dynamically update the HTML and CSS accordingly.

# Functional Reliabilities
The application makes use of the [openWeather API](https://openweathermap.org/api), ajax, standard ES6 Javascript as well as jQuery, and leverages Bootstrap (4.5.0) for the majority of the dashboard's style handling.

# User Interface & Functional Behavior
Conceptually, the application provides a form input interface to allow a user to search for a city.  The user is presented with weather information (conditions, temp, forecast, etc.) for the search-upon city, and the city is added to the search history for user convenience - allowing them to reference previously searched locations.  Specific weather conditions pulled in from the API include temperature, humidty, wind speed, UV index (which includes a color indicator of to denote favorable/moderate/severe conditaions).  The weather read-out also displays a 5-day forecast with date, weather, and weather condition icon.  Cities are stored in localStorage (browser-specific to the user, secure, and session-independent) so that they can access previously search cities for ease and expediency. And selection of previously searched cities refreshes the display and shows the appropriate read-out for that particular city. In addition, the localStorage holds the last searched city for the user so that they see the weather data for that city displayed in the dashboard upon opening the page. 

# Reviewing the Deployed Application
You can review the deployed application at https://srmchartroom.github.io/Weather-Dashboard-App. 
