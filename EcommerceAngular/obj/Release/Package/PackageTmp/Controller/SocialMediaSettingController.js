'use strict';

ScBusinez.controller('SocialMediaSettingController', function ($scope, $http, $timeout, $window) {
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
    //For SubMenu/////////////////////////////

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

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

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.social = true;
    $scope.Show = true;

    $scope.msgError = '';
    $scope.msgStatus = '';

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

    $scope.BindGrid = function () {
        
        $http(
            {
                url: vUrl + "SocialMediaSetting/GetSocialMedia",
                method: 'GET',
                params: { CompanyDetailId: vCompanyId},
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                $scope.allItems = response.data;

               // 
            }).catch(function (response) {
                //
            });
    }
    //-----dropdown------//
    $scope.BindGrid();

    $http(
        {
            url: vUrl + "SocialMediaSetting/GetSocialDetails",
            method: 'GET',
            params: { CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {

            $scope.social = response.data;

        }).catch(function (response) {

        });

    $scope.onTextBoxKeyPress = function (event) {
        

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    //-------------    Insert Funtion   ---------------//

    $scope.Save = function () {
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.SocialMedia.SocialMediaId == "" || $scope.SocialMedia.SocialMediaId == undefined || $scope.SocialMedia.SocialMediaId == null) {
            $scope.msg = SocialMediaMessages(1);//'Please Enter the SocialMediaId';
            return false;
        }
        if ($scope.SocialMedia.SocialMediaLink1 == "" || $scope.SocialMedia.SocialMediaLink1 == undefined || $scope.SocialMedia.SocialMediaLink1 == null) {
            $scope.msg = SocialMediaMessages(2); //'Please Enter the SocialMediaLink1';
            return false;
        }
        // --------------Url Validation-------------//
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        //
        if (!re.test($scope.SocialMedia.SocialMediaLink1)) {
            //alert("url error");
            $scope.msg = SocialMediaMessages(3); //'Please Enter the valid Link';
            return false;
        }
        ////---------Validation Ends-----------//


        var SocialMediaLink = $scope.SocialMedia;

        $http({
            url: vUrl + "SocialMediaLink/InsertSocialMediaLinks",
            dataType: 'json',
            method: 'POST',
            params: { CompanyDetailId: vCompanyId },
            data: SocialMediaLink,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = SocialMediaMessages(4); //"This Socialmedia Link already exists";
            }
            else {
                $scope.msgStatus = SocialMediaMessages(5); //'Added successfully';
                $scope.BindGrid();
                $scope.SocialMedia.SocialMediaId = "";
                $scope.SocialMedia.SocialMediaLink1 = "";
            }

        }).catch(function (response) {

        });
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
    }

    $scope.ddlSocialChange = function (SocialMediaId) {
        $scope.msgStatus = "";
        $scope.msg = "";
        //  
        $http({
            url: vUrl + "SocialMediaSetting/GetSocialMedias",
            method: 'GET',
            params: { SocialId: SocialMediaId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            if (response.data.length != 0) {
                var result = response.data;
                $scope.ShowSave = false;
                $scope.ShowUpdate = true;
                //  
                var vSocialMediaLink1 = result["0"].SocialMediaLink1;
                var vSocialMediaLinkId = result["0"].SocialMediaLinkId;

                $scope.SocialMedia.HiddenSocialMediaLinkId = vSocialMediaLinkId;
                $scope.SocialMedia.SocialMediaLink1 = vSocialMediaLink1;
            }
            else {
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
                $scope.SocialMedia.SocialMediaLink1 = "";
                $scope.msgStatus = "";
                $scope.msg = "";

            }
        }).catch(function (response) {

        });
    }

    var BindSocialMediaEditTime = function (SocialMediaId) {
        $http({
            url: vUrl + "SocialMediaSetting/GetSocialMedias",
            method: 'GET',
            params: { SocialId: SocialMediaId, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            if (response.data == null) {
                $scope.msg = "You are not a Authorized user";
            }
            else {
                //  
                $scope.SocialMediaLink1Details = response.data;
            }
        }).catch(function (response) {
        });
    }

    //------------------    Edit Function   ------------------//

    $scope.Edit = function (SocialMediaLinkId) {

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msgStatus = "";
        $scope.msg = "";

        $http({
            method: "GET",
            url: vUrl + "SocialMediaSetting/GetSocialMediabySocialMediaLinkId",
            params: { SocialMediaLinkId: SocialMediaLinkId, CompanyDetailId: vCompanyId }, 
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {

            var result = response.data;

            var vSocialMediaLink1 = result["0"].SocialMediaLink1;
            var vSocialMediaType = result["0"].SocialMediaType;
            var vSocialMediaId = result["0"].SocialMediaId;
            var vSocialMediaLinkId = result["0"].SocialMediaLinkId;
            $scope.BindGrid();
            $scope.SocialMedia = { SocialMediaLink1: vSocialMediaLink1, SocialMediaType: vSocialMediaType, SocialMediaId: vSocialMediaId, HiddenSocialMediaLinkId: vSocialMediaLinkId, CompanyDetailId: vCompanyId };



        }).catch(function (response) {

        });
    }
    //---------------------   Edit Funtion Ends    ----------------//

    //----------------------    Update Function   --------------------//


    $scope.Update = function () {
        

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msg = "";
        $scope.msgStatus = "";


        if ($scope.SocialMedia.SocialMediaId == "" || $scope.SocialMedia.SocialMediaId == undefined || $scope.SocialMedia.SocialMediaId == null) {
            $scope.msg = SocialMediaMessages(1);//'Please Enter the SocialMediaId';
            return false;
        }
        if ($scope.SocialMedia.SocialMediaLink1 == "" || $scope.SocialMedia.SocialMediaLink1 == undefined || $scope.SocialMedia.SocialMediaLink1 == null) {
            $scope.msg = SocialMediaMessages(2); //'Please Enter the SocialMediaLink1';
            return false;
        }
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
       // 
        if (!re.test($scope.SocialMedia.SocialMediaLink1)) {
            //alert("url error");
            $scope.msg = SocialMediaMessages(3); //'Please Enter a valid Link';
            return false;
        }
        var vSocialMediaId = $scope.SocialMedia.HiddenSocialMediaLinkId;
        var SocialMedia = $scope.SocialMedia;

        $http({
            url: vUrl + "SocialMediaLink/UpdateSocialMedia",
            dataType: 'json',
            method: 'POST',
            data: SocialMedia,
            params: { SocialMediaLinkId: vSocialMediaId, CompanyDetailId: vCompanyId  },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {

            $scope.msgStatus = SocialMediaMessages(6); //"Updated SocialMediaLink Successfully";
            $scope.Show = false;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.SocialMedia.SocialMediaId = "";
            $scope.SocialMedia.SocialMediaLink1 = "";
            $scope.BindGrid();
        });

    }


    //-Update Function Ends   ---//

    //--   Clear Function   ---//
    $scope.Clear = function () {

        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Show = true;
        $scope.SocialMedia.SocialMediaId = "";
        $scope.SocialMedia.SocialMediaLinkId = "";
        $scope.SocialMedia.SocialMediaLink1 = "";

        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.SocialMediaLinkId = true;
        $scope.SocialMediaLink1 = true;


    }
    $scope.Delete = function (SocialMediaLinkId, code) {
        //$scope.ShowSave = false;
        //$scope.ShowUpdate = true;
        //$scope.Show = true;
        $scope.msgStatus = "";
        var r = confirm("Do you want to delete the social media=" +code+ "?");
        if (r == true) {
            $http({
                url: vUrl + "SocialMediaLink/DeleteSocialMedia",
                dataType: 'json',
                method: 'POST',
                data: "",
                params: { SocialMediaLinkId: SocialMediaLinkId, CompanyDetailId: vCompanyId },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (data) {
                
                $scope.BindGrid();
                $scope.msgStatus = SocialMediaMessages(7); //"Deleted SocialMediaLink Successfully";
               
            });
        }
        else {
            return false;
        }
            
        

            

       
    }
})




        