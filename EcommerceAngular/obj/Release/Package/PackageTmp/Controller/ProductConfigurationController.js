'use strict';

ScBusinez.controller('ProductConfigurationController', function ($scope, $http, $timeout, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);

    //$scope.ShowdisDDL = true;
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.CompanyName = $.session.get('CompanyName');

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vCompanyId = $.session.get('CompanyId');
    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '';
    }
    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.myObj = {
        "background-color": vbackgroundColor
    }

    var vCouponApplicable = $.session.get('CouponApplicable');
    
    if (vCouponApplicable == "1") {
        $scope.showCoupon = true;
        $scope.ShowcoupDDL = true;
    }
    else {
        $scope.showCoupon = false;
        $scope.ShowcoupDDL = false;
    }

    var vDiscountApplicable = $.session.get('DiscountApplicable');
    
    if (vDiscountApplicable == "1") {
        $scope.showDiscount = true;
        $scope.ShowdisDDL = true;
    }
    else {
        $scope.showDiscount = false;
        $scope.ShowdisDDL = false;
    }
    //For SubMenu/////////////////////////////
    var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    vSettingsmenuShow.style.display = 'none';
    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    vSettingsmenuShow1.style.display = 'none';

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
    vmenuShow1.style.display = 'none';

    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
    vMenuSalMobile.style.display = 'none';

    var vmenuDisShow1 = document.getElementById("menuDisShow1");
    vmenuDisShow1.style.display = 'none';

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
    ee.style.display = 'none';
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

    //Grid Bind
    debugger
    $scope.GridBind = function () {
        $http({
            url: vUrl + "ProductConfiguration/GetProductConfiguration",
            method: 'GET',
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            //  $scope.Codeing = response.data;
            $scope.allItems = response.data;
           $scope.sort('name');

        }).catch(function (response) {
            
        });

    }
 //.............................Search..............................
    //search function
    $scope.Search = function () {
        
        var vdata = $scope.Submit.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.GridBind(vCompanyId);
        }
    }
    var GetSearch = function (vSearch) {
        
        $http({
            url: vUrl + "ProductConfiguration/GetProductConfigSearch",
            method: "GET",
            params: { Search: vSearch, CompanyDetailId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function (response) {
            
            $scope.data = response.data;
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {
            
        });
    }

    $scope.GridBind();

    //Get Tax Details 
    $http({
        url: vUrl + "ProductConfiguration/GetTaxDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {

        $scope.TaxDetails = response.data;
    }).catch(function (response) {

    });


    //Get Discount Details 
    $http({
        url: vUrl + "ProductConfiguration/GetDiscountDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {

        $scope.DiscountDetails = response.data;
    }).catch(function (response) {

    });

    //Get Coupon Details 
    $http({
        url: vUrl + "ProductConfiguration/GetCouponDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {

        $scope.CouponDetails = response.data;
    }).catch(function (response) {

    });


    //Get Category Details 
    $http({
        url: vUrl + "ProductConfiguration/GetCategoryDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId },
        //params: {CategoryId:CategoryId},
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.CategoryDetails = response.data;

    }).catch(function (response) {
    });


    //Get SubCategory Details 
    $scope.ddlCatChange = function (CategoryId) {
      // debugger
        $http({
            url: vUrl + "ProductConfiguration/GetSubCategoryDetails",
            method: 'GET',
            params: { CategoryId: CategoryId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (Response) {
            $scope.SubCategoryDetails = Response.data;


        }).catch(function (response) {
        });
    }

    //Get Product Details 
    $scope.ddlprotChange = function (SubCategoryId) {
        
      //
        
        $http({
            url: vUrl +"ProductConfiguration/GetProductdetails",
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

    //Get Couponcode Details 
    $scope.ddltypeChange = function (TaxDetailsId) {
    //  
        var vPageURL;
        if (TaxDetailsId == 1)
            vPageURL = vUrl + "ProductConfiguration/GetDiscountDetails";
        else if (TaxDetailsId == 2)
            vPageURL = vUrl + "ProductConfiguration/GetTaxDetails";
        else
            vPageURL = vUrl + "ProductConfiguration/GetCouponDetails";

        $http({
            url: vPageURL,
            method: 'GET',
            params: { TaxDetailsId: TaxDetailsId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
          //  
            $scope.TaxDetails = response.data;
        }).catch(function (response) {
        });
    }

   //submit
    $scope.Submit = function (CategoryId, SubCategoryId, ProductId) {
    // 
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        if ($scope.ProductDetail.TaxDetailsId == "" || $scope.ProductDetail.TaxDetailsId == undefined || $scope.ProductDetail.TaxDetailsId == null) {
            $scope.msg = ProductConfigurationMessages(1);// 'Please Select the Types';
            return false;
        }
        if ($scope.ProductDetail.DiscountDetailsid == "" || $scope.ProductDetail.DiscountDetailsid == undefined || $scope.ProductDetail.DiscountDetailsid == null) {
            $scope.msg = ProductConfigurationMessages(2);//'Please Select Your Choice';
            return false;
        }

        if ($scope.ProductDetail.CategoryId == "" || $scope.ProductDetail.CategoryId == undefined || $scope.ProductDetail.CategoryId == null) {
            $scope.msg = ProductConfigurationMessages(3);//'Please Select  the  Category';
            return false;
        }
        
        if ($scope.ProductDetail.SubCategoryId == "" || $scope.ProductDetail.SubCategoryId == undefined || $scope.ProductDetail.SubCategoryId == null) {
            $scope.msg = ProductConfigurationMessages(4);//'Please Enter the SubCategory';
            return false;
        }
        

        var vPageURL;
        if (ProductId == 0)
            vPageURL = vUrl + "ProductConfiguration/GetProductdetailusingSubcatId";
        else if (SubCategoryId == 0)
            vPageURL = vUrl + "ProductConfiguration/GetProductdetailusingCatId";
        else
            vPageURL = vUrl + "ProductConfiguration/GetProductdetailusingProdId";


        if (ProductId == null)
            ProductId = 0;

        $http({
            url: vPageURL,
            method: 'GET',
            params: { CategoryId: CategoryId, SubCategoryId: SubCategoryId, ProductId: ProductId, CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
         // 
            var prodt = response.data;
            var vProductId = "";
            for (var i = 0; i < prodt.length; i++) {
                if (vProductId == "")
                    vProductId = prodt[i].ProductId;
                else
                    vProductId = vProductId + "|" + prodt[i].ProductId;
            }
            var vTypeId = $scope.ProductDetail.TaxDetailsId;
            var vSelectedId = $scope.ProductDetail.DiscountDetailsid;
            $http({
                url: vUrl + "ProductConfiguration/UpdateProductDetails",
                method: 'POST',
                params: { ProductId: vProductId, TypeId: vTypeId, selectedId: vSelectedId, CompanyDetailId: vCompanyId },
                Headers: {
                    'Content-Type': JSON
                }
            });
         
            $scope.msgStatus = ProductConfigurationMessages(5);// "Submitted Successfully"
            $scope.ProductDetail.DiscountDetailsid = "";
            $scope.ProductDetail.CategoryId = "";
            $scope.ProductDetail.SubCategoryId = "";
            $scope.ProductDetail.TaxDetailsId = "";

        }).catch(function (response) {
              //  
        });
    }


    //-----------------------   Pagination Start   -----------------------------

    var vPageCount = $.session.get('GridSizeAdmin');
    $scope.pageSize = vPageCount;
    $scope.reverse = false;

    $scope.resetAll = function () {
        //
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


    $scope.exportData = function () {
       // var vCompanyId = $.session.get('CompanyId');
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{CouponDetails}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");
        //var example1 = $('.example1');

        //var filters = $('.ng-table-filters').remove();
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        //$('.ng-table-sort-header').after(filters);
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;

        //var today = new Date();
        //var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        a.download = 'ProductConfiguration.xls';
        a.click();
    };
})