'use strict';

ScBusinez.controller('PaymentOptionController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";


    $window.scrollTo(0, 0);

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.showName = true;
    
    $scope.BindGrid = function () {
        $http(
            {
                url: vUrl+"PaymentOption/GetPaymentOptions",
                method: 'GET',
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                $scope.allItems = response.data;
                $scope.sort('name');
                
            }).catch(function (response) {
                
            });
    }
    $scope.BindGrid();

    var funPlaceholderReset = function () {
        var element = document.getElementById("lblName");
        element.className = '';
        element.innerHTML = "Name";

        var element = document.getElementById("lblLink");
        element.className = '';
        element.innerHTML = "Link";
        var element = document.getElementById("lblUserName");
        element.className = '';
        element.innerHTML = "UserName";

        var element = document.getElementById("lblPassword");
        element.className = '';
        element.innerHTML = "Password";
    }

    $scope.Save = function () {
        
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.PaymentOption.Name == undefined || $scope.PaymentOption.Name == null || $scope.PaymentOption.Name == "") {
            $scope.msg = 'Please Enter the Name';
            return false;
        }
        if ($scope.PaymentOption.Link == undefined || $scope.PaymentOption.Link == null || $scope.PaymentOption.Link == "") {
            $scope.msg = 'Please Enter the Link';
            return false;
        }
        if ($scope.PaymentOption.UserName == undefined || $scope.PaymentOption.UserName == null || $scope.PaymentOption.UserName == "") {
            $scope.msg = 'Please Enter the UserName';
            return false;
        }
        if ($scope.PaymentOption.Password == undefined || $scope.PaymentOption.Password == null || $scope.PaymentOption.Password == "") {
            $scope.msg = 'Please Enter the Password';
            return false;
        }

        var payment = $scope.PaymentOption;
        
        if ($scope.PaymentOption.IsActive == true) {
            $scope.PaymentOption.IsActive = 1;
        }
        else
            $scope.PaymentOption.IsActive = 0;

        $http({
            url: vUrl+"PaymentOption/InsertPaymentOptions",
            dataType: 'json',
            method: 'POST',
            data: payment,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var vExist = response.data;
            if (vExist == "Already Exist") {
                $scope.msg = 'Please Enter Valid Name This Name Already Used';
            }
            else {
                $scope.BindGrid();
                $scope.msgStatus = 'Payment Added Successfully';
                $scope.PaymentOption.Name = "";
                $scope.PaymentOption.Link = "";
                $scope.PaymentOption.UserName = "";
                $scope.PaymentOption.Password = "";
                $scope.PaymentOption.IsActive = "";
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
                $scope.showName = true;
                funPlaceholderReset();
                
            }
        }).catch(function (response) {
            
        });
    }

    $scope.Edit = function (paymentOptionId) {
       
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.showName = false;
        
        $scope.msgStatus = '';
        $scope.msg = '';

        $http({
            method: "GET",
            url: vUrl+ "PaymentOption/GetPaymentOptionsById",
            params: { PaymentOptionId: paymentOptionId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            var result = response.data;
           
            var New = response.data;
            var vName = result["0"].Name;
            var vLink = result["0"].Link;
            var vUserName = result["0"].UserName;
            var vPassword = result["0"].Password;
            var IsActive = result["0"].IsActive;
            var vstatus = false;
            if (IsActive == "1")
                vstatus = true;
           
            $scope.PaymentOption = { Name: vName, Link: vLink, UserName: vUserName, Password: vPassword, IsActive: vstatus };
            $scope.hiddenPaymentOptionId = paymentOptionId;
        }).catch(function (response) {
           
        });
    }
    //$(function () {

    //    $(".input-group").children("i").click(function () {

    //        $(this).toggleClass("fa-eye fa-eye-slash");

    //        var inputField = $(".pwdField").children().first();

    //        if ($(inputField).attr("type", "password")) {

    //            $(inputField).attr("type", "text");

    //        } else {
    //            $(inputField).attr("type", "password");
    //        }
    //    });
    //});

    $scope.Update = function () {
       
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.PaymentOption.Name == undefined || $scope.PaymentOption.Name == null || $scope.PaymentOption.Name == "") {
            $scope.msg = 'Please Enter the Name';
            return false;
        }
        if ($scope.PaymentOption.Link == undefined || $scope.PaymentOption.Link == null || $scope.PaymentOption.Link == "") {
            $scope.msg = 'Please Enter the Link';
            return false;
        }
        if ($scope.PaymentOption.UserName == undefined || $scope.PaymentOption.UserName == null || $scope.PaymentOption.UserName == "") {
            $scope.msg = 'Please Enter the UserName';
            return false;
        }
        if ($scope.PaymentOption.Password == undefined || $scope.PaymentOption.Password == null || $scope.PaymentOption.Password == "") {
            $scope.msg = 'Please Enter the Password';
            return false;
        }
        var vpaymentOptionId = $scope.hiddenPaymentOptionId;

        var paymet = $scope.PaymentOption;

        $http({
            url: vUrl+"PaymentOption/UpdatePaymentOptions",
            dataType: 'json',
            method: 'POST',
            data: paymet,
            params: { PaymentOptionId: vpaymentOptionId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
           
            $scope.BindGrid();
            $scope.msgStatus = 'Payment Updated Successfully';
            $scope.PaymentOption.Name = "";
            $scope.PaymentOption.Link = "";
            $scope.PaymentOption.UserName = "";
            $scope.PaymentOption.Password = "";
            $scope.PaymentOption.IsActive = "";
            $scope.showName = true;
            
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;

            funPlaceholderReset();
        });
    }

    $scope.Clear = function () {
       
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.PaymentOption.Name = "";
        $scope.PaymentOption.Link = "";
        $scope.PaymentOption.UserName = "";
        $scope.PaymentOption.Password = "";
        $scope.PaymentOption.IsActive = "";
        //$scope.PaymentOption.Status = "";
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.showName = true;
        funPlaceholderReset();
    }

    //-----------------------   Pagination Start   -----------------------------

    $scope.pageSize = 10;
    $scope.reverse = false;

    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.currentPage = 0;
    }
    $scope.pagination = function () {
        var retVal = [];

        for (var i = 0; i < $scope.filteredList.length; i++) {
            if (i % $scope.pageSize === 0) {
                retVal[Math.floor(i / $scope.pageSize)] = [$scope.filteredList[i]];
            } else {
                retVal[Math.floor(i / $scope.pageSize)].push($scope.filteredList[i]);
            }
        }
        $scope.ItemsByPage = retVal;
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };
    $scope.lastPage = function () {

        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };
    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 0;
        }
        for (var i = input; i < total; i++) {
            if (i != 0 && i != total - 1) {
                ret.push(i);
            }
        }
        return ret;
    };
    $scope.sort = function (sortBy) {
        var iconName = "";
        $scope.resetAll();
        $scope.pagination();
    };

    //-----------------------   Pagination End   -----------------------------

});