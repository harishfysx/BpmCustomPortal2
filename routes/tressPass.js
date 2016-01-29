var express = require('express');
var passport = require('passport');
var ensureAuth =require('connect-ensure-login');
var xhr = require('node-xhr');
var config = require('./config');
var router = express.Router();
var a = require("array-tools");

router.get('/',ensureAuth.ensureLoggedIn('/login'),function(req, res, next) {
	console.log(res.locals.userName)
	
	xhr.put({
        url: config.baseUrl+'/bpm/wle/v1/search/query/?',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': res.locals.auth
        },
        params: {
            condition: ['taskActivityName|Equals|Submit job requisition', 'taskStatus|Equals|Received'],
            organization: 'byInstance'
        },
    }, function(err, resp) {
        if (err) {
            console.log(err.message);
            return;
        }
        
        var refinedData={};
        if(resp.body.data.data){
        	
        
        refinedData.normalTcount=a.where(resp.body.data.data, { taskPriority: "Normal" }).length;
        refinedData.highTcount=a.where(resp.body.data.data, { taskPriority: "High" }).length;
        refinedData.lowTcount=a.where(resp.body.data.data, { taskPriority: "Low" }).length;
        }
        //console.log("tasks were fetched")
        	//console.log(resp.body.data.totalCount);
        res.render('pages/home',{pageHeader:'Dashboard',userName:res.locals.userName||'testuser',tasksData:refinedData||'test',instanceId:''});
        
    });
	//console.log(resp);
	  //res.render('pages/home',{tagline:req.user.userName||'test'});
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