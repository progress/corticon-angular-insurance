/*
 * Serve JSON to our AngularJS client.
 */
//Rollbase setup (though https is used by both Rollbase and Mongo)
var https = require('https');

exports.getInfo = function(req, result) {
    var data = req.body;
    /* This is the simulated response (not using Corticon) on http://health-insurance-22573.onmodulus.net/
    // Ideally obj.Objects[0].formResponse (line 51) would send an equivalent response to this.
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
    */
    // Using JSON requests based on http://documentation.progress.com/output/ua/Corticon/index.html#page/Corticon/Corticon.0708.html
    var link = 'http://54.247.33.104:8850/';
    var hostName = 'http://54.247.33.104:8850/';
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