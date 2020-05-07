const db = require('../models/db.js');

const User = require('../models/userModel.js');

const bcrypt = require('bcrypt');

const loginController = {

    getLogin: function (req, res) {

        if(req.session.uuName)
			req.session.destroy(function(err) {
				if(err) throw err;
			});

        res.render('login',{error:"hidden"});
    },

    postLogin: function (req, res) {
		
        var u = req.body.uuName;
        var p = req.body.password;

        var query1 = {uuName: u};
		db.findOne(User, query1, null, function(x) {
            
			if(x)
				bcrypt.compare(p, x.password, function(err, equal) {
					
					if(equal){
						
						req.session.uuName = x.uuName;
						
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + x.uuName + ' Successfully Logged In');

						res.redirect('/user/');
					}
					else{
						res.render('login');
					}
					
				});
			else
				res.render('login');
        });
    }
}

module.exports = loginController;