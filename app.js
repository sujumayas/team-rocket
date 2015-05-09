var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//initialize
var app = express();


app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '/Users/eespinosa/Documents/Coding/.stormpath/apiKey-45KO1DLE8BTK6HF2D81RTBZ9S.properties',
  application: 'https://api.stormpath.com/v1/applications/5rKNGhCLw9Qc029L8nawig',
  secretKey: 'EquipoRocketAlRescate123#!¡',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});


app.use('/profile',stormpath.loginRequired,require('./profile')());

// GET Playlists
app.get('/playlist', function (req, res) {
  res.render('playlist');
});

// GET Voting
app.get('/event', function (req, res) { //This should be an automated hash url later, linked to the user.
  res.render('event');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






module.exports = app;



app.listen(3000);