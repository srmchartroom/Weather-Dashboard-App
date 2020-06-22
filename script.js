//? This file handles all scripting functionality of the Weather Dashboard Application.
//?  See specific comments within the below for direction on functionality for your own refactoring and use.

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
const uvClassLow = "btn bg-low";
const uvClassMod = "btn bg-moderate";
const uvClassHigh = "btn bg-high";
const uvClassVHigh = "btn bg-vhigh";
const uvClassExtreme = "btn bg-extreme";

//! --- API VARIABLES --- //

//! --- NOTE TO DEVELOPERS & CONTRIBUTORS: Please be sure to secure your own free API key from api.openweathermap.org, and replace the value for the "apiKey" variable below --- //
const apiKey = "23f82e4cdf1dd3340d14e89dd9f184b8"; // API key with openWeather  

// API VARS TO POPULATE FROM OR USE WITH WEATHER API OF OPENWEATHERMAP.ORG //
let currCity = ""; // variable to be updated with searched city or selection of a previous city
let fullCity = "q=" + currCity; // city query string param to use in the weather API of OpenWeatherMap.org
let currZip = "27103"; // variable to be updated with search zip or selection of a previous city
let fullZip = ("zip=" + currZip).trim(); // zip query string param to use in the weather API of Open Weather
let currLocation = fullZip; // location query string param to use in the weather API of OpenWeatherMap.org
let currIcon = ""; // current selection's weather icon for today
let currCondition = ""; // current selection's condition description for today
let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?" + currLocation + "&appid=" + apiKey + "&units=imperial"; // URL for initial weather AJAX call; includes "&units=imperial" so Kelvin:Farenheit conversion isn't necessary;
let currDate = ""; // current date
let currLon = ""; // current selection's longitude to use in params for oneCall API of OpenWeatherMap.org
let currLat = ""; // current selection's latitude to use in paarams for oneCall API of OpenWeatherMap.org

// API VARS TO POPULATE FROM OR USE WITH ONECALL API OF OPENWEATHERMAP.ORG //
let currTemp = ""; // current selection's Temp for today from oneCall API of OpenWeatherMap.org
let currHumidity = ""; // current selection's Humidity for today from oneCall API of OpenWeatherMap.org
let currWind = ""; // current selection's Wind Speed for today from oneCall API of OpenWeatherMap.org
let currUVI = "" ; // current selection's UVI for today from oneCall API of OpenWeatherMap.org
let currUVIicon = ' <i class="fas fa-info-circle fa-x"></i>';

//! --- AJAX CALL: WEATHER API OF OPENWEATHERMAP.ORG --- //

$.ajax({ // AJAX API call for OpenWeather's api to get lat and lon of current city
  url: queryURL1, // Sets the URL argument equal to the "queryURL1" var 
  method: "GET" // Sets the method argument equal to "GET"
  }).then(function(responseOne) {  // Sets anonymous function to run once the GET request completes
    console.log(responseOne); // TODO Remove this once no longer needed
    currLon = responseOne.coord.lon; // sets response's longitude value to "currLon" var
    currLat = responseOne.coord.lat; // sets response's latitude value to "currLat" var
    currCity = responseOne.name; // sets response's name value to "currCity" var
    $("#currCity").html(currCity); // Updates the #currCity span's HTML with the currCity var's value
    currIcon = responseOne.weather[0].icon; // sets response's icon value to "currIcon" var
    $("#currIcon").html('<img src="http://openweathermap.org/img/wn/' + currIcon + '@2x.png" style="margin-right: -20px;"/><span><i class="fas fa-info-circle pl-0 ml-0 mb-4 super align-bottom" style="font-size: small;"></i></span>'); // updates #currIcon span's HTML with an <img> tag leveraging the currIcon var which is set based on the response
    let currDate = new Date(responseOne.dt * 1000).toLocaleDateString(); // creates a new date object, converts it to milliseconds, and then converts it to the short MM/DD/YYYY format
    $("#currDate").html(currDate); // updates the #currDate span's HTML with the currDate var and converted date object value
    console.log(currLon);
    console.log(currLat);
    
    //! --- AJAX CALL: ONECALL API OF OPENWEATHERMAP.ORG --- //
    let queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLat + "&lon=" + currLon + "&exclude=hourly,minutely&appid=" + apiKey + "&units=imperial";
    $.ajax({
      url: queryURL2,
      method: "GET"
      }).then(function(responseTwo) {
        console.log(responseTwo);

        currTemp = responseTwo.current.temp; // current temperature
        console.log(currTemp);
        $("").attr("data-original-title", currCondition);
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
    });

});




// queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLat + "&lon=" + currLon + "&exclude=hourly,minutely&appid=" + apiKey + "&units=imperial";
  


//-----------------------------------------------------------------------------------------

