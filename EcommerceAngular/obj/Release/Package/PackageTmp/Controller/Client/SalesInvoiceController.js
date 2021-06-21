'use strict'; Ecom.controller('SalesInvoiceController', function($scope, $http, $rootScope, $location, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $window.scrollTo(0, 0);
    $scope.loader = true;
    var vCartItem = localStorage.getItem("CartItem");
    $scope.CompanyName = $.session.get('CompanyName');
    $scope.CouponApplicable = $.session.get('CouponApplicable');
    $scope.Domain = $.session.get('Domain');
    var vCount = localStorage.getItem("Count");
    var vAmount = localStorage.getItem("Amount");
    var vAmount1 = localStorage.getItem("Amount");
    var vtotalamt = localStorage.getItem("totalamount");
    var vrazorpay_payment_id = localStorage.getItem("razorpay_payment_id");
    var vDeliveryAddress = localStorage.getItem("DeliveryAddress");
    var vDeliveryaddressstate = localStorage.getItem("Deliveryaddressstate");
    var vDeliveryCharges = localStorage.getItem("DeliveryCharges");
    var vCoupounDiscountAmt = localStorage.getItem("CoupounDiscountAmt");
    if ($scope.CouponApplicable == "1"){

        if (vCoupounDiscountAmt != null || vCoupounDiscountAmt != undefined || vCoupounDiscountAmt != "") {

            var CoupounAmt = vCoupounDiscountAmt;
            $scope.CoupounDiscountAmt = CoupounAmt;
        }
        else {

            var CoupounAmt = 0;
        }
    }
    else {
        var CoupounAmt = 0;
    }
   
    var vSubtotal = localStorage.getItem("Subtotal");
    $scope.SubtotalAmt = vSubtotal;
    var vMemberId = $.session.get('clientMemberId');
    var vSalOrderNo = $.session.get('SalOrderNo');
    var vCompanyId = $.session.get('CompanyId');
    $scope.Totalordervalue = Number(vtotalamt) + Number(vDeliveryCharges);
    var vOfferType = localStorage.getItem("OfferType"); var vDiscountAmt = 0;
    var BindDeliveryCharges = function() {
        var vTotQty = 0;
        var vCart = localStorage.getItem("CartItem");
        $scope.CartItem = JSON.parse(vCart);    
        vTotQty = $scope.TotalAmount1;
        $http({
            url: vUrl + "IndexPage/GetProductDelCharges",
            method: 'GET',
            params: { strCount: vAmount1 },
            headers: { "Content-Type": JSON }
        }).then(function(response) {
            debugger;
            var vData = response.data;
            var vDCharge = 0;
            if (response.data.length == 0) {
                $http({
                    url: vUrl + "IndexPage/GetProductDelCharges1",
                    method: 'GET',
                    params: { strCount: vTotQty },
                    headers: { "Content-Type": JSON }
                }).then(function(response) {

                    vData = response.data;
                    if (response.data.length != 0) {
                        $scope.DeliveryCharges = Number(vData["0"].Price);
                        vDCharge = vData["0"].Price;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        $scope.TotalAmount = Number($rootScope.TotalAmount) + Number(vData["0"].Price);                     
                    }
                    else {
                        $scope.DeliveryCharges = 0;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                    }
                });
            }
            else {
                $scope.Deliverycharge = true;
                $scope.Deliverych = vData["0"].Price;
                vDCharge = vData["0"].Price;
                localStorage.setItem("DeliveryCharges", vDCharge);
                $scope.DeliveryCharges = Number(vData["0"].Price);
                $scope.TotalAmount = Number($rootScope.TotalAmount) + Number(vData["0"].Price);
            }

        }).catch(function(response) {
        });
    }
    BindDeliveryCharges();
    var vDeliveryAddressstate = "";
    var vCompAddressState = '';
    //var vToken = $location.search().token;
    //
    //$http({
    //    url: vUrl + "CartPayment/PayPalCheckOutTest",
    //    dataType: 'json',
    //    method: 'POST',
    //    params: { sToken: vToken, TotalAmount: $scope.TotalAmount },
    //    headers: {
    //        "Content-Type": "application/json"
    //    }
    //}).then(function (response) {
    //    
    //    var vRes = response.data;
    //    if (vRes != "Error") {//Payment Success

    //    }
    //    else {//Payment Failed
    //        $scope.loader = false;
    //        $scope.Heading = "Transaction Failed. Please try again.";

    //        $timeout(function () {
    //            window.location.href = "#!ShoppingCart";
    //        }, 1000);
    //    }
    //    //window.location.href = vOrderno;
    //}).catch(function (response) {
    //    
    //});
    if (vOfferType == "Price") {
        vDiscountAmt = localStorage.getItem("CopounAmount");
        $scope.DiscountAmount = vDiscountAmt;
    }
    $scope.aHomeClick = function() {
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined && vclientMemberId != "undefined") {
            var vLocation = "#!HomePage/" + vclientMemberId;
            window.location.href = vLocation;
        }
        else {
            var vLocation = "#!HomePage/0";
            window.location.href = vLocation;
        }
    }

    $scope.Heading = "Your Order has been Placed Successfully your Order Id is : " + $scope.SalOrderNo + " Thank You for Your Order";
    $scope.ShowMemberName = true;
    $scope.loader = false;
    $http({
        url: vUrl + "IndexPage/GetSiteSettingConfiguration",
        method: 'GET',
        headers: { "Content-Type": JSON }
    }).then(function(response) {

        var vResult = response.data;
        var vCurrencyType = vResult["0"].CurrencyType;
        var vGridSizeClient = vResult["0"].GridSizeClient;
        $scope.CurrencyType = vCurrencyType;
    }).catch(function(response) {
    });


    $scope.ShowGST = false;
    $scope.SalOrderNo = vSalOrderNo;
    if (vCartItem != undefined && vCartItem != null && vCartItem != "[]") {
        $scope.CartItems1 = JSON.parse(vCartItem);
        var vTotAmount = Number(vAmount1);
        //$scope.TotalAmount = vTotAmount;
        vDeliveryCharges = localStorage.getItem("DeliveryCharges");
        if (vDeliveryCharges == undefined || vDeliveryCharges == null || vDeliveryCharges == "")
            vDeliveryCharges = 0;

        if (vrazorpay_payment_id == undefined || vrazorpay_payment_id == null || vrazorpay_payment_id == "")
            vrazorpay_payment_id = "0";
        //$scope.DeliveryCharges = vDeliveryCharges;
        var vitm = $scope.CartItems1;

        $http({
            url: vUrl + "SalesDetail/InsertSalesOrder",
            dataType: 'json',
            method: 'POST',
            data: vDeliveryAddress,
            params: { strOrderNo: vSalOrderNo, strMemberId: vMemberId, decTotalAmount: $scope.TotalAmount, decDeliveryCharge: vDeliveryCharges, razorpay_payment_id: vrazorpay_payment_id, vCoupounAmt: CoupounAmt, Subtotal: vSubtotal },
            headers: { "Content-Type": "application/json" }
        }).then(function(response) {

            var vResult = response.data;
            if (vResult != "") {
                var vId = vResult.split('|');
                $scope.SalOrderNo = vId[1];
                $scope.Heading = "Your Order has been Placed Successfully your Order Id is : " + $scope.SalOrderNo + " Thank You for Your Order";
                $scope.ShowMemberName = true;
                $scope.loader = false;
                $http({
                    url: vUrl + "SalesDetail/SendInvoiceMail",
                    dataType: 'json',
                    method: 'POST',
                    data: JSON.stringify(vitm),
                    params: { strOrderNo: vId[1], strMemberId: vMemberId, decTotalAmount: $scope.TotalAmount, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                    headers: { "Content-Type": "application/json" }
                }).then(function(response) {

                    var vResult = response.data;
                });
                $http({
                    url: vUrl + "SalesDetail/InsertSalesOrderItems",
                    dataType: 'json',
                    method: 'POST',
                    data: JSON.stringify(vitm),
                    params: { strOrderId: vId[0] },
                    headers: { "Content-Type": "application/json" }
                }).then(function(response) {
                    var order = [];
                    var vCount = 0;
                    var vAmount1 = 0;
                    $scope.CartItemss = order;
                    localStorage.setItem("CartItem", JSON.stringify($scope.CartItemss));
                    var vCartItems = localStorage.getItem("CartItem");
                    localStorage.setItem("Amount", vAmount1);
                    localStorage.setItem("Count", vCount);

                    localStorage.setItem("CoupounDiscountAmt", vAmount1);
                    localStorage.setItem("Subtotal", vAmount1);
                    //BindDeliveryCharges();
                    $rootScope.CartItems = JSON.parse(vCartItems);
                    $rootScope.TotalAmount = vAmount1;
                    $rootScope.Subtotal = vAmount1;
                    $rootScope.CoupounDiscountAmt = vAmount1;
                    $rootScope.Count = vCount;

                }).catch(function(response) { });
            }
            else { }
        }).catch(function(response) { });
    }
    $http({
        method: "Get",
        url: vUrl + "SalesDetail/GetCompanyDetails",
        Headers: { 'Content-Type': JSON }
    }).then(function(response) {
        var result = response.data; 
        $scope.CompanyName = result["0"].CompanyName;
        $scope.CompanyAddressLine1 = result["0"].AddressLine1;
        $scope.CompanyAddressLine2 = result["0"].AddressLine2;
        $scope.CompanyCity = result["0"].City;
        $scope.CompanyState = result["0"].State;
        vCompAddressState = result["0"].State;
        $scope.CompanyCountry = result["0"].Country;
        $scope.CompanyPinCode = result["0"].PinCode;
        $scope.CompanyGSTNo = result["0"].GSTNo;
        $scope.CINno = result["0"].CINno;
        $scope.CompanyPhoneNo = result["0"].PhoneNo;
        $scope.CompanyEmailId = result["0"].EmailId;
        $scope.InvoiceLogo = result["0"].InvoiceLogo;
        if ($scope.CompanyGSTNo != '' && $scope.CompanyGSTNo != null && $scope.CompanyGSTNo != undefined) {
            $scope.ShowGST = true;
        }
        else
            $scope.ShowGST = false;
    }).catch(function(response) {

    });
    $http({
        method: "Get",
        url: vUrl + "SalesDetail/GetMemberDetails",
        params: { strMemberId: vMemberId },
        Headers: { 'Content-Type': JSON }
    }).then(function(response) {
        var result = response.data;
        $scope.MemberName = result["0"].MemberName;
        $scope.BillingAddressLine1 = result["0"].AddressLine1;
        $scope.BillingAddressLine2 = result["0"].AddressLine2;
        $scope.BillingCity = result["0"].City;
        $scope.BillingState = result["0"].State;
        $scope.BillingPinCode = result["0"].PinCode;
        $scope.BillingPhoneNo = result["0"].ContactNo;
        $scope.BillingEmailId = result["0"].EmailId;
    }).catch(function(response) {

    });

    var vDAdderss = JSON.parse(vDeliveryAddress);
    if (vDAdderss != undefined && vDAdderss != null && vDAdderss != "" && vDAdderss != "[]") {
        $scope.DelMemberName = vDAdderss.MemberName;
        $scope.DelAddressLine1 = vDAdderss.AddressLine1;
        $scope.DelAddressLine2 = vDAdderss.AddressLine2;
        $scope.DelCity = vDAdderss.City;
        $scope.DelState = vDAdderss.State;
        vDeliveryAddressstate = vDAdderss.State;
        $scope.DelPinCode = vDAdderss.PinCode;
        $scope.DelLandmark = vDAdderss.Landmark;
        $scope.DelContactNo = vDAdderss.ContactNo;
        $scope.DelEmailId = vDAdderss.EmailId;
       

        var vDelAddress = '';
        $scope.DelMemberAddress = vDelAddress;
        var vdelAddress = [];
        var vCount = 0;
        var vAmount = 0;
        $scope.vdelAddress = vdelAddress;
        localStorage.setItem("DeliveryAddress", JSON.stringify($scope.vdelAddress));
        //$scope.loader = false;
    }
    $scope.Showinvoice = false;
    $scope.SGSTshow = false;
    $scope.CGSTshow = false;
    $scope.IGSTshow = false;
    $scope.SGSTshowTD = false;
    $scope.CGSTshowTD = false;
    $scope.IGSTshowTD = false;
    $scope.SGSTshow1 = false;
    $scope.CGSTshow1 = false;
    $scope.IGSTshow1 = false;
    $scope.SGSTshowTD1 = false;
    $scope.CGSTshowTD1 = false;
    $scope.IGSTshowTD1 = false;
    $http({
        url: vUrl + "SalesInvoice/GetDiscountDetails",
        method: "GET",
        headers: {
            'Content-Type': JSON
        }

    }).then(function mySuccess(response) {

        var result = response.data;
        var Discount = result["0"].DiscountApplicable;
        if (Discount == "1") {
            $scope.Discountshow = true;
        }
        else {
            $scope.Discountshow = false;
        }
        var Coupon = result["0"].CouponApplicable;
        if (Coupon == "1") {
            $scope.Couponshow = true;
        }
        else {
            $scope.Couponshow = false;
        }
        var Tax = result["0"].FacebookSignup;
        if (Tax == "1") {
            //$scope.Taxshow = true;

            if (vDeliveryaddressstate == vCompAddressState) {
                $scope.SGSTshow = true;
                $scope.CGSTshow = true;
                $scope.IGSTshow = false;
                $scope.SGSTshowTD = true;
                $scope.CGSTshowTD = true;
                $scope.IGSTshowTD = false;
                $scope.SGSTshow1 = true;
                $scope.CGSTshow1 = true;
                $scope.IGSTshow1 = false;
                $scope.SGSTshowTD1 = true;
                $scope.CGSTshowTD1 = true;
                $scope.IGSTshowTD1 = false;
            }
            else {
                $scope.SGSTshow = false;
                $scope.CGSTshow = true;
                $scope.IGSTshow = true;
                $scope.SGSTshowTD = false;
                $scope.CGSTshowTD = true;
                $scope.IGSTshowTD = true;
                $scope.SGSTshow1 = false;
                $scope.CGSTshow1 = true;
                $scope.IGSTshow1 = true;
                $scope.SGSTshowTD1 = false;
                $scope.CGSTshowTD1 = true;
                $scope.IGSTshowTD1 = true;
            }
        }
        else {
            $scope.SGSTshow = false;
            $scope.CGSTshow = false;
            $scope.IGSTshow = false;
            $scope.SGSTshowTD = false;
            $scope.CGSTshowTD = false;
            $scope.IGSTshowTD = false;
            $scope.SGSTshow1 = false;
            $scope.CGSTshow1 = false;
            $scope.IGSTshow1 = false;
            $scope.SGSTshowTD1 = false;
            $scope.CGSTshowTD1 = false;
            $scope.IGSTshowTD1 = false;
        }
    }).then(function myError(response) {
    });

    $http({

        url: vUrl + "SalesReport/GetTermsandContionInvoice",
        method: 'GET',
        params: { CompanyDetailId: 1 },
        headers: {
            "Content-Type": JSON
        }
    }).then(function(Response) {
        if (Response.data.length != 0) {
            $scope.salesinvoice = Response.data
            $scope.InvoiceTermsAndCondition = Response.data["0"].InvoiceTermsAndCondition;
            $scope.loader = false;
        }
        $scope.loader = false;
    }).catch(function(response) {

    });


    $scope.GenarateInvoice = function() {
        if ($scope.SalOrderNo != undefined && $scope.SalOrderNo != null && $scope.SalOrderNo != "") {
            $http({
                url: vUrl + "Clientorder/GetCompanyDetails",
                method: 'GET',
                params: { CompanyDetailId: 1 },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function(Response) {
                $scope.ShowSalesreport = false;
                $scope.ShowSalesreportmobile = true;
                $scope.CompanyName = Response.data["0"].CompanyName;
                $scope.GSTNo = Response.data["0"].GSTNo;
                $scope.CINno = Response.data["0"].CINno;
                $scope.InvoiceLogo = Response.data["0"].InvoiceLogo;
                $scope.EmailId = Response.data["0"].EmailId;
                $scope.PhoneNo = Response.data["0"].PhoneNo;
                $scope.AddressLine1 = Response.data["0"].AddressLine1;
                $scope.AddressLine2 = Response.data["0"].AddressLine2;
                $scope.City = Response.data["0"].City;
                $scope.State = Response.data["0"].State;
                $scope.Country = Response.data["0"].Country;
                $scope.PinCode = Response.data["0"].PinCode;
            }).catch(function(response) {
            });

            $http({
                url: vUrl + "Clientorder/GetTermsandContionInvoice",
                method: 'GET',
                params: { CompanyDetailId: 1 },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function(Response) {
                $scope.salesinvoice = Response.data
                $scope.InvoiceTermsAndCondition = Response.data["0"].InvoiceTermsAndCondition;
            }).catch(function(response) {
            });
            $http({
                url: vUrl + "Clientorder/GetSalesReportDetails",
                method: 'GET',
                params: { SalesOrderId: $scope.SalOrderNo, CompanyDetailId: 1 },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function(Response) {
                $scope.SalOrderItem = Response.data["0"].OrderItems;
                $scope.ShowPrint = true;
                $scope.MemberName = Response.data["0"].MemberName;
                $scope.DeliveryContactNo = Response.data["0"].DeliveryContactNo;
                $scope.DeliveryAddressLine1 = Response.data["0"].DeliveryAddressLine1;
                $scope.DeliveryAddressLine2 = Response.data["0"].DeliveryAddressLine2;
                $scope.DeliveryCity = Response.data["0"].DeliveryCity;
                $scope.DeliveryState = Response.data["0"].DeliveryState;
                $scope.DeliveryPinCode = Response.data["0"].DeliveryPinCode;
                $scope.DeliveryEmail = Response.data["0"].DeliveryEmail;
                $scope.OrderNo = Response.data["0"].OrderNo;
                $scope.OrderDate = Response.data["0"].OrderDate;
                $scope.Amoount = Response.data["0"].Amoount;
                $scope.CurrencyType = Response.data["0"].CurrencyType;            
            }).catch(function(response) {
            });
        }
        else {
        }
    }

    $scope.printPage1 = function(id) {
        var html = "<html>";
        html += document.getElementById(id).innerHTML;
        html += "</html>";
        var printWin = window.open('width=100,height=100');
        printWin.document.write(html);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
    }


    $scope.printPage = function(id) {
        $scope.Showinvoice = true;
        var html = "<html>";
        html += document.getElementById(id).innerHTML;
        html += "</html>";
        var printWin = window.open('', '', 'left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
        printWin.document.write(html);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
    }
});