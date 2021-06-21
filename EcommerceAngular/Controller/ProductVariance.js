'use strict';

ScBusinez.controller('ProductVariance', function ($scope, $http, $timeout, $window) {
    
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');

    var vCompanyId = $.session.get('CompanyId');
    $scope.CompanyName = $.session.get('CompanyName');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    
    $scope.Variance = false;
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '#!home';
    }

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
    //End//////////////////////////////////



    var ee = document.getElementById("showLeftPush1");
    ee.style.display = 'none';

    $http({
        url: vUrl + "ProductVariance/User",
        method: "Get",
        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {
        $scope.UserDetails = response.data;
        }).catch(function (response) {
        });


    $scope.ddlCatChange = function (AdminId) {
        $scope.Variance = false;
        
        if ($scope.UserDetail.FromDate == undefined || $scope.UserDetail.FromDate == "" || $scope.UserDetail.FromDate == null) {
            //$scope.msg = "Please Choose Date";
            //return false;
            $scope.UserDetail.FromDate =  document.getElementById("FromDate").value;
        }

        $http({
            url: vUrl + "ProductVariance/ProductCount",
            method: "Get",
            params: { Date: $scope.UserDetail.FromDate, UserId: AdminId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            
            $scope.Productcount = response.data.length;
            $scope.Variance = true;
            
        }).catch(function (response) {
        });


        $http({
            url: vUrl + "ProductVariance/VarianceCount",
            method: "Get",
            params: { Date: $scope.UserDetail.FromDate, UserId: AdminId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            
            $scope.count = response.data.length;
            
            
        }).catch(function (response) {
            });
       
    };


    $timeout(callAtTimeout, 500);
    //-------------  Mobile Toggle Switch   -----------//

    $scope.toggle_visibility = function (id, id1) {
        // 
        var e = document.getElementById(id);
        var e1 = document.getElementById(id1);

        e.style.display = 'none';
        e1.style.display = 'block';

    }
    $scope.myFunction = function () {
        //

        var x = document.getElementById("myLinks");

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }
    //-------------  Mobile Toggle Switch Ends  -----------//

    var vCompanyId = $.session.get('CompanyId');

    
    $scope.ShowPrint = false;
    $scope.ShowSalesreport = false;
    $scope.ShowSalesreportmobile = false;
    
   

   

    //Print button click
   

    function callAtTimeout() {
        
        var date = new Date();
        var day = date.getDate();
        var dayseven = date.getDate() + 6;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        
        var monthlastday = year + "-" + month + "-" + date.getDate();
       // document.getElementById("FromDate").value = monthfirstday
        document.getElementById("FromDate").value = monthlastday
    }
});