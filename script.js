//? This file handles all scripting functionality of the Weather Dashboard Application.
//?  See specific comments within the below for direction on functionality for your own refactoring and use.

//! --- Previous Searches Array

let prevSearch = []; // Creates an empty array with the var name "prevSearch"
  if ((localStorage.getItem("Cities")) == null) { // Checks if a localStorage object for holding searched-upon cities exists...
    localStorage.setItem("Cities", JSON.stringify(prevSearch)); // ...if not, create one
  } else { // if the localStorage object does exist...
    prevSearch = JSON.parse(localStorage.getItem("Cities")); // ...grab it and parse it to draw values from and add values to it
  }

//! --- UV TOOLTIPS --- //

// Enabling Tooltips for UV indexes
$(function () { 
  $('[data-toggle="tooltip"]').tooltip()
})

// Setting variables to hold the tooltip text. This will be placed in the "title" attribute of the #currUVspan based on the current selected city's UV Index.
  const ttLow = 'LOW (1-2 UVI): Safe to be outdoors - No protection required.';
  const ttMod = 'Moderate (3-5 UVI):  Take precautions, such as covering up during midday hours, wearing a hat and sunglasses and using sunscreen. Stay in the shade near midday when the sun is strongest.'; 
  const ttHigh = 'High (6-7 UVI):  Wear sunglasses and use SPF 30+ sunscreen, cover the body with sun protective clothing and a wide-brim hat, and reduce time in the sun from three hours before to three hours after solar noon.';
  const ttVHigh = 'Very High (8-10 UVI):  Wear SPF 30+ sunscreen, a shirt, sunglasses, and a hat. Do not stay out in the sun for too long.';
  const ttExtreme = 'Extreme (11+ UVI):  Wear SPF 30+ sunscreen, a shirt, sunglasses, and a hat. Do not stay out in the sun for too long.';

// Setting easy variables for handling the UV block's background class
  const uvClassLow = 'btn bg-low';
  const uvClassMod = 'btn bg-moderate';
  const uvClassHigh = 'btn bg-high';
  const uvClassVHigh = 'btn bg-vhigh';
  const uvClassExtreme = 'btn bg-extreme';

//! --- API VARIABLES --- //

//! API VARS TO POPULATE FROM OR USE WITH WEATHER API OF OPENWEATHERMAP.ORG //
  let currCity = "";  // variable to be updated with searched city or selection of a previous city - placeholder initially set to empty
  let currIcon = ''; // current selection's weather icon for today - initially set to empty; will be populated by the API response
  let currCondition = ''; // current selection's condition description for today - initially set to empty; will be populated by API response
  let currDate = ''; // current date placeholder var - initially set to empty; will be populated by API response
  let currLon = ''; // current selection's longitude to use in params for oneCall API of OpenWeatherMap.org - placeholder initially set to empty
  let currLat = ''; // current selection's latitude to use in paarams for oneCall API of OpenWeatherMap.org - placeholder initially set to empty

//! API VARS TO POPULATE FROM OR USE WITH ONECALL API OF OPENWEATHERMAP.ORG //

  let currTemp = ''; // current selection's Temp for today from oneCall API of OpenWeatherMap.org - placeholder initially set to empty
  let currHumidity = ''; // current selection's Humidity for today from oneCall API of OpenWeatherMap.org - placeholder initially set to empty
  let currWind = ''; // current selection's Wind Speed for today from oneCall API of OpenWeatherMap.org - placeholder initially set to empty
  let currUVI = '' ; // current selection's UVI for today from oneCall API of OpenWeatherMap.org - placeholder initially set to empty
  let currUVIicon = ' <i class="fas fa-info-circle fa-x"></i>'; // var to hold the HTML for the info-circle icon used to indicate tooltips
  let daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; // array for determining the correct days for forecast
  let todayDay = ''; // current api's dt value for today - will be calculated as a new date object and returned in this empty placeholder

//! --- AJAX PARAMETER VARS --- //

//? --- NOTE TO DEVELOPERS & CONTRIBUTORS: Please be sure to secure your own free API key from api.openweathermap.org, and replace the value for the "apiKey" in the queryURL1 and queryURL2 variables below --- //

