const express = require('express');
const mongoose = require('mongoose');
const app = express();
const hbs = require('hbs');
const port = 3000;

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials/');

const routes = require('./routes/routes.js');

const db = require('./models/db.js');

app.use(express.urlencoded({extended: true}));

app.use('/', routes);

app.use(function (req, res) {
    res.render('error');
});

db.connect();

mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas!');
});

app.listen(PORT, function () {
    console.log('app listening at port ' + PORT);
});
