//Here is all the logic

var t_time_req = 0;
var s_time_req = 0;
var secondsRemaining;
var intervalHandle;
var publicTimerWindow;
var myTimer;

//main - when document ready:
$(document).ready(function() {

    //test1
    console.log("auto:document ready");

    //call resetDashboards()
    resetDashboards();
    console.log("auto:resetDashboards() run");

    //call createButtonHandlers()
    createButtonHandlers();
    console.log("auto:createButtonHandlers() run");
});

//start the timer in countdown mode
function startCountdown(){

    //reset timer

    //get time from t_time_req
    var time = t_time_req;

    // check if not a number
    if (isNaN(time)){
        alert("Please enter a number");
        return; // stops function if true
    }

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

    //change the display
    //- in timer-admin
    $('#A').html(message);

    //- in timer-public
    /*publicTimerWindow.document.getElementById("timer_public").textContent = message;*/

    //stop is down to zero
    if (secondsRemaining === 0){

        clearInterval(intervalHandle);

    }

    //subtract from seconds remaining
    secondsRemaining--;

}



//opens a new window showing the public Timer
function openPublicTimerWindow() {

    //new window
    publicTimerWindow = window.open("timer-public.html", "publicTimerWin");



    console.log("openPublicTimerWindow() run...");


}

//reset everything
function clear() {

    //refresh/reset page
    location.reload();

    //test
    console.log("clear() run");
}

function resetDashboards() {

    //- in timer-public, A
    $('#A').html("00:00");

    //- in timer-public, A1
    $('#A1').html("00:00");

    //- in timer-public, A2
    $('#A2').html("00:00");

    /*//- in timer-public
    publicTimerWindow.document.getElementById("timer_public").textContent = message;*/
}

function createButtonHandlers() {

    //create onclick() even handlers for all buttons:
    //Total time UP
    $('#b_t_up').attr('onclick', 'set_t_up()');

    //Total time DOWN
    $('#b_t_down').attr('onclick', 'set_t_down()');

    //Sum-up time UP
    $('#b_s_up').attr('onclick', 'set_s_up()');

    //Sum-up time DOWN
    $('#b_s_down').attr('onclick', 'set_t_down()');

    //START button
    $('#b_start').attr('onclick', 'startCountdown()');

    //PAUSE button
    /*$('#b_pause').attr('onclick', 'pause()');*/

    //CLEAR button
    $('#b_clear').attr('onclick', 'clear()');

    //PublicTimer button
    $('#openPublic').attr('onclick', 'openPublicTimerWindow()');
}

function set_t_up() {

    //set total time up
    t_time_req += 1;

    console.log(t_time_req);

    //set A1 up
    if (t_time_req < 10) {
        $('#A1').html("0" + t_time_req + ":" + "00");
    } else {
        $('#A1').html(t_time_req + ":" + "00");
    }
}

function set_t_down() {

    //set total time down
    if (t_time_req > 0) {
        t_time_req -= 1;
    }
    console.log(t_time_req);

    //set A1 down
    if (t_time_req < 10) {
        $('#A1').html("0" + t_time_req + ":" + "00");
    } else {
        $('#A1').html(t_time_req + ":" + "00");
    }
}

function set_s_up() {

    //set sum-up time up
    s_time_req += 1;

    console.log(s_time_req);

    //set A2 up
    if (s_time_req < 10) {
        $('#A2').html("0" + s_time_req + ":" + "00");
    } else {
        $('#A2').html(s_time_req + ":" + "00");
    }
}

function set_t_down() {

    //set sum-up time down
    if (s_time_req > 0) {
        s_time_req -= 1;
    }
    console.log(s_time_req);

    //set A2 down
    if (s_time_req < 10) {
        $('#A2').html("0" + s_time_req + ":" + "00");
    } else {
        $('#A2').html(s_time_req + ":" + "00");
    }
}