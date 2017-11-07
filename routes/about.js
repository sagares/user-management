var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('about', {title: 'User Management', operations: ['insert', 'view', 'update', 'delete']});
});

module.exports = router;
