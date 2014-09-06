/**
 * Created by Theo on 9/7/2014.
 */


$(document).ready(function() {


    /*$("#country_name").html("biiiipppp...");*/

    myTrick = setInterval(checkAdmin, 1000);

});

function checkAdmin() {

    /*$("#country_name").load("timer-admin.html #A");*/

    /*jQuery.ajax({
        type: 'get',
        url: "timer-admin.html",
        success: function(result) {
            html = jQuery(result);
            alert(html.find("div#template").html());
            alert(html.find("div#template"));
        }
    });*/

    $.get("timer-admin.html #A",function(){

        /*window.opener.$("#A") = adminInput;*/

        console.log("t!");
        $("#country_name").html(window.opener.$("#A"));

        });

}







