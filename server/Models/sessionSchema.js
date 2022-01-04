const mongoose = require('mongoose');

const mongooseSessionSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('sessionSchema', mongooseSessionSchema);