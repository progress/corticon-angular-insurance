/*
 * Serve JSON to our AngularJS client.
 */
//Rollbase setup (though https is used by both Rollbase and Mongo)
var https = require('https');

exports.getInfo = function(req, result) {
    var data = req.body;
    // Using JSON requests based on http://documentation.progress.com/output/ua/Corticon/index.html#page/Corticon/Corticon.0708.html
    var link = 'http://54.247.33.104:8850/axis/services/Corticon';
    var hostName = 'localhost:3000';
    var jsonRequest = JSON.stringify({
        "Objects": [{
            "form": req.body
        }]
    });
    console.log(req.body)
    var contentLength = jsonRequest.length;
    var request = require('request');
    var querystring = require('querystring');
    request({
        headers: {
            'content-length': contentLength,
            'content-type': 'application/json',
            'connection': 'Keep-Alive',
            'user-agent': 'NodeJS client',
            'host': hostName,
            'dsName': 'DisplayDynamicUI'
        },
        url: link,
        body: jsonRequest,
        method: 'POST'
    }, function(err, res, body) {
        console.log(res.statusCode);
        console.log(body);
        if (res.statusCode <= 400) {
            var obj = JSON.parse(body);
            var formResponse = obj.Objects[0];
            console.log(formResponse);
            result.write(formResponse);
            result.end();
        }
    });
}