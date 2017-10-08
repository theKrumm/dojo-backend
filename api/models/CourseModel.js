'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var courseSchema = new Schema({
    courseName: {
        type: String,
        required: 'Please enter a name for this course. '
    },
    courseDescription: {
        type: String,
        required: 'Please enter a description for this course. '
    }
});

module.export = mongoose.model('Courses', courseSchema);
