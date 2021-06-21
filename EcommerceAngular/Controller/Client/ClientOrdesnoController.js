'use strict'; Ecom.controller('ClientOrdesnoController', function ($scope, $http, $rootScope, $timeout, $window, $routeParams) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    var vclientMemberId = $.session.get('clientMemberId');
    var vclientMemberName = $.session.get('clientMemberName');
    var vcilentorderno = $routeParams.ordeno;
    $.session.set('vcilentorderno', vcilentorderno);
    $scope.MemberName = vclientMemberName;
    if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '' || vclientMemberId == 'undefined') {
        alert("Please login.");
        window.location.href = "#!HomePage";
        return;
    }
});