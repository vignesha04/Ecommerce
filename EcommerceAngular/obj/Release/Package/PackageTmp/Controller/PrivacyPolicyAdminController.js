'use strict';

ScBusinez.controller('PrivacyPolicyAdminController', function ($scope, $http, $window) {
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
   
   
  
    //For Hide and Show Button
    $scope.showSave = true;
    $scope.showUpdate = false;

    //Empty Status and error messages
    $scope.msgError = '';
    $scope.msgStatus = '';




    $scope.BindDataFromDB = function () {
        
      

            $http({
                url: vUrl + "Privacypolicy/GetPrivacypolicy",
                method: "GET",
            params: { CompanyDetailId: vCompanyId },
                headers: {
                    'Content-Type': JSON
                }

            }).then(function mysuccess(response) {
                
                //$scope.TAC = response.data;
                var TACS = response.data;
                if (response.data.length != 0) {
                    $scope.showSave = false;
                    $scope.showUpdate = true;
                }
                var vPrivacyPolicyId = TACS["0"].PrivacyPolicyId;

                var vName01 = "", vName02 = "", vName03 = "", vName04 = "", vName05 = "", vName06 = "", vName07 = "", vName08 = "", vName09 = "", vName10 = "";
                for (var i = 0; i < response.data.length; i++) {
                    if (i == 0) {
                        vName01 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 1) {
                        vName02 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 2) {
                        vName03 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 3) {
                        vName04 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 4) {
                        vName05 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 5) {
                        vName06 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 6) {
                        vName07 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 7) {
                        vName08 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 8) {
                        vName09 = TACS[i].PrivacyPolicies;
                    }
                    else if (i == 9) {
                        vName10 = TACS[i].PrivacyPolicies;
                    }
                }

                $scope.TAC = {
                    Name01: vName01,
                    Name02: vName02,
                    Name03: vName03,
                    Name04: vName04,
                    Name05: vName05,
                    Name06: vName06,
                    Name07: vName07,
                    Name08: vName08,
                    Name09: vName09,
                    Name10: vName10
                };
                $scope.TAC.hiddenTermsAndConditionId = vPrivacyPolicyId;
            }).catch(function (response) {
                // 
            });
    }
    $scope.BindDataFromDB();

    $scope.onTextBoxKeyPress = function (event) {
        

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            alert("Single quote and Double Quote are not allowed");
            //$scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    $scope.Save = function () {
        // 

        var vTerms = "";

        if ($scope.TAC.Name01 != "" && $scope.TAC.Name01 != undefined && $scope.TAC.Name01 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name01;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name01;
        }
        if ($scope.TAC.Name02 != "" && $scope.TAC.Name02 != undefined && $scope.TAC.Name02 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name02;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name02;
        }
        if ($scope.TAC.Name03 != "" && $scope.TAC.Name03 != undefined && $scope.TAC.Name03 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name03;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name03;
        }
        if ($scope.TAC.Name04 != "" && $scope.TAC.Name04 != undefined && $scope.TAC.Name04 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name04;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name04;
        }
        if ($scope.TAC.Name05 != "" && $scope.TAC.Name05 != undefined && $scope.TAC.Name05 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name05;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name05;
        }
        if ($scope.TAC.Name06 != "" && $scope.TAC.Name06 != undefined && $scope.TAC.Name06 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name06;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name06;
        }
        if ($scope.TAC.Name07 != "" && $scope.TAC.Name07 != undefined && $scope.TAC.Name07 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name07;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name07;
        }
        if ($scope.TAC.Name08 != "" && $scope.TAC.Name08 != undefined && $scope.TAC.Name08 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name08;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name08;
        }
        if ($scope.TAC.Name09 != "" && $scope.TAC.Name09 != undefined && $scope.TAC.Name09 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name09;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name9;
        }
        if ($scope.TAC.Name10 != "" && $scope.TAC.Name10 != undefined && $scope.TAC.Name10 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name10;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name10;
        }

        var Data = $scope.TAC;
        if (vTerms != "") {
            $http({
                url: vUrl + "Privacypolicy/InsertPrivacypolicy",
                dataType: 'json',
                params: { CompanyDetailId: vCompanyId},
                method: 'POST',
                data: Data,
                headers: {
                    "Content-Type": "application/json"
                }


            }).then(function (response) {
                //  
                $scope.Data = response.data;
                $scope.msgStatus = "Privacy Policy Saved Successully";
               // $scope.BindGrid();
                $scope.TAC.Name01 = "";
                $scope.TAC.Name02 = "";
                $scope.TAC.Name03 = "";
                $scope.TAC.Name04 = "";
                $scope.TAC.Name05 = "";
                $scope.TAC.Name06 = "";
                $scope.TAC.Name07 = "";
                $scope.TAC.Name08 = "";
                $scope.TAC.Name09 = "";
                $scope.TAC.Name10 = "";

                $scope.BindDataFromDB();

            }).catch(function (response) {
                //  
            });
            $scope.ShowSave = true;
            $scope.ShowUpdate = true;
        }


    }

    $scope.Update = function () {
        
        var vTerms = "";

        if ($scope.TAC.Name01 != "" && $scope.TAC.Name01 != undefined && $scope.TAC.Name01 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name01;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name01;
        }
        if ($scope.TAC.Name02 != "" && $scope.TAC.Name02 != undefined && $scope.TAC.Name02 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name02;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name02;
        }
        if ($scope.TAC.Name03 != "" && $scope.TAC.Name03 != undefined && $scope.TAC.Name03 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name03;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name03;
        }
        if ($scope.TAC.Name04 != "" && $scope.TAC.Name04 != undefined && $scope.TAC.Name04 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name04;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name04;
        }
        if ($scope.TAC.Name05 != "" && $scope.TAC.Name05 != undefined && $scope.TAC.Name05 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name05;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name05;
        }
        if ($scope.TAC.Name06 != "" && $scope.TAC.Name06 != undefined && $scope.TAC.Name06 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name06;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name06;
        }
        if ($scope.TAC.Name07 != "" && $scope.TAC.Name07 != undefined && $scope.TAC.Name07 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name07;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name07;
        }
        if ($scope.TAC.Name08 != "" && $scope.TAC.Name08 != undefined && $scope.TAC.Name08 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name08;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name08;
        }
        if ($scope.TAC.Name09 != "" && $scope.TAC.Name09 != undefined && $scope.TAC.Name09 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name09;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name09;
        }
        if ($scope.TAC.Name10 != "" && $scope.TAC.Name10 != undefined && $scope.TAC.Name10 != null) {
            if (vTerms == "") {
                vTerms = $scope.TAC.Name10;
            }
            else
                vTerms = vTerms + "|" + $scope.TAC.Name10;
        }
        //var vTermsAndConditionId = $scope.TermsAndCondition.HiddenTermsAndConditionId;
        var Data = $scope.TAC;
        //var vTAC = $scope.TAC.hiddenTermsAndConditionId;

        if (vTerms != "") {
            $http({
                url: vUrl + "Privacypolicy/UpdatePrivacypolicy",
                dataType: 'json',
                params: { CompanyDetailId: vCompanyId },
                method: 'POST',
                data: Data,
                headers: {
                    "Content-Type": "application/json"
                }

            }).then(function (data) {
                
                //$scope.Data = response.data;
                $scope.msgStatus = "Privacy Policy Updated Successully";
                $scope.TAC.Name01 = "";
                $scope.TAC.Name02 = "";
                $scope.TAC.Name03 = "";
                $scope.TAC.Name04 = "";
                $scope.TAC.Name05 = "";
                $scope.TAC.Name06 = "";
                $scope.TAC.Name07 = "";
                $scope.TAC.Name08 = "";
                $scope.TAC.Name09 = "";
                $scope.TAC.Name10 = "";
                $scope.BindDataFromDB();

            }).catch(function (response) {
                // 
            })
        }
    }
});