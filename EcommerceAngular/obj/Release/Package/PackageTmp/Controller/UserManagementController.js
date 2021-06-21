'use strict';

ScBusinez.controller('UserManagementController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    //$scope.SubDomain = "http://localhost:56397/api/";
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    //var vUrl = $scope.SubDomain;
    $scope.Domain = $.session.get('Domain');
     var vUrl = "http://localhost:56397/api/";

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
   
    $scope.Inactive = true;
    $scope.Active = false;

   

    var vCompanyId = $.session.get('CompanyId');

    $scope.BindGrid = function (Active) {
        $http(
            {
                url: vUrl + "UserManagement/GetUserManagement",
                method: 'GET',
                params: { iActive: Active, CompanyId: vCompanyId},
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                debugger;
                $scope.allItems = response.data;
                $scope.sort('name');

            }).catch(function (response) {
                //
            });
    }
    $scope.BindGrid(1);

   

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
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.User.UserName == "" || $scope.User.UserName == undefined || $scope.User.UserName == null) {
            $scope.msg = "Please Enter the User Name";
           
            return false;
        }

        if ($scope.User.Password == "" || $scope.User.Password == undefined || $scope.User.Password == null) {
            $scope.msg = "Please Enter the Password";

            return false;
        }

        var vUsername = $scope.User.UserName;
        var vPassword = $scope.User.Password;


        if ($scope.User.IsActive == true) {
            $scope.User.IsActive = "1";
        }
        else
            $scope.User.IsActive ="0";

        
        $http({
            url: vUrl + "UserManagement/InsertUser",
            method: 'POST',
            params: { CompanyId: vCompanyId, UserName: vUsername, Password: vPassword },
            headers: {
                'Content-Type': "application/json"
            }
        }).then(function (response) {
            debugger;
            if (response == "Not Exist"){
                $scope.msgStatus = 'User Added Sucessfully';
                $scope.User.UserName = "";
                $scope.User.Password = "";
                $scope.User.IsActive = "";
                $scope.BindGrid(1);
            }
            if (response == "Exist"){
                $scope.msg = "This User Name Is Already Exist";

            }
           
        }).catch(function (response) {

        });


    }

    var vCompanyId = $.session.get('CompanyId');
    var vloginid = "";

    $scope.Edit = function (AdminLoginId) {

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.Categ = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        var vCompanyId = $.session.get('CompanyId');

        $http({
            method: "GET",
            url: vUrl + "UserManagement/GetUserManagementById",
            params: { AdminLoginId: AdminLoginId, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            debugger;
            var result = response.data;

            //var New = response.data;
            var vUsername = result["0"].Username;
            var vCompanyDetailId = result["0"].CompanyDetailId;
            var IsActive = result["0"].IsActive;
            var Password = result["0"].Password;
            vloginid = result["0"].AdminLoginId;
            var vstatus = false;
            if (IsActive == "1")
                vstatus = true;

            $scope.User = { UserName: vUsername, IsActive: vstatus, CompanyDetailId: vCompanyDetailId, Password: Password };
            $scope.hiddenCategoryId = AdminLoginId;
            $window.scrollTo(0, 0);

        }).catch(function (response) {
            //debugger
        });
    }

    var vCompanyId = $.session.get('CompanyId');

    

    $scope.Update = function () {

        var vUsername = $scope.User.UserName;
        var vPassword = $scope.User.Password;
        var vIsActive = $scope.User.IsActive;

        if (vIsActive == true) {
            vIsActive = "1";
        }
        else
            vIsActive = "0";

        $http({
            url: vUrl + "UserManagement/UpdateUserManagement",
            dataType: 'json',
            method: 'POST',
            //data: cats,
            params: { CompanyId: vCompanyId, UserName: vUsername, Password: vPassword, IsActive: vIsActive, AdminLoginId: vloginid  },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            debugger;
            $scope.msgStatus = 'User Data Updated Sucessfully';
            $scope.BindGrid(1);
            vloginid = "";
            $scope.User.UserName = "";
            $scope.User.Password = "";
            $scope.User.IsActive = "";
            
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
           
        });
    }
  
    $scope.Clear = function () {
        //
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.User.UserName = "";
        $scope.User.Password = "";
        $scope.User.IsActive = "";
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

    $scope.Scrolltable1 = function () {

        document.getElementById("scrolltable11").focus();
    }    

});
