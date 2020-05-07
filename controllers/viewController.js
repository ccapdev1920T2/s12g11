const db = require('../models/db.js');

const Faculty = require('../models/facultyModel.js');

const viewController = {

    getFaculties: function (req, res) {
		
		if(req.session.uuName){
			var query1 = {college: "College of Computer Studies"};
			db.findMany(Faculty, query1, {name:1}, {name:1, fuName:1}, 0, function(a) {
				
				var query2 = {college: "College of Science"};
				db.findMany(Faculty, query2, {name:1}, {name:1, fuName:1}, 0, function(b){
					
					var query3 = {college: "College of Engineering"};
					db.findMany(Faculty, query3, {name:1}, {name:1, fuName:1}, 0, function(c){
						
						var query4 = {college: "College of Business"};
						db.findMany(Faculty, query4, {name:1}, {name:1, fuName:1}, 0, function(d){
							
							var query5 = {college: "School of Economics"};
							db.findMany(Faculty, query5, {name:1}, {name:1, fuName:1}, 0, function(e){
								
								var query6 = {college: "College of Liberal Arts"};
								db.findMany(Faculty, query6, {name:1}, {name:1, fuName:1}, 0, function(f){
									
									var query7 = {college: "Brother Andrew Gonzales College of Education"};
									db.findMany(Faculty, query7, {name:1}, {name:1, fuName:1}, 0, function(g){
										
										res.render('view', {
											thisView: "this",
											CCSprofs: a,
											COSprofs: b,
											COEprofs: c,
											COBprofs: d,
											SOEprofs: e,
											CLAprofs: f,
											BAGCEDprofs: g
										});
										
									});
									
								});
								
							});
							
						});
						
					});
					
				});
				
			});
		}
		else{
			console.log('You are not logged in');
			res.render('error', {extra: '<br>Please try logging in.'});
		}
		
	}
}


module.exports = viewController;
