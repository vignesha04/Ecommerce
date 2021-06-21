'use strict';

ScBusinez.controller('AdminController', function ($scope, $http, $location,$timeout,$rootScope) {

    //var vDomainURl = $location.host();
    //var vDomainURl = "tamilnadumeenvirbanaiangadi.com"; 
    var vDomainURl = "fishermanmarket.in";
    //var vDomainURl = "tnpullingo.co.in";
   // var vDomainURl = "sethienterprise.in";
    //var vDomainURl = "fishermanmarket.in";
    
    $http({
        url: "http://shriudhayammess.com/Domaindata/GetDomaindetails",
        method: 'GET',
        params: { URl: vDomainURl },
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        
        $scope.list = response.data;
        var vResult = response.data;
        var vDomain = vResult["0"].Domain;
        var vSubDomain = vResult["0"].SubDomain;
        var vFileUploadURL = vResult["0"].FileUploadURL;

        $scope.EntityName = vResult["0"].EntityName;
        $scope.DB_Connection_String = vResult["0"].DB_Connection_String;
        $.session.set('FileUploadURL', vFileUploadURL);
        $.session.set('SubDomain', vSubDomain);
          $rootScope.SubDomain = vSubDomain;
        $.session.set('Domain', vDomain);

        $http({
            url: vSubDomain + "IndexPage/InsertWebConfig",
            //url: 'http://localhost:56397/api/IndexPage/InsertWebConfig',
            method: 'GET',
            params: { vEntityName: $scope.EntityName, vDB_Connection_String: $scope.DB_Connection_String },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var vConnectionstringChk = response.data;
            $.session.set('ConnectionstringChk', vConnectionstringChk);
            
           // vUrl = vSubDomain;
             $timeout(function () {
                vUrl = vSubDomain;
               $http({
                url: vUrl + "AdminIndex/GetCompanydetailsAdminIndex",
                method: 'GET',
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                $scope.AdminDetails = response.data;

                var vResult = $scope.AdminDetails;
                var vWebsiteLogo = vResult["0"].WebsiteLogo;
                $scope.favicon = vResult["0"].favicon;
                $scope.InvoiceLogo = vResult["0"].InvoiceLogo;
                var vCompanyName = vResult["0"].CompanyName;
                var vGSTNo = vResult["0"].GSTNo;
                $scope.MobileNo = vResult["0"].PhoneNo;
                $scope.CompanyName = vResult["0"].vCompanyName; 
                $.session.set('InvoiceLogo', $scope.InvoiceLogo);
                $.session.set('CompanyName', vCompanyName);
                $scope.PaymentGateway = vResult["0"].PaymentGateway;
                $scope.PaymentGatewayKey = vResult["0"].PaymentGatewayKey;
               
                $.session.set('GSTNo', vGSTNo);
                $.session.set('PaymentGateway', $scope.PaymentGateway);
                $.session.set('PaymentGatewayKey', $scope.PaymentGatewayKey);

                }).catch(function (response) {
                    
            });
            }, 2000);
            
        }).catch(function (response) {
            
        });


    }).catch(function (response) {
        
    });
    $scope.ConnectionstringChk = $.session.get('ConnectionstringChk');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.Domain = $.session.get('Domain');
    $scope.PaymentGateway = $.session.get('PaymentGateway');
    $scope.PaymentGatewayKey = $.session.get('PaymentGatewayKey');

    var vUrl = $scope.SubDomain;
   // var vUrl = "http://webapi.kasimedufishandmeat.in/api/";
    
   // var vUrl = "http://webapi.kasimedufishandmeat.in/api/";
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    $scope.CompanyName = $.session.get('CompanyName');

   
    $("#favicon").attr("href", $scope.favicon);
    $scope.Getotp = true;
    $scope.otpverify = false;
    $scope.OtpDesktop = false;
    $scope.ShoWOtp = true;
    $scope.ShowUserlogin = false;
    $scope.UserloginDetails = true;
    $scope.AdminloginDetails = false;

    $scope.Getotppass = function () {
        $scope.msg = "";
        if ($scope.MobileNo == undefined || $scope.MobileNo == null || $scope.MobileNo == "") {
            $scope.msg = 'Please Enter Mobile Number';
            return false;
        }
        var reg = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

        if (reg.test(document.getElementById("mobile").value) == false) {
            $scope.msg = 'Please Enter the Valid Mobile Number';
            return false;
        }
        $scope.Otp = true;
        
        var alpha = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9');
        var i;
        for (i = 0; i < 6; i++) {
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            //var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + b + c + d;
        $.session.set("Adminotp", code);
        $scope.HiddenOtpDesktop=code;
        $scope.OtpDesktop=false;

        $http({
            url: "https://api.msg91.com/api/v5/otp?authkey=338037AGkojtcSDiYL5f2b91e7P1&template_id=5f852768305f745c46349d6d&otp=" + code + "&country=0&mobile=91" + $scope.MobileNo + "&otp_length=4&otp_expiry=60",

            method: 'GET',

            async: true,
            crossDomain: true,

            headers: {
                "content-type": "application/json",
            }
        }).then(function (response) {
            


        }).catch(function (response) {
            
        });
        $scope.Getotp = false;
        $scope.otpverify = true;
      
    }

    $scope.Save = function () {
        var otp = $.session.get("Adminotp");

        var enter = $scope.Mobileotp;

        if (otp != enter) {
            $scope.notVerified = true;
            alert("Please Enter Valid Otp");
            return;
        }
        else {
            
            $http({
                method: "Get",
                url: vUrl + "Admin/Getuserdetails",
                params: { username: "Admin", password: "Admin@123" },
                headers: {
                    'Content-type': JSON
                }
            }).then(function (response) {
                
                var result = response.data;
                if (result == null || result == '') {
                    $scope.msg = AdminLoginMessages(4);//"Invalid Login. Please enter correct Username and Password";
                    return false;
                }
                else {
                    var vCompanyId = result.CompanyDetailId;
                    var vAdminLoginId = result.AdminLoginId;
                    var vType = result.Type;
                    $.session.set('CompanyId', vCompanyId);
                    $.session.set('AdminId', vAdminLoginId);
                    $.session.set('Type', vType);

                    $http({
                        url: vUrl + "Admin/GetSiteSettingConfiguration",
                        method: 'GET',
                        headers: {
                            "Content-Type": JSON
                        }
                    }).then(function (response) {
                        
                        var vResult = response.data;
                        var vGridSizeAdmin = vResult["0"].GridSizeAdmin;
                        var vButtonColorAdmin = vResult["0"].ButtonColorAdmin;
                        var vCouponApplicable = vResult["0"].CouponApplicable;
                        var vDiscountApplicable = vResult["0"].DiscountApplicable;
                        var vFacebookSignup = vResult["0"].FacebookSignup;
                        var vMetaTag = vResult["0"].MetaTag;
                        var colorcode = vResult["0"].colorApplicable;
                        $.session.set('GridSizeAdmin', vGridSizeAdmin);
                        $.session.set('ButtonColorAdmin', vButtonColorAdmin);
                        $.session.set('CouponApplicable', vCouponApplicable);
                        $.session.set('DiscountApplicable', vDiscountApplicable);
                        $.session.set('FacebookSignup', vFacebookSignup);
                        $.session.set('MetaTag', vMetaTag);
                        $.session.set('Colortag', colorcode);
                    }).catch(function (response) {

                    });
                    if (vType == "User") {
                        window.location.href = '#!BulkOrder';
                    }
                    else if (vType == "Admin") {
                        window.location.href = '#!DashBoard';
                    }


                }
            }).catch(function (response) {

            })
        }
    }


    $scope.UserLogin = function () {

        $scope.Getotp = false;
        $scope.otpverify = false;
        $scope.OtpDesktop = false;
        $scope.Otp = false;
        $scope.ShoWOtp = false;
        $scope.ShowUserlogin = true;
        $scope.UserloginDetails = false;
        $scope.AdminloginDetails = true;
    }

    $scope.Login = function () {
        debugger;
        $scope.msgStatus = "";
        $scope.msg = "";

        if ($scope.admin == undefined) {
            $scope.msg = AdminLoginMessages(1);// "Pleasen enter the Username and Password";
            return false;
        }

        var vUsername = $scope.admin.Username;
        var vPassword = $scope.admin.Password;

        if (vUsername == "" || vUsername == undefined || vUsername == null) {
            $scope.msg = AdminLoginMessages(2);// "Please enter the Username";
            return false;
        }
        if (vPassword == "" || vPassword == undefined || vPassword == null) {
            $scope.msg = AdminLoginMessages(3);//"Please enter the Password";
            return false;
        }


        debugger;
        $http({
            method: "Get",
            url: vUrl + "Admin/GetuserdetailsforUserlogin",
            params: { username: vUsername, password: vPassword },
            headers: {
                'Content-type': JSON,

            }
        }).then(function (response) {
            debugger;

            var result = response.data;
            if (result == null || result == '') {
                $scope.msg = AdminLoginMessages(4);//"Invalid Login. Please enter correct Username and Password";
                return false;
            }
            else {
                var vCompanyId = result.CompanyDetailId;
                var vCompanyId = result.CompanyDetailId;
                var vAdminLoginId = result.AdminLoginId;
                var vType = result.Type;
                $.session.set('CompanyId', vCompanyId);
                $.session.set('AdminId', vAdminLoginId);
                $.session.set('Type', vType);
                $http({
                    url: vUrl + "Admin/GetSiteSettingConfiguration",
                    method: 'GET',
                    headers: {
                        "Content-Type": JSON
                    }
                }).then(function (response) {
                    debugger;
                    var vResult = response.data;
                    var vGridSizeAdmin = vResult["0"].GridSizeAdmin;
                    var vButtonColorAdmin = vResult["0"].ButtonColorAdmin;
                    var vCouponApplicable = vResult["0"].CouponApplicable;
                    var vDiscountApplicable = vResult["0"].DiscountApplicable;
                    var vFacebookSignup = vResult["0"].FacebookSignup;
                    var vMetaTag = vResult["0"].MetaTag;
                    var colorcode = vResult["0"].colorApplicable;
                    $.session.set('GridSizeAdmin', vGridSizeAdmin);
                    $.session.set('ButtonColorAdmin', vButtonColorAdmin);
                    $.session.set('CouponApplicable', vCouponApplicable);
                    $.session.set('DiscountApplicable', vDiscountApplicable);
                    $.session.set('FacebookSignup', vFacebookSignup);
                    $.session.set('MetaTag', vMetaTag);
                    $.session.set('Colortag', colorcode);

                }).catch(function (response) {
                    debugger;

                });

                if (vType == "User") {
                    window.location.href = '#!BulkOrder';
                }
                else if (vType == "Admin") {
                    window.location.href = '#!DashBoard';
                }

            }
        }).catch(function (response) {

        })
    }

    $scope.AdminLogin = function () {

        $scope.Getotp = true;
        $scope.otpverify = false;
        $scope.OtpDesktop = false;
        $scope.Otp = false;
        $scope.ShoWOtp = true;
        $scope.ShowUserlogin = false;
        $scope.UserloginDetails = true;
        $scope.AdminloginDetails = false;
    }
});
