const { Expert } = require('../models');
const createError = require('http-errors');
const toHttpValidationError = require('./validation-error-to-http-error');
/**
 * Apply Project API routes
 *
 * @param {any} router
 */
function applyExpertsRoutes(router) {
    router.get('/api/experts', async (req, res, next) => {
        try {
            let where = {};
            try {
                where = JSON.parse(req.query.where || '{}');
            } catch (e) {
                // ignored
            }
            for (let key in where) {
                // remove root level $ operators
                if (/^$/.test(key)) delete where[key];
            }
            let expertQuery = Expert.find(where)
                .skip(parseInt(req.query.skip, 10) || 0)
                .limit(parseInt(req.query.limit, 10) || 100);

            // For Remote auto complete search
            if (req.query.q)
                expertQuery.where('name').regex(new RegExp(req.query.q, 'i'));

            let result = await expertQuery.exec();
            res.send(result);
        } catch (e) {
            next(e);
        }
    });
    router.get('/api/experts/:expertId', async (req, res, next) => {
        try {
            let result = await Expert.findById(req.params.expertId).exec();
            res.send(result);
        } catch (e) {
            next(e);
        }
    });
}
module.exports = applyExpertsRoutes;
