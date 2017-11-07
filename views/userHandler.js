var UserHandler = {
    userList: [],
    addUser: function (user) {
        /*Adding User"*/
        this.userList[user.email] = user;
    },
    getUsers: function () {
        /*Returning users*/
        return this.userList;
    },
    getUser: function (emailId) {
        /*Get user by index*/
        return this.userList[emailId];
    },
    updateUser: function (user) {
        /* updating the user */
        this.userList[user.email] = user;
    },
    deleteUser: function (emailId) {
        /* deleting user by id */
        if (this.userList[emailId] !== undefined) {
            delete this.userList[emailId];
        }else{
            throw new Error('Email Id not found!');
        }
    }
}

module.exports = UserHandler;