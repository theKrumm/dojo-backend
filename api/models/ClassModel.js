'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var classSchema = new Schema({
    courseId: {
        type: String,
        required: "You must have a course to create a class. "
    },
    instructor: {
        type: String,
        required: "An instructor is required for this course. "
    },
    studentList: {
        type: Array,
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.export = mongoose.model('Classes', classSchema);