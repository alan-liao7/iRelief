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

    });
})(window, document);

var x = document.getElementById("latitude");
var y = document.getElementById("longitude");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = "http://10.194.39.224:11000/sos";
const method = "POST";
var postData = "Some data";
var shouldBeAsync = true;
var request = new XMLHttpRequest();

request.onload = function () {

   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   var data = request.responseText; // Returned data, e.g., an HTML document.
}

function showPosition(position) {
    x.innerHTML = "Latitude: here" + position.coords.latitude + "\n";
    y.innerHTML = "Longitude: here" + position.coords.longitude;

    postData = {
        latitude: JSON.stringify(position.coords.latitude),
        longitude: JSON.stringify(position.coords.longitude)
    };

    request.open(method, url, shouldBeAsync);

    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    // Actually sends the request to the server.
    request.send(postData);

}
