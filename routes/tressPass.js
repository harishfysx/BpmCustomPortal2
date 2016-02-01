var express = require('express');
var passport = require('passport');
var ensureAuth =require('connect-ensure-login');
var xhr = require('node-xhr');
var favicon = require('serve-favicon');
var config = require('./config');
var router = express.Router();
var a = require("array-tools");

router.get('/',ensureAuth.ensureLoggedIn('/login'),function(req, res, next) {
	//console.log(res.locals.userName)
	 res.render('pages/home',{pageHeader:'Dashboard'});

	});

//login page
router.get('/login',function(req, res, next) {
		  res.render('pages/login',{message: req.flash('message')});
		});

router.post('/login', passport.authenticate('local', {
	  successRedirect: '/',
	  failureRedirect: '/login', // see text
	  failureFlash: true // optional, see text as well
}))

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
})

module.exports = router;