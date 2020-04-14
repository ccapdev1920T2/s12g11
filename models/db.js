const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/profsToPickDB';

const Faculty = require('./facultyModel.js');
const User = require('./userModel.js');
const Review = require('./reviewModel.js');
const Instance = require('./instanceModel.js');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc) {
        model.create(doc, function(error, result) {
            if(error) throw error;
            console.log('Added ' + result);
        });
    },

    insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
            if(error) throw error;
            console.log('Added ' + result);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) throw error;
            console.log(query);
            console.log('Found This: ');
            console.log(result);
            return callback(result);
        });
    },

    findMany: function(model, query, sort, projection, limit, callback) {
        model.find(query, projection, function(error, result) {
            if(error) throw error;
            console.log("Found: " + result.length);
            //console.log(result);
            
        }).sort(sort).limit(limit).exec(function(err, result){
            if(err) throw err;
            console.log(query);
            console.log(sort);
            console.log(limit);
            console.log("Found, Sorted & Limited: " + result.length);
            console.log(result);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update) {
        model.updateOne(filter, update, function(error, result) {
            if(error) throw error;
            console.log('Document modified: ' + result.nModified);
        });
    },

    updateMany: function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {
            if(error) throw error;
            console.log('Documents modified: ' + result.nModified);
        });
    },

    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function (error, result) {
            if(error) throw error;
            console.log('Document deleted: ' + result.deletedCount);
        });
    },

    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function (error, result) {
            if(error) throw error;
            console.log('Documents deleted: ' + result.deletedCount);
        });
    }

}

module.exports = database;