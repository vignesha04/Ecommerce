'use strict';

ScBusinez.controller('DeliveryChargesController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);

    $scope.CompanyName = $.session.get('CompanyName');
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
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

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vCompanyId = $.session.get('CompanyId');

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
   
    

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.ShowActive = false;
    $scope.Inactive = true;
    $scope.Active = false;


  $http({
        url: vUrl + "DashBoardAdmin/GetSiteSettingConfiguration",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        var vResult = response.data;
        var vCurrencyType = vResult["0"].CurrencyType;
        var vGridSizeClient = vResult["0"].GridSizeClient;

        //$.session.set('CurrencyType', vResult["0"].vCurrencyType);
        //$.session.set('GridSizeClient', vResult["0"].vGridSizeClient);

        $scope.CurrencyType = vCurrencyType;
    }).catch(function (response) {

        });


   

    $scope.onTextBoxKeyPress = function (event) {

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    $scope.Save = function () {
        
        
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Delivery.Fromprice == "" || $scope.Delivery.Fromprice == undefined || $scope.Delivery.Fromprice == null) {
            $scope.msg = 'Please Enter the From Price';
            return false;
        }
		 if ($scope.Delivery.Toprice == "" || $scope.Delivery.Toprice == undefined || $scope.Delivery.Toprice == null) {
            $scope.msg = 'Please Enter the To Price';
            return false;
        }
        if ($scope.Delivery.Price == "" || $scope.Delivery.Price == undefined || $scope.Delivery.Price == null) {
            $scope.msg = DeliveryChargesMessages(3); //'Please Enter the Price';
            return false;
         }

        var vFromprice = $scope.Delivery.Fromprice;
        var vToprice = $scope.Delivery.Toprice;
        if (vFromprice == vToprice){

            $scope.msg = 'From Price & To Price Could Not same ';
            return false;
        }
        if (vFromprice > vToprice) {
            
            $scope.msg = 'From Price Could not lesser than  ToPrice';
            return false;
        }

        var DelChrg = $scope.Delivery;
        //if ($scope.Delivery.IsActive == true) {
        //    $scope.Delivery.IsActive = 1;
        //}
        //else
        //    $scope.Delivery.IsActive = 0;
        $scope.Delivery.IsActive = 1;
        $http({
            url: vUrl + "Delivery/InsertDeliveryChargeDetails",
            dataType: 'json',
            method: 'POST',
            data: DelChrg,
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = "For this From Order value Amount Delivery Charge is Already Applied";
            }
            else {

                $scope.BindDeliveryChargeGrid(1);

                $scope.Delivery.Percentage = parseFloat(parseFloat(10 * 2).toFixed(2));
                $scope.msgStatus = DeliveryChargesMessages(1); //'DeliveryCharges Added Successfully';
                $scope.Delivery.Qty = "";
                $scope.Delivery.Price = "";
                $scope.Delivery.Fromprice = "";
                $scope.Delivery.Toprice = "";
                $scope.Inactive = true;
                $scope.Active = false;
            }

        }).catch(function (response) {
        });
    }

    $scope.Edit = function (DeliveryId, Fromprice,toprice, Price, IsActive) {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.ShowActive = true;

        $scope.msgStatus = '';
        $scope.msg = '';
        var vActive = true;
        if (IsActive == "InActive")
            vActive = false;
        $scope.Delivery = {
            Fromprice: Fromprice,Toprice:toprice, Price: Price, IsActive: vActive, hiddenDeliveryChargeId: DeliveryId};
    }
    $scope.Update = function () {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;

        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Delivery.Fromprice == "" || $scope.Delivery.Fromprice == undefined || $scope.Delivery.Fromprice == null) {
            $scope.msg = "Please Enter the From Price";
            return false;
        }
        if ($scope.Delivery.Toprice == "" || $scope.Delivery.Toprice == undefined || $scope.Delivery.Toprice == null) {
            $scope.msg = 'Please Enter the To Price';
            return false;
        }
		 if ($scope.Delivery.Price == "" || $scope.Delivery.Price == undefined || $scope.Delivery.Price == null) {
            $scope.msg = 'Please Enter the To Delivery Charge';
            return false;
        }

         var vFromprice = $scope.Delivery.Fromprice;
         var vToprice = $scope.Delivery.Toprice;
         if (vFromprice == vToprice) {

             $scope.msg = 'From Price & To Price Could Not same ';
             return false;
         }

         if (vFromprice > vToprice) {
             
             $scope.msg = 'From Price Could not lesser than ToPrice';
             return false;
         }
        var vDelId = $scope.Delivery.hiddenDeliveryChargeId;

        var Delivery = $scope.Delivery;

        $http({
            url: vUrl + "Delivery/UpdateDeliveryChargeDetails",
            dataType: 'json',
            method: 'POST',
            data: Delivery,
            params: { DeliveryId: vDelId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            
            // $scope.TaxDetail = response.data;
            $scope.BindDeliveryChargeGrid(1);
            $scope.msgStatus = DeliveryChargesMessages(4);// 'DeliveryCharges Updated Successfully';
           
            $scope.ShowActive = false;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.Delivery.hiddenDeliveryChargeId = "";
            $scope.Delivery.Qty = "";
            $scope.Delivery.Price = "";
            $scope.Delivery.IsActive = "";
            $scope.Inactive = true;
            $scope.Active = false;
            $scope.Delivery.Fromprice = "";
            $scope.Delivery.Toprice = "";
        });
    }


    $scope.Clear = function () {
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Delivery.Qty = "";
        $scope.Delivery.Price = "";
        $scope.Delivery.hiddenDeliveryChargeId = "";
        $scope.Delivery.Status = "";
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.ShowActive = false;
        $scope.Delivery.IsActive = "";
        $scope.Inactive = true;
        $scope.Active = false;
        $scope.Delivery.Fromprice = "";
        $scope.Delivery.Toprice = "";
    }

    $scope.InActiveclick = function () {
        $scope.BindDeliveryChargeGrid(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
        $scope.BindDeliveryChargeGrid(1);
        $scope.Inactive = true;
        $scope.Active = false;
    }

    $scope.exportData = function () {
       
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:TaxDetails>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");

        //var filters = $('.ng-table-filters').remove();
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        // $('.ng-table-sort-header').after(filters);
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;

        //var today = new Date();
        //var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        a.download = 'DeliveryCharges.xls';
        a.click();
    };

    $scope.BindDeliveryChargeGrid = function (Active) {

        
        $http({
            url: vUrl + "Delivery/GetDeliveryChargeDetails",
            method: 'GET',
            params: { iActive: Active, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function (response) {
        });
    }
    $scope.BindDeliveryChargeGrid(1);

    $scope.Search = function () {
       
        var vdata = $scope.Delivery.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindDeliveryChargeGrid(1);
        }
    }

    var GetSearch = function (vSearch) {
       
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl + "Delivery/GetSearchResult",
            method: "GET",
            params: { Search: vSearch, Status: vStatus, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            
            $scope.data = response.data;
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {
            
        });
    };



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


    // -----------------------   Pagination Start   -----------------------------

    var vPageCount = $.session.get('GridSizeAdmin');
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

   // -----------------------   Pagination End   -----------------------------
});