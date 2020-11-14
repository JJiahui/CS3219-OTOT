var mongoose = require('mongoose');// Setup schema
var taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    is_done: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: Date.now
    },
});
taskSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
taskSchema.set('toJSON', {
    virtuals: true
});

// Export Task model
var Task = module.exports = mongoose.model('task', taskSchema);
module.exports.get = function (callback, limit) {
    Task.find(callback).limit(limit);
}
