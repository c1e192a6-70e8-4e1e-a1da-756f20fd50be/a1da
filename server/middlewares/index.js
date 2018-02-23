const express = require('express');
const bodyParser = require('body-parser');
const session = require('./session');
const currentUser = require('./current-user');
const apiRouter = require('../api');
const errorHandler = require('./error-handler');
/**
 * Apply middlewares to express App
 *
 * @param {any} app
 */
function applyMiddlewares(app) {
    const middlewareStack = [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        session,
        currentUser,
        express.static('public'),
        apiRouter,
        errorHandler,
    ];

    middlewareStack.forEach(middleware => {
        app.use(middleware);
    });

    return app;
}

module.exports = applyMiddlewares;
