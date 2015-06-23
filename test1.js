/**
 * Created by Theo on 23-06-2015.
 */
$(document).ready(function() {

    $( "#tDiv" ).hide();

    $( "#tDivPod" ).mouseout(function() {
        console.log("Out!");
        $( "#tDiv" ).hide();
    });
    $( "#tDivPod" ).mouseover(function() {
        console.log("Over!");
        $( "#tDiv" ).show();
    });




});

