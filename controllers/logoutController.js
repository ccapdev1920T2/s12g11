const db = require('../models/db.js');

const logoutController = {

    getLogout: function (req, res) {
		
		if(req.session.uuName){
			
			var u = req.session.uuName;
			
			req.session.destroy(function(err) {
				if(err) throw err;

				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + u + ' Successfully logged out');
				res.render('logout');
			});
			
		}
		else{
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>You are not logged in');
			res.render('error', {extra: "<br>You can't log out if you haven't even logged in yet!"});
		}
	
    }
}

module.exports = logoutController;
