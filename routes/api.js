/*
 * Serve JSON to our AngularJS client.
 */
//Rollbase setup (though https is used by both Rollbase and Mongo)
var https = require('https');

// Currently this just sends the response to the gender question(req.body.gender) to the backend and returns the Corticon response to that question. 
exports.getInfo = function(req, result) {
    gender = 'F';
    if(req.body.gender == 'Male') {
        gender = 'M';
    }
    var link = 'http://54.247.33.104:8850/axis/corticon/execute';
    // Using JSON requests based on http://documentation.progress.com/output/ua/Corticon/index.html#page/Corticon/Corticon.0708.html
    var jsonRequest = JSON.stringify({"Objects": [{
    "lastQuestionAnswered": "q_applGender",
    "p_subscriber": {
        "q_pregnantYN": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_pregnantYN_id_1",
                "#type": "Q_pregnantYN"
            }
        }],
        "q_dueDate": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_dueDate_id_1",
                "#type": "Q_dueDate"
            }
        }],
        "q_prostateYN": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_prostateYN_id_1",
                "#type": "Q_prostateYN"
            }
        }],
        "q_prostateDiagDate": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_prostateDiagDate_id_1",
                "#type": "Q_prostateDiagDate"
            }
        }],
        "q_prostateDiagNote": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_prostateDiagNote_id_1",
                "#type": "Q_prostateDiagNote"
            }
        }],
        "q_genderNote2": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_genderNote2_id_1",
                "#type": "Q_genderNote2"
            }
        }],
        "__metadata": {
            "#id": "P_subscriber_id_1",
            "#type": "P_subscriber"
        },
        "q_genderNote1": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_genderNote1_id_1",
                "#type": "Q_genderNote1"
            }
        }],
        "q_applGender": [{
            "response": [{
                "respSelected": "true",
                "__metadata": {
                    "#id": "R_applGender_id_1",
                    "#type": "R_applGender"
                },
                "respValue": gender
            }],
            "__metadata": {
                "#id": "Q_applGender_id_1",
                "#type": "Q_applGender"
            }
        }],
        "q_dueDateNote": [{
            "displayFlag": "#null",
            "__metadata": {
                "#id": "Q_dueDateNote_id_1",
                "#type": "Q_dueDateNote"
            }
        }]
    },
    "__metadata": {
        "#id": "D_DynamicUI_id_1",
        "#type": "D_DynamicUI"
    }
}]});
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
            var genderResponse = obj.Messages.Message[0].text;
            var genderq;
            if(genderResponse.indexOf('show female') > -1) {
                genderq = 'female';
            } else if(genderResponse.indexOf('show male') > -1) {
                genderq = 'male';
            } else {
                console.error(genderResponse);
            }
            console.log(genderq);
            result.json({
                'genderq': genderq
            })
        }
    });
}