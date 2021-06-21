'use strict';

ScBusinez.controller('HomePageConfigurationController', function ($scope, $http, $window) {
   // 
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";


    $window.scrollTo(0, 0);
    $scope.CompanyName = $.session.get('CompanyName');
    
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
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

    var ee = document.getElementById("showLeftPush1");
    ee.style.display = 'none';


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

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;

    var vCompanyId = $.session.get('CompanyId');
    
    $scope.Save = function () {
        
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.msgStatus = false;

        if ($scope.homesetup.ShowSlider == true) {
            $scope.homesetup.ShowSlider = "true";
        }
        else {
            $scope.homesetup.ShowSlider = "false";
        }
        if ($scope.homesetup.ShowTrendingItems == true) {
            $scope.homesetup.ShowTrendingItems = "true";
        }
        else {
            $scope.homesetup.ShowTrendingItems = "false";
        }
        if ($scope.homesetup.ShowNewItems == true) {
            $scope.homesetup.ShowNewItems = "true";
        }
        else {
            $scope.homesetup.ShowNewItems = "false";
        }
        if ($scope.homesetup.DisplayBannerImages == true) {
            $scope.homesetup.DisplayBannerImages = "true";
        }
        else {
            $scope.homesetup.DisplayBannerImages = "false";
        }
        if ($scope.homesetup.ShowAdvertisement == true) {
            $scope.homesetup.ShowAdvertisement = "true";
        }
        else {
            $scope.homesetup.ShowAdvertisement = "false";
        }
        
        var homeSetup = $scope.homesetup;

        if ($scope.theFile != undefined && $scope.theFile != "") {

            if (parseInt($scope.theFile.length) <= 4 || $scope.theFile == undefined || $scope.theFile == null || $scope.theFile == "") {
                $scope.msg = "You can upload a minimum of 5 files";
                return false;
            }
            else {

                var fromdata = new FormData();
                for (var i = 0; i <= $scope.theFile.length; i++) {
                    fromdata.append("uploadedFile", $scope.theFile[i]);
                }
                var fileName = document.getElementById("FileUpload1").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                    //TO DO
                } else {
                    alert(HomePageConfigMessages(5));
                   // $scope.msg = HomePageConfigMessages(5);//'You must select an image file only'
                    return false;
                }
               

                var iId = response.data;
                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/UploadSlideImages",
                    data: fromdata,
                    params: { iHomeSettingID: iId, ComapnyId: vCompanyId },
                    headers: {
                        'Content-Type': undefined
                    }
                };

                $http(request).then(function (response) {
                    

                }).catch(function (response) {
                    //
                });
            }
        }
        //------------------End Upload Slide Image---------------------//

        //------------------Start Upload Banner Image---------------------//

        if ($scope.theFile1 != undefined && $scope.theFile1 != "") {

            if (parseInt($scope.theFile1.length) <= 4 || $scope.theFile1 == undefined || $scope.theFile1 == null || $scope.theFile1 == "") {
                $scope.msg = HomePageConfigMessages(1);//"You can upload a minimum of 5 files";
                return false;
            }
            else {

                var fromdata1 = new FormData();
                for (var i = 0; i <= $scope.theFile1.length; i++) {
                    fromdata1.append("uploadedFile", $scope.theFile1[i]);
                }
                var fileName = document.getElementById("FileUpload2").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                    //TO DO
                } else {
                    alert(HomePageConfigMessages(5));
                    //$scope.msg = HomePageConfigMessages(5);//'You must select an image file only'
                    return false;
                }
              
                var iId = response.data;
                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/UploadBannerImages",
                    data: fromdata1,
                    params: { iHomeSettingId: iId, CompanyId: vCompanyId },
                    headers: {
                        'Content-Type': undefined
                    }
                };

                $http(request).then(function (response) {
                  //  

                }).catch(function (response) {
                  //  
                });
            }
        }
        
        $http({
            url: vUrl + "HomePageSetting/InsertHomePageSetting",
            dataType: 'json',
            method: 'POST',
            data: homeSetup,
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            $scope.msgStatus = HomePageConfigMessages(2);// "Homepage Setting Details Added Successfully";

            //------------------Start Upload Slide Image---------------------//

            
    //------------------End Upload Banner Image---------------------//
           
            $scope.homesetup.DisplayBannerImages = "";
            $scope.homesetup.ShowSlider = "";
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;

        }).catch(function (response) {
          //  
        });
    }

    $scope.getHomeSlider = function () {
      //  
        $http({
            method: "GET",
            url: vUrl + "HomePageSetting/GetHomeSliderImage",
            params: { CompanyId: vCompanyId }
            , headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
           
            $scope.HomeSliderImages = response.data;

            }).catch(function (response) {
              //  
        });
    };
    

    $scope.getHomeBanner = function () {
       // 
        $http({
            method: "GET",
            url: vUrl + "HomePageSetting/GetHomeBannerImage"
            , params: { CompanyId: vCompanyId }
            , headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
           

            $scope.HomeBannerImages = response.data;

            }).catch(function (response) {
              //  
        });
    };

    var vCompanyId = $.session.get('CompanyId');

    $scope.gridBind = function () {

        $scope.checkedSlider = true;
        $scope.checkedBanner = true;

        $http(
            {
                url: vUrl + "HomePageSetting/GetHomePageDetails",
                method: 'GET',
                params: { CompanyId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                var result = response.data;
                if (response.data.length != 0) {
                    $scope.ShowSave = false;
                    $scope.ShowUpdate = true;
                }

                var vHomePageSettingsId = result["0"].HomePageSettingsId;
                var vShowSlider = result["0"].ShowSlider;
                var vShowTrendingItems = result["0"].ShowTrendingItems;
                var vShowNewItems = result["0"].ShowNewItems;
                var vDisplayBannerImages = result["0"].DisplayBannerImages;
                var vShowAdvertisement = result["0"].ShowAdvertisement;
                var vCompanyDetailId = result["0"].CompanyDetailId;
              //  
                var vShowSlider1 = false, vShowTrendingItems1 = false, vShowNewItems1 = false, vDisplayBannerImages1 = false, vShowAdvertisement1 = false;

                if (vShowSlider == "true") {
                 //   
                    vShowSlider1 = true;
                }

                if (vShowTrendingItems == "true")
                    vShowTrendingItems1 = true;

                if (vShowNewItems == "true")
                    vShowNewItems1 = true;

                if (vDisplayBannerImages == "true")
                    vDisplayBannerImages1 = true;

                if (vShowAdvertisement == "true")
                    vShowAdvertisement1 = true;
               
                $scope.homesetup = response.data;
                $scope.homesetup.ShowSlider = vShowSlider1;
                $scope.homesetup.ShowTrendingItems = vShowTrendingItems1;
                $scope.homesetup.ShowNewItems = vShowNewItems1;
                $scope.homesetup.DisplayBannerImages = vDisplayBannerImages1;
                $scope.homesetup.ShowAdvertisement = vShowAdvertisement1;
                $scope.homesetup.hiddenHomePageSettingsId = vHomePageSettingsId;
                $scope.homesetup.CompanyDetailId = vCompanyDetailId;
                $scope.btnSliderClick();
                $scope.btnBannerClick();
                $scope.getHomeSlider();
                $scope.getHomeBanner();
                
            }).catch(function (response) {
               // 
            });
    }
    $scope.gridBind();

    var vCompanyId = $.session.get('CompanyId');

    $scope.Update = function () {
        //

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msg = "";
        $scope.msgStatus = "";

        if ($scope.homesetup.ShowSlider == true) {
            $scope.homesetup.ShowSlider = "true";
        }
        else {
            $scope.homesetup.ShowSlider = "false";
        }
        if ($scope.homesetup.ShowTrendingItems == true) {
            $scope.homesetup.ShowTrendingItems = "true";
        }
        else {
            $scope.homesetup.ShowTrendingItems = "false";
        }
        if ($scope.homesetup.ShowNewItems == true) {
            $scope.homesetup.ShowNewItems = "true";
        }
        else {
            $scope.homesetup.ShowNewItems = "false";
        }
        if ($scope.homesetup.DisplayBannerImages == true) {
            $scope.homesetup.DisplayBannerImages = "true";
        }
        else {
            $scope.homesetup.DisplayBannerImages = "false";
        }
        if ($scope.homesetup.ShowAdvertisement == true) {
            $scope.homesetup.ShowAdvertisement = "true";
        }
        else {
            $scope.homesetup.ShowAdvertisement = "false";
        }


        var vhomeId = $scope.homesetup.hiddenHomePageSettingsId;
        var homeSetup = $scope.homesetup;
        var slider = $scope.homesetup.ShowSlider;
        var tren = $scope.homesetup.ShowTrendingItems;
        var newitem = $scope.homesetup.ShowNewItems;
        var ban = $scope.homesetup.DisplayBannerImages;
        var advertise = $scope.homesetup.ShowAdvertisement;
        
        if ($scope.theFile != undefined && $scope.theFile != "") {

            if (parseInt($scope.theFile.length) <= 4 || $scope.theFile == undefined || $scope.theFile == null || $scope.theFile == "") {
                $scope.msg = HomePageConfigMessages(1); //"You can upload a minimum of 5 files";
                return false;
            }
            else
            {
            var fromdata = new FormData();
            for (var i = 0; i <= $scope.theFile.length; i++) {
                fromdata.append("uploadedFile", $scope.theFile[i]);
                }
                var fileName = document.getElementById("FileUpload1").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                    //TO DO
                } else {
                    alert(HomePageConfigMessages(5));
                    //$scope.msg = HomePageConfigMessages(5);//'You must select an image file only'
                    return false;
                }
               
            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UpdateSlideImages",
                data: fromdata,
                params: { ihomeSliderId: vhomeId, CompanyId: vCompanyId },
                headers: {
                    'Content-Type': undefined
                }
            };

            $http(request).then(function (response) {
                
               // $scope.gridBind();

            }).catch(function (response) {
               // 
            });
        }
    }

        if ($scope.theFile1 != undefined && $scope.theFile1 != "") {

                if (parseInt($scope.theFile1.length) <= 4 || $scope.theFile1 == undefined || $scope.theFile1 == null || $scope.theFile1 == "") {
                    $scope.msg = HomePageConfigMessages(1);//"You can upload a minimum of 5 files";
                    return false;
                }

                else
                {
                var fromdata1 = new FormData();
                for (var i = 0; i <= $scope.theFile1.length; i++) {
                    fromdata1.append("uploadedFile", $scope.theFile1[i]);
                    }
                    var fileName = document.getElementById("FileUpload2").value,
                        idxDot = fileName.lastIndexOf(".") + 1,
                        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                        //TO DO
                    } else {
                        alert(HomePageConfigMessages(5));
                        //$scope.msg = HomePageConfigMessages(5);//'You must select an image file only'
                        return false;
                    }
                    
                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/UpdateBannerImages",
                    data: fromdata1,
                    params: { ihomeBannerId: vhomeId, CompanyId: vCompanyId },
                    headers: {
                        'Content-Type': undefined
                    }
                };

                $http(request).then(function (response) {
                    
                    //$scope.gridBind();

                }).catch(function (response) {
                  //  
                });
            }
        }
        
        $http({
            url: vUrl + "HomePageSetting/UpdateHomeSetting",
            dataType: 'json',
            method: 'POST',
            data: homeSetup,
            params: { homePageId: vhomeId, Slider: slider, trending: tren, newItem: newitem, banner: ban, adver: advertise, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            $scope.gridBind();
            $scope.msgStatus = HomePageConfigMessages(3);//"Updated Homepage Setting Details Successfully";
            
            $scope.ShowSave = false;
            $scope.ShowUpdate = true;
            //$scope.checkedSlider = true;
            //$scope.checkedBanner = true;
            
            
        }).catch(function (response) {
           // 
        });
    }

        //--------------   Toggle Switch For Mobile  --------------------//

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
    
    
    //-------------     File Upload Ends   ----------//

    //----------   Picture Validation     -------------//
    $scope.setFile = function (element) {
      //  
        $scope.$apply(function ($scope) {

            $scope.theFile = [];

            for (var i = 0; i < element.files.length; i++) {
                $scope.theFile.push(element.files[i])

                var imagesize = element.files[i].size / 1024; //in KB
                var imgSizeMB = imagesize / 1024; //in MB
                if (imgSizeMB > 1) {
                    alert('File should be between 1MB');
                    $scope.homesetup.ShowSlider = "";
                    return false;
                }

                $scope.FileMessage = '';
                var filename = $scope.theFile[i].name;
                var index = filename.lastIndexOf(".");
                var strsubstring = filename.substring(index, filename.length);
                if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
                  //  
                }
                else {
                  //  
                    //alert(HomePageConfigMessages(4));//'please upload correct File Name, File extension should be .png, .jpeg or .gif');
                    alert(HomePageConfigMessages(4));
                    return false;
                }
            }
        });
    };


    $scope.setFile1 = function (element) {
       // 
        $scope.$apply(function ($scope) {

            $scope.theFile1 = [];
          //  
            for (var i = 0; i < element.files.length; i++) {
                $scope.theFile1.push(element.files[i])

                var imagesize = element.files[i].size / 1024; //in KB
                var imgSizeMB = imagesize / 1024; //in MB
                if (imgSizeMB > 1) {
                    alert('File should be between 1MB');
                    $scope.homesetup.DisplayBannerImages = "";
                    return false;
                }

                $scope.FileMessage = '';
                var filename = $scope.theFile1[i].name;
                var index = filename.lastIndexOf(".");
                var strsubstring = filename.substring(index, filename.length);
                if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
                  //  
                }
                else {
                  //  
                    //alert(HomePageConfigMessages(4));//'please upload correct File Name, File extension should be .png, .jpeg or .gif');
                    alert(HomePageConfigMessages(4));
                    //$scope.msg = HomePageConfigMessages(4);
                   
                    return false;
                }
            }
        });
    };
   
    //------------   slider check funtion --------//
  
    $scope.btnSliderClick = function () {
       
        var vChecked = $scope.homesetup.ShowSlider;
        if (vChecked == true) {
            $scope.checkedSlider = true;
            
        }
        else {
            $scope.checkedSlider = false;
           
        }
    }

    //----------  Banner check funtion   ------------//
    $scope.btnBannerClick = function () {
        
        var vChecked = $scope.homesetup.DisplayBannerImages;
        if (vChecked == true) {
            $scope.checkedBanner = true;

        }
        else {
            $scope.checkedBanner = false;

        }
    }
 });
