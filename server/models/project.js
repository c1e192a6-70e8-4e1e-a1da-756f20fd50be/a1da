const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const ProjectSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['new', 'unfinished', 'finished'],
        default: 'new',
    },
    experts: {
        related: {
            type: [ObjectId],
            default: [],
        },
        rejected: {
            type: [ObjectId],
            default: [],
        },
        approved: {
            type: [ObjectId],
            default: [],
        },
    },
    ownerId: ObjectId,
    startDate: {
        type: Date,
        default: Date.now,
    },
});

ProjectSchema.virtual('isExpired').get(function() {
    return (
        this.status !== 'finished' &&
        +new Date() - +this.startDate >= 86400 * 1000 * 3
    );
});

ProjectSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
