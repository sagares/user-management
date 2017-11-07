/**
 * Created by Santosh Sagare on 04/01/17.
 */
var userService = require('../userHandler');

var userRoutes = {
    getUsers: function (req, res, next) {
        res.render('users', {
            title: 'User Management',
            page: 'Users List',
            users: userService.getUsers()
        });
    },
    addUser: function (req, res, next) {
        if (req.body.firstName != '' || req.body.lastName != '' || req.body.email != '') {
            userService.addUser(req.body);
            res.redirect('/users/list');
        } else {
            //console.log('One of the values is null');
            res.redirect('/users');
        }
    },
    editUser: function (req, res, next) {
        res.render('update', {
            title: 'User Management',
            page: 'Users List',
            user: userService.getUser(req.query.email)
        });
    },
    deleteUser: function (req, res, next) {
        try {
            userService.deleteUser(req.body.id);
            res.send('200');
        } catch (e) {
            //console.log("Error: " + e);
            res.send('500');
        }
    },
    updateUser: function (req, res, next) {
        var user = {'firstName': req.body.firstName, 'lastName': req.body.lastName, 'email': req.body.email}
        userService.updateUser(user);
        res.redirect('/users/list');
    }
}

module.exports = userRoutes;
