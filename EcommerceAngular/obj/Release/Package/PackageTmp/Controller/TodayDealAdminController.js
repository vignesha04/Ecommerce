'use strict';

ScBusinez.controller('TodayDealAdminController', function ($scope, $http, $timeout, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    

    $window.scrollTo(0, 0);
    $scope.CompanyName = $.session.get('CompanyName');
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');

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

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

    var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    //vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
   // vSettingsmenuShow.style.display = 'none';
    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
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
    var vmenuShow1 = document.getElementById("menuShow1");
    //vmenuShow1.style.display = 'none';

    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
   // vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
   // vMenuSalMobile.style.display = 'none';

    var vmenuDisShow1 = document.getElementById("menuDisShow1");
    //vmenuDisShow1.style.display = 'none';

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

    $scope.showprice = false;
    $scope.msg = "";
    $scope.msgStatus = "";

    $http({
        url: vUrl + "Todaydeal/GetCategoryDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        
        $scope.CategoryDetails = response.data;
    }).catch(function (response) {
    });
   
    $scope.ddlCatChange = function (CategoryId) {
        $http({
            url: vUrl + "Todaydeal/GetSubCategoryDetails",
            method: 'GET',
            params: { CategoryId: CategoryId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.SubCategoryDetails = response.data;
        }).catch(function (response) {
        });
    }

    $scope.ddlSubCatChange = function (SubCategoryId) {
        
        $http({
            url: vUrl + "Todaydeal/GetProductDetails",
            method: 'GET',
            params: { SubCategoryId: SubCategoryId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.ProductDetails = response.data;
        }).catch(function (response) {

        });
    }

    $scope.BindGrid = function () {
        
        $http({
            url: vUrl + "Todaydeal/GetTodaydealdetails",
            method: 'GET',
            params: { CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function (response) {
            //
        });
    }
    $scope.BindGrid();
    
    $scope.Save = function () {
        
        $("#Todaydealsave").attr("disabled", true);
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.TodayDeal.CategoryId == "" || $scope.TodayDeal.CategoryId == undefined || $scope.TodayDeal.CategoryId == null) {
            $scope.msg = 'Please Select the Category';
            $("#Todaydealsave").attr("disabled", false);
            return false;
        }
        if ($scope.TodayDeal.SubCategoryId == "" || $scope.TodayDeal.SubCategoryId == undefined || $scope.TodayDeal.SubCategoryId == null) {
            $scope.msg = 'Please Select the SubCategory';
            $("#Todaydealsave").attr("disabled", false);
            return false;
        }
        if ($scope.TodayDeal.ProductId == "" || $scope.TodayDeal.ProductId == undefined || $scope.TodayDeal.ProductId == null) {
            $scope.msg = 'Please Select the Product';
            $("#Todaydealsave").attr("disabled", false);
            return false;
        }
        if ($scope.TodayDeal.Date == "" || $scope.TodayDeal.Date == undefined || $scope.TodayDeal.Date == null) {
            $scope.msg = 'Please Select the Date';
            $("#Todaydealsave").attr("disabled", false);
            return false;
        }

        var vtoday = new Date();
        vtoday.setDate(vtoday.getDate() - 1);
        var vdate = $scope.TodayDeal.Date;
        if (vdate < vtoday) {
            $scope.msg = 'Please Select the Date should be greater than Current Date';
            $("#Todaydealsave").attr("disabled", false);
            return false;
        }
        
        if ($scope.TodayDeal.TodayDiscountAmount == "" || $scope.TodayDeal.TodayDiscountAmount == undefined || $scope.TodayDeal.TodayDiscountAmount == null) {
            $scope.msg = 'Please Enter the Discount Amount between 0 to 100 percentage';
            $("#Todaydealsave").attr("disabled", false);
            return false;
        }
        
        var todaydeal = $scope.TodayDeal;

        $http({
            url: vUrl + "Todaydeal/InsertTodaydealdetails",
            dataType: 'json',
            method: 'POST',
            params: { CompanyDetailId: vCompanyId },
            data: todaydeal,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
                  
            $scope.msgStatus = 'TodayDeal Added Successfully';
            $("#Todaydealsave").attr("disabled", false);
            $scope.BindGrid();
            $scope.TodayDeal.CategoryId = "";
            $scope.TodayDeal.SubCategoryId = "";
            $scope.TodayDeal.ProductId = "";
            $scope.TodayDeal.Date = "";
            $scope.showprice = false;
        }).catch(function (response) {
            //
        });
    }
   
    //--------export code----------

    $scope.exportData = function () {
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Product Stock>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Today Deal.xls';
        a.click();
    };

    $scope.Search = function () {
        
        var vdata = $scope.TodayDeal.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid();
        }
    }

    var GetSearch = function (vSearch) {
        
        $scope.msg = "";
        $scope.msgStatus = "";
        $http({
            url: vUrl + "Todaydeal/GetSearch",
            method: "GET",
            params: { Search: vSearch, CompanyDetailId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {
            //
        });
    };

    $scope.Clear = function () {
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.TodayDeal.CategoryId = "";
        $scope.TodayDeal.SubCategoryId = "";
        $scope.TodayDeal.ProductId = "";
        $scope.TodayDeal.Date = "";
    }

    // -----------------------   Pagination Start   -----------------------------

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

    // -----------------------   Pagination End   -----------------------------

});