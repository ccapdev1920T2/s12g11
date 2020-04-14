const db = require('../models/db.js');

const User = require('../models/userModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('signup',{success:"hidden"});
    },

    postSignUp: function (req, res) {

		var email = req.body.email;
		var name = req.body.name;
		var uuName = req.body.uuName;
		var course = req.body.course;
		var id = req.body.id;
        var pass = req.body.pass + "";
		
        db.insertOne(User, {
            uuName: uuName,
			password: pass,
			
            dpPath:'default.jpg',
            
			name: name,
            id: id,
            email: email,
			course: course
        });

        console.log('Created account of ' + id);
        res.render('signup');
    },

    checkUsername: function (req, res) {
        var uuName = req.query.uuName;

        db.findOne(User, {uuName:uuName}, {uuName:1}, function (result) {
            res.send(result);
        });
    }

}

module.exports = signupController;
