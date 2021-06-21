'use strict';
ScBusinez.controller('CompanyDetailsController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    $scope.Domain = $.session.get('Domain');
    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    var vcompanydetailid = "";
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

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';
    //End//////////////////////////////////
    //End//////////////////////////////////


    //Single Quote validation //
    $scope.onTextBoxKeyPress = function (event) {
        
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = CompanydetailMessages(25); //"Single quote and Double Quote are not allowed";
            return false;
        }
    }
    var showLeftPush = document.getElementById('showLeftPush');
    var menus1 = document.getElementById('cbp-spmenu-s1');
    $scope.spmenus1 = true;
    $scope.LeftMenuClick = function () {
        
        //classie.toggle(showLeftPush, 'disabled');
        $scope.spmenus1 = false;
    }
    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.ShowError = true;
    $scope.comp = true;
    $scope.msg = "";
    $scope.msgStatus = "";

    //--- Get Method----//
    $scope.getcompany = function () {
        
        $http({
            url: vUrl + "CompDetails/GetCompanyDetail",
            method: 'GET',


            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            var result = response.data;
            if (response.data.length != 0) {
                var vCompanyDetailId = result["0"].CompanyDetailId;
                var vCompanyName = result["0"].CompanyName;
                var vAddressLine1 = result["0"].AddressLine1;
                var vAddressLine2 = result["0"].AddressLine2;
                var vCountry = result["0"].Country;
                var vState = result["0"].State;
                var vCity = result["0"].City;
                var vPinCode = result["0"].PinCode;
                var vGSTNo = result["0"].GSTNo;
                var vPhoneNo = result["0"].PhoneNo;
                var vEmailId = result["0"].EmailId;
                var vWebsiteLink = result["0"].WebsiteLink;
                var vCINno = result["0"].CINno;
                //var vWebsiteLogo = result["0"].WebsiteLogo;
                //var vInvoiceLogo = result["0"].InvoiceLogo;
                $scope.ImageUrl = result["0"].WebsiteLogo;
                $scope.ImageUrl1 = result["0"].InvoiceLogo;
                vcompanydetailid = vCompanyDetailId;



                // $cope.company = response.data;
                $scope.company = { hiddenCompanyDetailId: vCompanyDetailId, CompanyName: vCompanyName, AddressLine1: vAddressLine1, AddressLine2: vAddressLine2, Country: vCountry, State: vState, City: vCity, PinCode: vPinCode, PhoneNo: vPhoneNo, EmailId: vEmailId, GSTNo: vGSTNo, CINno: vCINno, WebsiteLink: vWebsiteLink }

                $scope.ShowSave = false;
                $scope.ShowUpdate = true;
            }
        }).catch(function (response) {

        });
    }
    $scope.getcompany();
    // Insert Company Detail//
    $scope.Save = function (vCompanyDetailId) {
        
        $scope.msg = "";
        $scope.msgStatus = "";
        if ($scope.company.CompanyName == "" || $scope.company.CompanyName == undefined || $scope.company.CompanyName == null) {
            $scope.msg = CompanydetailMessages(1); //'Please enter the company name';
            return false;
        }
        if ($scope.company.AddressLine1 == "" || $scope.company.AddressLine1 == undefined || $scope.company.AddressLine1 == null) {
            $scope.msg = CompanydetailMessages(2); //'Please Select the Address1';
            return false;
        }
        if ($scope.company.AddressLine2 == "" || $scope.company.AddressLine2 == undefined || $scope.company.AddressLine2 == null) {
            $scope.msg = CompanydetailMessages(3); //'Please Select the Address1';
            return false;
        }
        if ($scope.company.Country == "" || $scope.company.Country == undefined || $scope.company.Country == null) {
            $scope.msg = CompanydetailMessages(4);//'Please Select the Address1';
            return false;
        }
        if ($scope.company.State == "" || $scope.company.State == undefined || $scope.company.State == null) {
            $scope.msg = CompanydetailMessages(5);//'Please Select the Address2';
            return false;
        }
        if ($scope.company.City == "" || $scope.company.City == undefined || $scope.company.City == null) {
            $scope.msg = CompanydetailMessages(6); //'Please select the city';
            return false;
        }
        if ($scope.company.PinCode == "" || $scope.company.PinCode == undefined || $scope.company.PinCode == null) {
            $scope.msg = CompanydetailMessages(7); //'Please enter the pincode';
            return false;
        }
        //if ($scope.company.GSTNo == "" || $scope.company.GSTNo == undefined || $scope.company.GSTNo == null) {
        //    $scope.msg = CompanydetailMessages(8);//'Please enter the GSTno';
        //    return false;
        //}
        //if ($scope.company.CINno == "" || $scope.company.CINno == undefined || $scope.company.CINno == null) {
        //    $scope.msg = CompanydetailMessages(9); //'Please enter the CINno';
        //    return false;
        //}
        if ($scope.company.PhoneNo == "" || $scope.company.PhoneNo == undefined || $scope.company.PhoneNo == null) {
            $scope.msg = CompanydetailMessages(10); //'please enter the phone no';
            return false;
        }
        //if ($scope.company.EmailId == "" || $scope.company.EmailId == undefined || $scope.company.EmailId == null) {
        //    $scope.msg = CompanydetailMessages(11);//'please enter the emailid';
        //    return false;
        //}
        if ($scope.company.WebsiteLink == "" || $scope.company.WebsiteLink == undefined || $scope.company.WebsiteLink == null) {
            $scope.msg = CompanydetailMessages(23);//'Please Select the website Link';
            return false;
        }

        //Email validation.
        //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //
        //if (reg.test(document.getElementById("EmailId").value) == false) {
        //    $scope.msg = CompanydetailMessages(15); //"EmailId is not valid";
        //    // $scope.showmsgErrorUp = true;
        //    return false;
        //}
        //contact no validation
        var reg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        
        if (reg.test(document.getElementById("PhoneNo").value) == false) {
            $scope.msg = CompanydetailMessages(16); //"Please Enter the valid ContactNo";
            //$scope.showmsgErrorUp = true;
            return false;
        }
        //GST No validation
        //var reg = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
        //

        //if (reg.test(document.getElementById("GSTNo").value) == false) {
        //    $scope.msg = CompanydetailMessages(17);//"Please Enter the valid GSTNo";
        //    return false;
        //}
        //PINCode validation
        //var reg = /^(\d{4}|\d{6})$/;
        //
        //if (reg.test(document.getElementById("PinCode").value) == false) {
        //    $scope.msg = CompanydetailMessages(18); //"Please Enter the valid Pincode";
        //    return false;

        //}
        //CIN No validation
        //var reg = /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
        //
        //if (reg.test(document.getElementById("CINno").value) == false) {
        //    $scope.msg = CompanydetailMessages(19); //"Please Enter the valid CINno";
        //    return false;

        //}
        //Website Link validation//
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        
        if (!re.test($scope.company.WebsiteLink)) {
            //alert("url error");
            $scope.msg = CompanydetailMessages(24);//'Please Enter the valid Link'
            return false;
        }

        var company = $scope.company;
        //var filepath = $scope.filepath;

        //$http({
        //    url: vUrl + "CompanyDetails/InsertCompany",
        //    method: 'POST',
        //    data: company,
        //    headers: {
        //        "Content-Type": "application/json"
        //    }
        $http({

            url: vUrl + "CompDetails/InsertCompanydetail",
            dataType: 'json',
            method: 'POST',
            data: company,
            params: { CompanyDetailId: vCompanyDetailId },
            headers: {
                "Content-Type": "application/json"
            }

        }).then(function (response) {
            
            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = CompanydetailMessages(12); //"Company already exist";
            }
            else {
                InsertCompanyDetail(value);
                $scope.comp = true;
                $scope.msgStatus = CompanydetailMessages(13); //"Added Successfully";
                $scope.company.CompanyName = "";
                $scope.company.AddressLine1 = "";
                $scope.company.AddressLine2 = "";
                $scope.company.Country = "";
                $scope.company.State = "";
                $scope.company.City = "";
                $scope.company.GSTNo = "";
                $scope.company.CINno = "";
                $scope.company.EmailId = "";
                $scope.company.PhoneNo = "";
                $scope.company.PinCode = "";
                $scope.company.WebsiteLink = "";
                $scope.company.WebsiteLogo = "";
                $scope.company.InvoiceLogo = "";
               // $scope.theFile = "";
                $scope.ImageUrl = "";
                $scope.ImageUrl1 = "";


                //$scope.company.Website = "";
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
            }
        }).catch(function (response) {
        });
    }
    $scope.Update = function (/*filepath*/) {
        

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;

        $scope.Show = true;
        $scope.msg = "";
        $scope.msgStatus = "";
        if ($scope.company.CompanyName == "" || $scope.company.CompanyName == undefined || $scope.company.CompanyName == null) {
            $scope.msg = CompanydetailMessages(1); //'Please Select the CompanyName';
            return false;
        }
        if ($scope.company.AddressLine1 == "" || $scope.company.AddressLine1 == undefined || $scope.company.AddressLine1 == null) {
            $scope.msg = CompanydetailMessages(2); //'Please Select the Address1';
            return false;
        }
        if ($scope.company.AddressLine2 == "" || $scope.company.AddressLine2 == undefined || $scope.company.AddressLine2 == null) {
            $scope.msg = CompanydetailMessages(3); //'Please Select the Address2';
            return false;
        }
        if ($scope.company.Country == "" || $scope.company.Country == undefined || $scope.company.Country == null) {
            $scope.msg = CompanydetailMessages(4); //'Please Select the Country';
            return false;
        }
        if ($scope.company.State == "" || $scope.company.State == undefined || $scope.company.State == null) {
            $scope.msg = CompanydetailMessages(5); //'Please Select the State';
            return false;
        }
        if ($scope.company.City == "" || $scope.company.City == undefined || $scope.company.City == null) {
            $scope.msg = CompanydetailMessages(6);//'Please Select the City';
            return false;
        }
        if ($scope.company.PinCode == "" || $scope.company.PinCode == undefined || $scope.company.PinCode == null) {
            $scope.msg = CompanydetailMessages(7); //'Please Select the PinCode';
            return false;
        }
        //if ($scope.company.GSTNo == "" || $scope.company.GSTNo == undefined || $scope.company.GSTNo == null) {
        //    $scope.msg = CompanydetailMessages(8); //'Please Select the GSTNo';
        //    return false;
        //}
        //if ($scope.company.CINno == "" || $scope.company.CINno == undefined || $scope.company.CINno == null) {
        //    $scope.msg = CompanydetailMessages(9); //'Please Select the CINno';
        //    return false;
        //}
        if ($scope.company.PhoneNo == "" || $scope.company.PhoneNo == undefined || $scope.company.PhoneNo == null) {
            $scope.msg = CompanydetailMessages(10);//'Please Select the PhoneNo';
            return false;
        }
        if ($scope.company.EmailId == "" || $scope.company.EmailId == undefined || $scope.company.EmailId == null) {
            $scope.msg = CompanydetailMessages(11);//'Please Select the EmailId';
            return false;
        }
        if ($scope.company.WebsiteLink == "" || $scope.company.WebsiteLink == undefined || $scope.company.WebsiteLink == null) {
            $scope.msg = CompanydetailMessages(23);//'Please Select the website Link';
            return false;
        }
        //Email validation.
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        
        if (reg.test(document.getElementById("EmailId").value) == false) {
            $scope.msg = CompanydetailMessages(15); //"EmailId is not valid";
            // $scope.showmsgErrorUp = true;
            return false;
        }
        //contact no validation
        var reg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        
        if (reg.test(document.getElementById("PhoneNo").value) == false) {
            $scope.msg = CompanydetailMessages(16); //"Please Enter the valid ContactNo";
            //$scope.showmsgErrorUp = true;
            return false;
        }
        //Gst Validation

        //var reg = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;

        //if (reg.test(document.getElementById("GSTNo").value) == false) {
        //    $scope.msg = CompanydetailMessages(17); //"Please Enter the valid GSTNo";
        //    return false;
        //}
        //PINcode validation
        //var reg = /^ [1 - 9][0 - 9]{ 6}?$/;
        var reg = /^(\d{4}|\d{6})$/;
        
        if (reg.test(document.getElementById("PinCode").value) == false) {
            $scope.msg = CompanydetailMessages(18);//"Please Enter the valid Pincode";
            return false;

        }
        //CIN No validation
        //var reg = /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
        //
        //if (reg.test(document.getElementById("CINno").value) == false) {
        //    $scope.msg = CompanydetailMessages(19); //"Please Enter the valid CINno";
        //    return false;

        //}
        //Website Link validation//
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        
        if (!re.test($scope.company.WebsiteLink)) {
            //alert("url error");
            $scope.msg = CompanydetailMessages(24);//'Please Enter the valid Link'
            return false;
        }
        

        var vCompanyDetailId = $scope.company.hiddenCompanyDetailId;
        var company = $scope.company;
        // vfilepath = $scope.filepath;


        $scope.msg = "";
        $scope.msgStatus = "";
        $http({
            url: vUrl + "CompDetails/UpdateCompanyDetail",
            dataType: 'json',
            method: 'POST',
            data: company,
            params: { CompanyDetailId: vCompanyDetailId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            UpdateCompanydetails(vCompanyDetailId);
            $scope.getcompany();
            $scope.msg = "";
            $scope.msgStatus = CompanydetailMessages(14); //"Updated Successfully";
            $scope.comp = true;
            $scope.Show = false;

            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.company.CompanyName = "";
            $scope.company.AddressLine1 = "";
            $scope.company.AddressLin2 = "";
            $scope.company.Country = "";
            $scope.company.State = "";
            $scope.company.city = "";
            $scope.company.PinCode = "";
            $scope.company.GSTNo = "";
            $scope.company.EmailId = "";
            $scope.company.PhoneNo = "";
            $scope.company.CINno = "";
            $scope.company.WebsiteLink = "";

            $scope.company.InvoiceLogo = "";
            $scope.company.WebsiteLogo = "";
            //$scope.theFile = "";
            //$scope.theFile1 = "";
            //$scope.fromdata = "";
            //$scope.fromdata1 = "";
            $scope.theFile = "";
            //$scope.theFile1 = "";
            $scope.ImageUrl = "";
            $scope.ImageUrl1 = "";





        }).catch(function (response) {

        });
    }
    var InsertCompanyDetail = function (value) {
        
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        

        if ($scope.theFile == undefined || $scope.theFile == "") {
            $scope.msg = CompanydetailMessages(20);//'Please Upload the Image File';
            return false;
        }
        if ($scope.theFile1 == undefined || $scope.theFile1 == "") {
            $scope.msg = CompanydetailMessages(20); //'Please Upload the Image File';
            return false;
        }
        
        //var filepath = "";
        //var fromdata = new FormData();
        //for (var i = 0; i < $scope.theFile.length; i++) {
        //    fromdata.append("uploadedFile", $scope.theFile[i]);
        //    }
        //    for (var i = 0; i < $scope.theFile1.length; i++) {
        //        fromdata.append("uploadedFile", $scope.theFile[i]);
        //    }
        //var fromdata = new FormData();
        //fromdata.append("uploadedFile", $scope.theFile);
        if ($scope.theFile != undefined && $scope.theFile != "") {
            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);


            var fileName = document.getElementById("FileUpload1").value,
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                //TO DO
            } else {
                //alert(AboutUsAdminMessages(6));
                $scope.msg = CompanydetailMessages(21); //'You must select an image file only'
                return false;
            }

            var request = {

                method: "POST",
                url: vUrl + "FileUpload/CompanydetailsFileUpload1",
                data: fromdata,
                params: { CompanyDetailId: value, Fileupload: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function (response) {
                

                //$scope.resultOPImage = response.data;
                //var filepath = response.data;
                

            }).catch(function (response) {
                
            });
        }
            if ($scope.theFile1 != undefined && $scope.theFile1 != "") {
                var fromdata1 = new FormData();
                fromdata1.append("uploadedFile", $scope.theFile1);
                var fileName = document.getElementById("FileUpload2").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                    //TO DO
                } else {

                    $scope.msg = CompanydetailMessages(21); //'You must select an image file only'
                    return false;
                }
                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/CompanydetailsFileUpload2",
                    data: fromdata1,
                    params: { CompanyDetailId: value, Fileupload: $scope.FileUploadURL },
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request).then(function (response) {
                    

                    //InsertCompanyDetail(vCompanyDetailId);


                    //$scope.resultOPImage = response.data;
                    //var filepath = response.data;


                }).catch(function (response) {
                    
                });
            }
        

            if ($scope.theFile2 != undefined && $scope.theFile2 != "") {
                var fromdata1 = new FormData();
                fromdata1.append("uploadedFile", $scope.theFile2);
                var fileName = document.getElementById("FileUpload3").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "icon") {
                    //TO DO
                } else {

                    $scope.msg = 'You must select an image file only in Icon'
                    return false;
                }
                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/CompanydetailsFileUpload3",
                    data: fromdata1,
                    params: { CompanyDetailId: vcompanydetailid, Fileupload: $scope.FileUploadURL },
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request).then(function (response) {
                    

                    //InsertCompanyDetail(vCompanyDetailId);


                    //$scope.resultOPImage = response.data;
                    //var filepath = response.data;


                }).catch(function (response) {
                    
                });
            }



    }
    
        
       

    
    //$scope.getInvoiceImage = function (vCompanyDetailId) {
    //    

    //    $http({
    //        method: "GET",
    //        url: vUrl + "CompDetails/GetInvoiceImage"
    //        , params: { CompanyDetailId: vCompanyDetailId }
    //        , headers: {
    //            'Content-Type': JSON
    //        }
    //    }).then(function (response) {
    //        debugger

    //        $scope.resultOPImage = response.data;

    //    }).then(function myError(response) {
    //    });
    //};
    $scope.setFile = function (element) {
        
        $scope.$apply(function ($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
            //console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
                
            }
            else {
                
                $scope.msgStatus = "";
                $scope.msg = "";
                $scope.msg = CompanydetailMessages(22);
                //$scope.msg = AboutUsAdminMessages(4);//'please upload correct File Name, File extension should be .png, .jpeg or .gif');              
                return false;
            }
        });
    };
    $scope.setFile1 = function (element) {
        
        $scope.$apply(function ($scope) {
            $scope.theFile1 = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile1.name;
            //console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
                
            }
            else {
                

                $scope.msg = CompanydetailMessages(22);// "please upload correct File Name, File extension should be .png, .jpeg or .gif";
                return false;
            }
        });
    };

    $scope.setFile2 = function (element) {
        
        $scope.$apply(function ($scope) {
            $scope.theFile2 = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile2.name;
            //console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.ico') {
                
            }
            else {
                

                $scope.msg = "please upload correct File Name, File extension should in ico";
                return false;
            }
        });
    };
    var UpdateCompanydetails = function (vCompanyDetailId) {
        


        if ($scope.theFile != undefined && $scope.theFile != "") {
            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);

            var fileName = document.getElementById("FileUpload1").value,
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" ||  extFile == "icon") {
                //TO DO
            } else {

                $scope.msg = CompanydetailMessages(21); //'You must select an image file only'
                return false;
            }
            //fromdata.append("uploadedFile", $scope.theFile);
            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/CompanydetailsFileUpload1",
                data: fromdata,
                params: { CompanyDetailId: vCompanyDetailId, Fileupload: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };


            $http(request).then(function (response) {
                


            }).catch(function (response) {
                
            });
        }
        if ($scope.theFile1 != undefined && $scope.theFile1 != "") {
            var fromdata1 = new FormData();
            fromdata1.append("uploadedFile", $scope.theFile1);
            var fileName = document.getElementById("FileUpload2").value,
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                //TO DO
            } else {

                $scope.msg = CompanydetailMessages(21); //'You must select an image file only'
                return false;
            }



            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/CompanydetailsFileUpload2",
                data: fromdata1,
                params: { CompanyDetailId: vCompanyDetailId, Fileupload: $scope.FileUploadURL},
                headers: {
                    'Content-Type': undefined
                }
            };


            $http(request).then(function (response) {
                


            }).catch(function (response) {
                
            });
        }

        if ($scope.theFile2 != undefined && $scope.theFile2 != "") {
            
            var fromdata1 = new FormData();
            fromdata1.append("uploadedFile", $scope.theFile2);
            var fileName = document.getElementById("FileUpload3").value,
                
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "ico") {
                //TO DO
            } else {

                $scope.msg = 'You must select an image file only in ico'
                return false;
            }
            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/CompanydetailsFileUpload3",
                data: fromdata1,
                params: { CompanyDetailId: vcompanydetailid, Fileupload: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function (response) {
                

                //InsertCompanyDetail(vCompanyDetailId);


                //$scope.resultOPImage = response.data;
                //var filepath = response.data;


            }).catch(function (response) {
                
            });
        }

    }
    // Number validation//
    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };




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









