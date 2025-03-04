// emotion.js
const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emotion: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    }
});

const Emotion = mongoose.model('Emotion', emotionSchema);

module.exports = Emotion;
