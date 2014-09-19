/**
 * Module dependencies. Many of these are optional depending on your needs.
 */
var express = require('express'),
    api = require('./routes/api'),
    http = require('http'),
    bodyParser = require('body-parser'),
    path = require('path');
var app = module.exports = express();


/**
 * Configuration
 */

// all environments. Some of these might not actually be necessary depending on your application
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
var env = process.env.NODE_ENV || 'development';

/**
 * Routes
 */
var jsonParser = bodyParser.json()

// JSON API
// You would be able to also call other functions in the api.js file.
app.post('/api/getInfo', jsonParser, api.getInfo);


// redirect all others to the index (HTML5 history)
app.get('*', function(req, res) {
    res.render('index');
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});