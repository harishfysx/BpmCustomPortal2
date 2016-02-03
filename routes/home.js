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
	 res.render('pages/home',{pageHeader:'Patient Check In'});

	});

//login page
router.get('/login',function(req, res, next) {
		  res.render('pages/login',{message: req.flash('message')});
		});

router.post('/login', passport.authenticate('local', {
	  successRedirect: '/',
	  failureRedirect: '/login', // see text
	  failureFlash: true // optional, see text as well
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.post('/startInst',function(req, res, next) {
	console.log(req.body)
	
	var patientData={"person":{
								"firstName":req.body.firstName,
								"lastName":req.body.lastName,
								"middleName":req.body.midName,
								"gender":req.body.gender,
								"dateOfBirth":req.body.dob
							  },
					"address":{
						       "address1":req.body.address1,
						       "address2":req.body.address2,
						       "city":req.body.city,
						       "state":req.body.state,
						       "country":req.body.country,
						       "zip":req.body.zip,
						       "phone":req.body.phone,
						       "email":req.body.email
						       },
				    "insuranceInfo":{
				    	"isInsured":req.body.isInsured,
				    	"memberId":req.body.memberId,
				    	"organization":req.body.organization,
				    	"expiration":req.body.insExpDate
				    		}
					}
	console.log(patientData)
	
xhr.post({
        url: config.baseUrl+'/bpm/wle/v1/process?',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            action: 'start',
            bpdId: config.bpdId,
			branchId:config.branchId,
			params:patientData,
			parts: 'all'
        },
    }, function(err, resp) {
        if (err) {
            console.log(err.message);
            return;
        }
        
        
        
       //console.log(resp)
        	//console.log(resp.body.data.totalCount);
        if(resp.status.code==200){
        	res.redirect('/');
        }else if(resp.status.code==401){
        	res.render('pages/401');
        }else{
        	res.json('something went wrong');
        }
        	
        
        
        
    });
	//console.log(resp);
	  
	});




module.exports = router;