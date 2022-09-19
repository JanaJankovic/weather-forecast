var express  = require('express');
var app      = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Permissions-Policy", "geolocation=(self 'https://nomnio-weather-forecast.herokuapp.com/')");
  res.header("Referrer-Policy", "same-origin");
  res.header(
    "Content-Security-Policy-Report-Only",
  "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src 'self';");
  res.header(
    "Report-To",
    '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://nomnio-weather-forecast.herokuapp.com/__cspreport__"}],"include_subdomains":true}'
  );
  next();
});

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
