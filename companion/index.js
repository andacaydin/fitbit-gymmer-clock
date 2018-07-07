import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

let CLOCK_STYLE = "clock_style";

//CHECK INITIAL SETTING

//Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  let clockStyleValue = settingsStorage.getItem(CLOCK_STYLE);
if(clockStyleValue !== undefined){
  console.log("Initial clockStyleValue:"+clockStyleValue);
  sendSettingData( {"key" : CLOCK_STYLE, "newValue" : clockStyleValue} );
}
}


// Settings have been changed
settingsStorage.onchange = function(evt) {
  console.log(JSON.stringify(evt));
  sendSettingData(evt);
}


function sendSettingData(evt) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(evt);
    console.log("sent message");
  } else {
    console.log("No peerSocket connection");
  }
}
