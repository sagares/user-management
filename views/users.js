var express = require('express');
var userService = require('./userHandler');
var userRoutes  = require('./users/userRoutes');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'User Management', page: 'Home'});
});

/* ADD new user*/
router.post('/add', userRoutes.addUser);

/* GET users listing. */
router.get('/list', userRoutes.getUsers);

/*GET user by index*/
router.get('/edit', userRoutes.editUser);

/*Delete an existing user */
router.delete('/delete', userRoutes.deleteUser);

/*Edit an existing user*/
router.post('/update', userRoutes.updateUser);

module.exports = router;
