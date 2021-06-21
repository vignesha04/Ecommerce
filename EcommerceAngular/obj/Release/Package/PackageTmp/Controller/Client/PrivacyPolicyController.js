'use strict';

Ecom.controller('PrivacyPolicyController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
   // var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    $scope.CompanyDetailId = $.session.get('CompanyDetailId');

    $scope.BindDataFromDB = function () {
        

        $http({
            url: vUrl + "Privacypolicy/GetPrivacypolicy",
            method: "GET",
            params: { CompanyDetailId: 1},
            headers: {
                'Content-Type': JSON
            }

        }).then(function mysuccess(response) {
            
            $scope.TAC = response.data;
            // var TACS = response.data;

        }).catch(function (response) {
            // 
        });
    }
    $scope.BindDataFromDB();




});