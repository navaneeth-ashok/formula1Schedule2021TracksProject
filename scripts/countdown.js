startClock();
$("#reset").attr("disabled", true);
$("#reset").css("backgroundColor","grey");

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
            
        } else {
            myTimes[i].innerHTML = "Race completed";
        }
        
        
        
    }
    
    
    
}


function startClock(){
    tickTock = setInterval(raceCountDown, 1000);
}
function showLocalTime(){
    var raceTimes = document.getElementsByClassName("race_time");
    var myTimes = document.getElementsByClassName("my_time");
//    console.log(raceTimes.length);
//    console.log($(".race_time"));
//    for (r in raceTimes){
//        console.log(r.innerHTML);
//    }
    for(var i=0; i < raceTimes.length; i++){
        var raceTimeUTC = raceTimes[i].innerHTML;
        console.log(raceTimeUTC);
        raceTimeUTC = raceTimeUTC.toString() + " UTC";
        var localDate = new Date(raceTimeUTC);
        raceTimes[i].innerHTML= localDate;
        $("#heading-time").text("Race Start Time - Local");
    }
//    for ( racetime in raceTimes)
//    var raceTimeUTC = $("#race_time").text();
//    raceTimeUTC = raceTimeUTC.toString() + " UTC";
//    var localDate = new Date(raceTimeUTC);
//    $("#race_time").text(localDate);
//    $("heading-time").text("Race Start Time - Local");
}

$("#localTime").click(function(){
    showLocalTime();
    $("#localTime").attr("disabled", true);
    $("#localTime").css("backgroundColor","grey");
    $("#reset").css("backgroundColor","red");
    $("#reset").attr("disabled", false);
});



$("#reset").click(function() {
    location.reload();
});

var divClone = $("#document").clone(true);



