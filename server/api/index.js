const express = require('express');
const router = express.Router();
const cors = require('cors');
const { User, Project, Expert } = require('../models');
const createError = require('http-errors');
const lodash = require('lodash');

const applyProjectRoutes = require('./project');
const applyUserRoutes = require('./user');
const applyExpertRoutes = require('./expert');

router.use(cors({ credentials: true, origin: true }));

applyProjectRoutes(router);
applyUserRoutes(router);
applyExpertRoutes(router);

module.exports = router;
