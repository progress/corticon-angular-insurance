'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {
    $scope.pane = 0;
    var data = {};
    // This is called each time the screen should be advanced. It stores all current information into data.
    $scope.next = function() {
        var info = $scope;
        switch ($scope.pane) {
            case 0:
                data.zip = info.zip;
                data.date = info.date;
                data.familySize = info.familySize;
                data.gender = (info.gender == 1) ? 'male' : 'female';
                update();
                break;
            case 1:
                data.magazines = [info.mag1 ? 1 : 0, info.mag2 ? 1 : 0, info.mag3 ? 1 : 0];
                update();
                break;
            case 2:
                info = $scope.$$childHead;
                data.birth = [];
                data.tobacco = 0;
                while (info) {
                    data.birth.push(info.birth);
                    if (info.tobacco)
                        data.tobacco++;
                    info = info.$$nextSibling;
                }
                update();
                break;
            case 3:
                data.salary = info.salary;
                update();
                break;
            case 4:
                data.visits = info.visits;
                data.prescriptions = info.prescriptions;
                update();
                break;
        }
        console.log(data);
    };
    // This calls the backend to determine what to show next.
    var update = function() {
        data.pane = $scope.pane;
        $http.post('/api/getInfo', data).
        success(function(dat) {
            console.log(dat);
            if (dat) {
                $scope.pane = dat.screen;
                $scope.sex = dat.sex;
                $scope.number = dat.number;
                $scope.estimate = dat.estimate;
            }
        });
    }
    // 
    $scope.previous = function() {
        $scope.pane--;
    };
});