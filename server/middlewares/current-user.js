const mongoose = require('mongoose');
/**
 *  Simple auth current user
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function simpleAuth(req, res, next) {
    if (req.session && req.session.userId) {
        try {
            req.currentUser = await mongoose
                .model('User')
                .findById(req.session.userId)
                .exec();
        } catch (error) {
            req.session.userId = '';
            console.error(error);
        }
    }
    next();
}
module.exports = simpleAuth;
