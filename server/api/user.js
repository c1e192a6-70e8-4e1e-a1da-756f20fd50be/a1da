const { User } = require('../models');
const createError = require('http-errors');
const toHttpValidationError = require('./validation-error-to-http-error');

const initDummyProjects = require('../initial-data-generator/project');
/**
 * Apply USER API routes
 *
 * @param {any} router
 */
function applyUserRoutes(router) {
    // User Auth Check
    router.get('/api/users/me', (req, res, next) => {
        if (req.currentUser)
            return res.send({
                success: true,
                user: {
                    id: req.currentUser.id,
                    email: req.currentUser.email,
                },
            });
        return res.send({
            success: false,
        });
        res.send(req.currentUser);
    });

    // User Login Path handler
    router.post('/api/users/login', async (req, res, next) => {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        // Response Not found for all incorrect input
        if (!user || !email || !password) return next(createError.NotFound());

        const checkpasswordResult = await user.checkPassword(password);

        if (checkpasswordResult) {
            // Login User
            req.session.userId = user.id;

            return res.send({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } else {
            return res.send({
                success: false,
            });
        }
    });

    // User Signup Path handler
    router.post('/api/users', async (req, res, next) => {
        try {
            if (req.currentUser)
                return res.send({
                    success: true,
                    user: {
                        id: req.currentUser.id,
                        email: req.currentUser.email,
                    },
                });

            let { email, password } = req.body;
            let user = new User({ email, password });
            let validationErrors = await new Promise(resolve =>
                user.validate(error => {
                    resolve(error);
                })
            );

            if (validationErrors) {
                return next(toHttpValidationError(validationErrors));
            } else {
                await user.save();
            }

            // create dummy project for new registered user
            await initDummyProjects(user.id);

            // Login User
            req.session.userId = user.id;

            // response created user instance
            return res.send({
                id: user.id,
                email: user.email,
            });
        } catch (e) {
            next(e);
        }
    });

    router.get('/api/users/checkEmail', async (req, res, next) => {
        const { email } = req.query;
        const count = await User.count({ email }).exec();
        if (count) return res.send({ available: false });
        return res.send({ available: true });
    });

    router.get('/api/users/logout', (req, res, next) => {
        req.session.destroy();
        res.send({ success: true });
    });
}
module.exports = applyUserRoutes;
