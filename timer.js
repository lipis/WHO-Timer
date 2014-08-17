//Here is all the logic

var t_time_req;
var s_time_req;
var secondsRemaining;
var intervalHandle;
var publicTimerWindow;
var publicTWF;

//main - when document ready:
$(document).ready(function() {

    //call initializeWindows()
    publicTWF = false;
    /*initializeWindows();*/
    console.log("-auto:initializeWindows()");

    //call initializeButtonHandlers()
    initializeButtonHandlers();
    console.log("-auto:initializeButtonHandlers()");

    //call initializeCounters()
    initializeCounters();
    console.log("-auto:initializeCounters()");
});

function initializeWindows() {

    openPublicTimerWindow();
    closePublicTimerWindow();
}

function initializeCounters() {

    //reset req times
    t_time_req = 0;
    s_time_req = 0;

    var resetDisplayString = "00:00";

    $('#A').html(resetDisplayString);

    //if publicTimerWindow exists, then reset it
    /*if (publicTimerWindow) {
        publicTimerWindow.document.getElementById("timer_public").textContent = resetDisplayString;
    }*/

    $('#A1').html(resetDisplayString);
    $('#A2').html(resetDisplayString);
}

//start the timer in countdown mode
function startCountdown(){

    //reset timer

    //get time from t_time_req
    var time = t_time_req;

    // how many seconds
    secondsRemaining = time * 60;

    //every second, call the "tick" function
    // have to make it into a variable so that you can stop the interval later!!!
    intervalHandle = setInterval(tick, 1000);
    console.log("tick() run...");
}

//this is the core method used inside the timer itself
function tick(){

    //turn the seconds into mm:ss
    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);

    //add a leading zero (as a string value) if seconds less than 10
    if (sec < 10) {
        sec = "0" + sec;
    }

    //concatenate with colon
    var message = min.toString() + ":" + sec;

    //stop is down to zero
    if (secondsRemaining === 0){

        clearInterval(intervalHandle);
    }

    //subtract from seconds remaining
    secondsRemaining--;

    //update displays
    updateDisplays(message);
}

////update displays in admin and public views
function updateDisplays(updatedTime) {

    //- in timer-admin
    $('#A').html(updatedTime);

    //- in timer-public
    if (publicTimerWindow) {
        publicTimerWindow.document.getElementById("timer_public").textContent = updatedTime;
    }
}


//opens a new window showing the public Timer
function openPublicTimerWindow() {

    //if public timer window already open, do nothing
    if (!publicTWF) {
        publicTimerWindow = window.open("timer-public.html", "publicTimerWin");
        publicTWF = true;
    } else {
        return;
    }

    console.log("openPublicTimerWindow() run...");
}

//closes the public Timer window
function closePublicTimerWindow() {

    if (publicTimerWindow) {
        publicTimerWindow.close();
        publicTWF = false;
    }
}

//reset everything
function clear() {

    //refresh/reset page
    location.reload();

    //test
    console.log("clear() run");
}

function initializeButtonHandlers() {

    //create onclick() even handlers for all buttons:
    //Total time UP
    $('#b_t_up').attr('onclick', 'set_t_up()');

    //Total time DOWN
    $('#b_t_down').attr('onclick', 'set_t_down()');

    //Sum-up time UP
    $('#b_s_up').attr('onclick', 'set_s_up()');

    //Sum-up time DOWN
    $('#b_s_down').attr('onclick', 'set_s_down()');

    //START button
    $('#b_start').attr('onclick', 'startCountdown()');

    //PAUSE button
    /*$('#b_pause').attr('onclick', 'pause()');*/

    //CLEAR button
    $('#b_clear').attr('onclick', 'clear()');

    //PublicTimer open button
    $('#openPublic').attr('onclick', 'openPublicTimerWindow()');

    //PublicTimer close button
    $('#closePublic').attr('onclick', 'closePublicTimerWindow()');
}

function set_t_up() {

    //set total time up
    if (t_time_req < 99) {
        t_time_req += 1;

        //set A1 up
        if (t_time_req < 10) {
            $('#A1').html("0" + t_time_req + ":" + "00");
        } else {
            $('#A1').html(t_time_req + ":" + "00");
        }
    }
}

function set_t_down() {

    //set total time down
    if (t_time_req > 0 && t_time_req > s_time_req) {
        t_time_req -= 1;

        //set A1 down
        if (t_time_req < 10) {
            $('#A1').html("0" + t_time_req + ":" + "00");
        } else {
            $('#A1').html(t_time_req + ":" + "00");
        }
    }
}

function set_s_up() {

    //set sum-up time up
    if (s_time_req < t_time_req) {
        s_time_req += 1;

        //set A2 up
        if (s_time_req < 10) {
            $('#A2').html("0" + s_time_req + ":" + "00");
        } else {
            $('#A2').html(s_time_req + ":" + "00");
        }
    }
}

function set_s_down() {

    //set sum-up time down
    if (s_time_req > 0) {
        s_time_req -= 1;

        //set A2 down
        if (s_time_req < 10) {
            $('#A2').html("0" + s_time_req + ":" + "00");
        } else {
            $('#A2').html(s_time_req + ":" + "00");
        }
    }
}