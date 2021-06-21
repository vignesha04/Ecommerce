'use strict';

ScBusinez.controller('SalesOrderDetailsController', function ($scope, $http, $window, $timeout) {
    $scope.SubDomain = $.session.get('SubDomain');

   var vUrl = $scope.SubDomain;
   //var vUrl = "http://localhost:56397/api/";
    $scope.Domain = $.session.get('Domain');
    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');
    
    $scope.CompanyName = $.session.get('CompanyName');
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

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');

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

    $scope.ShowNewOrder = true;
    $scope.ShowInprogressOrder = false;
    $scope.ShowTblNew = true;
    $scope.ShowTblInprogressed = false;
    $scope.ShowTblCompleted = false
    $scope.ShowTblCancelled = false;
    $scope.ShowTblCancel = false;
    $scope.CancelledComments = "";

    //$scope.Norecords = false;

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

    ////For SubMenu/////////////////////////////
    //var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    //vMenuDiscountShow.style.display = 'none';
    //var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    //var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    //vSettingsmenuShow.style.display = 'none';
    //var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    //vSettingsmenuShow1.style.display = 'none';

    //$scope.ShowHideSubMenu = function (menu, menuhide, menuhide1, menuhide2) {
    //    
    //    var x = document.getElementById(menu);
    //    var xHide = document.getElementById(menuhide);
    //    var xHide1 = document.getElementById(menuhide1);
    //    var xHide2 = document.getElementById(menuhide2);

    //    if (x.style.display == "block") {
    //        x.style.display = "none";
    //    }
    //    else {
    //        x.style.display = "block";
    //    }

    //    if (xHide.style.display == "block") {
    //        xHide.style.display = "none";
    //    }
    //    if (xHide1.style.display == "block") {
    //        xHide1.style.display = "none";
    //    }
    //    if (xHide2.style.display == "block") {
    //        xHide2.style.display = "none";
    //    }
    //}
    ////'menuDisShow1'
    //var vmenuShow1 = document.getElementById("menuShow1");
    //vmenuShow1.style.display = 'none';

    //var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    //vSettingsmenuShow1.style.display = 'none';

    //var vMenuSalMobile = document.getElementById("MenuSalMobile");
    //vMenuSalMobile.style.display = 'none';

    //var vmenuDisShow1 = document.getElementById("menuDisShow1");
    //vmenuDisShow1.style.display = 'none';

    //$scope.ShowHideSubMenu1 = function (menu, menu2, menuhide, menuhide1) {
    //    //
    //    var x = document.getElementById(menu);
    //    var x12 = document.getElementById(menu2);
    //    var xhide12 = document.getElementById(menuhide);
    //    var xhide13 = document.getElementById(menuhide1);
    //    x12.style.display = "none";
    //    xhide12.style.display = "none";
    //    xhide13.style.display = "none";

    //    if (x.style.display == "block") {
    //        x.style.display = "none";
    //    }
    //    else {
    //        x.style.display = "block";
    //    }
    //}

    //$scope.LogoutClick = function () {
    //    $.session.set('AdminId', "");
    //    window.location.href = '#!home';
    //}
    ////End//////////////////////////////////
    //$scope.toggle_visibility = function (id, id1) {
    //    // 
    //    var e = document.getElementById(id);
    //    var e1 = document.getElementById(id1);

    //    e.style.display = 'none';
    //    e1.style.display = 'block';

    //}
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

    $scope.ShowOrderItems = function (Orderno) {
        var x = document.getElementById(Orderno);
        
        if (x.style.display == "contents") {
            x.style.display = "none";
        }
        else {
            x.style.display = "contents";
        }
    }

    $scope.ShowOrderItemsComp = function (Orderno) {
        var x1 = document.getElementById(Orderno);
        
        if (x1.style.display == "contents") {
            x1.style.display = "none";
        }
        else {
            x1.style.display = "contents";
        }
    }
    $scope.ShowOrderItemsCancelled = function (Orderno) {
        var x2 = document.getElementById(Orderno);
        
        if (x2.style.display == "contents") {
            x2.style.display = "none";
        }
        else {
            x2.style.display = "contents";
        }
    }
    // ------------- Bindgrid-------------------//
    $scope.BindSalOrderOrderedGrid = function (Status) {
        $scope.allItems = [];
        
        $scope.SalesStatus = Status;
        $http({
            url: vUrl + "SalOrde/GetSalOrderDetails",

            method: 'GET',
            params: { strStatus: Status },
            headers: {
                "Content-Type": JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function (response) {
            

            if (response.data.length > 0) {

                if (Status == "Ordered") {
                    $scope.ShowNewOrder = true;
                    $scope.ShowInprogressOrder = false;
                    $scope.ShowTblNew = true;
                    $scope.ShowTblInprogressed = false;
                    $scope.ShowTblCompleted = false
                    $scope.ShowTblCancelled = false;
                    $scope.ShowTblCancel = false;
                }
                else if (Status == "ACCEPT") {
                    $scope.ShowNewOrder = false;
                    $scope.ShowInprogressOrder = true;
                    //$scope.ShowTblNew = true;
                    $scope.ShowTblNew = false;
                    $scope.ShowTblInprogressed = true;
                    $scope.ShowTblCompleted = false
                    $scope.ShowTblCancelled = false;
                    $scope.ShowTblCancel = false;
                }
                else if (Status == "SHIPPED") {
                    $scope.ShowNewOrder = false;
                    $scope.ShowInprogressOrder = false;
                    $scope.ShowTblNew = false;
                    $scope.ShowTblInprogressed = false;
                    $scope.ShowTblCompleted = true
                    $scope.ShowTblCancelled = false;
                    $scope.ShowTblCancel = false;
                }

                if (response.data == null) {
                    $scope.msg = AuthorizeMessages(1);
                }
                else {
                    $scope.allItems = response.data;
                    $scope.sort('name');
                }
            }

            else {


               // $scope.Norecords = true;
            }

           
            

        }).catch(function (response) {
        });
    }

 
    $http({
        url: vUrl + "IndexPage/GetSiteSettingConfiguration",
        method: 'GET',
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        
        var vResult = response.data;
        $scope.CurrencyType = vResult["0"].CurrencyType;
        vGridSizeClient = vResult["0"].GridSizeClient;
        $scope.CurrencyType = vCurrencyType;
    }).catch(function (response) {
    });


    $scope.ChangeInvoice = function (SalesOrderId) {
        var IncoiceNo = SalesOrderId;
        localStorage.setItem("Invoice", IncoiceNo);
        window.location.href = "#!SalesReport";
    };

    $scope.BindSalOrderOrderedGrid("Ordered");
    $scope.BindSalOrderCompletedGrid = function (Status) {
        $scope.allItems = [];
        
        $scope.SalesStatus = Status;
        $http({
            url: vUrl + "SalOrde/GetSalOrderCompletedDetails",
            method: 'GET',
            params: { strStatus: 'SHIPPED' },
            headers: {
                "Content-Type": JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function (response) {
            

            if (response.data.length > 0) {
                //$scope.Norecords = false;
                if (response.data == null) {
                    $scope.msg = AuthorizeMessages(1);
                }
                else {
                    $scope.allItems = response.data;
                    $scope.sort('name');
                }
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = true
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;
            }

            else {

                //$scope.Norecords = true;
            }


           

        }).catch(function (response) {
        });
    }

    $scope.BindSalOrderCancelledGrid = function (Status) {
        $scope.allItems = [];
        
        $scope.SalesStatus = Status;
        $http({
            url: vUrl + "SalOrde/GetAdminSalOrderCancelledDetails",

            method: 'GET',
            params: { strStatus: 'Cancelled' },
            headers: {
                "Content-Type": JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function (response) {
            

            if (response.data.length > 0) {
             //   $scope.Norecords = false;
                if (response.data == null) {
                    $scope.msg = AuthorizeMessages(1);
                }
                else {
                    $scope.allItems = response.data;
                    $scope.sort('name');
                }
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = true;
                $scope.ShowTblCancel = true;

            }

            else {

               // $scope.Norecords = true;
            }
         
        }).catch(function (response) {
        });
    }

    $scope.ChangeStatus = function (OrderId, Status) {
        $("#salesAccept").attr("disabled", true);
        
        $http({
            url: vUrl + "SalOrde/UpdateSalesStatus",
            dataType: 'json',
            method: 'POST',
            params: { OrderId: OrderId, Status: Status, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain},
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function (response) {
            
            if (response.data == "Authorization Failed") {
                $scope.msg = AuthorizeMessages(1);
                $("#salesAccept").attr("disabled", false);
            }
            else if (response.data == "Success") {
                $scope.BindSalOrderOrderedGrid(Status);
                $("#salesAccept").attr("disabled", false);
            }
        });
    }


    $scope.OpenPopUp = function (SalesOrderId) {
        
        document.getElementById('abc').style.display = "block";
        $scope.msgStatus = "";
        $scope.CancelledComments = "";
        $scope.SalesOrderIdForCancel = SalesOrderId;
    }

    $scope.ChangeCancel = function () {
        
        $("#cancelorder").attr("disabled", true);
        var vSalId = $scope.SalesOrderIdForCancel;
        var vCancelledComments = $scope.CancelledComments;
        

        $http({
            url: vUrl + "SalOrde/CancelOrder",
            dataType: 'json',
            method: 'POST',
            params: { OrderId: vSalId, Status: 'Cancelled', CancelledComments: vCancelledComments, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain  },
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function (response) {
            

            if (response.data == "Authorization Failed") {
                $scope.msg = AuthorizeMessages(1);
                $("#cancelorder").attr("disabled", false);
            }
            else if (response.data == "Success") {
                var result = response.data;
                $scope.ShowmsgStatus = true;
                $scope.msgStatus = "Order has been  Cancelled Successfully";
                $("#cancelorder").attr("disabled", false);

                $timeout(function () {
                    
                    $('#abc').modal('hide');


                }, 900);


                $http({
                    url: vUrl + "SalOrde/SendInvoiceMail",
                    dataType: 'json',
                    method: 'POST',
                    params: { SalesOrderId: vSalId },
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("AuthoToken")
                    }
                }).then(function (response) {
                    
                    if (response.data == "Authorization Failed") {
                        $scope.msg = AuthorizeMessages(1);
                        $("#cancelorder").attr("disabled", false);
                    }
                    else {
                        var vResult = response.data;
                        $("#cancelorder").attr("disabled", false);
                    }

                });

                $http({
                    method: "Get",
                    url: vUrl + "SalOrde/GetCompanyDetails",
                    headers: {
                        'Content-Type': JSON,
                        'Authorization': localStorage.getItem("AuthoToken")
                    }
                }).then(function (response) {
                    if (response.data == "Authorization Failed") {
                        $scope.msg = AuthorizeMessages(1);
                    }
                    else {
                        var result = response.data;
                        

                        var vCompanyName = result["0"].CompanyName;
                        var vEmailId = result["0"].EmailId;

                        $scope.CompanyName = vCompanyName;
                        var vAddress = "";

                        if (vEmailId != undefined && vEmailId != null && vEmailId != "") {
                            if (vAddress == "")
                                vAddress = " Email: " + vEmailId;
                            else
                                vAddress = vAddress + " Email: " + vEmailId;
                        }
                        $scope.EmailId = vAddress;
                    }
                }).catch(function (response) {
                    
                });

                $scope.BindSalOrderOrderedGrid("Ordered");
                $scope.SalesOrderIdForCancel = "";
            }
        });
    }
    $scope.div_hide = function () {
        document.getElementById('abc').style.display = "none";
    }

    $scope.TopButtonClick = function (Type) {
        $scope.SalesStatus = Type;
        if (Type == "Ordered") {
            $scope.BindSalOrderOrderedGrid("Ordered");
            
        }
        if (Type == "ACCEPT") {
            $scope.BindSalOrderOrderedGrid("ACCEPT");
            
        }

        if (Type == "SHIPPED") {
            $scope.BindSalOrderCompletedGrid("SHIPPED");
           
        }

        if (Type == "Cancelled") {
            $scope.BindSalOrderCancelledGrid("Cancelled");
           
        }
    }

    //--------------------------- Search Function --------------//
    $scope.SalesStatus = "Ordered";

    $scope.Search = function () {
        
        var Type = $scope.SalesStatus;
        var vdata = $scope.sal.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            if (Type == "Ordered") {
                searchDataOrder(vdata, Type);
                $scope.ShowNewOrder = true;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = true;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;
              //  $scope.ShowOrderItems(Orderno)

            }
            if (Type == "ACCEPT") {
                searchDataOrder(vdata, Type);
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = true;
                //$scope.ShowTblNew = true;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = true;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;
              //  $scope.ShowOrderItems(Orderno)
            }

            if (Type == "SHIPPED") {
                searchDataOrdercomplete(vdata, Type);
                // $scope.BindSalOrderCompletedGrid();
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = true
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;

            }

            if (Type == "Cancelled") {
                searchDataOrdercancel(vdata, Type);
                //$scope.BindSalOrderCancelledGrid();
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = true;
                $scope.ShowTblCancel = true;
            }

        }
        else {

            if (Type == "Ordered") {
                
                $scope.BindSalOrderOrderedGrid("Ordered");
                $scope.ShowNewOrder = true;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = true;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;
            }
            if (Type == "ACCEPT") {
                $scope.BindSalOrderOrderedGrid("ACCEPT");
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = true;
                //$scope.ShowTblNew = true;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = true;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;
            }

            if (Type == "SHIPPED") {
                $scope.BindSalOrderCompletedGrid("SHIPPED");
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = true
                $scope.ShowTblCancelled = false;
                $scope.ShowTblCancel = false;
            }

            if (Type == "Cancelled") {
                $scope.BindSalOrderCancelledGrid("Cancelled");
                $scope.ShowNewOrder = false;
                $scope.ShowInprogressOrder = false;
                $scope.ShowTblNew = false;
                $scope.ShowTblInprogressed = false;
                $scope.ShowTblCompleted = false
                $scope.ShowTblCancelled = true;
                $scope.ShowTblCancel = true;
            }
        }
    }


    var searchDataOrder = function (vSearch, vType, vStatus) {
        
        $scope.allItems = [];
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl+"SalOrder/GetSearch",
            method: "GET",
            params: { Search: vSearch, Type: vType, Status: vStatus },
            headers: {
                'Content-Type': JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function mySuccess(response) {
            
            if (response.data == null) {
                $scope.msg = AuthorizeMessages(1);
            }
            else {
                $scope.data = response.data;
                $scope.allItems = response.data;
                $scope.sort('name');
            }
            }).catch(function myError(response) {
                
        });
    };
    //$scope.BindSalOrderCompletedGrid();
    var searchDataOrdercancel = function (vSearch, vType, vStatus) {
        $scope.allItems = [];
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl+"SalOrder/GetSearchCancel",
            method: "GET",
            params: { Search: vSearch, Type: vType, Status: vStatus, },
            headers: {
                'Content-Type': JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function mySuccess(response) {
            if (response.data == null) {
                $scope.msg = AuthorizeMessages(1);
            }
            else {
                $scope.data = response.data;
                $scope.allItems = response.data;
                $scope.sort('name');
            }
        }).catch(function myError(response) {
        });
    };
    //$scope.BindSalOrderCancelledGrid();
    var searchDataOrdercomplete = function (vSearch, vType, vStatus) {
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl+"SalOrder/GetSearchComplete",
            method: "GET",
            params: { Search: vSearch, Type: vType, Status: vStatus, },
            headers: {
                'Content-Type': JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function mySuccess(response) {
            if (response.data == null) {
                $scope.msg = AuthorizeMessages(1);
            }
            else {
                $scope.data = response.data;
                $scope.allItems = response.data;
                $scope.sort('name');
            }
        }).catch(function myError(response) {
        });
    };
    //$scope.BindSalOrderCompletedGrid();
    $scope.UpdateProductStockCount = function (SalesOrderId) {
        $http({
            url: vUrl + "ProductStock/UpdateProductStockCount",
            method: "POST",
            params: { SalesOrderId: SalesOrderId },
            headers: {
                'Content-Type': JSON,
                'Authorization': localStorage.getItem("AuthoToken")
            }
        }).then(function mySuccess(response) {
            if (response.data == "Authorization Failed") {
                $scope.msg = AuthorizeMessages(1);
            }
            else if (response.data == "Success") {
                $scope.data = Response.data;
            }
        }).catch(function myError(response) {

        });


    };

    //-----------------------Search Function--------------//


    //----------------Pagination Starting--------------//
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

    //---------------------   export funtion   ---------------------//

    $scope.exportData = function () {
        // 
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:SalesOrder>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");


        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');

        a.href = url;
        a.download = 'SalesOrder.xls';
        a.click();
    };

});