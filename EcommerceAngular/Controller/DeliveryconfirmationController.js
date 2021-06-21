'use strict';
ScBusinez.controller('DeliveryconfirmationController', function ($scope, $http, $window) {
    
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
        $scope.AdminVariance = true;
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
    }


    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
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
    //vSettingsmenuShow1.style.display = 'none';

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
   // ee.style.display = 'none';
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
    //Single Quote validation //
    $scope.onTextBoxKeyPress = function (event) {
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();

            return false;
        }
    }
    var funPlaceholderReset = function () {
        var element = document.getElementById("thedata");
        element.className = '';
        element.innerHTML = "BookedDate";
    }

    
    $http({
        url: vUrl + "DeliveryConfirmation/GetOrderdetail",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        
        $scope.OrderDetails = response.data;
        

    }).catch(function (response) {
        
    });
    
    $scope.ShowSave = true;
    $scope.Show = false;
    $scope.cor = true;
    $scope.msg = "";
    $scope.msgStatus = "";
    var ee = document.getElementById("showLeftPush1");
   // ee.style.display = 'none';
   
    $scope.BindGrid = function () {
        $http({
            url: vUrl + "DeliveryConfirmation/GetDeliveryConfirmationdetails",
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
   
    $scope.Save = function () {
        
        $("#deliveryconfirm").attr("disabled", true);
        $scope.msg = "";
        $scope.msgStatus = "";
        var currentdate = new Date((new Date()).setHours(0, 0, 0, 0));
        var vBookedDate = $scope.DeliveryConfirm.DeliveredDate;
        var OrderDate = $scope.OrderDate;
        
        if ($scope.DeliveryConfirm.SalesOrderId == "" || $scope.DeliveryConfirm.SalesOrderId == undefined || $scope.DeliveryConfirm.SalesOrderId == null) {
            $scope.msg = 'Please select the sales order Number';
            $("#deliveryconfirm").attr("disabled", false);
            return false;
        }
        if ($scope.DeliveryConfirm.Name == "" || $scope.DeliveryConfirm.Name == undefined || $scope.DeliveryConfirm.Name == null) {
            $scope.msg = 'Please Enter the Delivery Person Name';
            $("#deliveryconfirm").attr("disabled", false);
            return false;
        }
        if ($scope.DeliveryConfirm.DeliveredDate == "" || $scope.DeliveryConfirm.DeliveredDate == undefined || $scope.DeliveryConfirm.DeliveredDate == null) {
            $scope.msg = 'Please Enter the Delivered Date';
            $("#deliveryconfirm").attr("disabled", false);
            return false;
        }
        if ($scope.DeliveryConfirm.Description == "" || $scope.DeliveryConfirm.Description == undefined || $scope.DeliveryConfirm.Description == null) {
            $scope.msg = 'Please Enter the Description';
            $("#deliveryconfirm").attr("disabled", false);
            return false;
        }
        if (vBookedDate > currentdate) {
            $scope.msg = "Please don't Choose a future date";
            $("#deliveryconfirm").attr("disabled", false);
            return false;

        }
        if (vBookedDate < OrderDate) {
            $scope.msg = 'Please choose a date in between the order date and current date';
            $("#deliveryconfirm").attr("disabled", false);
            return false;
        }

        var vdelivery = $scope.DeliveryConfirm;

        
        $http({
            url: vUrl + "DeliveryConfirmation/InsertDeliveryConfirmationdetails",
            dataType: 'json',
            method: 'POST',
            data: vdelivery,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            $scope.BindGrid();
            $scope.msgStatus = "DeliveryConfirmation details Added successfully";
            $("#deliveryconfirm").attr("disabled", false);
            $scope.DeliveryConfirm.SalesOrderId = "";
            $scope.DeliveryConfirm.DeliveredDate = "";
            $scope.DeliveryConfirm.Name = "";
            $scope.DeliveryConfirm.Description = "";
            $scope.DeliveryConfirm.DeliveredDate = "";
            $scope.DeliveryConfirm.DeliveryConfirmationId = "";
            $scope.OrderDate = "";
        }).catch(function (response) {
        });
    }
    $scope.Clear = function () {
        //
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.DeliveryConfirm.SalesOrderId = "";
        $scope.DeliveryConfirm.DeliveredDate = "";
        $scope.DeliveryConfirm.Name = "";
        $scope.DeliveryConfirm.Description = "";
        $scope.DeliveryConfirm.DeliveredDate = "";
        $scope.DeliveryConfirm.DeliveryConfirmationId = "";
        $scope.OrderDate = "";
        $scope.ShowSave = true;
        $scope.DeliveryConfirm.SalesOrderId1 = '';
        $scope.DeliveryConfirm.DeliveredDate1 = '';
        document.getElementById('showorderno').style.display = 'block';
        document.getElementById('showdate').style.display = 'block';
        $scope.Showorderno = false;
    }

    //-----------------------   Pagination Start   -----------------------------
    var vPageCount = $.session.get('GridSizeAdmin');
    //$scope.pageSize = vPageCount;
    $scope.pageSize = vPageCount;
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

    //------------Sorting---------------//
    $scope.column = 'name';

    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function (col) {
        $scope.column = col;
        if ($scope.reverse) {
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up1';
        } else {
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down1';
        }
    };
    // remove and change class
    $scope.sortClass = function (col) {
        if ($scope.column == col) {
            if ($scope.reverse) {
                return 'arrow-down1';
            } else {
                return 'arrow-up1';
            }
        } else {
            return '';
        }
    }
    $scope.Search = function () {
        
        var vdata = $scope.DeliveryConfirm.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid();
        }
    }
    var GetSearch = function (vSearch) {
        
        $http({
            url: vUrl + "DeliveryConfirmation/GetSearch",

            method: "GET",
            params: { Search: vSearch },
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
    //Export//
    $scope.ExportData = function () {
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:SubCategory>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");

        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;


        a.download = 'Delivery Confirmation.xls';
        a.click();
    };

    $scope.getsalesorderchange = function (SalesOrderId) {
        

        $scope.getorderdate(SalesOrderId);
        $http({
            url: vUrl + "DeliveryConfirmation/GetSalesorderchange",
            method: 'GET',
            params: { SalesOrderId: SalesOrderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            var result = response.data;
            if (response.data.length == 0) {
                $scope.ShowSave = true;
                $scope.DeliveryConfirm.Name = "";
                $scope.DeliveryConfirm.Description = "";
                $scope.DeliveryConfirm.OrderNo = "";
                $scope.DeliveryConfirm.DeliveredDate = "";
            }
            else {
                
                var vCourierDetailId = result["0"].DeliveryConfirmationId;
                var vSalesOrderId = result["0"].SalesOrderId;
                var vOrderNo = result["0"].OrderNo;
                var vCourierName = result["0"].Name;
                var vDescription = result["0"].Description;
                var vBookedDate = new Date(result["0"].DeliveredDate);

                $scope.DeliveryConfirm.DeliveryConfirmationId = vCourierDetailId;
                $scope.DeliveryConfirm.SalesOrderId = vSalesOrderId;
                $scope.DeliveryConfirm.OrderNo = vOrderNo;
                $scope.DeliveryConfirm.Name = vCourierName;
                $scope.DeliveryConfirm.Description = vDescription;
                $scope.DeliveryConfirm.DeliveredDate = vBookedDate;
                $scope.ShowSave = false;
            }
        }).catch(function (response) {
            //
            $scope.ShowSave = true;
        });
    }
    $scope.getorderdate = function (SalesOrderId) {
        

        $http({
            url: vUrl + "DeliveryConfirmation/GetOrderDatedetails",
            method: 'GET',
            params: { SalesOrderId: SalesOrderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            var vorderDate = response.data["0"].OrderDate;
            $scope.OrderDate = vorderDate;
            
        }).catch(function (response) {

        });
    }

 $scope.Edit = function (DeliveryConfirmationId) {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
       
        $scope.msgStatus = '';
        $scope.msg = '';
        //var vCompanyId = $.session.get('CompanyId');

        $http({
            method: "GET",
            url: vUrl + "DeliveryConfirmation/GetDeliveryConfirmationId",
            params: { DeliveryConfirmationId: DeliveryConfirmationId},
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            var result = response.data;
            
            var vName = result["0"].Name;
            var vDeliveryConfirmationId = result["0"].DeliveryConfirmationId;
            var vOrderNo = result["0"].OrderNo;
            var vDeliveredDate = result["0"].DeliveredDate; 
            var vDescription = result["0"].Description;
            document.getElementById('showorderno').style.display = 'none'; 
            document.getElementById('showdate').style.display = 'none';
            $scope.Showorderno = true;

            $scope.DeliveryConfirm = { Name: vName, SalesOrderId1: vOrderNo, DeliveredDate1: vDeliveredDate, Description: vDescription};
           // $scope.hiddenBrandId = BrandTypeId;
            $window.scrollTo(0, 0);
           
        }).catch(function (response) {
            //debugger
        });
    }

 $scope.Showorderno = false;


});







