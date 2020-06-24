//? This file handles all scripting functionality of the Weather Dashboard Application.
//?  See specific comments within the below for direction on functionality for your own refactoring and use.

//! --- Previous Searches Array



let prevSearch = [];
  if ((localStorage.getItem("Cities")) == null) {
    localStorage.setItem("Cities", JSON.stringify(prevSearch));
    console.log(prevSearch);
  } else { 
    prevSearch = JSON.parse(localStorage.getItem("Cities"));
    console.log(prevSearch);
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

  let currentCity = "";
  let startingCity = "";

  if (localStorage.getItem("lstCity") == null) {
    localStorage.setItem("lstCity", "Raleigh");
  } else {
  // let startingCity = ""; // placeholder var for the STARTING CITY for the getLatLon(); function
  currentCity = localStorage.getItem("lstCity"); // placeholder var for the CURRENT CITY for the getLatLon(); function
  startingCity = localStorage.getItem("lstCity");
  }
//! --- RUN THE AJAX CALLS TO INITIALLY SET UP THE PAGE -- //

  getLatLon();

//! ********************* FUNCTIONS ********************** //

 //! --- SEARCH FORM FUNCTION -- //

  function search() {
    console.log("submitted");
    let citySearch =  $("#citySearch");
    console.log($(citySearch).val());
    citySearch = citySearch.val().trim();
    console.log(citySearch);
    let duplicate = false;
    prevSearch.forEach(function(item) {
      if(citySearch == item) {
        duplicate = true;
        console.log("duplicate found");
      }
    });
    if (duplicate == false) {
      prevSearch.push(citySearch);
    }
    startingCity = "";
    currentCity = citySearch;
    localStorage.setItem("lstCity", currentCity);
    localStorage.setItem("Cities", JSON.stringify(prevSearch));  
    buttonSetup();
    getLatLon();
  }

  
function getLatLon() { 
//! --- AJAX CALL: WEATHER API OF OPENWEATHERMAP.ORG --- //
  // let currCity = prevSearch[prevSearch.length -1];  // variable to be updated with searched city or selection of a previous city - placeholder initially set to empty
   
  
  // if (currentCity == "" && startingCity !== "") {
  //   currCity = startingCity;
  // } else if (currentCity !== "" && startingCity == "") {
  //   currCity = currentCity;
  // } else if (currentCity !== "" && startingCity !== "") {
  //   currCity = currentCity;
  // } else if (localStorage.getItem("lstCity") !== null) {
  //   localStorage.getItem("lstCity");
  // } else {  
  //   currCity = "Raleigh";
  // }
 currCity = currentCity;


  // API key with openWeather (Be sure to secure your own if you clone/download and use this repo)
  const apiKey = '23f82e4cdf1dd3340d14e89dd9f184b8';
  // URL for initial OpenWeatherMaps Weather API AJAX call
  let queryURL1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + currCity + '&appid=' + apiKey + '&units=imperial'; 
  $.ajax({ // AJAX API call for OpenWeather's api to get lat and lon of current city
    url: queryURL1, // Sets the URL argument equal to the "queryURL1" var 
    method: "GET" // Sets the method argument equal to "GET"
    }).then(function(responseOne) {  // Sets anonymous function to run once the GET request completes
      console.log(responseOne); // TODO Remove this once no longer needed
      currLon = responseOne.coord.lon; // sets response's longitude value to "currLon" var
      currLat = responseOne.coord.lat; // sets response's latitude value to "currLat" var
      currCityName = responseOne.name; // sets response's name value to "currCity" var
      $('#currCity').html(currCityName); // Updates the #currCity span's HTML with the currCity var's value
      currIcon = responseOne.weather[0].icon; // sets response's icon value to "currIcon" var
      $('#currIcon').html('<img src="http://openweathermap.org/img/wn/' + currIcon + '@2x.png" style="margin-right: -20px;"/><span><i class="currIconTooltip fas fa-info-circle pl-0 ml-0 mb-4 super align-bottom" style="font-size: small;"></i></span>'); // updates #currIcon span's HTML with an <img> tag leveraging the currIcon var which is set based on the response
      let currDate = new Date(responseOne.dt * 1000).toLocaleDateString(); // creates a new date object, converts it to milliseconds, and then converts it to the short MM/DD/YYYY format
      $('#currDate').html(currDate); // updates the #currDate span's HTML with the currDate var and converted date object value
      console.log(currLon);
      console.log(currLat);
      $(document).ready( forecastDetails() );
    });
  }
    
  function forecastDetails () {
  //! --- AJAX CALL: ONECALL API OF OPENWEATHERMAP.ORG --- //
      // API key with openWeather (Be sure to secure your own if you clone/download and use this repo)
      const apiKey2 = '94c3858bfc76c4713d5d96a3e602c81d'
      let queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currLat + '&lon=' + currLon + '&exclude=hourly,minutely&appid=' + apiKey2 + '&units=imperial';   // URL for initial OpenWeatherMaps OneCall API AJAX call
      $.ajax({
        url: queryURL2,
        method: 'GET'
        }).then(function(responseTwo) {
          console.log(responseTwo);
          currTemp = responseTwo.current.temp; // current temperature
          console.log(currTemp);
          $("#currIcon").attr("data-original-title", currCondition);
          $("#currTemp").html(currTemp + " &deg;F");
          currHumidity = responseTwo.current.humidity; // current humidity
          console.log(currHumidity);
          $("#currHumidity").html(currHumidity + "%");
          currWind = responseTwo.current.wind_speed; // current wind speed
          console.log(currWind);
          $("#currWind").html(currWind + " MPH");
          currUVI = responseTwo.current.uvi; // current UV index
          console.log(currUVI);
          $("#currUVbtn").html(currUVI + currUVIicon);
          if(currUVI < 3) {
            console.log("Low UVI:" + currUVI);
            $("#currUVspan").attr("data-original-title", ttLow);
            $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme");
            $("#currUVbtn").addClass("bg-low");
          } else if (currUVI >= 3 && currUVI < 6) {
            console.log("Moderate UVI:" + currUVI);
            $("#currUVspan").attr("data-original-title",ttMod);
            $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme");
            $("#currUVbtn").addClass("bg-moderate");
          } else if (currUVI >= 6 && currUVI < 8) {
            console.log("High UVI:" + currUVI);
            $("#currUVspan").attr("data-original-title",ttHigh);
            $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme");
            $("#currUVbtn").addClass("bg-high");
          } else if (currUVI >= 8 && currUVI < 11) {
            console.log("Very High UVI:" + currUVI);
            $("#currUVspan").attr("data-original-title", ttVHigh);
            $("#currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme");
            $("#currUVbtn").addClass("bg-vhigh");
          } else if (currUVI >= 11) {
            console.log("Extreme UVI:" + currUVI);
            $("#currUVspan").attr("data-original-title",ttExtreme);
            $("currUVbtn").removeClass("bg-low","bg-moderate","bg-high","bg-vhigh","bg-extreme");
            $("#currUVbtn").addClass("bg-extreme");
          }
          let currConditionMain = responseTwo.current.weather[0].main; // sets response's condition value to "currCondition" var
          let currConditionDescrip = responseTwo.current.weather[0].description; // sets 
          currCondition = currConditionMain + ": " + currConditionDescrip;
          $("#currIcon").attr("data-original-title", currCondition);
          let currDay = new Date(responseTwo.current.dt * 1000).getDay();
          console.log(currDay);
          todayDay = daysOfWeek[currDay];
          console.log(todayDay);
          let ddo1 = new Date(responseTwo.daily[1].dt * 1000).getDay();
          console.log(ddo1);
          if (currDay == 0 || currDay == 1) { d1Day = daysOfWeek[currDay + 1]; d2Day = daysOfWeek[currDay + 2]; d3Day = daysOfWeek[currDay + 3]; d4Day = daysOfWeek[currDay + 4]; d5Day = daysOfWeek[currDay + 5]; } 
          else if (currDay == 2) { d1Day = daysOfWeek[3]; d2Day = daysOfWeek[4]; d3Day = daysOfWeek[5]; d4Day = daysOfWeek[6]; d5Day = daysOfWeek[0]; } 
          else if (currDay == 3) { d1Day = daysOfWeek[4]; d2Day = daysOfWeek[5]; d3Day = daysOfWeek[6]; d4Day = daysOfWeek[0]; d5Day = daysOfWeek[1]; } 
          else if (currDay == 4) { d1Day = daysOfWeek[5]; d2Day = daysOfWeek[6]; d3Day = daysOfWeek[0]; d4Day = daysOfWeek[1]; d5Day = daysOfWeek[2]; } 
          else if (currDay == 5) { d1Day = daysOfWeek[6]; d2Day = daysOfWeek[0]; d2Day = daysOfWeek[1]; d2Day = daysOfWeek[2]; d2Day = daysOfWeek[3]; } 
          else if (currDay == 6) { d1Day = daysOfWeek[0]; d2Day = daysOfWeek[1]; d2Day = daysOfWeek[2]; d2Day = daysOfWeek[3]; d2Day = daysOfWeek[4]; }
          $("#d1Day").html(d1Day);
          d1Date = new Date(responseTwo.daily[1].dt * 1000).toLocaleDateString();
          $("#d1Date").html(d1Date);
          d1MinTemp = responseTwo.daily[1].temp.min
          $("#d1MinTemp").html(d1MinTemp);
          d1MaxTemp = responseTwo.daily[1].temp.max
          $("#d1MaxTemp").html(d1MaxTemp);
          d1Humidity = responseTwo.daily[1].humidity 
          $("#d1Humidity").html(d1Humidity);
          d1Icon = responseTwo.daily[1].weather[0].icon;
          $("#d1Icon").html('<img src="http://openweathermap.org/img/wn/' + d1Icon + '.png" />');

          $("#d2Day").html(d2Day);
          d2Date = new Date(responseTwo.daily[2].dt * 1000).toLocaleDateString();
          $("#d2Date").html(d2Date);
          d2MinTemp = responseTwo.daily[2].temp.min
          $("#d2MinTemp").html(d2MinTemp);
          d2MaxTemp = responseTwo.daily[2].temp.max
          $("#d2MaxTemp").html(d2MaxTemp);
          d2Humidity = responseTwo.daily[2].humidity
          $("#d2Humidity").html(d2Humidity);
          d2Icon = responseTwo.daily[2].weather[0].icon;
          $("#d2Icon").html('<img src="http://openweathermap.org/img/wn/' + d2Icon + '.png" />');

          $("#d3Day").html(d3Day);
          d3Date = new Date(responseTwo.daily[3].dt * 1000).toLocaleDateString();
          $("#d3Date").html(d3Date);
          d3MinTemp = responseTwo.daily[3].temp.min
          $("#d3MinTemp").html(d3MinTemp);
          d3MaxTemp = responseTwo.daily[3].temp.max
          $("#d3MaxTemp").html(d3MaxTemp);
          d3Humidity = responseTwo.daily[3].humidity
          $("#d3Humidity").html(d3Humidity);
          d3Icon = responseTwo.daily[3].weather[0].icon;
          $("#d3Icon").html('<img src="http://openweathermap.org/img/wn/' + d3Icon + '.png" />');

          $("#d4Day").html(d4Day);
          d4Date = new Date(responseTwo.daily[4].dt * 1000).toLocaleDateString();
          $("#d4Date").html(d4Date);
          d4MinTemp = responseTwo.daily[4].temp.min
          $("#d4MinTemp").html(d4MinTemp);
          d4MaxTemp = responseTwo.daily[4].temp.max
          $("#d4MaxTemp").html(d4MaxTemp);
          d4Humidity = responseTwo.daily[4].humidity
          $("#d4Humidity").html(d4Humidity);
          d4Icon = responseTwo.daily[4].weather[0].icon;
          $("#d4Icon").html('<img src="http://openweathermap.org/img/wn/' + d4Icon + '.png" />');
          
          $("#d5Day").html(d5Day);
          d5Date = new Date(responseTwo.daily[5].dt * 1000).toLocaleDateString();
          $("#d5Date").html(d5Date);
          d5MinTemp = responseTwo.daily[5].temp.min
          $("#d5MinTemp").html(d5MinTemp);
          d5MaxTemp = responseTwo.daily[5].temp.max
          $("#d5MaxTemp").html(d5MaxTemp);
          d5Humidity = responseTwo.daily[5].humidity
          $("#d5Humidity").html(d5Humidity);
          d5Icon = responseTwo.daily[5].weather[0].icon
          $("#d5Icon").html('<img src="http://openweathermap.org/img/wn/' + d5Icon + '.png" />');
        });
    }


