'use strict';

ScBusinez.controller('BarcodeController', function ($scope, $http, $window, $timeout) {
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    //var vUrl = $scope.SubDomain;
    //$scope.Domain = $.session.get('Domain');
     //var vUrl = "http://localhost:56397/api/";
    var vUrl = $scope.SubDomain;
    $window.scrollTo(0, 0);

    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    $scope.CompanyName = $.session.get('CompanyName');

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
    
    
    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.Categ = true;
    $scope.Inactive = true;
    $scope.Active = false;

    

    var vCompanyId = $.session.get('CompanyId');

    var BindProductDdlEdit = function (vProductId) {
        $http({
            url: vUrl + "CouponDetails/GetProducts",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            debugger;

            $scope.allItems = response.data;
            $scope.sort('name');

        }).catch(function (response) {

        });
    }

    BindProductDdlEdit(1);

    $scope.Search = function () {
        debugger;
        var vdata = $scope.Barcode.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            BindProductDdlEdit(1);
        }
    }
    var GetSearch = function (vSearch) {
        debugger;

        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;


        $http({
            url: vUrl + "Barcode/GetProductSearch",
            method: "GET",
            params: { Search: vSearch, Status: vStatus, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            debugger;
            if (response.data.length != 0)//----Condition given to clear the search box when it is empty----//
                $scope.data = response.data;


            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {

        });
    }


    var vCompanyId = $.session.get('CompanyId');

    

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


    $scope.InActiveclick = function () {
        //
        $scope.BindGrid(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
        // 
        $scope.BindGrid(1);
        $scope.Inactive = true;
        $scope.Active = false;
    }

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

    

  
    $scope.PrintBarcode = function (ProductVarianceId) {
        debugger;
            //var barcodeValue = document.getElementById("barcodeValue").value;
           // var barcodeType = document.getElementById("barcodeType").value; 
            var barcodeType = "code128";
            //var showText = "";
            JsBarcode("#barcode", ProductVarianceId, {
                format: barcodeType,
                //displayValue: hidetext,
                lineColor: "#24292e",
                width: 2,
                height: 40,
                fontSize: 20
            });

            $timeout(function () {
                var html = "<html>";
                html += document.getElementById("BarcodePrint").innerHTML;
                html += "</html>";
                var printWin = window.open('width=100,height=100');
                printWin.document.write(html);
                printWin.document.close();
                printWin.focus();
                printWin.print();
                printWin.close();

            }, 1000);
        }
   
   // generateBarcode();
  

    
});
