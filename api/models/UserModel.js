'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {
        type: String,
        required: 'Please enter your first name. '
    },
    last_name : {
        type: String, 
        required: 'Please enter your Last name. '
    },
    email : {
        type: String,
        required: 'Please enter an email. '
    }
});

module.export = mongoose.model('Users', userSchema);