//! 5-DAY FORECAST DAY VARS //
// Day 1: 
  let d1Day = ''; // Placeholder var for DAY of day 1 of 5-day forecast
  let d1Date = ''; // Placeholder var for DATE of day 1 of 5-day forecast
  let d1MinTemp = ''; // Placeholder var for MINIMUM TEMPERATURE of day 1 of 5-day forecast
  let d1MaxTemp = ''; // Placeholder var for MAXIMUM TEMPERATURE of day 1 of 5-day forecast
  let d1Humidity = ''; // placeholder var for HUMIDITY of day 1 of 5-day forecast
  let d1Icon = ""; // placeholder var for the ICON of day 1 of 5-day forecast 
// Day 2:
  let d2Day = ''; // Placeholder var for DAY of day 2 of 5-day forecast
  let d2Date = ''; // Placeholder var for DATE of day 2 of 5-day forecast
  let d2MinTemp = ''; // Placeholder var for MINIMUM TEMPERATURE of day 2 of 5-day forecast
  let d2MaxTemp = ''; // Placeholder var for MAXIMUM TEMPERATURE of day 2 of 5-day forecast
  let d2Humidity = ''; // placeholder var for HUMIDITY of day 2 of 5-day forecast
  let d2Icon = ""; // placeholder var for the ICON of day 2 of 5-day forecast
// Day 3:
  let d3Day = ''; // Placeholder var for DAY of day 3 of 5-day forecast
  let d3Date = ''; // Placeholder var for DATE of day 3 of 5-day forecast
  let d3MinTemp = ''; // Placeholder var for MINIMUM TEMPERATURE of day 3 of 5-day forecast
  let d3MaxTemp = ''; // Placeholder var for MAXIMUM TEMPERATURE of day 3 of 5-day forecast
  let d3Humidity = ''; // placeholder var for HUMIDITY of day 3 of 5-day forecast
  let d3Icon = ""; // placeholder var for the ICON of day 3 of 5-day forecast
// Day 4:
  let d4Day = ''; // Placeholder var for DAY of day 4 of 5-day forecast
  let d4Date = ''; // Placeholder var for DATE of day 4 of 5-day forecast
  let d4MinTemp = ''; // Placeholder var for MINIMUM TEMPERATURE of day 4 of 5-day forecast
  let d4MaxTemp = ''; // Placeholder var for MAXIMUM TEMPERATURE of day 4 of 5-day forecast
  let d4Humidity = ''; // placeholder var for HUMIDITY of day 4 of 5-day forecast
  let d4Icon = ""; // placeholder var for the ICON of day 4 of 5-day forecast
// Day 5:
  let d5Day = ''; // Placeholder var for DAY of day 5 of 5-day forecast
  let d5Date = ''; // Placeholder var for DATE of day 5 of 5-day forecast
  let d5MinTemp = ''; // Placeholder var for MINIMUM TEMPERATURE of day 5 of 5-day forecast
  let d5MaxTemp = ''; // Placeholder var for MAXIMUM TEMPERATURE of day 5 of 5-day forecast
  let d5Humidity = ''; // placeholder var for HUMIDITY of day 5 of 5-day forecast
  let d5Icon = ""; // placeholder var for the ICON of day 5 of 5-day forecast

// OTHER VARIABLES

  let currentCity = "";  // Placeholder var for Current City set in search and click actions for use in the ajax calls
  let startingCity = ""; // Placeholder var for Current City set in search and click actions for use in the ajax calls

  if (localStorage.getItem("lstCity") == null) { // Checks to see if a localStorage object exists for the last city displayed for weather
    localStorage.setItem("lstCity", "Raleigh"); // If it doesn't exist (for first-time users), set the localStorage object to "Raleigh" so that the initial view of the app on-load displays weather instead of rendering as blank...
    currentCity = localStorage.getItem("lstCity"); // set the currentCity var to the value in the localStorage object
  } else { //... If it does exist...
  currentCity = localStorage.getItem("lstCity"); // set the currentCity var to the value in the localStorage object
  startingCity = localStorage.getItem("lstCity"); // and set the startingCity var to the value in the localStorage object
  }
