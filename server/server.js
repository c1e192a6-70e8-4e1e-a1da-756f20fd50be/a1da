const express = require('express');
const middlewares = require('./middlewares');
const models = require('./models');
const mongoose = require('mongoose');
const app = express();
const connectionString =
    process.env.DB_CONN_STR || 'mongodb://127.0.0.1:27017/lynk-demo';
// Dummy data initializer
const initDummyExpert = require('./initial-data-generator/expert');
const initDummyProjects = require('./initial-data-generator/project');

middlewares(app);

app.models = models;

app.start = async function() {
    // App already started
    if (app.server) return app.server;

    let port = parseInt(process.env.PORT, 10)
        ? parseInt(process.env.PORT, 10)
        : 3000;

    let server = app.listen(port, () => {
        console.log(`SERVER ready at port:${port} http://localhost:${port}/`);
    });
    app.server = server;

    // Prepare mongoDB connection
    await new Promise((resolve, reject) => {
        mongoose.connect(connectionString, err => {
            if (err) {
                console.error('MongoDB connection Error');
                console.error(err);
                reject(err);
            }
            resolve();
        });
    });

    // Setup Dummy Data
    initDummyExpert();
    // initDummyProjects();

    // Emit ready event
    app.emit('ready');
    return server;
};
module.exports = app;

if (require.main === module) {
    app.start();
}
