const express = require('express');
const app = express();
const hbs = require('hbs');
const port = 3000;

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

app.listen(port, function () {
    console.log('app listening at port ' + port);
});
