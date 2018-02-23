const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: String,
});
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    },
});
module.exports = mongoose.model('Expert', schema);
