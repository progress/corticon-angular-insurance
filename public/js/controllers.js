'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {
    $scope.pane = 0;
    var data = {};
    $scope.next = function() {
        var info = $scope;
        switch ($scope.pane) {
            case 0:
                data.zip = info.zip;
                data.date = info.date;
                data.familySize = info.familySize;
                break;
            case 1:
                info = $scope.$$childHead;
                console.log(info);
                data.birth = [];
                data.tobacco = 0;
                while(info) {
                    data.birth.push(info.birth);
                    if(info.tobacco) {
                        data.tobacco ++;
                    }
                    info = info.$$nextSibling;
                }
                break;
            case 2:
                data.salary = info.salary;
                break;
            case 3:
                data.visits = info.visits;
                data.prescriptions = info.prescriptions;
                console.log(data);
                $http.post('/api/getInfo', data).
                success(function(dat) {
                    if (dat) {
                    } else {
                    }
                });
        }
        $scope.pane ++;
    };

    $scope.previous = function() {
        $scope.pane--;
    };

    $scope.getNumber = function() {
        var arr = [];
        for (var i = 0; i <= data.familySize; i++) {
            arr.push(i);
        }
        return arr;
    }

    $scope.addUser = function() {
        $scope.showEmails = 'hide';
        $scope.error = 'noerror';
        var info = $scope.$$childTail;
        var userInfo = {};
        //This was an easy way to pass information between the frontend and backend after switching from Express 2 to 4.
        $http.post('/api/addUser' + info.email + '.*.' + info.address + '.*.' + info.city + '.*.' + info.zip).
        success(function(data) {
            if (data) {
                $scope.type = $scope.types[0];
            } else {
                $scope.error = 'nosave';
            }
        });
    };
});