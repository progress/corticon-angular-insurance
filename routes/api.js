/*
 * Serve JSON to our AngularJS client.
 */
//Rollbase setup (though https is used by both Rollbase and Mongo)
var https = require('https');
var password = 'YOUR ROLLBASE PASSWORD';
var username = 'YOUR ROLLBASE USERNAME';
var viewId = 'YOUR ROLLBASE VIEWID';
var objectIntegrationName = 'YOUR OBJECT INTEGRATION NAME';
var sessionId = '';
login();
// This logs back in periodically. Currently it logs in every hour, but the interval can be adjusted.
var interval = setInterval(login, 360000);

// Function for logging into Rollbase with credentials. It updates the sessionId token and also calls updateData to update any data. 
function login() {
    var loginOptions = {
        host: 'rollbase.com',
        port: 443,
        // Note this is password not Password like in documentation
        path: '/rest/api/login?&output=json&password=' + password + '&loginName=' + username
    };
    // do the request
    var loginGet = https.request(loginOptions, function(res) {
        var data = '';
        res.on('data', function(d) {
            data += d;
        });
        res.on('end', function() {
            var obj = JSON.parse(data);
            if (obj.status == 'ok') {
                sessionId = obj.sessionId;
            } else {
                console.log(obj.message);
            }
        })
    });
    loginGet.end();
    loginGet.on('error', function(e) {
        console.error(e);
    });
}

exports.getInfo = function(req, result) {
    //Currently just logs the response
    console.log(req.body);
}