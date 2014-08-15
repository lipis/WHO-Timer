//Here is all the logic

var secondsRemaining;
var intervalHandle;
var message;

function resetPage(){

    document.getElementById("inputArea").style.display = "block";
}

function tick(){
    // grab the td with #timer_admin
    /*var timer_public = document.getElementById("time");*/

    // turn the seconds into mm:ss
    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);

    //add a leading zero (as a string value) if seconds less than 10
    if (sec < 10) {
        sec = "0" + sec;
    }

    // concatenate with colon
    var message = min.toString() + ":" + sec;

    // now change the display
    $('#timer_admin').html(message);
    console.log(message);



    // stop is down to zero
    if (secondsRemaining === 0){
        console.log("Time is up...")
        clearInterval(intervalHandle);
        resetPage();
    }

    //subtract from seconds remaining
    secondsRemaining--;

}

function startCountdown(){

    console.log("'Submit' pressed/StartCountdown() started...");

    /*function resetPage(){
        document.getElementById("inputArea").style.display = "block";
    }*/

    /*// get contents of the "minutes" text box
    var minutes = document.getElementById("minutes").value;*/

    var time = $('#testInput1').val();
    console.log("testInput1: " + time);

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
    console.log("Called tick()");

}

$(document).ready(function() {

    //test 1
    console.log("document ready...");

    //test 2
    console.log("this is document A");
    $('#timer_public').html("bzzz");



});
