var express = require('express');
var passport = require('passport');
var ensureAuth =require('connect-ensure-login');
var xhr = require('node-xhr');
var favicon = require('serve-favicon');
var config = require('./config');
var router = express.Router();
var a = require("array-tools");

router.post('/tasksData',function(req, res, next) {
	console.log(res.locals.userName)
	
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

module.exports = router;