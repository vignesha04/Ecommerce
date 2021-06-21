'use strict';

ScBusinez.controller('BrandTypeController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    
    
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
        $.session.set('VarianceCount', UserDetails);
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


    var showLeftPush = document.getElementById('showLeftPush');
    var menus1 = document.getElementById('cbp-spmenu-s1');
    $scope.spmenus1 = true;
    $scope.LeftMenuClick = function () {
        //
        //classie.toggle(this, 'active');
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        //disableOther('showLeftPush');

        //classie.toggle(showLeftPush, 'disabled');
        $scope.spmenus1 = false;
    }

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.Categ = true;
    $scope.Inactive = true;
    $scope.Active = false;

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

    var vCompanyId = $.session.get('CompanyId');

    $scope.BindGrid = function (Active) {
        $http(
            {
                url: vUrl +"ProdBrand/GetBrandType",
                method: 'GET',
                params: { iActive: Active, CompanyId:vCompanyId},
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
    $scope.BindGrid(1);

    var funPlaceholderReset = function () {
        //var element = document.getElementById("lblCategoyName");
        //element.className = '';
        //element.innerHTML = "CategoyName";
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
        //
       
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    var vCompanyId = $.session.get('CompanyId');
  
    $scope.Save = function () {
        
        $("#brandsave").attr("disabled", true);
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Brand.BrandTypeName == "" || $scope.Brand.BrandTypeName == undefined || $scope.Brand.BrandTypeName == null) {
            $scope.msg = "Please enter the BrandType";
            $("#brandsave").attr("disabled", false);
            return false;
        }

        $scope.Brand.IsActive = 1;

        var cats = $scope.Brand;
        
        
        $http({
            url: vUrl +"ProdBrand/InsertBrand",
            dataType: 'json',
            method: 'POST',
            data: cats,
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            
            var vExist = response.data;
            if (vExist == "Already Exist") {
                $scope.msg = "Brand Already Exist";
                $("#brandsave").attr("disabled", false);
            }
            else {
                $scope.BindGrid(1);
                $scope.msgStatus = "Brand Saved Successfully";
                $("#brandsave").attr("disabled", false);
                $scope.Brand.BrandTypeName = "";
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
                $scope.Categ = true;
                funPlaceholderReset();
                //$scope.Category.IsActive = true;
            }
        }).catch(function (response) {
            //
        });
    }

    var vCompanyId = $.session.get('CompanyId');

    $scope.Edit = function (BrandTypeId) {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.Categ = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        var vCompanyId = $.session.get('CompanyId');

        $http({
            method: "GET",
            url: vUrl + "ProdBrand/GetBrandTypeById",
            params: { BrandTypeId: BrandTypeId, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            var result = response.data;

            

            //var New = response.data;
            var vBrandTypeName = result["0"].BrandName;
            var vCompanyDetailId = result["0"].CompanyDetailId;
            var IsActive = result["0"].IsActive;
            var vstatus = false;
            if (IsActive == "1")
                vstatus = true;

            //

            $scope.Brand = { BrandTypeName: vBrandTypeName, IsActive: vstatus, CompanyDetailId: vCompanyDetailId};
            $scope.hiddenBrandId = BrandTypeId;
            $window.scrollTo(0, 0);
           
        }).catch(function (response) {
            //debugger
        });
    }

    var vCompanyId = $.session.get('CompanyId');

    $scope.Update = function () {
        
        $("#brandupdate").attr("disabled", true);
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Brand.BrandTypeName == undefined || $scope.Brand.BrandTypeName == null || $scope.Brand.BrandTypeName == "") {
            $scope.msg = CategoryMessages(1);
            $("#brandupdate").attr("disabled", false);
            return false;
        }

        var vBrandId = $scope.hiddenBrandId;

        var cats = $scope.Brand;

        if ($scope.Brand.IsActive == false) {
            //
            $http({
                url: vUrl + "ProdBrand/CheckProductExist",
                method: 'GET',
                params: { BrandId: vBrandId, CompanyId: vCompanyId },
                data: cats,
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                $scope.cats = response.data;
                if (response.data.length > 0) {
                    $("#brandupdate").attr("disabled", false);
                    $scope.msg = "This BrandType is already used in the Product";
                    return false;//"This Category is already used in the Subcategory";
                }
                else {
                    $scope.UpdateCat(cats, vBrandId, vCompanyId);
                }
            }).catch(function (response) {
            })
        }
        else {
            $scope.UpdateCat(cats, vBrandId, vCompanyId);
        }

    }

    $scope.UpdateCat = function (cats, vBrandId, vCompanyId) {
        
        $http({
            url: vUrl + "ProdBrand/UpdateBrandType",
            dataType: 'json',
            method: 'POST',
            data: cats,
            params: { BrandTypeId: vBrandId, CompanyId:vCompanyId},
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            //
            $("#brandupdate").attr("disabled", false);
            $scope.BindGrid(1);
            $scope.msgStatus = "Updated Successfully";
            $scope.Brand.BrandTypeName = "";
            $scope.Brand.IsActive = "";
            $scope.Show = false;
            $scope.Categ = true;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            funPlaceholderReset();
            //$scope.Category.IsActive = true;
        });
    }

    $scope.Search = function () {
        //
        var vdata = $scope.Brand.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid(1);
        }
    }

    var GetSearch = function (vsearch) {
        
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl + "ProdBrand/GetSearch",
            method: "GET",
            params: { Search: vsearch, Status: vStatus, CompanyId: vCompanyId },
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

    $scope.exportData = function () {
        //
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Category>{worksheet}</x:Category><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");

        //var filters = $('.ng-table-filters').remove();
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        // $('.ng-table-sort-header').after(filters);
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Category.xls';
        a.click();
    };

    $scope.Clear = function () {
        //
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Brand.BrandTypeName = "";
        $scope.Brand.IsActive = "";
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.Categ = true;
        funPlaceholderReset();
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
});
