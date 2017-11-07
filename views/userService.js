var UserService = {
    userMap: new Map(),
    addUser: function (user) {
        /*Adding User"*/
        this.userMap.set(user.email, user);
    },
    getUsers: function () {
        /*Returning users*/
        return this.userMap;
    },
    getUser: function (emailId) {
        /*Get user by index*/
        return this.userMap.get(emailId);
    },
    updateUser: function (user) {
        /* updating the user */
        if (this.userMap.has(user.email)) {
            /*this.userMap.get(user.email).firstName = user.firstName;
             this.userMap.get(user.email).lastName = user.lastName;*/
            console.log(user);
            this.userMap.set(user.email, user);
        }
        console.log(this.userMap);
    },
    deleteUser: function (emailId) {
        /* deleting user by id */
        if (emailId != '') {
            console.log('deleting ' + emailId);
            this.userMap.delete(emailId);
            console.log(this.userMap);
        }
    }
}

module.exports = UserService;
