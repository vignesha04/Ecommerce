'use strict';

ScBusinez.controller('SalesReportDetailController', function ($scope, $http, $timeout, $window) {
    
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
   // var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');
    $scope.CompanyName = $.session.get('CompanyName');
    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    //

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
    //vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    //vSettingsmenuShow.style.display = 'none';
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
    //vMenuSalMobile.style.display = 'none';

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



    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';


    $timeout(callAtTimeout,500);
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
    
    var report = $scope.report;   
    
  

    $scope.salesorderdate = function () {
        var date = new Date();
        var day = date.getDate();
        var dayseven = date.getDate() + 6;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        //
        var vFromDate, vToDate
        if ($scope.report != undefined) {
            vFromDate = $scope.report.FromDate;
            vToDate = $scope.report.ToDate;
        }
        
        

        if (vFromDate == undefined) {
            vFromDate = firstDay;
        }
        if (vToDate == undefined) {
            vToDate = firstDay;
        }


        $http({
            url: vUrl + "SalesReportDetails/GetSalesOrderDate",
            method: 'GET',         
            params: { FromDate: vFromDate, ToDate: vToDate, CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": JSON
            }

        }).then(function (Response) {
            
            $scope.report = Response.data;
            $scope.allItems = Response.data;
            $scope.sort('name');
            if ($scope.allItems.length > 0) {
                $scope.MemberName = Response.data["0"].MemberName;
                $scope.OrderNo = Response.data["0"].OrderNo;
                $scope.OrderDate = Response.data["0"].OrderDate;
                $scope.Amoount = Response.data["0"].Amoount;
                $scope.Status = Response.data["0"].Status;
                $scope.CouponCode = Response.data["0"].CouponCode;
                
            }
           
        }).catch(function (Response) {
            
        });

        
    }

 
    
  
    function callAtTimeout() {
        
        var date = new Date();
        var day = date.getDate();
        var dayseven = date.getDate() + 6;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var monthfirstday = year + "-" + month + "-" + '01';
        var monthlastday = year + "-" + month + "-" + lastDay.getDate();
        document.getElementById("FromDate").value = monthfirstday
        document.getElementById("ToDate").value = monthlastday
    }

   
    //-----------------------   Pagination Start   -----------------------------//
    var vPageCount = $.session.get('GridSizeAdmin');
    $scope.pageSize = vPageCount;
    //$scope.pageSize = 10;
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

    //-----------------------   Pagination End   -----------------------------//
    //---------------------   export funtion   ---------------------//

    $scope.exportData = function () {
        // 
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:SalesReport>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");


        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');

        a.href = url;

        //var today = new Date();
        //var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        a.download = 'SalesReport.xls';
        a.click();
    };

    //---------------------    export funtion    ---------------------//
    //---------------------------   Search Function    --------------//


    //$scope.Search = function () {
    //    
    //    var vdata = $scope.report.Search;

    //    if (vdata != undefined && vdata != null && vdata != '') {
    //        GetSearch(vdata);
    //    }
    //    else {
    //        $scope.salesorderdate();
    //    }
    //}

    //var GetSearch = function (vSearch) {

    //    var vFromDate = $scope.report.FromDate;
    //    var vToDate = $scope.report.ToDate;

       
    //    $http({          
    //        url: vUrl + "SalesReportDetails/SearchOrderDate",
    //        method: "GET",
    //        params: { Search: vSearch, FromDate: vFromDate, ToDate: vToDate ,CompanyDetailId: vCompanyId },
    //        headers: {
    //            'Content-Type': JSON
    //        }

    //    }).then(function mySuccess(response) {
    //         
    //        $scope.allItems = response.data;


    //        $scope.sort('name');
    //    }).catch(function myError(response) {
    //         
    //    });
    //};

     //-----------------------  Search Function --------------//

});