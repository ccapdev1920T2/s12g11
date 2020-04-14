const db = require('../models/db.js');

const Faculty = require('../models/facultyModel.js');
const User = require('../models/userModel.js');
const Review = require('../models/reviewModel.js');
const Instance = require('../models/instanceModel.js');

const userController = {

    getUser: function (req, res) {

		var u = req.params.uuName;

		db.findMany(Instance, null, {_id:-1}, null, 1, function(i){

			if(i[0] != null){
				if(i[0].uuName == u){
					res.redirect('/user/');
				}
				else{

					var query1 = {uuName: u};
					db.findOne(User, query1, null, function(x) {
						
						if(x != null){
							var query2 = {reviewer: u};
							db.findMany(Review, query2, {_id:-1}, null, 0, function(y){
								
								res.render('profile', {
									uuName: x.uuName,
					
									dpPath: x.dpPath,

									name: x.name,
									id: x.id,
									email: x.email,
									course: x.course,
									
									revEntries: y
								});
							});
						}
						else{
							console.log('User Not Found');
							res.render('error', {extra: '<br>The User may not exist here'});
						}
						
					});

				}
			}
			else{
				console.log('You are not logged in');
				res.render('error', {extra: '<br>Please try logging in.'});
			}

		});
	},
	
	getLoggedUser: function (req, res) {

		db.findMany(Instance, null, {_id:-1}, null, 1, function(u){
			
			if(u[0] != null){
				var query1 = {uuName: u[0].uuName};
				db.findOne(User, query1, null, function(x) {

					var query2 = {reviewer: u[0].uuName};
					db.findMany(Review, query2, {_id:-1}, null, 0, function(y){
						
						res.render('profile', {
							thisProfile: "this",

							uuName: x.uuName,
			
							dpPath: x.dpPath,

							name: x.name,
							id: x.id,
							email: x.email,
							course: x.course,
							
							revEntries: y
						});
					});
					
				});
			}
			else{
				console.log('You are not logged in');
				res.render('error', {extra: '<br>Please try logging in.'});
			}
		});
	},

	checkAuthority: function (req, res) {
		var uuName = req.query.uuName;

		db.findOne(Instance, {uuName:uuName}, {uuName:1}, function (result) {
			console.log('authority checked');
			res.send(result);
		});
		
	},

	deleteReview: function(req, res) {
		var reviewer = req.query.reviewer;
		var reviewee = req.query.reviewee;
		var revCourse = req.query.revCourse;
		var revStar = req.query.revStar;
	
		// IMPORTANT NOTE: at this point, for some reason, the deletion of the review happens first so the number of reviews (both total and for the specific subject) is decreased by one
		var conditions = {reviewer:reviewer, reviewee:reviewee, revCourse:revCourse, revStar:revStar};
		// finding the fuName of the prof
		db.findOne(Review, conditions, null, function(a) {
			db.findOne(Faculty, {fuName:a.reviewee_u}, null, function(b) {
				
				var query1 = {reviewee_u: b.fuName};
				db.findMany(Review, query1, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof

					
					var query2 = {$and: [{reviewee_u: b.fuName}, {revCourse: revCourse}]};
					db.findMany(Review, query2, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;//number of reviews for the prof about the specific subject
						
						if(numSubjectReviews == 0){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the specific subject
							
							// removing the subject and rating from the prof
							var filter = {fuName: b.fuName}
							db.updateOne(Faculty, filter, {
								$pull: {
									subjects: {
										subject: revCourse,
										rating: revStar
									}
								}
							});

							if(numTotalReviews == 0){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the prof
								var filter = {fuName: b.fuName};
								db.updateOne(Faculty, filter, {oaRating: 0});
							}
							else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews for the prof
								// recomputing ratings
								var filter = {fuName: b.fuName};
								db.updateOne(Faculty, filter, { 	
									$mul:{
										oaRating: numTotalReviews + 1
									}					
								});
								db.updateOne(Faculty, filter, { 	
									$inc:{
										oaRating: 0-revStar
									}						
								});
								db.updateOne(Faculty, filter, { 	
									$mul:{
										oaRating: 1/(numTotalReviews)
									}					
								});
							}

						}
						else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews left for the specific subject
							
							var filter = {fuName: b.fuName, 'subjects.subject': revCourse};
							console.log(filter);
							db.updateOne(Faculty, filter, { 	
								$mul:{
									oaRating: numTotalReviews + 1,
									'subjects.$.rating': numSubjectReviews + 1
								}					
							});
							db.updateOne(Faculty, filter, { 	
								$inc:{
									oaRating: 0-revStar,
									'subjects.$.rating': 0-revStar
								}						
							});
							db.updateOne(Faculty, filter, { 	
								$mul:{
									oaRating: 1/(numTotalReviews),
									'subjects.$.rating': 1/(numSubjectReviews)
								}					
							});
							
						}

					});

				});

			});
		});

		db.deleteOne(Review, conditions, function(x){

		});
	},

	editReview: function(req, res) {
		var reviewer = req.body.org_reviewer;
		var reviewee = req.body.org_reviewee;
		var revCourse = req.body.org_revCourse;
		var revStar = req.body.org_revStar;
	
		// IMPORTANT NOTE: at this point, for some reason, the deletion of the review happens first so the number of reviews (both total and for the specific subject) is decreased by one
		var conditions = {reviewer:reviewer, reviewee:reviewee, revCourse:revCourse, revStar:revStar};
		// finding the fuName of the prof
		db.findOne(Review, conditions, null, function(a) {
			db.findOne(Faculty, {fuName:a.reviewee_u}, null, function(b) {
				
				var query1 = {reviewee_u: b.fuName};
				db.findMany(Review, query1, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof

					
					var query2 = {$and: [{reviewee_u: b.fuName}, {revCourse: revCourse}]};
					db.findMany(Review, query2, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;//number of reviews for the prof about the specific subject
						
						if(numSubjectReviews == 0){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the specific subject
							
							// removing the subject and rating from the prof
							var filter = {fuName: b.fuName}
							db.updateOne(Faculty, filter, {
								$pull: {
									subjects: {
										subject: revCourse,
										rating: revStar
									}
								}
							});

							if(numTotalReviews == 0){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the prof
								var filter = {fuName: b.fuName};
								db.updateOne(Faculty, filter, {oaRating: 0});
							}
							else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews for the prof
								// recomputing ratings
								var filter = {fuName: b.fuName};
								db.updateOne(Faculty, filter, { 	
									$mul:{
										oaRating: numTotalReviews + 1
									}					
								});
								db.updateOne(Faculty, filter, { 	
									$inc:{
										oaRating: 0-revStar
									}						
								});
								db.updateOne(Faculty, filter, { 	
									$mul:{
										oaRating: 1/(numTotalReviews)
									}					
								});
							}

						}
						else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews left for the specific subject
							
							var filter = {fuName: b.fuName, 'subjects.subject': revCourse};
							console.log(filter);
							db.updateOne(Faculty, filter, { 	
								$mul:{
									oaRating: numTotalReviews + 1,
									'subjects.$.rating': numSubjectReviews + 1
								}					
							});
							db.updateOne(Faculty, filter, { 	
								$inc:{
									oaRating: 0-revStar,
									'subjects.$.rating': 0-revStar
								}						
							});
							db.updateOne(Faculty, filter, { 	
								$mul:{
									oaRating: 1/(numTotalReviews),
									'subjects.$.rating': 1/(numSubjectReviews)
								}					
							});
							
						}

						var u = b.fuName;

						var review = req.body.review;
						var course = req.body.course;
						var stars = req.body.stars;
						
						// checking if the prof already have the subject on his/her record
						var query10 = {$and: [{fuName: u}, {'subjects.subject': course}]};
						db.findOne(Faculty, query10, null, function(x) {

							if(x != null){ // >>>>>>>>>>>>>>>>>>>> if the prof has the subject already
								
								var query20 = {reviewee_u: u};
								db.findMany(Review, query20, null, null, 0, function(allRevs) {

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

												res.redirect('../user/' + loggedUser.uuName);
											});
										});

										

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

												res.redirect('../user/' + loggedUser.uuName);
											});
										});

									});

								});
							}
						});

					});

				});

				

			});
		});

		db.deleteOne(Review, conditions, function(x){

		});
	}

}

module.exports = userController;
