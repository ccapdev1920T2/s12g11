const db = require('../models/db.js');

const User = require('../models/userModel.js');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signupController = {

    getSignUp: function (req, res) {
        res.render('signup',{success:"hidden"});
    },

    postSignUp: function (req, res) {
		
		var errors = validationResult(req);
		
		if (!errors.isEmpty()) {

            errors = errors.errors;
			
            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('signup', details);
        }
		else{

			var email = req.body.email;
			var name = req.body.name;
			var uuName = req.body.uuName;
			var course = req.body.course;
			var id = req.body.id;
			var pass = req.body.pass + "";
			
			bcrypt.hash(pass, saltRounds, function(err, hash) {
			
				db.insertOne(User, {
					uuName: uuName,
					password: hash,
					
					dpPath:'default.jpg',
					
					name: name,
					id: id,
					email: email,
					course: course
				}, function(flag){});
			
			});

			console.log('Created account of ' + id);
			res.render('signup');
		}
    },

    checkUsername: function (req, res) {
        var uuName = req.query.uuName;

        db.findOne(User, {uuName:uuName}, {uuName:1}, function (result) {
            res.send(result);
        });
    },
	
	checkID: function (req, res) {
        var id = req.query.id;
        db.findOne(User, {id: id}, "id", function (result) {
            res.send(result);
        });
    }

}

module.exports = signupController;
