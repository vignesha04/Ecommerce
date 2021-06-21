'use strict';

ScBusinez.controller('SalesReportController', function ($scope, $http, $timeout, $window) {
    
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    $scope.CompanyName = $.session.get('CompanyName');
    
    var vInvoice = 0;
   

    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '#!home';
    }
    $scope.OrderSlip = true;
    $scope.SlipHide = false;
     vInvoice = localStorage.getItem("Invoice");
    if (vInvoice != "null") {
        $scope.OrderSlip = false;
        localStorage.setItem("Invoice", null);
        // $scope.GenarateInvoice();
        $scope.SlipHide = true;
        if (vInvoice != undefined && vInvoice != null && vInvoice != "") {
            $http({
                url: vUrl + "SalesReport/GetCompanyDetails",
                method: 'GET',
                params: { CompanyDetailId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                $scope.ShowSalesreport = true;
                $scope.ShowSalesreportmobile = true;

                var vCompanyDetails = Response.data;
                
                $scope.CompanyName = Response.data["0"].CompanyName;
                $scope.GSTNo = Response.data["0"].GSTNo;
                $scope.CINno = Response.data["0"].CINno;
                $scope.InvoiceLogo = Response.data["0"].InvoiceLogo;
                $scope.EmailId = Response.data["0"].EmailId;
                $scope.PhoneNo = Response.data["0"].PhoneNo;
                $scope.AddressLine1 = Response.data["0"].AddressLine1;
                $scope.AddressLine2 = Response.data["0"].AddressLine2;
                $scope.City = Response.data["0"].City;
                $scope.State = Response.data["0"].State;
                $scope.Country = Response.data["0"].Country;
                $scope.PinCode = Response.data["0"].PinCode;
                //$scope.EmailId = Response.data["0"].EmailId;
                //$scope.PhoneNo = Response.data["0"].PhoneNo;
            }).catch(function (response) {
                
                });
            $http({

                url: vUrl + "SalesReport/GetTermsandContionInvoice",
                method: 'GET',
                params: { CompanyDetailId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                
                $scope.salesinvoice = Response.data
                
                $scope.InvoiceTermsAndCondition = Response.data["0"].InvoiceTermsAndCondition;
            }).catch(function (response) {
                
            });

            $http({
                url: vUrl + "SalesReport/GetSalesReportDetails",
                method: 'GET',
                params: { SalesOrderId: vInvoice, CompanyDetailId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                $scope.SalOrderItem = Response.data["0"].OrderItems;
                $scope.ShowPrint = true;
                
                $scope.MemberName = Response.data["0"].DeliveryName;
                $scope.DeliveryContactNo = Response.data["0"].DeliveryContactNo;
                $scope.DeliveryAddressLine1 = Response.data["0"].DeliveryAddressLine1;
                $scope.DeliveryAddressLine2 = Response.data["0"].DeliveryAddressLine2;
                $scope.DeliveryCity = Response.data["0"].DeliveryCity;
                $scope.DeliveryState = Response.data["0"].DeliveryState;
                $scope.DeliveryPinCode = Response.data["0"].DeliveryPinCode;
                $scope.DeliveryEmail = Response.data["0"].DeliveryEmail;
                $scope.OrderNo = Response.data["0"].OrderNo;
                $scope.OrderDate = Response.data["0"].OrderDate;
                $scope.Amoount = Response.data["0"].Amoount; 
                $scope.OrderDeliveryCharge = Response.data["0"].OrderDeliveryCharge;

            }).catch(function (response) {
                
            });
        }
    }


    $scope.Backto = function () {
        window.location.href = "#!SalOrder";
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
   // vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
   // vmenuShow.style.display = 'none';
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
   // vmenuDisShow1.style.display = 'none';

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

    
    $scope.ShowPrint = false;
    $scope.ShowSalesreport = false;
    $scope.ShowSalesreportmobile = false;
  
    var report = $scope.report;

    $scope.salesorderdate = function () {
        
        var vFromDate = $scope.report.FromDate;
        var vToDate = $scope.report.ToDate;

        var date = new Date();
        var day = date.getDate();
        var dayseven = date.getDate() + 6;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        if (vFromDate == undefined) {
            vFromDate = firstDay;
        }
        if (vToDate == undefined) {
            vToDate = firstDay;
        }

        if (vFromDate > vToDate) {
            $scope.msg = SalesReportMessages(1);// " Please Enter ToDate date should be greater than validfrom date";
            return false;
        }

        $http({
            url: vUrl +"SalesReport/GetOrderNoByDate",
            method: 'GET',
          //  data: vreport,
            params: { FromDate: vFromDate, ToDate: vToDate, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (Response) {
            $scope.salOrderNo = Response.data;
            
            $timeout(callAtTimeout, 500);
            $scope.msg = false;
            $scope.msg = "";

        }).catch(function (response) {
            
        });
    }

    $http({
        url: vUrl + "IndexPage/GetSiteSettingConfiguration",
        method: 'GET',
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        
        var vResult = response.data;
        $scope.CurrencyType = vResult["0"].CurrencyType;
        vGridSizeClient = vResult["0"].GridSizeClient;
        $scope.CurrencyType = vCurrencyType;
    }).catch(function (response) {
    });
    $http({
        url: vUrl + "SalesInvoice/GetDiscountDetails",
        method: "GET",
        headers: {
            'Content-Type': JSON
        }

    }).then(function mySuccess(response) {

        var result = response.data;
        var Discount = result["0"].DiscountApplicable;
        if (Discount == "1") {
            $scope.Discountshow = true;
        }
        else {
            $scope.Discountshow = false;
        }
        var Coupon = result["0"].CouponApplicable;
        if (Coupon == "1") {
            $scope.Couponshow = true;
        }
        else {
            $scope.Couponshow = false;
        }
        var Tax = result["0"].FacebookSignup;
        if (Tax == "1") {
            $scope.Taxshow = true;
        }
        else {
            $scope.Taxshow = false;
        }
    }).then(function myError(response) {

    });

    $scope.GenarateInvoice = function () {
        
        var vSalId = $scope.report.SalesOrderId;
        if (vSalId != undefined && vSalId != null && vSalId != "") {
            $http({
                url: vUrl + "SalesReport/GetCompanyDetails",
                method: 'GET',
                params: { CompanyDetailId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                $scope.ShowSalesreport = true;
                $scope.ShowSalesreportmobile = true;
               
                var vCompanyDetails = Response.data;
                
                $scope.CompanyName = Response.data["0"].CompanyName;
                $scope.GSTNo = Response.data["0"].GSTNo;
                $scope.CINno = Response.data["0"].CINno;
                $scope.InvoiceLogo = Response.data["0"].InvoiceLogo;
                $scope.EmailId = Response.data["0"].EmailId;
                $scope.PhoneNo = Response.data["0"].PhoneNo;
            }).catch(function (response) {
                
                });
            
                $http({

                url: vUrl + "SalesReport/GetTermsandContionInvoice",
                method: 'GET',
                params: { CompanyDetailId: vCompanyId},
                headers: {
                    "Content-Type": JSON
                }

                }).then(function (Response) {
                    
                $scope.salesinvoice = Response.data
                
                $scope.InvoiceTermsAndCondition = Response.data["0"].InvoiceTermsAndCondition;
            }).catch(function (response) {
                
                });

            $http({
                url: vUrl + "SalesReport/GetSalesReportDetails",
                method: 'GET',
                params: { SalesOrderId: vSalId, CompanyDetailId: vCompanyId},
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                $scope.SalOrderItem = Response.data["0"].OrderItems;
                $scope.ShowPrint = true;
                
                $scope.MemberName = Response.data["0"].MemberName;
                $scope.DeliveryContactNo = Response.data["0"].DeliveryContactNo;
                $scope.DeliveryAddressLine1 = Response.data["0"].DeliveryAddressLine1;
                $scope.DeliveryAddressLine2 = Response.data["0"].DeliveryAddressLine2;
                $scope.DeliveryCity = Response.data["0"].DeliveryCity;
                $scope.DeliveryState = Response.data["0"].DeliveryState;
                $scope.DeliveryPinCode = Response.data["0"].DeliveryPinCode;
                $scope.DeliveryEmail = Response.data["0"].DeliveryEmail;
                $scope.OrderNo = Response.data["0"].OrderNo;
                $scope.OrderDate = Response.data["0"].OrderDate;
                $scope.Amoount = Response.data["0"].Amoount;

            }).catch(function (response) {
                
            });
        }
        else {
        }
    }
  
    //Print button click
    $scope.printPage = function (id) {
        var html = "<html>";
        html += document.getElementById(id).innerHTML;
        html += "</html>";
        var printWin = window.open('width=100,height=100');
        printWin.document.write(html);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
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
});