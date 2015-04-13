var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// --------------------- + --------------------------------------------------
// Absat-app Module requires

var port = process.env.PORT || 1111;
var mongoose = require('mongoose');
var fs = require('fs-extra');
var mobileDetect = require('mobile-detect');
var passport = require('passport');
var LocalEstrategy=require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session')
// --------------------- + --------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.set('port', process.env.PORT || 1111);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('5710836184a9a13869787cccb77b5788'));
app.use(express.static(path.join(__dirname, 'public')));

// --------------------- + --------------------------------------------------
// Absat-app uses

app.use(session({
    saveUninitialized: true, // saved new sessions
    resave: true,
    secret: '5710836184a9a13869787cccb77b5788',
    cookie : { httpOnly: true, maxAge: 2419200000 }
}));
app.use(passport.initialize());
app.use(passport.session());
// --------------------- + --------------------------------------------------

app.use('/', routes);
app.use('/users', users);

// --------------------- + --------------------------------------------------
// Absat-app outside files requires
require('./mongodbConnection.js');
require('./schemaDB');
require('./authentication')(passport);
// --------------------- + --------------------------------------------------


// MOBILE RESPONSE
// --------------------- + --------------------------------------------------
// --------------------- + -------------------------------------------
// --------------------- + -------------------------------
// --------------------- + ---------------------
// Mobile redirect
app.get('/detect', function(req, res){
    var md = new mobileDetect(req.headers['user-agent']);
    if(md.mobile() === null){
        res.redirect('index');
    }else{
        res.redirect('/mobile');
    }
});

// load authentication module
require('./zjs/authentication.app.js')(app);




// --------------------- + ---------------------
// --------------------- + -------------------------------
// --------------------- + -------------------------------------------
// --------------------- + --------------------------------------------------



/*/ Create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('the app listen on port:' + app.get('port'));
});*/
app.listen(port)