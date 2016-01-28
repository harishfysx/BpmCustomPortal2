var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var xhr = require('node-xhr');
var config = require('./config');
var ensureAuth =require('connect-ensure-login');
var router = express.Router();


router.get('/', ensureAuth.ensureLoggedIn('/login'),function(req, res, next) {
  res.render('pages/patientCheckIn',{pageHeader:'Patient CheckIn'});
});


router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/login');
	})
/*	
router.post('/startInst', function(req, res) {
	//console.log(req.body);
	var params={"person":{"firstName":"Harish","lastName":"Puli"}}
	//console.log(JSON.stringify(params));
	console.log("bpd id is"+config.bpdId)
	  res.json(req.body);
	})
*/
router.post('/startInst',function(req, res, next) {
	console.log(res.locals.auth)
	
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
			params:{"person":{"firstName":"Harish","lastName":"Puli","middleName":"Goud","gender":true,"dateOfBirth":"1985-05-03"},"address":{"address1":"10104 Landing Lane","address2":"Apt 10","city":"Moon Town","state":"PA","country":"USA","zip":15108,"phone":"573-578-0760","email":"harishfysx@gmail.com"},"insuranceInfo":{"isInsured":true,"memberId":"579437493er","organization":"Harrisburg","expiration":"2017-05-03"}},
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
        	res.json('Success');
        }else if(resp.status.code==401){
        	res.render('pages/401');
        }else{
        	res.json('something went wrong');
        }
        	
        
        
        
    });
	//console.log(resp);
	  
	});



module.exports = router;