//! --- RUN THE AJAX CALLS TO INITIALLY SET UP THE PAGE -- //

  getLatLon(); // call the ajax functions and populate/build the page

//! ********************* FUNCTIONS ********************** //

 //! --- SEARCH FORM FUNCTION -- //

  function search() { // create a function "search" to handle what happens when a user enters a city and clicks the "get weather" button...
    let citySearch =  $("#citySearch"); // create a var called "citySearch" and set to the jQuery selection for the search input
    citySearch = citySearch.val().trim(); // reassign the citySearch var to the value entered and trim it to remove whitespaces
    let duplicate = false; // create a var called "duplicate" and set it to false
    prevSearch.forEach(function(item) { // loop through the previously-searched-cities array...
      if(citySearch == item) { // if the searched city value is equal to an item in the array (in other words has been previously searched already)
        duplicate = true; // set the var "duplicate" to true
      }
    });
    if (duplicate == false) { // if the var "duplicate" is still false...
      prevSearch.push(citySearch); // add the new city to the previously searched cities array
    }
    startingCity = ""; // reset the starting city var...
    currentCity = citySearch; // reassign the currentCity variable to the the newly searched city
    localStorage.setItem("lstCity", currentCity); // set localStorage object for last city called "lstCity" to the new current city
    localStorage.setItem("Cities", JSON.stringify(prevSearch));  // refresh in localStorage the array of previously searched cities
    buttonSetup(); // rerun/call the buttonSetup function to prepend the city buttons with this new city
    getLatLon(); // ... and rerun the ajax calls to refresh the weather data displaed on the screen
  }

function getLatLon() { 
//! --- AJAX CALL: WEATHER API OF OPENWEATHERMAP.ORG --- //

  currCity = currentCity; // set the "currCity" var used in the ajax calls to the updated current city var "currentCity"

  // **API key with openWeather (Be sure to secure your own if you clone/download and use this repo)
  const apiKey = '23f82e4cdf1dd3340d14e89dd9f184b8';
  
  // URL for initial OpenWeatherMaps Weather API AJAX call
  let queryURL1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + currCity + '&appid=' + apiKey + '&units=imperial'; 
  $.ajax({ // AJAX API call for OpenWeather's api to get lat and lon of current city
    url: queryURL1, // Sets the URL argument equal to the "queryURL1" var 
    method: "GET" // Sets the method argument equal to "GET"
  }).then(function(responseOne) {  // Sets anonymous function to run once the GET request completes
    currLon = responseOne.coord.lon; // sets response's longitude value to "currLon" var
    currLat = responseOne.coord.lat; // sets response's latitude value to "currLat" var
    currCityName = responseOne.name; // sets response's name value to "currCity" var
    $('#currCity').html(currCityName); // Updates the #currCity span's HTML with the currCity var's value
    currIcon = responseOne.weather[0].icon; // sets response's icon value to "currIcon" var
    $('#currIcon').html('<img src="http://openweathermap.org/img/wn/' + currIcon + '@2x.png" style="margin-right: -20px;"/><span><i class="currIconTooltip fas fa-info-circle pl-0 ml-0 mb-4 super align-bottom" style="font-size: small;"></i></span>'); // updates #currIcon span's HTML with an <img> tag leveraging the currIcon var which is set based on the response
    let currDate = new Date(responseOne.dt * 1000).toLocaleDateString(); // creates a new date object, converts it to milliseconds, and then converts it to the short MM/DD/YYYY format
    $('#currDate').html(currDate); // updates the #currDate span's HTML with the currDate var and converted date object value
    $(document).ready( forecastDetails() ); //when the document is ready, run the forecastDetails() function
  });
}
    
