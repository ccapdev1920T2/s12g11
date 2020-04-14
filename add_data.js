const mongoose = require('mongoose');
const profsToPickDB = require("./models/db.js");

const Faculty = require('./models/facultyModel.js');
const User = require('./models/userModel.js');
const Review = require('./models/reviewModel.js');

profsToPickDB.connect();

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> faculties START */
var faculty = {
	fuName: "prof0",
	
	dpPath: "antioquia.png",

	name: "Arren Matthew C. Antioquia",
	email: "arren.antioquia@dlsu.edu.ph",
	college: "College of Computer Studies",
	department: "Software Technology",
	oaRating: 5.0,
	
	subjects:[
		{subject:"CCAPDEV", rating: 5.0}
	],
}
profsToPickDB.insertOne(Faculty, faculty);

var faculty = {
	fuName: "prof1",
	
	dpPath: "prof1.jpg",

	name: "John Commons",
	email: "john.commons@dlsu.edu.ph",
	college: "College of Computer Studies",
	department: "Computer Technology",
	oaRating: 4.0,
	
	subjects:[
		{subject:"CCDSALG", rating: 4.0}
	],
}
profsToPickDB.insertOne(Faculty, faculty);

var faculty = {
	fuName: "prof2",
	
	dpPath: "prof2.jpg",

	name: "Anna Commons",
	email: "anna.commons@dlsu.edu.ph",
	college: "College of Business",
	department: "Commercial Law",
	oaRating: 4.0,
	
	subjects:[
		{subject:"BUSLAW", rating: 4.0}
	],
}
profsToPickDB.insertOne(Faculty, faculty);

var faculty = {
	fuName: "bethlin",
	
	dpPath: "bethlin.jpg",

	name: "Beth Lin",
	email: "beth.lin@dlsu.edu.ph",
	college: "College of Science",
	department: "Chemistry Department",
	oaRating: 4.0,
	
	subjects:[
		{subject:"BASMATH", rating: 4.0}
	],
}
profsToPickDB.insertOne(Faculty, faculty);

var faculty = {
	fuName: "mactal",
	
	dpPath: "president.jpg",

	name: "Ronaldo Mactal",
	email: "ronaldo.mactal@dlsu.edu.ph",
	college: "College of Liberal Arts",
	department: "History Department",
	oaRating: 1.0,
	
	subjects:[
		{subject:"GERPHIS", rating: 1.0}
	],
}
profsToPickDB.insertOne(Faculty, faculty);
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> faculties END */


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> users START */
var user = {
	uuName: "Jeddy the gouf",
	password: "asd",
	
	dpPath: "dp.jpg",
	
	name: "Jedwig Siegfrid Tan",
	id: "11828102",
	email: "jedwig_siegfrid_tan@dlsu.edu.ph",
	course: "BS Computer Science",
}
profsToPickDB.insertOne(User, user);

var user = {
	uuName: "Ygg",
	password: "asd",
	
	dpPath: "default.jpg",
	
	name: "Salvador Tan",
	id: "118",
	email: "salvador_tan@dlsu.edu.ph",
	course: "BS Computer Science",
}
profsToPickDB.insertOne(User, user);
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> users END */


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> reviews START */
var review = {
	reviewee_u:"prof0",
	
	imagePath:"dp.jpg",
	reviewer:"Jeddy the gouf",
	reviewee:"Arren Matthew C. Antioquia",
	revCourse:"CCAPDEV",
	revStar:5.0,
	revDet:"Learned a lot from this prof, gave me a 4.0 for all my hardwork. Get this prof at all costs"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"prof1",
	
	imagePath:"dp.jpg",
	reviewer:"Jeddy the gouf",
	reviewee:"John Commons",
	revCourse:"CCDSALG",
	revStar:5.0,
	revDet:"Perfect Teacher! Ez lang requirements kaya di mo na kailangan magDSAL sa end of term"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"prof2",
	
	imagePath:"dp.jpg",
	reviewer:"Jeddy the gouf",
	reviewee:"Anna Commons",
	revCourse:"BUSLAW",
	revStar:5.0,
	revDet:"I CANT BELIV I PASSED THIS SUBJECT!!! LUV U MISS!!!"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"bethlin",
	
	imagePath:"dp.jpg",
	reviewer:"Jeddy the gouf",
	reviewee:"Beth Lin",
	revCourse:"BASMATH",
	revStar:4.5,
	revDet:"Very lola like, vv caring but at the same time kung matalino class mo GG kasi sasabihin niya 'kaya niyo na yan' sa gitna ng lecture but very fair and understanding na prof. The effort you make = the grade you get."
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"mactal",
	
	imagePath:"dp.jpg",
	reviewer:"Jeddy the gouf",
	reviewee:"Ronaldo Mactal",
	revCourse:"GERPHIS",
	revStar:0.5,
	revDet:"He knows his stuff but teaches everything but the subject itself. also very hassle and belittles students. also gave me a death threat"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"prof0",
	
	imagePath:"default.jpg",
	reviewer:"Ygg",
	reviewee:"Arren Matthew C. Antioquia",
	revCourse:"CCAPDEV",
	revStar:5.0,
	revDet:"Very calming teaching style, you'll learn a lot!!"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"prof1",
	
	imagePath:"default.jpg",
	reviewer:"Ygg",
	reviewee:"John Commons",
	revCourse:"CCDSALG",
	revStar:3.0,
	revDet:"Very good and considerate teacher pero medyo mahirap nga lang yung mga exams huhu"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"prof2",
	
	imagePath:"default.jpg",
	reviewer:"Ygg",
	reviewee:"Anna Commons",
	revCourse:"BUSLAW",
	revStar:3.0,
	revDet:"Gives really high grades and is very approachable too!!"
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"bethlin",
	
	imagePath:"default.jpg",
	reviewer:"Ygg",
	reviewee:"Beth Lin",
	revCourse:"BASMATH",
	revStar:3.5,
	revDet:"Her teaching style is not for everyone. Medyo mahirap magets yung topics kapag siya yung nagtuturo pero if you search it up on Youtube magegets mo agad. Grades fairly naman and requirements are not too hard."
}
profsToPickDB.insertOne(Review, review);

var review = {
	reviewee_u:"mactal",
	
	imagePath:"default.jpg",
	reviewer:"Ygg",
	reviewee:"Ronaldo Mactal",
	revCourse:"GERPHIS",
	revStar:1.5,
	revDet:"Talks nonstop about the Philippine government, hindi ko na alam kung ano talaga yung topic namin lol. On the other hand, madadali lang naman yung mga binibigay na requirements."
}
profsToPickDB.insertOne(Review, review);
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> reviews END */