'user strict';
var mongoose = require('mongoose');
var Class = mongoose.model('Classes');

//create new class
exports.create_class = function(req, res) {
    var new_class = new Class(req.body);
    new_class.save(function(err, new_class) {
        if (err) {
            res.send(err);
        }
        res.send(new_class);
    });
}

//gather all classes
exports.list_all_classes = function(req, res) {
    Class.find({}, function(err, the_class) {
        if (err) {
            res.send(err);
        }
        res.send(the_class);
    });
}
//gather all classes for specific date.
exports.list_all_classes_by_date = function(req, res) {
    Class.find({dateCreated: date}, function(err, the_class) {
        if (err) {
            res.send(err);
        }
        res.send(the_class);
    });
}

exports.delete_class = function(req, res) {
    Class.remove({courseId:req.body.courseId}, function(err, the_class) {
        if (err){
            res.send(err);
        }
        res.json(the_class + "was removed.");
    });
}