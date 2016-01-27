exports.getHome=function(req,res){
	res.render('pages/home');
}

exports.getLogin=function(req, res, next) {
	  res.render('pages/login',{message: req.flash('message')});
	}

exports.getLogOut=function(req, res) {
    req.logout();
    res.redirect('/login');
}

exports.postLogin=function(req, res) {
    req.logout();
    res.redirect('/login');
}

