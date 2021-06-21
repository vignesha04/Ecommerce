'use strict';

ScBusinez.controller('HomeSliderAdminController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    

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

    var vCompanyId = $.session.get('CompanyId');

    $window.scrollTo(0, 0);
    $scope.ShowInsert = true;
    $scope.ShowUpdate = false;
    $scope.CheckStatus = false;
    $scope.showimage = false;
    $scope.active = false;
    $scope.inactive = true;
    $scope.msgStatus = "";
    $scope.msg = "";

    $scope.BindGrid = function (Active) {
        
        $http({
            url: vUrl + "Slider/GetSliderdetails",
            method: 'GET',
            params: { iActive: Active },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function (response) {
            
        });
    }
    $scope.BindGrid(1);

    $scope.Edit = function (sliderId) {
        
        $scope.msgStatus = "";
        $scope.msg = "";
        $http({
            url: vUrl + "Slider/GetSliderdetailsId",
            method: 'GET',
            params: { homesliderId: sliderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.ShowInsert = false;
            $scope.ShowUpdate = true;
            $scope.CheckStatus = true;
            $scope.showimage = true;

            var result = response.data;
            if (response.data.length != 0) {
                var vHomeSliderId = result["0"].HomeSliderId;
                var vSliderName = result["0"].SliderName;
                var vCutofDate = new Date(result["0"].CutofDate);
                var vImageUrl = result["0"].ImageUrl;
                var vIsActive = result["0"].IsActive;
                var vstatus = false;
                if (vIsActive == "1")
                    vstatus = true;
                else
                    vstatus = false;

                $scope.HomeSlider = { HomeSliderId: vHomeSliderId, SliderName: vSliderName, CutofDate: vCutofDate, ImageUrl: vImageUrl, IsActive: vstatus };
               
                if (vImageUrl != undefined && vImageUrl != null && vImageUrl != "")
                    $scope.ImageUrl = vImageUrl;
                else {
                    $scope.ImageUrl = "";
                }
                $window.scrollTo(0, 0);
            }
        }).catch(function (response) {
            
        });
    }

    $scope.Save = function () {
        
        $("#SliderSave").attr("disabled", true);
        $scope.ShowInsert = true;
        $scope.ShowUpdate = false;
        $scope.CheckStatus = false;
        $scope.showimage = false;
        $scope.msgStatus = "";
        $scope.msg = "";
        
        if ($scope.HomeSlider.SliderName == undefined || $scope.HomeSlider.SliderName == null || $scope.HomeSlider.SliderName == "") {
            $scope.msg = "Please Enter the Slider Name";
            $("#SliderSave").attr("disabled", false);
            return false;
        }
        if ($scope.HomeSlider.CutofDate == undefined || $scope.HomeSlider.CutofDate == null || $scope.HomeSlider.CutofDate == "") {
            $scope.msg = "Please select the Cut of Date";
            $("#SliderSave").attr("disabled", false);
            return false;
        }
        //var today = new Date();
        var vdate = new Date();
        vdate.setDate(vdate.getDate() - 1);
        //tomorrow.setDate(today.getDate() + 1);
        var vcutofdate = $scope.HomeSlider.CutofDate;
        if (vcutofdate < vdate) {
            $scope.msg = "Please select the Cut of Date should be greater than current date";
            $("#SliderSave").attr("disabled", false);
            return false;
        }
        if ($scope.HomeSlider.theFile == undefined || $scope.HomeSlider.theFile == null || $scope.HomeSlider.theFile == "") {
            $scope.msg = "Please Upload the image";
            $("#SliderSave").attr("disabled", false);
            return false;
        }
        
        $scope.HomeSlider.IsActive = 1;
        var vslider = $scope.HomeSlider;

        $http({
            url: vUrl + "Slider/InserSliderdetails",
            dataType: 'json',
            method: 'POST',
            data: vslider,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var vId = response.data;

            if ($scope.HomeSlider.theFile != "" && $scope.HomeSlider.theFile != undefined && $scope.HomeSlider.theFile != null) {
                var fromdata = new FormData();
                fromdata.append("uploadedFile", $scope.HomeSlider.theFile);
                var fileName = document.getElementById("FileUpload1").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
                    
                } else {
                    $scope.msg = 'You must select an image file only';
                    $("#SliderSave").attr("disabled", false);
                    return false;
                }

                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/SliderUpload",
                    data: fromdata,
                    params: { sliderId: vId, Fileupload: $scope.FileUploadURL },
                    headers: {
                        'Content-Type': undefined,
                    }
                };

                $http(request).then(function (response) {
                    
                    $scope.BindGrid(1);
                }).catch(function (response) {
                    
                });
            }

            $scope.BindGrid(1);
            $("#SliderSave").attr("disabled", false);
            $scope.msgStatus = 'HomeSlider Saved Successfully';
            $scope.showimage = false;
            $scope.Fileimage = null;
            document.getElementById("FileUpload1").value = "";
            $scope.ShowInsert = true;
            $scope.ShowUpdate = false;
            $scope.CheckStatus = false;
            $scope.active = false;
            $scope.inactive = true;
            $scope.HomeSlider.SliderName = "";
            $scope.HomeSlider.CutofDate = "";
            $scope.HomeSlider.theFile = "";
            $scope.HomeSlider.HomeSliderId = "";
            $scope.HomeSlider.IsActive = false;
        }).catch(function (response) {
            
        });
    }

    $scope.Update = function () {
        
        $("#Sliderupdate").attr("disabled", true);
        $scope.ShowInsert = false;
        $scope.ShowUpdate = true;
        $scope.CheckStatus = true;
        $scope.showimage = true;
        $scope.msgStatus = "";
        $scope.msg = "";

        if ($scope.HomeSlider.SliderName == undefined || $scope.HomeSlider.SliderName == null || $scope.HomeSlider.SliderName == "") {
            $scope.msg = "Please Enter the Slider Name";
            $("#Sliderupdate").attr("disabled", false);
            return false;
        }
        if ($scope.HomeSlider.CutofDate == undefined || $scope.HomeSlider.CutofDate == null || $scope.HomeSlider.CutofDate == "") {
            $scope.msg = "Please select the Cut of Date";
            $("#Sliderupdate").attr("disabled", false);
            return false;
        }
        var vdate = new Date();
        var vcutofdate = $scope.HomeSlider.CutofDate;
        if (vcutofdate < vdate) {
            $scope.msg = "Please select the Cut of Date should be greater than current date";
            $("#Sliderupdate").attr("disabled", false);
            return false;
        }
        if ($scope.HomeSlider.theFile == undefined || $scope.HomeSlider.theFile == null || $scope.HomeSlider.theFile == "") {
            $scope.HomeSlider.theFile = "";
        }

        var vSliderId = $scope.HomeSlider.HomeSliderId;
        var vslider = $scope.HomeSlider;

        $http({
            url: vUrl + "Slider/UpdateSliderdetails",
            dataType: 'json',
            method: 'POST',
            data: vslider,
            params: { homesliderId: vSliderId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var vId = response.data;

            if ($scope.HomeSlider.theFile != "") {
                var fromdata = new FormData();
                fromdata.append("uploadedFile", $scope.HomeSlider.theFile);
                var fileName = document.getElementById("FileUpload1").value,
                    idxDot = fileName.lastIndexOf(".") + 1,
                    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
                    
                } else {
                    $("#Sliderupdate").attr("disabled", false);
                    $scope.msg = 'You must select an image file only'
                    return false;
                }

                var request = {
                    method: 'POST',
                    url: vUrl + "Fileupload/SliderUpload",
                    data: fromdata,
                    params: { sliderId: vId, Fileupload: $scope.FileUploadURL },
                    headers: {
                        'Content-Type': undefined,
                    }
                };

                $http(request).then(function (response) {
                    
                    $scope.BindGrid(1);
                }).catch(function (response) {
                    
                });
            }

            $("#Sliderupdate").attr("disabled", false);
            $scope.BindGrid(1);
            $scope.msgStatus = 'HomeSlider Updated Successfully';
            $scope.showimage = false;
            $scope.Fileimage = null;
            document.getElementById("FileUpload1").value = "";
            $scope.ShowInsert = true;
            $scope.ShowUpdate = false;
            $scope.CheckStatus = false;
            $scope.active = false;
            $scope.inactive = true;
            $scope.HomeSlider.SliderName = "";
            $scope.HomeSlider.CutofDate = "";
            $scope.HomeSlider.theFile = "";
            $scope.HomeSlider.HomeSliderId = "";
            $scope.HomeSlider.IsActive = false;
        });
    }

    $scope.Clear = function () {
        document.getElementById("FileUpload1").value = "";
        $scope.ShowInsert = true;
        $scope.ShowUpdate = false;
        $scope.CheckStatus = false;
        $scope.showimage = false;
        $scope.active = false;
        $scope.inactive = true;
        $scope.HomeSlider.SliderName = "";
        $scope.HomeSlider.CutofDate = "";
        $scope.HomeSlider.theFile = "";
        $scope.HomeSlider.HomeSliderId = "";
        $scope.HomeSlider.IsActive = false;
        $scope.msgStatus = "";
        $scope.msg = "";
        $scope.Fileimage = null;
    }

    $scope.SearchSlider = function () {
        $scope.msgStatus = "";
        $scope.msg = "";
        
        var vdata = $scope.HomeSlider.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid(1);
            $scope.active = false;
            $scope.inactive = true;
        }
    }

    var GetSearch = function (vsearch) {
        $scope.msgStatus = "";
        $scope.msg = "";
        
        var vStatus = 0;
        if ($scope.inactive == true)
            vStatus = 1;

        $http({
            url: vUrl + "Slider/GetSearch",
            method: "GET",
            params: { Search: vsearch, Status: vStatus },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {
            //
        });
    };

    $scope.setFile = function (element) {
        
        $scope.msgStatus = "";
        $scope.msg = "";
        $scope.$apply(function ($scope) {
            
            $scope.HomeSlider.theFile = element.files[0];
            $scope.msg = '';
            var filename = $scope.HomeSlider.theFile.name;
            var size = $scope.HomeSlider.theFile.size;
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
                $scope.msg = '';
            }
            else {
                $scope.msg = "Please Choose the valid Image File";
                document.getElementById("FileUpload1").value = null;
                return false;
            }
            if (size > 900000) {
                $scope.msg = "Profile Image Should less than 900KB!";
                $scope.HomeSlider.theFile = "";
                document.getElementById("FileUpload1").value = "";
                return false;
            } else {

            }
        });
    };


    //-----------------------   Pagination Start   -----------------------------
    var vPageCount = $.session.get('GridSizeAdmin');
    //$scope.pageSize = vPageCount;
    $scope.pageSize = vPageCount;
    $scope.reverse = false;

    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.currentPage = 0;
    }

    $scope.pagination = function () {
        var retVal = [];

        for (var i = 0; i < $scope.filteredList.length; i++) {
            if (i % $scope.pageSize === 0) {
                retVal[Math.floor(i / $scope.pageSize)] = [$scope.filteredList[i]];
            } else {
                retVal[Math.floor(i / $scope.pageSize)].push($scope.filteredList[i]);
            }
        }

        $scope.ItemsByPage = retVal;
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {

        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 0;
        }
        for (var i = input; i < total; i++) {
            if (i != 0 && i != total - 1) {
                ret.push(i);
            }
        }
        return ret;
    };
    $scope.sort = function (sortBy) {
        var iconName = "";
        $scope.resetAll();
        $scope.pagination();
    };

    //-----------------------   Pagination End   -----------------------------

    $scope.Export = function () {
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{Content}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        var table = document.getElementById("example1");
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;
        a.download = 'HomeSlider.xls';
        a.click();
    };

    $scope.ShowInactive = function () {
        
        $scope.msgStatus = "";
        $scope.msg = "";
        $scope.BindGrid(0);
        $scope.active = true;
        $scope.inactive = false;
    }

    $scope.Showactive = function () {
        
        $scope.msgStatus = "";
        $scope.msg = "";
        $scope.BindGrid(1);
        $scope.active = false;
        $scope.inactive = true;
    }
});


