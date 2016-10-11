var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');

//initialize the express enigine
var app = express();

//Define the place where views are going to be
app.set('views', './views');

//Define the engine for the views (jade)
app.set('view engine', 'jade');

//Stormpath middleware to check if user is logged in and create a login screen to manage that.
var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '../.stormpath/apiKey-45KO1DLE8BTK6HF2D81RTBZ9S.properties',
  application: 'https://api.stormpath.com/v1/applications/5rKNGhCLw9Qc029L8nawig',
  secretKey: 'EquipoRocketAlRescate123#!¡',
  expandCustomData: true,
  enableForgotPassword: true
});

//Initialize the stormpathMiddleWare
app.use(stormpathMiddleware);

//We create a router for the home ('/') and we pass the parameter $title
app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

//We create a router for the /profile location and the stormpath login-required. 
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

//Creo que lo que estamos haciendo aquí es decirle a morgan (logger) que actualice automaticamente la pagina cuando hagamos cambios. 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


console.log("It's working, just enter to //localhost:3000 ");
// console.log(util.inspect(anyObject));


module.exports = app;



app.listen(3000);