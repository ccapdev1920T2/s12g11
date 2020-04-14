var mongoose = require('mongoose');

var facultySchema = new mongoose.Schema({
    fuName: {
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
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    oaRating: {
        type: Number,
        required: true
    },

    subjects: {
        type: [{
            subject: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }],
        required: true
    }
});

module.exports = mongoose.model('Faculty', facultySchema);
