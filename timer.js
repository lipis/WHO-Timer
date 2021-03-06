//main - when document ready:
$(document).ready(function() {

    //create a new object of 'class' "timer"
    myTimer = new Timer(0, 0, 0, 0, 0, 0, 0, "00:00");

    //initialize all listeners
    myTimer.initializeListeners();

    //reset displays
    myTimer.resetDisplays();

    //hide the controlsArea, speakerArea and logoArea DIVs
    $( "#controlsArea" ).hide();
    $( "#speakerArea" ).hide();
    $( "#logoArea" ).hide();

    //test - check for the document window size
    var a = $(document).width();
    var b = $(document).height();
    var c = $(window).width();
    var d = $(window).height();
    console.log('//check this in 100% zoom:');
    console.log('-document width: ' + a +', document height: ' + b + '.');
    console.log('-window width: ' + c + ', window height: ' + d + '.');
});

//constructor - 'class': timer
function Timer(totalTimeRequested, sumupTimeRequested, currentTotalSeconds, sumupSeconds, intervalHandle,
               timerMode, pauseOn, resetString) {
    this.totalTimeRequested = totalTimeRequested;
    this.sumupTimeRequested = sumupTimeRequested;
    this.currentTotalSeconds = currentTotalSeconds;
    this.sumupSeconds = sumupSeconds;
    this.intervalHandle = intervalHandle;
    this.timerMode = timerMode;
    this.pauseOn = pauseOn;
    this.resetString = resetString;
}

//methods - 'class': timer

//initializeListeners
Timer.prototype.initializeListeners = function(){

    //create onclick() event handlers for all buttons:
    //Total time UP
    $("#b_t_up").click(function () {
        //set total time up
        if (myTimer.totalTimeRequested < 99) {
            myTimer.totalTimeRequested += 1;

            //set A1 up
            myTimer.formatDisplay("A1", myTimer.totalTimeRequested);
        }
    });
    //Total time DOWN
    $('#b_t_down').click(function () {
        //set total time down
        if (myTimer.totalTimeRequested > 0 && myTimer.totalTimeRequested > myTimer.sumupTimeRequested) {
            myTimer.totalTimeRequested -= 1;

            //set A1 down
            myTimer.formatDisplay("A1", myTimer.totalTimeRequested);
        }
    });
    //Sum-up time UP
    $('#b_s_up').click(function () {
        //set sum-up time up
        if (myTimer.sumupTimeRequested < myTimer.totalTimeRequested) {
            myTimer.sumupTimeRequested += 1;

            //set A2 up
            myTimer.formatDisplay("A2", myTimer.sumupTimeRequested);
        }
    });
    //Sum-up time DOWN
    $('#b_s_down').click(function () {
        //set sum-up time down
        if (myTimer.sumupTimeRequested > 0) {
            myTimer.sumupTimeRequested -= 1;

            //set A2 down
            myTimer.formatDisplay("A2", myTimer.sumupTimeRequested);
        }
    });
    //START button
    $('#b_start').click(function () {
        myTimer.startCountdown();
    });
    //PAUSE button
    $('#b_pause').attr({
        onclick: 'myTimer.pause()',
        disabled: 'disabled()'
    });
    //REPEAT button
    $('#b_repeat').click(function () {
        myTimer.repeat();
    });
    //CLEAR button
    $('#b_clear').click(function () {
        myTimer.clear();
    });
    //L (=Logo) button
    $('#b_L').click(function () {
        $('#logoArea').toggle();
    });
    //S (=Speaker) button
    $('#b_S').click(function () {
        $('#speakerArea').toggle();
    });

    //create the "show" & "hide" listeners to the controlAreaPod DIV
    $( "#controlsAreaPod" ).mouseover(function() {
        $( "#controlsArea" ).show();
    });
    $( "#controlsAreaPod" ).mouseout(function() {
        $( "#controlsArea" ).hide();
    });

    //add keyboard listeners
    /*$(function()
     {
     $(document).keydown(function(event)
     {
     console.log(event.keyCode);
     if (event.keyCode == 32) {
     myTimer.startCountdown();
     *//*var e = jQuery.Event( "click" );
     jQuery('#b_start').trigger( e );*//*
     }
     });
     });*/
};

//format display
Timer.prototype.formatDisplay = function(display, time) {

    if (time < 10) {
        $('#'+display).html("0" + time + ":" + "00");
    } else {
        $('#'+display).html(time + ":" + "00");
    }
};

