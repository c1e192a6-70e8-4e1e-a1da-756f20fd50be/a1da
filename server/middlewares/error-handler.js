var Raven = require('raven');
Raven.config(
    'https://2545ac31625f40e9aa06fc972ff4cd34:b4fb85f9496742328e40fc289c1b911c@sentry.io/291559'
).install();
/**
 * Error Handler
 *
 * @param {Error|Object} error Error
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function errorHandler(error, req, res, next) {
    if (!error) return next();
    if (!error.status) {
        Raven.captureException(error);
        console.error(error);
        return res.status(500).send({
            message: 'SOMETHING WEIRD HAPPENING',
            error,
        });
    }
    if (error.status) {
        res.status(error.status).send({
            message: error.message,
            ...error,
        });
    }
}
module.exports = errorHandler;
