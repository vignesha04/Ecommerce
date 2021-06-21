'use strict';
ScBusinez.controller('ProductDetailsController', function ($scope, $http, $timeout, $window, $sce) {
    //var vUrl = "http://webapi.shriharsithacommunications.in/api/";
    //$scope.SubDomain= "http://localhost:56397/api/";  

    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    $scope.Domain = $.session.get('Domain');
    var vUrl = $scope.SubDomain;
    $scope.IsDisabled = false; 
    $scope.loader = true;
    var variancedetcount = "";
    $window.scrollTo(0, 0);
    var vPageNumber = "";

    $scope.CompanyName = $.session.get('CompanyName');
    
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }
    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.myObj = {
        "background-color": vbackgroundColor
    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vCompanyId = $.session.get('CompanyId');
    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '';
    }

    var color = $.session.get('Colortag');
    var headercolor = $.session.get('Colortag');
    if (color == "0") {
        $scope.havecolor = false;
        $scope.ShowVarianseCount = true;
    }
    else {
        $scope.havecolor = true;
    }

    $scope.CompanyName = $.session.get('CompanyName');
    $scope.showadd = false;
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

    

    ////For SubMenu/////////////////////////////
    //var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    //vMenuDiscountShow.style.display = 'none';
    //var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    //var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    //vSettingsmenuShow.style.display = 'none';
    //var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    //vSettingsmenuShow1.style.display = 'none';

    //$scope.ShowHideSubMenu = function (menu, menuhide, menuhide1, menuhide2) {
    //    
    //    var x = document.getElementById(menu);
    //    var xHide = document.getElementById(menuhide);
    //    var xHide1 = document.getElementById(menuhide1);
    //    var xHide2 = document.getElementById(menuhide2);

    //    if (x.style.display == "block") {
    //        x.style.display = "none";
    //    }
    //    else {
    //        x.style.display = "block";
    //    }

    //    if (xHide.style.display == "block") {
    //        xHide.style.display = "none";
    //    }
    //    if (xHide1.style.display == "block") {
    //        xHide1.style.display = "none";
    //    }
    //    if (xHide2.style.display == "block") {
    //        xHide2.style.display = "none";
    //    }
    //}
    ////'menuDisShow1'
    //var vmenuShow1 = document.getElementById("menuShow1");
    //vmenuShow1.style.display = 'none';

    //var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    //vSettingsmenuShow1.style.display = 'none';

    //var vMenuSalMobile = document.getElementById("MenuSalMobile");
    //vMenuSalMobile.style.display = 'none';

    //var vmenuDisShow1 = document.getElementById("menuDisShow1");
    //vmenuDisShow1.style.display = 'none';

    //$scope.ShowHideSubMenu1 = function (menu, menu2, menuhide, menuhide1) {
    //    //
    //    var x = document.getElementById(menu);
    //    var x12 = document.getElementById(menu2);
    //    var xhide12 = document.getElementById(menuhide);
    //    var xhide13 = document.getElementById(menuhide1);
    //    x12.style.display = "none";
    //    xhide12.style.display = "none";
    //    xhide13.style.display = "none";

    //    if (x.style.display == "block") {
    //        x.style.display = "none";
    //    }
    //    else {
    //        x.style.display = "block";
    //    }
    //}

    $scope.LogoutClick = function () {
        $.session.set('AdminId', "");
        window.location.href = '#!home';
    }
    //End//////////////////////////////////


    $scope.ShowSave = true;

    $scope.ShowUpdate = false;
    $scope.ShowUpdateformob = false;
    $scope.prod = true;
    $scope.Show = false;

    $scope.Inactive = true;
    $scope.Active = false;
    $scope.msg = "";
    $scope.imgEditTime = false;


    //var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';
    //$scope.toggle_visibility = function (id, id1) {
    //    
    //    var e = document.getElementById(id);
    //    var e1 = document.getElementById(id1);

    //    e.style.display = 'none';
    //    e1.style.display = 'block';

    //}
    //$scope.myFunction = function () {
    //    

    //    var x = document.getElementById("myLinks");

    //    if (x.style.display == "block") {
    //        x.style.display = "none";
    //    }
    //    else {
    //        x.style.display = "block";
    //    }
    //}
    $(".wholesale").prop('checked', false);
    $(".retails").prop('checked', false);
    $(".mobwholesale").prop('checked', false);
    $(".mobretails").prop('checked', false);
    //Single Quote Validation
    $scope.onTextBoxKeyPress = function (event) {
        //

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            //$scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

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

    //Get Discount Details From DataBase and Bind it in DropDownlist
    $http({
        url: vUrl + "ProductDetails/GetDiscountDetails",
        method: 'GET',
        params: { CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {

        $scope.DiscountDetails = response.data;
    }).catch(function (response) {

    });
    //Abinesh

    $http({
        url: vUrl + "ProductVariance/UserCount",
        method: "Get",
        params: { UserId: vAdminId, companId: vCompanyId  },
        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {
        var UserDetails = response.data.length;
        $scope.VarianceCount = UserDetails;
        $.session.set('VarianceCount', UserDetails);
    }).catch(function (response) {
    });


    //Get Tax Details From DataBase and Bind it in DropDownlist
    $http({
        url: vUrl + "ProductDetails/GetTaxDetails",
        method: 'GET',
        params: { CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {

        $scope.TaxDetails = response.data;
    }).catch(function (response) {

    });

    //
    var vActive = 1;
    $http({
        url: vUrl + "ProdBrand/GetBrandType",
        method: 'GET',
        params: { iActive: vActive, CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        
        $scope.BrandType = response.data;


    }).catch(function (response) {
        
    });


    $http({

        url: vUrl + "ProductDetails/GetCouponDetails",
        method: 'GET',
        params: { CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.CouponDetails = response.data;

    }).catch(function (response) {

    });

    $scope.BindGrid = function (vActive) {

        $http({
            url: vUrl + "ProductDetails/GetProductDetailsForBindGrid",
            method: 'GET',
            params: { iActive: vActive, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            debugger;
            $scope.allItems = response.data;
            $scope.pageChangeHandler(vPageNumber);
            $scope.Totalcount = response.data.length;
            $scope.sort('name');
            $scope.loader = false;
        }).catch(function (response) {
            
        });
    }
    $scope.BindGrid(1);
  
    $scope.First = 1;
    $scope.Last = 20;

    function MyController($scope) {
        
        $scope.currentPage = 1;
        $scope.pageSize = 20;
        $scope.meals = [];
        $scope.totalUsers = 201;
        $scope.sortKey = 'id';
        $scope.pageMap = {
            "1": []
        };

        $scope.setShortKey = function (key) {
            console.log('>>>>>>>>>>>>> key:', key);
            $scope.sortKey = key;
        }

        var tempId = 1;

        var populateDataSet = function (dataSetNumber, count) {
            if ($scope.pageMap[dataSetNumber] == null) {
                $scope.pageMap[dataSetNumber] = [];
            }

            // simulating asynch callout to get data
            while (count > 0) {
                var dish = dishes[Math.floor(Math.random() * dishes.length)];
                var side = sides[Math.floor(Math.random() * sides.length)];
                $scope.pageMap[dataSetNumber].push({
                    id: tempId++,
                    name: dish + ' ' + side
                });
                count--;
            }

            console.log('>>>>>>>>>>>>> $scope.pageMap:', $scope.pageMap);
            $scope.meals.length = 0;
            for (var key in $scope.pageMap) {
                console.log('>>>> key:', key);
                if ($scope.pageMap[key] != null) {
                    $scope.meals.push.apply($scope.meals, $scope.pageMap[key]);
                    console.log('>>> meals:', $scope.meals.length);
                }
            }
        }

        populateDataSet(0, 100);

        var numberOfPages = Math.floor($scope.totalUsers / $scope.pageSize);
        var remainder = $scope.totalUsers % $scope.pageSize;
        if (remainder > 0) {
            numberOfPages++;
        }
        var numberOfFetchedSetsOfData = Math.ceil((numberOfPages * $scope.pageSize) / 100);

        console.log('>>>>>>>>>>> numberOfPages:', numberOfPages);
        console.log('>>>>>>>>>>> remainder:', remainder);
        console.log('>>>>>>>>>>> numberOfFetchedSetsOfData:', numberOfFetchedSetsOfData);


        if (numberOfFetchedSetsOfData > 1) {
            var i = 1;
            while (i < numberOfFetchedSetsOfData) {
                $scope.pageMap[i] = null;
                i++;
            }
        }

        $scope.loadDataSet = function (num) {
            var setNumber = Math.ceil((num * $scope.pageSize) / 100);
            if ($scope.pageMap[setNumber - 1] == null) {
                console.log('>>>>>>>>>> loading to set:', setNumber);
                populateDataSet(setNumber - 1, 100);
            }
        }

        $scope.isPageLoaded = function (num) {
            var result = false;
            if (num != '...') {
                //console.log('>>>> num:', num);
                var setNumber = Math.ceil((num * $scope.pageSize) / 100);
                //console.log('>>>> setNumber:', setNumber);
                if ($scope.pageMap[setNumber - 1] != null) {
                    result = true;
                }
            }
            return result;
        }

        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
            console.log('>>>>>>>>>> belongs to set:', Math.ceil((num * $scope.pageSize) / 100));
        }

        console.log('>>>>>>>>>>>>> $scope.pageMap:', $scope.pageMap);
    }

    $scope.pageSize = 20;
    $scope.pageChangeHandler = function (num) {
        
        if (num == 1) {
            $scope.First = num;
            vPageNumber = num;

        }
        else {
            $scope.First = (num - 1) * $scope.pageSize;
        }
        if ($scope.pageSize == "" || $scope.pageSize == null || $scope.pageSize == "undefiened") {
            $scope.Last = $scope.Totalcount;
        }
        else {
            $scope.Last = num * $scope.pageSize;
        }

        console.log('going to page ' + num);
    };


    $scope.ShowDiscountDetailsId = false;
    $scope.ShowCouponDetailsId = false;

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
            $scope.ShowDiscountDetailsId = true;
        }
        else {
            $scope.ShowDiscountDetailsId = false;
        }
        var Coupon = result["0"].CouponApplicable;
        if (Coupon == "1") {
            debugger;
            $scope.ShowCouponDetailsId = true;
        }
        else {
            $scope.ShowCouponDetailsId = false;
        }
        
       
    }).then(function myError(response) {

    });



    $scope.VarianceActive = function (varianceType, VarianceActive, ProductId) {
        document.getElementById("VarianceA").disabled = true;

        if (VarianceActive == null) {
            VarianceActive = 0;
        }

        
        $http({
            url: vUrl + "ProductDetails/varianceActive",
            method: 'POST',
            params: { variance: varianceType, VarianceActive: VarianceActive, ProductId: ProductId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            
            $scope.BindGrid(1);
            document.getElementById("VarianceA").disabled = false;

        }).catch(function (response) {
            //
        });
    }

    var InsertProductDetails = function (filepath) {
        
        if ($scope.ProductDetail.Title == undefined || $scope.ProductDetail.Title == null || $scope.ProductDetail.Title == "") {
            $scope.msg = ProductDetailMessages(1); //'Please Enter the Title';
            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }
        //if ($scope.ProductDetail.Description == undefined || $scope.ProductDetail.Description == null || $scope.ProductDetail.Description == "") {
        //    $scope.msg = ProductDetailMessages(2);//'Please Enter the Description';
        //    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
        //    $scope.saveloade = false;
        //    return false;
        //}

        var vProdFeatures = '';
        if ($scope.ProdFeatures != undefined && $scope.ProdFeatures != null) {
            if ($scope.ProdFeatures.ProductFeatures1 != undefined && $scope.ProdFeatures.ProductFeatures1 != null && $scope.ProdFeatures.ProductFeatures1 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures1;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures1;
            }
            if ($scope.ProdFeatures.ProductFeatures2 != undefined && $scope.ProdFeatures.ProductFeatures2 != null && $scope.ProdFeatures.ProductFeatures2 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures2;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures2;
            }
            if ($scope.ProdFeatures.ProductFeatures3 != undefined && $scope.ProdFeatures.ProductFeatures3 != null && $scope.ProdFeatures.ProductFeatures3 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures3;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures3;
            }
            if ($scope.ProdFeatures.ProductFeatures4 != undefined && $scope.ProdFeatures.ProductFeatures4 != null && $scope.ProdFeatures.ProductFeatures4 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures4;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures4;
            }
            if ($scope.ProdFeatures.ProductFeatures5 != undefined && $scope.ProdFeatures.ProductFeatures5 != null && $scope.ProdFeatures.ProductFeatures5 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures5;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures5;
            }
            if ($scope.ProdFeatures.ProductFeatures6 != undefined && $scope.ProdFeatures.ProductFeatures6 != null && $scope.ProdFeatures.ProductFeatures6 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures6;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures6;
            }
            if ($scope.ProdFeatures.ProductFeatures7 != undefined && $scope.ProdFeatures.ProductFeatures7 != null && $scope.ProdFeatures.ProductFeatures7 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures7;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures7;
            }
            if ($scope.ProdFeatures.ProductFeatures8 != undefined && $scope.ProdFeatures.ProductFeatures8 != null && $scope.ProdFeatures.ProductFeatures8 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures8;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures8;

            }
            if ($scope.ProdFeatures.ProductFeatures9 != undefined && $scope.ProdFeatures.ProductFeatures9 != null && $scope.ProdFeatures.ProductFeatures9 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures9;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures9;
            }
            if ($scope.ProdFeatures.ProductFeatures10 != undefined && $scope.ProdFeatures.ProductFeatures10 != null && $scope.ProdFeatures.ProductFeatures10 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures10;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures10;
            }
        }
        var vProdTecDetails = "";

        if ($scope.ProdTecDetails != undefined && $scope.ProdTecDetails != null) {
            if ($scope.ProdTecDetails.ProductTecDetails1 != undefined && $scope.ProdTecDetails.ProductTecDetails1 != null && $scope.ProdTecDetails.ProductTecDetails1 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails1;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails1;
            }
            if ($scope.ProdTecDetails.ProductTecDetails2 != undefined && $scope.ProdTecDetails.ProductTecDetails2 != null && $scope.ProdTecDetails.ProductTecDetails2 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails2;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails2;
            }
            if ($scope.ProdTecDetails.ProductTecDetails3 != undefined && $scope.ProdTecDetails.ProductTecDetails3 != null && $scope.ProdTecDetails.ProductTecDetails3 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails3;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails3;
            }
            if ($scope.ProdTecDetails.ProductTecDetails4 != undefined && $scope.ProdTecDetails.ProductTecDetails4 != null && $scope.ProdTecDetails.ProductTecDetails4 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails4;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails4;
            }
            if ($scope.ProdTecDetails.ProductTecDetails5 != undefined && $scope.ProdTecDetails.ProductTecDetails5 != null && $scope.ProdTecDetails.ProductTecDetails5 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails5;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails5;
            }
            if ($scope.ProdTecDetails.ProductTecDetails6 != undefined && $scope.ProdTecDetails.ProductTecDetails6 != null && $scope.ProdTecDetails.ProductTecDetails6 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails6;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails6;
            }
            if ($scope.ProdTecDetails.ProductTecDetails7 != undefined && $scope.ProdTecDetails.ProductTecDetails7 != null && $scope.ProdTecDetails.ProductTecDetails7 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails7;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails7;
            }
            if ($scope.ProdTecDetails.ProductTecDetails8 != undefined && $scope.ProdTecDetails.ProductTecDetails8 != null && $scope.ProdTecDetails.ProductTecDetails8 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails8;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails8;
            }
            if ($scope.ProdTecDetails.ProductTecDetails9 != undefined && $scope.ProdTecDetails.ProductTecDetails9 != null && $scope.ProdTecDetails.ProductTecDetails9 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails9;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails9;
            }
            if ($scope.ProdTecDetails.ProductTecDetails10 != undefined && $scope.ProdTecDetails.ProductTecDetails10 != null && $scope.ProdTecDetails.ProductTecDetails10 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails10;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails10;
            }
        }

        $scope.ProductDetail.ProdFeatures = vProdFeatures;
        $scope.ProductDetail.ProdTecDetails = vProdTecDetails;
        $scope.ProductDetail.Picture = filepath;
        
        var ProductDetail = $scope.ProductDetail;
        var vVariantType = $scope.ProductDetail.VariantType;
        var vvarianceprice = $scope.ProductDetail.VariancePrice;
        var vsellprice = $scope.ProductDetail.sellingPrice;
        var vStockCount = $scope.ProductDetail.StockCount;

        
        //if ($scope.ProductDetail.Variance == true) {
        //    $scope.ProductDetail.Variance = 1;
        //}
        //else
        //    $scope.ProductDetail.Variance = 0;


        $scope.ProductDetail.Variance = 1;
        $scope.ProductDetail.IsActive = 1;
        var vAdminId = $.session.get('AdminId');
        var wholsesalevarinace = "";
        $scope.ProductDetail.InsertedBy = vAdminId;
        //AdminId
        var Discount = (ProductDetail.DiscountDetailsId != null ? ProductDetail.DiscountDetailsId : "");
        var Coupoun = (ProductDetail.CouponId != null ? ProductDetail.CouponId : "");
        debugger;
        if ($scope.ProductDetail.Variance == true && $scope.ProdVariance != undefined && $scope.ProdVariance != null) {
            var wholesale = "";
            if ($('.wholesale').is(':checked')) {
                wholsesalevarinace = "1";
            }
            else if ($('.retails').is(':checked')) {
                wholsesalevarinace = "2";
            }
            if (wholsesalevarinace == "2") {
                if ($('.mobwholesale').is(':checked')) {
                    wholsesalevarinace = "1";
                }
                else if ($('.mobRetails').is(':checked')) {
                    wholsesalevarinace = "2";
                }
            }
          
          
        }
        
        $http({
            url: vUrl + "ProductDetails/InsertProduct",
            dataType: 'json',
            method: 'POST',
            params: { CompanyId: vCompanyId, BrandTypeId: ProductDetail.BrandTypeId, SubCategory: ProductDetail.SubCategoryId, Discount1: Discount, wholsesale: wholsesalevarinace, Coupoun1: Coupoun},
            data: ProductDetail,
            headers: {
                "Content-Type": "application/json"

            }

        }).then(function (response) {
            
            var vProduId = response.data;
            if (vProduId == "Exist") {
                $scope.msg = "This Title is already used";
                $("#productsave").attr("disabled", false);
                $("#productsavedes").attr("disabled", false);
                $scope.saveloade = false;
                return false;
            }
            else if ($scope.ProductDetail.Variance == true && $scope.ProdVariance != undefined && $scope.ProdVariance != null) {
                
                var order = [];
                $scope.wholesale = [];

                var vCount = $scope.ProductDetail.VarianceCount;
                for (var i = 0; i < vCount; i++) {
                    $scope.ProdVariance = [];
                    var vType = "VariantType" + (i + 1).toString();
                    var vPrice = "VariantPrice" + (i + 1).toString();
                    var vSellingPrice = "VariantSellingPrice" + (i + 1).toString();
                    var vVariantStockCount = "VariantStockCount" + (i + 1).toString();
                    var vImage = "VariantImage" + (i + 1).toString();
                    var Active = "VariantActive" + (i + 1).toString();
                    var mobvType = "mobVariantType" + (i + 1).toString();
                    var mobvPrice = "mobVariantPrice" + (i + 1).toString();
                    var mobvSellingPrice = "mobVariantSellingPrice" + (i + 1).toString();
                    var mobVariantStockCount = "mobVariantStockCount" + (i + 1).toString();
                    var mobvImage = "mobVariantImage" + (i + 1).toString();
                    var mobActive = "mobVariantActive" + (i + 1).toString();

                    //VariantSellingPrice
                    var strType = removeSpaces(document.getElementById(vType).value);
                    var strPrice = removeSpaces(document.getElementById(vPrice).value);
                    var strSellingPrice = removeSpaces(document.getElementById(vSellingPrice).value);
                    var strVariantStockCount = removeSpaces(document.getElementById(vVariantStockCount).value);
                    var vVarImage = document.getElementById(vImage);


                    var mobstrType = removeSpaces(document.getElementById(mobvType).value);
                    var mobstrPrice = removeSpaces(document.getElementById(mobvPrice).value);
                    var mobstrSellingPrice = removeSpaces(document.getElementById(mobvSellingPrice).value);
                    var mobstrVariantStockCount = removeSpaces(document.getElementById(mobVariantStockCount).value);
                    var mobvVarImage = document.getElementById(mobvImage);

                    if (strType == "" || strType == null || strType == undefined || strType == "undefined") {
                        strType = mobstrType;
                    }
                    if (strPrice == "" || strPrice == null || strPrice == undefined || strPrice == "undefined") {
                        strPrice = mobstrPrice;
                    }
                    if (strSellingPrice == "" || strSellingPrice == null || strSellingPrice == undefined || strSellingPrice == "undefined") {
                        strSellingPrice = mobstrSellingPrice;
                    }

                    if (strVariantStockCount == "" || strVariantStockCount == null || strVariantStockCount == undefined || strVariantStockCount == "undefined") {
                        strVariantStockCount = mobstrVariantStockCount;


                    }
                    if (vVarImage == "" || vVarImage == null || vVarImage == undefined || vVarImage == "undefined") {
                        vVarImage = mobvVarImage;
                    }
                    var vVarianceActive = true;
                    if (document.getElementById(Active).checked == true) {
                        vVarianceActive = true;
                    }
                    else {
                        vVarianceActive = false;
                    }
                    
                    var order1 = [];
                    $scope.theFileVarience = order1;
                    var filename = null;
                    $scope.theFileVarience = [];
                    var fromdata1 = new FormData();
                    for (var j = 0; j < vVarImage.files.length; j++) {
                        let rPass = Math.random().toString(36).substring(7);
                        var vFilename = rPass;
                        var vFileMessage = vFilename + vVarImage.files[j].name;
                        // vVarImage.files[j].name = vFileMessage;
                        $scope.theFileVarience.push(vVarImage.files[j])

                        var imagesize = vVarImage.files[j].size / 1024; //in KB
                        var imgSizeMB = imagesize / 1024; //in MB
                        if (imgSizeMB > 1) {
                            alert(ProductDetailMessages(7));//('File should be between 1MB');
                            $scope.Data.Filetexts = "";
                            return false;
                        }

                        filename = $scope.theFileVarience[j].name;
                        
                        for (var i = 0; i < $scope.theFile.length; i++) {
                            fromdata1.append("uploadedFile", vVarImage.files[j], vFileMessage);
                        }
                        

                    }
                    var vFileName = "";
                    if (vFileMessage == "" || vFileMessage == null || vFileMessage == undefined) {
                        vFileName = "";
                    }
                    else {
                        vFileName = "http://webapi."+$scope.Domain+"/Uploads/ProductDetails/" + vFileMessage;
                    }
                    
                    //var vFileName = "http://localhost:56397/Uploads/ProductDetails/" + vFileMessage;

                    $scope.ProdVariance.push({ VarianceType: strType, VariancePrice: strPrice, sellingPrice: strSellingPrice, VarianceActive: vVarianceActive, ImageUrl: vFileName, VariantStockCount: strVariantStockCount  });
                    
                    
                    var request = {
                        method: 'POST',
                        url: vUrl + "FileUpload/ProductVarienceDetails",
                        data: fromdata1,
                        params: { CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
                        headers: {'Content-Type': undefined}
                    };
                    $http(request).then(function mySuccess(response) {
                        var Picture = response.data;


                    }).catch(function myError(response) {

                    });

                    var ProdVarience = $scope.ProdVariance;
                    if ($scope.ProductDetail.Variance == true && $scope.ProdVariance != undefined && $scope.ProdVariance != null) {
                        
                        var vCount1 = 0;
                        $http({
                            url: vUrl + "ProductDetails/InsertProductVariancedetails",
                            dataType: 'json',
                            method: 'POST',
                            params: { ProductId: vProduId, AdminId: vAdminId, CompanyId: vCompanyId, VariantStockCount: strVariantStockCount },
                            data: JSON.stringify(ProdVarience),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(function (response) {
                            

                            vCount1 = vCount1 + 1;
                            var vProduvarianceId = response.data;
                            for (var i = 0; i < 1; i++) {
                                i = vCount1 - 1;
                                $scope.multicolor = [];
                                $scope.wholesale = [];
                                var color = "";
                                var colorcode = "";
                                if ($(".colorcode").is(':checked')) {
                                    color = "1";
                                }

                                if (color == "1") {
                                    var colorsale = "Wholecolorcount" + (i + 1).toString();
                                    var colorcount = removeSpaces(document.getElementById(colorsale).value);
                                    if (i != 0) {
                                        colorcount = colorcount - i;
                                    }
                                    for (var j = 0; j < colorcount; j++) {
                                        if (i != 0) {
                                            j = j + i;
                                        }
                                        var Color = "colorselector" + (i + 1) + "color" + (j + 1).toString();
                                        var mobColor = "mobcolorselector" + (i + 1) + "color" + (j + 1).toString();
                                        var mobcolorcode = removeSpaces(document.getElementById(mobColor).value);
                                        colorcode = removeSpaces(document.getElementById(Color).value);
                                        if (colorcode == "" || colorcode == null || colorcode == undefined || colorcode == "undefiend") {
                                            colorcode = mobcolorcode;
                                        }
                                        $scope.multicolor.push({ colorcode: colorcode });
                                    }

                                }
                                var wholesale = "";
                                if ($('.wholesale').is(':checked')) {
                                    wholesale = "1";
                                }
                                else if ($('.retails').is(':checked')) {
                                    wholesale = "2";
                                }
                                if (wholesale == "2") {
                                    if ($('.mobwholesale').is(':checked')) {
                                        wholesale = "1";
                                    }
                                    else if ($('.mobRetails').is(':checked')) {
                                        wholesale = "2";
                                    }
                                }

                                var color = "";
                                if ($('.mobcolorcode').is(':checked')) {
                                    color = "1";
                                }
                                if (color == "") {
                                    if ($('.colorcode').is(':checked')) {
                                        color = "1";
                                    }
                                }
                                if (wholesale == "1") {
                                    var wholesale = "Wholesalecount" + (i + 1).toString();
                                    var wholesalecount = removeSpaces(document.getElementById(wholesale).value);
                                    if (i != 0) {
                                        wholesalecount = wholesalecount - i;
                                    }
                                    for (var j = 0; j < wholesalecount; j++) {

                                        if (i != 0) {
                                            j = j + i;
                                        }
                                        var minqty = "Wholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                                        var maxqty = "WholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                                        var sellprice = "Wholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                                        var mobminqty = "mobWholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                                        var mobmaxqty = "mobWholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                                        var mobsellprice = "mobWholsalevar" + (i + 1) + "prize" + (j + 1).toString();

                                        var strmin = removeSpaces(document.getElementById(minqty).value);
                                        var strmax = removeSpaces(document.getElementById(maxqty).value);
                                        var strsellprize = removeSpaces(document.getElementById(sellprice).value);
                                        var mobstrmin = removeSpaces(document.getElementById(mobminqty).value);
                                        var mobstrmax = removeSpaces(document.getElementById(mobmaxqty).value);
                                        var mobstrsellprize = removeSpaces(document.getElementById(mobsellprice).value);



                                        if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                                            strmin = mobstrmin;
                                        }
                                        if (strmax == "" || strmax == null || strmax == undefined || strmax == "undefined") {
                                            strmax = mobstrmax;
                                        }
                                        if (strsellprize == "" || strsellprize == null || strsellprize == undefined || strsellprize == "undefined") {
                                            strsellprize = mobstrsellprize;
                                        }
                                        $scope.wholesale.push({ wholesaleFromQty: strmin, wholesaleToQty: strmax, wholesaleprize: strsellprize });
                                    }

                                }
                                else if ($('.retails').is(':checked')) {

                                }
                                var wholesale = $scope.wholesale;
                                $http({
                                    url: vUrl + "ProductDetails/InsertProductVariancewholesaledetails",
                                    dataType: 'json',
                                    method: 'POST',
                                    params: { ProductvarianceId: vProduvarianceId },
                                    data: JSON.stringify(wholesale),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(function (response) {
                                    var wholesale = $scope.wholesale;

                                    

                                }).catch(function (response) {
                                    
                                });
                                var multicolor1 = $scope.multicolor;
                                $http({
                                    url: vUrl + "ProductDetails/InsertProductVariancecolor",
                                    dataType: 'json',
                                    method: 'POST',
                                    params: { ProductvarianceId: vProduvarianceId },
                                    data: JSON.stringify(multicolor1),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(function (response) {
                                    var wholesale = $scope.wholesale;
                                    $scope.InsertedBy = "";
                                    $timeout(function () {
                                        $scope.BindGrid(1);
                                    }, 200);
                                    $scope.msg = "";
                                    $scope.saveloade = false;
                                    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                                    $scope.msgStatus = ProductDetailMessages(5); //"Added product details successfully";
                                    //$scope.ProductDetail.Price = parseFloat(parseFloat(10 * 2).toFixed(2));
                                    $scope.ProductDetail.Title = "";
                                    $scope.ProductDetail.Description = "";
                                    $scope.ProductDetail.Price = "";
                                    $scope.ProductDetail.Picture = "";
                                    // $scope.ProductDetail.CategoryId = "";
                                    // $scope.ProductDetail.SubCategoryId = "";
                                    document.getElementById("FileUpload1").value = "";
                                    $scope.ProductDetail.TaxDetailsId = "";
                                    //$scope.ProductDetail.DiscountDetailsId = "";
                                    vcountvariable = 0;
                                    $scope.ProductDetail.VariancePrice = "";
                                    $scope.ProductDetail.sellingPrice = "";
                                    $scope.ProductDetail.VariantType = "";
                                    $scope.theFile = "";
                                    //$scope.ProductDetail.ProductType = "";
                                    //$scope.ProductDetail.BrandTypeId = "";
                                    $scope.ProductDetail.VarianceCount = "";
                                    $scope.ProductDetail.Description = "";
                                    $scope.ProductDetail.Description2 = "";
                                    $scope.ProductDetail.
                                        cription3 = "";
                                    $scope.ProductDetail.Price = "";
                                    $scope.ProductDetail.CategoryId = "";
                                    $scope.ProductDetail.CouponId = "";
                                    vcountvariable = 0;
                                    //$scope.ProductDetail.CouponId = "";
                                    $scope.ProductDetail.VariancePrice = "";
                                    $scope.ProductDetail.sellingPrice = "";
                                    $scope.ProductDetail.SubCategoryId = "";
                                    $scope.ProductDetail.BrandTypeId = "";
                                    $scope.ProductDetail.DiscountDetailsId = "";
                                    $scope.ProductDetail.TaxDetailsId = "";
                                    $scope.ProductDetail.ProductType = "";
                                    $scope.ProdFeatures.ProductFeatures1 = "";
                                    $scope.ProdFeatures.ProductFeatures2 = "";
                                    $scope.ProdFeatures.ProductFeatures3 = "";
                                    $scope.ProdFeatures.ProductFeatures4 = "";
                                    $scope.ProdFeatures.ProductFeatures5 = "";
                                    $scope.ProdFeatures.ProductFeatures6 = "";
                                    $scope.ProdFeatures.ProductFeatures7 = "";
                                    $scope.ProdFeatures.ProductFeatures7 = "";
                                    $scope.ProdFeatures.ProductFeatures8 = "";
                                    $scope.ProdFeatures.ProductFeatures9 = "";
                                    $scope.ProdFeatures.ProductFeatures10 = "";
                                    $scope.ProdTecDetails.ProductTecDetails1 = "";
                                    $scope.ProdTecDetails.ProductTecDetails2 = "";
                                    $scope.ProdTecDetails.ProductTecDetails3 = "";
                                    $scope.ProdTecDetails.ProductTecDetails4 = "";
                                    $scope.ProdTecDetails.ProductTecDetails5 = "";
                                    $scope.ProdTecDetails.ProductTecDetails6 = "";
                                    $scope.ProdTecDetails.ProductTecDetails7 = "";
                                    $scope.ProdTecDetails.ProductTecDetails8 = "";
                                    $scope.ProdTecDetails.ProductTecDetails9 = "";
                                    $scope.ProdTecDetails.ProductTecDetails10 = "";
                                    //$scope.resultOPImage = "";

                                    //$scope.ShowSave = true;
                                    //$scope.ShowUpdate = false;
                                    //$scope.prod = true;
                                    //$scope.ProductDetail.IsActive = true;
                                    //$scope.BindGrid();
                                    $(".retails").prop('checked', false);
                                    $(".wholesale").prop('checked', false);
                                    $(".mobRetails").prop('checked', false);
                                    $(".mobwholesale").prop('checked', false);
                                    $scope.ProductDetail.colorcode1 = false;
                                    $scope.ProductDetail.colorcode = false;
                                    document.getElementById("mobvariant1").style.display = "none";
                                    document.getElementById("variant1").style.display = "none";
                                    $scope.Variant = false; 
                                    $scope.mobVariant = false; 
                                    $scope.Variant = null;
                                    $scope.mobVariant = null;
                                    $scope.ShowPriceCommon = true;
                                    if (headercolor == "0") {
                                        $scope.ShowVarianseCount = true;
                                    }
                                    else {
                                        $scope.ShowVarianseCount = false;
                                    }
                                    $scope.ProductDetail.VarianceCount = 0;
                                    $("input[type='file']").val('');
                                    

                                }).catch(function (response) {
                                    
                                });

                            }

                            

                        }).catch(function (response) {
                            
                        });

                    }
                }

            }
            else {
                
                $http({
                    url: vUrl + "ProductDetails/InsertProductVariance",
                    dataType: 'json',
                    method: 'POST',
                    params: { ProductId: vProduId, VariantType: vVariantType, varianceprice: vvarianceprice, sellingprice: vsellprice, AdminId: vAdminId, CompanyId: vCompanyId,StockCount: vStockCount},
                    //data: JSON.stringify(ProdVarience),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                });

            }

        }).catch(function (response) {

        });

    }
    //

    var removeSpaces = function (string) {
        return string.split(' ').join('');
    }

    $scope.Save = function () {
        $("#productsave").attr("disabled", true);
        $("#productsavedes").attr("disabled", true);
        $scope.saveloade = true;
        $scope.msgStatus = "";
        $scope.msg = "";
        $scope.IsDisabled = true;
        

        //if ($scope.ProductDetail.CategoryId == undefined || $scope.ProductDetail.CategoryId == null || $scope.ProductDetail.CategoryId == "") {
        //    $scope.msg = ProductDetailMessages(10); //'Please Enter the Description';
        //    $scope.IsDisabled = false;
        //    $scope.saveloade = false;
        //    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
        //    return false;
        //}

        if ($scope.ProductDetail.SubCategoryId == undefined || $scope.ProductDetail.SubCategoryId == null || $scope.ProductDetail.SubCategoryId == "") {
            $scope.msg = ProductDetailMessages(11);//'Please Enter the Title';
            $scope.IsDisabled = false;
            $scope.saveloade = false;
            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
            return false;
        }
        if ($scope.ProductDetail.BrandTypeId == undefined || $scope.ProductDetail.BrandTypeId == null || $scope.ProductDetail.BrandTypeId == "") {
            $scope.msg = "Please Select the Brand";
            $scope.IsDisabled = false;
            $scope.saveloade = false;
            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
            return false;
        }
        if ($scope.ProductDetail.ProductType == undefined || $scope.ProductDetail.ProductType == null || $scope.ProductDetail.ProductType == "") {
            $scope.msg = 'Please Select the ProductType';
            $scope.IsDisabled = false;
            $scope.saveloade = false;
            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
            return false;
        }


        if ($scope.ProductDetail.Title == undefined || $scope.ProductDetail.Title == null || $scope.ProductDetail.Title == "") {
            $scope.msg = ProductDetailMessages(1);//'Please Enter the Title';
            $scope.IsDisabled = false;
            $scope.saveloade = false;
            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
            return false;

        }

        //if ($scope.ProductDetail.Description == undefined || $scope.ProductDetail.Description == null || $scope.ProductDetail.Description == "") {
        //    $scope.msg = ProductDetailMessages(2);
        //    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);//'Please Enter the Description';
        //    $scope.IsDisabled = false;
        //    $scope.saveloade = false;
        //    return false;
        //}
        
       
        if ($scope.ProductDetail.VarianceCount == undefined || $scope.ProductDetail.VarianceCount == null || $scope.ProductDetail.VarianceCount == "") {
            $scope.msg = "Please Enter the valid VarianceCount";
            $("#productsave").attr("disabled", false);
            $("#productsavedes").attr("disabled", false);
            $scope.IsDisabled = false;
            $scope.saveloade = false;
            return false;
        }
        else {
            
            var order = [];
            $scope.ProdVariance = order;
            debugger;
            var vCount = $scope.ProductDetail.VarianceCount;
            for (var i = 0; i < vCount; i++) {
                var vType = "VariantType" + (i + 1).toString();
                var vPrice = "VariantPrice" + (i + 1).toString();
                var vSellingPrice = "VariantSellingPrice" + (i + 1).toString();
                var vVariantStockCount = "VariantStockCount" + (i + 1).toString();
                var vImage = "VariantImage" + (i + 1).toString();
                var Active = "VariantActive" + (i + 1).toString();
                var mobvType = "mobVariantType" + (i + 1).toString();
                var mobvPrice = "mobVariantPrice" + (i + 1).toString();
                var mobvSellingPrice = "mobVariantSellingPrice" + (i + 1).toString();
                var mobVariantStockCount = "mobVariantStockCount" + (i + 1).toString();
                var mobvImage = "mobVariantImage" + (i + 1).toString();
                var mobActive = "mobVariantActive" + (i + 1).toString();

                //VariantSellingPrice
                var strType = removeSpaces(document.getElementById(vType).value);
                var strPrice = removeSpaces(document.getElementById(vPrice).value);
                debugger;
                //var strPrice = '0';
                var strSellingPrice = removeSpaces(document.getElementById(vSellingPrice).value);
                var strVariantStockCount = removeSpaces(document.getElementById(vVariantStockCount).value);
                var vVarImage = document.getElementById(vImage);


                var mobstrType = removeSpaces(document.getElementById(mobvType).value);
                //var mobstrPrice = '0';
                var mobstrPrice = removeSpaces(document.getElementById(mobvPrice).value);
                var mobstrSellingPrice = removeSpaces(document.getElementById(mobvSellingPrice).value);
                var mobstrVariantStockCount = removeSpaces(document.getElementById(mobVariantStockCount).value);
                var mobvVarImage = document.getElementById(mobvImage);

                if (strType == "" || strType == null || strType == undefined || strType == "undefined") {
                    strType = mobstrType;
                }
                if (strPrice == "" || strPrice == null || strPrice == undefined || strPrice == "undefined") {
                    debugger;
                    strPrice = mobstrPrice;
                }
                if (strSellingPrice == "" || strSellingPrice == null || strSellingPrice == undefined || strSellingPrice == "undefined") {
                    strSellingPrice = mobstrSellingPrice;
                }

                if (strVariantStockCount == "" || strVariantStockCount == null || strVariantStockCount == undefined || strVariantStockCount == "undefined") {
                    strVariantStockCount = mobstrVariantStockCount;
                }


                if (vVarImage == "" || vVarImage == null || vVarImage == undefined || vVarImage == "undefined") {
                    vVarImage = mobvVarImage;
                }




                var vVarianceActive = true;
                if (document.getElementById(Active).checked == true) {
                    vVarianceActive = true;
                }
                else {
                    vVarianceActive = false;
                }
                if ($scope.ProductDetail.VarianceCount != 1) {
                    if (strType == undefined || strType == null || strType == "") {
                        $scope.msg = "Please Enter the valid VarianceType";
                        $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;
                        return false;
                    }
                }
               
                if (strPrice == undefined || strPrice == null || strPrice == "") {
                    debugger;
                    $scope.msg = "Please Enter the valid MRP Price";
                    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                    $scope.IsDisabled = false;
                    $scope.saveloade = false;
                    return false;
                }
                if (strSellingPrice == undefined || strSellingPrice == null || strSellingPrice == "" || strSellingPrice == "0") {
                    $scope.msg = "Please Enter the valid  Selling Price";
                    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                    $scope.IsDisabled = false;
                    $scope.saveloade = false;
                    return false;
                }

                if (Number(strPrice) < Number(strSellingPrice)) {
                    $scope.msg = 'SellingPrice should be less than or equal MRP Price';
                    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                    $scope.IsDisabled = false;
                    $scope.saveloade = false;
                    return false;
                }
                var wholesale = "";
                if ($('.wholesale').is(':checked')) {
                    wholesale = "1";
                }
                else if ($('.retails').is(':checked')) {
                    wholesale = "2";
                }
                if (wholesale == "2") {
                    if ($('.mobwholesale').is(':checked')) {
                        wholesale = "1";
                    }
                    else if ($('.mobRetails').is(':checked')) {
                        wholesale = "2";
                    }
                }
                //if (wholesale == "") {
                //        $scope.msg = 'Please Choose on Any one Option Wholesale and Retails';
                //    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                //    $scope.IsDisabled = false;
                //    $scope.saveloade = false;
                //    return false;
                //}
                var color = "";
                if ($('.mobcolorcode').is(':checked')) {
                    color = "1";
                }
                if (color == "") {
                    if ($('.colorcode').is(':checked')) {
                        color = "1";
                    }
                }
                if (wholesale == "1") {
                    var wholesale = "Wholesalecount" + (i + 1).toString();
                    var wholesalecount = removeSpaces(document.getElementById(wholesale).value);
                    if (i != 0) {
                        wholesalecount = wholesalecount - i;
                    }
                    for (var j = 0; j < wholesalecount; j++) {
                        if (i != 0) {
                            j = j + i;
                        }
                        var minqty = "Wholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                        var maxqty = "WholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                        var sellprice = "Wholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                        var mobminqty = "mobWholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                        var mobmaxqty = "mobWholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                        var mobsellprice = "mobWholsalevar" + (i + 1) + "prize" + (j + 1).toString();


                        var strmin = removeSpaces(document.getElementById(minqty).value);
                        var strmax = removeSpaces(document.getElementById(maxqty).value);
                        var strsellprize = removeSpaces(document.getElementById(sellprice).value);
                        var mobstrmin = removeSpaces(document.getElementById(mobminqty).value);
                        var mobstrmax = removeSpaces(document.getElementById(mobmaxqty).value);
                        var mobstrsellprize = removeSpaces(document.getElementById(mobsellprice).value);



                        if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                            strmin = mobstrmin;
                        }
                        if (strmax == "" || strmax == null || strmax == undefined || strmax == "undefined") {
                            strmax = mobstrmax;
                        }
                        if (strsellprize == "" || strsellprize == null || strsellprize == undefined || strsellprize == "undefined") {
                            strsellprize = mobstrsellprize;
                        }
                        if (strmin == undefined || strmin == null || strmin == "" || strmax == "0") {
                            $scope.msg = "Please Enter the valid Min Qty";
                            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                            $scope.IsDisabled = false;
                            $scope.saveloade = false;
                            return false;
                        }
                        if (strmax == undefined || strmax == null || strmax == "" || strmax == "0") {
                            $scope.msg = "Please Enter the valid Max Qty";
                            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                            $scope.IsDisabled = false;
                            $scope.saveloade = false;
                            return false;
                        }
                        if (strsellprize == undefined || strsellprize == null || strsellprize == "" || strsellprize == "0") {
                            $scope.msg = "Please Enter the valid wholesale Selling Price";
                            $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
                            $scope.IsDisabled = false;
                            $scope.saveloade = false;
                            return false;
                        }
                        if (Number(strSellingPrice) <= Number(strsellprize)) {
                            if (Number(strSellingPrice) != Number(strsellprize)) {
                                $scope.msg = 'SellingPrice should be less than or equal to wholesale Selling Price';
                                $("#productsave").attr("disabled", false);
                                $("#productsavedes").attr("disabled", false);
                                $scope.IsDisabled = false;
                                $scope.saveloade = false;
                                return false;
                            }

                        }
                    }

                }
                else if ($('.retails').is(':checked')) {

                }
                
                // var order1 = [];
                // $scope.theFileVarience = order1;
                // var filename = null;
                // $scope.theFileVarience = [];
                // var fromdata1 = new FormData();
                // for (var j = 0; j < vVarImage.files.length; j++) {
                // let rPass = Math.random().toString(36).substring(7);
                // var vFilename = rPass;
                // var vFileMessage = vFilename + vVarImage.files[j].name;
                // // vVarImage.files[j].name = vFileMessage;
                // $scope.theFileVarience.push(vVarImage.files[j])

                // var imagesize = vVarImage.files[j].size / 1024; //in KB
                // var imgSizeMB = imagesize / 1024; //in MB
                // if (imgSizeMB > 1) {
                // alert(ProductDetailMessages(7));//('File should be between 1MB');
                // $scope.Data.Filetexts = "";
                // return false;
                // }

                // filename = $scope.theFileVarience[j].name;

                // //console.log(filename.length)
                // var index = filename.lastIndexOf(".");
                // var strsubstring = filename.substring(index, filename.length);
                // if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {

                // }
                // else {
                // alert(ProductDetailMessages(8));  //('please upload correct File Name, File extension should be .png, .jpeg or .gif');
                // $scope.Data.Filetexts = "";
                // return false;
                // }
                // 
                // fromdata1.append("uploadedFile", vVarImage.files[j], vFileMessage);
                // }
                // var vFileName = "http://webapi.shriharsithacommunications.in/Uploads/ProductDetails/" + vFileMessage;
                // //var vFileName = "http://localhost:56397/Uploads/ProductDetails/" + vFileMessage;

                // $scope.ProdVariance.push({ VarianceType: strType, VariancePrice: strPrice, sellingPrice: strSellingPrice, VarianceActive: vVarianceActive, ImageUrl: vFileName });

                // 
                // var request = {
                // method: 'POST',
                // url: vUrl + "FileUpload/ProductVarienceDetails",
                // data: fromdata1,
                // params: { CompanyId: vCompanyId },
                // headers: {
                // 'Content-Type': undefined
                // }
                // };
                // $http(request).then(function mySuccess(response) {
                // var Picture = response.data;


                // }).catch(function myError(response) {

                // });
            }
        }

        // var filepath = "";
        // var fromdata = new FormData();

        //if ($scope.theFile == undefined || $scope.theFile == null || $scope.theFile == "") {
        //    debugger;
        //    $scope.msg = "Please select the Product Image";
        //    $("#productsave").attr("disabled", false); $("#productsavedes").attr("disabled", false);
        //    $scope.saveloade = false;
        //    $scope.IsDisabled = false;
        //    return false;
        //}
        var fromdata = new FormData();
        for (var i = 0; i < $scope.theFile.length; i++) {
            fromdata.append("uploadedFile", $scope.theFile[i]);
        }

        //fromdata.append("uploadedFile", $scope.theFile);
     
        //var fileName = document.getElementById("FileUpload1").value,
        //    idxDot = fileName.lastIndexOf(".") + 1,
        //    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        //if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        //    //TO DO
        //} else {
        //    $scope.msg = 'You must select an image file only'
        //    return false;
        //}
        //fromdata.append("uploadedFile", $scope.theFile);

        var request = {
            method: 'POST',
            url: vUrl + "FileUpload/ProductDetails",
            data: fromdata,
            params: { CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
            headers: {
                'Content-Type': undefined
            }
        };
        $http(request).then(function mySuccess(response) {
            var Picture = response.data;
            $scope.theFile = "";
            InsertProductDetails(Picture);

            $scope.IsDisabled = false;
        }).catch(function myError(response) {
            $scope.IsDisabled = false;
        });

       
    }

    $scope.setFile1 = function (element) {
        
        $scope.$apply(function ($scope) {
            $scope.theFile1 = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile1.name;
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
                // 
            }
            else {
                //  
                $scope.msg = 'Please Choose the valid Image File'

                return false;
            }

        });
    };

    $scope.setFile = function (element) {
        

        $scope.theFile = [];
        // 
        for (var i = 0; i < element.files.length; i++) {
            $scope.theFile.push(element.files[i])

            var imagesize = element.files[i].size / 1024; //in KB
            var imgSizeMB = imagesize / 1024; //in MB
            if (imgSizeMB > 1) {
                alert(ProductDetailMessages(7));//('File should be between 1MB');
                $scope.Data.Filetexts = "";
                return false;
            }

            $scope.FileMessage = '';
            var filename = $scope.theFile[i].name;
            //console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {

            }
            else {

                $scope.msg = 'Please Choose the valid Image File';

                return false;
            }
        }
       

        //$scope.$apply(function ($scope) {
        //    $scope.theFile = element.files[0];
        //    $scope.FileMessage = '';
        //    var filename = $scope.theFile.name;
        //    var index = filename.lastIndexOf(".");
        //    var strsubstring = filename.substring(index, filename.length);
        //    if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
        //        // 
        //    }
        //    else {
        //        //  
        //        $scope.msg = 'Please Choose the valid Image File'

        //        return false;
        //    }

        //});
    };
    var vcount = [];

    $scope.Edit = function (ProductId) {
        debugger;
        $scope.VarianceCheck = false;
        
        $scope.msgStatus = "";
        $scope.msg = "";
        $scope.imgEditTime = true;
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.ShowUpdatemob = true;
        $scope.Show = true;
        $scope.ShowVarianseCount = false;

        $scope.prod = false;

        method: 'GET',
            $http({
                url: vUrl + "ProductDetails/GetProductDetailsbyAdmin",
                params: { ProductId: ProductId, CompanyId: vCompanyId },
                Headers: {
                    "Content-Type": JSON
                }
            }).then(function mysuccess(response) {
                debugger;
                var result = response.data;
                
                // var ProductDetail = response.data;
                var vProductId = result["0"].ProductId;
                debugger;
                $scope.vProductid = vProductId;
                var vTitle = result["0"].Title;
                var vDescription = result["0"].Description;
                var vProductType = result["0"].ProductType;
                var vPrice = result["0"].Price;
                
                // var vDiscountDetailsId = result["0"].DiscountDetailsId;
                // var vDiscountDetailsId = result["0"].DiscountName.Description;
                var vDiscountDetailsId = result["0"].DiscountName;
               // var vCouponId = result["0"].CouponId;  
                var vCouponId = result["0"].Coupon;
                // var vBrandId = result["0"].BrandTypeId;
                var vBrandId = result["0"].BrandName;
                // var vCategoryId = result["0"].CategoryId;
                var vCategoryId = result["0"].CategoryName;
                // var vSubCategoryId = result["0"].SubCategoryId;
                var vSubCategoryId = result["0"].SubCategoryName;
                var vSubCategoryName = result["0"].SubCategoryName;
                var vIsActive = result["0"].IsActive;

                var vvarianceproduct = $scope.ProductDetail.Variance;
                var vvariance = vvarianceproduct;
                var vUsername = result["0"].Username;
                $scope.InsertedBy = vUsername;
                $scope.Modified = false;
                $scope.InsertedDate = result["0"].InsertedDate.toString("dd/MM/yyyy");
                if (result["0"].ModifiedName != null && result["0"].ModifiedName != "") {
                    $scope.ModifiedName = result["0"].ModifiedName;
                    $scope.UpdatedDate = result["0"].UpdatedDate.toString("dd/MM/yyyy");
                    $scope.Modified = true;
                }

                var wholesalevariance = result["0"].wholesale;
                var wholesaleActive = false;
                var RetailsaleActive = false;
                if (wholesalevariance == "1") {
                    $(".wholesale").prop("checked", true);
                    $(".mobwholesale ").prop("checked", true);
                    wholesaleActive = true;
                }
                else {
                    $(".retails").prop("checked", true);
                    $(".mobretails ").prop("checked", true);
                    RetailsaleActive = true;
                }
                GetImages(vProductId);
                GetProductFeatures(vProductId);
                GetProductTecDetails(vProductId);
                $scope.msg = "";
                $scope.msgStatus = "";
                $scope.Image = result["0"].Picture;

                var vStatus = false;
                if (vIsActive == "1")
                    vStatus = true;

                //        $scope.ProductDetail.Variance = "1";
                var vrVariance = false;
                if (vvariance == "1") {
                    vrVariance = true;
                    $scope.ShowPriceCommon = false;
                    var vvariablecount = 1;
                }
                else {
                    vrVariance = true;
                    $scope.ShowPriceCommon = false;
                    var vvariablecount = 1;
                }


                $scope.ProductDetail = {
                    ProductId: vProductId, Title: vTitle, VarianceCount: variancedetcount, Description: vDescription, ProductType: vProductType, Price: vPrice, DiscountDetailsId: vDiscountDetailsId, SubCategoryName: vSubCategoryName, HiddenProductId: vProductId, IsActive: vStatus,
                    CategoryId: vCategoryId, Variance: vrVariance, BrandTypeId: vBrandId, CouponId: vCouponId
                };
                BindSubCatDDLEditTime(vCategoryId, vSubCategoryId);
                $window.scrollTo(0, 0);
                $scope.showadd = true;
                if (wholesalevariance == "1") {
                    $(".wholesale").prop('checked', true);
                    $(".mobwholesale").prop('checked', true);
                }
                else {
                    $(".mobretails ").prop('checked', true);
                    $(".retails").prop('checked', true);
                }
                var colorcode = result["0"].colorcode;
                if (colorcode == "1") {
                    $(".mobcolorcode").prop('checked', true);
                    $(".colorcode").prop('checked', true);
                    $scope.ProductDetail.colorcode = true;
                }
                else {
                    $(".mobcolorcodeno").prop('checked', true);
                    $(".colorcodeno").prop('checked', true);
                }
                
                    $http({
                        url: vUrl + "ProductDetails/GetProductVarienceDet",
                        method: 'GET',
                        params: { ProductId: ProductId, CompanyId: vCompanyId },
                        headers: {
                            "Content-Type": JSON
                        }
                    }).then(function mysuccess(response) {
                        var result = response.data;
                        
                        vcount = response.data.length;
                        $scope.vEditVariants = "";
                        $scope.vEditVariants1 = "";
                        variancedetcount = result.length;
                        $scope.ProductDetail.VarianceCount = result.length;
                        //var StockCount = result[i].STockCount;
                       // $scope.STockCount = result[i].STockCount;
                        //var vStockCount = STockCount[i].StockCount; 
                        
                        $scope.ShowUpdatemob = true;
                        for (var i = 0; i < result.length; i++) {
                            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-12'>";
                            $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-3 col-sm-6 col-md-3' style='padding-bottom:10px;'>";
                            $scope.vEditVariants = $scope.vEditVariants + " <label>Variance Type</label><br/>";
                            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantType" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='variance Type' style='width: 160px;' text='" + result[i].VarianceType + "' value='" + result[i].VarianceType + "' />";
                            $scope.vEditVariants = $scope.vEditVariants + "</div>";

                            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-6 col-md-3' style='padding-bottom:10px;'>";
                            $scope.vEditVariants = $scope.vEditVariants + " <label>MRP Price</label><br/>";
                            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "'  style='width: 160px;' placeholder='MRP Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' text='" + result[i].VariancePrice + "' value='" + result[i].VariancePrice + "' parseFloat />";
                            $scope.vEditVariants = $scope.vEditVariants + "</div>";

                            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                            $scope.vEditVariants = $scope.vEditVariants + " <label>Selling Price</label><br/>";
                            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantSellingPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "'  style='width: 160px;' placeholder='Selling Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].sellingPrice + "' value='" + result[i].sellingPrice + "' />";
                            $scope.vEditVariants = $scope.vEditVariants + "</div>";

                          

                            var STockCount = result[i].STockCount.length;
                            for (var L = 0; L < STockCount; L++) {

                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants = $scope.vEditVariants + " <label> Stock Count</label><br/>";
                                $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantStockCount" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='StockCount.StockCount" + (i + 1).toString() + "'  style='width: 160px;' placeholder='Stock Count' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].STockCount[L].StockCount + "' value='" + result[i].STockCount[L].StockCount + "' />";
                                $scope.vEditVariants = $scope.vEditVariants + "</div>";
                            }


                            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-2 col-sm-12 col-md-2' style='padding-bottom: 10px!important;display:none'>";
                            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-6 col-sm-12 col-md-6' ><input type='file' name='FileUpload1' id='VariantImage" + (i + 1).toString() + "' value='" + result[i].ImageUrl + "' ng-model='ProductDetail.VariantImage" + (i + 1).toString() + "' ng onchange='angular.element(this).scope().setFile1(this)' style='position: unset; opacity: unset; font - size: 16px;display:none' /> ";

                            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantImageOriginal" + (i + 1).toString() + "' type='text' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].ImageUrl + "' value='" + result[i].ImageUrl + "' ng-show='ShowVarPrice' />";
                            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VarianceId" + (i + 1).toString() + "' type='text' ng-model='ProductVariant.ProductVarianceId" + (i + 1).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].ProductVarianceId + "' value='" + result[i].ProductVarianceId + "' ng-show='ShowVarId' />";
                            if (result[i].ImageUrl != null && result[i].ImageUrl != "") {
                                $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-4 col-sm-12 col-md-4' ><img src='" + result[i].ImageUrl + "' width='40px' height='40px'> ";
                            }

                           

                            $scope.vEditVariants = $scope.vEditVariants + "</div><div class='col-lg-4 col-sm-12 col-md-4' style='padding-top:25px;' > <div class='col-lg-4 col-sm-12 col-md-4' style='padding-top:25px;' ><input class='form-control new1' checked id='VariantActive" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.VariantActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-12 col-md-6'style='padding-top:30px;' >Active</div> </div></div></div></div>";
                            var Wholesale = result[i].Wholesaleprice.length;
                            for (var j = 0; j < Wholesale; j++) {
                                $(".wholesale").prop('checked', true);
                                $(".mobwholesale").prop('checked', true);
                                var whole = ".Wholesalehidevar" + (i + 1) + "whole" + j.toString();
                                var mob = ".mobWholesalehidevar" + (i + 1) + "whole" + j.toString();

                                $(whole).addClass("hidden");

                                $(mob).addClass("hidden");

                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-12'>";
                                $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants = $scope.vEditVariants + " <label>From Qty</label><br/>";
                                $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='Wholsalefvar" + (i + 1).toString() + "Qty" + (j + 1).toString() + "' value='" + result[i].Wholesaleprice[j].wholesaleFromQty + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
                                $scope.vEditVariants = $scope.vEditVariants + "</div>";

                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants = $scope.vEditVariants + " <label>To Qty</label><br/>";
                                $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='WholsaleTvar" + (i + 1).toString() + "Qty" + (j + 1).toString() + "' value='" + result[i].Wholesaleprice[j].wholesaleToQty + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='To Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                                $scope.vEditVariants = $scope.vEditVariants + "</div>";

                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants = $scope.vEditVariants + " <label>Price Per Qty</label><br/>";
                                $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='Wholsalevar" + (i + 1).toString() + "prize" + (j + 1).toString() + "' value='" + result[i].Wholesaleprice[j].wholesaleprize + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price Per Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                                $scope.vEditVariants = $scope.vEditVariants + "</div>";

                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-4 col-sm-12 col-md-4'>";
                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-6 col-sm-6 col-md-6' ><input class='form-control new1' checked ng-init='ProductDetail.WholsaleVarianceActive=true'  id='WholsaleVariancevar" + (i + 1).toString() + "Active" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.WholsaleVarianceActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";


                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-6 col-sm-12 col-md-6 Wholesalehidevar" + (i + 1).toString() + "whole" + (j + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + (i + 1) + "," + (j + 1) + ")'></i></div>";
                                $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' value='" + result[i].Wholesaleprice[j].WholesalepriceId + "' id='Wholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString() + "' /></div ></div> ";
                                $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' value='" + (j + 1) + "' id='Wholesalecount" + (i + 1) + "'/> <div  class='wholsaleVariant" + (i + 1).toString() + "whole" + (j + 1) + "' ></div> ";

                            }
                            var Colorcode = result[i].variancecolor.length;
                            for (var j = 0; j < Colorcode; j++) {
                                $(".mobcolorcode").prop('checked', true);
                                $(".colorcode").prop('checked', true);
                                $scope.ProductDetail.colorcode = true;
                                $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants = $scope.vEditVariants + " <input class='form-control  colorselector" + (i + 1) + "color" + (j + 1).toString() + "' id='colorselector" + (i + 1) + "color" + (j + 1).toString() + "' value='" + result[i].variancecolor[j].colorcode + "' type='color' />";
                                $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' value='" + result[i].variancecolor[j].VariancecolorcodeId + "' id='colorvariance" + (i + 1) + "Id" + (j + 1).toString() + "'/>";
                                $scope.vEditVariants = $scope.vEditVariants + "</div>";
                                $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' value='" + (j + 1) + "' id='Wholecolorcount" + (i + 1) + "'/>";
                                $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-6 col-md-3 Wholecolorvar" + (i + 1) + "color" + (j + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + (i + 1) + "," + (j + 1) + ")'></i></div>";

                                $scope.vEditVariants = $scope.vEditVariants + "<div  class='wholsalecolorVariant" + (i + 1) + "color" + (j + 1) + "' ></div> "
                            }
                        }
                        for (var i = 0; i < result.length; i++) {


                            //$scope.vEditVariants1 = $scope.vEditVariants1 + "<div>";
                            //$scope.vEditVariants1 = $scope.vEditVariants1 + "<span><a ng-click='Delete(result[i].ProductVarianceId)'><img src='../ AdminStyle / images / delete image.png' style=' width: 20px; height: 20px; ' alt='' /></a></span>";
                            //$scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-12'>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + " <div class='col-lg-3 col-sm-6 col-md-3' style='padding-bottom:10px;'>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Variance Type</label><br/>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantType" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='variance Type' style='width: 160px;' text='" + result[i].VarianceType + "' value='" + result[i].VarianceType + "' />";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-6 col-md-3' style='padding-bottom:10px;'>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>MRP Price</label><br/>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price' style='width: 160px;' placeholder='MRP Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' text='" + result[i].VariancePrice + "' value='" + result[i].VariancePrice + "' parseFloat />";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Selling Price</label><br/>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantSellingPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price' style='width: 160px;' placeholder='Selling Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].sellingPrice + "' value='" + result[i].sellingPrice + "' />";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

                           
                            var STockCount = result[i].STockCount.length;
                            for (var L = 0; L < STockCount; L++) {

                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <label> Stock Count</label><br/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantStockCount" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='StockCount.StockCount" + (i + 1).toString() + "'  style='width: 160px;' placeholder='Stock Count' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].STockCount[L].StockCount + "' value='" + result[i].STockCount[L].StockCount + "' />";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";
                            }

                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-2 col-sm-12 col-md-2' style='padding-bottom: 10px!important;display:none'>";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-6 col-sm-12 col-md-6' ><input type='file'  value='" + result[i].ImageUrl + "' name='FileUpload1' id='mobVariantImage" + (i + 1).toString() + "' ng-model='ProductDetail.VariantImage" + (i + 1).toString() + "' ng onchange='angular.element(this).scope().setFile1(this)' style='position: unset; opacity: unset; font - size: 16px;display:none' /> ";

                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantImageOriginal" + (i + 1).toString() + "' type='text' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].ImageUrl + "' value='" + result[i].ImageUrl + "' ng-show='ShowVarPrice' />";
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVarianceId" + (i + 1).toString() + "' type='text' ng-model='ProductVariant.ProductVarianceId" + (i + 1).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='" + result[i].ProductVarianceId + "' value='" + result[i].ProductVarianceId + "' ng-show='ShowVarId' />";
                            if (result[i].ImageUrl != null) {
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "  <div class='col-lg-6 col-sm-12 col-md-6' ><img src='" + result[i].ImageUrl + "' width='40px' height='40px'> ";
                            }
                            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div><div class='col-lg-6 col-sm-12 col-md-6' > <div class='col-lg-6 col-sm-12 col-md-6'  ><input class='form-control new1' checked id='mobVariantActive" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.VariantActive" + (i + 1).toString() + "' ' style='width:20px;'/></div><div class='col-lg-6 col-sm-12 col-md-6'>Active</div>  </div></div></div></div>";
                            var Wholesale = result[i].Wholesaleprice.length;
                            for (var j = 0; j < Wholesale; j++) {
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-12'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>From Qty</label><br/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobWholsalefvar" + (i + 1).toString() + "Qty" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantType" + (i + 1).toString() + "' value='" + result[i].Wholesaleprice[j].wholesaleFromQty + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>To Qty</label><br/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobWholsaleTvar" + (i + 1).toString() + "Qty" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (i + 1).toString() + "'  value='" + result[i].Wholesaleprice[j].wholesaleToQty + "' placeholder='To Qty' style='width: 160px;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Price Per Qty</label><br/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobWholsalevar" + (i + 1).toString() + "prize" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (i + 1).toString() + "' value='" + result[i].Wholesaleprice[j].wholesaleprize + "' placeholder='Price Per Qty' style='width: 160px;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-4 col-sm-12 col-md-4'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-6 col-sm-6 col-md-6'><input class='form-control new1' checked ng-init='ProductDetail.mobWholsaleVarianceActive=true'  id='WholsaleVariancevar" + (i + 1).toString() + "Active" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.mobWholsaleVarianceActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";

                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-6 col-sm-12 col-md-6  mobWholesalehidevar" + (i + 1).toString() + "whole" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + (i + 1) + "," + (j + 1) + ")'></i></div>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden' value='" + result[i].Wholesaleprice[j].WholesalepriceId + "' id='mobWholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString() + "' /></div ></div> ";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden' value='" + (j + 1) + "' id='mobWholesalecount" + (i + 1) + "'/> <div class='mobwholsaleVariant" + (i + 1).toString() + "whole" + (j + 1) + "' ></div> ";

                            }

                            var Colorcode = result[i].variancecolor.length;
                            for (var j = 0; j < Colorcode; j++) {
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + " <input class='form-control  colorselector" + (i + 1) + "color" + (j + 1).toString() + "' id='mobcolorselector" + (i + 1) + "color" + (j + 1).toString() + "' value='" + result[i].variancecolor[j].colorcode + "' type='color' />";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden' value='" + result[i].variancecolor[j].VariancecolorcodeId + "' id='mobcolorvariance" + (i + 1) + "Id" + (j + 1).toString() + "'/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden' value='" + (j + 1) + "' id='mobWholecolorcount" + (i + 1) + "'/>";
                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-6 col-md-3 mobWholecolorvar" + (i + 1) + "color" + (j + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + (i + 1) + "," + (j + 1) + ")'></i></div>";

                                $scope.vEditVariants1 = $scope.vEditVariants1 + "<div  class='mobwholsalecolorVariant" + (i + 1) + "color" + (j + 1) + "' ></div> "
                            }
                        }
                        
                        $scope.Variant = $sce.trustAsHtml($scope.vEditVariants);
                        $scope.mobVariant = $sce.trustAsHtml($scope.vEditVariants1);
                        $scope.ShowUpdatemob = true;
                        for (var i = 0; i < result.length; i++) {
                            var Wholesale = result[i].Wholesaleprice.length;
                            for (var j = 0; j < Wholesale; j++) {
                                var whole = ".Wholesalehidevar" + (i + 1) + "whole" + j.toString();
                                var mob = ".mobWholesalehidevar" + (i + 1) + "whole" + j.toString();
                                $(whole).addClass("hidden");
                                $(mob).addClass("hidden");

                                var wholesale = "#Wholesalecount" + (i + 1);
                                $(wholesale).val((j + 1));
                            }
                        }
                    }).catch(function (response) {

                    });

            }).catch(function (response) {

            });
        
        

        
    };


    var GetProductFeatures = function (ProductId) {
        debugger;    
            $http({
                url: vUrl + "ProductDetails/GetProductFeatures",
                method: 'GET',
                params: { ProductId: ProductId, CompanyId: vCompanyId },
                Headers: {
                    "Content-Type": JSON
                }
            }).then(function mysucess(response) {
                debugger
                var result = response.data;
                var vProductDetail = "", vProductDetail1 = "", vProductDetail2 = "", vProductDetail3 = "", vProductDetail4 = "", vProductDetail5 = "", vProductDetail6 = "", vProductDetail7 = "", vProductDetail8 = "", vProductDetail9 = "";
                for (var i = 0; i < result.length; i++) {
                    if (i == 0) {
                        vProductDetail = result[i].Features;
                    }
                    else if (i == 1) {
                        vProductDetail1 = result[i].Features;
                    }
                    else if (i == 2) {
                        vProductDetail2 = result[i].Features;
                    }
                    else if (i == 3) {
                        vProductDetail3 = result[i].Features;
                    }
                    else if (i == 4) {
                        vProductDetail4 = result[i].Features;
                    }
                    else if (i == 5) {
                        vProductDetail5 = result[i].Features;
                    }
                    else if (i == 6) {
                        vProductDetail6 = result[i].Features;
                    }
                    else if (i == 7) {
                        vProductDetail7 = result[i].Features;
                    }
                    else if (i == 8) {
                        vProductDetail8 = result[i].Features;
                    }
                    else if (i == 9) {
                        vProductDetail9 = result[i].Features;
                    }
                }
                $scope.ProdFeatures = {
                    ProductFeatures1: vProductDetail,
                    ProductFeatures2: vProductDetail1,
                    ProductFeatures3: vProductDetail2,
                    ProductFeatures4: vProductDetail3,
                    ProductFeatures5: vProductDetail4,
                    ProductFeatures6: vProductDetail5,
                    ProductFeatures7: vProductDetail6,
                    ProductFeatures8: vProductDetail7,
                    ProductFeatures9: vProductDetail8,
                    ProductFeatures10: vProductDetail9
                };


            }).catch(function (response) {

            });
    };

    var GetProductTecDetails = function (ProductId) {
       
            $http({
                url: vUrl + "ProductDetails/GetProductTecDetails",
                method: 'GET',
                params: { ProductId: ProductId, CompanyId: vCompanyId },
                Headers: {
                    "Content-Type": JSON
                }
            }).then(function mysuccess(response) {
                debugger;
                var result = response.data;
                var vProductDetail = "", vProductDetail1 = "", vProductDetail2 = "", vProductDetail3 = "", vProductDetail4 = "", vProductDetail5 = "", vProductDetail6 = "", vProductDetail7 = "", vProductDetail8 = "", vProductDetail9 = "";

                for (var i = 0; i < result.length; i++) {
                    if (i == 0) {
                        vProductDetail = result[i].TechinalDetails;
                    }
                    else if (i == 1) {
                        vProductDetail1 = result[i].TechinalDetails;
                    }
                    else if (i == 2) {
                        vProductDetail2 = result[i].TechinalDetails;
                    }
                    else if (i == 3) {
                        vProductDetail3 = result[i].TechinalDetails;
                    }
                    else if (i == 4) {
                        vProductDetail4 = result[i].TechinalDetails;
                    }
                    else if (i == 5) {
                        vProductDetail5 = result[i].TechinalDetails;
                    }
                    else if (i == 6) {
                        vProductDetail6 = result[i].TechinalDetails;
                    }
                    else if (i == 7) {
                        vProductDetail7 = result[i].TechinalDetails;
                    }
                    else if (i == 8) {
                        vProductDetail8 = result[i].TechinalDetails;
                    }
                    else if (i == 9) {
                        vProductDetail9 = result[i].TechinalDetails;
                    }
                }

                $scope.ProdTecDetails = {
                    ProductTecDetails1: vProductDetail,
                    ProductTecDetails2: vProductDetail1,
                    ProductTecDetails3: vProductDetail2,
                    ProductTecDetails4: vProductDetail3,
                    ProductTecDetails5: vProductDetail4,
                    ProductTecDetails6: vProductDetail5,
                    ProductTecDetails7: vProductDetail6,
                    ProductTecDetails8: vProductDetail7,
                    ProductTecDetails9: vProductDetail8,
                    ProductTecDetails10: vProductDetail9
                };

                }).catch(function (response) {
                    debugger;
            });
    };

    var BindSubCatDDLEditTime = function (CategoryId, vSubCategoryId, ) {
        $http({
            url: vUrl + "ProductDetails/GetSubCategoryDetails",
            method: 'GET',
            params: { CategoryId: CategoryId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (Response) {
            $scope.SubCategoryDetails = Response.data;
            $timeout(function () {
                $scope.ProductDetail.SubCategoryId = vSubCategoryId;
            }, 300);

        }).catch(function (response) {
        });
    };

    $scope.Delete = function () {
        
    }

    var vcountvariable = 0;
    $scope.Addcount = function () {
        
        var countvar = vcountvariable;
        $scope.vEditVariants = "";
        $scope.vEditVariants1 = "";
        //$scope.ProductDetail.VarianceCount = 1;
        //var result1 = $scope.Variant;
        var result = ++vcount;
        var wholesale = "";
        if ($('.wholesale').is(':checked')) {
            wholesale = "1";
        }
        else if ($('.retails').is(':checked')) {
            wholesale = "2";
        }
        if (wholesale == "2") {
            if ($('.mobwholesale').is(':checked')) {
                wholesale = "1";
            }
            else if ($('.mobRetails').is(':checked')) {
                wholesale = "2";
            }
        }

        var color = "";
        if ($('.mobcolorcode').is(':checked')) {
            color = "1";
        }
        if (color == "") {
            if ($('.colorcode').is(':checked')) {
                color = "1";
            }
        }
        //for (var i = 0; i < result.length + 1; i++) {
       // $scope.vEditVariants = $scope.Variant;
        $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-12'>";
        $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-3 col-sm-6 col-md-3'>";
        $scope.vEditVariants = $scope.vEditVariants + " <label>Variance Type</label><br/>";
        $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantType" + (result ).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (result).toString() + "' placeholder='variance Type' style='width: 160px;'  />";
        $scope.vEditVariants = $scope.vEditVariants + "</div>";

        $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-6 col-md-3'>";
        $scope.vEditVariants = $scope.vEditVariants + " <label>MRP Price</label><br/>";
        $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantPrice" + (result ).toString() + "' type='number'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "'  style='width: 160px;' placeholder='MRP Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/'  parseFloat />";
        $scope.vEditVariants = $scope.vEditVariants + "</div>";

        $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        $scope.vEditVariants = $scope.vEditVariants + " <label>Selling Price</label><br/>";
        $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantSellingPrice" + (result ).toString() + "' type='number'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (result).toString() + "' style='width: 160px;' placeholder='Selling Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/'  parseFloat />";
        $scope.vEditVariants = $scope.vEditVariants + "</div>";

        $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        $scope.vEditVariants = $scope.vEditVariants + " <label>Stock Count</label><br/>";
        $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantStockCount" + (result).toString() + "' type='number'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantStockCount" + (result).toString() + "' style='width: 160px;' placeholder='Stock Count' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/'  parseFloat />";
        $scope.vEditVariants = $scope.vEditVariants + "</div>";


        $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-2 col-sm-12 col-md-2' style='padding-bottom: 10px!important;display:none'>";
        $scope.vEditVariants = $scope.vEditVariants + "<input type='file' name='FileUpload1' id='VariantImage" + (result).toString() + "' ng-model='ProductDetail.VariantImage" + (result).toString() + "' ng onchange='angular.element(this).scope().setFile1(this)' style='position: unset; opacity: unset; font - size: 16px;display:none' />";
        $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VariantImageOriginal" + (result ).toString() + "' type='text' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat ng-show='ShowVarPrice' />";
        $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='VarianceId" + (result ).toString() + "' type='text' ng-model='ProductVariant.ProductVarianceId" + (result ).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='0' value='0' ng-show='ShowVarId' />";
        //$scope.vEditVariants = $scope.vEditVariants + "</div></div>";

        $scope.vEditVariants = $scope.vEditVariants + "</div><div class='col-lg-2 col-sm-12 col-md-2' style=' padding-top:25px;' > <div class='col-lg-6 col-sm-12 col-md-6' style='padding-top:25px;' ><input class='form-control new1' checked id='VariantActive" + (result ).toString() + "' type='checkbox' ng-model='ProductVariant.VariantActive" + (result ).toString() + "' ' style='width:20px;'/> </div><div class='col-lg-6 col-sm-12 col-md-6'style=' padding-top:30px;' >Active</div>  </div></div>";
        $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'> <h6 style='  float: right;'> Product image Size:270px x 360px  </h6><br></div></div></div> ";
        if (wholesale == "1") {
            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-12'>";
            $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants = $scope.vEditVariants + " <label>From Qty</label><br/>";
            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='Wholsalefvar" + (result ).toString() + "Qty" + (result ).toString() + "'  type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (result ).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
            $scope.vEditVariants = $scope.vEditVariants + "</div>";

            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants = $scope.vEditVariants + " <label>To Qty</label><br/>";
            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='WholsaleTvar" + (result ).toString() + "Qty" + (result ).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "' placeholder='To Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vEditVariants = $scope.vEditVariants + "</div>";

            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants = $scope.vEditVariants + " <label>Price Per Qty</label><br/>";
            $scope.vEditVariants = $scope.vEditVariants + "<input class='form-control new1' id='Wholsalevar" + (result ).toString() + "prize" + (result ).toString() + "'  type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "' placeholder='Price Per Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vEditVariants = $scope.vEditVariants + "</div>";

            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-4 col-sm-12 col-md-4'>";
            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-6 col-sm-6 col-md-6' ><input class='form-control new1' checked ng-init='ProductDetail.WholsaleVarianceActive=true'  id='WholsaleVariancevar" + (result ).toString() + "Active" + (result ).toString() + "' type='checkbox' ng-model='ProductVariant.WholsaleVarianceActive" + (result ).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";


            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-6 col-sm-12 col-md-6 Wholesalehidevar" + (result ).toString() + "whole" + (result ).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + (result ) + "," + (result ) + ")'></i></div>";
            $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' id='Wholesalevar" + (result ).toString() + "Id" + (result ).toString() + "' /></div ></div> ";
            $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' value='" + (result ) + "' id='Wholesalecount" + (result ) + "'/> <div  class='wholsaleVariant" + (result ).toString() + "whole" + (result ) + "' ></div> ";

        }
        if (color == "1") {
            $scope.vEditVariants = $scope.vEditVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants = $scope.vEditVariants + " <input class='form-control  colorselector" + (result ) + "color" + (result ).toString() + "' id='colorselector" + (result ) + "color" + (result ).toString() + "' value='#ff0000' type='color' />";

            $scope.vEditVariants = $scope.vEditVariants + "</div>";
            $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden' value='" + (result ) + "' id='Wholecolorcount" + (result ) + "'/>";
            $scope.vEditVariants = $scope.vEditVariants + "<div class='col-lg-3 col-sm-6 col-md-3 Wholecolorvar" + (result ) + "color" + (result + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + (result ) + "," + (result ) + ")'></i></div>";
            $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden'  id='colorvariance" + (result ) + "Id" + (result ).toString() + "'/>";
            $scope.vEditVariants = $scope.vEditVariants + "<div  class='wholsalecolorVariant" + (result ) + "color" + (result ) + "' ></div> "

        }
        vcountvariable = ++countvar;

    //    $scope.vEditVariants1 = $scope.mobVariant;
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-12'>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + " <div class='col-lg-3 col-sm-6 col-md-3'>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Variance Type</label><br/>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantType" + (result ).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (result ).toString() + "' placeholder='variance Type' style='width: 160px;' text='' value='' />";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

        $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-6 col-md-3'>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>MRP Price</label><br/>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantPrice" + (result ).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "'  style='width: 160px;' placeholder='MRP Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' text='' value='' parseFloat />";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

        $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Selling Price</label><br/>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantSellingPrice" + (result ).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "'  style='width: 160px;' placeholder='Selling Price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='' value='' />";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

        $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Stock Count</label><br/>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantStockCount" + (result).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantStockCount" + (result).toString() + "'  style='width: 160px;' placeholder='Stock Count' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='' value='' />";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";



        $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-2 col-sm-12 col-md-2' style='padding-bottom: 10px!important;display:none'>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='file' name='FileUpload1' id='mobVariantImage" + (result).toString() + "' ng-model='ProductDetail.VariantImage" + (result).toString() + "' ng onchange='angular.element(this).scope().setFile1(this)' style='position: unset; opacity: unset; font - size: 16px;display:none' />";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVariantImageOriginal" + (result ).toString() + "' type='text' ng-model='ProductVariant.VariantPrice" + (result ).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='' value='' ng-show='ShowVarPrice' />";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobVarianceId" + (result ).toString() + "' type='text' ng-model='ProductVariant.ProductVarianceId" + (result ).toString() + "' placeholder='Price' style='display:none;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat text='0' value='0' ng-show='ShowVarId' />";

        $scope.vEditVariants1 = $scope.vEditVariants1 + "</div><div class='col-lg-6 col-sm-12 col-md-6' style=' padding-top:25px;' > <div class='col-lg-6 col-sm-12 col-md-6' style='padding-top:25px;' ><input class='form-control new1' checked id='mobVariantActive" + (result ).toString() + "' type='checkbox' ng-model='ProductVariant.VariantActive" + (result).toString() + "' ' style='width:20px;'/>  </div><div class='col-lg-6 col-sm-12 col-md-6'style=' padding-top:30px;' >Active</div></div></div></div>";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'> <h6 style='  float: right;'> Product image Size:270px x 360px  </h6><br></div></div > ";
        $scope.vEditVariants1 = $scope.vEditVariants1 + "</div></div>";

        if (wholesale == "1") {
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-12'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<label>From Qty</label><br/>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobWholsalefvar" + (result ).toString() + "Qty" + (result ).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantType" + (result ).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<label>To Qty</label><br/>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobWholsaleTvar" + (result ).toString() + "Qty" + (result ).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (result ).toString() + "'   placeholder='To Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + " <label>Price Per Qty</label><br/>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input class='form-control new1' id='mobWholsalevar" + (result ).toString() + "prize" + (result ).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (result ).toString() + "'  placeholder='Price Per Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";

            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-4 col-sm-12 col-md-4'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-6 col-sm-6 col-md-6'><input class='form-control new1' checked ng-init='ProductDetail.mobWholsaleVarianceActive=true'  id='WholsaleVariancevar" + (result ).toString() + "Active" + (result ).toString() + "' type='checkbox' ng-model='ProductVariant.mobWholsaleVarianceActive" + (result ).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";

            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-6 col-sm-12 col-md-6  mobWholesalehidevar" + (result ).toString() + "whole" + (result ).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + (result ) + "," + (result ) + ")'></i></div>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden'  id='mobWholesalevar" + (result ).toString() + "Id" + (result ).toString() + "' /></div ></div> ";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden' value='" + (result ) + "' id='mobWholesalecount" + (result ) + "'/> <div class='mobwholsaleVariant" + (result ).toString() + "whole" + (result ) + "' ></div> ";

        }
        if (color == "1") {
            $scope.vEditVariants1 = $scope.vEditVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + " <input class='form-control  mobcolorselector" + (result ) + "color" + (result ).toString() + "' id='mobcolorselector" + (result ) + "color" + (result ).toString() + "' value='#ff0000' type='color' />";

            $scope.vEditVariants1 = $scope.vEditVariants1 + "</div>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<input type='hidden' value='" + (result ) + "' id='Wholecolorcount" + (result ) + "'/>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div class='col-lg-3 col-sm-6 col-md-3 mobWholecolorvar" + (result ) + "color" + (result ).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + (result ) + "," + (result) + ")'></i></div>";
            $scope.vEditVariants = $scope.vEditVariants + "<input type='hidden'  id='mobcolorvariance" + (result ) + "Id" + (result ).toString() + "'/>";
            $scope.vEditVariants1 = $scope.vEditVariants1 + "<div  class='mobwholsalecolorVariant" + (result ) + "color" + (result ) + "' ></div> "

        }

        //vcountvariable = ++countvar;
        $("#variant1").append($scope.vEditVariants);
        $("#mobvariant1").append($scope.vEditVariants1);
      //  $scope.Variant = $sce.trustAsHtml($scope.vEditVariants);
     //   $scope.mobVariant = $sce.trustAsHtml($scope.vEditVariants1);
        //var result = $scope.ProductDetail.VarianceCount;
        //for (var i = 0; i < result; i++) {
        //    $scope.vVariants = $scope.vVariants + "<div class='col-lg-12'>";
        //    $scope.vVariants = $scope.vVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";

        //    $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantType" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='Variance Type' style='width: 160px;' />";
        //    $scope.vVariants = $scope.vVariants + "</div>";

        //    $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        //    $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantPrice" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='MRP' style='width: 160px;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
        //    $scope.vVariants = $scope.vVariants + "</div>";

        //    $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        //    $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantSellingPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Selling Price' style='width: 160px;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
        //    $scope.vVariants = $scope.vVariants + "</div>";

        //    $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
        //    $scope.vVariants = $scope.vVariants + "<input type='file' name='FileUpload1' id='VariantImage" + (i + 1).toString() + "' ng-model='ProductDetail.VariantImage" + (i + 1).toString() + "' ng onchange='angular.element(this).scope().setFile(this)' style='position: unset; opacity: unset; font - size: 16px;' />";
        //    $scope.vVariants = $scope.vVariants + "</div></div>";
        //}
        //
        //$scope.Variant = $sce.trustAsHtml($scope.vVariants);
    }


    $scope.Update = function () {
        
        $("#productupdate").attr("disabled", true);
        $("#productupdatedes").attr("disabled", true);
        $scope.saveloade = true;
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.ShowUpdateformob = true;
        $scope.Show = true;
        $scope.showadd = true;
        //if ($scope.ProductDetail.CategoryId == undefined || $scope.ProductDetail.CategoryId == null || $scope.ProductDetail.CategoryId == "") {
        //    $scope.msg = ProductDetailMessages(10); //'Please Enter the Description';
        //    $("#productupdate").attr("disabled", false);
        //    $scope.saveloade = false;
        //    $("#productupdatedes").attr("disabled", false);
        //    return false;
        //}

        if ($scope.ProductDetail.SubCategoryId == undefined || $scope.ProductDetail.SubCategoryId == null || $scope.ProductDetail.SubCategoryId == "") {
            $scope.msg = ProductDetailMessages(11);//'Please Enter the Title';
            $("#productupdate").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }
        if ($scope.ProductDetail.BrandTypeId == undefined || $scope.ProductDetail.BrandTypeId == null || $scope.ProductDetail.BrandTypeId == "") {
            $scope.msg = "Please Select the Brand";
            $("#productupdate").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }
        if ($scope.ProductDetail.ProductType == undefined || $scope.ProductDetail.ProductType == null || $scope.ProductDetail.ProductType == "") {
            $scope.msg = 'Please Select the ProductType';
            $("#productupdate").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }

        if ($scope.ProductDetail.Title == undefined || $scope.ProductDetail.Title == null || $scope.ProductDetail.Title == "") {
            $scope.msg = ProductDetailMessages(1);//'Please Enter the Title';
            $("#productupdate").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }

        //if ($scope.ProductDetail.Description == undefined || $scope.ProductDetail.Description == null || $scope.ProductDetail.Description == "") {
        //    $scope.msg = ProductDetailMessages(4);//'Please Enter the Title';
        //    $("#productupdate").attr("disabled", false);
        //    $("#productupdatedes").attr("disabled", false);
        //    $scope.saveloade = false;
        //    return false;
        //}


        
        //   if ($scope.ProductDetail.VarianceCount == undefined || $scope.ProductDetail.VarianceCount == null || $scope.ProductDetail.VarianceCount == "" || $scope.ProductDetail.VarianceCount == "0") {
        //$scope.saveloade = false;
        //$scope.msg = "Please Enter the valid VarianceCount";
        //$scope.IsDisabled = false;
        //return false;
        //   } else {


        var order = [];
        $scope.ProdVariance = order;
        var vCount = $scope.ProductDetail.VarianceCount + vcountvariable;
        for (var i = 0; i < vCount; i++) {
            
            var vType = "VariantType" + (i + 1).toString();
            var vPrice = "VariantPrice" + (i + 1).toString();
            var vSellingPrice = "VariantSellingPrice" + (i + 1).toString();
            var vVariantStockCount = "VariantStockCount" + (i + 1).toString();
            var vImage = "VariantImage" + (i + 1).toString();
            var vImageURL = "VariantImageOriginal" + (i + 1).toString();
            var vVariId = "VarianceId" + (i + 1).toString();
            var Active = "VariantActive" + (i + 1).toString();
            var mobvType = "mobVariantType" + (i + 1).toString();
            var mobvPrice = "mobVariantPrice" + (i + 1).toString();
            var mobvSellingPrice = "mobVariantSellingPrice" + (i + 1).toString();
            var mobvVariantStockCount = "mobVariantStockCount" + (i + 1).toString();
            var mobvImage = "mobVariantImage" + (i + 1).toString();
            var mobActive = "mobVariantActive" + (i + 1).toString();

            //
            var strType = removeSpaces(document.getElementById(vType).value);

            var strPrice = removeSpaces(document.getElementById(vPrice).value);
            //var strPrice = '0';
            var strSellingPrice = removeSpaces(document.getElementById(vSellingPrice).value);
            var strVariantStockCount = removeSpaces(document.getElementById(vVariantStockCount).value);
            var vVarImage = document.getElementById(vImage);
            var vVarianceId = document.getElementById(vVariId).value;

            var mobstrType = removeSpaces(document.getElementById(mobvType).value);
            var mobstrPrice = removeSpaces(document.getElementById(mobvPrice).value);
            //var mobstrPrice = '0';
            var mobstrSellingPrice = removeSpaces(document.getElementById(mobvSellingPrice).value);
            var mobstrVariantStockCount = removeSpaces(document.getElementById(mobvVariantStockCount).value);
            var mobvVarImage = document.getElementById(mobvImage);
            

            if (strType == "" || strType == null || strType == undefined || strType == "undefined") {
                strType = mobstrType;
            }
            if (strPrice == "" || strPrice == null || strPrice == undefined || strPrice == "undefined") {
                strPrice = mobstrPrice;
            }

            //if (mobstrPrice != "" || mobstrPrice != null || mobstrPrice != undefined || mobstrPrice != "undefined") {
            //    strPrice = mobstrPrice;
            //}


            if (strSellingPrice == "" || strSellingPrice == null || strSellingPrice == undefined || strSellingPrice == "undefined" || strSellingPrice == "0") {
                strSellingPrice = mobstrSellingPrice;
            }

            if (strVariantStockCount == "" || strVariantStockCount == null || strVariantStockCount == undefined || strVariantStockCount == "undefined" || strVariantStockCount == "0") {
                strVariantStockCount = mobstrVariantStockCount;
            }


            if (vVarImage == "" || vVarImage == null || vVarImage == undefined || vVarImage == "undefined") {
                vVarImage = mobvVarImage;
            }



            //if (document.getElementById(mobActive).checked == true) {
            //    var vVarianceActive = true;
            //}
            //else {
            //    var vVarianceActive = false;
            //}

            if ($('#' + mobActive).is(':checked')) {
                    var vVarianceActive = true;
                }
                else {
                    var vVarianceActive = false;
                }
            


        
            if ($('#' + Active).is(':checked')) {
                    var vVarianceActive = true;
                }
                else {
                    var vVarianceActive = false;
                }
            




            //var strImageURL = removeSpaces(document.getElementById(vImageURL).value);
            if (vCount != 1) {
                if (strType == undefined || strType == null || strType == "") {
                    $scope.saveloade = false;
                    $scope.msg = "Please Enter the valid VarianceType";
                    $("#productupdate").attr("disabled", false);
                    $("#productupdatedes").attr("disabled", false);
                   
                    return false;
                }
            }
           
            if (strPrice == undefined || strPrice == null || strPrice == "") {
                $scope.saveloade = false;
                $scope.msg = "Please Enter the valid MRP Price";
                $("#productupdate").attr("disabled", false);
                $("#productupdatedes").attr("disabled", false);
                $scope.saveloade = false;
                return false;

            }
            if (strSellingPrice == undefined || strSellingPrice == null || strSellingPrice == "" || strSellingPrice == "0") {
              
                $scope.msg = "Please Enter the valid Selling Price";
                $("#productupdate").attr("disabled", false);
                $("#productupdatedes").attr("disabled", false);
                $scope.saveloade = false;
                return false;

            }
            if (Number(strPrice) < Number(strSellingPrice)) {
                $scope.msg = 'SellingPrice should be less than or equal MRP Price';
                $("#productupdate").attr("disabled", false); $("#productupdatedes").attr("disabled", false);
                $scope.IsDisabled = false;
                $scope.saveloade = false;
                return false;
            }

            var wholesale = "";
            if ($('.wholesale').is(':checked')) {
                wholesale = "1";
            }
            else if ($('.retails').is(':checked')) {
                wholesale = "2";
            }
            if (wholesale == "2") {
                if ($('.mobwholesale').is(':checked')) {
                    wholesale = "1";
                }
                else if ($('.mobRetails').is(':checked')) {
                    wholesale = "2";
                }
            }
           // alert(wholesale);
            var color = "";
            if ($('.mobcolorcode').is(':checked')) {
                color = "1";
            }
            if (color == "") {
                if ($('.colorcode').is(':checked')) {
                    color = "1";
                }
            }
            if (wholesale == "1") {
                $scope.Wholesale = [];
                var wholesale = "Wholesalecount" + (i + 1).toString();
                var wholesalecount = removeSpaces(document.getElementById(wholesale).value);
                if (i != 0) {
                    wholesalecount = wholesalecount - i;
                }
                for (var j = 0; j < wholesalecount; j++) {

                    if (i != 0) {
                        j = j + i;
                    }
                    var minqty = "Wholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var maxqty = "WholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var sellprice = "Wholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                    var mobminqty = "mobWholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var mobmaxqty = "mobWholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var mobsellprice = "mobWholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                    var wholeid = "Wholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                    var mobwholeid = "mobWholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                    var Active = "WholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                    var mobActive = "mobWholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                    var strmin = removeSpaces(document.getElementById(minqty).value);
                    var strmax = removeSpaces(document.getElementById(maxqty).value);
                    var strsellprize = removeSpaces(document.getElementById(sellprice).value);
                    var mobstrmin = removeSpaces(document.getElementById(mobminqty).value);
                    var mobstrmax = removeSpaces(document.getElementById(mobmaxqty).value);
                    var mobstrsellprize = removeSpaces(document.getElementById(mobsellprice).value);
                    var WholesaleId = removeSpaces(document.getElementById(wholeid).value);
                    var mobWholesaleId = removeSpaces(document.getElementById(mobwholeid).value);

                    var active = "";
                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                        if ($("#" + mobActive).is(':checked')) {
                            active = "1";
                        }
                        else {
                            active = "0";
                        }
                    }
                    else {
                        if ($("#" + Active).is(':checked')) {
                            active = "1";
                        }
                        else {
                            active = "0";
                        }
                    }

                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                        strmin = mobstrmin;
                    }
                    if (strmax == "" || strmax == null || strmax == undefined || strmax == "undefined") {
                        strmax = mobstrmax;
                    }
                    if (strsellprize == "" || strsellprize == null || strsellprize == undefined || strsellprize == "undefined") {
                        strsellprize = mobstrsellprize;
                    }
                    if (strmin == undefined || strmin == null || strmin == "" || strmax == "0") {
                        $scope.msg = "Please Enter the valid Min Qty";
                        $("#productupdate").attr("disabled", false);
                        $("#productupdatedes").attr("disabled", false);
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;

                        return false;
                    }
                    if (strmax == undefined || strmax == null || strmax == "" || strmax == "0") {
                        $scope.msg = "Please Enter the valid Max Qty";
                        $("#productupdate").attr("disabled", false); $("#productupdatedes").attr("disabled", false);
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;
                        return false;
                    }
                    if (strsellprize == undefined || strsellprize == null || strsellprize == "" || strsellprize == "0") {
                        $scope.msg = "Please Enter the valid wholesale Selling Price";
                        $("#productupdate").attr("disabled", false); $("#productupdatedes").attr("disabled", false);
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;
                        return false;
                    }
                    if (Number(strSellingPrice) <= Number(strsellprize)) {
                        if (Number(strSellingPrice) != Number(strsellprize)) {
                            $scope.msg = 'SellingPrice should be less than or equal to wholesale Selling Price';
                            $("#productupdate").attr("disabled", false);
                            $("#productupdatedes").attr("disabled", false);
                            $scope.IsDisabled = false;
                            $scope.saveloade = false;
                            return false;
                        }

                    }
                    if (WholesaleId == undefined || WholesaleId == null || WholesaleId == "" || WholesaleId == "0") {
                        WholesaleId = mobWholesaleId;
                    }
                    $scope.Wholesale.push({ wholesaleFromQty: strmin, wholesaleprize: strSellingPrice, WholesalepriceId: WholesaleId, wholesaleToQty: strmax, VarianceActive: active, ProductVarianceId: vVarianceId, VariantStockCount: strVariantStockCount });
                }

            }
            else if ($('.retails').is(':checked')) {

            }

            // 
            if (vVarImage.files.length > 0) {
                
                var filename = null;
                var fromdata1 = new FormData();
                var order1 = [];
                $scope.theFileVarience = order1;
                for (var j = 0; j < vVarImage.files.length; j++) {
                    let rPass = Math.random().toString(36).substring(7);
                    var vFilename = rPass;
                    var vFileMessage = vFilename + vVarImage.files[j].name;
                    $scope.theFileVarience.push(vVarImage.files[j])

                    var imagesize = vVarImage.files[j].size / 1024; //in KB
                    var imgSizeMB = imagesize / 1024; //in MB
                    if (imgSizeMB > 1) {
                        alert(ProductDetailMessages(7));//('File should be between 1MB');
                        $scope.Data.Filetexts = "";
                        return false;
                    }

                    $scope.FileMessage = '';
                    filename = $scope.theFileVarience[j].name;
                    //console.log(filename.length)
                    var index = filename.lastIndexOf(".");
                    var strsubstring = filename.substring(index, filename.length);
                    if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {

                    }
                    else {
                        alert(ProductDetailMessages(8));  //('please upload correct File Name, File extension should be .png, .jpeg or .gif');
                        $scope.Data.Filetexts = "";
                        return false;
                    }

                    var vFileName = "";
                    if (vFileMessage == "" || vFileMessage == null || vFileMessage == undefined) {
                        vFileName = "";
                    }
                    else {
                        vFileName = "http://webapi."+$scope.Domain+"/Uploads/ProductDetails/" + vFileMessage; 
                    }

                    fromdata1.append("uploadedFile", vVarImage.files[j], vFileMessage);
                }
            

            // var vFileName = "http://webapi.shriharsithacommunications.in/Uploads/ProductDetails/" + vFileMessage;
            // //var vFileName = "http://localhost:56397/Uploads/ProductDetails/" + vFileMessage;
                $scope.ProdVariance.push({ VarianceType: strType, VariancePrice: strPrice, sellingPrice: strSellingPrice, ImageUrl: vFileName, vFileMessage, ProductVarianceId: vVarianceId, VarianceActive: vVarianceActive, StockCount: strVariantStockCount});

              var request = {
              method: 'POST',
              url: vUrl + "FileUpload/ProductVarienceDetails",
              data: fromdata1,
              params: { CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
              headers: {
              'Content-Type': undefined
              }
              };
              $http(request).then(function mySuccess(response) {
              var Picture = response.data;


              }).catch(function myError(response) {

              });
            // }
            // else {

            // $scope.ProdVariance.push({ VarianceType: strType, VariancePrice: strPrice, sellingPrice: strSellingPrice, ProductVarianceId: vVarianceId, ImageUrl: "", VarianceActive: true });
            // }


            }
            else {
                $scope.ProdVariance.push({ VarianceType: strType, VariancePrice: strPrice, sellingPrice: strSellingPrice, ImageUrl: "", ProductVarianceId: vVarianceId, VarianceActive: vVarianceActive, StockCount: strVariantStockCount });
            }

           }




        var vProdFeatures = '';
        if ($scope.ProdFeatures != undefined && $scope.ProdFeatures != null) {
            if ($scope.ProdFeatures.ProductFeatures1 != undefined && $scope.ProdFeatures.ProductFeatures1 != null && $scope.ProdFeatures.ProductFeatures1 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures1;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures1;
            }
            if ($scope.ProdFeatures.ProductFeatures2 != undefined && $scope.ProdFeatures.ProductFeatures2 != null && $scope.ProdFeatures.ProductFeatures2 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures2;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures2;
            }
            if ($scope.ProdFeatures.ProductFeatures3 != undefined && $scope.ProdFeatures.ProductFeatures3 != null && $scope.ProdFeatures.ProductFeatures3 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures3;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures3;
            }
            if ($scope.ProdFeatures.ProductFeatures4 != undefined && $scope.ProdFeatures.ProductFeatures4 != null && $scope.ProdFeatures.ProductFeatures4 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures4;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures4;
            }
            if ($scope.ProdFeatures.ProductFeatures5 != undefined && $scope.ProdFeatures.ProductFeatures5 != null && $scope.ProdFeatures.ProductFeatures5 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures5;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures5;
            }
            if ($scope.ProdFeatures.ProductFeatures6 != undefined && $scope.ProdFeatures.ProductFeatures6 != null && $scope.ProdFeatures.ProductFeatures6 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures6;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures6;
            }
            if ($scope.ProdFeatures.ProductFeatures7 != undefined && $scope.ProdFeatures.ProductFeatures7 != null && $scope.ProdFeatures.ProductFeatures7 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures7;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures7;
            }
            if ($scope.ProdFeatures.ProductFeatures8 != undefined && $scope.ProdFeatures.ProductFeatures8 != null && $scope.ProdFeatures.ProductFeatures8 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures8;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures8;

            }
            if ($scope.ProdFeatures.ProductFeatures9 != undefined && $scope.ProdFeatures.ProductFeatures9 != null && $scope.ProdFeatures.ProductFeatures9 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures9;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures9;
            }
            if ($scope.ProdFeatures.ProductFeatures10 != undefined && $scope.ProdFeatures.ProductFeatures10 != null && $scope.ProdFeatures.ProductFeatures10 != "") {
                if (vProdFeatures == "")
                    vProdFeatures = $scope.ProdFeatures.ProductFeatures10;
                else
                    vProdFeatures = vProdFeatures + "|" + $scope.ProdFeatures.ProductFeatures10;
            }
        }
        var vProdTecDetails = "";

        if ($scope.ProdTecDetails != undefined && $scope.ProdTecDetails != null) {
            if ($scope.ProdTecDetails.ProductTecDetails1 != undefined && $scope.ProdTecDetails.ProductTecDetails1 != null && $scope.ProdTecDetails.ProductTecDetails1 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails1;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails1;
            }
            if ($scope.ProdTecDetails.ProductTecDetails2 != undefined && $scope.ProdTecDetails.ProductTecDetails2 != null && $scope.ProdTecDetails.ProductTecDetails2 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails2;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails2;
            }
            if ($scope.ProdTecDetails.ProductTecDetails3 != undefined && $scope.ProdTecDetails.ProductTecDetails3 != null && $scope.ProdTecDetails.ProductTecDetails3 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails3;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails3;
            }
            if ($scope.ProdTecDetails.ProductTecDetails4 != undefined && $scope.ProdTecDetails.ProductTecDetails4 != null && $scope.ProdTecDetails.ProductTecDetails4 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails4;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails4;
            }
            if ($scope.ProdTecDetails.ProductTecDetails5 != undefined && $scope.ProdTecDetails.ProductTecDetails5 != null && $scope.ProdTecDetails.ProductTecDetails5 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails5;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails5;
            }
            if ($scope.ProdTecDetails.ProductTecDetails6 != undefined && $scope.ProdTecDetails.ProductTecDetails6 != null && $scope.ProdTecDetails.ProductTecDetails6 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails6;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails6;
            }
            if ($scope.ProdTecDetails.ProductTecDetails7 != undefined && $scope.ProdTecDetails.ProductTecDetails7 != null && $scope.ProdTecDetails.ProductTecDetails7 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails7;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails7;
            }
            if ($scope.ProdTecDetails.ProductTecDetails8 != undefined && $scope.ProdTecDetails.ProductTecDetails8 != null && $scope.ProdTecDetails.ProductTecDetails8 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails8;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails8;
            }
            if ($scope.ProdTecDetails.ProductTecDetails9 != undefined && $scope.ProdTecDetails.ProductTecDetails9 != null && $scope.ProdTecDetails.ProductTecDetails9 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails9;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails9;
            }
            if ($scope.ProdTecDetails.ProductTecDetails10 != undefined && $scope.ProdTecDetails.ProductTecDetails10 != null && $scope.ProdTecDetails.ProductTecDetails10 != "") {
                if (vProdTecDetails == "")
                    vProdTecDetails = $scope.ProdTecDetails.ProductTecDetails10;
                else
                    vProdTecDetails = vProdTecDetails + "|" + $scope.ProdTecDetails.ProductTecDetails10;
            }
        }
        

        var vProdId = $scope.ProductDetail.HiddenProductId;
        var fromdata = new FormData();

        if ($scope.theFile != undefined && $scope.theFile != "") {
            for (var i = 0; i < $scope.theFile.length; i++) {
                fromdata.append("uploadedFile", $scope.theFile[i]);
            }
            //fromdata.append("uploadedFile", $scope.theFile);
            
            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UpdateProductImage",
                data: fromdata,
                params: { ProductId: vProdId, CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function (response) {
                
                var Picture = response.data;
                $scope.theFile =  "";

            }).then(function (response) {
            });
        }
        else {

        }

        if ($scope.ProductDetail.Variance == true) {
            $scope.ProductDetail.Variance = 1;
        }
        else
            $scope.ProductDetail.Variance = 0;
        
        $scope.ProductDetail.ProdFeatures = vProdFeatures;
        $scope.ProductDetail.ProdTecDetails = vProdTecDetails;
        $scope.ProductDetail.UpdatedBy = vAdminId;
        var ProductDetail = $scope.ProductDetail;
        var Discount = (ProductDetail.DiscountDetailsId != null ? ProductDetail.DiscountDetailsId : "");
        var Coupoun = (ProductDetail.CouponId != null ? ProductDetail.CouponId : "");
        $http({
            url: vUrl + "ProductDetails/UpdateProduct",
            dataType: 'json',
            method: 'POST',
            data: ProductDetail,
            params: { ProductId: vProdId, CompanyId: vCompanyId, BrandTypeId: ProductDetail.BrandTypeId, SubCategory: ProductDetail.SubCategoryId, Discount1: Discount, Coupoun1: Coupoun },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            $timeout(function () {
                $timeout(function () {
                   
                }, 200);
            }, 200);
            $("#productupdate").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            $scope.InsertedBy = "";
            $scope.msgStatus = ProductDetailMessages(9);
            $scope.prod = true;
            $scope.ProductDetail.Title = "";
            $scope.ProductDetail.Description = "";
            $scope.ProductDetail.Price = "";
            $scope.ProductDetail.CategoryId = "";
            $scope.ProductDetail.CouponId = "";
            vcountvariable = 0;
            //$scope.ProductDetail.CouponId = "";
            $scope.ProductDetail.VariancePrice = "";
            $scope.ProductDetail.sellingPrice = "";
            $scope.ProductDetail.SubCategoryId = "";
            $scope.ProductDetail.BrandTypeId = "";
            $scope.ProductDetail.DiscountDetailsId = "";
            $scope.ProductDetail.TaxDetailsId = "";
            $scope.ProductDetail.ProductType = "";
            document.getElementById("FileUpload1").value = "";
            $scope.showadd = false;          
            $scope.ProdFeatures.ProductFeatures1 = "";
            $scope.ProdFeatures.ProductFeatures2 = "";
            $scope.ProdFeatures.ProductFeatures3 = "";
            $scope.ProdFeatures.ProductFeatures4 = "";
            $scope.ProdFeatures.ProductFeatures5 = "";
            $scope.ProdFeatures.ProductFeatures6 = "";
            $scope.ProdFeatures.ProductFeatures7 = "";
            $scope.ProdFeatures.ProductFeatures7 = "";
            $scope.ProdFeatures.ProductFeatures8 = "";
            $scope.ProdFeatures.ProductFeatures9 = "";
            $scope.ProdFeatures.ProductFeatures10 = "";
            $scope.ProdTecDetails.ProductTecDetails1 = "";
            $scope.ProdTecDetails.ProductTecDetails2 = "";
            $scope.ProdTecDetails.ProductTecDetails3 = "";
            $scope.ProdTecDetails.ProductTecDetails4 = "";
            $scope.ProdTecDetails.ProductTecDetails5 = "";
            $scope.ProdTecDetails.ProductTecDetails6 = "";
            $scope.ProdTecDetails.ProductTecDetails7 = "";
            $scope.ProdTecDetails.ProductTecDetails8 = "";
            $scope.ProdTecDetails.ProductTecDetails9 = "";
            $scope.ProdTecDetails.ProductTecDetails10 = "";
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.ShowUpdateformob = false;
            $scope.Show = false;
            $scope.HiddenProductId = "";
            $scope.resultOPImage = "";
            $scope.imgEditTime = false;
            $scope.Image = '';
            $scope.ProductDetail.IsActive = true;
            $scope.ProductDetail.colorcode1 = false;
            $scope.ProductDetail.colorcode = false;

        });
        var vCount1 = 0;
        
        var ProdVarience = $scope.ProdVariance;
        for (var i = 0; i < ProdVarience.length; i++) {
            $scope.ProdVariance1 = [];
            $scope.ProdVariance1.push({ VarianceType: ProdVarience[i].VarianceType, VariancePrice: ProdVarience[i].VariancePrice, sellingPrice: ProdVarience[i].sellingPrice, ImageUrl: ProdVarience[i].ImageUrl, ProductVarianceId: ProdVarience[i].ProductVarianceId, VarianceActive: ProdVarience[i].VarianceActive, StockCount: ProdVarience[i].StockCount});

            var provari1 = $scope.ProdVariance1;

            $http({
                url: vUrl + "ProductDetails/UpdateProductVariance",
                dataType: 'json',
                method: 'POST',
                params: { ProductId: vProdId, VaDMIN: vAdminId },
                data: JSON.stringify(provari1),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                vCount1 = vCount1 + 1;
                
                var productvarId = response.data;
            //    alert(productvarId);
                for (var i = 0; i < 1; i++) {
              //      alert(productvarId);
                    i = vCount1 - 1;
                    var wholesale = "";
                    if ($('.wholesale').is(':checked')) {
                        wholesale = "1";
                    }
                    else if ($('.retails').is(':checked')) {
                        wholesale = "2";
                    }
                    if (wholesale == "2") {
                        if ($('.mobwholesale').is(':checked')) {
                            wholesale = "1";
                        }
                        else if ($('.mobRetails').is(':checked')) {
                            wholesale = "2";
                        }
                    }

                    var color = "";
                    if ($('.mobcolorcode').is(':checked')) {
                        color = "1";
                    }
                    if (color == "") {
                        if ($('.colorcode').is(':checked')) {
                            color = "1";
                        }
                    }
                //    alert(wholesale);
                    if (wholesale == "1") {
                  //      alert(productvarId);
                        if (productvarId != null) {
                            var wholesale1 = "Wholesalecount" + (i + 1).toString();
                            $scope.Wholesale1 = [];
                            var wholesalecount = (document.getElementById(wholesale1));
                            if (wholesalecount != null) {
                                wholesalecount = document.getElementById(wholesale1).value;
                                if (i != 0) {
                                    wholesalecount = wholesalecount - i;
                                }
                                for (var j = 0; j < wholesalecount; j++) {

                                    if (i != 0) {
                                        j = j + i;
                                    }
                                    var minqty = "Wholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var maxqty = "WholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var sellprice = "Wholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                                    var mobminqty = "mobWholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var mobmaxqty = "mobWholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var mobsellprice = "mobWholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                                    var wholeid = "Wholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                                    var mobwholeid = "mobWholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                                    var Active = "WholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                                    var mobActive = "mobWholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                                    var strmin = removeSpaces(document.getElementById(minqty).value);
                                    var strmax = removeSpaces(document.getElementById(maxqty).value);
                                    var strsellprize = removeSpaces(document.getElementById(sellprice).value);
                                    var mobstrmin = removeSpaces(document.getElementById(mobminqty).value);
                                    var mobstrmax = removeSpaces(document.getElementById(mobmaxqty).value);
                                    var mobstrsellprize = removeSpaces(document.getElementById(mobsellprice).value);
                                    var WholesaleId = removeSpaces(document.getElementById(wholeid).value);
                                    var mobWholesaleId = removeSpaces(document.getElementById(mobwholeid).value);

                                    var active = "";
                                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                                        if ($("#" + mobActive).is(':checked')) {
                                            active = "1";
                                        }
                                        else {
                                            active = "0";
                                        }
                                    }
                                    else {
                                        if ($("#" + Active).is(':checked')) {
                                            active = "1";
                                        }
                                        else {
                                            active = "0";
                                        }
                                    }

                                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                                        strmin = mobstrmin;
                                    }
                                    if (strmax == "" || strmax == null || strmax == undefined || strmax == "undefined") {
                                        strmax = mobstrmax;
                                    }
                                    if (strsellprize == "" || strsellprize == null || strsellprize == undefined || strsellprize == "undefined") {
                                        strsellprize = mobstrsellprize;
                                    }
                                    if (WholesaleId == undefined || WholesaleId == null || WholesaleId == "" || WholesaleId == "0") {
                                        WholesaleId = mobWholesaleId;
                                    }
                                    var ProductvarId1 = response.data;
                                    $scope.Wholesale1.push({ wholesaleFromQty: strmin, wholesaleprize: strsellprize, WholesalepriceId: WholesaleId, wholesaleToQty: strmax, VarianceActive: active, ProductVarianceId: ProductvarId1 });
                                }
                    //            alert(productvarId);

                                var wholesalevalue = $scope.Wholesale1;
                                if (wholesalevalue != "" && wholesalevalue != null && wholesalevalue != undefined && wholesalevalue != "undefiened") {
                      //              alert(productvarId);
                                    $http({
                                        url: vUrl + "ProductDetails/UpdatewholesaleProductVariance",
                                        dataType: 'json',
                                        method: 'POST',
                                        params: { ProductvarId: productvarId },
                                        data: JSON.stringify(wholesalevalue),
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function (response) {
                                        var color = "";
                                        var colorcode = "";
                                        if (provari1.length == vCount1) {
                                            if ($(".colorcode").is(':checked')) {
                                                color = "1";
                                            }
                                            $scope.multicolor1 = [];
                                            if (color == "1") {
                                                var colorsale = "Wholecolorcount" + (i + 1).toString();
                                                var colorcount = document.getElementById(colorsale);
                                                if (colorcount != null) {
                                                    //if (i != 0) {
                                                    //    colorcount = colorcount - i;
                                                    //}
                                                    colorcount = document.getElementById(colorsale).value;
                                                    for (var j = 0; j < colorcount; j++) {

                                                        if (i != 0) {
                                                            j = j + i;
                                                        }
                                                        var Color = "colorselector" + (i + 1) + "color" + (j + 1).toString();

                                                        var mobColor = "mobcolorselector" + (i + 1) + "color" + (j + 1).toString();
                                                        var mobcolorvariance = "mobcolorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                                        var colorvariance = "colorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                                        var mobcolorcode = removeSpaces(document.getElementById(mobColor).value);
                                                        colorcode = removeSpaces(document.getElementById(Color).value);
                                                        var colorvariance = removeSpaces(document.getElementById(colorvariance).value);
                                                        var mobcolorvariance = removeSpaces(document.getElementById(mobcolorvariance).value);
                                                        if (colorcode == "" || colorcode == null || colorcode == undefined || colorcode == "undefiend") {
                                                            colorcode = mobcolorcode;
                                                        }
                                                        if (colorvariance == "" || colorvariance == null || colorvariance == undefined || colorvariance == "undefiend") {
                                                            colorvariance = mobcolorvariance;
                                                        }
                                                        $scope.multicolor1.push({ colorcode: colorcode, colorvariance: colorvariance });
                                                    }
                                                    var productvarianceId = response.data;
                                                    var multicolor = $scope.multicolor1;
                                                    $http({
                                                        url: vUrl + "ProductDetails/Updatecolorvariance",
                                                        dataType: 'json',
                                                        method: 'POST',
                                                        params: { ProductvarianceId: productvarianceId },
                                                        data: JSON.stringify(multicolor),
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        }
                                                    }).then(function (response) {
                                                        var wholesale = $scope.wholesale;

                                                        
                                                        $scope.Variant = null;
                                                        $scope.mobVariant = null;
                                                        $scope.mobVariant = null;
                                                        $scope.ShowPriceCommon = true;
                                                        if (headercolor == "0") {
                                                            $scope.ShowVarianseCount = true;
                                                        }
                                                        else {
                                                            $scope.ShowVarianseCount = false;
                                                        }
                                                        $scope.BindGrid(1);
                                                        $scope.mobVariant = null;
                                                        $scope.ProductDetail.VarianceCount = 0;
                                                        $("input[type='file']").val('');
                                                        $(".retails").prop('checked', false);
                                                        $(".wholesale").prop('checked', false);
                                                        $(".mobRetails").prop('checked', false);
                                                        $(".mobwholesale").prop('checked', false);
                                                        $scope.saveloade = false;
                                                    }).catch(function (response) {
                                                        
                                                    });
                                                }

                                            }
                                            else {
                                                $scope.Variant = null;

                                                $scope.mobVariant = null;
                                                $scope.ShowPriceCommon = true;
                                                if (headercolor == "0") {
                                                    $scope.ShowVarianseCount = true;
                                                }
                                                else {
                                                    $scope.ShowVarianseCount = false;
                                                }
                                                $scope.BindGrid(1);
                                                $scope.mobVariant = null;
                                                $scope.ProductDetail.VarianceCount = 0;
                                                $("input[type='file']").val('');
                                                $scope.saveloade = false;
                                                $(".retails").prop('checked', false);
                                                $(".wholesale").prop('checked', false);
                                                $(".mobRetails").prop('checked', false);
                                                $(".mobwholesale").prop('checked', false);
                                            }
                                        }
                                       

                                    });
                                }
                            }
                        }
                    }
                    else if ($('.retails').is(':checked')) {
                        var color = "";
                        var colorcode = "";
                        if ($(".colorcode").is(':checked')) {
                            color = "1";
                        }
                        $scope.multicolor1 = [];
                        if (color == "1") {
                            var colorsale = "Wholecolorcount" + (i + 1).toString();
                            var colorcount = document.getElementById(colorsale);
                            if (colorcount != null) {
                                //if (i != 0) {
                                //    colorcount = colorcount - i;
                                //}
                                colorcount = document.getElementById(colorsale).value;
                                for (var j = 0; j < colorcount; j++) {

                                    if (i != 0) {
                                        j = j + i;
                                    }
                                    var Color = "colorselector" + (i + 1) + "color" + (j + 1).toString();

                                    var mobColor = "mobcolorselector" + (i + 1) + "color" + (j + 1).toString();
                                    var mobcolorvariance = "mobcolorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                    var colorvariance = "colorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                    var mobcolorcode = removeSpaces(document.getElementById(mobColor).value);
                                    colorcode = removeSpaces(document.getElementById(Color).value);
                                    var colorvariance = removeSpaces(document.getElementById(colorvariance).value);
                                    var mobcolorvariance = removeSpaces(document.getElementById(mobcolorvariance).value);
                                    if (colorcode == "" || colorcode == null || colorcode == undefined || colorcode == "undefiend") {
                                        colorcode = mobcolorcode;
                                    }
                                    if (colorvariance == "" || colorvariance == null || colorvariance == undefined || colorvariance == "undefiend") {
                                        colorvariance = mobcolorvariance;
                                    }
                                    $scope.multicolor1.push({ colorcode: colorcode, colorvariance: colorvariance });
                                }
                                var productvarianceId = response.data;
                                var multicolor = $scope.multicolor1;
                                $http({
                                    url: vUrl + "ProductDetails/Updatecolorvariance",
                                    dataType: 'json',
                                    method: 'POST',
                                    params: { ProductvarianceId: productvarianceId },
                                    data: JSON.stringify(multicolor),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(function (response) {
                                    var wholesale = $scope.wholesale;

                                    
                                    $scope.Variant = null;
                                    $scope.mobVariant = null;
                                    $scope.mobVariant = null;
                                    $scope.ShowPriceCommon = true;
                                    if (headercolor == "0") {
                                        $scope.ShowVarianseCount = true;
                                    }
                                    else {
                                        $scope.ShowVarianseCount = false;
                                    }
                                    $scope.BindGrid(1);
                                    $scope.mobVariant = null;
                                    $scope.ProductDetail.VarianceCount = 0;
                                    $("input[type='file']").val('');
                                    $scope.saveloade = false;
                                    $(".retails").prop('checked', false);
                                    $(".wholesale").prop('checked', false);
                                    $(".mobRetails").prop('checked', false);
                                    $(".mobwholesale").prop('checked', false);
                                }).catch(function (response) {
                                    
                                });
                            }

                        }
                        else {
                            $scope.Variant = null;
                            $scope.BindGrid(1);
                            $scope.mobVariant = null;
                            $scope.ShowPriceCommon = true;
                            if (headercolor == "0") {
                                $scope.ShowVarianseCount = true;
                            }
                            else {
                                $scope.ShowVarianseCount = false;
                            }
                            $scope.mobVariant = null;
                            $scope.ProductDetail.VarianceCount = 0;
                            $("input[type='file']").val('');
                            $scope.saveloade = false;
                            $(".retails").prop('checked', false);
                            $(".wholesale").prop('checked', false);
                            $(".mobRetails").prop('checked', false);
                            $(".mobwholesale").prop('checked', false);
                        }

                        $scope.Variant = null;
                        $scope.mobVariant = null;
                        $scope.ShowPriceCommon = true;
                        if (headercolor == "0") {
                            $scope.ShowVarianseCount = true;
                        }
                        else {
                            $scope.ShowVarianseCount = false;
                        }
                        $scope.mobVariant = null;
                        $scope.ProductDetail.VarianceCount = 0;
                        $("input[type='file']").val('');
                        $(".retails").prop('checked', false);
                        $(".wholesale").prop('checked', false);
                        $(".mobRetails").prop('checked', false);
                        $(".mobwholesale").prop('checked', false);
                        $scope.saveloade = false;
                    }
                 
                }
            });


        }




    
    }

    $scope.Updateformobile = function () {
        
        $("#productupdate").attr("disabled", true);
        $("#productupdatemob").attr("disabled", true);
        $("#productupdatedes").attr("disabled", true);
        $scope.saveloade = true;
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.ShowSave = false;
       
       
        $scope.ShowUpdateformob = true;
        $scope.Show = true;
        $scope.showadd = true;
        if ($scope.ProductDetail.CategoryId == undefined || $scope.ProductDetail.CategoryId == null || $scope.ProductDetail.CategoryId == "") {
            $scope.msg = ProductDetailMessages(10); //'Please Enter the Description';
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $scope.saveloade = false;
            $("#productupdatedes").attr("disabled", false);
            return false;
        }

        if ($scope.ProductDetail.SubCategoryId == undefined || $scope.ProductDetail.SubCategoryId == null || $scope.ProductDetail.SubCategoryId == "") {
            $scope.msg = ProductDetailMessages(11);//'Please Enter the Title';
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }
        if ($scope.ProductDetail.BrandTypeId == undefined || $scope.ProductDetail.BrandTypeId == null || $scope.ProductDetail.BrandTypeId == "") {
            $scope.msg = "Please Select the Brand";
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }
        if ($scope.ProductDetail.ProductType == undefined || $scope.ProductDetail.ProductType == null || $scope.ProductDetail.ProductType == "") {
            $scope.msg = 'Please Select the ProductType';
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }

        if ($scope.ProductDetail.Title == undefined || $scope.ProductDetail.Title == null || $scope.ProductDetail.Title == "") {
            $scope.msg = ProductDetailMessages(1);//'Please Enter the Title';
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }

        if ($scope.ProductDetail.Description == undefined || $scope.ProductDetail.Description == null || $scope.ProductDetail.Description == "") {
            $scope.msg = ProductDetailMessages(4);//'Please Enter the Title';
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            return false;
        }


        
        //   if ($scope.ProductDetail.VarianceCount == undefined || $scope.ProductDetail.VarianceCount == null || $scope.ProductDetail.VarianceCount == "" || $scope.ProductDetail.VarianceCount == "0") {
        //$scope.saveloade = false;
        //$scope.msg = "Please Enter the valid VarianceCount";
        //$scope.IsDisabled = false;
        //return false;
        //   } else {


        var order = [];
        $scope.ProdVariance = order;
        var vCount = $scope.ProductDetail.VarianceCount + vcountvariable;
        for (var i = 0; i < vCount; i++) {
            
            var vType = "VariantType" + (i + 1).toString();
            var vPrice = "VariantPrice" + (i + 1).toString();
            var vSellingPrice = "VariantSellingPrice" + (i + 1).toString();
            var vVariantStockCount = "VariantStockCount" + (i + 1).toString();
            var vImage = "VariantImage" + (i + 1).toString();
            var vImageURL = "VariantImageOriginal" + (i + 1).toString();
            var vVariId = "VarianceId" + (i + 1).toString();
            var Active = "VariantActive" + (i + 1).toString();
            var mobvType = "mobVariantType" + (i + 1).toString();
            var mobvPrice = "mobVariantPrice" + (i + 1).toString();
            var mobvSellingPrice = "mobVariantSellingPrice" + (i + 1).toString();
            var mobvVariantStockCount = "mobVariantStockCount" + (i + 1).toString();
            var mobvImage = "mobVariantImage" + (i + 1).toString();
            var mobActive = "mobVariantActive" + (i + 1).toString();

          
            var strType = removeSpaces(document.getElementById(vType).value);

            var strPrice = removeSpaces(document.getElementById(vPrice).value);
            //var strPrice = '0';
            var strSellingPrice = removeSpaces(document.getElementById(vSellingPrice).value);
            var strVariantStockCount = removeSpaces(document.getElementById(vVariantStockCount).value);
            var vVarImage = document.getElementById(vImage);
            var vVarianceId = document.getElementById(vVariId).value;

            var mobstrType = removeSpaces(document.getElementById(mobvType).value);
            var mobstrPrice = removeSpaces(document.getElementById(mobvPrice).value);
            //var mobstrPrice = '0';
            var mobstrSellingPrice = removeSpaces(document.getElementById(mobvSellingPrice).value);
            var mobstrVariantStockCount = removeSpaces(document.getElementById(mobvVariantStockCount).value);
            var mobvVarImage = document.getElementById(mobvImage);
            

            //if (strType == "" || strType == null || strType == undefined || strType == "undefined") {
            //    strType = mobstrType;
            //}
            //if (strPrice == "" || strPrice == null || strPrice == undefined || strPrice == "undefined") {
            //    strPrice = mobstrPrice;
            //}

            //if (mobstrPrice != "" || mobstrPrice != null || mobstrPrice != undefined || mobstrPrice != "undefined") {
            //    strPrice = mobstrPrice;
            //}


            //if (strSellingPrice == "" || strSellingPrice == null || strSellingPrice == undefined || strSellingPrice == "undefined" || strSellingPrice == "0") {
            //    strSellingPrice = mobstrSellingPrice;
            //}
            //if (vVarImage == "" || vVarImage == null || vVarImage == undefined || vVarImage == "undefined") {
            //    vVarImage = mobvVarImage;
            //}



            //if (document.getElementById(mobActive).checked == true) {
            //    var vVarianceActive = true;
            //}
            //else {
            //    var vVarianceActive = false;
            //}

            if ($('#' + mobActive).is(':checked')) {
                var vVarianceActive = true;
            }
            else {
                var vVarianceActive = false;
            }




            if ($('#' + Active).is(':checked')) {
                var vVarianceActive = true;
            }
            else {
                var vVarianceActive = false;
            }





            //var strImageURL = removeSpaces(document.getElementById(vImageURL).value);
            if (vCount != 1) {
                if (mobstrType == undefined || mobstrType == null || mobstrType == "") {
                    $scope.saveloade = false;
                    $scope.msg = "Please Enter the valid VarianceType";
                    $("#productupdate").attr("disabled", false);
                    $("#productupdatemob").attr("disabled", false);
                    $("#productupdatedes").attr("disabled", false);

                    return false;
                }
            }

            if (mobstrPrice == undefined || mobstrPrice == null || mobstrPrice == "") {
                $scope.saveloade = false;
                $scope.msg = "Please Enter the valid MRP Price";
                $("#productupdate").attr("disabled", false);
                $("#productupdatemob").attr("disabled", false);
                $("#productupdatedes").attr("disabled", false);
                $scope.saveloade = false;
                return false;

            }
            if (mobstrSellingPrice == undefined || mobstrSellingPrice == null || mobstrSellingPrice == "" || mobstrSellingPrice == "0") {

                $scope.msg = "Please Enter the valid Selling Price";
                $("#productupdate").attr("disabled", false);
                $("#productupdatemob").attr("disabled", false);
                $("#productupdatedes").attr("disabled", false);
                $scope.saveloade = false;
                return false;

            }
            if (Number(mobstrPrice) < Number(mobstrSellingPrice)) {
                $scope.msg = 'SellingPrice should be less than or equal MRP Price';
                $("#productupdate").attr("disabled", false); $("#productupdatedes").attr("disabled", false);
                $("#productupdatemob").attr("disabled", false);
                $scope.IsDisabled = false;
                $scope.saveloade = false;
                return false;
            }

            var wholesale = "";
            if ($('.wholesale').is(':checked')) {
                wholesale = "1";
            }
            else if ($('.retails').is(':checked')) {
                wholesale = "2";
            }
            if (wholesale == "2") {
                if ($('.mobwholesale').is(':checked')) {
                    wholesale = "1";
                }
                else if ($('.mobRetails').is(':checked')) {
                    wholesale = "2";
                }
            }
            // alert(wholesale);
            var color = "";
            if ($('.mobcolorcode').is(':checked')) {
                color = "1";
            }
            if (color == "") {
                if ($('.colorcode').is(':checked')) {
                    color = "1";
                }
            }
            if (wholesale == "1") {
                $scope.Wholesale = [];
                var wholesale = "Wholesalecount" + (i + 1).toString();
                var wholesalecount = removeSpaces(document.getElementById(wholesale).value);
                if (i != 0) {
                    wholesalecount = wholesalecount - i;
                }
                for (var j = 0; j < wholesalecount; j++) {

                    if (i != 0) {
                        j = j + i;
                    }
                    var minqty = "Wholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var maxqty = "WholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var sellprice = "Wholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                    var mobminqty = "mobWholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var mobmaxqty = "mobWholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                    var mobsellprice = "mobWholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                    var wholeid = "Wholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                    var mobwholeid = "mobWholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                    var Active = "WholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                    var mobActive = "mobWholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                    var strmin = removeSpaces(document.getElementById(minqty).value);
                    var strmax = removeSpaces(document.getElementById(maxqty).value);
                    var strsellprize = removeSpaces(document.getElementById(sellprice).value);
                    var mobstrmin = removeSpaces(document.getElementById(mobminqty).value);
                    var mobstrmax = removeSpaces(document.getElementById(mobmaxqty).value);
                    var mobstrsellprize = removeSpaces(document.getElementById(mobsellprice).value);
                    var WholesaleId = removeSpaces(document.getElementById(wholeid).value);
                    var mobWholesaleId = removeSpaces(document.getElementById(mobwholeid).value);

                    var active = "";
                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                        if ($("#" + mobActive).is(':checked')) {
                            active = "1";
                        }
                        else {
                            active = "0";
                        }
                    }
                    else {
                        if ($("#" + Active).is(':checked')) {
                            active = "1";
                        }
                        else {
                            active = "0";
                        }
                    }

                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                        strmin = mobstrmin;
                    }
                    if (strmax == "" || strmax == null || strmax == undefined || strmax == "undefined") {
                        strmax = mobstrmax;
                    }
                    if (strsellprize == "" || strsellprize == null || strsellprize == undefined || strsellprize == "undefined") {
                        strsellprize = mobstrsellprize;
                    }
                    if (strmin == undefined || strmin == null || strmin == "" || strmax == "0") {
                        $scope.msg = "Please Enter the valid Min Qty";
                        $("#productupdate").attr("disabled", false);
                        $("#productupdatemob").attr("disabled", false);
                        $("#productupdatedes").attr("disabled", false);
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;

                        return false;
                    }
                    if (strmax == undefined || strmax == null || strmax == "" || strmax == "0") {
                        $scope.msg = "Please Enter the valid Max Qty";
                        $("#productupdate").attr("disabled", false); $("#productupdatedes").attr("disabled", false);
                        $("#productupdatemob").attr("disabled", false);
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;
                        return false;
                    }
                    if (strsellprize == undefined || strsellprize == null || strsellprize == "" || strsellprize == "0") {
                        $scope.msg = "Please Enter the valid wholesale Selling Price";
                        $("#productupdate").attr("disabled", false); $("#productupdatedes").attr("disabled", false);
                        $("#productupdatemob").attr("disabled", false); 
                        $scope.IsDisabled = false;
                        $scope.saveloade = false;
                        return false;
                    }
                    if (Number(strSellingPrice) <= Number(strsellprize)) {
                        if (Number(strSellingPrice) != Number(strsellprize)) {
                            $scope.msg = 'SellingPrice should be less than or equal to wholesale Selling Price';
                            $("#productupdate").attr("disabled", false);
                            $("#productupdatemob").attr("disabled", false);
                            $("#productupdatedes").attr("disabled", false);
                            $scope.IsDisabled = false;
                            $scope.saveloade = false;
                            return false;
                        }

                    }
                    if (WholesaleId == undefined || WholesaleId == null || WholesaleId == "" || WholesaleId == "0") {
                        WholesaleId = mobWholesaleId;
                    }
                    $scope.Wholesale.push({ wholesaleFromQty: strmin, wholesaleprize: strSellingPrice, WholesalepriceId: WholesaleId, wholesaleToQty: strmax, VarianceActive: active, ProductVarianceId: vVarianceId, VariantStockCount: mobstrVariantStockCount });
                }

            }
            else if ($('.retails').is(':checked')) {

            }

            // 
            if (mobvVarImage.files.length > 0) {
                
                var filename = null;
                var fromdata1 = new FormData();
                var order1 = [];
                $scope.theFileVarience = order1;
                for (var j = 0; j < mobvVarImage.files.length; j++) {
                    let rPass = Math.random().toString(36).substring(7);
                    var vFilename = rPass;
                    var vFileMessage = vFilename + mobvVarImage.files[j].name;
                    $scope.theFileVarience.push(mobvVarImage.files[j])

                    var imagesize = mobvVarImage.files[j].size / 1024; //in KB
                    var imgSizeMB = imagesize / 1024; //in MB
                    if (imgSizeMB > 1) {
                        alert(ProductDetailMessages(7));//('File should be between 1MB');
                        $scope.Data.Filetexts = "";
                        return false;
                    }

                    $scope.FileMessage = '';
                    filename = $scope.theFileVarience[j].name;
                    //console.log(filename.length)
                    var index = filename.lastIndexOf(".");
                    var strsubstring = filename.substring(index, filename.length);
                    if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {

                    }
                    else {
                        alert(ProductDetailMessages(8));  //('please upload correct File Name, File extension should be .png, .jpeg or .gif');
                        $scope.Data.Filetexts = "";
                        return false;
                    }

                    var vFileName = "";
                    if (vFileMessage == "" || vFileMessage == null || vFileMessage == undefined) {
                        vFileName = "";
                    }
                    else {
                        vFileName = "http://webapi."+$scope.Domain+"/Uploads/ProductDetails/" + vFileMessage;
                    }

                    fromdata1.append("uploadedFile", mobvVarImage.files[j], vFileMessage);
                }


                // var vFileName = "http://webapi.shriharsithacommunications.in/Uploads/ProductDetails/" + vFileMessage;
                // //var vFileName = "http://localhost:56397/Uploads/ProductDetails/" + vFileMessage;
                $scope.ProdVariance.push({ VarianceType: mobstrType, VariancePrice: mobstrPrice, sellingPrice: mobstrSellingPrice, ImageUrl: vFileName, vFileMessage, ProductVarianceId: vVarianceId, VarianceActive: vVarianceActive, VariantStockCount: mobstrVariantStockCount });

                var request = {
                    method: 'POST',
                    url: vUrl + "FileUpload/ProductVarienceDetails",
                    data: fromdata1,
                    params: { CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL},
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request).then(function mySuccess(response) {
                    var Picture = response.data;


                }).catch(function myError(response) {

                });
                // }
                // else {

                // $scope.ProdVariance.push({ VarianceType: strType, VariancePrice: strPrice, sellingPrice: strSellingPrice, ProductVarianceId: vVarianceId, ImageUrl: "", VarianceActive: true });
                // }


            }
            else {
                $scope.ProdVariance.push({ VarianceType: mobstrType, VariancePrice: mobstrPrice, sellingPrice: mobstrSellingPrice, ImageUrl: "", ProductVarianceId: vVarianceId, VarianceActive: vVarianceActive, VariantStockCount: mobstrVariantStockCount });
            }

        }




        var vProdFeatures = '';

        var vProdTecDetails = "";
        

        var vProdId = $scope.ProductDetail.HiddenProductId;
        var fromdata = new FormData();

        if ($scope.theFile != undefined && $scope.theFile != "") {

            for (var i = 0; i < $scope.theFile.length; i++) {
                fromdata.append("uploadedFile", $scope.theFile[i]);
            }

            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UpdateProductImage",
                data: fromdata,
                params: { ProductId: vProdId, CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function (response) {
                
                var Picture = response.data;
                $scope.theFile = "";
            }).then(function (response) {
            });
        }
        else {

        }

        if ($scope.ProductDetail.Variance == true) {
            $scope.ProductDetail.Variance = 1;
        }
        else
            $scope.ProductDetail.Variance = 0;
        
        $scope.ProductDetail.ProdFeatures = vProdFeatures;
        $scope.ProductDetail.ProdTecDetails = vProdTecDetails;
        $scope.ProductDetail.UpdatedBy = vAdminId;
        var ProductDetail = $scope.ProductDetail;
        var Discount = (ProductDetail.DiscountDetailsId != null ? ProductDetail.DiscountDetailsId : "");
        var Coupoun = (ProductDetail.CouponId != null ? ProductDetail.CouponId : "");
        $http({
            url: vUrl + "ProductDetails/UpdateProduct",
            dataType: 'json',
            method: 'POST',
            data: ProductDetail,
            params: { ProductId: vProdId, CompanyId: vCompanyId, BrandTypeId: ProductDetail.BrandTypeId, SubCategory: ProductDetail.SubCategoryId, Discount1: Discount, Coupoun1: Coupoun  },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            $timeout(function () {
                $timeout(function () {

                }, 200);
            }, 200);
            $("#productupdate").attr("disabled", false);
            $("#productupdatemob").attr("disabled", false);
            $("#productupdatedes").attr("disabled", false);
            $scope.saveloade = false;
            $scope.InsertedBy = "";
            $scope.msgStatus = ProductDetailMessages(9);
            $scope.prod = true;
            $scope.ProductDetail.Title = "";
            $scope.ProductDetail.Description = "";
            $scope.ProductDetail.Price = "";
            $scope.ProductDetail.CategoryId = "";
            $scope.ProductDetail.CouponId = "";
            vcountvariable = 0;
            //$scope.ProductDetail.CouponId = "";
            $scope.ProductDetail.VariancePrice = "";
            $scope.ProductDetail.sellingPrice = "";
            $scope.ProductDetail.SubCategoryId = "";
            $scope.ProductDetail.BrandTypeId = "";
            $scope.ProductDetail.DiscountDetailsId = "";
            $scope.ProductDetail.TaxDetailsId = "";
            $scope.ProductDetail.ProductType = "";
            document.getElementById("FileUpload1").value = "";
            $scope.showadd = false;

            //$scope.ProdFeatures.ProductFeatures1 = "";
            //$scope.ProdFeatures.ProductFeatures2 = "";
            //$scope.ProdFeatures.ProductFeatures3 = "";
            //$scope.ProdFeatures.ProductFeatures4 = "";
            //$scope.ProdFeatures.ProductFeatures5 = "";
            //$scope.ProdFeatures.ProductFeatures6 = "";
            //$scope.ProdFeatures.ProductFeatures7 = "";
            //$scope.ProdFeatures.ProductFeatures7 = "";
            //$scope.ProdFeatures.ProductFeatures8 = "";
            //$scope.ProdFeatures.ProductFeatures9 = "";
            //$scope.ProdFeatures.ProductFeatures10 = "";
            //$scope.ProdTecDetails.ProductTecDetails1 = "";
            //$scope.ProdTecDetails.ProductTecDetails2 = "";
            //$scope.ProdTecDetails.ProductTecDetails3 = "";
            //$scope.ProdTecDetails.ProductTecDetails4 = "";
            //$scope.ProdTecDetails.ProductTecDetails5 = "";
            //$scope.ProdTecDetails.ProductTecDetails6 = "";
            //$scope.ProdTecDetails.ProductTecDetails7 = "";
            //$scope.ProdTecDetails.ProductTecDetails8 = "";
            //$scope.ProdTecDetails.ProductTecDetails9 = "";
            //$scope.ProdTecDetails.ProductTecDetails10 = "";
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.ShowUpdateformob = false;
            $scope.Show = false;
            $scope.HiddenProductId = "";
            $scope.resultOPImage = "";
            $scope.imgEditTime = false;
            $scope.Image = '';
            $scope.ProductDetail.IsActive = true;
            $scope.ProductDetail.colorcode1 = false;
            $scope.ProductDetail.colorcode = false;

        });
        var vCount1 = 0;
        
        var ProdVarience = $scope.ProdVariance;
        debugger;
        for (var i = 0; i < ProdVarience.length; i++) {
            $scope.ProdVariance1 = [];
            $scope.ProdVariance1.push({ VarianceType: ProdVarience[i].VarianceType, VariancePrice: ProdVarience[i].VariancePrice, sellingPrice: ProdVarience[i].sellingPrice, ImageUrl: ProdVarience[i].ImageUrl, ProductVarianceId: ProdVarience[i].ProductVarianceId, VarianceActive: ProdVarience[i].VarianceActive, StockCount: ProdVarience[i].VariantStockCount});

            var provari1 = $scope.ProdVariance1;

            $http({
                url: vUrl + "ProductDetails/UpdateProductVariance",
                dataType: 'json',
                method: 'POST',
                params: { ProductId: vProdId, VaDMIN: vAdminId },
                data: JSON.stringify(provari1),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                vCount1 = vCount1 + 1;
                
                var productvarId = response.data;
                //    alert(productvarId);
                for (var i = 0; i < 1; i++) {
                    //      alert(productvarId);
                    i = vCount1 - 1;
                    var wholesale = "";
                    if ($('.wholesale').is(':checked')) {
                        wholesale = "1";
                    }
                    else if ($('.retails').is(':checked')) {
                        wholesale = "2";
                    }
                    if (wholesale == "2") {
                        if ($('.mobwholesale').is(':checked')) {
                            wholesale = "1";
                        }
                        else if ($('.mobRetails').is(':checked')) {
                            wholesale = "2";
                        }
                    }

                    var color = "";
                    if ($('.mobcolorcode').is(':checked')) {
                        color = "1";
                    }
                    if (color == "") {
                        if ($('.colorcode').is(':checked')) {
                            color = "1";
                        }
                    }
                    //    alert(wholesale);
                    if (wholesale == "1") {
                        //      alert(productvarId);
                        if (productvarId != null) {
                            var wholesale1 = "Wholesalecount" + (i + 1).toString();
                            $scope.Wholesale1 = [];
                            var wholesalecount = (document.getElementById(wholesale1));
                            if (wholesalecount != null) {
                                wholesalecount = document.getElementById(wholesale1).value;
                                if (i != 0) {
                                    wholesalecount = wholesalecount - i;
                                }
                                for (var j = 0; j < wholesalecount; j++) {

                                    if (i != 0) {
                                        j = j + i;
                                    }
                                    var minqty = "Wholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var maxqty = "WholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var sellprice = "Wholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                                    var mobminqty = "mobWholsalefvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var mobmaxqty = "mobWholsaleTvar" + (i + 1) + "Qty" + (j + 1).toString();
                                    var mobsellprice = "mobWholsalevar" + (i + 1) + "prize" + (j + 1).toString();
                                    var wholeid = "Wholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                                    var mobwholeid = "mobWholesalevar" + (i + 1).toString() + "Id" + (j + 1).toString();
                                    var Active = "WholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                                    var mobActive = "mobWholsaleVariancevar" + (i + 1) + "Active" + (j + 1).toString();
                                    var strmin = removeSpaces(document.getElementById(minqty).value);
                                    var strmax = removeSpaces(document.getElementById(maxqty).value);
                                    var strsellprize = removeSpaces(document.getElementById(sellprice).value);
                                    var mobstrmin = removeSpaces(document.getElementById(mobminqty).value);
                                    var mobstrmax = removeSpaces(document.getElementById(mobmaxqty).value);
                                    var mobstrsellprize = removeSpaces(document.getElementById(mobsellprice).value);
                                    var WholesaleId = removeSpaces(document.getElementById(wholeid).value);
                                    var mobWholesaleId = removeSpaces(document.getElementById(mobwholeid).value);

                                    var active = "";
                                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                                        if ($("#" + mobActive).is(':checked')) {
                                            active = "1";
                                        }
                                        else {
                                            active = "0";
                                        }
                                    }
                                    else {
                                        if ($("#" + Active).is(':checked')) {
                                            active = "1";
                                        }
                                        else {
                                            active = "0";
                                        }
                                    }

                                    if (strmin == "" || strmin == null || strmin == undefined || strmin == "undefined") {
                                        strmin = mobstrmin;
                                    }
                                    if (strmax == "" || strmax == null || strmax == undefined || strmax == "undefined") {
                                        strmax = mobstrmax;
                                    }
                                    if (strsellprize == "" || strsellprize == null || strsellprize == undefined || strsellprize == "undefined") {
                                        strsellprize = mobstrsellprize;
                                    }
                                    if (WholesaleId == undefined || WholesaleId == null || WholesaleId == "" || WholesaleId == "0") {
                                        WholesaleId = mobWholesaleId;
                                    }
                                    var ProductvarId1 = response.data;
                                    $scope.Wholesale1.push({ wholesaleFromQty: strmin, wholesaleprize: strsellprize, WholesalepriceId: WholesaleId, wholesaleToQty: strmax, VarianceActive: active, ProductVarianceId: ProductvarId1 });
                                }
                                //            alert(productvarId);

                                var wholesalevalue = $scope.Wholesale1;
                                if (wholesalevalue != "" && wholesalevalue != null && wholesalevalue != undefined && wholesalevalue != "undefiened") {
                                    //              alert(productvarId);
                                    $http({
                                        url: vUrl + "ProductDetails/UpdatewholesaleProductVariance",
                                        dataType: 'json',
                                        method: 'POST',
                                        params: { ProductvarId: productvarId },
                                        data: JSON.stringify(wholesalevalue),
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function (response) {
                                        var color = "";
                                        var colorcode = "";
                                        if (provari1.length == vCount1) {
                                            if ($(".colorcode").is(':checked')) {
                                                color = "1";
                                            }
                                            $scope.multicolor1 = [];
                                            if (color == "1") {
                                                var colorsale = "Wholecolorcount" + (i + 1).toString();
                                                var colorcount = document.getElementById(colorsale);
                                                if (colorcount != null) {
                                                    //if (i != 0) {
                                                    //    colorcount = colorcount - i;
                                                    //}
                                                    colorcount = document.getElementById(colorsale).value;
                                                    for (var j = 0; j < colorcount; j++) {

                                                        if (i != 0) {
                                                            j = j + i;
                                                        }
                                                        var Color = "colorselector" + (i + 1) + "color" + (j + 1).toString();

                                                        var mobColor = "mobcolorselector" + (i + 1) + "color" + (j + 1).toString();
                                                        var mobcolorvariance = "mobcolorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                                        var colorvariance = "colorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                                        var mobcolorcode = removeSpaces(document.getElementById(mobColor).value);
                                                        colorcode = removeSpaces(document.getElementById(Color).value);
                                                        var colorvariance = removeSpaces(document.getElementById(colorvariance).value);
                                                        var mobcolorvariance = removeSpaces(document.getElementById(mobcolorvariance).value);
                                                        if (colorcode == "" || colorcode == null || colorcode == undefined || colorcode == "undefiend") {
                                                            colorcode = mobcolorcode;
                                                        }
                                                        if (colorvariance == "" || colorvariance == null || colorvariance == undefined || colorvariance == "undefiend") {
                                                            colorvariance = mobcolorvariance;
                                                        }
                                                        $scope.multicolor1.push({ colorcode: colorcode, colorvariance: colorvariance });
                                                    }
                                                    var productvarianceId = response.data;
                                                    var multicolor = $scope.multicolor1;
                                                    $http({
                                                        url: vUrl + "ProductDetails/Updatecolorvariance",
                                                        dataType: 'json',
                                                        method: 'POST',
                                                        params: { ProductvarianceId: productvarianceId },
                                                        data: JSON.stringify(multicolor),
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        }
                                                    }).then(function (response) {
                                                        var wholesale = $scope.wholesale;

                                                        
                                                        $scope.Variant = null;
                                                        $scope.mobVariant = null;
                                                        $scope.mobVariant = null;
                                                        $scope.ShowPriceCommon = true;
                                                        if (headercolor == "0") {
                                                            $scope.ShowVarianseCount = true;
                                                        }
                                                        else {
                                                            $scope.ShowVarianseCount = false;
                                                        }
                                                        $scope.BindGrid(1);
                                                        $scope.mobVariant = null;
                                                        $scope.ProductDetail.VarianceCount = 0;
                                                        $("input[type='file']").val('');
                                                        $(".retails").prop('checked', false);
                                                        $(".wholesale").prop('checked', false);
                                                        $(".mobRetails").prop('checked', false);
                                                        $(".mobwholesale").prop('checked', false);
                                                        $scope.saveloade = false;
                                                    }).catch(function (response) {
                                                        
                                                    });
                                                }

                                            }
                                            else {
                                                $scope.Variant = null;

                                                $scope.mobVariant = null;
                                                $scope.ShowPriceCommon = true;
                                                if (headercolor == "0") {
                                                    $scope.ShowVarianseCount = true;
                                                }
                                                else {
                                                    $scope.ShowVarianseCount = false;
                                                }
                                                $scope.BindGrid(1);
                                                $scope.mobVariant = null;
                                                $scope.ProductDetail.VarianceCount = 0;
                                                $("input[type='file']").val('');
                                                $scope.saveloade = false;
                                                $(".retails").prop('checked', false);
                                                $(".wholesale").prop('checked', false);
                                                $(".mobRetails").prop('checked', false);
                                                $(".mobwholesale").prop('checked', false);
                                            }
                                        }


                                    });
                                }
                            }
                        }
                    }
                    else if ($('.retails').is(':checked')) {
                        var color = "";
                        var colorcode = "";
                        if ($(".colorcode").is(':checked')) {
                            color = "1";
                        }
                        $scope.multicolor1 = [];
                        if (color == "1") {
                            var colorsale = "Wholecolorcount" + (i + 1).toString();
                            var colorcount = document.getElementById(colorsale);
                            if (colorcount != null) {
                                //if (i != 0) {
                                //    colorcount = colorcount - i;
                                //}
                                colorcount = document.getElementById(colorsale).value;
                                for (var j = 0; j < colorcount; j++) {

                                    if (i != 0) {
                                        j = j + i;
                                    }
                                    var Color = "colorselector" + (i + 1) + "color" + (j + 1).toString();

                                    var mobColor = "mobcolorselector" + (i + 1) + "color" + (j + 1).toString();
                                    var mobcolorvariance = "mobcolorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                    var colorvariance = "colorvariance" + (i + 1) + "Id" + (j + 1).toString();
                                    var mobcolorcode = removeSpaces(document.getElementById(mobColor).value);
                                    colorcode = removeSpaces(document.getElementById(Color).value);
                                    var colorvariance = removeSpaces(document.getElementById(colorvariance).value);
                                    var mobcolorvariance = removeSpaces(document.getElementById(mobcolorvariance).value);
                                    if (colorcode == "" || colorcode == null || colorcode == undefined || colorcode == "undefiend") {
                                        colorcode = mobcolorcode;
                                    }
                                    if (colorvariance == "" || colorvariance == null || colorvariance == undefined || colorvariance == "undefiend") {
                                        colorvariance = mobcolorvariance;
                                    }
                                    $scope.multicolor1.push({ colorcode: colorcode, colorvariance: colorvariance });
                                }
                                var productvarianceId = response.data;
                                var multicolor = $scope.multicolor1;
                                $http({
                                    url: vUrl + "ProductDetails/Updatecolorvariance",
                                    dataType: 'json',
                                    method: 'POST',
                                    params: { ProductvarianceId: productvarianceId },
                                    data: JSON.stringify(multicolor),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(function (response) {
                                    var wholesale = $scope.wholesale;

                                    
                                    $scope.Variant = null;
                                    $scope.mobVariant = null;
                                    $scope.mobVariant = null;
                                    $scope.ShowPriceCommon = true;
                                    if (headercolor == "0") {
                                        $scope.ShowVarianseCount = true;
                                    }
                                    else {
                                        $scope.ShowVarianseCount = false;
                                    }
                                    $scope.BindGrid(1);
                                    $scope.mobVariant = null;
                                    $scope.ProductDetail.VarianceCount = 0;
                                    $("input[type='file']").val('');
                                    $scope.saveloade = false;
                                    $(".retails").prop('checked', false);
                                    $(".wholesale").prop('checked', false);
                                    $(".mobRetails").prop('checked', false);
                                    $(".mobwholesale").prop('checked', false);
                                }).catch(function (response) {
                                    
                                });
                            }

                        }
                        else {
                            $scope.Variant = null;
                            $scope.BindGrid(1);
                            $scope.mobVariant = null;
                            $scope.ShowPriceCommon = true;
                            if (headercolor == "0") {
                                $scope.ShowVarianseCount = true;
                            }
                            else {
                                $scope.ShowVarianseCount = false;
                            }
                            $scope.mobVariant = null;
                            $scope.ProductDetail.VarianceCount = 0;
                            $("input[type='file']").val('');
                            $scope.saveloade = false;
                            $(".retails").prop('checked', false);
                            $(".wholesale").prop('checked', false);
                            $(".mobRetails").prop('checked', false);
                            $(".mobwholesale").prop('checked', false);
                        }

                        $scope.Variant = null;
                        $scope.mobVariant = null;
                        $scope.ShowPriceCommon = true;
                        if (headercolor == "0") {
                            $scope.ShowVarianseCount = true;
                        }
                        else {
                            $scope.ShowVarianseCount = false;
                        }
                        $scope.mobVariant = null;
                        $scope.ProductDetail.VarianceCount = 0;
                        $("input[type='file']").val('');
                        $(".retails").prop('checked', false);
                        $(".wholesale").prop('checked', false);
                        $(".mobRetails").prop('checked', false);
                        $(".mobwholesale").prop('checked', false);
                        $scope.saveloade = false;
                    }

                }
            });


        }





    }

    $scope.VarianceCheck = true;

    $scope.Clear = function () {
        //
        $scope.VarianceCheck = true;
        $scope.saveloade = false;
        $scope.BindGrid(1);
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.ProductDetail.colorcode1 = false;
        $scope.ProductDetail.colorcode = false;
        $scope.showadd = false;
        $("input[type='file']").val('');
        document.getElementById("FileUpload1").value = "";
        $scope.ProductDetail.VarianceCount = 0;
        if (headercolor == "0") {
            $scope.ShowVarianseCount = true;
        }
        else {
            $scope.ShowVarianseCount = false;
        }
        $("#ProductFile").val('');
        $(".retails").prop('checked', false);
        $(".wholesale").prop('checked', false);
        $(".mobRetails").prop('checked', false);
        $(".mobwholesale").prop('checked', false);
        $scope.ProductDetail.Picture = "";
        $scope.ProductDetail.Variance = false;
        $scope.ProductDetail.ProductId = "";
        $scope.ProductDetail.VariantType = "";
        $scope.ProductDetail.VariancePrice = "";
        $scope.ProductDetail.sellingPrice = "";
        $scope.ProductDetail.Title = "";
        $scope.ProductDetail.Description = "";
        $scope.ProductDetail.Description2 = "";
        $scope.ProductDetail.Description3 = "";
        $scope.ProductDetail.Price = "";
        $scope.ProductDetail.CategoryId = "";
        $scope.ProductDetail.DiscountDetailsId = "";
        //$scope.ProductDetail.TaxDetailsId = "";
        $scope.ProductDetail.BrandTypeId = "";
        $scope.ProductDetail.SubCategoryId = "";
        $scope.ProductDetail.Status = "";
        $scope.ProductDetail.HiddenProductId = "";
        $scope.ProductDetail.ProductType = "";
        $scope.ProductDetail.IsActive = "";
        $scope.InsertedBy = "";
        $scope.InsertedDate = "";
        $("#productsave").attr("disabled", false);
        $("#productsavedes").attr("disabled", false);
        $("#productupdate").attr("disabled", false);
        
        $("#productupdatemob").attr("disabled", false);
        $("#productupdatedes").attr("disabled", false);
        $scope.ModifiedName = "";
        $scope.UpdatedDate = "";
        $scope.ProdFeatures.ProductFeatures1 = "";
        $scope.ProdFeatures.ProductFeatures2 = "";
        $scope.ProdFeatures.ProductFeatures3 = "";
        $scope.ProdFeatures.ProductFeatures4 = "";
        $scope.ProdFeatures.ProductFeatures5 = "";
        $scope.ProdFeatures.ProductFeatures6 = "";
        $scope.ProdFeatures.ProductFeatures7 = "";
        $scope.ProdFeatures.ProductFeatures7 = "";
        $scope.ProdFeatures.ProductFeatures8 = "";
        $scope.ProdFeatures.ProductFeatures9 = "";
        $scope.ProdFeatures.ProductFeatures10 = "";
        $scope.ProdTecDetails.ProductTecDetails1 = "";
        $scope.ProdTecDetails.ProductTecDetails2 = "";
        $scope.ProdTecDetails.ProductTecDetails3 = "";
        $scope.ProdTecDetails.ProductTecDetails4 = "";
        $scope.ProdTecDetails.ProductTecDetails5 = "";
        $scope.ProdTecDetails.ProductTecDetails6 = "";
        $scope.ProdTecDetails.ProductTecDetails7 = "";
        $scope.ProdTecDetails.ProductTecDetails8 = "";
        $scope.ProdTecDetails.ProductTecDetails9 = "";
        $scope.ProdTecDetails.ProductTecDetails10 = "";
        $scope.vProductid = "";
        $scope.ProductDetail.BrandTypeId = "";
        $scope.ProductDetail.VarianceCount = "";
        vcountvariable = 0;
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.ShowUpdateformob = false;
        $scope.ProductDetail.Status = true;
        $scope.prod = true;
        $scope.Show = false;
        $scope.imgEditTime = false;
        $scope.Image = '';
        $scope.theFile = "";
        $scope.resultOPImage = ""; 
        $scope.Variant = null;
        $scope.mobVariant = null;
   
        $scope.ShowPriceCommon = true;

    }
    $(".retails").prop('checked', false);
    $(".wholesale").prop('checked', false);
    $(".mobRetails").prop('checked', false);
    $(".mobwholesale").prop('checked', false);

    $scope.rdoYesChangebox = function () {
        $scope.ShowVarianseCount = true;
    }

    //      --------   Pagination    -------------
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
    //Active & In active
    $scope.InActiveclick = function () {

        $scope.BindGrid(0);
        $scope.Active = true;
        $scope.Inactive = false;
    }

    $scope.Activeclick = function () {

        $scope.BindGrid(1);
        $scope.Inactive = true;
        $scope.Active = false;
    }

    //search function
    $scope.Search = function () {
        debugger;
        var vdata = $scope.ProductDetail.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid(1);
        }
    }
    var GetSearch = function (vSearch) {
        debugger;

        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;
        

        $http({
            url: vUrl + "ProductDetails/GetProductSearch",
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
    //Export to exl
    $scope.exportData = function () {
        //
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
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

        a.download = 'ProductDetails.xls';
        a.click();
    };
    var vProductidForimg = "";

    var GetImages = function (ProductId) {
        //
        vProductidForimg = ProductId;
        $http({
            method: "GET",
            url: vUrl + "ProductDetails/GetImages"
            , params: { ProductId: ProductId, CompanyId: vCompanyId}
            , headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            debugger
            //$scope.ShowEditImages = false;
            $scope.resultOPImage = response.data;

        }).then(function myError(response) {
            
        });
    };

    $scope.Delete = function (ProductImageId) {
       
        $scope.msgStatus = "";
      
            $http({
                url: vUrl + "ProductDetails/DeleteProductImage",
                dataType: 'json',
                method: 'POST',
                data: "",
                params: { ProductImageId: ProductImageId , CompanyId: vCompanyId},
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (data) {
                
                GetImages(vProductidForimg);
                alert('Image Deleted Successfully');
               // $scope.msgStatus = "Image Deleted Successfully"; 

            });
       

    }
    $scope.ShowZeroPrice = true;
    $scope.ShowNonZeroPrice = false;

    $scope.ShowZeroPriceMob = true;
    $scope.ShowNonZeroPriceMob = false;
  $scope.GetProductDetailsForZeroPrice = function () {

        $http({
            url: vUrl + "ProductDetails/GetProductDetailsForZeroPrice",
            method: 'GET',
            params: { iActive:1, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            
            $scope.ShowZeroPrice = false;
            $scope.ShowNonZeroPrice = true;
            $scope.ShowZeroPriceMob = false;
            $scope.ShowNonZeroPriceMob = true;
            $scope.allItems = response.data;
            $scope.pageChangeHandler(vPageNumber);
            $scope.Totalcount = response.data.length;
            $scope.sort('name');
            $scope.loader = false;
        }).catch(function (response) {
            //
        });
    }

  $scope.ShowNonZeroPriceBtn = function () {
      $scope.ShowZeroPrice = true;
      $scope.ShowNonZeroPrice = false;
      $scope.ShowZeroPriceMob = true;
      $scope.ShowNonZeroPriceMob = false;
      $scope.BindGrid(1);

  }


    //------------Sorting---------------//
    $scope.column = 'name';

    // sort ordering (Ascending or Descending). Set true for descending
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


    //$scope.Variance = { No: true, Yes: false };
    //$scope.VarianceYes = false;
    //$scope.VarianceTo = true;
    $scope.ShowPriceCommon = true;
    $scope.rdoYesChange = function (value) {

        var vCheck = $scope.ProductDetail.Variance;
        if (vCheck == true) {
            $scope.ShowVarianseCount = true;
            $scope.ShowPriceCommon = false;
        }
        else {
            $scope.ShowVarianseCount = false;
            $scope.ShowPriceCommon = true;
            $scope.ProductDetail.VarianceCount = 0;
            $scope.Variant = null;
        }
    }

    $scope.ShowVariants = function (value) {
        
        $scope.vVariants = "";
        $scope.vVariants1 = "";
        var wholesale = "";
        if ($('.wholesale').is(':checked')) {
            wholesale = "1";
        }
        else if ($('.retails').is(':checked')) {
            wholesale = "2";
        }
        if (wholesale == "2") {
            if ($('.mobwholesale').is(':checked')) {
                wholesale = "1";
            }
            else if ($('.mobRetails').is(':checked')) {
                wholesale = "2";
            }
        }

        var color = "";
        if ($('.mobcolorcode').is(':checked')) {
            color = "1";
        }
        if (color == "") {
            if ($('.colorcode').is(':checked')) {
                color = "1";
            }
        }
        for (var i = 0; i < value; i++) {

            $scope.vVariants = $scope.vVariants + "<div class='col-lg-12'>";
            $scope.vVariants = $scope.vVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants = $scope.vVariants + " <label>Variance Type</label><br/>";
            $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantType" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='Variance Type' style='width: 160px;' />";
            $scope.vVariants = $scope.vVariants + "</div>";

            $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants = $scope.vVariants + " <label>MRP Price</label><br/>";
            $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantPrice" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='MRP Price' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' parseFloat />";
            $scope.vVariants = $scope.vVariants + "</div>";

            $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants = $scope.vVariants + " <label>Selling Price</label><br/>";
            $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantSellingPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Selling Price' style='width: 160px;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vVariants = $scope.vVariants + "</div>";

            $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants = $scope.vVariants + " <label>Stock Count</label><br/>";
            $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='VariantStockCount" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantStockCount" + (i + 1).toString() + "' placeholder='Stock Count' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vVariants = $scope.vVariants + "</div>";

            $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;display:none'>";
            $scope.vVariants = $scope.vVariants + "<input type='file' name='FileUpload1' id='VariantImage" + (i + 1).toString() + "' ng-model='ProductDetail.VariantImage" + (i + 1).toString() + "' ng onchange='angular.element(this).scope().setFile1(this)' style='position: unset; opacity: unset; font - size: 16px;display:none' />";
            $scope.vVariants = $scope.vVariants + "<div class='col-lg-4 col-sm-12 col-md-4'>";
            $scope.vVariants = $scope.vVariants + "<div class='col-lg-6 col-sm-6 col-md-6'><input class='form-control new1' checked ng-init='ProductDetail.VarianceActive=true' id='VariantActive" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.VariantActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";
            $scope.vVariants = $scope.vVariants + "";
            $scope.vVariants = $scope.vVariants + "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'> <h6 style='  float: right;'> Product image Size:270px x 360px  </h6><br></div></div ></div> ";
            if (wholesale == "1") {
                $scope.vVariants = $scope.vVariants + "<div class='col-lg-12'>";
                $scope.vVariants = $scope.vVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants = $scope.vVariants + " <label>From Qty</label><br/>";
                $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='Wholsalefvar" + (i + 1).toString() + "Qty" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
                $scope.vVariants = $scope.vVariants + "</div>";

                $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants = $scope.vVariants + " <label>To Qty</label><br/>";
                $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='WholsaleTvar" + (i + 1).toString() + "Qty" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='To Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                $scope.vVariants = $scope.vVariants + "</div>";

                $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants = $scope.vVariants + " <label>Price Per Qty</label><br/>";
                $scope.vVariants = $scope.vVariants + "<input class='form-control new1' id='Wholsalevar" + (i + 1).toString() + "prize" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price Per Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                $scope.vVariants = $scope.vVariants + "</div>";

                $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants = $scope.vVariants + "<div class='col-lg-4 col-sm-12 col-md-4'>";
                $scope.vVariants = $scope.vVariants + "<div class='col-lg-6 col-sm-6 col-md-6' ><input class='form-control new1' checked ng-init='ProductDetail.WholsaleVarianceActive=true'  id='WholsaleVariancevar" + (i + 1).toString() + "Active" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.WholsaleVarianceActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";


                $scope.vVariants = $scope.vVariants + "<div class='col-lg-6 col-sm-12 col-md-6 Wholesalehidevar" + (i + 1).toString() + "whole" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + (i + 1) + "," + (i + 1) + ")'></i></div>";
                $scope.vVariants = $scope.vVariants + "<input type='hidden' value='" + (i + 1) + "' id='Wholesalecount" + (i + 1) + "'/> </div ></div> ";
                $scope.vVariants = $scope.vVariants + "<div  class='wholsaleVariant" + (i + 1).toString() + "whole" + (i + 1) + "' ></div> ";

            }
            if (color == "1") {
                $scope.vVariants = $scope.vVariants + "<div class='col-lg-12'>";
                $scope.vVariants = $scope.vVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                //$scope.vVariants = $scope.vVariants + " <select class='form-control colorselector" + (i + 1).toString() + "'> <option value='47' data-color='#FF0000' >red</option> <option value='87' data-color='#FF4500'>orangered</option><option value='15' data-color='#FFFFFF'>white</option>";
                //$scope.vVariants = $scope.vVariants + "<option value='24' data-color='#FF8C00'>darkorange</option><option value='78' data-color='#C71585'>mediumvioletred</option><option value='79' data-color='#1E90FF'>dodgerblue</option> <option value=/89' data-color='#00008B'>darkblue</option>  </select>";
                $scope.vVariants = $scope.vVariants + "<input value='#ff0000' id='colorselector" + (i + 1) + "color" + (i + 1).toString() + "' class='form-control  colorselector" + (i + 1) + "color" + (i + 1).toString() + "'  type='color' />";
                $scope.vVariants = $scope.vVariants + "</div>";
                $scope.vVariants = $scope.vVariants + "<input type='hidden' value='" + (i + 1) + "' id='Wholecolorcount" + (i + 1) + "'/>";
                $scope.vVariants = $scope.vVariants + "<div class='col-lg-3 col-sm-6 col-md-3 Wholecolorvar" + (i + 1).toString() + "color" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + (i + 1) + "," + (i + 1) + ")'></i></div>";

                $scope.vVariants = $scope.vVariants + "<div  class='wholsalecolorVariant" + (i + 1).toString() + "color" + (i + 1) + "' ></div></div> "


            }
        }

        for (var i = 0; i < value; i++) {

            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-12'>";
            $scope.vVariants1 = $scope.vVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants1 = $scope.vVariants1 + " <label>Variance Type</label><br/>";
            $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobVariantType" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='Variance Type' style='width: 160px;' />";
            $scope.vVariants1 = $scope.vVariants1 + "</div>";

            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants1 = $scope.vVariants1 + " <label>MRP Price</label><br/>";
            $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobVariantPrice" + (i + 1).toString() + "' type='number' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='MRP' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/'  parseFloat />";
            $scope.vVariants1 = $scope.vVariants1 + "</div>";

            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants1 = $scope.vVariants1 + " <label>Selling Price</label><br/>";
            $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobVariantSellingPrice" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Selling Price' style='width: 160px;' placeholder='price' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vVariants1 = $scope.vVariants1 + "</div>";

            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
            $scope.vVariants1 = $scope.vVariants1 + " <label>Stock Count</label><br/>";
            $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobVariantStockCount" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantStockCount" + (i + 1).toString() + "' placeholder='Stock Count' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
            $scope.vVariants1 = $scope.vVariants1 + "</div>";

            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;display:none'>";
            $scope.vVariants1 = $scope.vVariants1 + "<input type='file' name='FileUpload1' id='mobVariantImage" + (i + 1).toString() + "' ng-model='ProductDetail.VariantImage" + (i + 1).toString() + "' ng onchange='angular.element(this).scope().setFile1(this)' style='position: unset; opacity: unset; font - size: 16px;display:none' />";
            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-4 col-sm-12 col-md-4'>";
            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-6 col-sm-6 col-md-6 '><input class='form-control new1' checked ng-init='ProductDetail.VarianceActive=true' id='mobVariantActive" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.VariantActive" + (i + 1).toString() + "' style='width:20px;'/> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";

            $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'> <h6 style='  float: right;'> Product image Size:270px x 360px  </h6><br></div></div > ";
            $scope.vVariants1 = $scope.vVariants1 + "</div></div>";



            if (wholesale == "1") {
                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-12'>";
                $scope.vVariants1 = $scope.vVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants1 = $scope.vVariants1 + " <label>From Qty</label><br/>";
                $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobWholsalefvar" + (i + 1).toString() + "Qty" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantType" + (i + 1).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
                $scope.vVariants1 = $scope.vVariants1 + "</div>";

                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants1 = $scope.vVariants1 + " <label>To Qty</label><br/>";
                $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobWholsaleTvar" + (i + 1).toString() + "Qty" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (i + 1).toString() + "' placeholder='To Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                $scope.vVariants1 = $scope.vVariants1 + "</div>";

                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants1 = $scope.vVariants1 + " <label>Price Per Qty</label><br/>";
                $scope.vVariants1 = $scope.vVariants1 + "<input class='form-control new1' id='mobWholsalevar" + (i + 1).toString() + "prize" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (i + 1).toString() + "' placeholder='Price Per Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
                $scope.vVariants1 = $scope.vVariants1 + "</div>";

                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-4 col-sm-12 col-md-4'>";
                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-6 col-sm-6 col-md-6'><input class='form-control new1' checked ng-init='ProductDetail.mobWholsaleVarianceActive=true'  id='WholsaleVariancevar" + (i + 1).toString() + "Active" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.mobWholsaleVarianceActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";

                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-6 col-sm-12 col-md-6  mobWholesalehidevar" + (i + 1).toString() + "whole" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + (i + 1) + "," + (i + 1) + ")'></i></div>";
                $scope.vVariants1 = $scope.vVariants1 + "</div ></div> ";
                $scope.vVariants1 = $scope.vVariants1 + "<div class='mobwholsaleVariant" + (i + 1).toString() + "whole" + (i + 1) + "' ></div> ";

            }
            if (color == "1") {
                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-12'>";
                $scope.vVariants1 = $scope.vVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
                $scope.vVariants1 = $scope.vVariants1 + "<input id='mobcolorselector" + (i + 1) + "color" + (i + 1).toString() + "' class='form-control  mobcolorselector" + (i + 1) + "color" + (i + 1).toString() + "' value='#ff0000' type='color' />";
                //$scope.vVariants1 = $scope.vVariants1 + " <select class='form-control mobcolorselector" + (i + 1).toString() + "'> <option value='47' data-color='#FF0000'>red</option> <option value='87' data-color='#FF4500'>orangered</option><option value='15' data-color='#FFFFFF'>white</option>";
                //$scope.vVariants1 = $scope.vVariants1 + "<option value='24' data-color='#FF8C00'>darkorange</option><option value='78' data-color='#C71585'>mediumvioletred</option><option value='79' data-color='#1E90FF'>dodgerblue</option> <option value=/89' data-color='#00008B'>darkblue</option>  </select>";
                $scope.vVariants1 = $scope.vVariants1 + "</div>";
                $scope.vVariants1 = $scope.vVariants1 + "<input type='hidden' value='" + (i + 1) + "' id='mobWholecolorcount" + (i + 1) + "'/>";
                $scope.vVariants1 = $scope.vVariants1 + "<div class='col-lg-3 col-sm-6 col-md-3 mobWholecolorvar" + (i + 1).toString() + "color" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + (i + 1) + "," + (i + 1) + ")'></i></div>";

                $scope.vVariants1 = $scope.vVariants1 + "<div  class='mobwholsalecolorVariant" + (i + 1).toString() + "color" + (i + 1) + "' ></div></div> "


            }
        }
        $scope.Variant = $sce.trustAsHtml($scope.vVariants);
        $scope.mobVariant = $sce.trustAsHtml($scope.vVariants1);
    }


    $scope.Wholesalevarinaceadd = function (count) {

    }

    $scope.selecttype = function () {
        $scope.hidehave = true;
    }

    $scope.Scrolltable1 = function () {
        
        document.getElementById("scrolltable11").focus();
    }
    var vmenuplus11 = document.getElementById("showplus11");
    vmenuplus11.style.display = 'block';
    var vmenuminus11 = document.getElementById("showminus11");
    vmenuminus11.style.display = 'none';
    var acc = document.getElementsByClassName("accordion11");
    var i;
    
    // $scope.length = "450px";
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            
            var panel4 = this.nextElementSibling;
            $scope.empbtnClick = true;
            if (panel4.style.maxHeight) {
                panel4.style.maxHeight = null;

                document.getElementById("showplus11").style.display = "block";
                document.getElementById("showminus11").style.display = "none";


                if ($scope.allItems != undefined && $scope.allItems != null) {
                    //$scope.allItems = null;
                    $scope.resetAll();
                    $scope.pagination();
                }

            }
            else {
                
                if ($scope.length == null || $scope.length == undefined)
                    //$scope.length="850px";
                    $scope.length = "250px";


                document.getElementById("showplus11").style.display = "none";
                document.getElementById("showminus11").style.display = "block";

                //$scope.divlength = $scope.length;
                panel4.style.maxHeight = $scope.length;


                if ($scope.allItems != undefined && $scope.allItems != null) {
                    //$scope.allItems = null;
                    $scope.resetAll();
                    $scope.pagination();
                }
            }
        });
    }

    //Template Download
    $scope.Import = function () {
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Advertisement>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        var table = document.getElementById("exampleimport");
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;

        a.download = 'ImportProduct.xls';//downloading template name
        a.click();
    };

    $scope.selectedFile = null;

    $scope.loadFile = function (files) {
        
        $scope.$apply(function () {
            
            $scope.selectedFile = files[0];

        })

    }

    //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
    //file validation 
    $scope.handleFile = function () {
        
        var file = $scope.selectedFile;
        $scope.Showmsg = false;
        $scope.ShowSuccess = false;
        $scope.msg = '';

        if (file == undefined || file == null || file == "") {
            $scope.msg = "Please Select Any One Excel File";
            $scope.Showmsg = true;
            $scope.ShowSuccess = false;
            return false;
        }
        else {
            var allowedFiles = [".xls", ".xlsx"];
            var fileUpload = document.getElementById("ProductFile");
            var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
            if (!regex.test(fileUpload.value.toLowerCase())) {
                $scope.msg = "Please upload files having extensions: [" + allowedFiles.join(', ') + "] only [OR] Not allowed Selected file name this type symbols () ";
                $scope.Showmsg = true;
                $scope.ShowSuccess = false;
                return false;
            }
        }

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                

                //reading the file
                var data = e.target.result;

                var workbook = XLSX.read(data, { type: 'binary' });

                var first_sheet_name = workbook.SheetNames[0];

                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                //console.log(excelData);  

                if (dataObjects.length > 0) {


                    $scope.save(dataObjects);
                }
                else {
                    $scope.msg = "Error : Something Wrong !";
                }
            }

            reader.onerror = function (ex) {

            }

            reader.readAsBinaryString(file);
        }
    }

    //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
    //importing process and inserting to db
    var InsertimportProduct = function (vCompanyId, vvdata) {
        
        $http({
            method: "POST",
            url: vUrl + "Product/InsertImportProduct",
            params: {
                companyid: vCompanyId,

            },
            data: JSON.stringify(vvdata),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (data) {
            

            if (data.data.includes("Success")) {
                // srec = "list";
                $scope.msg = "";
                $scope.msgStatus = "Data has been Imported ! ";

                $("#ProductFile").val('');
                $scope.BindGrid(1);
                return false;
            }

        }, function (error) {
            $scope.msg = "Error : Something Wrong";
        })

    }

    //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
    //importing data validation process
    $scope.save = function (data) {
        
        var vvvdata = data;
        
        $http({
            method: "POST",
            url: vUrl + "Product/ImportProductvalidation",
            params: { companyid: vCompanyId },
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (data) {
            
            if (data.data.includes("Success")) {
                InsertimportProduct(vCompanyId, vvvdata);
            }
            else if (data.data.includes("duplicate")) {
                var splitdataval = data.data.split('|');

                var r = confirm("Already This Products Available");

                if (r == true) {
                    InsertimportProduct(vCompanyId, vvvdata);
                }
                else {
                    return false;
                }
            }
            else if (data.data.includes("Error")) {
                $scope.msg = "Transaction Failed Please try again";
                $scope.Showmsg = true;
                $scope.ShowSuccess = false;
                return false;
            }
            else {
                $scope.msg = data.data;
                $scope.Showmsg = true;
                $scope.ShowSuccess = false;
                return false;
            }

        }, function (error) {
            $scope.msg = "Error : Something Wrong";
        })
    }

    $scope.myImage = '';
    $scope.myCroppedImage = '';

   

});

function addcolorfunction(quan, quan1) {
    
    $("#Wholecolorcount" + quan).val((quan1 + 1));
    var whole = ".mobWholecolorvar" + quan + "color" + (quan1).toString();
    var mob = ".Wholecolorvar" + quan + "color" + (quan1).toString();
    var vVariants = "";
    var vVariants1 = "";
    var i = quan1;
    $(whole).addClass("hidden");
    $(mob).addClass("hidden");
    vVariants = vVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    // vVariants = vVariants + " <select class='form-control colorselector" + (i + 1).toString() + "'> <option value='47' data-color='#FF0000' >red</option> <option value='87' data-color='#FF4500'>orangered</option><option value='15' data-color='#FFFFFF'>white</option>";
    //vVariants = vVariants + "<option value='24' data-color='#FF8C00'>darkorange</option><option value='78' data-color='#C71585'>mediumvioletred</option><option value='79' data-color='#1E90FF'>dodgerblue</option> <option value=/89' data-color='#00008B'>darkblue</option>  </select>";

    vVariants = vVariants + " <input class='form-control  colorselector" + quan + "color" + (i + 1).toString() + "' id='colorselector" + quan + "color" + (i + 1).toString() + "' value='#ff0000' type='color' />";

    vVariants = vVariants + "<input type='hidden' Id='colorvariance" + quan + "Id" + (i + 1).toString() + "'/> </div>";
    vVariants = vVariants + "<input type='hidden' value='" + (i + 1) + "' id='Wholecolorcount" + (i + 1) + "'/>";
    vVariants = vVariants + "<div class='col-lg-3 col-sm-6 col-md-3 Wholecolorvar" + quan + "color" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + quan + "," + (i + 1) + ")'></i></div>";

    vVariants = vVariants + "<div  class='wholsalecolorVariant" + quan + "color" + (i + 1) + "' ></div> "


    vVariants1 = vVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants1 = vVariants1 + " <input class='form-control  mobcolorselector" + quan + "color" + (i + 1).toString() + "' id='mobcolorselector" + quan + "color" + (i + 1).toString() + "' value='#ff0000' type='color' />";
    vVariants1 = vVariants1 + "<input type='hidden' value='" + (i + 1) + "' id='mobWholecolorcount" + (i + 1) + "'/>";
    //vVariants1 = vVariants1 + " <select class='form-control mobcolorselector" + (i + 1).toString() + "'> <option value='47' data-color='#FF0000'>red</option> <option value='87' data-color='#FF4500'>orangered</option><option value='15' data-color='#FFFFFF'>white</option>";
    //vVariants1 =vVariants1 + "<option value='24' data-color='#FF8C00'>darkorange</option><option value='78' data-color='#C71585'>mediumvioletred</option><option value='79' data-color='#1E90FF'>dodgerblue</option> <option value=/89' data-color='#00008B'>darkblue</option>  </select>";
    vVariants1 = vVariants1 + "<input type='hidden' Id='mobcolorvariance" + quan + "Id" + (i + 1).toString() + "'/></div>";
    vVariants1 = vVariants1 + "<div class='col-lg-3 col-sm-6 col-md-3 mobWholecolorvar" + quan + "color" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addcolorfunction(" + quan + "," + (i + 1) + ")'></i></div>";

    vVariants1 = vVariants1 + "<div  class='mobwholsalecolorVariant" + quan + "color" + (i + 1) + "' ></div></div> "

    $(".wholsalecolorVariant" + quan + "color" + (quan1)).append(vVariants);
    $(".mobwholsalecolorVariant" + quan + "color" + (quan1)).append(vVariants1);
}

function addfunction(count, increase) {
    
    
    var vVariants = "";
    $("#Wholesalecount" + count).val((increase + 1));
    var vVariants1 = "";

    var whole = ".Wholesalehidevar" + count + "whole" + (increase).toString();
    var mob = ".mobWholesalehidevar" + count + "whole" + (increase).toString();

    $(whole).addClass("hidden");
    $(mob).addClass("hidden");
    var i = increase;
    vVariants = vVariants + "<div class='col-lg-12'>";
    vVariants = vVariants + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants = vVariants + " <label>From Qty</label><br/>";
    vVariants = vVariants + "<input class='form-control new1' id='Wholsalefvar" + count + "Qty" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantType" + (i + 1).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
    vVariants = vVariants + "</div>";

    vVariants = vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants = vVariants + " <label>To Qty</label><br/>";
    vVariants = vVariants + "<input class='form-control new1' id='WholsaleTvar" + count + "Qty" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='To Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
    vVariants = vVariants + "</div>";

    vVariants = vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants = vVariants + " <label>Price Per Qty</label><br/>";
    vVariants = vVariants + "<input class='form-control new1' id='Wholsalevar" + count + "prize" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.VariantPrice" + (i + 1).toString() + "' placeholder='Price Per Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
    vVariants = vVariants + "</div>";

    vVariants = vVariants + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants = vVariants + "<div class='col-lg-4 col-sm-12 col-md-4'>";
    vVariants = vVariants + "<div class='col-lg-6 col-sm-6 col-md-6' ><input class='form-control new1' checked ng-init='ProductDetail.WholsaleVarianceActive=true'  id='WholsaleVariancevar" + count + "Active" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.WholsaleVarianceActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";
    vVariants = vVariants + "<div class='col-lg-6 col-sm-12 col-md-6 Wholesalehidevar" + count + "whole" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + count + "," + (i + 1) + ")'></i></div>";
    vVariants = vVariants + " </div ></div> ";
    vVariants = vVariants + "<input type='hidden' id='Wholesalevar" + count + "Id" + (i + 1).toString() + "'/><div  class='wholsaleVariant" + count + "whole" + (i + 1) + "' ></div> ";


    vVariants1 = vVariants1 + "<div class='col-lg-12'>";
    vVariants1 = vVariants1 + " <div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants1 = vVariants1 + " <label>From Qty</label><br/>";
    vVariants1 = vVariants1 + "<input class='form-control new1' id='mobWholsalefvar" + count + "Qty" + (i + 1).toString() + "' type='text' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantType" + (i + 1).toString() + "' placeholder='From Qty' style='width: 160px;' ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat/>";
    vVariants1 = vVariants1 + "</div>";

    vVariants1 = vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants1 = vVariants1 + " <label>To Qty</label><br/>";
    vVariants1 = vVariants1 + "<input class='form-control new1' id='mobWholsaleTvar" + count + "Qty" + (i + 1).toString() + "' type='number' min='0' ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (i + 1).toString() + "' placeholder='To Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
    vVariants1 = vVariants1 + "</div>";

    vVariants1 = vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants1 = vVariants1 + " <label>Price Per Qty</label><br/>";
    vVariants1 = vVariants1 + "<input class='form-control new1' id='mobWholsalevar" + count + "prize" + (i + 1).toString() + "' type='number' min='0'  ng-keypress='onTextBoxKeyPress($event)' ng-model='ProductVariant.mobVariantPrice" + (i + 1).toString() + "' placeholder='Price Per Qty' style='width: 160px;'  ng-pattern='/^[0-9]+(\.[0-9]{1,2})?$/' step='0.01' parseFloat />";
    vVariants1 = vVariants1 + "</div>";

    vVariants1 = vVariants1 + "<div class='col-lg-3 col-sm-12 col-md-3' style='padding-bottom: 10px!important;'>";
    vVariants1 = vVariants1 + "<div class='col-lg-4 col-sm-12 col-md-4'>";
    vVariants1 = vVariants1 + "<div class='col-lg-6 col-sm-6 col-md-6' ><input class='form-control new1' checked ng-init='ProductDetail.mobWholsaleVarianceActive=true'  id='WholsaleVariancevar" + count + "Active" + (i + 1).toString() + "' type='checkbox' ng-model='ProductVariant.mobWholsaleVarianceActive" + (i + 1).toString() + "' /> </div><div class='col-lg-6 col-sm-6 col-md-6' style='padding-top: 10px;'>Active</div> </div>";
    vVariants1 = vVariants1 + "<div class='col-lg-6 col-sm-12 col-md-6  mobWholesalehidevar" + count + "whole" + (i + 1).toString() + "' style='text-align:center'><i class='fa fa-plus-circle fa-2x' style='text-align:center; color:green' OnClick='addfunction(" + count + "," + (i + 1) + ")'></i></div>";

    vVariants1 = vVariants1 + "</div ></div> ";
    vVariants1 = vVariants1 + "<input type='hidden' id='mobWholesalevar" + count + "Id" + (i + 1).toString() + "'/><div  class='mobwholsaleVariant" + count + "whole" + (i + 1) + "' ></div> ";

    var mobbind = ".wholsaleVariant" + count + "whole" + (i + 1);
    var bind = "wholsaleVariant" + count;
    $(".wholsaleVariant" + count + "whole" + (increase)).append(vVariants);
    $(".mobwholsaleVariant" + count + "whole" + (increase)).append(vVariants1);
}