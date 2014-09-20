/*
 * Serve JSON to our AngularJS client.
 */
//Rollbase setup (though https is used by both Rollbase and Mongo)
var https = require('https');

exports.getInfo = function(req, result) {
    var data = req.body;
    var number = [];
    for (var i = 0; i <= data.familySize; i++)
        number.push(i);
    var sex = (data.gender == 'male') ? 'Men' : 'Women';
    var screen = data.pane + 1;
    var estimate = 10;
    result.json({
        'number': number,
        'sex': sex,
        'screen': screen,
        'estimate': estimate
    });
    return;
    var link = 'YOUR LINK HERE';
    var hostName = 'YOUR HOST NAME HERE';
    var counter = data.count;
    var jsonRequest = JSON.stringify({
        "Objects": [{
            "form": req.body
        }]
    });
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
            'dsName': 'PROCESS NAME HERE'
        },
        url: link,
        body: jsonRequest,
        method: 'POST'
    }, function(err, res, body) {
        if (res.statusCode < 400) {
            var obj = JSON.parse(body);
            var formResponse = obj.Objects[0].formResponse;
            result.write(formResponse);
            result.end();
        }
    });
}