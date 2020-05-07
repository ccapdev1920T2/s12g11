const db = require('../models/db.js');

const Faculty = require('../models/facultyModel.js');

const resultsController = {

    getResults: function (req, res) {
		
		if(req.session.uuName){
			var key = req.query.key;
		
			var query = { $or: [ {name: { $regex: key}}, {college: { $regex: key}}, {department: { $regex: key}} ]};
		
			db.findMany(Faculty, query, {fuName:-1}, {fuName:1, name:1}, 0, function(result) {
				res.render('result', {
					thisSearch: "this",
					
					searchKey: key,
		
					results: result
		
				});
				console.log('searched!');
			});
		}
		else{
			console.log('You are not logged in');
			res.render('error', {extra: '<br>Please try logging in.'});
		}
			
    }
}

module.exports = resultsController;