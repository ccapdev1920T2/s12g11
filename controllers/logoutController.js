const db = require('../models/db.js');

const Instance = require('../models/instanceModel.js');

const logoutController = {

    getLogout: function (req, res) {

        db.findMany(Instance, null, {_id:-1}, null, 0, function(u){
            
            if(u[0] != null){
                db.deleteMany(Instance, null, function(y){
                
                });
                console.log(u[0].uuName + ' Successfully Logged Out');
                res.render('logout');
            }
            else{
				console.log('You are not even logged in');
				res.render('error', {extra: "<br>You can't log out if you haven't even logged in yet!"});
			}
            
		});

        
    }
}

module.exports = logoutController;
