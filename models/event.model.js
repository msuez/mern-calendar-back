
const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    available: {
        type: Boolean,
        default: true,
    }
});

EventSchema.method('toJSON', function() {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Event', EventSchema);
