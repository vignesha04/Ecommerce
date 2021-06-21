'use strict';

ScBusinez.controller('WidgetsController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    $scope.CompanyName = $.session.get('CompanyName');
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

    var ee = document.getElementById("showLeftPush1");
    ee.style.display = 'none';

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

    $http({
        url: vUrl + "DashBoardAdmin/GetTopSellingProuct",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response2) {
        
        $scope.TopSaleProduct = response2.data;

    }).catch(function (response) {
    });

    $http({
        url: vUrl + "DashBoardAdmin/GetNewClients",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response2) {
        //MemberName, ContactNo, EmailId
        $scope.NewClients = response2.data;

        }).catch(function (response) {
    });


    //Coupon detail
    $http({
        url: vUrl + "DashBoardAdmin/GetNewCoupons",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response2) {
        //Name, Description, DiscountPercentage
        $scope.NewCoupons = response2.data;

    }).catch(function (response) {
        });
    
    $http({
        url: vUrl + "DashBoardAdmin/GetNewSales",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response2) {
        
        //Name, Description, DiscountPercentage
        $scope.NewSales = response2.data;

    }).catch(function (response) {
        });

    $http({
        url: vUrl + "DashBoardAdmin/GetSiteSettingConfiguration",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        var vResult = response.data;
        var vCurrencyType = vResult["0"].CurrencyType;
        var vGridSizeClient = vResult["0"].GridSizeClient;

        //$.session.set('CurrencyType', vResult["0"].vCurrencyType);
        //$.session.set('GridSizeClient', vResult["0"].vGridSizeClient);

        $scope.CurrencyType = vCurrencyType;
    }).catch(function (response) {

    });

    // Calender 
    function generateCalendar(d) {
        var days = howManyDays(d);
        var shift = getDayFirstDate(d);
        clear();
        for (var i = 0; i < days; i++) {
            var posi_row = Math.floor((i + shift) / 7);
            var posi_col = Math.floor((i + shift) % 7);
            $('#calendar_display .r' + posi_row).children('.col' + posi_col).html(i + 1);
        }
    }
    function clear() {
        $('#calendar_display tbody td').each(function () {
            $(this).html('');
        })
    }
    function getDayFirstDate(d) {
        var tempd = new Date();
        tempd.setFullYear(d.getFullYear());
        tempd.setMonth(d.getMonth());
        tempd.setDate(1);
        tempd.setHours(0);
        tempd.setMinutes(0);
        tempd.setSeconds(0);
        // var timeSince1970 = tempd.getTime();
        // var daysSince1970 = Math.floor(timeSince1970/(1000*60*60*24));
        // return (daysSince1970+4)%7;
        return tempd.getDay();
    }
    function howManyDays(d) {
        var m = d.getMonth() + 1;
        if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) return 31;
        if (m == 2) {
            if (isLeapYear(d.getFullYear())) {
                return 29
            } else {
                return 28
            }
        }
        return 30;
    }
    function isLeapYear(year) {
        if (year % 400 == 0) {
            return true;
        } else if (year % 100 == 0) {
            return false;
        } else if (year % 4 == 0) {
            return true;
        } else {
            return false;
        }
    }
    function updateDate(d, sign) {
        var m = d.getMonth();
        if (sign) {
            if (m + 1 > 11) {
                d.setFullYear(d.getFullYear() + 1);
                d.setMonth(0);
            } else {
                d.setMonth(m + 1);
            }
        } else {
            if (m - 1 < 0) {
                d.setFullYear(d.getFullYear() - 1);
                d.setMonth(11);
            } else {
                d.setMonth(m - 1);
            }
        }
    }
    $(function () {
        var d = new Date();
        $('#data_chooser').html(d.getFullYear() + ' year  ' + (d.getMonth() + 1) + ' month');
        generateCalendar(d);
        $('.left').click(function () {
            updateDate(d, 0);
            $('#data_chooser').html(d.getFullYear() + ' year  ' + (d.getMonth() + 1) + ' month');
            generateCalendar(d);
            return false;
        });
        $('.right').click(function () {
            updateDate(d, 1);
            $('#data_chooser').html(d.getFullYear() + ' year  ' + (d.getMonth() + 1) + ' month');
            generateCalendar(d);
            return false;
        });
    });

    function sliceSize(dataNum, dataTotal) {
        return (dataNum / dataTotal) * 360;
    }
    function addSlice(sliceSize, pieElement, offset, sliceID, color) {
        $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
        var offset = offset - 1;
        var sizeRotation = -179 + sliceSize;

        // values
        $("." + sliceID).css({
            "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
        });


        //values
        $("." + sliceID + " span").css({
            "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
            "background-color": color
        });
    }
    function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
        var sliceID = "s" + dataCount + "-" + sliceCount;
        var maxSize = 179;
        if (sliceSize <= maxSize) {
            addSlice(sliceSize, pieElement, offset, sliceID, color);
        } else {
            addSlice(maxSize, pieElement, offset, sliceID, color);
            iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
        }
    }
    function createPie(dataElement, pieElement) {
        var listData = [];
        $(dataElement + " span").each(function () {
            listData.push(Number($(this).html()));
        });
        var listTotal = 0;
        for (var i = 0; i < listData.length; i++) {
            listTotal += listData[i];
        }
        var offset = 0;
        var color = [
            "cornflowerblue",
            "olivedrab",
            "orange",
            "tomato",
            "crimson",
            "purple",
            "turquoise",
            "forestgreen",
            "navy",
            "gray"
        ];
        for (var i = 0; i < listData.length; i++) {
            var size = sliceSize(listData[i], listTotal);
            iterateSlices(size, pieElement, offset, i, 0, color[i]);
            $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
            offset += size;
        }
    }
    createPie(".pieID.legend", ".pieID.pie");

   
});
