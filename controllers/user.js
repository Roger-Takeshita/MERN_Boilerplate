const User = require('../models/user');
const { createJWT } = require('../middlewares/auth');
const { isEmail } = require('validator');

const signupUser = async (req, res) => {
    try {
        if (
            !req.body.firstName ||
            !req.body.lastName ||
            !isEmail(req.body.email) ||
            req.body.password.length < 7
        )
            return res.status(400).json({ message: 'Invalid credentials' });
        const user = new User(req.body);
        await user.save();
        const token = await createJWT(user);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.user._id });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const updateUser = async (req, res) => {
    const bodyFields = Object.keys(req.body);
    const allowedFields = ['firstName', 'lastName', 'email', 'password'];
    const isValidOperation = bodyFields.every((field) => allowedFields.includes(field));

    if (!isValidOperation) return res.status(400).json({ message: 'Invalid Updates!' });
    try {
        //! the findIdAndUpdate method bypasses moongose
        //! It performs a direct operation on the database
        //+ this means that our middleware won't be executed
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).json({ message: 'User not found' });
        bodyFields.forEach((field) => (user[field] = req.body[field]));
        res.send(await user.save());
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User doesn't exist" });
        user.comparePassword(req.body.password, async (error, isMatch) => {
            if (!isMatch || error) return res.status(400).json({ message: 'Unable to login' });
            const token = await createJWT(user);
            res.json({ user, token });
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const userProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = {
    signupUser,
    deleteUser,
    updateUser,
    loginUser,
    userProfile
};
