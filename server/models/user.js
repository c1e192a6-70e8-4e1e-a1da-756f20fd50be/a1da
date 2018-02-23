const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const uniqueValidator = require('mongoose-unique-validator');
const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [
            {
                validator: isEmail,
                msg: 'must be valid email',
            },
        ],
    },
    password: {
        type: String,
        required: true,
    },
});

User.method('checkPassword', checkPassword);
User.pre('save', hashPasswordHook);
User.plugin(uniqueValidator);
/**
 * Hash password hook for User before save.
 * @param {Function} next
 */
function hashPasswordHook(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
}
/**
 * checkPassword
 * @param {String} password
 * @returns {Promise} Resolves to check password state
 */
async function checkPassword(password) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return reject(err);
            return resolve(isMatch);
        });
    });
}
module.exports = mongoose.model('User', User);
