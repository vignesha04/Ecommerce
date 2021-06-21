'use strict';

ScBusinez.controller('AboutUsAdminController', function ($scope, $http,$window) {
    

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.cont = true;
    $scope.msg = "";
    $scope.msgStatus = "";
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    var vUrl = $scope.SubDomain;

  //  var vUrl = "http://localhost:56397/api/"; 
    $window.scrollTo(0, 0);
    
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
    $scope.CompanyName = $.session.get('CompanyName');

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
   // vSettingsmenuShow1.style.display = 'none';

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

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

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
    //End//////////////////////////////////
    
    $http(
        {
            url: vUrl + "AboutUsAdmin/GetThemeDetails",
            method: 'GET',
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            //
            $scope.themedetail = response.data;
        }).catch(function (response) {
            //
            });
  
    $scope.getThemeimage = function (themeid) {
       // 
       
        $http({
            method: "GET",
            url: vUrl + "ThemeDetail/GetThemeId"
            , params: { themeId: themeid, CompanyId: vCompanyId }
            , headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
           // debugger
            //$scope.ShowEditImages = false;
            $scope.resultOPImage = response.data;

            }).catch(function (response) {
           //
        });
    };

    var vCompanyId = $.session.get('CompanyId');

    $scope.faqget = function () {
        
        $http({
            url: vUrl + "AboutUsAdmin/GetFaqDetails",
            method: 'GET',
            params: { CompanyId: vCompanyId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            $scope.FaqData = response.data;

            var result = response.data;
            for (var i = 0; i < response.data.length; i++)
            {
                if (i == 0) {
                    var vQuestion1 = result[i].Question;
                    var vAnswer1 = result[i].Answer;
                    $scope.FaqData.Question1 = vQuestion1;
                    $scope.FaqData.Answer1 = vAnswer1;
                }
                else if (i == 1) {
                    var vQuestion2 = result[i].Question;
                    var vAnswer2 = result[i].Answer;
                    $scope.FaqData.Question2 = vQuestion2;
                    $scope.FaqData.Answer2 = vAnswer2;
                }
                else if (i == 2) {
                    var vQuestion3 = result[i].Question;
                    var vAnswer3 = result[i].Answer;
                    $scope.FaqData.Question3 = vQuestion3;
                    $scope.FaqData.Answer3 = vAnswer3;
                }
                else if (i == 3) {
                    var vQuestion4 = result[i].Question;
                    var vAnswer4 = result[i].Answer;
                    $scope.FaqData.Question4 = vQuestion4;
                    $scope.FaqData.Answer4 = vAnswer4;
                }
                else if (i == 4) {
                    var vQuestion5 = result[i].Question;
                    var vAnswer5 = result[i].Answer;
                    $scope.FaqData.Question5 = vQuestion5;
                    $scope.FaqData.Answer5 = vAnswer5;
                }
            }

        }).catch(function (response) {
           // 
        });
        

    }
    $scope.faqget();

    var vCompanyId = $.session.get('CompanyId');

    var InsertAboutUsAdmin = function (filepath) {
       

        var vFaqQuestion = '', vFaqAnswers = '';

        if ($scope.FaqData.Question1 != undefined && $scope.FaqData.Question1 != null && $scope.FaqData.Question1 != "") {
            if (vFaqQuestion == "")
                vFaqQuestion = $scope.FaqData.Question1;
            else
                vFaqQuestion = vFaqQuestion + "|" + $scope.FaqData.Question1;
        }
        if ($scope.FaqData.Answer1 != undefined && $scope.FaqData.Answer1 != null && $scope.FaqData.Answer1 != "") {
            if (vFaqAnswers == "")
                vFaqAnswers = $scope.FaqData.Answer1;
            else
                vFaqAnswers = vFaqAnswers + "|" + $scope.FaqData.Answer1;
        }
        if ($scope.FaqData.Question2 != undefined && $scope.FaqData.Question2 != null && $scope.FaqData.Question2 != "") {
            if (vFaqQuestion == "")
                vFaqQuestion = $scope.FaqData.Question2;
            else
                vFaqQuestion = vFaqQuestion + "|" + $scope.FaqData.Question2;
        }
        if ($scope.FaqData.Answer2 != undefined && $scope.FaqData.Answer2 != null && $scope.FaqData.Answer2 != "") {
            if (vFaqAnswers == "")
                vFaqAnswers = $scope.FaqData.Answer2;
            else
                vFaqAnswers = vFaqAnswers + "|" + $scope.FaqData.Answer2;
        }
        if ($scope.FaqData.Question3 != undefined && $scope.FaqData.Question3 != null && $scope.FaqData.Question3 != "") {
            if (vFaqQuestion == "")
                vFaqQuestion = $scope.FaqData.Question3;
            else
                vFaqQuestion = vFaqQuestion + "|" + $scope.FaqData.Question3;
        }
        if ($scope.FaqData.Answer3 != undefined && $scope.FaqData.Answer3 != null && $scope.FaqData.Answer3 != "") {
            if (vFaqAnswers == "")
                vFaqAnswers = $scope.FaqData.Answer3;
            else
                vFaqAnswers = vFaqAnswers + "|" + $scope.FaqData.Answer3;
        }
        if ($scope.FaqData.Question4 != undefined && $scope.FaqData.Question4 != null && $scope.FaqData.Question4 != "") {
            if (vFaqQuestion == "")
                vFaqQuestion = $scope.FaqData.Question4;
            else
                vFaqQuestion = vFaqQuestion + "|" + $scope.FaqData.Question4;
        }
        if ($scope.FaqData.Answer4 != undefined && $scope.FaqData.Answer4 != null && $scope.FaqData.Answer4 != "") {
            if (vFaqAnswers == "")
                vFaqAnswers = $scope.FaqData.Answer4;
            else
                vFaqAnswers = vFaqAnswers + "|" + $scope.FaqData.Answer4;
        }
        if ($scope.FaqData.Question5 != undefined && $scope.FaqData.Question5 != null && $scope.FaqData.Question5 != "") {
            if (vFaqQuestion == "")
                vFaqQuestion = $scope.FaqData.Question5;
            else
                vFaqQuestion = vFaqQuestion + "|" + $scope.FaqData.Question5;
        }
        if ($scope.FaqData.Answer5 != undefined && $scope.FaqData.Answer5 != null && $scope.FaqData.Answer5 != "") {
            if (vFaqAnswers == "")
                vFaqAnswers = $scope.FaqData.Answer5;
            else
                vFaqAnswers = vFaqAnswers + "|" + $scope.FaqData.Answer5;
        }

        var Aboutus = $scope.Aboutus;

        $http({
            url: vUrl + "AboutUsAdmin/InsertAboutUsAdmin",
            dataType: 'json',
            method: 'POST',
            data: Aboutus,
            params: { FaqQuestions: vFaqQuestion, FaqAnswers: vFaqAnswers, filepath: filepath, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
           
            $scope.bindgrid();
            $scope.msgStatus = AboutUsAdminMessages(1);//"AboutUsAdmin Details Added Successfully";
            $scope.Aboutus.Description = "";
            $scope.Aboutus.Image1 = "";
            $scope.Aboutus.Image2 = "";
            

        }).catch(function (response) {
            
        });
    };

    $scope.onTextBoxKeyPress = function (event) {
       

        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            alert("Single quote and Double Quote are not allowed");
            //$scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    $scope.Save = function () {
        
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.theFile == undefined || $scope.theFile == "") {
            $scope.msg = AboutUsAdminMessages(2);// 'Please Upload the Image File';
            return false;
        }
        
        if ($scope.Aboutus.Description == undefined || $scope.Aboutus.Description == null || $scope.Aboutus.Description == "") {
            $scope.msg = AboutUsAdminMessages(3);//'Please Enter the Description';
            return false;
        }
        
        var fromdata = new FormData();
        fromdata.append("uploadedFile", $scope.theFile);
        var fileName = document.getElementById("FileUpload1").value,
            idxDot = fileName.lastIndexOf(".") + 1,
            extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO
        } else {
            alert(AboutUsAdminMessages(6));
            //$scope.msg = AboutUsAdminMessages(6);//'You must select an image file only'
            return false;
        }
        fromdata.append("uploadedFile", $scope.theFile1);
        var fileName = document.getElementById("FileUpload2").value,
            idxDot = fileName.lastIndexOf(".") + 1,
            extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO
        } else {
            alert(AboutUsAdminMessages(6));
            //$scope.msg = AboutUsAdminMessages(6);//'You must select an image file only'
            return false;
        }
        

        var request = {
            method: 'POST',
            url: vUrl + "Fileupload/Aboutus",
            data: fromdata,
            params: {vFileUploadURl: $scope.FileUploadURL },
            headers: {
                'Content-Type': undefined
            }
        };

        $http(request).then(function (response) {
           // 
           
            var filepath = response.data;
            InsertAboutUsAdmin(filepath);

        }).catch(function (response) {
          //  
        });
    }
    $scope.setFile = function (element) {
       // 
        $scope.$apply(function ($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
            //console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
              //  
            }
            else {
              //  
                alert(AboutUsAdminMessages(4));
                //$scope.msg = AboutUsAdminMessages(4);//'please upload correct File Name, File extension should be .png, .jpeg or .gif');              
                return false;
            }
        });
    };

    $scope.setFile1 = function (element) {
      //  
        $scope.$apply(function ($scope) {
            $scope.theFile1 = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile1.name;
            //console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
               // 
            }
            else {
              //  
                alert(AboutUsAdminMessages(4));
                //$scope.msg = AboutUsAdminMessages(4);// "please upload correct File Name, File extension should be .png, .jpeg or .gif";
                return false;
            }
        });
    };

    var vCompanyId = $.session.get('CompanyId');
   
    $scope.Update = function () {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.msg = "";
        $scope.msgStatus = "";

        var fromdata = new FormData();
        if ($scope.theFile != undefined && $scope.theFile != "") {
            fromdata.append("uploadedFile", $scope.theFile);

            var fileName = document.getElementById("FileUpload1").value,
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                //TO DO
            } else {
                alert(AboutUsAdminMessages(6));
                return false;
            }

            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UploadAbout",
                data: fromdata,
                params: { vFileUploadURl: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };

            $http(request).then(function (response) {
                
                var filepath2 = response.data;

                UpdateAboutUsAdmin(filepath2);
            }).catch(function (response) {
               // 
            });
        }

        if ($scope.theFile1 != undefined && $scope.theFile1 != "") {

            fromdata.append("uploadedFile", $scope.theFile1);
            var fileName = document.getElementById("FileUpload2").value,
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                //TO DO
            } else {
                alert(AboutUsAdminMessages(6));
                //$scope.msg = AboutUsAdminMessages(6);//'You must select an image file only'
                return false;
            }

            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UploadAbout",
                data: fromdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            $http(request).then(function (response) {
                
                var filepath2 = response.data;

                UpdateAboutUsAdmin(filepath2);
            }).catch(function (response) {
               // 
            });
        }
        else {
            var vfilepath2 = "";
            UpdateAboutUsAdmin(vfilepath2);
        }
    }

    var UpdateAboutUsAdmin = function (filepath2)
    {
        
        if ($scope.Aboutus.Description == undefined || $scope.Aboutus.Description == null || $scope.Aboutus.Description == "") {
            $scope.msg = AboutUsAdminMessages(3);// 'Please Enter the Description';
            return false;
        }
        var vAboutUsFaq = '', vFaqAnswer = '';

        if ($scope.FaqData.Question1 != undefined && $scope.FaqData.Question1 != null && $scope.FaqData.Question1 != "") {
            if (vAboutUsFaq == "")
                vAboutUsFaq = $scope.FaqData.Question1;
            else
                vAboutUsFaq = vAboutUsFaq + "|" + $scope.FaqData.Question1;
        }
        if ($scope.FaqData.Answer1 != undefined && $scope.FaqData.Answer1 != null && $scope.FaqData.Answer1 != "") {
            if (vFaqAnswer == "")
                vFaqAnswer = $scope.FaqData.Answer1;
            else
                vFaqAnswer = vFaqAnswer + "|" + $scope.FaqData.Answer1;
        }
        if ($scope.FaqData.Question2 != undefined && $scope.FaqData.Question2 != null && $scope.FaqData.Question2 != "") {
            if (vAboutUsFaq == "")
                vAboutUsFaq = $scope.FaqData.Question2;
            else
                vAboutUsFaq = vAboutUsFaq + "|" + $scope.FaqData.Question2;
        }
        if ($scope.FaqData.Answer2 != undefined && $scope.FaqData.Answer2 != null && $scope.FaqData.Answer2 != "") {
            if (vFaqAnswer == "")
                vFaqAnswer = $scope.FaqData.Answer2;
            else
                vFaqAnswer = vFaqAnswer + "|" + $scope.FaqData.Answer2;
        }
        if ($scope.FaqData.Question3 != undefined && $scope.FaqData.Question3 != null && $scope.FaqData.Question3 != "") {
            if (vAboutUsFaq == "")
                vAboutUsFaq = $scope.FaqData.Question3;
            else
                vAboutUsFaq = vAboutUsFaq + "|" + $scope.FaqData.Question3;
        }
        if ($scope.FaqData.Answer3 != undefined && $scope.FaqData.Answer3 != null && $scope.FaqData.Answer3 != "") {
            if (vFaqAnswer == "")
                vFaqAnswer = $scope.FaqData.Answer3;
            else
                vFaqAnswer = vFaqAnswer + "|" + $scope.FaqData.Answer3;
        }
        if ($scope.FaqData.Question4 != undefined && $scope.FaqData.Question4 != null && $scope.FaqData.Question4 != "") {
            if (vAboutUsFaq == "")
                vAboutUsFaq = $scope.FaqData.Question4;
            else
                vAboutUsFaq = vAboutUsFaq + "|" + $scope.FaqData.Question4;
        }
        if ($scope.FaqData.Answer4 != undefined && $scope.FaqData.Answer4 != null && $scope.FaqData.Answer4 != "") {
            if (vFaqAnswer == "")
                vFaqAnswer = $scope.FaqData.Answer4;
            else
                vFaqAnswer = vFaqAnswer + "|" + $scope.FaqData.Answer4;
        }
        if ($scope.FaqData.Question5 != undefined && $scope.FaqData.Question5 != null && $scope.FaqData.Question5 != "") {
            if (vAboutUsFaq == "")
                vAboutUsFaq = $scope.FaqData.Question5;
            else
                vAboutUsFaq = vAboutUsFaq + "|" + $scope.FaqData.Question5;
        }
        if ($scope.FaqData.Answer5 != undefined && $scope.FaqData.Answer5 != null && $scope.FaqData.Answer5 != "") {
            if (vFaqAnswer == "")
                vFaqAnswer = $scope.FaqData.Answer5;
            else
                vFaqAnswer = vFaqAnswer + "|" + $scope.FaqData.Answer5;
        }

       // 
        var vaboutId = $scope.Aboutus.HiddenAboutUsAdminId;
        var Aboutus = $scope.Aboutus;
       
        $http({
            url: vUrl + "AboutUsAdmin/UpdateAboutUsAdmin",
            dataType: 'json',
            method: 'POST',
            data: Aboutus,
            params: { FaqQuestion: vAboutUsFaq, FaqAnswer: vFaqAnswer, AboutusId: vaboutId, filepath1: filepath2, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            $scope.bindgrid();
            $scope.msgStatus = AboutUsAdminMessages(5);// "Updated AboutUs Successfully";
            $scope.cont = true;
            $scope.theFile = "";
            $scope.theFile1 = "";
        }).catch(function (response) {
           // 
        });
    }

    var vCompanyId = $.session.get('CompanyId');
        
    $scope.bindgrid = function () {
        
        $http(
            {
                url: vUrl + "AboutUsAdmin/GetAboutUsAdminDetails",
                method: 'GET',
                params: { CompanyId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
               
                var result = response.data;
                var vThemeId = result["0"].ThemeId;
                var vImage1 = result["0"].Image1;
                var vImage2 = result["0"].Image2;
                var vDescription = result["0"].Description;
                var vAboutUsAdminId = result["0"].AboutUsAdminId;
                var vCompanyDetailId = result["0"].CompanyDetailId;
                $scope.Aboutus = response.data;
                $scope.getThemeimage(vThemeId);
                
                $scope.Aboutus = { ThemeId: vThemeId, Description: vDescription, AboutUsAdminId: vAboutUsAdminId, Image1: vImage1, Image2: vImage2, CompanyDetailId: vCompanyDetailId };
                if (response.data.length != 0) {
                    $scope.ShowSave = false;
                    $scope.ShowUpdate = true;
                }
                $scope.Aboutus.HiddenAboutUsAdminId = vAboutUsAdminId;
            }).catch(function (response) {
               // 
            });

        
            $http({
                url: vUrl + "AboutUsAdmin/GetFaqDetails",
                method: 'GET',
            params: { CompanyId: vCompanyId },
                Headers: {
                    "Content-Type": JSON
                }
        }).then(function (response) {
            

            var result = response.data;
            for (var i = 0; i < response.data.length; i++) {
                if (i == 0) {
                    var vQuestion1 = result[i].Question;
                    var vAnswer1 = result[i].Answer;
                    $scope.FaqData.Question1 = vQuestion1;
                    $scope.FaqData.Answer1 = vAnswer1;
                }
                else if (i == 1) {
                    var vQuestion2 = result[i].Question;
                    var vAnswer2 = result[i].Answer;
                    $scope.FaqData.Question2 = vQuestion2;
                    $scope.FaqData.Answer2 = vAnswer2;
                }
                else if (i == 2) {
                    var vQuestion3 = result[i].Question;
                    var vAnswer3 = result[i].Answer;
                    $scope.FaqData.Question3 = vQuestion3;
                    $scope.FaqData.Answer3 = vAnswer3;
                }
                else if (i == 3) {
                    var vQuestion4 = result[i].Question;
                    var vAnswer4 = result[i].Answer;
                    $scope.FaqData.Question4 = vQuestion4;
                    $scope.FaqData.Answer4 = vAnswer4;
                }
                else if (i == 4) {
                    var vQuestion5 = result[i].Question;
                    var vAnswer5 = result[i].Answer;
                    $scope.FaqData.Question5 = vQuestion5;
                    $scope.FaqData.Answer5 = vAnswer5;
                }
            }
            
            $scope.FaqData = {
                Question1: vQuestion1,
                Answer1: vAnswer1,
                Question2: vQuestion2,
                Answer2: vAnswer2,
                Question3: vQuestion3,
                Answer3: vAnswer3,
                Question4: vQuestion4,
                Answer4: vAnswer4,
                Question5: vQuestion5,
                Answer5: vAnswer5
            };

            }).catch(function (response) {
               // 
            });
    }
    $scope.bindgrid();
});