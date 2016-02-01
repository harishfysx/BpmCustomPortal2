var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash    = require('connect-flash');
var ensureAuth =require('connect-ensure-login');
var xhr = require('node-xhr');

//routes loading
//var SignIn = require('./routes/signIn'); 
var tressPass= require('./routes/tressPass');
var frontDesk= require('./routes/frontDesk');
var nurse= require('./routes/nurse');
var getTasks= require('./routes/getTasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});
//passport to use local strategy	
passport.use(new LocalStrategy({
		
        passReqToCallback : true
    },
    function(req, username, password, done) { 
	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
	app.locals.userName=username;
	app.locals.auth = auth;
        // check in mongo if a user with username exists or not
        xhr.get({
            url: 'http://192.168.2.140:9080/rest/bpm/wle/v1/user/current',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
        }, 
        function(err, res) {
            if (err) {
                //console.log(err.message);
                return;
            }
            
            if(JSON.stringify(res.status.code)==401){
            	
            	//console.log(res);
            	return done(null, null,req.flash('message', 'Invalid Username Or Password'))
     
            }else{
            	var user=res.body.data;
            	req.user=res.body.data.userName;
            	//console.log("harish log"+res.body.data.userName);
            	//console.log(req.user)
                return done(null, user);
                 
               
            }
            
        });
        

    }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	  res.locals.auth = app.locals.auth;
	  res.locals.userName=app.locals.userName;
	  
	  next();
	});

app.use('/',tressPass);

app.use('/frontDesk',frontDesk);
app.use('/nurse',nurse);

app.use('/data',getTasks)

app.post('/createInst',function(req,res){
	res.json('created')
})

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(400);
   res.render('pages/404', {custmessage: '404: File Not Found'});
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
