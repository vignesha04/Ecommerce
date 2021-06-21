'use strict';

ScBusinez.controller('PaymentTypeController', function ($scope, $http, $timeout, $window) {
    
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    

    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

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

 
    //-------------  Mobile Toggle Switch   -----------//

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

    $scope.ShowUpdate = false;
    $scope.ShowSave = false;
    $scope.Showmsg = false;
    $scope.showmsgStatus = false;
    //-------------  Mobile Toggle Switch Ends  -----------//

    //ddl change
    $scope.getPaymentDetails = function () {
       
        $scope.ShowSave = false;
        var vPaymentTypeId = $scope.paytype.PaymentTypeId;
        
        $http({
            url: vUrl + "PaymentType/GetPaymentdetails",
            method: 'GET',
            params: { PaymentTypeId: vPaymentTypeId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (Response) {
            
            $scope.PaymentTypeId = Response.data["0"].PaymentTypeId;
            $scope.PayType = Response.data["0"].PayType;
            $scope.Field1 = Response.data["0"].Field1;
            $scope.Field2 = Response.data["0"].Field2;
            $scope.Field3 = Response.data["0"].Field3;
            $scope.Field4 = Response.data["0"].Field4;
            $scope.Field5 = Response.data["0"].Field5;
          
            if ($scope.Field1 && $scope.value1 != "") {
                $scope.Showtxt1 = true;
            }
            if ($scope.Field2 && $scope.value2 != "") {
                $scope.Showtxt2 = true;
            }
            if ($scope.Field3 && $scope.value3 != "") {
                $scope.Showtxt3 = true;
            }
            if ($scope.Field4 && $scope.value4 != "") {
                $scope.Showtxt4 = true;
            }
            if ($scope.Field5 && $scope.value5 != "") {
                $scope.Showtxt5 = true;
            }
            $scope.Edit();
            }).catch(function (response) {
                
            });
 
    }

  
    //Display the date from db
    $http({
        url: vUrl + "PaymentType/GetPaymentTypes",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (Response) {
        
        $scope.paymenttype = Response.data;

        $scope.PaymentTypeId = Response.data["0"].PaymentTypeId;
        $scope.getPaymentDetails();

        
    }).catch(function (response) {
        
    });


    //insert to db
    $scope.Save = function () {
        
        $scope.msg = "";
        $scope.msgStatus = "";
        $scope.ShowSave = true;
        $scope.Showclear = true;
        $scope.ShowUpdate = false;
     
        if ($scope.paytype.PaymentTypeId == "" || $scope.paytype.PaymentTypeId == undefined || $scope.paytype.PaymentTypeId == null) {
            $scope.msg = 'Please select the Payment Type';
        }
              
        var paytype = $scope.paytype;
        
        $http({
            url: vUrl + "PaymentType/InsertPaymentdetails",
            dataType: 'json',
            method: 'POST',
            params:{ CompanyId: vCompanyId},
            data: paytype,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            

            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = "This payment type is already exists";
            }
            else {
               
                $scope.msgStatus = "Payment Type Added successfully";
                //  $scope.getPaymentDetails();
                $scope.Showmsg = true;
                $scope.paytype.value1 = "";
                $scope.paytype.value2 = "";
                $scope.paytype.value3 = "";
                $scope.paytype.value4 = "";
                $scope.paytype.value5 = "";
              
            }
        }).catch(function (response) {
        });
    }



    //clear 
    $scope.Clear = function () {
        
        $scope.getPaymentDetails();
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.paytype.PaymentTypeId = "";
        $scope.paytype.Value1 = "";
        $scope.paytype.Value2 = "";
        $scope.paytype.Value3 = "";
        $scope.paytype.Value4 = "";
        $scope.paytype.Value5 = "";
        $scope.paytype.Field1 = "";
        $scope.paytype.Field2 = "";
        $scope.paytype.Field3 = "";
        $scope.paytype.Field4 = "";
        $scope.paytype.Field5 = "";
        $scope.Showtxt1 = false;
        $scope.Showtxt2 = false;
        $scope.Showtxt3 = false;
        $scope.Showtxt4 = false;
        $scope.Showtxt5 = false;

    }

    //edit 
    $scope.Edit = function () {
        
        $scope.ShowUpdate = true;
        $scope.ShowSave = false;
       
        var vPaymentTypeId = $scope.paytype.PaymentTypeId;
       // var vPayType = $scope.paytype;
        $http({
            url: vUrl + "PaymentType/GetPaymentGetways",
            method: 'GET',
            params: { PaymentTypeId: vPaymentTypeId},
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            var result = response.data;
            var vPayType = result["0"].PayType;
            var vPaymentTypeId = result["0"].PaymentTypeId;
            var vValue1 = result["0"].Value1;
            var vValue2 = result["0"].Value2;
            var vValue3 = result["0"].Value3;
            var vValue4 = result["0"].Value4;
            var vValue5 = result["0"].Value5;
           
            

            $scope.paytype = { PayType: vPayType, PaymentTypeId: vPaymentTypeId, Value1: vValue1, Value2: vValue2, Value3: vValue3, Value4: vValue4, Value5: vValue5 };

                      
        }).catch(function (response) {
            
        }); 
    }  


    $scope.UpdatePaymentType = function () {
        
        var vPaymentGetwayId = $scope.paytype.PaymentTypeId;
        $scope.Showclear = false;
        $scope.ShowUpdate = true;
        var paytype = $scope.paytype;

        $http({
            url: vUrl + "PaymentType/UpdatePaymentGetway",
            dataType: 'json',
            method: 'POST',
            data: paytype,
            params: { PaymentGetwayId: vPaymentGetwayId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            
            $scope.getPaymentDetails();
            $scope.msgStatus = "Payment Type updated successfully";
            $scope.showmsgStatus = true;

        });
    }
});


   
   

