'use strict';

ScBusinez.controller('StockManagementController', function ($scope, $http, $timeout, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);

    //$('#editable-select').editableSelect();

    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }
    $scope.CompanyName = $.session.get('CompanyName');
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
        $scope.UserVariance = true;
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
    }

    $http({
        url: vUrl + "ProductVariance/UserCount",
        method: "Get",
        params: { UserId: vAdminId },
        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {
        var UserDetails = response.data.length;
        $scope.VarianceCount = UserDetails;
       
    }).catch(function (response) {
    });

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

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';
    //End//////////////////////////////////


    //
    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.editviewprice = false;

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
    //Get Category Details From DataBase and Bind it in DropDownlist
    $http({
        url: vUrl + "ProductStock/GetCategoryDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId},
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        
        $scope.CategoryDetails = response.data;

    }).catch(function (response) {
    });

    //Get SubCategory Details From DataBase and Bind it in DropDownlist
    $scope.ddlCatChange = function (CategoryId) {
        
        $http({
            url: vUrl + "ProductStock/GetSubCategoryDetails",
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
    //Get Product Details From DataBase and Bind it in DropDownlist

    $scope.ddlSubCatChange = function (SubCategoryId) {
        
        $http({
            url: vUrl + "ProductStock/GetProductDetails",
            method: 'GET',
            params: { SubCategoryId: SubCategoryId, CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.ProductDetails = response.data;
        }).catch(function (response) {

        });
    }

    //Get Product Stock From DataBase and Bind it in DropDownlist
    
    $scope.ddlProvarrianceChange = function (ProductVarianceId) {
        
        $http({
            url: vUrl + "ProductStock/GetProductStocks",
            method: 'GET',
            params: { ProductvarianceId: ProductVarianceId},
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            if (response.data.length != 0) {
                var result = response.data;
                $scope.ShowSave = false;
                $scope.ShowUpdate = true;
                //
                var vStockCount = result["0"].StockCount;
                var vStockId = result["0"].StockId;
                var vShowToUser = result["0"].ShowToUser;
                var vShowIfNoStock = result["0"].ShowIfNoStock;

                $scope.ProductStock.HiddenStockId = vStockId;
                $scope.ProductStock.StockCount = vStockCount;

                if (vShowToUser == 1)
                    $scope.count.user = true;
                else
                    $scope.count.user = false;

                if (vShowIfNoStock == 1)
                    $scope.Out.stock = true;
                else
                    $scope.Out.stock = false;
            }
            else {
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
                $scope.ProductStock.StockCount = "";
            }
            
        }).catch(function (response) {

        });
    }

    $scope.ddlProChange = function (ProductId) {
        
        $http({
            url: vUrl + "ProductStock/GetProductvariancedetails",
            method: 'GET',
            params: { ProductId: ProductId},
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.Productvariancedetails = response.data;

        }).catch(function (response) {

        });
    }

    var BindProductInEditTime = function (SubCategoryId, vProductId, vProductVarianceId) {
        
        $http({
            url: vUrl + "ProductStock/GetProductDetails",
            method: 'GET',
            params: { SubCategoryId: SubCategoryId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.ProductDetails = response.data;

            $timeout(function () {
                
                $scope.ProductStock.ProductId = vProductId;
                BindProductVarianceEditTime(vProductId, vProductVarianceId);
            }, 200);
            
           
            }).catch(function (response) {
                //
        });
    }

    var BindProductVarianceEditTime = function (vProductId, vProductVarianceId) {
        
        $http({
            url: vUrl + "ProductStock/GetProductvariancedetails",
            method: 'GET',
            params: { ProductId: vProductId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.Productvariancedetails = response.data;
            $timeout(function () {
                $scope.ProductStock.ProductVarianceId = "";
                
                $timeout(function () {
                    $scope.ProductStock.ProductVarianceId = vProductVarianceId;
                }, 200);
            }, 200);
        }).catch(function (response) {
            //
        });
    }
    //Get Function

    $scope.BindGrid = function () {
        
        $http({
            url: vUrl + "ProductStock/GetProductInStock",
            method: 'GET',
            params:{ CompanyDetailId: vCompanyId},
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
    $scope.BindGridOutstock = function () {
        
        $http({
            url: vUrl + "ProductStock/GetProductOutStock",
            method: 'GET',
            params: { CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            

            $scope.allItems1 = response.data;
            $scope.sort1('name');
        }).catch(function (response) {
            //
        });
    }

    $scope.BindGridOutstock();

    var BindSubCatEditTime = function (CategoryId, SubCategoryId, vProductId, vProductVarianceId) {
        
        $http({
            url: vUrl + "ProductStock/GetSubCategoryDetails",
            method: 'GET',
            params: { CategoryId: CategoryId, CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            
            $scope.SubCategoryDetails = response.data;

            $timeout(function () {
                $scope.ProductStock.SubCategoryId = SubCategoryId;
            }, 200);
            BindProductInEditTime(SubCategoryId, vProductId, vProductVarianceId);

        }).catch(function (response) {
        });
    }

    //Save Function
    $scope.Save = function () {
        
        $("#stocksave").attr("disabled", true);
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.editviewprice = false;
        
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.ProductStock.CategoryId == "" || $scope.ProductStock.CategoryId == undefined || $scope.ProductStock.CategoryId == null) {
            $scope.msg = StockManagementMessages(1);// 'Please Select the Category'
            $("#stocksave").attr("disabled", false);
            return false;
        }
        if ($scope.ProductStock.SubCategoryId == "" || $scope.ProductStock.SubCategoryId == undefined || $scope.ProductStock.SubCategoryId == null) {
            $scope.msg = StockManagementMessages(2);// 'Please Select the SubCategory'
            $("#stocksave").attr("disabled", false);
            return false;
        }
        if ($scope.ProductStock.ProductId == "" || $scope.ProductStock.ProductId == undefined || $scope.ProductStock.ProductId == null) {
            $scope.msg = StockManagementMessages(3);// 'Please Select the Product'
            return false;
        }
        if ($scope.ProductStock.ProductVarianceId == "" || $scope.ProductStock.ProductVarianceId == undefined || $scope.ProductStock.ProductVarianceId == null) {
            $scope.msg = 'Please Select the Product Variance'
            $("#stocksave").attr("disabled", false);
            return false;
        }

        if ($scope.ProductStock.StockCount == "" || $scope.ProductStock.StockCount == undefined || $scope.ProductStock.StockCount == null) {
            $scope.msg = StockManagementMessages(4);// 'Please Enter the StockCount'
            $("#stocksave").attr("disabled", false);
            return false;
        }

        if ($scope.ProductStock.user == true) {
            $scope.ProductStock.ShowToUser = 1;
        }
        else {
            $scope.ProductStock.ShowToUser = 0;
        }

        if ($scope.ProductStock.stock == true) {
            $scope.ProductStock.ShowIfNoStock = 1;
        }
        else {
            $scope.ProductStock.ShowIfNoStock = 0;
        }

        var ProductStock = $scope.ProductStock;

        $http({
            url: vUrl + "ProductStock/InsertProductStocks",
            dataType: 'json',
            method: 'POST',
            params:{ CompanyDetailId: vCompanyId},
            data: ProductStock,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
                  
            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msgStatus = StockManagementMessages(5);// "product is already exist"
                $("#stocksave").attr("disabled", false);
            }
            else {
                $scope.msgStatus = StockManagementMessages(6);// 'Inserted ProductStock successfully'

                $("#stocksave").attr("disabled", false);
                $scope.BindGrid();
                $scope.BindGridOutstock();
                $scope.ProductStock.CategoryId = "";
                $scope.ProductStock.SubCategoryId = "";
                $scope.ProductStock.ProductId = "";
                $scope.ProductStock.StockCount = "";
                $scope.ProductStock.ProductVarianceId = "";
                $scope.ProductStock.user = "";
                $scope.ProductStock.stock = "";
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
            }
            
        }).catch(function (response) {
            //
            });
    }

    //EDIT FUNCTION 
    $scope.Edit = function (StockId) {
        

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.Desc = false;
        $scope.editviewprice = true;

        $scope.msgStatus = '';
        $scope.msg = '';

        $http({
            method: "GET",
            url: vUrl + "ProductStock/GetProductStockAdminbyId",
            params: { StockId: StockId, CompanyDetailId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            var result = response.data;
            if (response.data.length != 0) {
                $scope.ShowSave = false;
                $scope.ShowUpdate = true;
                $scope.editviewprice = true;
                var vCategoryId = result["0"].CategoryId;
                var vCategoyName = result["0"].CategoyName;
                var vSubCategoryId = result["0"].SubCategoryId;
                var SubCategoryName = result["0"].SubCategoryName;
                var vProductId = result["0"].ProductId;
                var vProductTitle = result["0"].ProductTitle
                var vStockCount = result["0"].StockCount;
                var vStockId = result["0"].StockId;
                var vShowToUser = result["0"].ShowToUser;
                var vShowIfNoStock = result["0"].ShowIfNoStock;
                var vProductVarianceId = result["0"].ProductVarianceId;
                var vVariancePrice = result["0"].VariancePrice;
                var vsellingPrice = result["0"].sellingPrice;

                $scope.ProductStock.ProductVarianceId = vProductVarianceId;
                $scope.ProductStock.CategoryId = vCategoryId;
                $scope.ProductStock.StockCount = vStockCount;
                $scope.ProductStock.VariancePrice = vVariancePrice;
                $scope.ProductStock.sellingPrice = vsellingPrice;
                $scope.ProductStock.HiddenStockId = vStockId;

                var vShowToUser1 = false, vShowIfNoStock1 = false;
                if (vShowToUser == "1")
                    vShowToUser1 = true;
                if (vShowIfNoStock == "1")
                    vShowIfNoStock1 = true;
                $scope.ProductStock.user = vShowToUser1;
                $scope.ProductStock.stock = vShowIfNoStock1;
                BindSubCatEditTime(vCategoryId, vSubCategoryId, vProductId, vProductVarianceId);
                $window.scrollTo(0, 0);
            }
        }).catch(function (response) {
        });
    }

    //Update
    $scope.Update = function () {
        
        $("#stockupdate").attr("disabled", true);
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.editviewprice = true;
        $scope.Show = true;
        $scope.msg = "";
        $scope.msgStatus = "";

        if ($scope.ProductStock.CategoryId == "" || $scope.ProductStock.CategoryId == undefined || $scope.ProductStock.CategoryId == null) {
            $scope.msg = StockManagementMessages(1);// "Please Select the CategoryId"
            $("#stockupdate").attr("disabled", false);
            return false;
        }
        if ($scope.ProductStock.SubCategoryId == "" || $scope.ProductStock.SubCategoryId == undefined || $scope.ProductStock.SubCategoryId == null) {
            $scope.msg = StockManagementMessages(2);// "Please Select the SubCategoryId"

            $("#stockupdate").attr("disabled", false);
            return false;
        }
        if ($scope.ProductStock.ProductId == "" || $scope.ProductStock.ProductId == undefined || $scope.ProductStock.ProductId == null) {
            $scope.msg = StockManagementMessages(3);// "Please Select the ProductId"
            return false;
        }
        if ($scope.ProductStock.ProductVarianceId == "" || $scope.ProductStock.ProductVarianceId == undefined || $scope.ProductStock.ProductVarianceId == null) {
            $scope.msg = 'Please Select the Product Variance'
            $("#stockupdate").attr("disabled", false);
            return false;
        }
        if ($scope.ProductStock.StockCount == "" && $scope.ProductStock.StockCount == undefined && $scope.ProductStock.StockCount == null && $scope.ProductStock.StockCount != 0) {
            $scope.msg = StockManagementMessages(4);// "Please Enter the StockCount"
            $("#stockupdate").attr("disabled", false);
            return false;
        }
        //if ($scope.ProductStock.VariancePrice == "" || $scope.ProductStock.VariancePrice == undefined || $scope.ProductStock.VariancePrice == null || $scope.ProductStock.VariancePrice == "0") {
        //    $scope.msg = "Please Enter the Variance Price"
        //    return false;
        //}
        //if ($scope.ProductStock.sellingPrice == "" || $scope.ProductStock.sellingPrice == undefined || $scope.ProductStock.sellingPrice == null || $scope.ProductStock.sellingPrice == "0") {
        //    $scope.msg = StockManagementMessages(4);// "Please Enter the StockCount"
        //    return false;
        //}

        //var vVariancePrice = $scope.ProductStock.VariancePrice;
        //var vsellingPrice = $scope.ProductStock.sellingPrice;

        //if (vVariancePrice < vsellingPrice) {
        //    $scope.msg = 'sellingPrice should be less than or equal VariancePrice';
        //    return false;
        //}

        if ($scope.ProductStock.user == true) {
            $scope.ProductStock.ShowToUser = 1;
        }
        else {
            $scope.ProductStock.ShowToUser = 0;
        }

        if ($scope.ProductStock.stock == true) {
            $scope.ProductStock.ShowIfNoStock = 1;
        }
        else {
            $scope.ProductStock.ShowIfNoStock = 0;
        }

        var vStocId = $scope.ProductStock.HiddenStockId;
        var ProductStock = $scope.ProductStock;
        //var vsellingprice = $scope.ProductStock.sellingPrice;
        //var vvariancprice = $scope.ProductStock.VariancePrice;

        $http({
            url: vUrl + "ProductStock/UpdateProductStock",
            dataType: 'json',
            method: 'POST',
            data: ProductStock,
            params: { StockId: vStocId, CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            $scope.msgStatus = StockManagementMessages(7);// "Updated ProductStock Successfully"
            $scope.BindGrid();
            $scope.BindGridOutstock();
            $scope.sub = true;
            $scope.Show = false;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $("#stockupdate").attr("disabled", false);
            $scope.editviewprice = false;
            $scope.ProductStock.ProductId = "";
            $scope.ProductStock.StockCount = "";
            $scope.ProductStock.CategoryId = "";
            $scope.ProductStock.SubCategoryId = "";
            $scope.ProductStock.ProductVarianceId = "";
            $scope.ProductStock.sellingPrice = "";
            $scope.ProductStock.VariancePrice = "";
            $scope.ProductStock.user = "";
            $scope.ProductStock.stock = "";
            
        });
    }

    //--------export code----------

    $scope.exportData = function () {
        //
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Product Stock>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
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

        a.download = 'Product Stock.xls';
        a.click();
    };

    $scope.Search = function () {
        //
        var vdata = $scope.ProductStock.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid();
        }
    }

    var GetSearch = function (vSearch) {
       // 
        $http({
            url: vUrl + "ProductStock/GetSearch",
            method: "GET",
            params: { Search: vSearch, CompanyDetailId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            //
            $scope.data = response.data;
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {
            //
        });
    };


    $scope.Searchstock = function () {
        //
        var vdata = $scope.ProductStock.Search1;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch1(vdata);
        }
        else {
            $scope.BindGridOutstock();
        }
    }

    var GetSearch1 = function (vSearch) {
        // 
        $http({
            url: vUrl + "ProductStock/GetSearch",
            method: "GET",
            params: { Search: vSearch, CompanyDetailId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            //
            $scope.data = response.data;
            $scope.allItems1 = response.data;
            $scope.sort1('name');
        }).catch(function myError(response) {
            //
        });
    };

    $scope.Clear = function () {
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.ProductStock.hiddenStockId = "";
        $scope.ProductStock.CategoryId = "";
        $scope.ProductStock.SubCategoryId = "";
        $scope.ProductStock.ProductVarianceId = "";
        $scope.ProductStock.sellingPrice = "";
        $scope.ProductStock.VariancePrice = "";
        $scope.ProductStock.ProductId = "";
        $scope.ProductStock.StockCount = "";
        $scope.ProductStock.Status = "";
        $scope.ProductStock.user = "";
        $scope.ProductStock.stock = "";
       
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.Desc = true;
        $scope.editviewprice = false;
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

    // -----------------------   Pagination2 Start   -----------------------------

    $scope.pageSize1 = 10;
    $scope.reverse1 = false;

    $scope.resetAll1 = function () {
        $scope.filteredList1 = $scope.allItems1;
        $scope.currentPage1 = 0;
    }

    $scope.pagination1 = function () {
        var retVal = [];

        for (var i = 0; i < $scope.filteredList1.length; i++) {
            if (i % $scope.pageSize1 === 0) {
                retVal[Math.floor(i / $scope.pageSize1)] = [$scope.filteredList1[i]];
            } else {
                retVal[Math.floor(i / $scope.pageSize1)].push($scope.filteredList1[i]);
            }
        }

        $scope.ItemsByPage1 = retVal;
    };

    $scope.setPage1 = function () {
        $scope.currentPage1 = this.n;
    };

    $scope.firstPage1 = function () {
        $scope.currentPage1 = 0;
    };

    $scope.lastPage1 = function () {

        $scope.currentPage1 = $scope.ItemsByPage1.length - 1;
    };

    $scope.range1 = function (input, total) {
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
    $scope.sort1 = function (sortBy) {
        var iconName = "";
        $scope.resetAll1();
        $scope.pagination1();
    };

    // -----------------------   Pagination2 End   -----------------------------

});