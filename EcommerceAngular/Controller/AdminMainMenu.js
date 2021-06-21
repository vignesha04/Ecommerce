'use strict';

ScBusinez.controller('AdminMainMenu', function ($scope, $http, $window) {

    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.CompanyName = $.session.get('CompanyName');
    //document.getElementById("cbp-spmenu-s1").style.display = "none";

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
        $scope.UserVariance = true;
        $scope.showLeftPush1 = false;
        $scope.Inventory = false;

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
        $scope.UserVariance = false;
        $scope.showLeftPush1 = false;
        $scope.Inventory = true;
    }
    $scope.InvoiceLogo = $.session.get('InvoiceLogo');

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

        var y = document.getElementById("cbp-spmenu-s1");


        if (y.style.display == "block") {
            y.style.display = "none";
        }
        else {
            y.style.display = "block";
        }


        //document.getElementById("cbp-spmenu-s1").style.display = "none";
    }

    
    $scope.MenuBarclose = false;
    $scope.MenuBar1 = true;
    $scope.SHowLeftMenu = true;
    $scope.myFunction1 = function () {
        debugger;
        $scope.MenuBar1 = false;
        $scope.MenuBarclose = true;
        $scope.SHowLeftMenu = false;
        $("#page-wrapper").css("margin", "0");
        $("header - left").css("margin-left", "0");
    }

    $scope.myFunction2 = function () {
        debugger;
        $scope.MenuBar1 = true;
        $scope.MenuBarclose = false;
        $scope.SHowLeftMenu = true;
        $("#page-wrapper").css("margin", "0 0 0 13.5em");
        $("header - left").css("margin-left", "15%");
    }

    //For SubMenu/////////////////////////////
    //var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    //vMenuDiscountShow.style.display = 'none';
    //var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    //var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    //vSettingsmenuShow.style.display = 'none';
    //var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    //vSettingsmenuShow1.style.display = 'none';

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
    //var vmenuShow1 = document.getElementById("menuShow1");
    //vmenuShow1.style.display = 'none';

    //var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    //vSettingsmenuShow1.style.display = 'none';

    //var vMenuSalMobile = document.getElementById("MenuSalMobile");
    //vMenuSalMobile.style.display = 'none';

    //var vmenuDisShow1 = document.getElementById("menuDisShow1");
    //vmenuDisShow1.style.display = 'none';

    $scope.ShowHideSubMenu1 = function (menu, menu2, menuhide, menuhide1) {
        
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

});