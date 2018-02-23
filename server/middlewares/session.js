const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const customSimpleAuth = require('./simple-auth');

module.exports = session({
    secret: 'Somewhate super secret cooke secret, just joking here.',
    saveUninitialized: false,
    httpOnly: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    }),
    resave: false,
});
