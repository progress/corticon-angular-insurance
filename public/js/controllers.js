'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {
    $scope.pane = 0;
    $scope.familySize = 0
    var data = {};
    // This is called each time the screen should be advanced. It stores all current information into data.
    $scope.next = function() {
        console.log($scope.$$childTail);
        if($scope.pane == 1){
            $scope.pane = 0;
            if($scope.$$childTail)
                $scope.familySize = $scope.$$childTail.familySize;
        }
        $scope.pane++;
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