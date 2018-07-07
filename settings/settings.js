import * as messaging from "messaging";
import document from "document";


export function SettingsApplier() {
 
};

SettingsApplier.prototype.applySettings = function(settingChange) {
  console.log("received settingChange:"+JSON.stringify(settingChange));
 
   if (settingChange.key === undefined) {
    return;
  }
  else if(settingChange.key === "clock_style"){
    //extract data
    let newData = JSON.parse(settingChange.newValue);
      console.log("new Value:"+JSON.stringify(newData.selected));
   switch (newData.selected[0]) {
       case 0 : 
        console.log("thin");
        document.getElementById("timeLabel").style.fontSize = 50;

        document.getElementById("weekdayLabel").style.fontSize = 30;
        document.getElementById("dateLabel").style.fontSize = 40;
        document.getElementById("monthLabel").style.fontSize = 30;
  
        document.getElementById("hrm").style.fontSize = 30;
        document.getElementById("hrm_bpm").style.fontSize = 20;
  
        document.getElementById("steps").style.fontSize = 30;
        document.getElementById("steps_subtitle").style.fontSize = 20;
       break;
       case 1 : 
        console.log("normal");
        
        document.getElementById("timeLabel").style.fontSize = 80;
        
        document.getElementById("weekdayLabel").style.fontSize = 30;
        document.getElementById("dateLabel").style.fontSize = 40;
        document.getElementById("monthLabel").style.fontSize = 30;
  
        document.getElementById("hrm").style.fontSize = 40;
        document.getElementById("hrm_bpm").style.fontSize = 30;
  
        document.getElementById("steps").style.fontSize = 40;
        document.getElementById("steps_subtitle").style.fontSize = 30;
       break;
       case 2 : 
        console.log("thick");
        document.getElementById("timeLabel").style.fontSize = 130;
        
        document.getElementById("weekdayLabel").style.fontSize = 50;
        document.getElementById("dateLabel").style.fontSize = 60;
        document.getElementById("monthLabel").style.fontSize = 50;
  
        document.getElementById("hrm").style.fontSize = 60;
        document.getElementById("hrm_bpm").style.fontSize = 50;
  
        document.getElementById("steps").style.fontSize = 40;
        document.getElementById("steps_subtitle").style.fontSize = 50;
       break;
   }
  }
}