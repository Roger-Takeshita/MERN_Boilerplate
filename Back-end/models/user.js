const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: async (value) => {
                if (!(await validator.isEmail(value))) {
                    throw new Error('Email is invalid');
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            }
        }
    },
    {
        timestamps: true
    }
);

//! Just before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    next();
});

//! Create a custom mongoose method
userSchema.methods.comparePassword = function (tryPassword, callback) {
    bcrypt.compare(tryPassword, this.password, callback);
};

//! Remove fields before sending back
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);
