var assert = require('chai').assert;
var userHandler = require('../routes/userHandler');
var userRoutes = require('../routes/users/userRoutes');
var sinon = require('sinon'), EventEmitter = require('events').EventEmitter;
describe('UserHandler', function () {

    describe('#addUser', function () {

        it('it should add an user to the User list', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            assert.equal(userHandler.getUser(user.email), user);
        });

    });

    describe('#getUsers', function () {

        it('it should return all the users on list', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            var users = userHandler.getUsers();

            assert.equal(1, Object.keys(users).length);
        });

    });

    describe('#getUser', function () {

        it('should return one user with the given email id', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            assert.deepEqual(userHandler.getUser(user.email), user);
        });

        it('should fail to return one user with the given email id', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            assert.deepEqual(userHandler.getUser('santoshsgr@gmail.com'), undefined);
        });

    });

    describe('#updateUser', function(){

        it('should update an exisisting user', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            var updatedUser = {
                firstName: 'Santosh L',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.updateUser(updatedUser);
            assert.deepEqual(userHandler.getUser(user.email), updatedUser);
        });

    });

    describe('#deleteUser', function () {

        it('should delete the user from list', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            userHandler.deleteUser(user.email);
            var users = userHandler.getUsers();
            assert.equal(users[user.email], undefined, 'Msg');
        });

        it('Throws error on delete fail.', function () {
            var user = {
                firstName: 'Santosh',
                lastName: 'Sagare',
                email: 'santosh@gmail.com'
            }
            userHandler.addUser(user);
            var emailId = 'santoshsgr@gmail.com';

            assert.throws( () => userHandler.deleteUser(emailId), /Email Id not found!/, 'Did not match expected value.');
        });

    });

});

/* tests for routing */
describe('Routes', function(){
    describe('ADD users', function(){
        it('should respond with One of the values is null', function(done){
            var req, res, spy;
            req = {
                body : {
                    firstName : '',
                    lastName : '',
                    email : ''
                }
            }
            res = {};
            spy = res.redirect = sinon.spy();
            userRoutes.addUser(req, res, null);
            assert.equal(spy.calledOnce, true);

            done();
        });
    });
    describe('GET users', function(){
        it('should respond', function(done){
            var req, res, spy;
            req = res = {};
            spy = res.render = sinon.spy();
            userRoutes.getUsers(req, res, null);
            assert.equal(spy.calledOnce, true);
            done();
        });
    });
    describe('DELETE user - spy', function(){
        it('should respond', function(done){
            var req, res, spy;
            res = {};
            req = {
                body : {
                    id : 'santosh@gmail.com'
                }
            }
            spy = res.send = sinon.spy();
            userRoutes.deleteUser(req, res, null);
            assert.equal(spy.calledOnce, true);
            done();
        });
    });

    describe('ADD user', function () {
        it('should call addUser handler and redirect to /users/list', function (done) {
            var req, res;
            req = {
                body : {
                    firstName : 'Santosh',
                    lastName : 'Sagare',
                    email : 'santosh@gmail.com'
                }
            };
            res = {
                url : null,
                redirect : function (url) {
                    this.url = url;
                }
            };
            var stub = sinon.stub(userHandler, "addUser");
            userRoutes.addUser(req, res, null);
            stub.restore();
            sinon.assert.calledWith(stub, req.body);
            assert.equal(res.url, '/users/list');
            done();
        });

        it('should not call addUser handler and stay on same page', function (done) {
            var req, res;
            req = {
                body : {
                    firstName : '',
                    lastName : '',
                    email : ''
                }
            };
            res = {
                url : null,
                redirect : function (url) {
                    this.url = url;
                }
            };
            var stub = sinon.stub(userHandler, "addUser");
            userRoutes.addUser(req, res, null);
            stub.restore();
            assert.equal(stub.calledWith(req.body), false);
            assert.equal(res.url, '/users');
            done();
        });
    });

    describe('GET users', function () {
        it('should call getUsers handler and render users page', function (done) {
            var req, res;
            req = {};
            res = {
                name : null,
                users : null,
                render : function (a, b) {
                    this.name = a;
                    this.users = b.users;
                }
            };
            var temp = {
                "santosh@gmail.com": {
                    "email": "santosh@gmail.com",
                    "firstName": "Santosh",
                    "lastName": "Sagare",
                }
            };
            var stub = sinon.stub(userHandler, "getUsers", function(){
                return temp;
            });
            userRoutes.getUsers(req,res,null);
            stub.restore();
            assert.equal(stub.calledWith(), true);
            assert.equal(res.name, 'users');
            assert.deepEqual(res.users, temp);
            done();
        });
    });

    describe('EDIT user', function () {
        it('should call getUser handler and render update page', function (done) {
            var req, res;
            req = {
                query: {
                    email: 'santosh@gmail.com'
                }
            };
            res = {
                name : null,
                render : function (a, b) {
                    this.name = a;
                }
            };
            var stub = sinon.stub(userHandler, "getUser");
            userRoutes.editUser(req, res, null);
            stub.restore();
            assert.equal(stub.calledWith(req.query.email), true);
            assert.equal(res.name, 'update');
            done();
        })
    });

    describe('DELETE user', function () {
        it('should call deleteUser handler and return status 200', function (done) {
            var req, res;
            req = {
                body: {
                    id: 'santosh@gmail.com'
                }
            }
            res = {
                status : null,
                send: function (status) {
                    this.status = status;
                }
            };
            var stub = sinon.stub(userHandler, "deleteUser");
            userRoutes.deleteUser(req, res, null);
            stub.restore();
            assert.equal(stub.calledWith(req.body.id), true);
            assert.equal(res.status, '200');
            done();
        });

        it('should return status 500', function (done) {
            var req, res;
            req = {
                body: {
                    id: undefined
                }
            }
            res = {
                status : null,
                send: function (status) {
                    this.status = status;
                }
            };
            var stub = sinon.stub(userHandler, "deleteUser", function(){
                throw new Error('ID not found');
            });
            userRoutes.deleteUser(req, res, null);
            stub.restore();
            assert.equal(stub.calledWith(req.body.id), true);
            assert.equal(res.status, '500');
            done();
        });
    });

    describe('UPDATE user', function () {
        it('should call updateUser handler and redirect to /users/list', function (done) {
            var req, res;
            req = {
                body: {
                    firstName: 'Santosh',
                    lastName: 'Sagare',
                    email: 'santosh@gmail.com'
                }
            };
            res = {
                url: null,
                redirect: function (url) {
                    this.url = url;
                }
            };
            var stub = sinon.stub(userHandler, "updateUser");
            userRoutes.updateUser(req, res, null);
            stub.restore();
            assert.equal(stub.calledWith(req.body), true);
            assert.equal(res.url, '/users/list');
            done();
        });
    });
});
