var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uuName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    dpPath: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
