const db = require('../models/db.js');

const Faculty = require('../models/facultyModel.js');
const Review = require('../models/reviewModel.js');
const Instance = require('../models/instanceModel.js');

const homeController = {

    getHome: function (req, res) {
        
        db.findMany(Instance, null, {_id:-1}, null, 1, function(i){

			if(i[0] != null){
                db.findMany(Faculty, null, {oaRating:-1}, {fuName:1, name:1, dpPath:1}, 3, function(x){
                    
                    db.findMany(Review, null, {_id:-1}, null, 4, function(y){
                        
                        res.render('home', {
                            thisHome: "this",
                            
                            revEntries:y,

                            topImagePath:x[0].dpPath,
                            
                            topProfs: x
                        });
                        
                    });
                    
                });
            }
            else{
                console.log('You are not logged in');
				res.render('error', {extra: '<br>Please try logging in.'});
            }

        });

    }
}

module.exports = homeController;
