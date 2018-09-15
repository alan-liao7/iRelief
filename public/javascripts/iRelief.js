(function(window, document, undefined){
    'use strict';
    var start;
    var end;
    var delta;
    var button = document.getElementById("butt2");

    button.addEventListener("mousedown", function(){
        start = new Date();
    });

    button.addEventListener("mouseup", function() {
        end = new Date();
        delta = end - start;
        if (delta > 0 && delta < 5000) {
            alert("You pressed for " + delta / 1000 + " seconds. Press for over 5 seconds to send an alert to authorities");
        }
        if (delta > 5000) {
            alert("more than five seconds: calling 911");
        }
        
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
        button.addEventListener("mousedown", function(){
        start = new Date();
    });


    
    });
})(window, document);

var x = document.getElementById("demo");


function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}