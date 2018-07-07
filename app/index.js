import clock from "clock";
import document from "document";
import { today } from 'user-activity';
import { HeartRateSensor } from "heart-rate";
import * as util from "../common/utils";
import { preferences } from "user-settings";


/**
1 CLOCK & DATE
*/

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
let timeLabel = document.getElementById("timeLabel");
let dateLabel = document.getElementById("dateLabel");
let weekdayLabel = document.getElementById("weekdayLabel");
let monthLabel = document.getElementById("monthLabel");

var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
var days = ['SUN','MON','TUE','WED','THR','FRI','SAT'];



/**
2 HEARTRATE 
*/


let hrLabel = document.getElementById("hrm");

// Initialize the UI with some values
hrLabel.innerText = "-";

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();


// Declare a even handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
}

// Begin monitoring the sensor
hrm.start();

/**
3 STEPS 
*/


let stepsLabel = document.getElementById("steps");


/**
X UPDATE ON CLOCK TICK 
*/


// Update all elements
function updateClock() {
  let todayDate = new Date();
  let hours = todayDate.getHours();
  if (preferences.clockDisplay === "12h") {
        hours = (hours + 24) % 12 || 12;
  }
  let mins = util.zeroPad(todayDate.getMinutes());
  let clockString = `${hours}:${mins}`;
  console.log("time: " + clockString);
  timeLabel.text = clockString;
  
  let monthname = monthNames[todayDate.getMonth()];
  let dayname = days[ todayDate.getDay() ];
  monthLabel.text = monthname;
  dateLabel.text = todayDate.getDate();
  weekdayLabel.text = dayname;
  
  console.log("dayname: " + dayname);
  console.log("monthname: " + monthname);
  console.log("date: " + todayDate.getDate());
  console.log("today: " + JSON.stringify(today));
  console.log("steps: " + today.adjusted.steps);
  if(today.adjusted.steps != undefined){
    stepsLabel.text = today.adjusted.steps;
  }
  
}

// Update the clock every tick event
clock.ontick = () => updateClock();

// Don't start with a blank screen
updateClock();


// APPLY SETTINGS-CHANGE
import * as messaging from "messaging";
import { SettingsApplier } from "../settings/settings.js";
messaging.peerSocket.onmessage = function(evt) {
  console.log("Received event : "+ JSON.stringify(evt));
  if(evt.data.key === "clock_style"){
    new SettingsApplier().applySettings(evt.data);
  }
}

