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
const uvClassLow = "bg-success text-white";
const uvClassMod = "bg-warning text-white";
const uvClassHigh = "bg-warning text-danger";
const uvClassVHigh = "bg-danger";
const uvClassExtreme = "bg-dark text-danger";