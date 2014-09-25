'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {
    var date = new Date();
    $scope.currentDate = date.toISOString().substring(0, 10);
    $scope.pane = 0;
    // This stores all the form data.
    var data = {};
    // This is called each time the screen should be advanced. It stores all current information into data.
    $scope.next = function() {
        switch ($scope.pane) {
            case 1:
                $scope.viewCost();
                break;
            case 2:
                $scope.viewGender();
                update();
                break;
            case 3:
                data.magazines = [0, 0, 0, 0];
                if ($scope.magazine1)
                    data.magazines[0] = 1;
                if ($scope.magazine2)
                    data.magazines[1] = 1;
                if ($scope.magazine3)
                    data.magazines[2] = 1;
                if ($scope.magazine4)
                    data.magazines[3] = 1;
                break;
        }
        console.log(data);
        $scope.pane++;
    };
    // This calls the backend to determine what to show next.
    var update = function() {
        data.pane = $scope.pane;
        $http.post('/api/getInfo', data).
        success(function(dat) {
            console.log(dat);
            if (dat) {
                $scope.pane++;
            }
        });
    }

    $scope.previous = function() {
        $scope.pane--;
    };

    $scope.viewPlan = function() {
        return data.plan;
    };

    $scope.viewCost = function() {
        if ($scope.pane == 1) {
            if ($scope.plan == 1) {
                data.plan = 'Basic';
            } else if ($scope.plan == 2) {
                if ($scope.$$childTail.familySize) {
                    data.familySize = $scope.$$childTail.familySize;
                }
                data.plan = 'Economic';
            } else if ($scope.plan == 3) {
                data.plan = 'High Deductible';
            }
        }
        data.cost = 0;
        if (data.plan == 'Economic') {
            data.cost = data.familySize * 20;
        }
        if (data.cost > 100) {
            data.cost = 100;
        }
        if (data.magazines && data.magazines[2]) {
            data.cost += 10;
        }
        return data.cost;
    }
    $scope.viewGender = function() {
        if ($scope.pane == 2) {
            data.name = $scope.first;
            data.age = $scope.age;
            var scope = $scope.$$childTail;
            if ($scope.gender == 1) {
                data.gender = 'female';
                if (scope.pregnant == 2) {
                    data.pregnant = 'NO';
                } else {
                    data.pregnant = 'YES';
                    scope = scope.$$childTail;
                    if (scope && scope.duedate) {
                        data.dueDate = scope.duedate.toISOString().substring(0, 10);
                    }
                }
            } else if ($scope.gender == 2) {
                data.gender = 'male';
                if (scope.prostate == 2) {
                    data.prostate = 'NO';
                } else {
                    data.prostate = 'YES';
                    scope = scope.$$childTail;
                    if (scope) {
                        if (scope.history == 2) {
                            data.history = 'NOT RECENT';
                        } else if (scope.history == 1) {
                            data.history = 'RECENT';
                        }
                    }
                }
            }
        }
        return data.gender;
    }
});