// CITY SEARCH AND SELECT
// <div id="cityCtr" class="pr-3 col-xs-12 col-sm-12 col-md-3 border-right"></div> // CONTAINER FOR ALL THE CITY SEARCH AND SELECT
// <div id="citySearchCtr">
// <form id="citySearchForm">
// <input type="text" class="form-control" id="citySearch" placeholder="City..." aria-describedby="citySmallTxt">
// <input type="text" class="form-control" id="zipSearch" placeholder="Zip/Postal Code" aria-describedby="emailSmallTxt">
// <button id="citySearchBtn" type="submit" class="btn btn-primary">Get the Weather</button>
// <div id="prevCities">

// CURRENT WEATHER CITY / DATE / ICON
// <h2 id="currWTitle">
// <span id="currCity">Greensboro</span>
// (<span id="currDate">06/20/20</span>)
// <span id="currIcon"><img src="http://openweathermap.org/img/wn/10d@2x.png" /></span></h2>

// CURRENT WEATHER TEMP / HUMIDITY / WIND / UVI
// <div class="currWTxt">
// <span id="currTemp"></span> &deg;F</p>
// <span id="currHumidity"></span>%</p>
// <span id="currWind"></span> MPH</p>
// <span id="currUVspan" class="d-inline-block" tab-index="0"  data-toggle="tooltip" data-placement="right" title="tooltip text will go here">
// <button id="currUV" class="btn bg-extreme" style="pointer-events: none;" type="button" disabled> 9.6 <i class="fas fa-info-circle fa-x"></i></button>   

// 5 DAY FORECAST
// <div id="forecastCtr" class="row mt-5"> // CONTAINER FOR 5 DAY FORECAST
  
  // DAY 1: FORECAST
  // <div id="d1Day" class="card-header text-center"><strong>(e.g. Monday)</strong></div> // DAY 1: DAY
  // <h6 id="d1Date" class="card-title text-center my-0 pt-0 pb-1 border-bottom">(e.g. 06/20)</h6> // DAY 1: DATE
  // <div class="forecastTxt"> // DAY 1: DETAILS FOR FORECAST
  // <p id="d1Icon" class="wIcon"></p> // DAY 1: WEATHER ICON
  // <p id="d1Temp" class="card-text temp">(e.g. Temp: 86.84 &deg;F)</p> // DAY 1: TEMP
  // <p id="d1Humidity" class="card-text humidity">(e.g. Humidity: 43%)</p> // DAY 1: HUMIDITY

  // DAY 2: FORECAST
  // <div id="d2Day" class="card-header text-center"><strong>(e.g. Monday)</strong></div>
  // <h6 id="d2Date" class="card-title text-center my-0 pt-0 pb-1 border-bottom">(e.g. 06/20)</h6>
  // <div class="forecastTxt">
  // <p id="d2Icon" class="wIcon"></p>
  // <p id="d2Temp" class="card-text temp">(e.g. Temp: 86.84 &deg;F)</p>
  // <p id="d2Humidity" class="card-text humidity">(e.g. Humidity: 43%)</p>

  // DAY 3: FORECAST
  // <div id="d3Day" class="card-header text-center"><strong>(e.g. Monday)</strong></div>
  // <h6 id="d3Date" class="card-title text-center my-0 pt-0 pb-1 border-bottom">(e.g. 06/20)</h6>
  // <div class="forecastTxt">
  // <p id="d3Icon" class="wIcon"></p>
  // <p id="d3Temp" class="card-text temp">(e.g. Temp: 86.84 &deg;F)</p>
  // <p id="d3Humidity" class="card-text humidity">(e.g. Humidity: 43%)</p>

  // DAY 4: FORECAST
  // <div id="d4Day" class="card-header text-center"><strong>(e.g. Monday)</strong></div>
  // <h6 id="d4Date" class="card-title text-center my-0 pt-0 pb-1 border-bottom">(e.g. 06/20)</h6>
  // <div class="forecastTxt">
  // <p id="d4Icon" class="wIcon"></p>
  // <p id="d4Temp" class="card-text temp">(e.g. Temp: 86.84 &deg;F)</p>
  // <p id="d4Humidity" class="card-text humidity">(e.g. Humidity: 43%)</p>

  // DAY 5: FORECAST
  // <div id="d5Day" class="card-header text-center"><strong>(e.g. Monday)</strong></div>
  // <h6 id="d5Date" class="card-title text-center my-0 pt-0 pb-1 border-bottom">(e.g. 06/20)</h6>
  // <div class="forecastTxt">
  // <p id="d5Icon" class="wIcon"></p>
  // <p id="d5Temp" class="card-text temp">(e.g. Temp: 86.84 &deg;F)</p>
  // <p id="d5Humidity" class="card-text humidity">(e.g. Humidity: 43%)</p>

