/**
 * Created by Theo on 9/7/2014.
 */

/*
jQuery.ajax({
 type: 'get',
 url: "timer-admin.html",
 success: function(result) {
 html = jQuery(result);
 alert(html.find("div#template").html());
 alert(html.find("div#template"));
 }
 });
*/

$(document).ready(function() {

    $("#country_name").load("timer-admin.html #A");
    $("#country_name").html("biiiipppp...");

});







