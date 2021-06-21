'use strict'; Ecom.controller('AboutUsController', function ($scope, $http, $window) {

   
    $scope.SubDomain = $.session.get('SubDomain');
    
    var vUrl = $scope.SubDomain;
 $window.scrollTo(0, 0);

    $scope.imageget = function () {
        
        $http({
            url: vUrl + "AboutUs/GetAboutUsAdmin",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            $scope.Description = response.data;
            }).catch(function (response) {
                
            });
    }
    $scope.aHomeClick = function () {
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined) {
            var vLocation = "#!HomePage/" + vclientMemberId;
            window.location.href = vLocation;
        }
        else {
            var vLocation = "#!HomePage/0"; window.location.href = vLocation;
        }
    }
    $window.scrollTo(0, 0);
    $scope.imageget();
    $scope.faqget = function () {
        
        $http({
            url: vUrl + "AboutUs/GetFaqId",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            $scope.FaqData = response.data;
            }).catch(function (response) {
                
            });
    }
    $scope.faqget();
});  