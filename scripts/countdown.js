// timer function to show the countdown
startClock();
$("#reset").attr("disabled", true);
$("#reset").css("backgroundColor","#6a6a6b");

// function to change the scale of the page so that the user can read the entire 
// table without scrolling
function requestDesktopSite(){
 if(document.getElementsByTagName('meta')['viewport'].content=='width= 1200px'){
  document.getElementsByTagName('meta')['viewport'].content='width= 400px';
 }else{
  document.getElementsByTagName('meta')['viewport'].content='width= 1200px';
 }
}

// function to calculate the client time and how much more time is left before the race starts
// all the time in tha html is stored in UTC
// client time is converted to UTC first, subtracted from race time and re-constructed back to d:h:m:s format
function raceCountDown(){
    var raceTimes = document.getElementsByClassName("race_time");
    var myTimes = document.getElementsByClassName("my_time");
    
    for(var i=0; i < raceTimes.length; i++){
        var raceTime = new Date(raceTimes[i].innerHTML);
        var date = new Date(); 
        var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    //    console.log(raceTime-now_utc);
        var seconds = Math.floor((raceTime-now_utc)/1000);
        if (seconds > 1){
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var days = Math.floor(hours/24);

            hours = hours-(days*24);
            minutes = minutes-(days*24*60)-(hours*60);
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
            if (seconds < 10){
                seconds = "0" + seconds;
            }
            myTimes[i].innerHTML = days + "d :" + hours +"h :" + minutes + "m :" + seconds + "s";
            
        } else if(seconds <=1 && seconds > -1440){
            myTimes[i].innerHTML = "Race started";
        } else {
            myTimes[i].innerHTML = "Race completed";
        }
    }  
}

// function to start the clock and to run it every second
function startClock(){
    tickTock = setInterval(raceCountDown, 1000);
}

// function to switch between the HTML time(UTC) with the client's TIME
function showLocalTime(){
    var raceTimes = document.getElementsByClassName("race_time");
    var myTimes = document.getElementsByClassName("my_time");
    for(var i=0; i < raceTimes.length; i++){
        var raceTimeUTC = raceTimes[i].innerHTML;
        console.log(raceTimeUTC);
        // adding UTC to the string to make use of the default Date constructor
        // to take care of time conversion
        raceTimeUTC = raceTimeUTC.toString() + " UTC";
        var localDate = new Date(raceTimeUTC);
        raceTimes[i].innerHTML= localDate;
        $("#heading-time").text("Race Start Time - Local");
    }
}

// jQuery function to toggle between the active/disabled state of the buttons
// and it's associated functions
$("#localTime").click(function(){
    showLocalTime();
    $("#localTime").attr("disabled", true);
    $("#localTime").css("backgroundColor","#6a6a6b");
    $("#reset").css("backgroundColor","#e10600");
    $("#reset").attr("disabled", false);
});


// easiest way to reload the DOM so that the page displays UTC
$("#reset").click(function() {
    location.reload();
});


// function to switch between the desktop view and mobile view
$("#togglePage").click(function(){
    requestDesktopSite();
    if ($("#togglePage").text() == "Collapse schedule"){
        $("#togglePage").text("Show complete schedule");
    } else {
         $("#togglePage").text("Collapse schedule");
    }
    
});




