var express = require('express');
var path = require('path');

var userList = [];

var index = require('./routes/index');
var about = require('./routes/about');
var users = require('./routes/users');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies


app.listen(3030, function () {
    console.log("User App listening on port 3030");
})

app.use('/', index);
app.use('/about', about);
app.use('/users', users);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');