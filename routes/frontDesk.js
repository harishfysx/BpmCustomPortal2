var express = require('express');
var passport = require('passport');
var favicon = require('serve-favicon');
var ensureAuth =require('connect-ensure-login');
var bodyParser = require('body-parser');
var xhr = require('node-xhr');
var config = require('./config');
var a = require("array-tools");
var router = express.Router();


router.get('/', ensureAuth.ensureLoggedIn('/login'),function(req, res, next) {
  res.render('pages/frontDesk',{pageHeader:'Front Desk PC Dashboard'});
});


router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/login');
	})

router.get('/success200',function(req, res) {
  res.render('pages/success200');
});

router.post('/frontDeskTasks',function(req, res, next) {
	//console.log(res.locals.userName)
	
	xhr.put({
        url: config.baseUrl+'/bpm/wle/v1/search/query/?',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            condition: ['taskActivityName|Equals|Patient Check In', 'taskStatus|Equals|Received'],
            organization: 'byInstance'
        },
    }, function(err, resp) {
        if (err) {
            console.log(err.message);
            return;
        }
        
        var refinedData={};
        
        if(resp.body.data){
        if(resp.body.data.data){
        	
        refinedData.totalData=resp.body.data.data;
        refinedData.normalTcount=a.where(resp.body.data.data, { taskPriority: "Normal" }).length;
        refinedData.highTcount=a.where(resp.body.data.data, { taskPriority: "High" }).length;
        refinedData.lowTcount=a.where(resp.body.data.data, { taskPriority: "Low" }).length;
        }
        //console.log("tasks were fetched")
        	//console.log(resp.body.data.totalCount);
        res.json(refinedData);
        
    }
        else{
        	res.json('soemthing went wrong');	
        }
    }    
	);
	//console.log(resp);
	  //res.render('pages/home',{tagline:req.user.userName||'test'});
	});

//get specific task details
router.get('/frontDeskTask/:id',function(req, res, next) {
	console.log(res.locals.userName)
	
	xhr.get({
        url: config.baseUrl+'/bpm/wle/v1/task/'+req.params.id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            
            parts: 'all'
        },
    }, function(err, resp) {
        if (err) {
            console.log(err.message);
            return;
        }
        
        
        
        //console.log(resp.body.data);
        
        res.json(resp.body.data);
        
   
    }    
	);
	
	});

//finish Front Desk Task

router.post('/postFrntDeskTask',function(req, res, next) {
	
	
	xhr.put({
        url: config.baseUrl+'/bpm/wle/v1/task/'+req.body.tkiid+'?',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            action: 'finish',
			parts:'all'
        },
    }, function(err, resp) {
        if (err) {
            console.log(err.message);
            return;
        }
        
        res.json(resp)
        
        
        
    }    
	);
	
	});


module.exports = router;
