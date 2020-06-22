//? This file handles all scripting functionality of the Weather Dashboard Application.
//?  See specific comments within the below for direction on functionality for your own refactoring and use.


//! --- UV TOOLTIPS --- //

// Enabling Tooltips for UV indexes
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// Setting variables to hold the tooltip text. This will be placed in the "title" attribute of the #currUVspan based on the current selected city's UV Index.

const ttLow = "LOW: 1-2 UVI | Safe to be outdoors - No protection required.";
const ttMod = "Moderate: UV Index of 3-5 | Take precautions, such as covering up during midday hours, wearing a hat and sunglasses and using sunscreen. Stay in the shade near midday when the sun is strongest."; 
const ttHigh = "High: 6-7 UVI | Wear sunglasses and use SPF 30+ sunscreen, cover the body with sun protective clothing and a wide-brim hat, and reduce time in the sun from three hours before to three hours after solar noon.";
const ttVHigh = "Very High: 8-10 UVI | Wear SPF 30+ sunscreen, a shirt, sunglasses, and a hat. Do not stay out in the sun for too long.";
const ttExtreme = "Moderate: 11+ UVI | Wear SPF 30+ sunscreen, a shirt, sunglasses, and a hat. Do not stay out in the sun for too long.";

// Setting easy variables for handling the UV block's background class
const uvClassLow = "bg-low";
const uvClassMod = "bg-moderate";
const uvClassHigh = "bg-high";
const uvClassVHigh = "bg-vhigh";
const uvClassExtreme = "bg-extreme";

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

