var express = require('express');
var passport = require('passport');
var ensureAuth =require('connect-ensure-login');
var xhr = require('node-xhr');
var bodyParser=require("body-parser");
var favicon = require('serve-favicon');
var config = require('./config');
var path = require('path');
var a = require("array-tools");
var router = express.Router();

router.get('/',ensureAuth.ensureLoggedIn('/login'), function(req, res, next) {
	res.render('pages/nurse',{pageHeader:'Nurse Dashboard'});
});


router.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/login');
	})
	
	
//get Nurse Tasks
router.post('/nurseTasks',function(req, res, next) {
	console.log(res.locals.userName)
	
	xhr.put({
        url: config.baseUrl+'/bpm/wle/v1/search/query/?',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            condition: ['taskActivityName|Equals|Triage Patient', 'taskStatus|Equals|Received'],
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
        
        res.json(refinedData);
        
    }
        else{
        	res.json('soemthing went wrong');	
        }
    }    
	);
	
	});
//route to triage patient when clicked on work button

/*
router.get('/workTask/:id',function(req,res){
	//console.log( req.params.id);
	//res.send("tagId is set to " + req.params.id);
	res.render('pages/triage',{pageHeader:'Triage Patient'})
});
*/

router.get('/nurseTask/:id',function(req, res, next) {
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

//post Triage Form
/*
router.post('/postTriage',function(req,res){
	console.log(req.body)
	res.json(req.body)
})
*/
router.post('/postTriage',function(req, res, next) {
	//console.log(res.locals.userName)
	
	xhr.put({
        url: config.baseUrl+'/bpm/wle/v1/task/'+req.body.tkiid+'?',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            action: 'finish',
            params: req.body.taskParam,
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