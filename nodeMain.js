/*globals require, console, process */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Data = require('./data');
const router = require ('./apiRest.js');
const routerGetPost = require ('./getPostNode.js');
// instantiate express
const app = express();


// instantiate mongoose
mongoose.Promise = global.Promise;
var options = {
    //useMongoClient: true,
    user: 'test',
    pass: 'testtest1'
  };
mongoose.connect('mongodb://test:testtest1@ds151544.mlab.com:51544/databaseesame', options); // mio database
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;


// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});

// register our router on /api
//app.set('db',db);
app.use('/api', router);
app.use('/getPost', routerGetPost)

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});


app.listen(port);
console.log('Magic happens on port ' + port);
