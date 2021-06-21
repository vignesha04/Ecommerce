'use strict';

ScBusinez.controller('CouponCodeController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    $scope.IsDisabled = false;

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

    
    var vCompanyId = $.session.get('CompanyId');
    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '';
    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');

    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.myObj = {
        "background-color": vbackgroundColor
    }

    var vdateFormat = $.session.get('DateFormat');
    $scope.dateOptions = {
        dateFormat: vdateFormat
    };

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
    //End//////////////////////////////////


    $scope.Inactive = true;
    $scope.Active = false;
    $scope.showSave = true;
    $scope.showUpdate = false;
    $scope.Show = false;
    $scope.nam = true;
    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';
    //Grid Bind

    debugger
   // var vCompanyId = $.session.get('CompanyId');
    $scope.GridBind = function (Active) {
        $http({
            url: vUrl + "CouponDetail/GetCouponCode",
            method: 'GET',
            params: { CompanyId: vCompanyId, iActive: Active },
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
    $scope.GridBind(1);
    //placeholder reset
    var funPlaceholderReset = function () {
        var element = document.getElementById("lblName");
        element.className = '';
        element.innerHTML = "Name";

        var element = document.getElementById("lblCode");
        element.className = '';
        element.innerHTML = "Code";
        var element = document.getElementById("lblDescription");
        element.className = '';
        element.innerHTML = "Description";

        var element = document.getElementById("lblDiscountPercentage");
        element.className = '';
        element.innerHTML = "DiscountPercentage";

        var element = document.getElementById("lblValidFrom");
        element.className = '';
        element.innerHTML = "ValidFrom";
        var element = document.getElementById("lblValidTo");
        element.className = '';
        element.innerHTML = "ValidTo";
    }
    //mobile menu
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

    //save
    $scope.Save = function () {
        debugger;
        $("#couponcodesavemob").attr("disabled", true);
        $("#couponcodesave").attr("disabled", true);
        $scope.IsDisabled = true;
        $scope.nam = true;
        $scope.msgStatus = '';
        $scope.msg = '';
        var vValidFrom = $scope.Submit.ValidFrom;
        var vValidTo = $scope.Submit.ValidTo;
        var date = new Date((new Date()).setHours(0, 0, 0, 0));

        if ($scope.Submit.Name == "" || $scope.Submit.Name == undefined || $scope.Submit.Name == null) {
            $scope.msg = CouponCodeMessages(1);/*'Please Enter the  name'*/
            $scope.IsDisabled = false;
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            return false;
        }
        if ($scope.Submit.Code == "" || $scope.Submit.Code == undefined || $scope.Submit.Code == null) {
            $scope.msg = CouponCodeMessages(2); /*'Please Enter the Code';*/
            $scope.IsDisabled = false;
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            return false;
        }
        //if ($scope.Submit.Description == "" || $scope.Submit.Description == undefined || $scope.Submit.Description == null) {
        //    $scope.msg = CouponCodeMessages(3); /*'Please Enter the Description';*/
        //    $scope.IsDisabled = false;
        //    $("#couponcodesavemob").attr("disabled", false);
        //    $("#couponcodesave").attr("disabled", false);
        //    return false;
        //}
        
        //if ($scope.Submit.AmountFrom == "" || $scope.Submit.AmountFrom == undefined || $scope.Submit.AmountFrom == null) {
        //    $scope.msg = "Please Enter the Amount From";
        //    $("#couponcodesavemob").attr("disabled", false);
        //    $("#couponcodesave").attr("disabled", false);
        //    $scope.IsDisabled = false;
        //    return false;
        //}
        if ($scope.Submit.OfferType == "" || $scope.Submit.OfferType == undefined || $scope.Submit.OfferType == null) {
            $scope.msg = "Please Select the Offer Type";
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            $scope.IsDisabled = false;
            return false;
        }
        //if ($scope.Submit.AmountTo == "" || $scope.Submit.AmountTo == undefined || $scope.Submit.AmountTo == null) {
        //    $scope.msg = "Please Enter the Amount To";
        //    $("#couponcodesavemob").attr("disabled", false);
        //    $("#couponcodesave").attr("disabled", false);
        //    $scope.IsDisabled = false;
        //    return false;
        //}
        if ($scope.Submit.ValidFrom == "" || $scope.Submit.ValidFrom == undefined || $scope.Submit.ValidFrom == null) {
            $scope.msg = CouponCodeMessages(10); /*'Please Enter the Correct Date Format';*/
            $scope.IsDisabled = false;
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            return false;
        }
        if ($scope.Submit.ValidTo == "" || $scope.Submit.ValidTo == undefined || $scope.Submit.ValidTo == null) {
            //$scope.msg = 'Please Select date Greaterthan from Valid To';
            $scope.msg = CouponCodeMessages(6);/* 'Please Enter the Correct Date Format';*/
            $scope.IsDisabled = false;
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            return false;
        }
        if (vValidFrom < date) {
            $scope.msg = CouponCodeMessages(5); /*'Please Enter the Correct Date Format';*/
            $scope.IsDisabled = false;
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            return false;
        }
        if (vValidFrom > vValidTo) {
            //$scope.msg = 'Please Select date Greaterthan from Valid To';
            $scope.msg = CouponCodeMessages(6);/* 'Please Enter the Correct Date Format';*/
            $scope.IsDisabled = false;
            $("#couponcodesavemob").attr("disabled", false);
            $("#couponcodesave").attr("disabled", false);
            return false;
        }

        if ($scope.Submit.OfferType == "Amount") {
            if ($scope.Submit.Amount == "" || $scope.Submit.Amount == undefined || $scope.Submit.Amount == null) {
                $scope.msg = 'Please Enter the Discount Amount';
                $scope.IsDisabled = false;
                $("#couponcodesavemob").attr("disabled", false);
                $("#couponcodesave").attr("disabled", false);
                return false;
            }
        }
         if ($scope.Submit.OfferType == "Percentage") {
             if ($scope.Submit.DiscountPercentage == "" || $scope.Submit.DiscountPercentage == undefined || $scope.Submit.DiscountPercentage == null) {
                $scope.msg = "Please Enter the Discount Percentage";
                $scope.IsDisabled = false;
                $("#couponcodesavemob").attr("disabled", false);
                $("#couponcodesave").attr("disabled", false);
                return false;
            }
            //else {
                
            //    var vPId = $scope.Submit.ProductId.split('|');
            //    var vVarienceId = vPId["1"];
            //    $scope.Submit.ProductId = vVarienceId;
            //}
        }

        
        var vCompanyId = $.session.get('CompanyId');
        var Coupons = $scope.Submit;
       // var Code = $scope.Submit.Code;
        if ($scope.Submit.IsActive == true) {
            $scope.Submit.IsActive = 1;
        }
        else
            $scope.Submit.IsActive = 0;
       
        $http({
            url: vUrl + "CouponDetail/InsertCouponCode",
            dataType: 'json',
            method: 'POST',
            data: Coupons,
            params: { CompanyId: vCompanyId},
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var vExist = response.data;
            $scope.IsDisabled = false;
            if (vExist == "Exist") {
                $("#couponcodesavemob").attr("disabled", false);
                $("#couponcodesave").attr("disabled", false);
                $scope.msg = "Name  is already exist";
            }

            else if (vExist =="CodeExist") {
                $("#couponcodesavemob").attr("disabled", false);
                $("#couponcodesave").attr("disabled", false);
                $scope.msg = "Code is already exist";
            }
            
            else {
                $scope.GridBind(1);
                $scope.showSave = true;
                $scope.showUpdate = false;
                $("#couponcodesavemob").attr("disabled", false);
                $("#couponcodesave").attr("disabled", false);
                //$scope.TaxDetail.Percentage = parseFloat(parseFloat(10 * 2).toFixed(2));
                $scope.msgStatus = CouponCodeMessages(7); //"Saved Success";
                $scope.nam = true;
                $scope.Submit.Name = "";
                $scope.Submit.Code = "";
                $scope.Submit.Description = "";
                $scope.Submit.DiscountPercentage = "";
                $scope.Submit.ValidFrom = "";
                $scope.Submit.ValidTo = "";
                $scope.Submit.Amount= "";
                $scope.Submit.AmountTo = "";
                $scope.Submit.OfferType = "";
                $scope.ShowDisAmount = false;
                $scope.ShowDisFreeProd = false;
                $scope.ShowAmount = false;
                $scope.ShowPercentage = false;
                //$scope.Submit.IsActive = "";
               // funPlaceholderReset();
            }

            }).catch(function (response) {
                $scope.IsDisabled = false;
            
        });

    }


    //edit
    $scope.Edit = function (CouponId ) {
        $scope.ShowAmount = false;
        $scope.ShowPercentage = false;
        //var vCompanyId = $.session.get('CompanyId');
        
        $scope.showSave = false;
        $scope.showUpdate = true;
        $scope.Show = true;
        $scope.nam = false;

        $scope.msgStatus = '';
        $scope.msg = '';
        
        $http({
            method: "Get",
            url: vUrl + "CouponDetail/GetCouponId",
            params: { CouponId: CouponId, CompanyId: vCompanyId},
            Headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            debugger;
            var result = response.data;
            

            var vCoupoinId = result["0"].CouponId;
            var vName = result["0"].Name;
            var vCode = result["0"].Code;
            var vDescription = result["0"].Description;
            var vDiscountPercentage = result["0"].DiscountPercentage;
            var vValidFrom = new Date(result["0"].ValidFrom);
            var vValidTo = new Date(result["0"].ValidTo);
            var IsActive = result["0"].IsActive;
            var vStatus = false;
            if (IsActive == "1")
                vStatus = true;

            var vOfferType = result["0"].OfferType;
            var vAmount = result["0"].AmountFrom;
            var vAmountTo = result["0"].AmountTo;

            if (vOfferType == "A") {
                vOfferType = "Amount";
                $scope.ShowAmount = true;
                $scope.ShowPercentage = false;
                
            }
            if (vOfferType == "P") {
                vOfferType = "Percentage";
                $scope.ShowAmount = false;
                $scope.ShowPercentage = true;
               
               

            }

            $scope.Submit = { Name: vName, Code: vCode, Description: vDescription, hiddenCouponId: vCoupoinId, ValidFrom: vValidFrom, ValidTo: vValidTo, IsActive: vStatus, Amount: vAmount, AmountTo: vAmountTo, OfferType: vOfferType, DiscountPercentage: vDiscountPercentage };
            
            $scope.hiddenCouponId = vCoupoinId;
            $window.scrollTo(0, 0);
        }).catch(function (response) {
            
        });

    }
    var BindProductDdlEdit = function (vProductId) {
        $http({
            url: vUrl + "CouponDetails/GetProducts",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.ProductDetail = response.data;
            $scope.Submit.ProductId = vProductId;

        }).catch(function (response) {
            
        });
    }
    //update
    $scope.Update = function () {
        
        $("#couponcodeupdatemob").attr("disabled", true);
        $("#couponcodeupdate").attr("disabled", true);
 //     var vCompanyId = $.session.get('CompanyId');
        $scope.showSave = false;
        $scope.showUpdate = true;
        $scope.Show = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        var vValidFrom = $scope.Submit.ValidFrom;
        var vValidTo = $scope.Submit.ValidTo;
        var date = new Date(new Date());

        if ($scope.Submit.Name == "" || $scope.Submit.Name == undefined || $scope.Submit.Name == null) {
            $scope.msg = CouponCodeMessages(1);/*'Please Enter the  name'*/
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            return false;
        }
        if ($scope.Submit.Code == "" || $scope.Submit.Code == undefined || $scope.Submit.Code == null) {
            $scope.msg = CouponCodeMessages(2); /*'Please Enter the Code';*/
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            return false;
        }
        //if ($scope.Submit.Description == "" || $scope.Submit.Description == undefined || $scope.Submit.Description == null) {
        //    $scope.msg = CouponCodeMessages(3); /*'Please Enter the Description';*/
        //    $("#couponcodeupdatemob").attr("disabled", false);
        //    $("#couponcodeupdate").attr("disabled", false);
        //    return false;
        //}
        //if ($scope.Submit.DiscountPercentage == "" || $scope.Submit.DiscountPercentage == undefined || $scope.Submit.DiscountPercentage == null) {
        //    $scope.msg = CouponCodeMessages(4); /*'Please Enter the DiscountPercentage';*/
        //    return false;
        //}
        if ($scope.Submit.OfferType == "" || $scope.Submit.OfferType == undefined || $scope.Submit.OfferType == null) {
            $scope.msg = "Please Select the Offer Type";
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            return false;
        }
        //if ($scope.Submit.AmountFrom == "" || $scope.Submit.AmountFrom == undefined || $scope.Submit.AmountFrom == null) {
        //    $scope.msg = "Please Enter the Amount From";
        //    $("#couponcodeupdatemob").attr("disabled", false);
        //    $("#couponcodeupdate").attr("disabled", false);
        //    return false;
        //}
        //if ($scope.Submit.AmountTo == "" || $scope.Submit.AmountTo == undefined || $scope.Submit.AmountTo == null) {
        //    //$scope.msg = 'Please Select date Greaterthan from Valid To';
        //    $scope.msg = "Please Enter the Amount To";
        //    $("#couponcodeupdatemob").attr("disabled", false);
        //    $("#couponcodeupdate").attr("disabled", false);
        //    return false;
        //}
        if ($scope.Submit.ValidFrom == "" || $scope.Submit.ValidFrom == undefined || $scope.Submit.ValidFrom == null) {
            $scope.msg = CouponCodeMessages(5); /*'Please Enter the Correct Date Format';*/
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            return false;
        }
        if ($scope.Submit.ValidTo == "" || $scope.Submit.ValidTo == undefined || $scope.Submit.ValidTo == null) {
            $scope.msg = CouponCodeMessages(6);/* 'Please Enter the Correct Date Format';*/
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            return false;
        }
        
        if (date > vValidTo || vValidFrom > vValidTo) {
            $scope.msg = CouponCodeMessages(11);
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            return false;
        }

        if ($scope.Submit.OfferType == "Amount") {
            if ($scope.Submit.Amount == "" || $scope.Submit.Amount == undefined || $scope.Submit.Amount == null) {
                $scope.msg = 'Please Enter the Discount Amount';
                $scope.IsDisabled = false;
                $("#couponcodeupdatemob").attr("disabled", false);
                $("#couponcodeupdate").attr("disabled", false);
                return false;
            }
        }
        if ($scope.Submit.OfferType == "Percentage") {
            if ($scope.Submit.DiscountPercentage == "" || $scope.Submit.DiscountPercentage == undefined || $scope.Submit.DiscountPercentage == null) {
                $scope.msg = "Please Enter the Discount Percentage";
                $scope.IsDisabled = false;
                $("#couponcodeupdatemob").attr("disabled", false);
                $("#couponcodeupdate").attr("disabled", false);
                return false;
            }
            
        }

        
        var vCouponId = $scope.hiddenCouponId;
        var Submit = $scope.Submit;
        debugger;
        $http({
            url: vUrl + "CouponDetail/UpdateCouponCode",

            dataType: 'json',
            method: 'POST',
            data: Submit,
            params: { CouponId: vCouponId, CompanyId: vCompanyId  },
            Headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            $scope.GridBind(1);
            $scope.showSave = true;
            $scope.showUpdate = false;
            $("#couponcodeupdatemob").attr("disabled", false);
            $("#couponcodeupdate").attr("disabled", false);
            $scope.msgStatus = CouponCodeMessages(8); //'Updated Success';
            $scope.nam = true;
            $scope.Submit.hiddenCouponId = "";
            $scope.Submit.Name = "";
            $scope.Submit.Code = "";
            $scope.Submit.Description = "";
            $scope.Submit.DiscountPercentage = "";
            $scope.Submit.ValidFrom = "";
            $scope.Submit.ValidTo = "";
            $scope.Submit.IsActive = "";
            $scope.Submit.Amount = "";
            $scope.Submit.AmountTo = "";
            $scope.Submit.OfferType = "";
            $scope.ShowDisAmount = false;
            $scope.ShowDisFreeProd = false;
            $scope.ShowAmount = false;
            $scope.ShowPercentage = false;
            //funPlaceholderReset();

        });
    }
    $scope.ShowAmount = false;
    $scope.ShowPercentage = false;
    //Offer Type Change
    $scope.ddlOfferTypeChange = function () {
        
        if ($scope.Submit.OfferType == "Amount") {
            $scope.ShowAmount = true;
            $scope.ShowPercentage = false;
        }
        else if ($scope.Submit.OfferType == "Percentage") {
            $scope.ShowAmount = false;
            $scope.ShowPercentage = true;
        }
    }
    var BindFreeProduct = function () {
        $http({
            url: vUrl + "CouponDetails/GetProducts",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.ProductDetail = response.data;


        }).catch(function (response) {
            
        });
    }

    
    //search function
     $scope.Search = function () {
        
         var vdata = $scope.Submit.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.GridBind(1);
        }
    } 
    var GetSearch = function (vSearch) {
        
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl +"CouponDetails/GetCouponSearch",
            method: "GET",
            params: { Search: vSearch, Status: vStatus, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function (response) {
            
            $scope.data = response.data;
            $scope.allItems = response.data;
                $scope.sort('name');
            }).catch(function (response) {
                
            });
    }

    $scope.InActiveclick = function () {
        
        $scope.GridBind(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
        
        $scope.GridBind(1);
        $scope.Inactive = true;
        $scope.Active = false;
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


    //Clear function
    $scope.Clear = function () {
        
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Submit.Name = "";
        $scope.Submit.Code = "";
        $scope.Submit.Description = "";
        $scope.Submit.DiscountPercentage = "";
        $scope.Submit.ValidFrom = "";
        $scope.Submit.ValidTo = "";
        $scope.ShowAmount = false;
        $scope.ShowPercentage = false;
        $scope.showSave = true;
        $scope.showUpdate = false;
        $scope.Show = false;
        $scope.nam = true;
        $scope.Submit.Amount = "";
        
        
        //funPlaceholderReset();
    }


    //Export to exl
   
    $scope.exportData = function () {
        var vCompanyId = $.session.get('CompanyId');
        
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

        a.download = 'CouponDetails.xls';
        a.click();
    };

    //Sorting
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



