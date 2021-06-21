'use strict';

ScBusinez.controller('ContactController', function ($scope, $http) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $scope.SubcategoryName = "";
    $scope.SubcategoryStatus = "";
    $scope.CompanyName = $.session.get('CompanyName');
    $http({
        url: vUrl+"SubCategory/GetSubCategories",
        method: "GET",
        headers: {
            'Content-Type': JSON
        }

    }).then(function mySuccess(response) {
       
        $scope.tutorial = response.data;
        }).then(function myError(response) {
       
    });
    //SubcategoryName SubcategoryStatus
    //$scope.tutorial = [
    //    { Name: "Promises", Description: "Power of Promises" },
    //    { Name: "Event", Description: "Event of Node.js" },
    //    { Name: "Modules", Description: "Modules in Node.js" }
    //]
   
    $scope.Save = function () {
        
        //$scope.tutorial.push({ SubcategoryName: $scope.SubcategoryName, SubcategoryStatus: $scope.SubcategoryStatus })
        var Data = $scope.Data;
        var frd = JSON.stringify(Data);
        //$http.post(
        //    'http://localhost:63263/api/SubCategory/insertSubCat',
        //    JSON.stringify(Data),
        //    {
        //        headers: {
        //            'Content-Type': 'application/json'
        //        }
        //    }
        //)
        $http({
            url: vUrl+"SubCategory/InsertSubCat",
            dataType: 'json',
            method: 'POST',
            data: Data,
            headers: {
                "Content-Type": "application/json"
            }
        });
        //.success(function (response) {
        //    
        //    $scope.value = response;
        //});  
    }
});
