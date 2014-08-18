//ToDo:
//*Implement normal count
//*Implement PAUSE
//*Implement CLEAR
//*Implement REPEAT
//*Increase and decrease timer live
//*Make Start and Pause one button
//*Use colours for layout
//*Reset public timer when page resets
//*Focus back to admin when opening new public timer


//Here is all the logic

//total time requested
var t_time_req;
//sum-up time requested
var s_time_req;
//current total seconds
var time_t_sec;
//sum-up seconds (this is a constant)
var time_s_sec;
var intervalHandle;
var publicTimerWindow;
//public Timer Window flag signals if there is an open Public Timer window
var publicTWF;
//countMode flag can be: 0(timer on initial state or reset), 1(timer on countDown and on "green"), 2(timer on "orange"), 3(timer on "red")
var countMode;

//main - when document ready:
$(document).ready(function() {

    //initialize button handlers
    initializeButtonHandlers();

    //initialize flags
    countMode = 0;
    publicTWF = false;

    //reset total and sum-up requested time
    t_time_req = 0;
    s_time_req = 0;

    //reset dashboards: admin A, admin A1, admin A2, public
    var resetS = "00:00";
    $('#A').html(resetS);
    $('#A1').html(resetS);
    $('#A2').html(resetS);
    if (publicTWF) {
        publicTimerWindow.document.getElementById("timer_public").textContent = resetS;
    }
});

//button handler initialization and helper functions
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
    $('#b_pause').attr({
        onclick: 'pause()',
        disabled: 'disabled()'
    });

    //CLEAR button
    $('#b_clear').attr('onclick', 'clear()');

    //PublicTimer open button
    $('#openPublic').attr('onclick', 'openPublicTimerWindow()');

    //PublicTimer close button
    $('#closePublic').attr({
        onclick: 'closePublicTimerWindow()',
        disabled: 'disabled()'
    });
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

//start the timer
function startCountdown(){

    if (t_time_req > 0) {

        //get time in seconds
        time_t_sec = t_time_req * 60;
        time_s_sec = s_time_req *60;

        //call the "tick" function every second
        intervalHandle = setInterval(tick, 1000);

        //enable/disable START and PAUSE buttons
        $('#b_start').attr('disabled','disabled');
        $('#b_pause').removeAttr("disabled");

        //switch countMode from 0 to 1
        countMode = 1;
    }
}

//ToDo
function pause() {

    /*clearInterval(intervalHandle);*/
}

//this is the core timer function
function tick(){

    //if inside the time limit
    if (time_t_sec>0 && countMode==1) {

        //turn the seconds into mm:ss
        var min = Math.floor(time_t_sec / 60);
        var sec = time_t_sec - (min * 60);

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

        //subtract from seconds remaining
        time_t_sec--;

        //if outside the time limit (or if time_t_sec<=0)
    } else {

        //switch countMode from 1 to 3
        countMode = 3;

        //turn the seconds into mm:ss
        var min = Math.floor(time_t_sec / 60);
        var sec = time_t_sec - (min * 60);

        //add a leading zero for minutes
        if (min < 10) {
            min = "0" + min;
        }

        //add a leading zero for seconds
        if (sec < 10) {
            sec = "0" + sec;
        }

        //create "time_forDisplay"
        time_forDisplay = min.toString() + ":" + sec;

        //add to seconds remaining
        time_t_sec++;
    }

    //Do the following in each 'tick':

    //update the display digits
    updateDisplays(time_forDisplay);

    //update the display traffic light colors
    paintTrafficLights();
}

////update displays in admin and public views
function updateDisplays(time_fd) {

    //- in timer admin
    $('#A').html(time_fd);

    //- in timer public
    if (publicTimerWindow && publicTWF) {
        publicTimerWindow.document.getElementById("timer_public").textContent = time_fd;
    }
}

//change public timer to the appropriate color
function paintTrafficLights() {

    countMode_sec = evalcms(time_t_sec, time_s_sec);
    console.log(countMode_sec);

    //if (TotalTime < 'currentTick' < Sum-upTime)
    if ((time_t_sec > 0) && (countMode_sec >= 0) && (countMode != 3)) {
        //in public
        if (publicTimerWindow) {
            publicTimerWindow.document.getElementById("timerBox").style.color = '#99fe00';
        }
        //in admin
        document.getElementById("box_green").style.backgroundColor = '#99fe00';
        document.getElementById("box_orange").style.backgroundColor = 'white';
        document.getElementById("box_red").style.backgroundColor = 'white'

        //else if (Sum-upTime < 'currentTick' < 0)
    } else if ((time_t_sec > 0) && (countMode_sec < 0) && (countMode != 3)) {
        //in public
        if (publicTimerWindow) {
            publicTimerWindow.document.getElementById("timerBox").style.color = '#f4d75f';
        }
        //in admin
        document.getElementById("box_green").style.backgroundColor = 'white';
        document.getElementById("box_orange").style.backgroundColor = '#f4d75f';
        document.getElementById("box_red").style.backgroundColor = 'white';

        //if (0 < 'currentTick')
    } else if (countMode == 3) {
        //in public
        if (publicTimerWindow) {
            publicTimerWindow.document.getElementById("timerBox").style.color = '#fd030d';
        }
        //in admin
        document.getElementById("box_green").style.backgroundColor = 'white';
        document.getElementById("box_orange").style.backgroundColor = 'white';
        document.getElementById("box_red").style.backgroundColor = '#fd030d';
    }
}

//calculate currently remaining counterMode seconds (= TotalTime - Sum-upTime)
function evalcms(time_t_sec, time_s_sec) {

    var evalcmsV = time_t_sec - time_s_sec;
    return evalcmsV;
}

//opens a new window showing the public Timer
function openPublicTimerWindow() {

    //name the parent window - this is needed in order to switch the focus back to it later


    //if public timer window already open, do nothing
    if (!publicTWF) {
        publicTimerWindow = window.open("timer-public.html", "publicTimerWin")
        publicTWF = true;
        $('#openPublic').attr('disabled','disabled');
        $('#closePublic').removeAttr("disabled");
    }
}

//closes the public Timer window
function closePublicTimerWindow() {

    if (publicTimerWindow) {
        publicTimerWindow.close();
        publicTWF = false;
        $('#closePublic').attr('disabled','disabled');
        $('#openPublic').removeAttr("disabled");
    }
}

//ToDo
function clear() {

    /*    //refresh/reset page
     location.reload();*/
}