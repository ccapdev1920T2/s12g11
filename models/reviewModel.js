var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    reviewee_u: {
        type: String,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    },

    reviewer: {
        type: String,
        required: true
    },
    reviewee: {
        type: String,
        required: true
    },
    revCourse: {
        type: String,
        required: true
    },
    revStar: {
        type: Number,
        required: true
    },
    revDet: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);
