'use strict'; Ecom.controller('ContactUsController', function ($scope, $http, $window,$sce) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $scope.msg = "";

 $window.scrollTo(0, 0); $scope.Storedetail = function () {
 $http({ url: vUrl + "ContactUs/GetContactUsAdminId",
 method: 'GET',
 headers: { "Content-Type": JSON }
 }).then(function (response) {
     
     $scope.Details = response.data;
     var vIframe = response.data["0"].Iframe;
     $scope.embedUrl = $sce.trustAsResourceUrl(vIframe);
}).catch(function (response) { 

 });
 }
$scope.Storedetail();
$scope.aHomeClick=function(){
var vclientMemberId=$.session.get('clientMemberId');
if(vclientMemberId!=null&&vclientMemberId!=''&&vclientMemberId!=undefined){
var vLocation="#!HomePage/"+vclientMemberId;
window.location.href=vLocation;
}
else{
var vLocation="#!HomePage/0";
window.location.href=vLocation;
}
}

$http({
        url: vUrl + "Admin/GetCompanydetails",
        method: 'GET', headers: { "Content-Type": JSON }
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
$scope.vAddress1 = vAddress1;
 $scope.vAddressLine2 = vAddressLine2;
 $scope.vCity = vCity;
 $scope.vState = vState; 
$scope.vCountry = vCountry; 
$scope.vPinCode = vPinCode;
$scope.CompanyName = vCompanyName;
    }).catch(function (response) {
 });



    $scope.Sendmail = function () {
        
        $("#Contact").attr("disabled", true);
        $scope.msgStatus = ''; $scope.msg = "";
        if ($scope.Name == "" || $scope.Name == undefined || $scope.Name == null) {
            $scope.msg = 'Please Enter Your Name';
            $("#Contact").attr("disabled", false);

            return false;
        }
        if ($scope.Email == "" || $scope.Email == undefined || $scope.Email == null) {
            $scope.msg = 'Please Enter The EmailId';
            $("#Contact").attr("disabled", false);
           return false;
        }
        if ($scope.ContactNo == "" || $scope.ContactNo == undefined || $scope.ContactNo == null) {
            $scope.msg = 'Please Enter The  Mobile No ';
            $("#Contact").attr("disabled", false);
            return false;
        }
        if ($scope.Message == "" || $scope.Message == undefined || $scope.Message == null) {
            $scope.msg = 'Please Enter You Enquiry & Message';
            $("#Contact").attr("disabled", false);
           return false;
        }
        document.getElementById('logcontact').innerHTML = '';
         var string1 = removeSpaces(document.getElementById('mainCaptchacontact').value);
        var string2 = removeSpaces(document.getElementById('txtInputcontact').value);
        if (string1 != string2 || string2 == "") {
            $scope.Captchacontact();
            $scope.msg = 'Entered Invalid Captcha';
            $("#Contact").attr("disabled", false);
           return false;
        }
        //var reg = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        //if (reg.test(document.getElementById("Email").value) == false) {
        //    $scope.msg = 'Please Enter The Valid MobileNo ';
        //    $("#Contact").attr("disabled", false);
        //  return false;
        //}
        var ContactUs = $scope.ContactUs; 
        
        
        var vEmail = $scope.Email; var vName = $scope.Name; var vMessage = $scope.Message; var vContactNo = $scope.ContactNo;
        $http({
            url: vUrl + "ContactUs/sendmail", dataType: 'json', method: 'POST',
            params: { Email: vEmail, Name: vName, Message: vMessage, ContactNo: vContactNo }, headers: { "Content-Type": "application/json" }
        }).then(function (Response) {
            

            $scope.msgStatus = "Message Sent Succeesfully";
            $("#Contact").attr("disabled", false);
            $scope.Name = "";
            $scope.Email = "";
            $scope.Message = "";
            $scope.ContactNo = '';
            document.getElementById('logcontact').innerHTML = '';
            document.getElementById('txtInputcontact').value = '';
            }).catch(function (response) { });
}


    $scope.Captchacontact = function () {
         var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
        var i; for (i = 0; i < 6; i++){
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptchacontact").value = code
        var colors = ["#B40404", "#beb1dd", "#b200ff", "#faff00", "#0000FF", "#FE2E9A", "#FF0080", "#2EFE2E",];
        var rand = Math.floor(Math.random() * colors.length);
        $('#mainCaptchacontact').css("background-color", colors[rand]);
    }
    var removeSpaces = function (string) {
        return string.split(' ').join('');
    }
    $scope.Captchacontact();
});