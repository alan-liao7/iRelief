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

var timer = new Timer();
timer.start({precision: 'seconds'});
timer.addEventListener('secondsUpdated', function (e) {
    $('#gettingValuesExample .days').html(timer.getTimeValues().days);
    $('#gettingValuesExample .hours').html(timer.getTimeValues().hours);
    $('#gettingValuesExample .minutes').html(timer.getTimeValues().minutes);
    $('#gettingValuesExample .seconds').html(timer.getTimeValues().seconds);
    $('#gettingValuesExample .secondTenths').html(timer.getTimeValues().secondTenths);

    $('#gettingTotalValuesExample .days').html(timer.getTotalTimeValues().days);
    $('#gettingTotalValuesExample .hours').html(timer.getTotalTimeValues().hours);
    $('#gettingTotalValuesExample .minutes').html(timer.getTotalTimeValues().minutes);
    $('#gettingTotalValuesExample .seconds').html(timer.getTotalTimeValues().seconds);
    $('#gettingTotalValuesExample .secondTenths').html(timer.getTotalTimeValues().secondTenths);
});

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}