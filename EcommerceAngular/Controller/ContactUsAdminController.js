
'use strict';
ScBusinez.controller('ContactUsAdminController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
   // var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);

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
        $scope.AdminVariance = true;
        $scope.MenuSalesOrders = true;
        $scope.MenuDelConfirm = true;
        $scope.MenuCategory = true;
        $scope.MenuSubCat = true;
        $scope.MenuAdd = true;
        $scope.MenuDiscount = true;
        $scope.MenuSettings = true;
        $scope.MenuSales = true;
        $scope.MenuAnalytics = true;
    }


    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    

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
   // vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
   // vSettingsmenuShow.style.display = 'none';
    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
   // vSettingsmenuShow1.style.display = 'none';

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
   // vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
   // vMenuSalMobile.style.display = 'none';

    var vmenuDisShow1 = document.getElementById("menuDisShow1");
   // vmenuDisShow1.style.display = 'none';

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

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';
    //End//////////////////////////////////
    //End//////////////////////////////////
    var showLeftPush = document.getElementById('showLeftPush');
    var menus1 = document.getElementById('cbp-spmenu-s1');
    $scope.spmenus1 = true;
    $scope.LeftMenuClick = function () {
       // 
        //classie.toggle(this, 'active');
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        //disableOther('showLeftPush');

        //classie.toggle(showLeftPush, 'disabled');
        $scope.spmenus1 = false;
    }

   
   

     //Get Theme detail Dropdown //

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.ShowError = true;
    $scope.cont = true;
    $scope.msg = "";
    $scope.msgStatus = "";
   // 
   

        $http({
            url: vUrl + "ContactUsAdmin/GetThemeDetail",
            method: 'GET',
            params: { CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {

            $scope.ThemeDetail = response.data;

        }).catch(function (response) {
        });
    

    $scope.getContact = function (themeid) {
        

        $http({
            method: "GET",
            url: vUrl + "ContactUsAdmin/GetThemeId"
            , params: { themeId: themeid, CompanyDetailId: vCompanyId}
            , headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            debugger
            
            $scope.resultOPImage = response.data;
            
        }).then(function myError(response) {
        });
    };

    $scope.onTextBoxKeyPress = function (event) {
       

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    //Insert Contact details and save it in database//

    $scope.Save = function () {
        


        $scope.msg = "";
        $scope.msgStatus = "";
        if ($scope.Contact.Address == "" || $scope.Contact.Address == undefined || $scope.Contact.Address == null) {
            $scope.msg = ContactUsAdminMessages(1);//'Please Select the Address';
            return false;
        }
        if ($scope.Contact.Address1 == "" || $scope.Contact.Address1 == undefined || $scope.Contact.Address1 == null) {
            $scope.msg = ContactUsAdminMessages(2); //'Please Select the Address1';
            return false;
        }

        //if ($scope.Contact.EmailId == "" || $scope.Contact.EmailId == undefined || $scope.Contact.EmailId == null) {
        //    $scope.msg = ContactUsAdminMessages(3);//'Please Enter the EmailId';
        //    return false;
        //}
        if ($scope.Contact.ContactNo == "" || $scope.Contact.ContactNo == undefined || $scope.Contact.ContactNo == null) {
            $scope.msg = ContactUsAdminMessages(4);//'Please Enter the ContactNo';
            return false;
        }
        //if ($scope.Contact.Description == "" || $scope.Contact.Description == undefined || $scope.Contact.Description  == null) {
        //    $scope.msg = ContactUsAdminMessages(5);//' Description';
        //    return false;
        //}
       


        var Contact = $scope.Contact;

     
        //Email validation.
       // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      //  
        //if (reg.test(document.getElementById("EmailId").value) == false) {
        //    $scope.msg = ContactUsAdminMessages(6); //"EmailId is not valid";
        //   // $scope.showmsgErrorUp = true;
        //    return false;
        //}
        //Contact Number Validation
        
        var reg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        //
        //if (reg.test(document.getElementById("ContactNo").value) == false) {
        //    $scope.msg = ContactUsAdminMessages(7); //"Please Enter the valid ContactNo";
        //    //$scope.showmsgErrorUp = true;
        //    return false;
        //}


        //
        $http({
            url: vUrl + "ContactUsAdmin/InsertContact",
            method: 'POST',
            params: { CompanyDetailId: vCompanyId},
            data: Contact,
            headers: {
                "Content-Type": "application/json"
            }

        }).then(function (response) {
            
            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = ContactUsAdminMessages(8); //"Contact is already exist";
            }
            else {
                $scope.cont = true;
                $scope.getdetail();
                $scope.msgStatus = ContactUsAdminMessages(9); //"Added Contact Successfully"
                $scope.Contact.ThemeId = "";
                $scope.Contact.Address = "";
                $scope.Contact.Address1 = "";

                $scope.Contact.EmailId = "";
                $scope.Contact.ContactNo = "";
                $scope.Contact.Description = "";
               

                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
            }
        }).catch(function (response) {

        });
    }



    //Update function//
    $scope.Update = function () {
        

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msg = "";
        $scope.msgStatus = "";
        if ($scope.Contact.Address == "" || $scope.Contact.Address == undefined || $scope.Contact.Address == null) {
            $scope.msg = ContactUsAdminMessages(1); //'Please Select the Address';
            return false;
        }
        if ($scope.Contact.Address1 == "" || $scope.Contact.Address1 == undefined || $scope.Contact.Address1 == null) {
            $scope.msg = ContactUsAdminMessages(2);//'Please Select the Address1';
            return false;
        }
        //if ($scope.Contact.EmailId == "" || $scope.Contact.EmailId == undefined || $scope.Contact.EmailId == null) {
        //    $scope.msg = ContactUsAdminMessages(3); //'Please Enter the EmailId';
        //    return false;
        //}
        if ($scope.Contact.ContactNo == "" || $scope.Contact.ContactNo == undefined || $scope.Contact.ContactNo == null) {
            $scope.msg = ContactUsAdminMessages(4); //'Please Enter the ContactNo';
            return false;
        }
        
        //if ($scope.Contact.Description == "" || $scope.Contact.Description == undefined || $scope.Contact.Description == null) {
        //    $scope.msg = ContactUsAdminMessages(5);//'Description';
        //    return false;
        //}
        //Contact Number Validation

       // var reg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
       //// 
       // if (reg.test(document.getElementById("ContactNo").value) == false) {
       //     $scope.msg = ContactUsAdminMessages(7); //"Please Enter the valid ContactNo";
       //     //$scope.showmsgErrorUp = true;
       //     return false;
       // }
       
      //  //Email validation.
      //  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      ////  
      //  if (reg.test(document.getElementById("EmailId").value) == false) {
      //      $scope.msg = ContactUsAdminMessages(6); //"EmailId is not valid";
      //      // $scope.showmsgErrorUp = true;
      //      return false;
      //  }
        var vContactId = $scope.Contact.hiddenContactUsAdminId;
        
        var Contact = $scope.Contact;
       

        $scope.msg = "";
        $scope.msgStatus = "";

        $http({
            url: vUrl + "ContactUsAdmin/UpdateContact",
            dataType: 'json',
            method: 'POST',
            data: Contact,
            params: { ContactUsAdminId: vContactId, CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            
            $scope.getdetail();
            $scope.msgStatus = ContactUsAdminMessages(10);//"Updated Contact Successfully";
            $scope.cont = true;
            $scope.Show = false;

            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            
           
            $scope.Contact.Address = "";
            $scope.Contact.Address1 = "";

            $scope.Contact.ContactNo = "";
            $scope.Contact.EmailId = "";
            $scope.Contact.Description = "";

            $scope.Contact.ThemeId = "";
        }).catch(function (response) {

        });
    }
    //get method//
    $scope.getdetail = function () {

        $http({
            url: vUrl + "ContactUsAdmin/GetContactDetail",
            method: 'GET',

            params: { CompanyDetailId: vCompanyId},
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {

            var result = response.data;
            var vThemeId = result["0"].ThemeId;
           
            var vContactNo = result["0"].ContactNo;
            var vEmailId = result["0"].EmailId;

            var vAddress = result["0"].Address;
            var vAddress1 = result["0"].Address1;
            var vContactUsAdminId = result["0"].ContactUsAdminId;
            var vDescription = result["0"].Description;
            var vCompanyDetailId = result["0"].CompanyDetailId; 
            var vIframe = result["0"].Iframe;
            $scope.Contact = response.data 
            $scope.getContact(vThemeId);
           
            
            //   
            $scope.Contact = { ThemeId: vThemeId, ContactNo: vContactNo, EmailId: vEmailId, Address: vAddress, Address1: vAddress1, Description: vDescription, hiddenContactUsAdminId: vContactUsAdminId, CompanyDetailId: vCompanyDetailId, Iframe: vIframe}
            if (response.data.length != 0) {
                $scope.ShowSave = false;
                $scope.ShowUpdate = true;
            }



        }).catch(function (response) {

        });
    }

    $scope.getdetail(vCompanyId);
    
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
   
    

});








