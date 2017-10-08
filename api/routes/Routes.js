'use strict';

module.exports = function(app) {
    var userList = require('../controllers/UserController'),
        courseList = require('../controllers/CourseController'),
        classList = require('../controllers/ClassController');
    
    //Routes
    app.route('/users')
        .get(userList.get_user)
        .post(userList.create_user)
        .delete(userList.delete_user);
    
    app.route('/courses')
        .post(courseList.create_course)
        .get(courseList.list_all_courses)
        .delete(courseList.delete_course);
    //TODO create class object and controller
    app.route('/classes')
        .post(classList.create_class)
        .get(classList.list_all_classes)
        .delete(classList.delete_class);
    
    app.route('/users/import')
        .get(userList.import_users);
};