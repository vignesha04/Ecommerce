'use strict';

ScBusinez.controller('DiscountController', function ($scope, $http, $window) {
    
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $scope.IsDisabled = false;

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
        $scope.AdminVariance = false;
        $scope.MenuAnalytics = false;
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
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
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

    $scope.Inactive = true;
    $scope.Active = false;
    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.Dis = true;
    var ee = document.getElementById("showLeftPush1");
   // ee.style.display = 'none';

    //--------------  Bind Grid   ------------------//
    
    var vCompanyId = $.session.get('CompanyId');    

    $scope.BindGrid = function (Active) {
        
     $http({
            url: vUrl +"DiscountDetail/GetDiscountDetails",
         method: "GET",
         params: { CompanyId: vCompanyId, iActive: Active },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            //$scope.New = response.data;
            $scope.allItems = response.data;
           
            $scope.sort('name');
          
            }).catch(function (response) {
                //
        });

    }

    $scope.BindGrid(1);
    //--------------  Place Holder Reset  ----------------//

    var funPlaceholderReset = function () {
        var element = document.getElementById("lblDescription");
        element.className = '';
        element.innerHTML = "Description";

        var element = document.getElementById("lblDiscountPercentage");
        element.className = '';
        element.innerHTML = "DiscountPercentage";

        var element = document.getElementById("lblValidFrom ");
        element.className = '';
        element.innerHTML = "ValidFrom ";

        var element = document.getElementById("lblValidTo");
        element.className = '';
        element.innerHTML = "ValidTo";
    }
    //--------------  Place Holder Reset  Ends ----------------//


    //-------------  Mobile Toggle Switch   -----------//
    $scope.toggle_visibility = function (id,id1) {
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
    $scope.onTextBoxKeyPress = function (event) {
        //

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }
    //------------------    Save funtion    ------------------//
    //
    $scope.Save = function () {
        
        $("#discountsve").attr("disabled", true);
        $scope.IsDisabled = true;
        $scope.msgStatus = '';
        $scope.msg = '';
        
        var vValidFrom = $scope.New.ValidFrom;
        var vValidTo = $scope.New.ValidTo;
        var date = new Date((new Date()).setHours(0, 0, 0, 0));

        if ($scope.New.Description == undefined || $scope.New.Description == null || $scope.New.Description == "") {
            $scope.msg = DiscountDetailMessages(1);// 'Please Enter the Discount Name'
            $scope.IsDisabled = false;
            $("#discountsve").attr("disabled", false);
            return false;
        }
        if ($scope.New.DiscountPercentage == undefined || $scope.New.DiscountPercentage == null || $scope.New.DiscountPercentage == "") {
            $scope.msg = DiscountDetailMessages(2);// 'Please Enter the valid DiscountPercentage'
            $scope.IsDisabled = false;
            $("#discountsve").attr("disabled", false);
            return false;
        }

        if ($scope.New.ValidFrom == undefined || $scope.New.ValidFrom == null || $scope.New.ValidFrom == "" ) {
            $scope.msg = DiscountDetailMessages(8);//"Please Enter the validFrom date"
            $scope.IsDisabled = false;
            $("#discountsve").attr("disabled", false);
            return false;
        }

        if ($scope.New.ValidTo == undefined || $scope.New.ValidTo == null || $scope.New.ValidTo == "" ) 
        {
            $scope.msg = DiscountDetailMessages(9);//"Please Enter the validTo date"
            $scope.IsDisabled = false;
            $("#discountsve").attr("disabled", false);
            return false;
        }
        if (Date.parse(vValidFrom) < Date.parse(date))
        {
            $scope.msg = DiscountDetailMessages(3);
            $scope.IsDisabled = false;
            $("#discountsve").attr("disabled", false);
            return false
           // $scope.IsDisabled = false;;// 'Please Enter the ValidFrom Date should be greater than or equal to current date'
        }   

        if (vValidFrom > vValidTo)
        {
            $scope.msg = DiscountDetailMessages(4);
            $scope.IsDisabled = false;
            $("#discountsve").attr("disabled", false);
            return false;//'Please Enter ValidTo date should be greater than validfrom date'
        }

        var New = $scope.New;
        if ($scope.New.IsActive == true) {
            $scope.New.IsActive = 1;
        }
        else
            $scope.New.IsActive = 0;
      
        $http({
            url: vUrl+ "DiscountDetail/InsertDiscountDetail",
            dataType: 'json',
            method: 'POST',
            data: New,
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            $scope.IsDisabled = false;
            var vExist = response.data;
            if (vExist == "Exist") {
                $("#discountsve").attr("disabled", false);
                $scope.msg = DiscountDetailMessages(5);// "Discount Name is already exist"
            }
            else {
               
                $scope.BindGrid(1);
                $scope.New.DiscountPercentage = parseFloat(parseFloat(10 * 2).toFixed(2));
                $scope.msgStatus = DiscountDetailMessages(6);// 'Discount Details Added SuccessFully'
                $scope.Dis = true;
                $scope.Show = false;
                $("#discountsve").attr("disabled", false);
                $scope.New.Description = "";
                $scope.New.DiscountPercentage = "";
                $scope.New.ValidFrom  = "";
                $scope.New.ValidTo = "";
                $scope.New.hiddenDiscountDetailsId = "";
                
                funPlaceholderReset();
            }

            }).catch(function (response) {
                $scope.IsDisabled = false;
               
            });
        
    } 

    $scope.Edit = function (DiscountDetailsId) {
       
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.Dis = false;
        $scope.msgStatus = '';
        $scope.msg = '';

        $http({
            method: "GET",
            url: vUrl+ "DiscountDetail/GetDiscountDetailsById"
            , params: { DiscountDetailsId: DiscountDetailsId, CompanyId: vCompanyId }
            , headers: {
                'Content-Type': JSON

            }
        }).then(function mySuccess(response) {
           

            
            var result = response.data;
            
            var vDescription = result["0"].Description;
            var vDiscountPercentage = result["0"].DiscountPercentage;
            var vValidFrom = new Date(result["0"].ValidFrom);
            var vValidTo = new Date(result["0"].ValidTo);
            var vIsActive = result["0"].IsActive;
            var vStatus = false;
            if (vIsActive == 1)
                vStatus = true;

            $scope.New = { Description: vDescription, DiscountPercentage: vDiscountPercentage, ValidFrom: vValidFrom, ValidTo: vValidTo, IsActive: vStatus };
            $scope.New.hiddenDiscountDetailsId = DiscountDetailsId;
           
        }).catch(function (response) {
            
        });

    }
    
    $scope.Update = function () {
        
        $("#discountupdate").attr("disabled", true);
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msgStatus = '';
        $scope.msg = '';
        var vValidFrom = $scope.New.ValidFrom;
        var vValidTo = $scope.New.ValidTo;
        var date = new Date(new Date());
        //var today = new Date((new Date()).setHours(0, 0, 0, 0)),
     
        if ($scope.New.Description == undefined || $scope.New.Description == null || $scope.New.Description =="" ) {
            $scope.msg = DiscountDetailMessages(1);//'Please Write the Discount Name'
            $("#discountupdate").attr("disabled", false);
            return false;
        }
        if ($scope.New.DiscountPercentage == undefined || $scope.New.DiscountPercentage == null || $scope.New.DiscountPercentage == "") {
            $scope.msg = DiscountDetailMessages(2);//'Please Enter the valid DiscountPercentage'

            $("#discountupdate").attr("disabled", false);
            return false;
        }

        if ($scope.New.ValidFrom == undefined || $scope.New.ValidFrom == null || $scope.New.ValidFrom == "") {
            $scope.msg = DiscountDetailMessages(8);//"Please Enter the validFrom date"
            $("#discountupdate").attr("disabled", false);
            return false;
        }

        if ($scope.New.ValidTo == undefined || $scope.New.ValidTo == null || $scope.New.ValidTo == "") {
            $scope.msg = DiscountDetailMessages(9);//"Please Enter the validTo date"
            $("#discountupdate").attr("disabled", false);
            return false;
        }

        if (vValidFrom > vValidTo || date > vValidTo) {
            $scope.msg = DiscountDetailMessages(10);
            $("#discountupdate").attr("disabled", false);
            return false;//'Please Enter ValidTo date should be greater than validfrom date'
        }

        var vDiscountDetailsId = $scope.New.hiddenDiscountDetailsId;
        var New = $scope.New;

        $http({
            url: vUrl+"DiscountDetail/UpdateDiscountDetails",
            dataType: 'json',
            method: 'POST',
            data: New,
            params: { DiscountDetailsId: vDiscountDetailsId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            //
            $scope.BindGrid(1);
            $("#discountupdate").attr("disabled", false);
            $scope.msgStatus = DiscountDetailMessages(7);// 'Discount Details Updated SuccessFully'
            $scope.Dis = true;
            $scope.Show = false;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.hiddenDiscountDetailsId = "";
            $scope.New.Description = "";
            $scope.New.DiscountPercentage = "";
            $scope.New.ValidFrom = "";
            $scope.New.ValidTo = "";
            $scope.New.IsActive = "";
            funPlaceholderReset();

        })

    }
                             //------------------Update End----------------//



    //----------------    Clear Function    -------------//

    $scope.Clear = function () {
        
        $scope.msgStatus = '';
        $("#discountsve").attr("disabled", false);
        $("#discountupdate").attr("disabled", false);
        $scope.msg = '';
        $scope.New.Description = "";
        $scope.New.DiscountPercentage = "";
        $scope.New.ValidFrom = "";
        $scope.New.ValidTo = "";
        $scope.New.hiddenDiscountDetailsId = "";
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.Dis = true;
        $scope.New.IsActive = true;
        funPlaceholderReset();
    }

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

                         //----------------Pagination Starting--------------//
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
    $scope.sort = function (sortby) {
        var iconName = "";
        $scope.resetAll();
        $scope.pagination();
    };

                         //----------------Pagination Ending--------------//


                    //---------------------   export funtion    ---------------------//

    $scope.exportData = function () {
        //
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Discount>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");       
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };        
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;

        //var today = new Date();
        //var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        a.download = 'Discount.xls';
        a.click();
    };

                     //---------------------     export funtion Ends   ---------------------//



    //---------------------------   Search Function    --------------//

    $scope.Search = function () {
        
        var vdata = $scope.New.Search;

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
            url: vUrl + "DiscountDetail/GetSearch",
            method: "GET",
            params: { Search: vSearch, Status: vStatus, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            
                $scope.allItems = response.data;
               
                $scope.sort('name');
            
        }).catch(function myError(response) {
            
        });
    };

     //-----------------------  Search Function --------------//

   
    //-------------  sorting filter -------//

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















