const url = "http://localhost:11000/sos";
const method = "POST";
var postData = {
	key : "Hello"
};
var request = new XMLHttpRequest();

request.onload = function () {

   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   var data = request.responseText; // Returned data, e.g., an HTML document.
}

request.open(method, url);

request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    // Actually sends the request to the server.
request.send(JSON.stringify(postData));