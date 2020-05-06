const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/user');

class NewUser {
    constructor(firstName, lastName, email, password) {
        this._id = mongoose.Types.ObjectId();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    }
}

const userOne = new NewUser('Roger', 'T', 'roger@gmail.com', 'bananinha');
const userTwo = new NewUser('Thaisa', 'S', 'thaisa@gmail.com', 'bananinha');
const userThree = new NewUser('Yumi', 'S', 'yumi@gmail.com', 'bananinha');
const userFour = new NewUser('Mike', 'T', 'mike@gmail.com', 'bananinha');

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(userThree).save();
    await new User(userFour).save();
};

module.exports = {
    userOne,
    userTwo,
    userThree,
    userFour,
    setupDatabase
};
