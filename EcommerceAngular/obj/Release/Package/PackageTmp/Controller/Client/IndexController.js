'use strict';
Ecom.controller('IndexController', function ($scope, $http, $rootScope, $timeout, $window, $location) {
    
    //var vDomainURl = $location.host();
    //var vDomainURl = "skmetals.in";
    var vDomainURl = "fishermanmarket.in";
   
    
    $http({
        url: "https://shriudhayammess.com/Domaindata/GetDomaindetails",
        method: 'GET',
        params: { URl: vDomainURl },
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        debugger;
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
            debugger;
            var vConnectionstringChk = response.data;
            $.session.set('ConnectionstringChk', vConnectionstringChk);
            $timeout(function () {
                vUrl = vSubDomain;
                testing();
                BindSiteSettingsConfig();
            }, 2000);                    
            }).catch(function (response) {             
            });

        }).catch(function (response) {           
        }); 
    $scope.ConnectionstringChk = $.session.get('ConnectionstringChk');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    $scope.SubDomain = $.session.get('SubDomain');   
    $scope.Domain = $.session.get('Domain');
    var vThemecolour = $.session.get('Themecolour');
    $scope.PaymentGateway = $.session.get('PaymentGateway');
    $scope.PaymentGatewayKey = $.session.get('PaymentGatewayKey');
    $scope.CompanyName = $.session.get('CompanyName');
    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/"; 
     
    $window.scrollTo(0, 0);
    $("body").on("contextmenu", function (e) {
        return false;
    });
    $('body').bind('cut', function (e) {
        e.preventDefault();
    });
    $(document).bind('keydown keypress','ctrl+s',function(){
    var forbiddenKeys = new Array("a", "s");
    var key;
    var isCtrl;
    if (window.event) {
        key = window.event.keyCode;
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {
        key = e.which;
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    if (isCtrl) {
        for (var i = 0; i < forbiddenKeys.length; i++){
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
                return false;
            }
        }
    }
    });
    $scope.onTextBoxKeyPress = function (event) {
    if (event.keyCode == 39 || event.keyCode == 34) {
        event.preventDefault();
        $scope.msg = "Single quote and Double Quote are not allowed";
        return false;
    }
}

    $scope.getotp = true;
    $scope.Verified = false;
    $scope.OtpDesktop=false;
    $scope.OtpMobile=false;

    $scope.ViewSingleProductPage = function (ProductId) {     
        var vProductId = ProductId;
        $scope.MenuClick();
        $.session.set('ProductId', vProductId);
        var vLocation = "#!Product";
        window.location = vLocation;

        }

    $scope.GetOtp = function () {
        $scope.msgSignIn = "";
        if ($scope.MobileNo == undefined || $scope.MobileNo == null || $scope.MobileNo == "") {
            $scope.Showsignin = true;
            $scope.showmsgErrorIn = true;
            $scope.msgSignIn = 'Please Enter Mobile Number';
            return false;
        }
        var reg = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

        if (reg.test(document.getElementById("mobile").value) == false) {
            $scope.Showsignin = true;
            $scope.showmsgErrorIn = true;
            $scope.msgSignIn = 'Please Enter the Valid Mobile Number';
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
        $.session.set("otp", code);
		debugger;
		$scope.OtpDesktop=false;
        $scope.OtpMobile=false;
        $scope.HiddenOtpMobile=code;
        $scope.HiddenOtpDesktop=code;
        


        $http({
            url: "https://api.msg91.com/api/v5/otp?authkey=338037AGkojtcSDiYL5f2b91e7P1&template_id=5f852768305f745c46349d6d&country=0&otp=" + code + "&mobile=91" + $scope.MobileNo + "&otp_length=4&otp_expiry=60",

            method: 'GET',

            async: true,
            crossDomain: true,

            headers: {
                "content-type": "application/json",
            }
        }).then(function (response) {
            
            $scope.Showsignin = false;
            $scope.showmsgErrorIn = "";

        }).catch(function (response) {
            
        });

        $scope.getotp = false;
        $scope.Verified = true;

    }


    $scope.fetchUsers = function () {
        var searchText_len = $scope.HeaderSearchTxt.trim().length;
        // Check search text length
        if (searchText_len > 2) {
            $http({
                url: vUrl + "IndexPage/ProductSearch",
                method: 'GET',
                params: { search: $scope.HeaderSearchTxt },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {               
                $scope.Productlist = response.data;
            }).catch(function (response) {
            });
        } else {
            $scope.searchResult = {};
        }

    }

    $scope.Verifed = function () {
        var otp = $.session.get("otp");
        var enter = $scope.Mobileotp;
        if (otp != enter) {
            $scope.notVerified = true;
            alert("Please Enter Valid Otp");
            return;
        }
        else {            
            $http({
               url: vUrl + "IndexPage/GetMemberDetailsMobileNo",
                method: "GET", params: { MobileNo: $scope.MobileNo },
                headers: { "Content-Type": JSON }
            }).then(function mySuccess(response) {               
                var result = response.data; if (response.data.length != 0) {
                    $.session.set("clientMemberId", result["0"].MemberId);
                    $.session.set("clientMemberName", result["0"].MemberName);
                    var orderno = $.session.get("vcilentorderno");                  
                    $scope.MemberName = result["0"].MemberName; $scope.MemberId = result["0"].MemberId;
                    $scope.ContactNo = result["0"].ContactNo; $scope.EmailId = result["0"].EmailId;
                    $scope.msgStatusSignIn = "Logged in successfully";
                    $scope.showmsgSignIn = true;
                    $scope.showmsgErrorIn = false;
                    $scope.showmsgUpdate = false;
                    $scope.Mobileotp = "";
                    $scope.MobileNo = "";
                    $scope.ShowSignIn = false;
                    $scope.ShowSignUp = false;
                    if ($scope.MemberName == "null" || $scope.MemberName == undefined || $scope.MemberName == "" || $scope.MemberName == null) {                      
                        $scope.ShowMemberName = false;

                    }
                    else {

                        $scope.ShowMemberName = true;
                    }
                    
                    $scope.ShowSignOut = true;
                    $scope.ShowMemberProfile = true;
                    $scope.ShowCaptcha = true;
                    $scope.ShowClientOrder = true;
                    $('#myModal').modal('hide');
                   
                    $scope.MobileNo = "";
                    $scope.Mobileotp="";
                    $scope.Otp = false;
                    $scope.getotp = true;
                    $scope.Verified = false;
                    $('#myModalmobSignIn').modal('hide');
                    if (orderno != null && orderno != "" && orderno != undefined && orderno != "null") {
                        window.location.href ="#!ClientOrder"
                    }

                }
            }).catch(function (response) {

            });

        }
    }

    
    $scope.aHomeMobileClick = function () {
         var vclientMemberId = $.session.get('clientMemberId');
        $('.megamenu-wrapper').removeClass('so-megamenu-active');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined && vclientMemberId != "undefined") {
            var vLocation = "#!HomePage/" + vclientMemberId;
            window.location.href = vLocation;
        }
        else {
            var vLocation = "#!HomePage/0";
            window.location.href = vLocation;
        }
    }
    $scope.ClientLogo = $.session.get('ClientLogo');
    $scope.MetaTag = $.session.get('MetaTag');
    $scope.ClientPhoneNo = $.session.get('ClientPhoneNo');

    $scope.Storedetail = function () {
        $http({
            url: vUrl + "Home/GetContactUsAdminId",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            $scope.Details = response.data;
            BindSocialMediaLink();
        }).catch(function (response) {
        });
    }


    var testing = function(){        
        $http({
            url: vUrl + "Admin/GetCompanydetails",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {            
            $scope.ClientDetails = response.data;
            var vResult = response.data;
            var vAddress1 = vResult["0"].AddressLine1;
            var vAddressLine2 = vResult["0"].AddressLine2;
            var vCity = vResult["0"].City;
            var vState = vResult["0"].State;
            var vCountry = vResult["0"].Country;
            var vPinCode = vResult["0"].PinCode;
            var vCompanyName = vResult["0"].CompanyName;
            var vCompanyDetailId = vResult["0"].CompanyDetailId;
            $scope.Phone = vResult["0"].PhoneNo;
            $scope.PaymentGateway = vResult["0"].PaymentGateway;
            $scope.PaymentGatewayKey = vResult["0"].PaymentGatewayKey;
            $scope.favicon = vResult["0"].favicon;
            $.session.set('CompanyDetailId', vResult["0"].vCompanyDetailId);
            $.session.set('PaymentGateway', $scope.PaymentGateway);
            $.session.set('PaymentGatewayKey', $scope.PaymentGatewayKey);
            $scope.vAddress1 = vAddress1;
            $scope.vAddressLine2 = vAddressLine2;
            $scope.vCity = vCity;
            $scope.vState = vState;
            $scope.vCountry = vCountry;
            $scope.vPinCode = vPinCode;
            $scope.CompanyName = vCompanyName;
            $.session.set('CompanyName', vCompanyName);
            }).catch(function (response) {
                
            });

        $("#favicon").attr("href", $scope.favicon);

        var BindCategories = function () {
            $http({
                url: vUrl + "IndexPage/GetCategory",
                method: 'GET',
                headers: { "Content-Type": JSON }
            }).then(function (response) {               
                $scope.Categoryitm = response.data;
                if ($scope.TrendingItems == "TimeOut")
                    window.location.href = "#!TimeOut";
                else { }               
            }).catch(function (response) { });
        }
        $scope.Storedetail();
    }
      
  
    var BindSiteSettingsConfig = function () {
        $http({
            url: vUrl + "IndexPage/GetSiteSettingConfiguration",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var vResult = response.data;
            var vCurrencyType = vResult["0"].CurrencyType;
            $scope.FooterImaeg = vResult["0"].FotterImage;
            var vGridSizeClient = vResult["0"].GridSizeClient;
            var vThemecolour = vResult["0"].Themecolour;
            var vMetaTag = vResult["0"].MetaTag;
            var vCouponApplicable = vResult["0"].CouponApplicable;
            $.session.set('CurrencyType', vResult["0"].vCurrencyType);
            $.session.set('GridSizeClient', vResult["0"].vGridSizeClient);
            $.session.set('Themecolour', vResult["0"].vThemecolour);
            $.session.set('MetaTag', vResult["0"].vMetaTag);
            $.session.set('CouponApplicable', vCouponApplicable);
            $scope.CurrencyType = vCurrencyType;
            $scope.MetaTag = vMetaTag;
            $scope.Themecolour = vThemecolour;
            $scope.GridSizeClient = vGridSizeClient;

            $scope.Captcha();
            $scope.CaptchaSignUp();
            $scope.CaptchaMob();
            $scope.CaptchaSignUpMob();
        }).catch(function (response) {
        });
    }   

    $scope.bindCategoryForMenu = function () {         
          $http({
              url: vUrl + "IndexPage/GetCategorydetails",
              method: 'GET',
              headers: { "Content-Type": JSON }
          }).then(function (response) {
              
              $scope.Category = response.data;
              
          }).catch(function (response) {            
          });
      }
   
    $scope.ShowFacebook = false;
    $scope.ShowTwitter = false;
    $scope.ShowGoogleplus = false;
    var BindSocialMediaLink = function () {
        $http({
            url: vUrl + "IndexPage/GetSocialMediaLink",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            var vResult = response.data;
            if (vResult == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.bindCategoryForMenu();
                
    for (var i = 0; i < response.data.length; i++){
            var vSocialMediaType = vResult[i].SocialMediaType;
            var vSocialMediaLink1 = vResult[i].SocialMediaLink1;
        if (vSocialMediaType == "FaceBook") {
            $scope.ShowFacebook = true;
            $scope.FacebookLink = vSocialMediaLink1;
        }
        else if (vSocialMediaType == "Instagram") {
            $scope.ShowTwitter = true;
            $scope.TwitterLink = vSocialMediaLink1;
        }
        else if (vSocialMediaType == "Youtube") {
            $scope.ShowGoogleplus = true;
            $scope.ShowGoogleLink = vSocialMediaLink1;
        }
    }
}
            }).catch(function (response) {
            });
}
    var vclientMemberId = $.session.get('clientMemberId');
    if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined && vclientMemberId != "undefined") {
        
        //$scope.ShowMemberName = true;
        $scope.ShowSignOut = true;
        $scope.ShowMemberProfile = true;
        var vMemName = $.session.get('clientMemberName');
        $scope.MemberName = vMemName;
        $scope.MemberId = vclientMemberId;
        $scope.ShowClientOrder = true;
    }
    else {
        $scope.ShowSignIn = true;
        $scope.ShowSignUp = true;
        $scope.ShowMemberName = false;
        $scope.ShowSignOut = false;
        $scope.ShowMemberProfile = false;
        $scope.showmsgSignIn = false;
        $scope.showmsgSignUp = false;
        $scope.showPassword1 = true;
        $scope.ShowForgetPwdHeader = false;
        $scope.ShowSignInHeader = true;
        $scope.ShowSignInEmailId = true;
        $scope.Showforgetpwd = true;
        $scope.ShowResetpwd = false;
        $scope.Showsignin = true;
        $scope.Showreset = false;
        $scope.RegEmailId = false;
        $scope.ShowSendCode = true;
        $scope.Showreset = false;
        $scope.showmsgresetsuccess = false;
        $scope.ShowCaptcha = true;
        $scope.showmsgmailerror = false;
        $scope.showmsgErrorUpdate = false;
        $scope.msgStatusSignIn = "";
        $scope.msgStatussuccess = "";
        $scope.ShowmyModal = true;
        $scope.ShowSave = true;
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.msgStatusSignIn = '';
        $scope.msgSignIn = '';
        $scope.ShowClientOrder = false;
    }
   
    $scope.MenuClick = function () {
         $('.megamenu-wrapper').removeClass('so-megamenu-active');
    }
    $scope.MenuClick1 = function () {
        if ($scope.menuLeft == false)
            $scope.menuLeft = true;
        else
            $scope.menuLeft = false;
    }
    $scope.MenuLeftClick = function () {
        $('.vertical-wrapper').removeClass('so-vertical-active');
    }

    $scope.SubCategoryClick = function (CategoryId) {

        $scope.MenuClick();
        var vCategoryId = CategoryId;
     
        $.session.set('CategoryId', vCategoryId);
        var vLocation = "#!HomePage";
        window.location = vLocation;
    }


    $scope.CheckOutClick = function () {
        
        var vCount = localStorage.getItem("Count");
        var vclientMemberId = $.session.get('clientMemberId');
        if (vCount != undefined && vCount != null && vCount != 0) {
            if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '' || vclientMemberId == 'undefined' || vclientMemberId == '0') {
                
                if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '' || vclientMemberId == 'undefined' || vclientMemberId == '0') {
                    addProductNotice('', '', '<h3>Please Sign In first and try again. ', 'Success');
                    $window.scrollTo(0, 0);
                    //$('#myModal').modal('show');
                    //angular.element(document.querySelector('#myModalmobSignIn')).addClass("displayMobMenu");
                  
                }
                else
                { window.location.href = "#!ShoppingCart"; }
            }
        else
                window.location.href = "#!ShoppingCart";
        }
        else {
            addProductNotice('Your cart is empty', '', '<h3>Please add atleast one product to continue. ', 'Success');
        }
    }
    
    var vCartItem = localStorage.getItem("CartItem");
    var vCount = localStorage.getItem("Count");
    var vAmount = localStorage.getItem("Amount");
    if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
        $rootScope.CartItems = JSON.parse(vCartItem);
    }
    else {
    }
    if (vCount != null) {
        $rootScope.Count = vCount;
    }
     else
        $rootScope.Count = 0;
    if (vAmount != null) {
        $rootScope.TotalAmount = vAmount;
    }
