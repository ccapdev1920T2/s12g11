# s12g11

## Contents:

Each folder and file in this repository is properly documented. You may read the `README.md` file of each folder to understand its content. You may also read the inline comments of each file explaining the statements line-per-line.

- [controllers] (https://github.com/ccapdev1920T2/s12g11/tree/master/controllers) - This folder contains files which defines callback functions for client requests.
- [models] (https://github.com/ccapdev1920T2/s12g11/tree/master/models) - This folder contains files for database modeling and access.
- [public](https://github.com/ccapdev1920T2/s12g11/tree/master/public) - This folder contains static assets such as css, js, and image files.
- [routes](https://github.com/ccapdev1920T2/s12g11/tree/master/routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [views](https://github.com/ccapdev1920T2/s12g11/tree/master/views) - This folder contains all hbs files to be rendered when requested from the server.
- [index.js](https://github.com/ccapdev1920T2/s12g11/blob/master/index.js) - The main entry point of the web application.

## Follow the steps below to set-up and study this repository:
1. Clone the repository either by downloading the contents of the repository [here](https://github.com/ccapdev1920T2/s12g11), or using the command below (Note: git should be installed in your system for this to work).
```
git clone https://github.com/ccapdev1920T2/s12g11
```
2. Open Command Prompt
3. Navigate to the project folder - the folder containing the contents of the cloned or downloaded repository.
4. Run the command `npm install` to initialize and install all necessary modules used in the project.
5. Run the command `node add_data.js` in order to add the dummy data into the database.

6. We may now run our server. To do this, we run the command `node index.js`. Upon running the command, your Command Prompt should display the following statement:
```
app listening at port 3000
Connected to: mongodb://localhost:27017/profsToPickDB
```

6. Let's test our web application. Go to the link below to access the web application:
```
http://localhost:3000/
```

7. Go to the sign-up page by pressing the button. Enter sample user details.


8. Review the file [`views/signup.hbs`](https://github.com/ccapdev1920T2/s12g11/blob/master/views/signup.hbs), focus on the `<form>` element, and take note of its elements and their attributes. Shown below is the `<form>` as excerpted from the file:

```
<form method="post" autocomplete="off">
	<fieldset>
		<legend align="center">Create your account</legend>
				
		<input type="email" 	name="email" 	id="email" 	placeholder="email"		required>
		<input type="text" 		name="name" 	id="name" 	placeholder="name"		required>
		<input type="text" 		name="uuName" 	id="uuName" placeholder="username"	required>
		<input type="text" 		name="course" 	id="course" placeholder="course"	required>
		<input type="text" 		name="id" 		id="id" 	placeholder="ID number"	required>
		<input type="password" 	name="pass" 	id="pass" 	placeholder="password"	required>
				
	</fieldset>
	<input type="submit" id="submit" class="button" value="Sign-up">
</form>
```

Upon clicking the submit button, the client sends an HTTP POST request to the server. We set this by setting the attribute `method` of the element `form` to `post`. Using HTTP POST method, the client will send the values, identified through their corresponding value for the `name` attribute, entered by the user through the body of the request.

Check the file [`routes/routes.js`](https://github.com/ccapdev1920T2/s12g11/blob/master/routes/routes.js). Shown below is a line as excerpted from the file:

```
app.post('/signup', signupController.postSignUp);
```

When the server receives an HTTP POST request for the path `/signup`, it executes the function `postSignUp()`. Check the file [`controllers/signUpController.js`](https://github.com/ccapdev1920T2/s12g11/blob/master/controllers/signupController.js) and focus on the function `postSignUp()`. Shown below is the function as excerpted from the file:

```
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
```

9. Upon signing up, click the button below and head to the login page, and enter the username and password you used to sign up with. Upon pressing the login button, the function findOne() will then be used  in order to determine if the user exists. If the user exists, the user will be redirected to their profile [`views/profile.hbs`].
```
		db.findOne(User, query1, null, function(x) {
            
            if(x != null){
                db.insertOne(Instance,{
                    uuName: u
                });
                console.log(u + ' Successfully Logged In');

                res.redirect('/user/');
            }
            else{
                res.render('login');
            }
			
        });
```

10. Head to the homepage [`views/home.hbs`] by pressing the 'Home' button found in the navigation bar, wherein the most recent reviews and top rated professors are displayed.

11. Head to the view page by pressing the 'View All Profs' [`views/view.hbs`] button found in the navigation bar, wherein all the professors in the database are displayed.

12. Upon pressing a button in the view page with the name of a certain professor, the user will be redirected to the professors profile [`views/faculty.hbs`]. The function findOne() is used in order to find the data of the professor, such as name, e-mail, and college, and the function findMany() is used in order to find the reviews that matches the professor.

```
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
```

13. Write a review by typing in the text box found in the profile of the faculty member you wish to review. Upon pressing the submit button, the review of the user along with the rating is added by insertOne(), and the rating of the professor is updated by updateOne().
```
db.insertOne(Review, {
	reviewee_u: u,

	imagePath: loggedUser.dpPath,

	reviewer: loggedUser.uuName,
	reviewee: x.name,
	revCourse: course,
	revStar: stars,
	revDet: review
});


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
```

14. Type a keyword in the search bar found in the navigation bar. Upon pressing the button, the user is redirected to ['views/result.hbs'], wherein the professors matching the query of the user are  found using findMany() and displayed.
```
           db.findMany(Faculty, query, {fuName:-1}, {fuName:1, name:1}, 0, function(result) {
               res.render('result', {
                   thisSearch: "this",
                      
                    searchKey: key,
            
                    results: result
            
                });
               console.log('searched!');
           });
```


15. Press the logout button found in the navigation bar in order to logout of your account. YOu will be redirected to [`views/logout.hbs`] upon pressing the button.

16. Read the rest of the documentation in the `README.md` files in each folder.
