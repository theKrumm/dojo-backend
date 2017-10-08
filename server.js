var express = require('express'), 
    app = express(), 
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/UserModel'),
    Course = require('./api/models/CourseModel'),
    Class = require('./api/models/ClassModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Practicedb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes');

routes(app);

app.listen(port);

console.log("practice api started on port: " + port);