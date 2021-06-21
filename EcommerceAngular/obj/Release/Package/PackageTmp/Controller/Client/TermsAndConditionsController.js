'use strict';

Ecom.controller('TermsAndConditionsController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
 $scope.CompanyDetailId = $.session.get('CompanyDetailId');
    
    $scope.BindDataFromDB = function () {
        
   
            $http({
                url: vUrl + "TermsAndCondition/GetTermsAndCondition",
                method: "GET",
                //params: { CompanyDetailId: $scope.CompanyDetailId },
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