/*
 * Serve JSON to our AngularJS client.
 */
//Rollbase setup (though https is used by both Rollbase and Mongo)
var https = require('https');

exports.getInfo = function(req, result) {
    var data = req.body;
    var link = 'http://54.247.33.104:8850/axis/corticon/execute';
    // Using JSON requests based on http://documentation.progress.com/output/ua/Corticon/index.html#page/Corticon/Corticon.0708.html
    var jsonRequest = JSON.stringify({
        'Objects': [{
            'lastQuestionAnswered': 'q_applGender',
            'p_subsriber': [{
                'q_applGender': [{
                    'response': [{
                        'respSelected': 'T',
                        'respValue': 'F',
                        '__metadata': {
                            '#type': 'R_applGender'
                        }
                    }],
                    '__metadata': {
                        '#type': 'Q_applGender'
                    }
                }],
                '__metadata': {
                    '#type': 'P_subscriber'
                }
            }]
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
            'dsName': 'DisplayDynamicUI'
        },
        url: link,
        body: jsonRequest,
        method: 'POST'
    }, function(err, res, body) {
        if (res.statusCode <= 400) {
            var obj = JSON.parse(body);
            console.log(obj.Messages);
        }
    });
}