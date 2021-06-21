'use strict';

ScBusinez.controller('TaxDetailsController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
   // var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);

    $scope.CompanyName = $.session.get('CompanyName');
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vCompanyId = $.session.get('CompanyId');

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
    //vSettingsmenuShow1.style.display = 'none';

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

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.Desc = true;
    $scope.Inactive = true;
    $scope.Active = false;

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

    var vCompanyId = $.session.get('CompanyId');
    var vTaxId = '';

    $scope.BindGrid = function (Active) {
        
        $http({
            url: vUrl+"TaxDetails/GetTaxDetails",
            method: 'GET',
            params: { iActive: Active, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function(response) {
            debugger;
            // $scope.TaxDetails = response.data;
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function (response) {
        });
    }
    $scope.BindGrid(1);

    $scope.ddlCatChange = function (CategoryId) {
        
        $http({
            url: vUrl + "ProductDetails/GetSubCategoryDetails",
            method: 'GET',
            params: { CategoryId: CategoryId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (Response) {
            
            $scope.SubCategoryDetails = Response.data;
            
            if (Response.data.length == 0 || $scope.SubCategoryDetails == null || $scope.SubCategoryDetails == "null") {
                $scope.msg = "SubCateogry Not Available Please Add SubCategory First";
            }

        }).catch(function (response) {
        });
    }


    $scope.ddlsubCatChange = function (vSubCategoryId) {
        
        $http({
            url: vUrl + "ProductDetails/GetProductDetailsforTAX",
            method: 'GET',
            params: { SubCategoryId: vSubCategoryId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (Response) {
            
            $scope.ProductDetails = Response.data;
            if (Response.data.length == 0 || $scope.ProductDetails == null || $scope.ProductDetails == "null") {
                $scope.msg = "Product is not available for the selected subcategory Please Add Product First";
            }

        }).catch(function (response) {
        });
    }




    //Get Category Details From DataBase and Bind it in DropDownlist
    $http({
        url: vUrl + "ProductDetails/GetCategoryDetails",
        method: 'GET',
        //params: {CategoryId:CategoryId},
        params: { CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        
        $scope.CategoryDetails = response.data;

    }).catch(function (response) {
        });



    var funPlaceholderReset = function () {
        var element = document.getElementById("lblDescription");
        element.className = '';
        element.innerHTML = "Description";

        var element = document.getElementById("lblPercentage");
        element.className = '';
        element.innerHTML = "Percentage";
    }

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

    $scope.onTextBoxKeyPress = function (event) {
      
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    var vCompanyId = $.session.get('CompanyId');

    $scope.Save = function () {
        debugger;
        $("#taxsave").attr("disabled", true);
        $scope.Desc = true;
        $scope.msgStatus = '';
        $scope.msg = ''; 

        var vcatid = document.getElementById('CategoryId').value;
        var vSubcatid = document.getElementById('SubCategoryId').value;
        var vProductId = document.getElementById('ProductId').value;

        if (vcatid == "" || vcatid == undefined || vcatid == null) {
            $scope.msg = 'Plese Select the Category';// 'Please Enter the Tax Name';
            $("#taxsave").attr("disabled", false);
            return false;
        }
        if (vSubcatid == "" || vSubcatid == undefined || vSubcatid == null) {
            $scope.msg = 'Plese Select the SubCategory';
            $("#taxsave").attr("disabled", false);
            return false;
        }
        if (vProductId == "" || vProductId == undefined || vProductId == null) {
            $scope.msg = 'Plese Select the Product';
            $("#taxsave").attr("disabled", false);
            return false;
        }
        if (document.getElementById('Percentage').value == "" || document.getElementById('Percentage').value == undefined || document.getElementById('Percentage').value == null) {
            $scope.msg = 'Plese Enter the GST Percentage';
            $("#taxsave").attr("disabled", false);
            return false;
        }
        //if (document.getElementById('SGSTPercentage').value == "" || document.getElementById('SGSTPercentage').value == undefined || document.getElementById('SGSTPercentage').value == null) {
        //    $scope.msg = 'Plese Enter the SGST Percentage';
        //    $("#taxsave").attr("disabled", false);
        //    return false;
        //}


        //if (document.getElementById('IGSTPercentage').value == "" || document.getElementById('IGSTPercentage').value == undefined || document.getElementById('IGSTPercentage').value == null) {
        //    $scope.msg = 'Plese Enter the IGST Percentage';
        //    $("#taxsave").attr("disabled", false);
        //    return false;
        //}



        var TaxDetail = $scope.ProductDetail;
        if ($scope.ProductDetail.IsActive == true) {
            $scope.ProductDetail.IsActive = 1;
        }
        else
            $scope.ProductDetail.IsActive = 0;

        $http({
            url: vUrl+"TaxDetails/InsertTaxDetails",
            dataType: 'json',
            method: 'POST',
            data: TaxDetail,
            params: { CompanyId: vCompanyId},
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            debugger;
            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = "Tax is Already Applied for this Product";
                $("#taxsave").attr("disabled", false);
            }
            else {

              
                $("#taxsave").attr("disabled", false);  
                //$scope.TaxDetail.Percentage = parseFloat(parseFloat(10 * 2).toFixed(2));
                $scope.msgStatus = TaxDetailMessages(4); //'TaxDetail Added Successfully';
                
                document.getElementById('CategoryId').value = "";
                document.getElementById('SubCategoryId').value = "";
                document.getElementById('ProductId').value = "";
             $scope.ProductDetail.CGSTPercentage = "";
            $scope.ProductDetail.SGSTPercentage = "";
             $scope.ProductDetail.IGSTPercentage = "";
             $scope.ProductDetail.IsActive = "";
             $scope.ProductDetail.Percentage = "";
             $scope.ShowGST = false;
                $scope.BindGrid(1);
                funPlaceholderReset();
            }
        
        }).catch(function (response) {
        });
    }

    var vCompanyId = $.session.get('CompanyId');
   

    $scope.Edit = function (TaxId) {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.Desc = false;

        $scope.msgStatus = '';
        $scope.msg = '';
        
        $http({
            method: "GET",
            url: vUrl + "TaxDetails/GetTaxDetailsId",
            params: { TaxId: TaxId, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            var result = response.data;

            //var TaxDetail = response.data;
            var vCGSTPercentage = result["0"].CGSTPercentage;
            var vSGSTPercentage = result["0"].SGSTPercentage;
            var vIGSTPercentage = result["0"].IGSTPercentage;
            var vTaxDetailsId = result["0"].TaxDetailsId;
            var vCompanyDetailId = result["0"].CompanyDetailId;
            var vIsActive = result["0"].IsActive;
            var vCategoryId = result["0"].CategoryId;
            var vSubCategoryId = result["0"].SubCategoryId;
            var vProductId = result["0"].ProductId; 
            var vPercentage = result["0"].Percentage;
            vTaxId = vTaxDetailsId;
            //$scope.subcat.SubCategoryId = vSubCategoryId;
            //$scope.Pro.ProductId = vProductId;
            $scope.ShowGST = true;
            var vStatus = false;
            if (vIsActive == 1)
                vStatus = true;
            document.getElementById('CategoryId').value = vCategoryId;
            document.getElementById('SubCategoryId').value = vSubCategoryId;
            document.getElementById('ProductId').value = vProductId;
            $scope.ProductDetail = {
                CGSTPercentage: vCGSTPercentage, SGSTPercentage: vSGSTPercentage, IGSTPercentage: vIGSTPercentage, IsActive: vStatus, CompanyDetailId: vCompanyDetailId,
                CategoryId: vCategoryId, SubCategoryId: vSubCategoryId, ProductId: vProductId, Percentage: vPercentage};
            //$scope.TaxDetail.Description = Description;
            //$scope.TaxDetail.Percentage = Percentage;
            //$scope.TaxDetail.hiddenTaxDetailsId = TaxDetailsId;
        }).catch(function (response) {
        });
    }

    var vCompanyId = $.session.get('CompanyId');

    $scope.Update = function () {
        
        $("#taxUpdate").attr("disabled", true);
        $scope.Desc = true;
        $scope.msgStatus = '';
        $scope.msg = '';

        var vcatid = document.getElementById('CategoryId').value;
        var vSubcatid = document.getElementById('SubCategoryId').value;
        var vProductId = document.getElementById('ProductId').value;

        if (vcatid == "" || vcatid == undefined || vcatid == null) {
            $scope.msg = 'Plese Select the Category';// 'Please Enter the Tax Name';
            $("#taxUpdate").attr("disabled", false);
            return false;
        }
        if (vSubcatid == "" || vSubcatid == undefined || vSubcatid == null) {
            $scope.msg = 'Plese Select the SubCategory';
            $("#taxUpdate").attr("disabled", false);
            return false;
        }
        if (vProductId == "" || vProductId == undefined || vProductId == null) {
            $scope.msg = 'Plese Select the Product';
            $("#taxUpdate").attr("disabled", false);
            return false;
        }
        if (document.getElementById('Percentage').value == "" || document.getElementById('Percentage').value == undefined || document.getElementById('Percentage').value == null) {
            $scope.msg = 'Plese Enter the GST Percentage';
            $("#taxUpdate").attr("disabled", false);
            return false;
        }
        //if (document.getElementById('SGSTPercentage').value == "" || document.getElementById('SGSTPercentage').value == undefined || document.getElementById('SGSTPercentage').value == null) {
        //    $scope.msg = 'Plese Enter the SGST Percentage';
        //    $("#taxUpdate").attr("disabled", false);
        //    return false;
        //}


        //if (document.getElementById('IGSTPercentage').value == "" || document.getElementById('IGSTPercentage').value == undefined || document.getElementById('IGSTPercentage').value == null) {
        //    $scope.msg = 'Plese Enter the IGST Percentage';
        //    $("#taxUpdate").attr("disabled", false);
        //    return false;
        //}


        var TaxDetail = $scope.ProductDetail;
        if ($scope.ProductDetail.IsActive == true) {
            $scope.ProductDetail.IsActive = 1;
        }
        else
            $scope.ProductDetail.IsActive = 0;
        $http({
            url: vUrl+"TaxDetails/UpdateTaxDetails",
            dataType: 'json',
            method: 'POST',
            data: TaxDetail,
            params: { TaxId: vTaxId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            
            // $scope.TaxDetail = response.data;
            $scope.BindGrid(1);
            $scope.msgStatus = TaxDetailMessages(5);// 'TaxDetail Updated Successfully';
            $("#taxUpdate").attr("disabled", false);
            $scope.Desc = true;
            $scope.Show = false;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            document.getElementById('CategoryId').value = "";
            document.getElementById('SubCategoryId').value = "";
            document.getElementById('ProductId').value = "";
             //document.getElementById('CGSTPercentage').value == "";
               //document.getElementById('SGSTPercentage').value == "";
               //document.getElementById('IGSTPercentage').value == "";
            $scope.ProductDetail.IsActive = "";
            $scope.ProductDetail.CGSTPercentage = "";
            $scope.ProductDetail.SGSTPercentage = "";
            $scope.ProductDetail.IGSTPercentage = "";
            $scope.ProductDetail.Percentage = "";
            $scope.ShowGST = false;
            funPlaceholderReset();
        });
    }
    $scope.ShowGST = false;
    $scope.CalcGST = function () {
        
        $scope.ShowGST = true;
        var vGST = $scope.ProductDetail.Percentage;
        var vCALCvalue = (Number(vGST) / 2);
        $scope.ProductDetail.CGSTPercentage = vCALCvalue;
        $scope.ProductDetail.SGSTPercentage = vCALCvalue;
        $scope.ProductDetail.IGSTPercentage = vCALCvalue;
    }

    $scope.Clear = function ()
    {
        $scope.msgStatus = '';
        $scope.msg = '';
        document.getElementById('CGSTPercentage').value == "";
        document.getElementById('SGSTPercentage').value == "";
        document.getElementById('IGSTPercentage').value == "";
        $scope.TaxDetail.hiddenTaxDetailsId = "";
        $scope.TaxDetail.Status = "";
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.Desc = true;
        $scope.TaxDetail.IsActive = "";
        funPlaceholderReset();
        document.getElementById('CategoryId').value = "";
        document.getElementById('SubCategoryId').value = "";
        document.getElementById('ProductId').value = "";
        $scope.ShowGST = false;
        $("#taxUpdate").attr("disabled", false);
        $("#taxsave").attr("disabled", false);
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

        a.download = 'TaxDetail.xls';
        a.click();
    };


    $scope.Search = function() {
        debugger;
        var vdata = $scope.TaxDetail.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid(1);
        }
    }

    var GetSearch = function (vSearch) {
        
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl + "TaxDetails/GetSearch",
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

    $scope.InActiveclick = function () {
        
        $scope.BindGrid(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
        
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
});

