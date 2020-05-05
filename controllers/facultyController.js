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

                        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>View Faculty: ' + x.name);
					}
					else{
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Faculty not found');
						res.render('error');
					}
					
				});
			}
			else{
				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>You are not logged in');
				res.render('error', {extra: '<br>Please try logging in.'});
			}

		});
		
	},

	postReview: function (req, res) {
		var u = req.query.fuName;

		var review = req.query.review;
		var course = req.query.course;
		var stars = parseFloat(req.query.stars, 10);

		// checking if the prof already have the subject on his/her record
		var query1 = {$and: [{fuName: u}, {'subjects.subject': course}]};
		db.findOne(Faculty, query1, null, function(x) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Step1: checking if the prof already have the subject on his/her record');
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Result1:');
            console.log(x);

            if(x != null){ // >>>>>>>>>>>>>>>>>>>> if the prof has the subject already
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>the prof has the subject already');
                
				var query2 = {reviewee_u: u};
				db.findMany(Review, query2, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Total no of Reviews: ' + numTotalReviews);
					
					var query3 = {$and: [{reviewee_u: u}, {revCourse: course}]};
					db.findMany(Review, query3, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;// number of reviews for the prof about the specific subject
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>No of subject Reviews: ' + numSubjectReviews);

						var subjRating;
						var i;
						for(i=0; i<x.subjects.length; i++){
							if(x.subjects[i].subject == course){
								subjRating = parseFloat(x.subjects[i].rating, 10);
							}
						}
						var oaRating = x.oaRating;
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original oaRating: ✯' + oaRating);
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original ' + course + ' Rating: ✯' + subjRating);
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Stars: ' + stars);

						// computing for average
						var resOaRating = ((oaRating*numTotalReviews)+stars)/(numTotalReviews+1);
						var resSubjRating = ((subjRating*numSubjectReviews)+stars)/(numSubjectReviews+1);
						var filter = {fuName: x.fuName, 'subjects.subject': course};
						db.updateOne(Faculty, filter, { 	
							$set:{
								oaRating: resOaRating,
								'subjects.$.rating': resSubjRating
							}					
						});
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numtotalReviews): ' + (oaRating*numTotalReviews));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numTotalReviews)+stars: ' + ((oaRating*numTotalReviews)+stars));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numTotalReviews+1): ' + (numTotalReviews+1));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting oaRating: ✯' + resOaRating);
						
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(subjRating*numSubjectReviews): ' + (subjRating*numSubjectReviews));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(subjRating*numSubjectReviews)+stars: ' + ((subjRating*numSubjectReviews)+stars));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numSubjectReviews+1): ' + (numSubjectReviews+1));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting ' + course + ' Rating: ✯' + resSubjRating);

						// finding the logged user
						db.findOne(Instance, null, null, function(logged) {
							db.findOne(User, {uuName:logged.uuName}, null, function(loggedUser) {
								// adding the review
								db.insertOne(Review, {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:x.name, revCourse:course, revStar:stars, revDet:review}, function(flag) {

									res.render('partials/revEntryCreated', {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:x.name, revCourse:course, revStar:stars, revDet:review, isNew:false, resOaRating:resOaRating, resSubjRating:resSubjRating}, function (err, html){
										res.send(html);
									});

								});
							});
						});

					});

				});
				
			}
			else{ // >>>>>>>>>>>>>>>>>>>> if the prof does not have the subject yet
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>the prof does not have the subject yet');

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
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Total no of Reviews: ' + numTotalReviews);

						var oaRating = prof.oaRating;
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original oaRating: ✯' + oaRating);
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Stars: ' + stars);

						// computing for average
						var resOaRating = ((oaRating*numTotalReviews)+stars)/(numTotalReviews+1);
						var filter = {fuName: prof.fuName, 'subjects.subject': course};
						db.updateOne(Faculty, filter, { 	
							$set:{
								oaRating: resOaRating
							}					
						});
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numtotalReviews): ' + (oaRating*numTotalReviews));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numTotalReviews)+stars: ' + ((oaRating*numTotalReviews)+stars));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numTotalReviews+1): ' + (numTotalReviews+1));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting oaRating: ✯' + resOaRating);

						// finding the logged user
						db.findOne(Instance, null, null, function(logged) {
							db.findOne(User, {uuName:logged.uuName}, null, function(loggedUser) {
								// adding the review
								db.insertOne(Review, {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:prof.name, revCourse:course, revStar:stars, revDet:review}, function(flag) {
									res.render('partials/revEntryCreated', {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:prof.name, revCourse:course, revStar:stars, revDet:review, isNew:true, resOaRating:resOaRating, resSubjRating:stars}, function(err, html) {
										res.send(html);
									});

								});
							});
						});

					});

				});
			}
            
		});
	},

	checkReview: function (req, res) {
		var course = req.query.course;

		db.findMany(Instance, null, {_id:-1}, null, 1, function(i){
			var uuName = i[0].uuName;

			db.findOne(Review, {reviewer: uuName, revCourse: course}, null, function (result) { 
				res.send(result);
			});
		});
	}
}


module.exports = facultyController;
