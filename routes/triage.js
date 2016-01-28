var express = require('express');
var passport = require('passport');
var ensureAuth =require('connect-ensure-login');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.render('pages/triage',{pageHeader:'Triage Patient'});
});


router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/login');
	})



module.exports = router;