/**
 * Created by Theo on 9/7/2014.
 */
$(document).ready(function() {

    //check for the document window size
    var a = $(document).width();
    var b = $(document).height();
    var c = $(window).width();
    var d = $(window).height();
    console.log('//check this in 100% zoom:');
    console.log('-document width: ' + a +', document height: ' + b + '.');
    console.log('-window width: ' + c + ', window height: ' + d + '.');
});