function forecastDetails () { // fuunction to gather the forecast details for the 5-day forecast as well as the UVI for the current weather
//! --- AJAX CALL: ONECALL API OF OPENWEATHERMAP.ORG --- //
      
  // **API key with openWeather (Be sure to secure your own if you clone/download and use this repo)
  const apiKey2 = '94c3858bfc76c4713d5d96a3e602c81d'
  
  // URL for initial OpenWeatherMaps OneCall API AJAX call
  let queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currLat + '&lon=' + currLon + '&exclude=hourly,minutely&appid=' + apiKey2 + '&units=imperial';   // URL for initial OpenWeatherMaps OneCall API AJAX call
  $.ajax({ // AJAX API call for OpenWeather's api to get the 5-day forecast and UVI index for current weather
    url: queryURL2, // Sets the URL argument equal to the "queryURL2" var 
    method: 'GET' // Sets the method argument equal to "GET"
  }).then(function(responseTwo) { // Sets anonymous function to run once the GET request completes
    currTemp = responseTwo.current.temp; // Sets response's current temperature value to"currTemp" var
    $("#currIcon").attr("data-original-title", currCondition); // Updates the #currIcon with a data-original-title attributes set to currCondition value for the tooltip
    $("#currTemp").html(currTemp + " &deg;F"); // Updates the #currTemp span's HTML with the currTemp var's value
    currHumidity = responseTwo.current.humidity; // Sets response's current humidity value to "currHumidity" var
    $("#currHumidity").html(currHumidity + "%"); // Updates the #currHumidity span's HTML with the currHumidity var's value
    currWind = responseTwo.current.wind_speed; // Sets response's current wind speed value to "currWind" var
    $("#currWind").html(currWind + " MPH"); // Updates the #currWind span's HTML with the currWind var's value
    currUVI = responseTwo.current.uvi; // Sets response's current UV index value to "currUVI" var
    $("#currUVbtn").html(currUVI + currUVIicon); // Updates the #currUVbtn button's HTML with the currUVI var's value and add an info icon
    if(currUVI < 3) { // if the UV index is 1-2...
      $("#currUVspan").attr("data-original-title", ttLow); // Update the #currUVSpan with a "data-original-title" attribute with the tooltip text held in ttLow
      $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme"); // Removes all classes that conditionally style the UVI holder based on index level
      $("#currUVbtn").addClass("bg-low"); // ...add class "bg-low" to style the UVI holder appropriately for low index
    } else if (currUVI >= 3 && currUVI < 6) { // if the UV index is 3-5...
      $("#currUVspan").attr("data-original-title",ttMod); // Update the #currUVSpan with a "data-original-title" attribute with the tooltip text held in ttMod
      $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme"); // Removes all classes that conditionally style the UVI holder based on index level
      $("#currUVbtn").addClass("bg-moderate"); // ...add class "bg-moderate" to style the UVI holder appropriately for moderate index
    } else if (currUVI >= 6 && currUVI < 8) { // if the UV index is 6-7...
      $("#currUVspan").attr("data-original-title",ttHigh); // Update the #currUVSpan with a "data-original-title" attribute with the tooltip text held in ttHigh
      $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme"); // Removes all classes that conditionally style the UVI holder based on index level
      $("#currUVbtn").addClass("bg-high"); // ...add class "bg-high" to style the UVI holder appropriately for high index
    } else if (currUVI >= 8 && currUVI < 11) { // if the UV index is 8-10...
      $("#currUVspan").attr("data-original-title", ttVHigh); // Update the #currUVSpan with a "data-original-title" attribute with the tooltip text held in ttVHigh
      $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme"); // Removes all classes that conditionally style the UVI holder based on index level
      $("#currUVbtn").addClass("bg-vhigh"); // ...add class "bg-vhigh" to style the UVI holder appropriately for very high index
    } else if (currUVI >= 11) { // if the UV index is 11+...
      $("#currUVspan").attr("data-original-title",ttExtreme); // Update the #currUVSpan with a "data-original-title" attribute with the tooltip text held in ttExtreme
      $("currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme"); // Removes all classes that conditionally style the UVI holder based on index level
      $("#currUVbtn").addClass("bg-extreme"); // ...add class "bg-extreme" to style the UVI holder appropriately for extreme index
    }
    let currConditionMain = responseTwo.current.weather[0].main; // sets response's condition value to "currConditionMain" var
    let currConditionDescrip = responseTwo.current.weather[0].description; // sets responses condition description value to "currConditionDescrip" var
    currCondition = currConditionMain + ": " + currConditionDescrip; // sets a concatenated var called "currCondition" to the currConditionMain + currConditionDescrip
    $("#currIcon").attr("data-original-title", currCondition); // Update the #currIcon info span's "data-original-title" attribute with the new currCondition var 
    let currDay = new Date(responseTwo.current.dt * 1000).getDay(); // create a new var called currDay to be a new date and convert the unix format date variable to standard human-readable and get the numeric day value (1-7)
    todayDay = daysOfWeek[currDay]; // set the todayDay var (to be the current day) to the value in the daysOfWeek array of the same index 
    let ddo1 = new Date(responseTwo.daily[1].dt * 1000).getDay(); // create a new var called ddo1 to be a new date and convert the unix format date variable to standard human-readable and the get the day value of the first index in the response's forecast array
    if (currDay == 0 || currDay == 1) { // if the returned day is Sunday or Monday...
      d1Day = daysOfWeek[currDay + 1]; // set day 1's var to be the day index + 1 (so Monday if Sunday, or Tuesday if Monday)
      d2Day = daysOfWeek[currDay + 2]; // set day 2's var to be the day index + 2 (so Tuesday if Sunday, or Wednesday if Monday)
      d3Day = daysOfWeek[currDay + 3]; // set day 3's var to be the day index + 3 (so Wednesday if Sunday, or Thursday if Monday)
      d4Day = daysOfWeek[currDay + 4]; // set day 4's var to be the day index + 4 (so Thursday if Sunday, or Friday if Monday)
      d5Day = daysOfWeek[currDay + 5]; // set day 5's var to be the day index + 5 (so Friday if Sunday), or Saturday if Monday)
    } else if (currDay == 2) {  // if the returned day is Tuesday...
      d1Day = daysOfWeek[3]; // set day 1's var to be the day index 3 (Wednesday)
      d2Day = daysOfWeek[4]; // set day 2's var to be the day index 4 (Thursday)
      d3Day = daysOfWeek[5]; // set day 3's var to be the day index 5 (Friday)
      d4Day = daysOfWeek[6]; // set day 4's var to be the day index 6 (Saturday)
      d5Day = daysOfWeek[0]; // set day 5's var to be the day index 0 (Sunday)
    } else if (currDay == 3) { // if the returned day is Wednesday...
      d1Day = daysOfWeek[4]; // set day 1's var to be the day index 4 (Thursday)
      d2Day = daysOfWeek[5]; // set day 2's var to be the day index 5 (Friday)
      d3Day = daysOfWeek[6]; // set day 3's var to be the day index 6 (Saturday)
      d4Day = daysOfWeek[0]; // set day 4's var to be the day index 0 (Sunday)
      d5Day = daysOfWeek[1]; // set day 5's var to be the day index 1 (Monday)
    } else if (currDay == 4) { // if the returned day is Thursday...
      d1Day = daysOfWeek[5]; // set day 1's var to the day index 5 (Friday)
      d2Day = daysOfWeek[6]; // set day 2's var to the day index 6 (Saturday)
      d3Day = daysOfWeek[0]; // set day 3's var to the day index 0 (Sunday)
      d4Day = daysOfWeek[1]; // set day 4's var to the day index 1 (Monday)
      d5Day = daysOfWeek[2]; // set day 5's var to the day index 2 (Tuesday)
    } else if (currDay == 5) { // if the returned day is Friday...
      d1Day = daysOfWeek[6]; // set day 1's var to the day index 6 (Saturday)
      d2Day = daysOfWeek[0]; // set day 2's var to the day index 0 (Sunday)
      d2Day = daysOfWeek[1]; // set day 3's var to the day index 1 (Monday)
      d2Day = daysOfWeek[2]; // set day 4's var to the day index 2 (Tuesday)
      d2Day = daysOfWeek[3]; // set day 5's var to the day index 3 (Wednesday)
    } else if (currDay == 6) { // if the returned day is Saturday...
      d1Day = daysOfWeek[0]; // set day 1's var to the day index 0 (Sunday)
      d2Day = daysOfWeek[1]; // set day 2's var to the day index 1 (Monday)
      d2Day = daysOfWeek[2]; // set day 3's var to the day index 2 (Tuesday)
      d2Day = daysOfWeek[3]; // set day 4's var to the day index 3 (Wednesday)
      d2Day = daysOfWeek[4]; // set day 5's var to the day index 4 (Thursday)
    }
    $("#d1Day").html(d1Day); // Update the day 1 Day span's html with the d1Day var's value
    d1Date = new Date(responseTwo.daily[1].dt * 1000).toLocaleDateString(); // Set var d1Date and assign to a new date, convert the unix time value in index 1 of the forecast api response, and convert to a short date format
    $("#d1Date").html(d1Date); // Update the #d1Date span's html with the d1Date var's value
    d1MinTemp = responseTwo.daily[1].temp.min; // Set var d1MinTemp to the minimum temperature in index 1 of the ajax response's forecast array
    $("#d1MinTemp").html(d1MinTemp); // Update the #d1MinTemp span's html with the d1MinTemp var's value
    d1MaxTemp = responseTwo.daily[1].temp.max; // Set var d1MaxTemp to the maximum temperature in index 1 of the ajax response's forecast array
    $("#d1MaxTemp").html(d1MaxTemp); // Update the #d1MaxTemp span's html with the d1MaxTemp var's value
    d1Humidity = responseTwo.daily[1].humidity; // Set var d1Humidity to the humidity value in index 1 of the ajax response's forecast array
    $("#d1Humidity").html(d1Humidity); // Update the #d1Humidity span's html with the d1Humidity var's value
    d1Icon = responseTwo.daily[1].weather[0].icon; // Set var d1Icon to the weather icon in index 1 of the ajax response's forecast array
    $("#d1Icon").html('<img src="http://openweathermap.org/img/wn/' + d1Icon + '.png" />'); // Update the #d1Icon span's html with the concatenated url including the d1Icon var's value

    $("#d2Day").html(d2Day); // Update the day 2 Day span's html with the d2Day var's value
    d2Date = new Date(responseTwo.daily[2].dt * 1000).toLocaleDateString(); // Create a var d2Date and assign to a new date, convert the unix time value in index 2 of the forecast api response, and convert to a short date format
    $("#d2Date").html(d2Date); // Update the #d2Date span's html with the d2Date var's value
    d2MinTemp = responseTwo.daily[2].temp.min; // Set var d2MinTemp to the minimum temperature in index 2 of the ajax response's forecast array
    $("#d2MinTemp").html(d2MinTemp); // Update the #d2MinTemp span's html with the d2MinTemp var's value
    d2MaxTemp = responseTwo.daily[2].temp.max; // Set var d2MaxTemp to the maximum temperature in index 2 of the ajax response's forecast array
    $("#d2MaxTemp").html(d2MaxTemp); // Update the #d2MaxTemp span's html with the d2MaxTemp var's value
    d2Humidity = responseTwo.daily[2].humidity; // Set var d2Humidity to the humidity value in index 2 of the ajax response's forecast array
    $("#d2Humidity").html(d2Humidity); // Update the #d2Humidity span's html with the d2Humidity var's value
    d2Icon = responseTwo.daily[2].weather[0].icon; // Set var d2Icon to the weather icon in index 2 of the ajax response's forecast array
    $("#d2Icon").html('<img src="http://openweathermap.org/img/wn/' + d2Icon + '.png" />'); // Update the #d2Icon span's html with the concatenated url including the d2Icon var's value

    $("#d3Day").html(d3Day); // Update the day 3 Day span's html with the d3Day var's value
    d3Date = new Date(responseTwo.daily[3].dt * 1000).toLocaleDateString(); // Create a var d3Date and assign to a new date, convert the unix time value in index 3 of the forecast api response, and convert to a short date format
    $("#d3Date").html(d3Date); // Update the #d3Date span's html with the d3Date var's value
    d3MinTemp = responseTwo.daily[3].temp.min; // Set var d3MinTemp to the minimum temperature in index 3 of the ajax response's forecast array
    $("#d3MinTemp").html(d3MinTemp); // Update the #d3MinTemp span's html with the d3MinTemp var's value
    d3MaxTemp = responseTwo.daily[3].temp.max; // Set var d3MaxTemp to the maximum temperature in index 3 of the ajax response's forecast array
    $("#d3MaxTemp").html(d3MaxTemp); // Update the #d3MaxTemp span's html with the d3MaxTemp var's value
    d3Humidity = responseTwo.daily[3].humidity; // Set var d3Humidity to the humidity value in index 3 of the ajax response's forecast array
    $("#d3Humidity").html(d3Humidity); // Update the #d3Humidity span's html with the d3Humidity var's value
    d3Icon = responseTwo.daily[3].weather[0].icon; // Set var d3Icon to the weather icon in index 3 of the ajax response's forecast array
    $("#d3Icon").html('<img src="http://openweathermap.org/img/wn/' + d3Icon + '.png" />'); // Update the #d3Icon span's html with the concatenated url including the d3Icon var's value

    $("#d4Day").html(d4Day); // Update the day 4 Day span's html with the d4Day var's value
    d4Date = new Date(responseTwo.daily[4].dt * 1000).toLocaleDateString(); // Create a var d4Date and assign to a new date, convert the unix time value in index 4 of the forecast api response, and convert to a short date format
    $("#d4Date").html(d4Date); // Update the #d4Date span's html with the d4Date var's value
    d4MinTemp = responseTwo.daily[4].temp.min; // Set var d4MinTemp to the minimum temperature in index 4 of the ajax response's forecast array
    $("#d4MinTemp").html(d4MinTemp); // Update the #d4MinTemp span's html with the d4MinTemp var's value
    d4MaxTemp = responseTwo.daily[4].temp.max; // Set var d4MaxTemp to the maximum temperature in index 4 of the ajax response's forecast array
    $("#d4MaxTemp").html(d4MaxTemp); // Update the #d4MaxTemp span's html with the d4MaxTemp var's value
    d4Humidity = responseTwo.daily[4].humidity; // Set var d4Humidity to the humidity value in index 4 of the ajax response's forecast array
    $("#d4Humidity").html(d4Humidity); // Update the #d4Humidity span's html with the d4Humidity var's value
    d4Icon = responseTwo.daily[4].weather[0].icon; // Set var d4Icon to the weather icon in index 4 of the ajax response's forecast array
    $("#d4Icon").html('<img src="http://openweathermap.org/img/wn/' + d4Icon + '.png" />'); // Update the #d4Icon span's html with the concatenated url including the d4Icon var's value
        
    $("#d5Day").html(d5Day); // Update the day 5 Day span's html with the d5Day var's value
    d5Date = new Date(responseTwo.daily[5].dt * 1000).toLocaleDateString(); // Create a var d5Date and assign to a new date, convert the unix time value in index 5 of the forecast api response, and convert to a short date format
    $("#d5Date").html(d5Date); // Update the #d5Date span's html with the d5Date var's value
    d5MinTemp = responseTwo.daily[5].temp.min; // Set var d5MinTemp to the minimum temperature in index 5 of the ajax response's forecast array
    $("#d5MinTemp").html(d5MinTemp); // Update the #d5MinTemp span's html with the d5MinTemp var's value
    d5MaxTemp = responseTwo.daily[5].temp.max; // Set var d5MaxTemp to the maximum temperature in index 5 of the ajax response's forecast array
    $("#d5MaxTemp").html(d5MaxTemp); // Update the #d5MaxTemp span's html with the d5MaxTemp var's value
    d5Humidity = responseTwo.daily[5].humidity; // Set var d5Humidity to the humidity value in index 5 of the ajax response's forecast array 
    $("#d5Humidity").html(d5Humidity); // Update the #d5Humidity span's html with the d5Humidity var's value
    d5Icon = responseTwo.daily[5].weather[0].icon; // Set var d5Icon to the weather icon in index 5 of the ajax response's forecast array 
    $("#d5Icon").html('<img src="http://openweathermap.org/img/wn/' + d5Icon + '.png" />'); // Update the #d5Icon span's html with the concatenated url including the d5Icon var's value
  });
}



