const db = require('../models/db.js');

const Faculty = require('../models/facultyModel.js');
const Review = require('../models/reviewModel.js');
const Instance = require('../models/instanceModel.js');
const User = require('../models/userModel.js');

const facultyController = {

    getFaculty: function (req, res) {
		

		db.findMany(Instance, null, {_id:-1}, null, 1, function(i){

			if(i[0] != null){
				var u = req.params.fuName;
				
				var query1 = {fuName: u};
				db.findOne(Faculty, query1, null, function(x) {
					
					if(x != null){
						var query2 = {reviewee_u: u};
						db.findMany(Review, query2, {_id:-1}, null, 0, function(y){
							
							res.render('faculty', {
								fuName: x.fuName,
				
								dpPath: x.dpPath,

								name: x.name,
								email: x.email,
								college: x.college,
								department: x.department,
								oaRating: x.oaRating.toFixed(2),
								
								subjects: x.subjects,
								
								revEntries: y
							});
						});
					}
					else{
						console.log('Faculty Not Found');
						res.render('error');
					}
					
				});
			}
			else{
				console.log('You are not logged in');
				res.render('error', {extra: '<br>Please try logging in.'});
			}

		});
		
	},

	postReview: function (req, res) {
		var u = req.params.fuName;

		var review = req.body.review;
		var course = req.body.course;
		var stars = req.body.stars;

		// checking if the prof already have the subject on his/her record
		var query1 = {$and: [{fuName: u}, {'subjects.subject': course}]};
		db.findOne(Faculty, query1, null, function(x) {

			if(x != null){ // >>>>>>>>>>>>>>>>>>>> if the prof has the subject already
				
				var query2 = {reviewee_u: u};
				db.findMany(Review, query2, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof

					
					var query3 = {$and: [{reviewee_u: u}, {revCourse: course}]};
					db.findMany(Review, query3, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;// number of reviews for the prof about the specific subject

						// computing for average
						var filter = {fuName: x.fuName, 'subjects.subject': course};
						db.updateOne(Faculty, filter, { 	
							$mul:{
								oaRating: numTotalReviews,
								'subjects.$.rating': numSubjectReviews
							}					
						});
						db.updateOne(Faculty, filter, { 	
							$inc:{
								oaRating: stars,
								'subjects.$.rating': stars
							}						
						});
						db.updateOne(Faculty, filter, { 	
							$mul:{
								oaRating: 1/(numTotalReviews+1),
								'subjects.$.rating': 1/(numSubjectReviews+1)
							}					
						});

						// finding the logged user
						db.findOne(Instance, null, null, function(logged) {
							db.findOne(User, {uuName:logged.uuName}, null, function(loggedUser) {
								// adding the review
								db.insertOne(Review, {
									reviewee_u: u,

									imagePath: loggedUser.dpPath,

									reviewer: loggedUser.uuName,
									reviewee: x.name,
									revCourse: course,
									revStar: stars,
									revDet: review
								});
							});
						});

						res.redirect('/faculty/' + u);

					});

				});
				
			}
			else{ // >>>>>>>>>>>>>>>>>>>> if the prof doesn't have the subject yet
				
				// adding the subject and rating to the prof
				var filter = {fuName: u, 'subjects.subject': {$ne: course}};
				db.updateOne(Faculty, filter, {
					$addToSet: {
						subjects: {
							subject: course,
							rating: stars
						}
					}
				});

				var query2 = {fuName: u};
				db.findOne(Faculty, query2, null, function(prof) {
					
					var query3 = {reviewee_u: u};
					db.findMany(Review, query3, null, null, 0, function(allRevs) {

						var numTotalReviews = allRevs.length;// total number of reviews for the prof

						// computing for average
						var filter = {fuName: prof.fuName, 'subjects.subject': course};
						db.updateOne(Faculty, filter, { 	
							$mul:{
								oaRating: numTotalReviews
							}					
						});
						db.updateOne(Faculty, filter, { 	
							$inc:{
								oaRating: stars
							}						
						});
						db.updateOne(Faculty, filter, { 	
							$mul:{
								oaRating: 1/(numTotalReviews+1)
							}					
						});

						// finding the logged user
						db.findOne(Instance, null, null, function(logged) {
							db.findOne(User, {uuName:logged.uuName}, null, function(loggedUser) {
								// adding the review
								db.insertOne(Review, {
									reviewee_u: u,

									imagePath: loggedUser.dpPath,

									reviewer: loggedUser.uuName,
									reviewee: prof.name,
									revCourse: course,
									revStar: stars,
									revDet: review
								});
							});
						});

						res.redirect('/faculty/' + u);

					});

				});
			}
		});
	},

	checkReview: function (req, res) {
		var course = req.query.course;

		db.findMany(Instance, null, {_id:-1}, null, 1, function(i){
			var uuName = i[0].uuName;

			db.findOne(Review, {reviewer: uuName, revCourse:course}, null, function (result) { 
				res.send(result);
			});
		});
	}
}


module.exports = facultyController;
