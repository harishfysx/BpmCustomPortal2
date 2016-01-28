var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/home');
});

router.get('/login', function(req, res, next) {
	  res.render('pages/login');
	});

module.exports = router;
