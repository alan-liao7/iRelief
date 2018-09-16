var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var hbs = require('express-handlebars');
var geocoder = require('geocoder');

var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB-Sd_InBeYptAPAv2NZc4rVl8CcxHrNuA', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

//geocoder.use(options);

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var latitude = 39.32761461649892;
var longitude = -76.62223031968674;

app.post('/sos', function (req, res) {
  console.log('POST /sos');
  console.log(req.body);
  latitude = req.body.latitude;
  longitude = req.body.longitude;
  geocoder.reverseGeocode(latitude, longitude, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }

  });
  //console.log('Latitude: ' + req.body.latitude + '\nLongitude: ' + req.body.longitude);
  res.set('Content-Type', 'application/json');
  res.send(`You sent: ${req.body.latitude} to Express`);
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}.`)
})

module.exports = app;