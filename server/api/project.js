const { Project } = require('../models');
const createError = require('http-errors');
const toHttpValidationError = require('./validation-error-to-http-error');
/**
 * Apply Project API routes
 *
 * @param {any} router
 */
function applyProjectRoutes(router) {
    router.get('/api/projects', async (req, res, next) => {
        if (!req.currentUser) return next();
        try {
            let where = {};

            try {
                where = JSON.parse(req.query.where || '{}');
            } catch (e) {
                // Ignored
            }
            for (let key in where) {
                // remove root level $ operators
                if (/^$/.test(key)) delete where[key];
            }

            let result = await Project.find(where)
                .skip(parseInt(req.query.skip, 10) || 0)
                .limit(parseInt(req.query.limit, 10) || 100)
                .where('ownerId', req.currentUser.id)
                .exec();
            res.send(result);
        } catch (e) {
            next(e);
        }
    });

    router.get('/api/projects/:projectId', async (req, res, next) => {
        if (!/^[0-9a-f]{24}/i.test(req.params.projectId)) {
            return next(createError.NotFound());
            // return next(createError(422, 'INVALID PROJECT ID'));
        }
        try {
            let { projectId } = req.params;
            let result = await Project.findById(projectId).exec();
            if (!result) return next(createError.NotFound());
            res.send(result);
        } catch (e) {
            next(e);
        }
    });

    // Implement Project Update in Method
    //
    router.put('/api/projects/:projectId', async (req, res, next) => {
        if (!/^[0-9a-f]{24}/i.test(req.params.projectId)) {
            return next(createError(422, 'INVALID PROJECT ID'));
        }
        try {
            let projectInstance = await Project.findById(
                req.params.projectId
            ).exec();

            // Return Error When Not Found
            if (!projectInstance) return next(createError.NotFound());

            // Return Error when invalid data or invalid version
            if (
                !req.body ||
                typeof req.body.__v !== 'number' ||
                req.body.__v !== projectInstance.__v
            )
                return next(createError.UnprocessableEntity());

            // Patch project instance
            for (let key in req.body) {
                if (!/^$/.test(key)) {
                    projectInstance[key] = req.body[key];
                }
            }

            if (projectInstance['status'] === 'new')
                projectInstance['status'] = 'unfinished';

            projectInstance.__v += 1;

            await projectInstance.save();

            res.send(projectInstance);
        } catch (e) {
            next(e);
        }
    });
}
module.exports = applyProjectRoutes;
