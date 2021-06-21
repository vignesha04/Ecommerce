'use strict';

ScBusinez.controller('CopyRightAdminController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.CompanyName = $.session.get('CompanyName');

    var vLoginType = $.session.get('Type');
    if (vLoginType == "User") {
        $scope.MenuDashboard = false;
        $scope.MenuSalesOrders = false;
        $scope.MenuDelConfirm = false;
        $scope.MenuCategory = false;
        $scope.MenuSubCat = false;
        $scope.MenuAdd = false;
        $scope.MenuDiscount = false;
        $scope.MenuSettings = false;
        $scope.MenuSales = false;
        $scope.MenuAnalytics = false;
        $scope.AdminVariance = false;
    }
    else if (vLoginType == "Admin") {
        $scope.MenuDashboard = true;
        $scope.MenuSalesOrders = true;
        $scope.MenuDelConfirm = true;
        $scope.MenuCategory = true;
        $scope.MenuSubCat = true;
        $scope.MenuAdd = true;
        $scope.MenuDiscount = true;
        $scope.MenuSettings = true;
        $scope.MenuSales = true;
        $scope.MenuAnalytics = true;
        $scope.AdminVariance = true;
    }


    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    
    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '#!home';
    }

    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.myObj = {
        "background-color": vbackgroundColor
    }

    var vCouponApplicable = $.session.get('CouponApplicable');

    if (vCouponApplicable == "1") {
        $scope.showCoupon = true;
    }
    else
        $scope.showCoupon = false;

    var vDiscountApplicable = $.session.get('DiscountApplicable');

    if (vDiscountApplicable == "1") {
        $scope.showDiscount = true;
    }
    else
        $scope.showDiscount = false;
    //For SubMenu/////////////////////////////
    var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    vSettingsmenuShow.style.display = 'none';
    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    vSettingsmenuShow1.style.display = 'none';

    $scope.ShowHideSubMenu = function (menu, menuhide, menuhide1, menuhide2) {
        
        var x = document.getElementById(menu);
        var xHide = document.getElementById(menuhide);
        var xHide1 = document.getElementById(menuhide1);
        var xHide2 = document.getElementById(menuhide2);

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }

        if (xHide.style.display == "block") {
            xHide.style.display = "none";
        }
        if (xHide1.style.display == "block") {
            xHide1.style.display = "none";
        }
        if (xHide2.style.display == "block") {
            xHide2.style.display = "none";
        }
    }
    //'menuDisShow1'
    var vmenuShow1 = document.getElementById("menuShow1");
    vmenuShow1.style.display = 'none';

    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
    vMenuSalMobile.style.display = 'none';

    var vmenuDisShow1 = document.getElementById("menuDisShow1");
    vmenuDisShow1.style.display = 'none';

    $scope.ShowHideSubMenu1 = function (menu, menu2, menuhide, menuhide1) {
        //
        var x = document.getElementById(menu);
        var x12 = document.getElementById(menu2);
        var xhide12 = document.getElementById(menuhide);
        var xhide13 = document.getElementById(menuhide1);
        x12.style.display = "none";
        xhide12.style.display = "none";
        xhide13.style.display = "none";

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }

    $scope.LogoutClick = function () {
        $.session.set('AdminId', "");
        window.location.href = '#!home';
    }

    var ee = document.getElementById("showLeftPush1");
    ee.style.display = 'none';
    //End//////////////////////////////////
    //End//////////////////////////////////

    $scope.showSave = true;
    $scope.showUpdate = false;

    $scope.toggle_visibility = function (id, id1) {
        var e = document.getElementById(id);
        var e1 = document.getElementById(id1);

        e.style.display = 'none';
        e1.style.display = 'block';

    }
    $scope.myFunction = function () {

        var x = document.getElementById("myLinks");

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }


    $scope.BindGrid = function () {
       // 
        $http({
            url: vUrl + "CopyRightAdmin/GetEcommerceAPI",
            method: 'GET',
            params: {CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            //
            var CR = response.data;

            if (response.data.length == 0) {
                $scope.showSave = true;
                $scope.showUpdate = false;
            }
            else {
                $scope.showSave = false;
                $scope.showUpdate = true;

                var vName01 = CR["0"].CopyRights;

                $scope.CR = {
                    Name01: vName01
                }
            }
        }).catch(function (response) {
           // 
        });
    }
    $scope.BindGrid();

    $scope.onTextBoxKeyPress = function (event) {
        

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    $scope.Save = function () {
       //
        if ($scope.CR.Name01 == "" || $scope.CR.Name01 == undefined) {
            $scope.msg = CopyRightAdminMessages(1);// 'Please Enter the CopyRight';
            return false;
        }

        
        var vCopyRights = $scope.CR.Name01;
        $http({
            url: vUrl + "CopyRightAdmin/InsertCopyRight",
            dataType: 'json',
            method: 'POST',
            params: { ParamCopyRight: vCopyRights, CompanyDetailId: vCompanyId  },
            headers: {
                "Content-Type": "application/json"
            }


        }).then(function (data) {
            //
            $scope.CR.Name01 = "";
            $scope.BindGrid();

        }).catch(function (response) {
            //
        });
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;

    }

    $scope.BindGrid();
    $scope.Update = function () {
        
        $scope.msg = "";
        $scope.msgStatus = "";
       // 
        

        if ($scope.CR.Name01 == "" || $scope.CR.Name01 == undefined || $scope.CR.Name01 == null) {
            $scope.msg = CopyRightAdminMessages(1);// 'Please Enter  the CopyRight'
            return false;
         
        }
        //var vCopyRightId = $scope.CopyRights.HiddenCopyRightId;
        var vCopyRights = $scope.CR.Name01;
        
         $http({
            url: vUrl + "CopyRightAdmin/UpdateCopyRight",
            dataType: 'json',
            method: 'POST',
             params: { ParamCopyRight: vCopyRights, CompanyDetailId: vCompanyId  },
            headers: {
                "Content-Type": "application/json"
            }


        }).then(function (data) {
          //  
            $scope.msgStatus = CopyRightAdminMessages(2);// "Copyright Updated Successfully"
            $scope.CR.Name01 = "";
            $scope.BindGrid();

        }).catch(function (response) {
            //
            });
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;



    }

});