var mongoose = require('mongoose');

var instanceSchema = new mongoose.Schema({
    uuName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Instance', instanceSchema);
