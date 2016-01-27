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
		
		function(req,username, password,done){
			process.nextTick(function() {

	    if(username==password){
	    	console.log("authetnicated")
	    	done(null,{id:username,name:username});
	    }else{
	    	console.log("Not authetnicated")
	    	req.flash('message', 'Invalid Username Or Password');
	      done(null,null);
	    }
	    
		})
	
	})
	
);

app.use(express.static(path.join(__dirname, 'public')));

//home page
app.get('/',ensureAuth.ensureLoggedIn('/login'),function(req, res, next) {
	  res.render('pages/home');
	});

//login page
app.get('/login',function(req, res, next) {
		  res.render('pages/login',{message: req.flash('message')});
		});

app.post('/login', passport.authenticate('local', {
	  successRedirect: '/',
	  failureRedirect: '/login', // see text
	  failureFlash: true // optional, see text as well
}))

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
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
