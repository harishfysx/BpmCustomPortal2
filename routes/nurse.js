var express = require('express');
var passport = require('passport');
var favicon = require('serve-favicon');
var ensureAuth =require('connect-ensure-login');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.render('pages/nurse',{pageHeader:'Nurse Dashboard'});
});


router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/login');
	})



module.exports = router;