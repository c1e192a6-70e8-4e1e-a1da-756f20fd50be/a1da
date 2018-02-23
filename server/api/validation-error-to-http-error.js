const createError = require('http-errors');
/**
 * Transforms Vlaidation Error to HttpError
 *
 * @param {any} validationError Mongoose Validation Error
 * @returns
 */
function toHttpValidationError(validationError) {
    const err = new createError(422, 'UNPROCESSABLE_ENTITY');
    err.errors = validationError.errors;
    return err;
}
module.exports = toHttpValidationError;
