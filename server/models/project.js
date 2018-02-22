const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const ProjectSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['new', 'unfinished', 'finished'],
        default: 'new',
        pendingExperts: [ObjectId],
        rejectedExperts: [ObjectId],
        approvedExperts: [ObjectId],
        belongsTo: ObjectId,
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
