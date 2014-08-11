var secondsRemaining;
var intervalHandle;

function resetPage(){

    document.getElementById("inputArea").style.display = "block";
}

function tick(){
    // grab the h1
    var timeDisplay = document.getElementById("time");

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
    timeDisplay.innerHTML = message;

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

    /*function resetPage(){
        document.getElementById("inputArea").style.display = "block";
    }*/

    /*// get countents of the "minutes" text box
    var minutes = document.getElementById("minutes").value;*/

    var time = $('#input1').val();
    console.log(time);

    /*// check if not a number
    if (isNaN(time)){
        alert("Please enter a number");
        return; // stops function if true
    }*/

    // how many seconds
    secondsRemaining = time * 60;

    //every second, call the "tick" function
    // have to make it into a variable so that you can stop the interval later!!!
    intervalHandle = setInterval(tick, 1000);

    /*// hide the form
    document.getElementById("inputArea").style.display = "none";*/
    $("#input").remove();


}

$(document).ready(function() {

    //test 1
    console.log("document ready...");

    //create an input field in the input div
    var input = $('<span><input id="input1" type="number"></span>');
    $('#input').append(input);
    console.log("created input...");

    //create a submit button in the input div
    var submitB = $("<span><button type='button' onclick=startCountdown()>Click here to start timer</button></span>");
    $('#input').append(submitB);
    console.log("created button...");

});