else
        $rootScope.TotalAmount = 0;
    $rootScope.$watch('CartItems', function () {
        console.log($rootScope.CartItems)
    });
    $rootScope.$watch('TotalAmount', function () {
        console.log($rootScope.TotalAmount)

    });

    $rootScope.$watch('cAmcurrent', function () {
        console.log($rootScope.cAmcurrent)

    });
    $rootScope.$watch('Count', function () {
        console.log($rootScope.Count)


    });
    $scope.RemoveFromCart = function (VarianceId) {
        debugger;
        var vCart = localStorage.getItem("CartItem");
        $scope.CartItem = JSON.parse(vCart);
        for (var i = $scope.CartItem.length - 1; i >= 0; i--){
            if ($scope.CartItem[i].VarianceId == VarianceId) {
                $scope.CartItem.splice(i, 1);
            }
        }
        localStorage.clear();
        vCartItem = null;
        vCart = null;
        vCartItem = vCart;
        localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
        var vCartItems = localStorage.getItem("CartItem");
        $rootScope.CartItems = JSON.parse(vCartItems);
        var vCount = 0;
        var vAmount = 0;
        angular.forEach($scope.CartItem, function (value) {
            vCount = vCount + Number(value.Qty || 0); vAmount = vAmount + (Number(value.Qty || 0) * Number(value.Price || 0));
        }); localStorage.setItem("Amount", vAmount);
        localStorage.setItem("Count", vCount);
        debugger;
        $rootScope.TotalAmount = vAmount;
        $rootScope.Count = vCount;
    }
     $scope.HeaderSearch=function(HeaderTxt){
           if($scope.HeaderSearchTxt==""||$scope.HeaderSearchTxt==undefined||$scope.HeaderSearchTxt==null){
           addProductNotice('Empty','','<h3>Please Enter the search text first.</h3>','Success');
           return false;
}
            $http({
             url: vUrl + "IndexPage/GetFreeSearchItems",
             method: 'GET',
             params: { strSearchText: HeaderTxt },
              headers: { "Content-Type": JSON }
            }).then(function (response) {
            var vSearchItems = response.data; 
            
             if (vSearchItems == "TimeOut")
             window.location.href="#!TimeOut";
         else{
            if(vSearchItems!=undefined&&vSearchItems!=null&&vSearchItems!=""){
             var vLink="#!SearchProduct/"+HeaderTxt+"/"+response.data["0"].CategoryId;
             $scope.HeaderSearchTxt='';
           window.location.href=vLink;
          }
else
addProductNotice('No Products','','<h3>No Products To Show For This Search.</h3>','Success');}
}).catch(function(response){

});
}
    $scope.FooterSearch = function (FooterTxt) {
        
        if ($scope.FooterSearchTxt == "" || $scope.FooterSearchTxt == undefined || $scope.FooterSearchTxt == null) {
            addProductNotice('Empty', '', '<h3>Please Enter the search text first.</h3>', 'Success'); return false;
        }
    $http({
        url: vUrl + "IndexPage/GetFreeSearchItems",
        method: 'GET',
        params: { strSearchText: FooterTxt },
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        var vSearchItems = response.data;
        if (vSearchItems != undefined && vSearchItems != null && vSearchItems != "") {
            var vLink = "#!SearchProduct/" + FooterTxt + "/" + response.data["0"].CategoryId;
            $scope.FooterSearchTxt = '';
            window.location.href = vLink;
        }
else
            addProductNotice('No Products', '', '<h3>No Products To Show For This Search.</h3>', 'Success');
    }).catch(function (response) { });
    }
    $scope.Save = function (value) {
        
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.showmsg = false;
        $scope.showmsgSignUp = false;
        if ($scope.member.MemberName == undefined || $scope.member.MemberName == null || $scope.member.MemberName == "") {
            $scope.msg = 'Please Enter the MemberName';
            $scope.showmsgErrorUp = true;
            return false;
        }
        if ($scope.member.ContactNo == undefined || $scope.member.ContactNo == null || $scope.member.ContactNo == "") {
            $scope.msg = 'Please Enter the valid ContactNo';
            $scope.showmsgErrorUp = true;
            return false;
        }
if($scope.member.EmailId==undefined||$scope.member.EmailId==null||$scope.member.EmailId==""){$scope.msg='Please Enter The valid EmailId';$scope.showmsgErrorUp=true;return false;}
if($scope.member.Password==undefined||$scope.member.Password==null||$scope.member.Password==""){$scope.msg='Please Enter the Password';$scope.showmsgErrorUp=true;return false;}
if($scope.member.ConfirmPassword==undefined||$scope.member.ConfirmPassword==null||$scope.member.ConfirmPassword==""){$scope.msg='Please Enter the ConfirmPassword';$scope.showmsgErrorUp=true;return false;}
        //var reg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        //if (reg.test(document.getElementById("ContactNo").value) == false) {
        //    $scope.msg = 'Please Enter the valid ContactNo';
        //    $scope.showmsgErrorUp = true;
        //    return false;
        //}
var reg=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;if(reg.test(document.getElementById("EmailId").value)==false){$scope.msg='EmailID is not valid';$scope.showmsgErrorUp=true;return false;}
var Password=document.getElementById('Password');if(Password.value.length>5){}
else{$scope.msg='Password Is contain Minimum 6 characters';$scope.showmsgErrorUp=true;return;}
var Password=document.getElementById("Password").value;var ConfirmPassword=document.getElementById("ConfirmPassword").value;if(Password!=ConfirmPassword){alert("Passwords do not match.");return false;}

        //if (value == "desktop") {
        //    document.getElementById('logSignUp').innerHTML = '';  var string1 = removeSpaces(document.getElementById('mainCaptchaSignUp').value); var string2 = removeSpaces(document.getElementById('txtInputSignUp').value); if (string1 != string2 || string2 == "") { $scope.CaptchaSignUp(); $scope.msg = 'Entered Invalid Captcha'; $scope.showmsgErrorUp = true; return false; }
        //}
        //else if (value == "mobile") {
        //    document.getElementById('logSignUpMob').innerHTML = '';  var string1 = removeSpaces(document.getElementById('mainCaptchaSignUpMob').value); var string2 = removeSpaces(document.getElementById('txtInputSignUpMob').value); if (string1 != string2 || string2 == "") { $scope.CaptchaSignUpMob(); $scope.msg = 'Entered Invalid Captcha'; $scope.showmsgErrorUp = true; return false; }
        //}
        if ($scope.member.EmailId != '') {
            var x = $scope.member.EmailId;
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                $scope.ShowErrorEmail = true;
                return;
            }
        }
           $scope.member.IsActive = 1;
          var member = $scope.member;
          
        $http({
            url: vUrl + "IndexPage/InsertMemberDetail",
            dataType: 'json', method: 'POST',
            data: member,
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            
            var vExist = response.data;
            if (vExist == "TimeOut")
             window.location.href = "#!TimeOut";
            else if (vExist == "Exist") {
            $scope.msg = "EmailId is already exist";
            $scope.showmsgErrorUp = true;
            $scope.showmsg = false;
              }
        else {
    $scope.msgStatus = 'Registered SuccessFully';
    $scope.showmsgSignUp = true;
    $scope.msg = "";
    $scope.showmsgErrorUp = false;
    $scope.member.MemberName = "";
    $scope.member.ContactNo = "";
    $scope.member.EmailId = "";
    $scope.member.Password = "";
    $scope.member.ConfirmPassword = "";
    //if (value == "desktop") {
    //    document.getElementById('logSignUp').innerHTML = '';
    //    var string1 = removeSpaces(document.getElementById('mainCaptchaSignUpMob').value);
    //    document.getElementById('txtInputSignUpMob').value = '';
    //}
    //else if (value == "mobile") {
    //    document.getElementById('logSignUpMob').innerHTML = '';
    //    document.getElementById('mainCaptchaSignUpMob').value = '';
    //    document.getElementById('txtInputSignUpMob').value = '';
    //}
    $timeout(function () {
         $('#myModal1').modal('hide')
    }, 2000); $timeout(function () {
        
        $('#myModalmobSignUp').modal('hide')
    }, 2000);
}
}).catch(function (response) { });
    }
    function PasswordValidate() {
        var password = document.getElementById("Password").value;
        var confirmPassword = document.getElementById("ConfirmPassword").value;
        if (password != confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    }
    function ConfirmationCodeValidate() {
        var hiddenConfirmationCode = document.getElementById("hiddenConfirmationCode").value;
        var ConfirmationCode = document.getElementById("ConfirmationCode").value;
        if (hiddenConfirmationCode != ConfirmationCode) {
            alert("ConfirmationCode do not match.");
            return false;
        }
        return true;
    }
    
    $scope.Get = function (value) {
        
        $scope.showmsgSignIn = false;
        $scope.msgStatusSignIn = "";
        $scope.msgStatussuccess = "";
        if ($scope.Login.EmailId == undefined || $scope.Login.EmailId == null || $scope.Login.EmailId == "")
        {
            $scope.msgSignIn = 'Please Enter The valid EmailId'; $scope.showmsgErrorIn = true; $scope.showmsgSignIn = false; return false;
        }
        if
        ($scope.Login.Password == undefined || $scope.Login.Password == null || $scope.Login.Password == "")
        {
        $scope.msgSignIn = 'Please Enter the valid Password';
        $scope.showmsgErrorIn = true;
        $scope.showmsgSignIn = false;
        return false;
        }
        
        //if (value == "desktop") {
        //    document.getElementById('log').innerHTML = '';
        //     var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
        //    var string2 = removeSpaces(document.getElementById('txtInput').value);
        //    if (string1 != string2 || string2 == "") {
        //        $scope.Captcha(); $scope.msgSignIn = 'Entered Invalid Captcha';
        //        $scope.showmsgErrorIn = true; return false;
        //    }
        //}
        //else if (value == "mobile") {
        //    document.getElementById('logMob').innerHTML = '';
        //    
        //    var string1 = removeSpaces(document.getElementById('mainCaptchaMob').value);
        //    var string2 = removeSpaces(document.getElementById('txtInputMob').value);
        //    if (string1 != string2 || string2 == "") {
        //        $scope.CaptchaMob(); $scope.msgSignIn = 'Entered Invalid Captcha';
        //        $scope.showmsgErrorIn = true;
        //        return false;
        //    }
        //}
        var vEmailId = $scope.Login.EmailId;
        var vPassword = $scope.Login.Password;
        $scope.showmsgSignIn = '';
        $scope.msg = '';
        $scope.showmsg = false;
    $http({
        url: vUrl + "IndexPage/GetMemberDetailsByEmailId", method: 'GET',
        params: { EmailId: vEmailId, Password: vPassword }, headers: { "Content-Type": JSON }
    }).then(function mySuccess(response) {
        var result = response.data; if (result == "TimeOut")
         window.location.href = "#!TimeOut"; else {
        if (response.data.length != 0) {
            $.session.set('clientMemberId', result["0"].MemberId);
            $.session.set('clientMemberName', result["0"].MemberName);
            $scope.MemberName = result["0"].MemberName;
            $scope.MemberId = result["0"].MemberId;
            $scope.ContactNo = result["0"].ContactNo;
            $scope.EmailId = result["0"].EmailId;
            $scope.msgStatusSignIn = "Logged in successfully";
            $scope.showmsgSignIn = true;
            $scope.showmsgErrorIn = false;
            $scope.showmsgUpdate = false;
            $scope.Login.EmailId = "";
            $scope.Login.Password = "";
            $scope.ShowSignIn = false;
            $scope.ShowSignUp = false;
           // $scope.ShowMemberName = true;
            $scope.ShowSignOut = true;
            $scope.ShowMemberProfile = true;
            $scope.ShowCaptcha = true;
            $scope.ShowClientOrder = true;
            //if (value == "desktop") {
            //    document.getElementById('log').innerHTML = '';
            //    var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
            //    document.getElementById('txtInput').value = '';
            //}
            //else if (value == "mobile") {
            //    document.getElementById('logMob').innerHTML = '';
            //    document.getElementById('mainCaptchaMob').value = '';
            //    document.getElementById('txtInputMob').value = '';
            //}
            $timeout(function () {
                
                $('#myModal').modal('hide');
            }, 900);
            $timeout(function () {
                
                $('#myModalmobSignIn').modal('hide');
            }, 900);
        }
        else {
            $scope.msgSignIn = "please enter the valid emailid and password";
            $scope.showmsgErrorIn = true;
            $scope.showmsgSignIn = false;
        }
}
}).catch(function (response) { })
};

    $scope.Signin = function () {
        $scope.Login.EmailId = "";
        $scope.Login.Password = "";
       // $('#myModal').modal('show');
        $scope.msgStatusSignIn = "";
        $scope.msgSignIn = "";
    }

    $scope.SignOut = function () {
        $scope.ShowSignIn = true;
        $scope.ShowSignUp = true;
        $scope.ShowMemberName = false;
        $scope.ShowSignOut = false;
        $scope.ShowMemberProfile = false;
        $scope.showmsgSignIn = false;
        $scope.showmsgSignUp = false;
        $scope.showPassword1 = true;
        $scope.ShowForgetPwdHeader = false;
        $scope.ShowSignInHeader = true;
        $scope.ShowSignInEmailId = true;
        $scope.Showforgetpwd = true;
        $scope.ShowResetpwd = false;
        $scope.Showsignin = true;
        $scope.Showreset = false;
        $scope.RegEmailId = false;
        $scope.ShowSendCode = true;
        $scope.Showreset = false;
        $scope.showmsgresetsuccess = false;
        $scope.ShowCaptcha = true;
        $scope.showmsgmailerror = false;
        $scope.showmsgErrorUpdate = false;
        $scope.msgStatusSignIn = "";
        $scope.msgStatussuccess = "";
        $scope.ShowmyModal = true;
        $scope.ShowClientOrder = false;
        $.session.set('clientMemberId', '');
        $.session.set('clientMemberName', '');
        var order = [];
        $scope.CartItem = order;
        localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
        var vCartItem = localStorage.getItem("CartItem");
        $rootScope.CartItems = JSON.parse(vCartItem);
        var vAmount = 0, vCount = 0;
        localStorage.setItem("Amount", vAmount);
        localStorage.setItem("Count", vCount);
        $rootScope.Count = vCount;
        $rootScope.TotalAmount = vAmount;
        window.location.href = "#!HomePage";       
    }
    $scope.ForgetPassword = function () {
        $scope.showRegEmailId = true;
        $scope.showPassword1 = false;
        $scope.ShowForgetPwdHeader = true;
        $scope.ShowSignInHeader = false;
        $scope.ShowSignInEmailId = false;
        $scope.Showforgetpwd = false;
        $scope.ShowResetpwd = false;
        $scope.Showsignin = false;
        $scope.ShowCaptcha = false;
    }
    $scope.Resetpwd = function () {
        $scope.showPasswordnew = true;
        $scope.showPasswordconfrm = true;
        $scope.showConfromationCode = true;
        $scope.Showsignin = false;
        $scope.Showreset = true;
        $scope.RegEmailId = true;
        $scope.ShowSendCode = false;
        $scope.ShowCaptcha = false;
        $scope.msgmailerror = '';
        $scope.msgStatussuccess = "";
    }
    $scope.ProfileEdit = function () {
        $scope.EmailId3 = true;
        var vEmailId = $scope.EmailId;
        var vMemberId = $scope.MemberId;
        $http({
            url: vUrl + "IndexPage/EditMemberProfile",
            method: 'GET',
            params: { MemberId: vMemberId },
            headers: { "Content-Type": JSON }
        }).then(function mySuccess(response) {
            var result = response.data; 
            var vMemberName = result["0"].MemberName;
            var vContactNo = result["0"].ContactNo;
            var vEmailId = result["0"].EmailId;
            var vAddressLine1 = result["0"].AddressLine1;
            var vAddressLine2 = result["0"].AddressLine2;
            var vCity = result["0"].City;
            var vState = result["0"].State;
            var vPinCode = result["0"].PinCode;
            $scope.Profile = result["0"].MemberId;
            $scope.Profile = {
                MemberName: vMemberName,
                ContactNo: vContactNo, EmailId: vEmailId,
                AddressLine1: vAddressLine1, AddressLine2:
                vAddressLine2, City: vCity,
                State: vState, PinCode: vPinCode
            }; 
        }).catch(function (response) {  });
    }
    $scope.UpdateProfile = function () {
        $scope.msgUpdate = "";
        $scope.showmsgErrorUpdate = '';
        $scope.showmsgUpdate = false;
        if ($scope.Profile.MemberName == undefined || $scope.Profile.MemberName == null || $scope.Profile.MemberName == "") {
            $scope.msgUpdate = 'Please Enter MemberName';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.ContactNo == undefined || $scope.Profile.ContactNo == null || $scope.Profile.ContactNo == "") {
            $scope.msgUpdate = 'Please Enter the valid ContactNo';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.AddressLine1 == undefined || $scope.Profile.AddressLine1 == null || $scope.Profile.AddressLine1 == "") {
            $scope.msgUpdate = 'Please Enter the AddressLine1';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.AddressLine2 == undefined || $scope.Profile.AddressLine2 == null || $scope.Profile.AddressLine2 == "") {
            $scope.msgUpdate = 'Please Enter The AddressLine2';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.City == undefined || $scope.Profile.City == null || $scope.Profile.City == "") {
            $scope.msgUpdate = 'Please Enter the City';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
    if ($scope.Profile.State == undefined || $scope.Profile.State == null || $scope.Profile.State == "") {
        $scope.msgUpdate = 'Please Enter The State';
        $scope.showmsgErrorUpdate = true;
        return false;
    }
    if ($scope.Profile.PinCode == undefined || $scope.Profile.PinCode == null || $scope.Profile.PinCode == "") {
        $scope.msgUpdate = 'Please Enter the PinCode';
        $scope.showmsgErrorUpdate = true;
        return false;
    }
   
    var clientMemberId = $.session.get('clientMemberId');
    var Profile = $scope.Profile;
    $http({
        url: vUrl + "IndexPage/UpdateMemberProfile",
        dataType: 'json',
        method: 'POST',
        data: Profile,
        params: { MemberId: clientMemberId },
        headers: { "Content-Type": "application/json" }
    }).then(function (Profile) {
        $scope.msgStatusUpdate = 'Your Profile Updated SuccessFully';
        $scope.showmsgUpdate = true;
        $scope.showmsgErrorUpdate = false;
        $scope.showmsgErrorEdit = '';
        $scope.showmsg = '';
        $timeout(function () {
            $('#myModal3').modal('hide')
        }, 900);
        $timeout(function () {
            $('#myModalmobMemberProfile').modal('hide')
        }, 900);
    }).catch(function (response) { });
    }
    $scope.Sendmail = function () {
        
        $scope.msgStatussuccess = "";
        $scope.msgmailerror = "";
        $scope.showmsgErrorIn = false;
       
        var Login = $scope.Login;
        var vEmail = $scope.Login.EmailId1;
        
        if ($scope.Login.EmailId1 != undefined && $scope.Login.EmailId1 != null && $scope.Login.EmailId1 != '') {
            var x = $scope.Login.EmailId1;
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                $scope.msgmailerror = "Your EmailId Is Not Registered ";
                $scope.ShowErrorEmail = true;
                return;
            }
            $http({
                url: vUrl + "IndexPage/ForgotPassword",
                dataType: 'json',
                method: 'POST',
                params: { EmailId: vEmail },
                headers: { "Content-Type": "application/json" }
            }).then(function (Response) {
                
                var vResult = Response.data;
                if (vResult == "success") {
                    
                    $scope.msgmailerror = "";
                    $scope.msgStatussuccess = "Conformation code Sent To Your Registered EmailId";
                    $scope.showmsgsuccess = true;
                    $scope.ShowResetpwd = true;
                    $scope.ShowSendCode = false;
                    $scope.RegEmailId = true;
                    $scope.Login.MemberName = "";
                    $scope.Login.ContactNo = "";
                    $scope.Login.EmailId = "";
                    $scope.ShowSuccess = true;
                }
                else if (vResult == "Not Registered") {
                    $scope.msgStatussuccess = "";
                    $scope.msgmailerror = "Your EmailId is Not Registered Please SignUp... "
                    $scope.showmsgmailerror = true;
                }
                else {
                    (vResult == "Error")
                    $scope.msgStatussuccess = "";
                    $scope.msgmailerror = "Your EmailId is Not Registered Please SignUp... "
                    $scope.showmsgmailerror = true;
                }
                }).catch(function (response) {
                    $scope.ShowError = true;
                });
        }
        else {
            $scope.msgmailerror = "Please Enter the mail id. "
            $scope.showmsgmailerror = true;
        }
    }
    $scope.Resetpassword = function () {     
        $scope.msgStatussuccess = '';
        $scope.msgmailerror = "";
        $scope.showmsgErrorIn = false;      
        var vEmailId = $scope.Login.EmailId1;
        var vConfirmationCode = $scope.Login.ConfirmationCode;
        $http({
            url: vUrl + "IndexPage/ConfirmationCode",
            method: 'GET',
            params: { EmailId: vEmailId, ConfirmationCode: vConfirmationCode },
            headers: { "Content-Type": JSON }
        }).then(function mySuccess(response) {
            var result = response.data;           
            var vEmailId = result["0"].EmailId;
            var vConfirmationCode = result["0"].ConfirmationCode;         
            var password = document.getElementById("Passwordnew").value;
            var confirmPassword = document.getElementById("Passwordconfrm").value;
            if (password != confirmPassword) {
                alert("Passwords do not match.");
                return false;
            }
            var ConfirmationCode = document.getElementById("ConfirmationCode").value;
            if (vConfirmationCode != ConfirmationCode) {
                alert("ConfirmationCode do not match.");
                return false;
            }            
            var Passwordnew = document.getElementById('Passwordnew');
            if (Passwordnew.value.length > 5) {
            }
            else {
                alert("Password Is contain Minimum 6 characters");
                return;
            }
            $http({
                url: vUrl + "IndexPage/ChangePassword",
                dataType: 'json',
                method: 'POST',
                params: { EmailId: vEmailId, ConfirmationCode: vConfirmationCode, Password: password },
                headers: { "Content-Type": "application/json" }
            }).then(function mySuccess(Response) {                
                var vresult = Response.data;
                if (vresult == "Success") {
                $scope.msgStatussuccess = "Your Password Reset Successfully"
                $scope.ShowForgetPwdHeader = false;
                $scope.ShowSignInHeader = true;
                $scope.ShowSignInEmailId = true;
                $scope.Showforgetpwd = true;
                $scope.ShowResetpwd = false;
                $scope.Showsignin = true;
                $scope.Showreset = false;
                $scope.showmsgresetsuccess = true;
                $scope.showPasswordconfrm = false;
                $scope.showPasswordnew = false;
                $scope.showConfromationCode = false;
                $scope.showRegEmailId = false;
                $scope.showPassword1 = true;
                $scope.ShowCaptcha = true;
                $scope.ConfirmationCode = '';             
                if (vConfirmationCode = ConfirmationCode) {
                    alert("Your Password Reset Successfully");
                    return false;
                }
                }
                else if (vresult == "Not Registered") {
                    $scope.msgmailerror = "Your EmailId Is Not Registered..Please Sign Up";
                    $scope.showmsgmailerror = true;
                }
                else {
                    (vresult == "Error")
                    $scope.msgmailerror = "Your EmailId Is Not Registered..Please Sign Up";
                    $scope.showmsgmailerror = true; return false;
                }
                });
            }).catch(function (response) {
                
            });
    }
    $('#Password1').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#Passwordnew').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#Passwordconfrm').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#Password').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#ConfirmPassword').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#mainCaptchaSignUpMob').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#txtInputSignUpMob').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#mainCaptchaMob').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#txtInputMob').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#mainCaptcha').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#txtInput').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#mainCaptchaSignUp').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#txtInputSignUp').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $scope.Captcha = function () {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
        var i;
        for (i = 0; i < 6; i++){
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptcha").value = code
        var colors = ["#B40404", "#beb1dd", "#b200ff", "#faff00", "#0000FF", "#FE2E9A", "#FF0080", "#2EFE2E",];
        var rand = Math.floor(Math.random() * colors.length);
        $('#mainCaptcha').css("background-color", colors[rand]);
    }
    $scope.CaptchaSignUp = function () {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
        var i; for (i = 0; i < 6; i++){ var a = alpha[Math.floor(Math.random() * alpha.length)]; var b = alpha[Math.floor(Math.random() * alpha.length)]; var c = alpha[Math.floor(Math.random() * alpha.length)]; var d = alpha[Math.floor(Math.random() * alpha.length)]; var e = alpha[Math.floor(Math.random() * alpha.length)]; var f = alpha[Math.floor(Math.random() * alpha.length)]; var g = alpha[Math.floor(Math.random() * alpha.length)]; }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptchaSignUp").value = code
        var colors = ["#B40404", "#beb1dd", "#b200ff", "#faff00", "#0000FF", "#FE2E9A", "#FF0080", "#2EFE2E",];
        var rand = Math.floor(Math.random() * colors.length);
        $('#mainCaptchaSignUp').css("background-color", colors[rand]);
    }
    $scope.CaptchaMob = function () {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
        var i;
        for (i = 0; i < 6; i++){
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptchaMob").value = code
        var colors = ["#B40404", "#beb1dd", "#b200ff", "#faff00", "#0000FF", "#FE2E9A", "#FF0080", "#2EFE2E",];
        var rand = Math.floor(Math.random() * colors.length);
        $('#mainCaptchaMob').css("background-color", colors[rand]);
    }
    $scope.CaptchaSignUpMob = function () {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
        var i;
        for (i = 0; i < 6; i++){
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptchaSignUpMob").value = code
        var colors = ["#B40404", "#beb1dd", "#b200ff", "#faff00", "#0000FF", "#FE2E9A", "#FF0080", "#2EFE2E",];
        var rand = Math.floor(Math.random() * colors.length);
        $('#mainCaptchaSignUpMob').css("background-color", colors[rand]);
    }
    var removeSpaces = function (string) {
        return string.split(' ').join('');
    }
});