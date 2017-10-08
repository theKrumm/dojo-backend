'use strict';

var fs = require('fs'),
    Promise = require('bluebird'),
    path = require('path'),
    readFile = Promise.promisify(fs.readFile);
var rp = require('request-promise');
var mongoose = require('mongoose');
var User = mongoose.model('Users');

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.get_user = function(req, res) {
    var lastName = req.query.lastName;
    var firstName = req.query.firstName;
    
    var theQuery = {};
    
    if (firstName) {
        theQuery["first_name"] = firstName;
    }
    if (lastName) {
        theQuery["last_name"] = lastName;
    }
    
    User.find(theQuery, function(err, user) {
    if (err) {
        res.send(err);
    }
    res.json({
        "users": user
    });
    });
}

exports.delete_user = function(req, res) {
    User.remove({
        last_name: req.body.lastName,
        first_name: req.body.firstName
    }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json({message: `Deleted user: ${req.body.firstName} ${req.body.lastName}.`});
    });
}

function postUsers(users){
    var options = {
        method: "POST",
        uri: 'http://localhost:3000/users',
        body: {},
        json: true
    }
    users.forEach(function(user){
        options.body = user;
        rp(options)
            .then(console.log)
            .catch(console.error);
    })
}

exports.import_users = function(req, res) {
    var cwd = path.dirname(fs.realpathSync(__filename));
    var uri = req.query.uri;
    import_users_from_uri(`${cwd}/../../${uri}`)
    .then(function(names){
        console.log(names, typeof names);
        var toPostNamesArray = rawNamesToJson(names);
        postUsers(toPostNamesArray);
        res.json(toPostNamesArray);            
    })
    .catch(function(err){
        console.error(err);
    })
};

function rawNamesToJson(names) {
    var rawNames = names.split('\n');
    return rawNames.map(function(name){
        var nameArray = name.split(" ");
        return {"first_name": nameArray[0],
               "last_name": nameArray[1]};
    });
}

function import_users_from_uri(uri) {
    return readFile(uri)
    .then(function(buffer){
        return buffer.toString('utf8');
    })
    .then(function(text){
        return text;
    })
    .catch(function(err){
        console.error(err);
    });
}