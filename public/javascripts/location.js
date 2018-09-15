const url = "http://localhost:11000/sos";
const method = "POST";

(function(window, document, undefined){
    'use strict';
    var start;
    var end;
    var delta;
    var button = document.getElementById("butt2");

    //console.log("HTTP Request created");

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

    });
})(window, document);

var x = document.getElementById("latitude");
var y = document.getElementById("longitude");


function showPosition(position) {
    //console.log("In showPosition: " + JSON.stringify(postData));
    var postData;
    if(position != null){
        x.innerHTML = "Latitude: here" + position.coords.latitude + "\n";
        y.innerHTML = "Longitude: here" + position.coords.longitude;
        postData = {
            latitude: JSON.stringify(position.coords.latitude),
            longitude: JSON.stringify(position.coords.longitude)
        };
    }

    var request = new XMLHttpRequest();

    request.onload = function () {

       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = request.responseText; // Returned data, e.g., an HTML document.
    }

    request.open(method, url);

    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    // Actually sends the request to the server.
    request.send(JSON.stringify(postData));

    //console.log("In showPosition: " + JSON.stringify(postData));
}

