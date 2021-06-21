'use strict';

ScBusinez.controller('SiteSettingsController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    var vUrl = $scope.SubDomain;
     //var vUrl = "http://localhost:56397/api/";


    $window.scrollTo(0, 0);
    $scope.CompanyName = $.session.get('CompanyName');
    
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vCompanyId = $.session.get('CompanyId');
    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '';
    }
    ///Button Color Change function
    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.myObj = {
        "background-color": vbackgroundColor
    }
    ////end

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

  


    var vLoginType = $.session.get('Type');
   

    var vfooterimg = '';


    $http({
        url: vUrl + "Setting/getEcommerceAPI",
        method: 'GET',
        params: { CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {
        
        var vEcommerceAPI = response.data;
        if (response.data.length != 0) {
            $scope.ShowSave = false;
            $scope.ShowUpdate = true;
        }

        $scope.settingid = vEcommerceAPI["0"].SettingId;
        var vDateFormat = vEcommerceAPI["0"].DateFormat;
        var vCurrencyType = vEcommerceAPI["0"].CurrencyType;
        var vGridSizeAdmin = vEcommerceAPI["0"].GridSizeAdmin;
        var vGridSizeClient = vEcommerceAPI["0"].GridSizeClient;
        var vButtonColorAdmin = vEcommerceAPI["0"].ButtonColorAdmin;
        var vMetaTag = vEcommerceAPI["0"].MetaTag;
        var vFacebookSignup = vEcommerceAPI["0"].FacebookSignup;
        var vCouponApplicable = vEcommerceAPI["0"].CouponApplicable;
        var vDiscountApplicable = vEcommerceAPI["0"].DiscountApplicable;
        var vCaptchaId = vEcommerceAPI["0"].CaptchaId;
        var vCompanyDetailId = vEcommerceAPI["0"].CompanyDetailId;
        var vcolorApplicable = vEcommerceAPI["0"].colorApplicable; 
        var vFotterImage = vEcommerceAPI["0"].FotterImage; 
        var vThemecolour = vEcommerceAPI["0"].Themecolour;

        var vInvoicenumber = vEcommerceAPI["0"].Invoice;
        var vInvoicenumber1 = vInvoicenumber["0"].InvoiceNumber1;
        var vinvoiceprefix = vInvoicenumber["0"].invoiceprefix;
      
        vfooterimg = vFotterImage;

        var vFacebookSignup1 = false, vCouponApplicable1 = false, vDiscountApplicable1 = false;
        var vcolorApplicable1 = false;

        if (vFacebookSignup == "1")
            vFacebookSignup1 = true;


        if (vCouponApplicable == "1")
            vCouponApplicable1 = true;

        if (vDiscountApplicable == "1")
            vDiscountApplicable1 = true;

        if (vcolorApplicable == "1")
            vcolorApplicable1 = true;


        $scope.Setting = {
            DateFormat: vDateFormat, CurrencyType: vCurrencyType, GridSizeAdmin: vGridSizeAdmin, GridSizeClient: vGridSizeClient, ButtonColorAdmin: vButtonColorAdmin, CaptchaId: vCaptchaId, CompanyDetailId: vCompanyDetailId, MetaTag: vMetaTag, ThemeColour: vThemecolour,
            InvoiceNumber: vInvoicenumber1, InvoicePrefix: vinvoiceprefix};

        $scope.FacebookSignup = vFacebookSignup1;
        $scope.CouponApplicable = vCouponApplicable1;
        $scope.DiscountApplicable = vDiscountApplicable1;

        $scope.colorApplicable = vcolorApplicable1;

    }).catch(function (response) {

        });


    //$http({
    //    url: vUrl + "Setting/GetInvoiceNumber",
    //    method: 'GET',
    //    params: { CompanyId: vCompanyId },
    //    headers: {
    //        "Content-Type": JSON
    //    }

    //}).then(function (response) {

    //    var vEcommerceAPI = response.data;
    //    if (response.data.length != 0) {
    //        $scope.ShowSave = false;
    //        $scope.ShowUpdate = true;
    //    }

    //    var vinvoiceprefix = vEcommerceAPI["0"].invoiceprefix;
    //    var vInvoiceNumber1 = vEcommerceAPI["0"].InvoiceNumber1;
     

    //    $scope.Setting = { InvoiceNumber: vInvoiceNumber1, InvoicePrefix: vinvoiceprefix};

    

    //}).catch(function (response) {

    //});

    //Save


    $scope.Save = function () {
        
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Setting.DateFormat == "" || $scope.Setting.DateFormat == undefined || $scope.Setting.DateFormat == null) {
            $scope.msg = 'Please Enter the DateFormat';
            return false;
        }
        if ($scope.Setting.CurrencyType == "" || $scope.Setting.CurrencyType == undefined || $scope.Setting.CurrencyType == null) {
            $scope.msg = 'Please Enter the CurrencyType';
            return false;
        }
        if ($scope.Setting.GridSizeAdmin == "" || $scope.Setting.GridSizeAdmin == undefined || $scope.Setting.GridSizeAdmin == null) {
            $scope.msg = 'Please Enter the GridSizeAdmin';
            return false;
        }
        if ($scope.Setting.GridSizeClient == "" || $scope.Setting.GridSizeClient == undefined || $scope.Setting.GridSizeClient == null) {
            $scope.msg = 'Please Enter the GridSizeClient';
            return false;
        }
        if ($scope.Setting.ButtonColorAdmin == "" || $scope.Setting.ButtonColorAdmin == undefined || $scope.Setting.ButtonColorAdmin == null) {
            $scope.msg = 'Please Enter the ButtonColorAdmin';
            return false;
        }
        if ($scope.Setting.MetaTag == "" || $scope.Setting.MetaTag == undefined || $scope.Setting.MetaTag == null) {
            $scope.msg = 'Please Enter the MetaTag';
            return false;
        }


        if ($scope.FacebookSignup == true) {
            $scope.Setting.FacebookSignup = "1";
        }
        else {
            $scope.Setting.FacebookSignup = "0";
        }
        if ($scope.CouponApplicable == true) {
            $scope.Setting.CouponApplicable = "1";
        }
        else {
            $scope.Setting.CouponApplicable = "0";
        }

        if ($scope.DiscountApplicable == true) {
            $scope.Setting.DiscountApplicable = "1";
        }
        else {
            $scope.Setting.DiscountApplicable = "0";
        }
        if ($("#colorApplicable").is(':checked')) {
            $scope.Setting.colorApplicable = "1";
        }
        else {
            $scope.Setting.colorApplicable = "0";
        }
        var Setting = $scope.Setting;
        
        $http({
            url: vUrl + "Setting/InsertSettings",
            dataType: 'json',
            method: 'POST',
            params: { CompanyId: vCompanyId },
            data: Setting,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            
            $scope.msgStatus = 'Inserted successfully';


        }).catch(function (response) {

        });
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
    }

    //Update
    
   $scope.Update = function () {

       debugger;
        $scope.msg = "";
        $scope.msgStatus = "";

        if ($scope.Setting.DateFormat == "" || $scope.Setting.DateFormat == undefined || $scope.Setting.DateFormat == null) {
            $scope.msg = 'Please Enter the DateFormat';
            return false;
        }
        if ($scope.Setting.CurrencyType == "" || $scope.Setting.CurrencyType == undefined || $scope.Setting.CurrencyType == null) {
            $scope.msg = 'Please Enter the CurrencyType';
            return false;
        }
        if ($scope.Setting.GridSizeAdmin == "" || $scope.Setting.GridSizeAdmin == undefined || $scope.Setting.GridSizeAdmin == null) {
            $scope.msg = 'Please Enter the GridSizeAdmin';
            return false;
        }
        if ($scope.Setting.GridSizeClient == "" || $scope.Setting.GridSizeClient == undefined || $scope.Setting.GridSizeClient == null) {
            $scope.msg = 'Please Enter the GridSizeClient';
            return false;
        }
        if ($scope.Setting.ButtonColorAdmin == "" || $scope.Setting.ButtonColorAdmin == undefined || $scope.Setting.ButtonColorAdmin == null) {
            $scope.msg = 'Please Enter the ButtonColorAdmin';
            return false;
        }
        //if ($scope.Setting.MetaTag == "" || $scope.Setting.MetaTag == undefined || $scope.Setting.MetaTag == null) {
        //    $scope.msg = 'Please Enter the MetaTag';
        //    return false;
        //}

        if ($scope.FacebookSignup == true) {
            $scope.Setting.FacebookSignup = "1";
        }
        else {
            $scope.Setting.FacebookSignup = "0";
        }

        if ($scope.CouponApplicable == true) {
            $scope.Setting.CouponApplicable = "1";
        }
        else {
            $scope.Setting.CouponApplicable = "0";
        }

        if ($scope.DiscountApplicable == true) {
            $scope.Setting.DiscountApplicable = "1";
        }
        else {
            $scope.Setting.DiscountApplicable = "0";
        }
       if ($("#colorApplicable").is(':checked')) {
           $scope.Setting.colorApplicable = "1";
       }
       else {
           $scope.Setting.colorApplicable = "0";
       }
        $scope.Setting.FotterImage = vfooterimg;
        

        var Setting = $scope.Setting;
       
            
            $http({
                url: vUrl + "Setting/UpdateSetting",
                dataType: 'json',
                method: 'POST',
                data: Setting,
                params: { CompanyId: vCompanyId, settingid:$scope.settingid },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (data) {
                
                if ($scope.theFile != undefined && $scope.theFile != null && $scope.theFile != "") {
                    var fromdata = new FormData();
                    fromdata.append("uploadedFile", $scope.theFile);
                    var request = {
                        method: 'POST',
                        url: vUrl + "FileUpload/FooterImage",
                        data: fromdata,
                        params: { CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
                        headers: {
                            'Content-Type': undefined
                        }
                    };

                    $http(request).then(function mySuccess(response) {
                        var Picture = response.data;

                    }).catch(function myError(response) {
                    });
                }
                $scope.msgStatus = "Updated Setting Successfully";

                $scope.ShowSave = false;
                $scope.ShowUpdate = true;

            });
        


        
        $scope.msg = "";
        $scope.msgStatus = "";

        if ($scope.Setting.DateFormat == "" || $scope.Setting.DateFormat == undefined || $scope.Setting.DateFormat == null) {
            $scope.msg = 'Please Enter the DateFormat';
            return false;
        }
        if ($scope.Setting.CurrencyType == "" || $scope.Setting.CurrencyType == undefined || $scope.Setting.CurrencyType == null) {
            $scope.msg = 'Please Enter the CurrencyType';
            return false;
        }
        if ($scope.Setting.GridSizeAdmin == "" || $scope.Setting.GridSizeAdmin == undefined || $scope.Setting.GridSizeAdmin == null) {
            $scope.msg = 'Please Enter the GridSizeAdmin';
            return false;
        }
        if ($scope.Setting.GridSizeClient == "" || $scope.Setting.GridSizeClient == undefined || $scope.Setting.GridSizeClient == null) {
            $scope.msg = 'Please Enter the GridSizeClient';
            return false;
        }
        if ($scope.Setting.ButtonColorAdmin == "" || $scope.Setting.ButtonColorAdmin == undefined || $scope.Setting.ButtonColorAdmin == null) {
            $scope.msg = 'Please Enter the ButtonColorAdmin';
            return false;
        }
        //if ($scope.Setting.MetaTag == "" || $scope.Setting.MetaTag == undefined || $scope.Setting.MetaTag == null) {
        //    $scope.msg = 'Please Enter the MetaTag';
        //    return false;
        //}

        if ($scope.FacebookSignup == true) {
            $scope.Setting.FacebookSignup = "1";
        }
        else {
            $scope.Setting.FacebookSignup = "0";
        }

        if ($scope.CouponApplicable == true) {
            $scope.Setting.CouponApplicable = "1";
        }
        else {
            $scope.Setting.CouponApplicable = "0";
        }

        if ($scope.DiscountApplicable == true) {
            $scope.Setting.DiscountApplicable = "1";
        }
        else {
            $scope.Setting.DiscountApplicable = "0";
        }
       if ($("#colorApplicable").is(':checked')) {
           $scope.Setting.colorApplicable = "1";
       }
       else {
           $scope.Setting.colorApplicable = "0";
       }

        var Setting = $scope.Setting;
        if ($scope.theFile != undefined && $scope.theFile != null && $scope.theFile != "") {
            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);
            var request = {
                method: 'POST',
                url: vUrl + "FileUpload/FooterImage",
                data: fromdata,
                params: { CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };

            $http(request).then(function mySuccess(response) {
                var Picture = response.data;

            }).catch(function myError(response) {
            });
        }
            
            $http({
                url: vUrl + "Setting/UpdateSetting",
                dataType: 'json',
                method: 'POST',
                data: Setting,
                params: { CompanyId: vCompanyId },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (data) {
                alert("Settings are updated , Please login again to view changes");
                $scope.msgStatus = "Updated Setting Successfully";

                $scope.ShowSave = false;
                $scope.ShowUpdate = true;

            });
        

        }


    $scope.setFile = function (element) {
        
        $scope.$apply(function ($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
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
});