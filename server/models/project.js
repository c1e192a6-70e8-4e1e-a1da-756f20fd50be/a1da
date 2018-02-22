const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    name: String,
});

module.exports = model('Project', ProjectSchema);
