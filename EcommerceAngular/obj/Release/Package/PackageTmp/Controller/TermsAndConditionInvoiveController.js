'use strict';

ScBusinez.controller('TermsAndConditionInvoiveController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

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

    // 
    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

    //For Hide and Show Button
    $scope.showSave = true;
    $scope.showUpdate = false;

    //Empty Status and error messages
    $scope.msgError = '';
    $scope.msgStatus = '';



    //For Mobile meu display and block
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

    $scope.BindData = function () {
        
        method: "GET",

            $http({
            url: vUrl + "TermsAndConditionInvoive/GetTermsInvoive",
            params: { CompanyId: vCompanyId },
                headers: {
                    'Content-Type': JSON
                }

            }).then(function (response) {
                
                //$scope.TAC = response.data;
                var TACS = response.data;
                if (response.data.length != 0) {
                    $scope.showSave = false;
                    $scope.showUpdate = true;
                }
                var vInvoiveTermsAndConditionId = TACS["0"].InvoiveTermsAndConditionId;

                  
                //if (i == 0) {
                //    var vQuestion1 = result[i].Question;
                //    var vAnswer1 = result[i].Answer;
                //    $scope.FaqData.Question1 = vQuestion1;
                //    $scope.FaqData.Answer1 = vAnswer1;
                //}
                //var TAC = response.data;
                var vName1 = "", vName2 = "", vName3 = "", vName4 = "", vName5 = "", vName6 = "", vName7 = "", vName8 = "", vName9 = "", vName10 = "";
                for (var i = 0; i < response.data.length; i++) {
                    if (i == 0) {
                        vName1 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 1) {
                        vName2 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 2) {
                        vName3 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 3) {
                        vName4 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 4) {
                        vName5 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 5) {
                        vName6 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 6) {
                        vName7 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 7) {
                        vName8 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 8) {
                        vName9 = TACS[i].InvoiceTermsAndCondition;
                    }
                    else if (i == 9) {
                        vName10 = TACS[i].InvoiceTermsAndCondition;
                    }
                }

                $scope.TACI = {
                    Name1: vName1,
                    Name2: vName2,
                    Name3: vName3,
                    Name4: vName4,
                    Name5: vName5,
                    Name6: vName6,
                    Name7: vName7,
                    Name8: vName8,
                    Name9: vName9,
                    Name10: vName10
                };
                
                $scope.TACI.hiddenInvoiveTermsAndConditionId = vInvoiveTermsAndConditionId;
            }).catch(function (response) {
                // 
            });
    }
    $scope.BindData();

    $scope.onTextBoxKeyPress = function (event) {
        

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            //alert("Single quote and Double Quote are not allowed");
            //$scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    $scope.Save = function () {
         

        var vTerms = "";

        if ($scope.TACI.Name1 != "" && $scope.TACI.Name1 != undefined && $scope.TACI.Name1 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name1;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name1;
        }
        if ($scope.TACI.Name2 != "" && $scope.TACI.Name2 != undefined && $scope.TACI.Name2 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name2;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name2;
        }
        if ($scope.TACI.Name3 != "" && $scope.TACI.Name3 != undefined && $scope.TACI.Name3 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name3;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name3;
        }
        if ($scope.TACI.Name4 != "" && $scope.TACI.Name4 != undefined && $scope.TACI.Name4 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name4;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name4;
        }
        if ($scope.TACI.Name5 != "" && $scope.TACI.Name5 != undefined && $scope.TACI.Name5 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name5;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name5;
        }
        if ($scope.TACI.Name6 != "" && $scope.TACI.Name6 != undefined && $scope.TACI.Name6 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name6;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name6;
        }
        if ($scope.TACI.Name7 != "" && $scope.TACI.Name7 != undefined && $scope.TACI.Name7 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name7;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name7;
        }
        if ($scope.TACI.Name8 != "" && $scope.TACI.Name8 != undefined && $scope.TACI.Name8 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name8;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name8;
        }
        if ($scope.TACI.Name9 != "" && $scope.TACI.Name9 != undefined && $scope.TACI.Name9 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name9;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name9;
        }
        if ($scope.TACI.Name10 != "" && $scope.TACI.Name10 != undefined && $scope.TACI.Name10 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name10;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name10;
        }

        var Data = $scope.TACI;
        if (vTerms != "") {
            $http({
                url: vUrl + "TermsAndConditionInvoive/InsertTermsInvoive",
                dataType: 'json',
                params: { CompanyId: vCompanyId },
                method: 'POST',
                data: Data,
                headers: {
                    "Content-Type": "application/json"
                }


            }).then(function (response) {
                  
                $scope.Data = response.data;
                $scope.msgStatus = TermsandConditionInvoiceMessages(1);//"Terms & Condition Saved Successully";
                // $scope.BindGrid();
                $scope.TACI.Name1 = "";
                $scope.TACI.Name2 = "";
                $scope.TACI.Name3 = "";
                $scope.TACI.Name4 = "";
                $scope.TACI.Name5 = "";
                $scope.TACI.Name6 = "";
                $scope.TACI.Name7 = "";
                $scope.TACI.Name8 = "";
                $scope.TACI.Name9 = "";
                $scope.TACI.Name10 = "";

                $scope.BindData();

            }).catch(function (response) {
                //  
            });
           
        }


    }

    $scope.Update = function () {
        
        var vTerms = "";

        if ($scope.TACI.Name1 != "" && $scope.TACI.Name1 != undefined && $scope.TACI.Name1 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name1;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name1;
        }
        if ($scope.TACI.Name2 != "" && $scope.TACI.Name2 != undefined && $scope.TACI.Name2 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name2;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name02;
        }
        if ($scope.TACI.Name3 != "" && $scope.TACI.Name3 != undefined && $scope.TACI.Name3 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name3;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name3;
        }
        if ($scope.TACI.Name4 != "" && $scope.TACI.Name4 != undefined && $scope.TACI.Name4 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name4;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name4;
        }
        if ($scope.TACI.Name5 != "" && $scope.TACI.Name5 != undefined && $scope.TACI.Name5 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name5;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name5;
        }
        if ($scope.TACI.Name6 != "" && $scope.TACI.Name6 != undefined && $scope.TACI.Name6 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name6;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name6;
        }
        if ($scope.TACI.Name7 != "" && $scope.TACI.Name7 != undefined && $scope.TACI.Name7 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name7;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name7;
        }
        if ($scope.TACI.Name8 != "" && $scope.TACI.Name8 != undefined && $scope.TACI.Name8 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name8;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name8;
        }
        if ($scope.TACI.Name9 != "" && $scope.TACI.Name9 != undefined && $scope.TACI.Name9 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name9;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name9;
        }
        if ($scope.TACI.Name10 != "" && $scope.TACI.Name10 != undefined && $scope.TACI.Name10 != null) {
            if (vTerms == "") {
                vTerms = $scope.TACI.Name10;
            }
            else
                vTerms = vTerms + "|" + $scope.TACI.Name10;
        }
        //var vTermsAndConditionId = $scope.TermsAndCondition.HiddenTermsAndConditionId;
        var Data = $scope.TACI;
        //var vTAC = $scope.TAC.hiddenTermsAndConditionId;

        if (vTerms != "") {
            $http({
                url: vUrl + "TermsAndConditionInvoive/UpdateTermsInvoive",
                dataType: 'json',
                params: { CompanyId: vCompanyId },
                method: 'POST',
                data: Data,
                headers: {
                    "Content-Type": "application/json"
                }

            }).then(function (data) {
                
                //$scope.Data = response.data;

                $scope.msgStatus = TermsandConditionInvoiceMessages(2);//"Terms & Condition Updated Successully";
                $scope.TACI.Name1 = "";
                $scope.TACI.Name2 = "";
                $scope.TACI.Name3 = "";
                $scope.TACI.Name4 = "";
                $scope.TACI.Name5 = "";
                $scope.TACI.Name6 = "";
                $scope.TACI.Name7 = "";
                $scope.TACI.Name8 = "";
                $scope.TACI.Name9 = "";
                $scope.TACI.Name10 = "";
                $scope.BindData();
                $scope.showSave = false;
                $scope.showUpdate = true;

            }).catch(function (response) {
                // 
            })
        }
    }
});