const db = require('../models/db.js');

const User = require('../models/userModel.js');
const Instance = require('../models/instanceModel.js');

const loginController = {

    getLogin: function (req, res) {

        db.deleteMany(Instance, null);

        res.render('login',{error:"hidden"});
    },

    postLogin: function (req, res) {
		
        var u = req.body.uuName;
        var p = req.body.password;

        var query1 = {uuName: u, password: p};
		db.findOne(User, query1, null, function(x) {
            
            if(x != null){
                db.insertOne(Instance, {uuName: u}, function(flag){});
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + u + ' Successfully Logged In');

                res.redirect('/user/');
            }
            else{
                res.render('login');
            }
			
        });
    }
}

module.exports = loginController;