//reset displays
Timer.prototype.resetDisplays = function () {

    //reset dashboards: admin A, admin A1, admin A2, public
    $('#A').html(myTimer.resetString);
    $('#A1').html(myTimer.resetString);
    $('#A2').html(myTimer.resetString);

    document.getElementById("timer_public").textContent = myTimer.resetString;

};

//start the timer
Timer.prototype.startCountdown = function() {

    if (!myTimer.pauseOn) {

        if (myTimer.totalTimeRequested > 0) {

            //switch timerMode from 0 to 1
            myTimer.timerMode = 1;

            //get time in seconds
            myTimer.currentTotalSeconds = myTimer.totalTimeRequested * 60;
            myTimer.sumupSeconds = myTimer.sumupTimeRequested *60;
        }
    } else {

        //switch pauseOn from true to false
        myTimer.pauseOn = false;
    }
    //call the "tick" function every second
    myTimer.intervalHandle = setInterval(myTimer.tick, 1000);

    //enable/disable START and PAUSE buttons
    $('#b_start').attr('disabled','disabled');
    $('#b_pause').removeAttr("disabled");
};
//pause function
Timer.prototype.pause = function() {

    //stop counter
    clearInterval(myTimer.intervalHandle);

    //manipulate buttons
    $('#b_pause').attr('disabled','disabled');
    $('#b_start').removeAttr("disabled");

    myTimer.pauseOn = true;
};
//update displays in admin and public views
Timer.prototype.updateDisplays = function (currentTotalSeconds) {

    //turn the seconds into mm:ss
    var min = Math.floor(myTimer.currentTotalSeconds / 60);
    var sec = myTimer.currentTotalSeconds - (min * 60);

    //add a leading zero for minutes
    if (min < 10) {
        min = "0" + min;
    }

    //add a leading zero for seconds
    if (sec < 10) {
        sec = "0" + sec;
    }

    //create "time_forDisplay"
    var time_forDisplay = min.toString() + ":" + sec;

    //update displays
    //- in timer admin
    $('#A').html(time_forDisplay);

    //- in timer public
    document.getElementById("timer_public").textContent = time_forDisplay;
};
//this is the core timer function
Timer.prototype.tick = function () {

    //if inside the time limit
    if (myTimer.currentTotalSeconds>0 && myTimer.timerMode==1) {

        //subtract from seconds remaining
        myTimer.currentTotalSeconds--;

        //if outside the time limit (or if currentTotalSeconds<=0)
    } else {

        //switch timerMode from 1 to 3
        myTimer.timerMode = 3;

        //add to seconds remaining
        myTimer.currentTotalSeconds++;
    }

    //Do the following on each 'tick':
    //update the display digits
    myTimer.updateDisplays(myTimer.currentTotalSeconds);

    //update the display traffic light colors
    myTimer.paintTrafficLights();
};

//change public timer to the appropriate color
Timer.prototype.paintTrafficLights = function() {

    countMode_sec = myTimer.currentTotalSeconds - myTimer.sumupSeconds;

    //if on reset
    if (myTimer.timerMode == 0 ) {
        //in public
        document.getElementById("timer_public").style.color = 'white';

        //else if (TotalTime < 'currentTick' < Sum-upTime)
    } else if ((myTimer.currentTotalSeconds > 0) && (countMode_sec >= 0) && (myTimer.timerMode != 3)) {
        //in public
        document.getElementById("timer_public").style.color = 'white';

        //else if (Sum-upTime < 'currentTick' < 0)
    } else if ((myTimer.currentTotalSeconds > 0) && (countMode_sec < 0) && (myTimer.timerMode != 3)) {
        //in public
        document.getElementById("timer_public").style.color = 'white';

        //if (0 < 'currentTick')
    } else if (myTimer.timerMode == 3) {
        //in public
        document.getElementById("timer_public").style.color = '#fd030d';
    }
};

//repeat function
Timer.prototype.repeat = function() {

    //stop counter
    clearInterval(myTimer.intervalHandle);

    //reset flags to initial state
    myTimer.timerMode = 0;
    myTimer.pauseOn = false;


    //get time in seconds
    myTimer.currentTotalSeconds = myTimer.totalTimeRequested * 60;
    myTimer.sumupSeconds = myTimer.sumupTimeRequested *60;

    myTimer.updateDisplays(myTimer.currentTotalSeconds);

    //update the display traffic light colors
    myTimer.paintTrafficLights();

    //manipulate buttons
    $('#b_pause').attr('disabled','disabled');
    $('#b_start').removeAttr("disabled");
};

//clear function
Timer.prototype.clear = function() {
    //ToDo
    //refresh/reset page
    location.reload();
};
