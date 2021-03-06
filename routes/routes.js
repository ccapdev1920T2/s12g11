const express = require('express');
const app = express();

const controller = require('../controllers/controller.js');
const facultyController = require('../controllers/facultyController.js');
const userController = require('../controllers/userController.js');
const viewController = require('../controllers/viewController.js');
const loginController = require('../controllers/loginController.js');
const homeController = require('../controllers/homeController.js');
const signupController = require('../controllers/signupController.js');
const logoutController = require('../controllers/logoutController.js');
const resultsController = require('../controllers/resultsController.js');
const validation = require('../helpers/validation.js');

app.get('/', loginController.getLogin);

app.post('/', loginController.postLogin);

app.get('/login', loginController.getLogin);

app.post('/login', loginController.postLogin);


app.get('/signup', signupController.getSignUp);

app.post('/signup', validation.signupValidation(), signupController.postSignUp);

app.get('/checkID', signupController.checkID);

app.get('/checkUsername', signupController.checkUsername);



app.get('/logout', logoutController.getLogout);

app.get('/result', resultsController.getResults);

app.get('/home', homeController.getHome);



app.get('/user/:uuName', userController.getUser);

app.get('/user/', userController.getLoggedUser);

app.get('/authorityCheck', userController.checkAuthority);

app.get('/editReview', userController.editReview);

app.get('/deleteReview', userController.deleteReview);



app.get('/view', viewController.getFaculties);


app.get('/faculty/:fuName', facultyController.getFaculty);

app.get('/reviewCheck', facultyController.checkReview);

app.get('/reviewPost', facultyController.postReview);

module.exports = app;
