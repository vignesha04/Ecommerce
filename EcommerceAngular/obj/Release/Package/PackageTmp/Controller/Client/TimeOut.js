'use strict';
Ecom.controller('TimeOutController', function ($scope, $http, $window) {
    $scope.aHomeClick = function () {
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined) {
            var vLocation = "#!HomePage/" + vclientMemberId;
            window.location.href = vLocation;
        }
        else {
            var vLocation = "#!HomePage/0";
            window.location.href = vLocation;
        }
    }

    $window.scrollTo(0, 0);
});