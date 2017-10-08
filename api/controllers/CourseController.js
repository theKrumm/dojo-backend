'user strict';
var mongoose = require('mongoose');
var Course = mongoose.model('Courses');

exports.create_course = function(req, res) {
    var new_course = new Course(req.body);
    new_course.save(function(err, course) {
        if (err) {
            res.send(err);
        }
        res.json(course);
    });
}

exports.list_all_courses = function(req, res) {
    Course.find({}, function(err, course) {
        if (err) {
            res.send(err);
        }
        res.json(course);
    });
}

exports.delete_course = function(req, res) {
    Course.remove({courseName:req.body.courseName}, function(err, course) {
        if (err){
            res.send(err);
        }
        res.json(course + "was removed.");
    });
}