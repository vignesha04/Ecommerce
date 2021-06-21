'use strict';
ScBusinez.controller('CourierDetailController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.CompanyName = $.session.get('CompanyName');
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
    //Single Quote validation //
    $scope.onTextBoxKeyPress = function (event) {
        //
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();

            return false;
        }
    }
    var funPlaceholderReset = function () {


        var element = document.getElementById("thedata");
        element.className = '';
        element.innerHTML = "BookedDate";
    }
    //---Order No dropdown -----//
    //Get Discount Details From DataBase and Bind it in DropDownlist
    //$http({
    //    url: vUrl + "courierDetails/GetSalesOrder",
    //    method: 'GET',
    //    headers: {
    //        "Content-Type": JSON
    //    }

    //}).then(function (response) {

    //    $scope.CourierDetails = response.data;
    //}).catch(function (response) {

    //});

    //--Dropdown ---//

    $scope.ddlCotChange = function (MemberId) {
        
        $http({
            url: vUrl + "courierDetails/GetOrderDetail",
            method: 'GET',
            params: { MemberId: MemberId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            $scope.OrderDetails = response.data;
            

        }).catch(function (response) {
            
        });
    }

    $http({
        url: vUrl + "courierDetails/GetMemberDetails",
        method: 'GET',
        //params: {CategoryId:CategoryId},
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.MemberDetails = response.data;
        

    }).catch(function (response) {
    });
    $scope.ShowSave = true;
    $scope.Show = false;
    $scope.cor = true;
    $scope.msg = "";
    $scope.msgStatus = "";
    var ee = document.getElementById("showLeftPush1");
    ee.style.display = 'none';
    //------Bind Grid--------//
    $scope.BindGrid = function () {

        $http({
            url: vUrl + "courierDetails/GetCourierDetails",
            method: 'GET',

            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {

            
            $scope.allItems = response.data;
            $scope.sort('name');

        }).catch(function (response) {
            
        });
    }
    $scope.BindGrid();
    //----save-----//
    $scope.Save = function () {
        
        $scope.msg = "";
        $scope.msgStatus = "";
        var currentdate = new Date((new Date()).setHours(0, 0, 0, 0));
        var vBookedDate = $scope.Courier.BookedDate;
        var OrderDate = $scope.OrderDate;

        //var vOrderDate = new Date(result["0"].OrderDate);
        //vOrderDate = Date.parse.OrderDate();
        //vBookedDate = Date.parse.BookedDate();
        if ($scope.Courier.MemberId == "" || $scope.Courier.MemberId == undefined || $scope.Courier.MemberId == null) {
            $scope.msg = CourierDetailMessage(1); //'Please select the Member Name';
        }
        if ($scope.Courier.SalesOrderId == "" || $scope.Courier.SalesOrderId == undefined || $scope.Courier.SalesOrderId == null) {
            $scope.msg = CourierDetailMessage(2); //'Please select the sales order';
        }
        if ($scope.Courier.CourierName == "" || $scope.Courier.CourierName == undefined || $scope.Courier.CourierName == null) {
            $scope.msg = CourierDetailMessage(3);//'Please select the courier Name';
        }
        if ($scope.Courier.CourierNo == "" || $scope.Courier.CourierNo == undefined || $scope.Courier.CourierNo == null) {
            $scope.msg = CourierDetailMessage(4); //'Please Enter the CourierNo';
            return false;
        }
        if ($scope.Courier.BookedDate == "" || $scope.Courier.BookedDate == undefined || $scope.Courier.BookedDate == null) {
            $scope.msg = CourierDetailMessage(5); //'Please Enter the Booked Date';
            return false;
        }
        if ($scope.Courier.Description == "" || $scope.Courier.Description == undefined || $scope.Courier.Description == null) {
            $scope.msg = CourierDetailMessage(6); //'Please Enter the Description';
            return false;
        }
        if (vBookedDate > currentdate) {
            $scope.msg = 'Please dont choose a future date';
            return false;

        }
        if (vBookedDate < OrderDate) {
            $scope.msg = 'Please choose a date inbetween the order date and current date';
            return false;
        }
        //var vCurrentdate = "";
        ////
        //if ($scope.Courier.BookedDate <= OrderDate && $scope.Courier.BookedDate >= Currentdate) {
        //   $scope.msg = 'Please enter a valid date';
        //   return false;

        //}
        //var vdate = "";
        //if (BookedDate <= OrderDate && BookedDate >= date) {
        //    $scope.msg = 'Please enter a valid date';
        //    return false;
        //}

        var Courier = $scope.Courier;



        
        $http({
            url: vUrl + "courierDetails/InsertcourierDetails",
            dataType: 'json',
            method: 'POST',
            data: Courier,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            

            var vExist = response.data;
            if (vExist == "Exist") {
                $scope.msg = "This Courier   Number already exists";
            }
            else {
                $scope.BindGrid();
                //$scope.getorderdate(SalesOrderId);
                $scope.cor = true;
                $scope.msgStatus = CourierDetailMessage(7); //"Courier Details Added successfully";

                $scope.Courier.SalesOrderId = "";
                // $scope.Courier.CourierDetailId = "";
                $scope.Courier.CourierName = "";
                $scope.Courier.MemberId = "";
                $scope.Courier.MemberName = "";

                $scope.Courier.CourierNo = "";
                $scope.Courier.Description = "";
                $scope.Courier.BookedDate = "";
                $scope.OrderDate = "";

            }
        }).catch(function (response) {
        });
    }
    $scope.Clear = function () {
        //
        $scope.BindGrid();
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Courier.CourierName = "";
        $scope.Courier.CourierDetails = "";
        $scope.Courier.CourierNo = "";
        $scope.Courier.Description = "";
        $scope.Courier.BookedDate = "";
        $scope.Courier.SalesOrderId = "";
        $scope.Courier.MemberId = "";
        $scope.Courier.MemberDetails = "";
        $scope.ShowSave = true;
    }
    //Pagination//
    var vPageCount = $.session.get('GridSizeAdmin');
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

    //----------------Pagination Ending--------------//
    //------------Sorting---------------//
    $scope.column = 'name';

    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function (col) {
        $scope.column = col;
        if ($scope.reverse) {
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up1';
        } else {
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down1';
        }
    };
    // remove and change class
    $scope.sortClass = function (col) {
        if ($scope.column == col) {
            if ($scope.reverse) {
                return 'arrow-down1';
            } else {
                return 'arrow-up1';
            }
        } else {
            return '';
        }
    }
    $scope.Search = function () {
        
        var vdata = $scope.Courier.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid();
        }
    }
    var GetSearch = function (vSearch) {
        
        $http({
            url: vUrl + "courierDetails/GetSearch",

            method: "GET",
            params: { Search: vSearch },
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
    //Export//
    $scope.ExportData = function () {
        //
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:SubCategory>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");


        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;


        a.download = 'CourierDetail.xls';
        a.click();
    };

    $scope.getsalesorderchange = function (SalesOrderId) {
        // 
        // var vSalesOrderId = $scope.SalesOrderId;
        // var Courier = $scope.Courier;
        // $scope.Courier = response.data;

        $scope.getorderdate(SalesOrderId);
        //if (response.data.length != 0) {
        $http({
            url: vUrl + "courierDetails/Getsalesorderchange",
            method: 'GET',
            params: { SalesOrderId: SalesOrderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
             
            var result = response.data;
            if (response.data.length == 0) {
                $scope.ShowSave = true;
                $scope.Courier.CourierName = "";
                $scope.Courier.Description = "";
                $scope.Courier.CourierNo = "";
                $scope.Courier.BookedDate = "";
            }
            else {


                //$scope.Courier = response.data;
                var vCourierDetailId = result["0"].CourierDetailId;


                var vSalesOrderId = result["0"].SalesOrderId;
                var vOrderNo = result["0"].OrderNo;
                var vMemberId = result["0"].MemberId;
                var vMemberName = result["0"].MemberName;
                var vMemberId = result["0"].MemberId;
                var vCourierName = result["0"].CourierName;
                //var vBookedDate = result["0"].BookedDate;
                var vCourierName = result["0"].CourierName;
                var vDescription = result["0"].Description;
                var vCourierNo = result["0"].CourierNo;

                var vBookedDate = new Date(result["0"].BookedDate);


                $scope.Courier.HiddenCourierDetailId = vCourierDetailId;
                $scope.Courier.OrderNo = vOrderNo;
                $scope.Courier.MemberName = vMemberName;
                $scope.Courier.CourierName = vCourierName;
                $scope.Courier.Description = vDescription;
                $scope.Courier.CourierNo = vCourierNo;
                $scope.Courier.BookedDate = vBookedDate;

                //$scope.Courier = { MemberId: vMemberId, SalesOrderId: vSalesOrderId, OrderNo: vOrderNo, MemberName :vMemberName, CourierName: vCourierName, BookedDate: vBookedDate, Description: vDescription, CourierNo: vCourierNo, HiddenCourierDetailId: vCourierDetailId }

                
                $scope.ShowSave = false;




            }

            

        }).catch(function (response) {
            //
            $scope.ShowSave = true;
        });

        //}

        //else {
        //    $scope.ShowSave = true;
        //}
        //$scope.getsalesorderchange(SalesOrderId);
    }
    $scope.getorderdate = function (SalesOrderId) {
        

        $http({
            url: vUrl + "courierDetails/GetOrderDate",
            method: 'GET',
            params: { SalesOrderId: SalesOrderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            // 
            $scope.OrderDate = response.Date["0"].OrderDate;
            // $scope.OrderDate = response.data;
            //var OrderDate = new Date(result["0"].OrderDate);
        }).catch(function (response) {

        });

    }


});







