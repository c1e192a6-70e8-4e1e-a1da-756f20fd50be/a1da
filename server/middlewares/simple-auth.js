const mongoose = require('mongoose');
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
    return next();
}
