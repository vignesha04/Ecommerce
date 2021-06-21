var vTotalamountvalue = 0;
var vTotalDiscountvalue = 0;
var ProductList = [];
var vCartItem = ProductList;
localStorage.setItem("BulkItems", JSON.stringify(vCartItem));
var vorderItem = localStorage.getItem("BulkItems");

'use strict';

ScBusinez.controller('BulkOrderController', function ($scope, $http, $timeout, $window) {

    $scope.SubDomain = $.session.get('SubDomain');
    localStorage.setItem("Url", $scope.SubDomain);
    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    $scope.CompanyName = $.session.get('CompanyName');
    $scope.Domain = $.session.get('Domain');
    $scope.PaymentGateway = $.session.get('PaymentGateway');
    $scope.PaymentGatewayKey = $.session.get('PaymentGatewayKey'); 
    $scope.GstNo = $.session.get('GSTNo');

    var vInvoice = 0;

    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

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
    
    

    var vCompanyId = $.session.get('CompanyId');

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
            $scope.Taxshow = true;
        }
        else {
            $scope.Taxshow = false;
        }
    }).then(function myError(response) {

    });

    $scope.invoicenumber = "";
    $scope.Loginusername = "";
    $scope.InvoiceDate1 = "";
    $scope.BillType = "";
    $scope.OrdervalueAmount = "";
    $scope.TotalOrdervalue = "";
    $scope.AmountRecived = "";
    $scope.BalanceTender = "";
    $scope.OrderDiscountAmt = "";
    $scope.SGSTTaxAmt = "";
    $scope.CGSTTaxAmt = "";
    $scope.SubTotalAmt = "";
    $scope.GetInvoiceNumber = function () {
        debugger;
       

        $http({
            url: vUrl + "InvoiceNumber/GetInvoiceNumber",
            method: 'GET',
            params: { CompanyId: vCompanyId },
            headers: { "Content-Type": JSON }
        }).then(function mySuccess(response) {
            debugger;
            var vInvoicenumber = response.data["0"].InvoiceNumber1; 
            var vinvoiceprefix = response.data["0"].invoiceprefix;
            var vInvoice = (vinvoiceprefix + vInvoicenumber);
            $scope.invoicenumber = vInvoice;
           
            var today = new Date();

            var date1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            $scope.InvoiceDate1 = date1;
            var vloginuser = vLoginType;
            $scope.Loginusername = vloginuser;
            var vGstno = $scope.GstNo;
          
            $scope.report = { Invoicenumber: vInvoice, SalesPerson: vloginuser, InvoiceDate: date1, GstNo: vGstno};
        }).catch(function (response) { });
    }
    $scope.GetInvoiceNumber();
    document.getElementById("Order").style.display = "None";
    $scope.Close = function () {
        document.getElementById("Order").style.display = "None";
      window.location.reload();
    }

    var MemberId = ""
    $scope.GetCustomerDetail = function () {
        debugger;
        var vMobilenumber = $scope.report.ContactNo;

        $http({
            url: vUrl + "CustomerDetails/GetCustomerDetails",
            method: 'GET',
            params: { Mobilenumber: vMobilenumber },
            headers: { "Content-Type": JSON }
        }).then(function mySuccess(response) {
            debugger;
            if (response != null) {

                var result = response.data;
                var vMemberName = result["0"].MemberName;
                var vContactNo = result["0"].ContactNo;
                var vEmailId = result["0"].EmailId;
                var vAddressLine1 = result["0"].AddressLine1;
                var vAddressLine2 = result["0"].AddressLine2;
                var vCity = result["0"].City;
                var vState = result["0"].State;
                var vPinCode = result["0"].PinCode;
                $scope.MemberId = result["0"].MemberId;
                $("#CustomerName").val(vMemberName);
                $("#AddressLine1").val(vAddressLine1);
                $("#AddressLine2").val(vAddressLine2);
                //$scope.report = {
                //    MemberName: vMemberName,
                //    ContactNo: vContactNo,
                //    EmailId: vEmailId,
                //    AddressLine1: vAddressLine1,
                //    AddressLine2: vAddressLine2,
                //    City: vCity,
                //    State: vState,
                //    PinCode: vPinCode
                //};


            }
            else {

                $scope.report.AddressLine1 = "";
                $scope.report.AddressLine2 = "";
                $scope.report.MemberName = "";
            }

        }).catch(function (response) { });
    }
    var vProductId = "";

    $scope.getProductVariance = function () {
        debugger;
        var x = document.getElementById("ProductCodetxt1").value;
        vProductId = x;


        $http({
            url: vUrl + "ProductDetails/getProductVariance",
            method: 'GET',
            params: { ProductId: vProductId, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            debugger;
            //$scope.SubCategoryDetails = Response.data;
            $("#VarianceTypetxt1").val(response.data["0"].VarianceType);
            $("#ProductNametxt1").val(response.data["0"].Title);
            $("#sellingPrice1").val(response.data["0"].sellingPrice);
            $("#VariancePrice1").val(response.data["0"].VariancePrice);
            $("#DISCOUNT1").val(response.data["0"].VariancePrice - response.data["0"].sellingPrice);

            var x = document.getElementById("ProductCodetxt1").value;
            vProductId = x;

           

        }).catch(function (response) {
            debugger;
        });
    }

    var vTotalamountvalue = 0;
    $scope.GetQuntity = function (QUANTITY) {
        debugger;
        $scope.Qty = QUANTITY;
        var qty = $scope.Qty;
        var vSellingPrice = $("#sellingPrice1").val();
        var vProductId = $("#ProductCodetxt1").val();
        var vTitle = $("#ProductNametxt1").val();
        var vVariancetype = $("#VarianceTypetxt1").val();
        var vQty = $("#QUANTITY1").val();
        var vVariancePrice = $("#VariancePrice1").val();
        var vTaxPercentage = $("#TaxPercentage1").val();
        var vDISCOUNT = $("#DISCOUNT1").val();

        $("#TotalAmount1").val(qty * vSellingPrice);
        vTotalamountvalue = $("#TotalAmount1").val();
        $("#GrandTotal").val(vTotalamountvalue);



        vCartItem = [{
            ProductId: vProductId, ProductName: vTitle, VarianceType: vVariancetype, Qty: vQty,
            Price: vSellingPrice, VariancePrice: vVariancePrice, Tax: vTaxPercentage, TotalAmount: vTotalamountvalue, Discount: vDISCOUNT, CopounPercentage: 0
        }];

        var vorderItem = vCartItem;
        

        localStorage.setItem("BulkItems", JSON.stringify(vorderItem));
    } 

    var removeSpaces = function (string) {
        return string.split(' ').join('');
    }

    $scope.ShowPaymentType = true;
    $scope.ShowCashRecived = false;
    $scope.ShowBalance = false;
    $scope.ShowTender = false;
    $scope.ShowBalanceAmt = false;

    $scope.PlaceOrder = function () {
        debugger;
        var paymentvalue = document.getElementById("Payment").value;
        vTotalamountvalue = $("#GrandTotal").val();
        $scope.BillType = paymentvalue;
        if (paymentvalue =="Pay Now"){
            $scope.pay();
            let rPass = Math.random().toString(36).substring(7);
            var vOrderNo = rPass;
            $.session.set('SalOrderNo', vOrderNo);
            debugger;
            if (MemberId != null && MemberId != undefined && MemberId != "") {
                //var vTotalOrderamount = parseInt($("#GrandTotal").val());
                var vrazorpay_payment_id = localStorage.getItem("razorpay_payment_id");
                debugger;
                $http({
                    url: vUrl + "BulkSales/InsertBulkSalesOrder",
                    dataType: 'json',
                    method: 'POST',
                    params: { strOrderNo: vOrderNo, strMemberId: MemberId, decTotalAmount: vTotalamountvalue, decDeliveryCharge: 0, razorpay_payment_id: vrazorpay_payment_id, CompanyId: vCompanyId },
                    data: $scope.report,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    debugger;
                    var vResult = response.data;
                    var vId = vResult.split('|');
                    $scope.SalOrderNo = vId[1];

                    $http({
                        url: vUrl + "SalesDetail/SendInvoiceMail",
                        dataType: 'json',
                        method: 'POST',
                        data: JSON.stringify(vitm),
                        params: { strOrderNo: vId[1], strMemberId: MemberId, decTotalAmount: vTotalamountvalue, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vCount = $("#LengthValue").val();
                        for (var i = 0; i < vCount; i++) {
                            $scope.ProdVariance = [];
                            var vProductCode = "ProductCodetxt" + (i + 1).toString();
                            var vProductName = "ProductNametxt" + (i + 1).toString();
                            var vVarianceType = "VarianceTypetxt" + (i + 1).toString();
                            var vQUANTITY = "QUANTITY" + (i + 1).toString();
                            var vsellingPrice = "sellingPrice" + (i + 1).toString();
                            var vVariancePrice = "VariancePrice" + (i + 1).toString();
                            var vTaxPercentage = "TaxPercentage" + (i + 1).toString();
                            var vTotalAmount = "TotalAmount" + (i + 1).toString();
                            debugger;

                            var strProductCode = removeSpaces(document.getElementById(vProductCode).value);
                            var strProductName = removeSpaces(document.getElementById(vProductName).value);
                            var strVarianceType = removeSpaces(document.getElementById(vVarianceType).value);
                            var strQUANTITY = removeSpaces(document.getElementById(vQUANTITY).value);
                            var strsellingPrice = removeSpaces(document.getElementById(vsellingPrice).value);
                            var strVariancePrice = removeSpaces(document.getElementById(vVariancePrice).value);
                            var strTaxPercentage = removeSpaces(document.getElementById(vTaxPercentage).value);
                            var strTotalAmount = removeSpaces(document.getElementById(vTotalAmount).value);

                            $scope.ProdVariance.push({
                                ProductId: strProductCode, ProductName: strProductName, VarianceType: strVarianceType, Qty: strQUANTITY,
                                Price: strsellingPrice, VariancePrice: strVariancePrice, Tax: strTaxPercentage, TotalAmount: strTotalAmount, Discount: 0, CopounPercentage: 0
                            });
                            localStorage.setItem("CartItem", JSON.stringify($scope.ProdVariance));


                            //$scope.OrderedItems = 
                            var vProdVarience = localStorage.getItem("CartItem");


                            if ($scope.ProdVariance != undefined && $scope.ProdVariance != null) {

                                $http({
                                    url: vUrl + "BulkSales/InsertBulkSalesItems",
                                    dataType: 'json',
                                    method: 'POST',
                                    data: vProdVarience,
                                    params: { strOrderId: vId[0] },
                                    headers: { "Content-Type": "application/json" }
                                }).then(function (response) {
                                    debugger;
                                    document.getElementById("Order").style.display = "block";
                                    $scope.Clear();
                                    location.reload();
                                    $scope.ShowCashRecived = false;
                                    $scope.ShowBalance = false;
                                    vProductCode = "";
                                    vProductName = "";
                                    vVarianceType = "";
                                    vQUANTITY = "";
                                    vsellingPrice = "";
                                    vVariancePrice = "";
                                    vTaxPercentage = "";
                                    vTotalAmount = "";
                                    strProductCode = "";
                                    strProductName = "";
                                    strVarianceType = "";
                                    strQUANTITY = "";
                                    strsellingPrice = "";
                                    strVariancePrice = "";
                                    strTaxPercentage = "";
                                    strTotalAmount = "";
                                    $scope.ProdVariance = "";
                                    vTotalamountvalue = 0;
                                    $("#GrandTotal").val("");
                                    $scope.report = "";
                                    $scope.report.Invoicenumber = "";
                                    $scope.report.SalesPerson = "";
                                    $scope.report.DeliveryMode = "";
                                    $scope.report.DeliveryDate = "";
                                    $scope.report.ContactNo = "";
                                    $scope.report.MemberName = "";
                                    $scope.report.AddressLine1 = "";
                                    $scope.report.AddressLine2 = "";
                                    $("#ProductCodetxt1").val("");
                                    $("#ProductNametxt1").val("");
                                    $("#VarianceTypetxt1").val("");
                                    $("#QUANTITY1").val("");
                                    $("#sellingPrice1").val("");
                                    $("#VariancePrice1").val("");
                                    $("#TaxPercentage1").val("");
                                    $("#DISCOUNT1").val("");
                                    $("#TotalAmount1").val("");
                                    $("#txtbox").val(1);
                                    $scope.report.OrderNotes = "";
                                    document.getElementById("variant1").style.display = "none";
                                    $scope.Variant = false;
                                }).catch(function (response) {
                                    debugger;
                                });
                            }
                        }
                    });

                }).catch(function (response) {
                    debugger;
                });
            }
            if (MemberId == null || MemberId == undefined || MemberId == "") {
               // var vTotalOrderamount = parseInt($("#GrandTotal").val());
                $http({
                    url: vUrl + "CustomerDetails/InsertCustomerDetails",
                    dataType: 'json',
                    method: 'POST',
                    data: $scope.report,
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    debugger;
                    MemberId = response.data;
                    let rPass = Math.random().toString(36).substring(7);
                    var vOrderNo = rPass;
                    $.session.set('SalOrderNo', vOrderNo);
                    $http({
                        url: vUrl + "BulkSales/InsertBulkSalesOrder",
                        dataType: 'json',
                        method: 'POST',
                        params: { strOrderNo: vOrderNo, strMemberId: MemberId, decTotalAmount: vTotalamountvalue, decDeliveryCharge: 0, razorpay_payment_id: "0", CompanyId: vCompanyId },
                        data: $scope.report,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vId = vResult.split('|');
                        $scope.SalOrderNo = vId[1];
                        $http({
                            url: vUrl + "SalesDetail/SendInvoiceMail",
                            dataType: 'json',
                            method: 'POST',
                            //data: JSON.stringify(vitm),
                            params: { strOrderNo: vId[1], strMemberId: MemberId, decTotalAmount: vTotalamountvalue, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response) {
                            debugger;
                            var vResult = response.data;
                            var vCount = $("#LengthValue").val();
                            for (var i = 0; i < vCount; i++) {
                                $scope.ProdVariance = [];
                                var vProductCode = "ProductCodetxt" + (i + 1).toString();
                                var vProductName = "ProductNametxt" + (i + 1).toString();
                                var vVarianceType = "VarianceTypetxt" + (i + 1).toString();
                                var vQUANTITY = "QUANTITY" + (i + 1).toString();
                                var vsellingPrice = "sellingPrice" + (i + 1).toString();
                                var vVariancePrice = "VariancePrice" + (i + 1).toString();
                                var vTaxPercentage = "TaxPercentage" + (i + 1).toString();
                                var vTotalAmount = "TotalAmount" + (i + 1).toString();
                                debugger;
                                var strProductCode = removeSpaces(document.getElementById(vProductCode).value);
                                var strProductName = removeSpaces(document.getElementById(vProductName).value);
                                var strVarianceType = removeSpaces(document.getElementById(vVarianceType).value);
                                var strQUANTITY = removeSpaces(document.getElementById(vQUANTITY).value);
                                var strsellingPrice = removeSpaces(document.getElementById(vsellingPrice).value);
                                var strVariancePrice = removeSpaces(document.getElementById(vVariancePrice).value);
                                var strTaxPercentage = removeSpaces(document.getElementById(vTaxPercentage).value);
                                var strTotalAmount = removeSpaces(document.getElementById(vTotalAmount).value);
                                $scope.ProdVariance.push({
                                    ProductId: strProductCode, ProductName: strProductName, VarianceType: strVarianceType, Qty: strQUANTITY,
                                    Price: strsellingPrice, VariancePrice: strVariancePrice, TaxPercentage: strTaxPercentage, TotalAmount: strTotalAmount, Discount: 0, CopounPercentage: 0
                                });
                                localStorage.setItem("CartItem", JSON.stringify($scope.ProdVariance));
                                //$scope.OrderedItems = 
                                var vProdVarience = localStorage.getItem("CartItem");
                                if ($scope.ProdVariance != undefined && $scope.ProdVariance != null) {
                                    $http({
                                        url: vUrl + "BulkSales/InsertBulkSalesItems",
                                        dataType: 'json',
                                        method: 'POST',
                                        data: vProdVarience,
                                        params: { strOrderId: vId[0] },
                                        headers: { "Content-Type": "application/json" }
                                    }).then(function (response) {
                                        debugger;
                                        document.getElementById("Order").style.display = "block";
                                        $scope.Clear();
                                        location.reload();
                                        $scope.ShowCashRecived = false;
                                        $scope.ShowBalance = false;
                                        vProductCode = "";
                                        vProductName = "";
                                        vVarianceType = "";
                                        vQUANTITY = "";
                                        vsellingPrice = "";
                                        vVariancePrice = "";
                                        vTaxPercentage = "";
                                        vTotalAmount = "";
                                        strProductCode = "";
                                        strProductName = "";
                                        strVarianceType = "";
                                        strQUANTITY = "";
                                        strsellingPrice = "";
                                        strVariancePrice = "";
                                        strTaxPercentage = "";
                                        strTotalAmount = "";
                                        $scope.ProdVariance = "";
                                        vTotalamountvalue = 0;
                                        $("#GrandTotal").val("");
                                        $scope.report = "";
                                        $scope.report.Invoicenumber = "";
                                        $scope.report.SalesPerson = "";
                                        $scope.report.DeliveryMode = "";
                                        $scope.report.DeliveryDate = "";
                                        $scope.report.ContactNo = "";
                                        $scope.report.MemberName = "";
                                        $scope.report.AddressLine1 = "";
                                        $scope.report.AddressLine2 = "";
                                        $("#ProductCodetxt1").val("");
                                        $("#ProductNametxt1").val("");
                                        $("#VarianceTypetxt1").val("");
                                        $("#QUANTITY1").val("");
                                        $("#sellingPrice1").val("");
                                        $("#VariancePrice1").val("");
                                        $("#TaxPercentage1").val("");
                                        $("#DISCOUNT1").val("");
                                        $("#TotalAmount1").val("");
                                        $("#txtbox").val(1);
                                        $scope.report.OrderNotes = "";
                                        document.getElementById("variant1").style.display = "none";
                                        $scope.Variant = false;
                                    }).catch(function (response) {
                                        debugger;
                                    });
                                }
                            }
                        });

                    }).catch(function (response) {
                        debugger
                    });
                }).catch(function (response) {
                    debugger;
                });
            }
        }

        if (paymentvalue == "Cash") {
            $scope.ShowCashRecived = true;
            $scope.ShowBalance = true;
            $scope.ShowTender = true;
            $scope.ShowBalanceAmt = true;
            let rPass = Math.random().toString(36).substring(7);
            var vOrderNo = rPass;
            $.session.set('SalOrderNo', vOrderNo);
            debugger;
            if (MemberId != null && MemberId != undefined && MemberId != "") {
                //var vTotalOrderamount = parseInt($("#GrandTotal").val());
                var vrazorpay_payment_id = localStorage.getItem("razorpay_payment_id");
                debugger;
                $http({
                    url: vUrl + "BulkSales/InsertBulkSalesOrder",
                    dataType: 'json',
                    method: 'POST',
                    params: { strOrderNo: vOrderNo, strMemberId: MemberId, decTotalAmount: vTotalamountvalue, decDeliveryCharge: 0, razorpay_payment_id: vrazorpay_payment_id, CompanyId: vCompanyId},
                    data: $scope.report,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    debugger;
                    var vResult = response.data;
                    var vId = vResult.split('|');
                    $scope.SalOrderNo = vId[1];

                    $http({
                        url: vUrl + "SalesDetail/SendInvoiceMail",
                        dataType: 'json',
                        method: 'POST',
                        data: JSON.stringify(vitm),
                        params: { strOrderNo: vId[1], strMemberId: MemberId, decTotalAmount: vTotalamountvalue, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vCount = $("#LengthValue").val();
                        for (var i = 0; i < vCount; i++) {
                            $scope.ProdVariance = [];
                            var vProductCode = "ProductCodetxt" + (i + 1).toString();
                            var vProductName = "ProductNametxt" + (i + 1).toString();
                            var vVarianceType = "VarianceTypetxt" + (i + 1).toString();
                            var vQUANTITY = "QUANTITY" + (i + 1).toString();
                            var vsellingPrice = "sellingPrice" + (i + 1).toString();
                            var vVariancePrice = "VariancePrice" + (i + 1).toString();
                            var vTaxPercentage = "TaxPercentage" + (i + 1).toString();
                            var vTotalAmount = "TotalAmount" + (i + 1).toString();
                            debugger;

                            var strProductCode = removeSpaces(document.getElementById(vProductCode).value);
                            var strProductName = removeSpaces(document.getElementById(vProductName).value);
                            var strVarianceType = removeSpaces(document.getElementById(vVarianceType).value);
                            var strQUANTITY = removeSpaces(document.getElementById(vQUANTITY).value);
                            var strsellingPrice = removeSpaces(document.getElementById(vsellingPrice).value);
                            var strVariancePrice = removeSpaces(document.getElementById(vVariancePrice).value);
                            var strTaxPercentage = removeSpaces(document.getElementById(vTaxPercentage).value);
                            var strTotalAmount = removeSpaces(document.getElementById(vTotalAmount).value);

                            $scope.ProdVariance.push({
                                ProductId: strProductCode, ProductName: strProductName, VarianceType: strVarianceType, Qty: strQUANTITY,
                                Price: strsellingPrice, VariancePrice: strVariancePrice, Tax: strTaxPercentage, TotalAmount: strTotalAmount, Discount: 0, CopounPercentage: 0
                            });
                            localStorage.setItem("CartItem", JSON.stringify($scope.ProdVariance));


                            //$scope.OrderedItems = 
                            var vProdVarience = localStorage.getItem("CartItem");


                            if ($scope.ProdVariance != undefined && $scope.ProdVariance != null) {

                                $http({
                                    url: vUrl + "BulkSales/InsertBulkSalesItems",
                                    dataType: 'json',
                                    method: 'POST',
                                    data: vProdVarience,
                                    params: { strOrderId: vId[0] },
                                    headers: { "Content-Type": "application/json" }
                                }).then(function (response) {
                                    debugger;
                                    document.getElementById("Order").style.display = "block";
                                    $scope.Clear();
                                    location.reload();
                                    $scope.ShowCashRecived = false;
                                    $scope.ShowBalance = false;
                                    vProductCode = "";
                                    vProductName = "";
                                    vVarianceType = "";
                                    vQUANTITY = "";
                                    vsellingPrice = "";
                                    vVariancePrice = "";
                                    vTaxPercentage = "";
                                    vTotalAmount = "";
                                    strProductCode = "";
                                    strProductName = "";
                                    strVarianceType = "";
                                    strQUANTITY = "";
                                    strsellingPrice = "";
                                    strVariancePrice = "";
                                    strTaxPercentage = "";
                                    strTotalAmount = "";
                                    $scope.ProdVariance = "";
                                    vTotalamountvalue = 0;
                                    $("#GrandTotal").val("");
                                    $scope.report = "";
                                    $scope.report.Invoicenumber = "";
                                    $scope.report.SalesPerson = "";
                                    $scope.report.DeliveryMode = "";
                                    $scope.report.DeliveryDate = "";
                                    $scope.report.ContactNo = "";
                                    $scope.report.MemberName = "";
                                    $scope.report.AddressLine1 = "";
                                    $scope.report.AddressLine2 = "";
                                    $("#ProductCodetxt1").val("");
                                    $("#ProductNametxt1").val("");
                                    $("#VarianceTypetxt1").val("");
                                    $("#QUANTITY1").val("");
                                    $("#sellingPrice1").val("");
                                    $("#VariancePrice1").val("");
                                    $("#TaxPercentage1").val("");
                                    $("#DISCOUNT1").val("");
                                    $("#TotalAmount1").val("");
                                    $("#txtbox").val(1);
                                    $scope.report.OrderNotes = "";
                                    document.getElementById("variant1").style.display = "none";
                                    $scope.Variant = false;
                                }).catch(function (response) {
                                    debugger;
                                });
                            }
                        }
                    });

                }).catch(function (response) {
                    debugger;
                });
            }
            if (MemberId == null || MemberId == undefined || MemberId == "") {
                // var vTotalOrderamount = parseInt($("#GrandTotal").val());
                $http({
                    url: vUrl + "CustomerDetails/InsertCustomerDetails",
                    dataType: 'json',
                    method: 'POST',
                    data: $scope.report,
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    debugger;
                    MemberId = response.data;
                    let rPass = Math.random().toString(36).substring(7);
                    var vOrderNo = rPass;
                    $.session.set('SalOrderNo', vOrderNo);
                    $http({
                        url: vUrl + "BulkSales/InsertBulkSalesOrder",
                        dataType: 'json',
                        method: 'POST',
                        params: { strOrderNo: vOrderNo, strMemberId: MemberId, decTotalAmount: vTotalamountvalue, decDeliveryCharge: 0, razorpay_payment_id: "0", CompanyId: vCompanyId },
                        data: $scope.report,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vId = vResult.split('|');
                        $scope.SalOrderNo = vId[1];
                        $http({
                            url: vUrl + "SalesDetail/SendInvoiceMail",
                            dataType: 'json',
                            method: 'POST',
                            //data: JSON.stringify(vitm),
                            params: { strOrderNo: vId[1], strMemberId: MemberId, decTotalAmount: vTotalamountvalue, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response) {
                            debugger;
                            var vResult = response.data;
                            var vCount = $("#LengthValue").val();
                            for (var i = 0; i < vCount; i++) {
                                $scope.ProdVariance = [];
                                var vProductCode = "ProductCodetxt" + (i + 1).toString();
                                var vProductName = "ProductNametxt" + (i + 1).toString();
                                var vVarianceType = "VarianceTypetxt" + (i + 1).toString();
                                var vQUANTITY = "QUANTITY" + (i + 1).toString();
                                var vsellingPrice = "sellingPrice" + (i + 1).toString();
                                var vVariancePrice = "VariancePrice" + (i + 1).toString();
                                var vTaxPercentage = "TaxPercentage" + (i + 1).toString();
                                var vTotalAmount = "TotalAmount" + (i + 1).toString();
                                debugger;
                                var strProductCode = removeSpaces(document.getElementById(vProductCode).value);
                                var strProductName = removeSpaces(document.getElementById(vProductName).value);
                                var strVarianceType = removeSpaces(document.getElementById(vVarianceType).value);
                                var strQUANTITY = removeSpaces(document.getElementById(vQUANTITY).value);
                                var strsellingPrice = removeSpaces(document.getElementById(vsellingPrice).value);
                                var strVariancePrice = removeSpaces(document.getElementById(vVariancePrice).value);
                                var strTaxPercentage = removeSpaces(document.getElementById(vTaxPercentage).value);
                                var strTotalAmount = removeSpaces(document.getElementById(vTotalAmount).value);
                                $scope.ProdVariance.push({
                                    ProductId: strProductCode, ProductName: strProductName, VarianceType: strVarianceType, Qty: strQUANTITY,
                                    Price: strsellingPrice, VariancePrice: strVariancePrice, TaxPercentage: strTaxPercentage, TotalAmount: strTotalAmount, Discount: 0, CopounPercentage: 0
                                });
                                localStorage.setItem("CartItem", JSON.stringify($scope.ProdVariance));
                                //$scope.OrderedItems = 
                                var vProdVarience = localStorage.getItem("CartItem");
                                if ($scope.ProdVariance != undefined && $scope.ProdVariance != null) {
                                    $http({
                                        url: vUrl + "BulkSales/InsertBulkSalesItems",
                                        dataType: 'json',
                                        method: 'POST',
                                        data: vProdVarience,
                                        params: { strOrderId: vId[0] },
                                        headers: { "Content-Type": "application/json" }
                                    }).then(function (response) {
                                        debugger;
                                        document.getElementById("Order").style.display = "block";
                                        $scope.Clear();
                                        location.reload();
                                        $scope.ShowCashRecived = false;
                                        $scope.ShowBalance = false;
                                        vProductCode = "";
                                        vProductName = "";
                                        vVarianceType = "";
                                        vQUANTITY = "";
                                        vsellingPrice = "";
                                        vVariancePrice = "";
                                        vTaxPercentage = "";
                                        vTotalAmount = "";
                                        strProductCode = "";
                                        strProductName = "";
                                        strVarianceType = "";
                                        strQUANTITY = "";
                                        strsellingPrice = "";
                                        strVariancePrice = "";
                                        strTaxPercentage = "";
                                        strTotalAmount = "";
                                        $scope.ProdVariance = "";
                                        vTotalamountvalue = 0;
                                        $("#GrandTotal").val("");
                                        $scope.report = "";
                                        $scope.report.Invoicenumber = "";
                                        $scope.report.SalesPerson = "";
                                        $scope.report.DeliveryMode = "";
                                        $scope.report.DeliveryDate = "";
                                        $scope.report.ContactNo = "";
                                        $scope.report.MemberName = "";
                                        $scope.report.AddressLine1 = "";
                                        $scope.report.AddressLine2 = "";
                                        $("#ProductCodetxt1").val("");
                                        $("#ProductNametxt1").val("");
                                        $("#VarianceTypetxt1").val("");
                                        $("#QUANTITY1").val("");
                                        $("#sellingPrice1").val("");
                                        $("#VariancePrice1").val("");
                                        $("#TaxPercentage1").val("");
                                        $("#DISCOUNT1").val("");
                                        $("#TotalAmount1").val("");
                                        $("#txtbox").val(1);
                                        $scope.report.OrderNotes = "";
                                        document.getElementById("variant1").style.display = "none";
                                        $scope.Variant = false;
                                    }).catch(function (response) {
                                        debugger;
                                    });
                                }
                            }
                        });

                    }).catch(function (response) {
                        debugger
                    });
                }).catch(function (response) {
                    debugger;
                });
            }
        }

        else {

            let rPass = Math.random().toString(36).substring(7);
            var vOrderNo = rPass;
            $.session.set('SalOrderNo', vOrderNo);
            debugger;
            if (MemberId != null && MemberId != undefined && MemberId != "") {
                var vTotalOrderamount = parseInt($("#GrandTotal").val());
                $http({
                    url: vUrl + "BulkSales/InsertBulkSalesOrder",
                    dataType: 'json',
                    method: 'POST',
                    params: { strOrderNo: vOrderNo, strMemberId: MemberId, decTotalAmount: vTotalOrderamount, decDeliveryCharge: 0, razorpay_payment_id: "0", CompanyId: vCompanyId },
                    data: $scope.report,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    debugger;
                    var vResult = response.data;
                    var vId = vResult.split('|');
                    $scope.SalOrderNo = vId[1];

                    $http({
                        url: vUrl + "SalesDetail/SendInvoiceMail",
                        dataType: 'json',
                        method: 'POST',
                        data: JSON.stringify(vitm),
                        params: { strOrderNo: vId[1], strMemberId: MemberId, decTotalAmount: vTotalOrderamount, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vCount = $("#LengthValue").val();
                        for (var i = 0; i < vCount; i++) {
                            $scope.ProdVariance = [];
                            var vProductCode = "ProductCodetxt" + (i + 1).toString();
                            var vProductName = "ProductNametxt" + (i + 1).toString();
                            var vVarianceType = "VarianceTypetxt" + (i + 1).toString();
                            var vQUANTITY = "QUANTITY" + (i + 1).toString();
                            var vsellingPrice = "sellingPrice" + (i + 1).toString();
                            var vVariancePrice = "VariancePrice" + (i + 1).toString();
                            var vTaxPercentage = "TaxPercentage" + (i + 1).toString();
                            var vTotalAmount = "TotalAmount" + (i + 1).toString();
                            debugger;

                            var strProductCode = removeSpaces(document.getElementById(vProductCode).value);
                            var strProductName = removeSpaces(document.getElementById(vProductName).value);
                            var strVarianceType = removeSpaces(document.getElementById(vVarianceType).value);
                            var strQUANTITY = removeSpaces(document.getElementById(vQUANTITY).value);
                            var strsellingPrice = removeSpaces(document.getElementById(vsellingPrice).value);
                            var strVariancePrice = removeSpaces(document.getElementById(vVariancePrice).value);
                            var strTaxPercentage = removeSpaces(document.getElementById(vTaxPercentage).value);
                            var strTotalAmount = removeSpaces(document.getElementById(vTotalAmount).value);

                            $scope.ProdVariance.push({
                                ProductId: strProductCode, ProductName: strProductName, VarianceType: strVarianceType, Qty: strQUANTITY,
                                Price: strsellingPrice, VariancePrice: strVariancePrice, Tax: strTaxPercentage, TotalAmount: strTotalAmount, Discount: 0, CopounPercentage: 0
                            });
                            localStorage.setItem("CartItem", JSON.stringify($scope.ProdVariance));


                            //$scope.OrderedItems = 
                            var vProdVarience = localStorage.getItem("CartItem");


                            if ($scope.ProdVariance != undefined && $scope.ProdVariance != null) {

                                $http({
                                    url: vUrl + "BulkSales/InsertBulkSalesItems",
                                    dataType: 'json',
                                    method: 'POST',
                                    data: vProdVarience,
                                    params: { strOrderId: vId[0] },
                                    headers: { "Content-Type": "application/json" }
                                }).then(function (response) {
                                    debugger;
                                    document.getElementById("Order").style.display = "block";
                                    $scope.Clear();
                                    location.reload();
                                    vProductCode = "";
                                    vProductName = "";
                                    vVarianceType = "";
                                    vQUANTITY = "";
                                    vsellingPrice = "";
                                    vVariancePrice = "";
                                    vTaxPercentage = "";
                                    vTotalAmount = "";
                                    strProductCode = "";
                                    strProductName = "";
                                    strVarianceType = "";
                                    strQUANTITY = "";
                                    strsellingPrice = "";
                                    strVariancePrice = "";
                                    strTaxPercentage = "";
                                    strTotalAmount = "";
                                    $scope.ProdVariance = "";
                                    vTotalamountvalue = 0;
                                    $("#GrandTotal").val("");
                                    $scope.report = "";
                                    $scope.report.Invoicenumber = "";
                                    $scope.report.SalesPerson = "";
                                    $scope.report.DeliveryMode = "";
                                    $scope.report.DeliveryDate = "";
                                    $scope.report.ContactNo = "";
                                    $scope.report.MemberName = "";
                                    $scope.report.AddressLine1 = "";
                                    $scope.report.AddressLine2 = "";
                                    $("#ProductCodetxt1").val("");
                                    $("#ProductNametxt1").val("");
                                    $("#VarianceTypetxt1").val("");
                                    $("#QUANTITY1").val("");
                                    $("#sellingPrice1").val("");
                                    $("#VariancePrice1").val("");
                                    $("#TaxPercentage1").val("");
                                    $("#DISCOUNT1").val("");
                                    $("#TotalAmount1").val("");
                                    $("#txtbox").val(1);
                                    $scope.report.OrderNotes = "";
                                    document.getElementById("variant1").style.display = "none";
                                    $scope.Variant = false;
                                }).catch(function (response) {
                                    debugger;
                                });
                            }
                        }
                    });

                }).catch(function (response) {
                    debugger;
                });
            }
            if (MemberId == null || MemberId == undefined || MemberId == "") {
                var vTotalOrderamount = parseInt($("#GrandTotal").val());
                $http({
                    url: vUrl + "CustomerDetails/InsertCustomerDetails",
                    dataType: 'json',
                    method: 'POST',
                    data: $scope.report,
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    debugger;
                    MemberId = response.data;
                    let rPass = Math.random().toString(36).substring(7);
                    var vOrderNo = rPass;
                    $.session.set('SalOrderNo', vOrderNo);
                    $http({
                        url: vUrl + "BulkSales/InsertBulkSalesOrder",
                        dataType: 'json',
                        method: 'POST',
                        params: { strOrderNo: vOrderNo, strMemberId: MemberId, decTotalAmount: vTotalOrderamount, decDeliveryCharge: 0, razorpay_payment_id: "0", CompanyId: vCompanyId },
                        data: $scope.report,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vId = vResult.split('|');
                        $scope.SalOrderNo = vId[1];
                        $http({
                            url: vUrl + "SalesDetail/SendInvoiceMail",
                            dataType: 'json',
                            method: 'POST',
                            //data: JSON.stringify(vitm),
                            params: { strOrderNo: vId[1], strMemberId: MemberId, decTotalAmount: vTotalOrderamount, vCompanyName: $scope.CompanyName, vDomain: $scope.Domain },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response) {
                            debugger;
                            var vResult = response.data;
                            var vCount = $("#LengthValue").val();
                            for (var i = 0; i < vCount; i++) {
                                $scope.ProdVariance = [];
                                var vProductCode = "ProductCodetxt" + (i + 1).toString();
                                var vProductName = "ProductNametxt" + (i + 1).toString();
                                var vVarianceType = "VarianceTypetxt" + (i + 1).toString();
                                var vQUANTITY = "QUANTITY" + (i + 1).toString();
                                var vsellingPrice = "sellingPrice" + (i + 1).toString();
                                var vVariancePrice = "VariancePrice" + (i + 1).toString();
                                var vTaxPercentage = "TaxPercentage" + (i + 1).toString();
                                var vTotalAmount = "TotalAmount" + (i + 1).toString();
                                debugger;
                                var strProductCode = removeSpaces(document.getElementById(vProductCode).value);
                                var strProductName = removeSpaces(document.getElementById(vProductName).value);
                                var strVarianceType = removeSpaces(document.getElementById(vVarianceType).value);
                                var strQUANTITY = removeSpaces(document.getElementById(vQUANTITY).value);
                                var strsellingPrice = removeSpaces(document.getElementById(vsellingPrice).value);
                                var strVariancePrice = removeSpaces(document.getElementById(vVariancePrice).value);
                                var strTaxPercentage = removeSpaces(document.getElementById(vTaxPercentage).value);
                                var strTotalAmount = removeSpaces(document.getElementById(vTotalAmount).value);
                                $scope.ProdVariance.push({
                                    ProductId: strProductCode, ProductName: strProductName, VarianceType: strVarianceType, Qty: strQUANTITY,
                                    Price: strsellingPrice, VariancePrice: strVariancePrice, TaxPercentage: strTaxPercentage, TotalAmount: strTotalAmount, Discount: 0, CopounPercentage: 0
                                });
                                localStorage.setItem("CartItem", JSON.stringify($scope.ProdVariance));
                                //$scope.OrderedItems = 
                                var vProdVarience = localStorage.getItem("CartItem");
                                if ($scope.ProdVariance != undefined && $scope.ProdVariance != null) {
                                    $http({
                                        url: vUrl + "BulkSales/InsertBulkSalesItems",
                                        dataType: 'json',
                                        method: 'POST',
                                        data: vProdVarience,
                                        params: { strOrderId: vId[0] },
                                        headers: { "Content-Type": "application/json" }
                                    }).then(function (response) {
                                        debugger;
                                        document.getElementById("Order").style.display = "block";
                                        $scope.Clear();
                                        location.reload();
                                        vProductCode = "";
                                        vProductName = "";
                                        vVarianceType = "";
                                        vQUANTITY = "";
                                        vsellingPrice = "";
                                        vVariancePrice = "";
                                        vTaxPercentage = "";
                                        vTotalAmount = "";
                                        strProductCode = "";
                                        strProductName = "";
                                        strVarianceType = "";
                                        strQUANTITY = "";
                                        strsellingPrice = "";
                                        strVariancePrice = "";
                                        strTaxPercentage = "";
                                        strTotalAmount = "";
                                        $scope.ProdVariance = "";
                                        vTotalamountvalue = 0;
                                        $("#GrandTotal").val("");
                                        $scope.report = "";
                                        $scope.report.Invoicenumber = "";
                                        $scope.report.SalesPerson = "";
                                        $scope.report.DeliveryMode = "";
                                        $scope.report.DeliveryDate = "";
                                        $scope.report.ContactNo = "";
                                        $scope.report.MemberName = "";
                                        $scope.report.AddressLine1 = "";
                                        $scope.report.AddressLine2 = "";
                                        $("#ProductCodetxt1").val("");
                                        $("#ProductNametxt1").val("");
                                        $("#VarianceTypetxt1").val("");
                                        $("#QUANTITY1").val("");
                                        $("#sellingPrice1").val("");
                                        $("#VariancePrice1").val("");
                                        $("#TaxPercentage1").val("");
                                        $("#DISCOUNT1").val("");
                                        $("#TotalAmount1").val("");
                                        $("#txtbox").val(1);
                                        $scope.report.OrderNotes = "";
                                        document.getElementById("variant1").style.display = "none";
                                        $scope.Variant = false;
                                    }).catch(function (response) {
                                        debugger;
                                    });
                                }
                            }
                        });

                    }).catch(function (response) {
                        debugger
                    });
                }).catch(function (response) {
                    debugger;
                });
            }
        }

        $scope.printPage1('PrintBills');
       
    }
    var vtotalamount = 0;
    $scope.pay = function () {

        if ($scope.PaymentGateway == "Y") {
            var vTotalOrderamount = parseInt($("#GrandTotal").val());
            vtotalamount = parseInt(vTotalOrderamount);
            localStorage.setItem("TotalAmount", vtotalamount);
            $http({
                url: vUrl + "CartPayment/RazsorPayTest",
                dataType: 'json',
                method: 'POST',
                //data: $scope.Profile,
                params: { TotalAmount: vTotalOrderamount },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                debugger;
                var vOrderno = response.data;
                $scope.orderNumber = vOrderno;
                $scope.btnClick();
                //window.location.href = vOrderno;
            }).catch(function (response) {

            });
        }
        
    }
    $scope.PaymentGatewayKey = $.session.get('PaymentGatewayKey');
    $scope.CompanyName = $.session.get('CompanyName');
    var Totalamount = localStorage.getItem("TotalAmount");
    debugger;
    $scope.options = {
       
        'key': $scope.PaymentGatewayKey,
        // Insert the amount here, dynamically, even
        'amount': parseInt(Totalamount * 100),
        'name': $scope.CompanyName,
        //'description': 'Pay for Order #2323',
        //'image': 'http://webapi.Omshakthitraders.in//Uploads/Companydetails/b0233b98-e8c9-4d59-a3e0-336532dda8cb_OM_Sakthi_Traders-Logo.png',
        "order_id": $scope.orderNumber,
        'handler': function (response) {
            debugger;
            if (response.razorpay_payment_id != "" && response.razorpay_payment_id != undefined && response.razorpay_payment_id != null) {
                localStorage.setItem("razorpay_payment_id", response.razorpay_payment_id);
                $scope.PlaceOrder();

            }
            else {
                return false;
            }
           
        },
        'prefill': {
            'name': '',
            'email': '',
            'contact': ''
        }
    };
    $scope.btnClick = function () {
        debugger;
        $.getScript('https://checkout.razorpay.com/v1/checkout.js', function () {
            var rzp1 = new Razorpay($scope.options);
            rzp1.open();

        });


    };
    $scope.Clear = function () {
        vProductCode = "";
        vProductName = "";
        vVarianceType = "";
        vQUANTITY = "";
        vsellingPrice = "";
        vVariancePrice = "";
        vTaxPercentage = "";
        vTotalAmount = "";
        strProductCode = "";
        strProductName = "";
        strVarianceType = "";
        strQUANTITY = "";
        strsellingPrice = "";
        strVariancePrice = "";
        strTaxPercentage = "";
        strTotalAmount = "";
        $scope.ProdVariance = "";
        vTotalamountvalue = 0;
        $("#GrandTotal").val("");
        $scope.report = "";
        $scope.report.Invoicenumber = "";
        $scope.report.SalesPerson = "";
        $scope.report.DeliveryMode = "";
        $scope.report.DeliveryDate = "";
        $scope.report.ContactNo = "";
        $scope.report.MemberName = "";
        $scope.report.AddressLine1 = "";
        $scope.report.AddressLine2 = "";
        $("#ProductCodetxt1").val("");
        $("#ProductNametxt1").val("");
        $("#VarianceTypetxt1").val("");
        $("#QUANTITY1").val("");
        $("#sellingPrice1").val("");
        $("#VariancePrice1").val("");
        $("#TaxPercentage1").val("");
        $("#DISCOUNT1").val("");
        $("#TotalAmount1").val("");
        $("#txtbox").val(1);
        $scope.report.OrderNotes = "";
        document.getElementById("variant1").style.display = "none"; 
        document.getElementById("Order").style.display = "none";
        $scope.Variant = false;
        $scope.ShowCashRecived = false;
        $scope.ShowBalance = false; 
        $("#CashRecived").val("");
        $("#Balance").val("");
    } 

    $scope.ShowCashDetails = function () {
        debugger;
        var paymentvalue = document.getElementById("Payment").value;
        if (paymentvalue == "Cash"){
            $scope.ShowCashRecived = true;
            $scope.ShowBalance = true;
        }
        else {

            $scope.ShowCashRecived = false;
            $scope.ShowBalance = false;
        }
    }

    $scope.onTextBoxKeyPressEnter  = function() {
        debugger;
      
            
        var vCashRecived = document.getElementById("CashRecived").value;
        $scope.AmountRecived = vCashRecived;
            var vGrandTotal = document.getElementById("GrandTotal").value;
            $scope.TotalOrdervalue = vGrandTotal;
            debugger;
            var vBalanceAmt = parseInt(vCashRecived - vGrandTotal);
            $scope.BalanceTender = vBalanceAmt;
            $("#Balance").val(vBalanceAmt);
       
    }

    var vvariable = 1; 
    
    var Addcount1 = function() {
        debugger;
        //var vcount = 0;
        var countvar = vvariable;
        var vEditVariants = "";
       // vEditVariants = vEditVariants + "<div >";
        vEditVariants = vEditVariants + "<tr>";
        vEditVariants = vEditVariants + " <td style='text-align:center;display:none'>";
        vEditVariants = vEditVariants + "<input class='form-control new1' id='txtbox1'  type='text' style='border:none;text-align:center;'  />";
        vEditVariants = vEditVariants + "</td>";
        $("#txtbox1").val(1)
        var vcount = countvar;
        var result = vcount;
        var sno = result;        
        vEditVariants = vEditVariants + " <td style='text-align:center;width:8px;'>";
        vEditVariants = vEditVariants + sno;
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductCodetxt1' target='self_' type='text' onchange='getProductVariance1(" + result + ")' style='border:none;text-align:center;' />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductNametxt1' type='text' style='border:none;text-align:center;'  />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input class='form-control new1' id='VarianceTypetxt1' type='text' style='border:none;text-align:center;' />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input class='form-control new1' id='QUANTITY1' type='text'onchange='GetQuntity(" + result + ")' onkeypress='onTextBoxKeyPress(" + result + ")' style='border:none;text-align:center;' />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input  class='form-control new1' id='sellingPrice1' type='text'  style='border:none;text-align:center;'/>";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input  class='form-control new1' id='VariancePrice1' type='text'  style='border:none;text-align:center;'/>";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input  class='form-control new1' id='TaxPercentage1' type='text'   style='border:none;text-align:center;' />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input  class='form-control new1' id='DISCOUNT1' type='text' style='border:none;text-align:center;' />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<input class='form-control new1' id='TotalAmount1' type='text' style='border:none;text-align:center;'  />";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        vEditVariants = vEditVariants + "<span>";
        vEditVariants = vEditVariants + "<a onclick='Delete(" + result + ")'><img src='..\AdminStyle\images\delete image.png' style='width:20px;height:20px;text-align:center;cursor:pointer;'/></a>";
        vEditVariants = vEditVariants + "</span>";
        vEditVariants = vEditVariants + "</td>";
        vEditVariants = vEditVariants + "</tr>";
       // vEditVariants = vEditVariants + "</div>";
        //vEditVariants = vEditVariants + "<html >";
        //vEditVariants = vEditVariants + "<body>";
        //vEditVariants = vEditVariants + "<div>";
        //vEditVariants = vEditVariants + "<tr style='display:none;'>";
        //vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        //vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductNametxt1' type='text' style='border:none;text-align:center;'  />";
        //vEditVariants = vEditVariants + "</td>";
        //vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        //vEditVariants = vEditVariants + "<input class='form-control new1' id='VarianceTypetxt1' type='text' style='border:none;text-align:center;' />";
        //vEditVariants = vEditVariants + "</td>";
        //vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        //vEditVariants = vEditVariants + "<input class='form-control new1' id='QUANTITY1' type='text'onchange='GetQuntity(" + result + ")' onkeypress='onTextBoxKeyPress(" + result + ")' style='border:none;text-align:center;' />";
        //vEditVariants = vEditVariants + "</td>";
        //vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        //vEditVariants = vEditVariants + "<input  class='form-control new1' id='sellingPrice1' type='text'  style='border:none;text-align:center;'/>";
        //vEditVariants = vEditVariants + "</td>";
        //vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        //vEditVariants = vEditVariants + "<input  class='form-control new1' id='VariancePrice1' type='text'  style='border:none;text-align:center;'/>";
        //vEditVariants = vEditVariants + "</td>";           
        //vEditVariants = vEditVariants + " <td style='text-align:center;'>";
        //vEditVariants = vEditVariants + "<input class='form-control new1' id='TotalAmount1' type='text' style='border:none;text-align:center;'  />";
        //vEditVariants = vEditVariants + "</td>";     
        //vEditVariants = vEditVariants + "</tr>";
        //vEditVariants = vEditVariants + "</div>";
        //vEditVariants = vEditVariants + "</body>";
        //vEditVariants = vEditVariants + "</html>";
       

        $("#variant").append(vEditVariants);
        
    }

    // Diable the Opening Chrome Download window while Scanning the barcode using Barcode reader
    var lastKeyCode = "";
    document.addEventListener('keydown', function (event) {
        if (lastKeyCode == "ControlLeft" && event.code == "KeyJ")
            event.preventDefault();
        lastKeyCode = event.code;
    });

    Addcount1();

    function GetQuntity1(Result) {
        debugger;
        //var vamount = $("#TotalAmount" + Result).val();   
        // $("#GrandTotal").val(vamount);
        var vProductId = $("#ProductCodetxt" + Result).val();
        var vTitle = $("#ProductNametxt" + Result).val();
        var vVariancetype = $("#VarianceTypetxt" + Result).val();
        var vQty = $("#QUANTITY" + Result).val();
        var vPrice = $("#sellingPrice" + Result).val();
        var vVariancePrice = $("#VariancePrice" + Result).val();
        var vTaxPercentage = $("#TaxPercentage" + Result).val();
        var vTotalamount = vQty * vPrice;
        $("#TotalAmount" + Result).val(vTotalamount);
        var vdiscount = $("#DISCOUNT" + Result).val(vQty * (vVariancePrice - vPrice));
        debugger;

        //var amt = $("#GrandTotal").val();
        //vTotalamountvalue = parseInt(amt) + parseInt($("#TotalAmount" + Result).val());
        $("#GrandTotal").val(vTotalamount);


        var vCartItem1 = JSON.parse(localStorage.getItem("BulkItems"));

        if (vCartItem1 != undefined && vCartItem1 != null && vCartItem1 != "undefined") {

            var vorderItem1 = [];
            vorderItem1 = vCartItem1;

            var vorderItems = vCartItem1.length;


            debugger;
            for (var i = 0; i < vorderItems; i++) {
                //if (vorderItem1[i].ProductId == vProductId) {
                //    debugger;
                //    index = i;
                //    vorderItem1[i].Qty = ProductList[i].Qty + Number(vQty);;
                //    vorderItem1[i].TotalAmount = ProductList[i].Qty * vPrice;
                //    break;

                //}



            }
            vorderItem1.push({
                ProductId: vProductId, ProductName: vTitle, VarianceType: vVariancetype, Qty: vQty,
                Price: vPrice, VariancePrice: vVariancePrice, Tax: vTaxPercentage, TotalAmount: vTotalamount, Discount: vdiscount, CopounPercentage: 0
            });
            debugger;
            localStorage.setItem("BulkItems", JSON.stringify(vorderItem1));
        }






    }

    $("#LengthValue").val(0);

    $scope.printPage1 = function (id) {
        debugger;
        var vorderItem1 = JSON.parse(localStorage.getItem("BulkItems"));
        var vDiscountamt = JSON.parse(localStorage.getItem("DISCOUNT"));
        var vTaxPercentage = JSON.parse(localStorage.getItem("TaxPercentage"));
        $scope.OrderDiscountAmt = vDiscountamt;
        $scope.SGSTTaxAmt = parseInt(vTaxPercentage / 2);
        $scope.CGSTTaxAmt = parseInt(vTaxPercentage / 2);
        var vGrandTotal = document.getElementById("GrandTotal").value;
        var vTotalOrdervalue = vGrandTotal;
        $scope.SubTotalAmt = parseInt(vTotalOrdervalue - (vTaxPercentage ));
        var vGrandTotal = document.getElementById("GrandTotal").value;
        $scope.OrdervalueAmount = vGrandTotal;
        
        $scope.Order = vorderItem1;
        var paymentvalue = document.getElementById("Payment").value;
        $scope.BillType = paymentvalue + " Bill";
        if (paymentvalue == "Cash") {
            
            $scope.ShowTender = true;
            $scope.ShowBalanceAmt = true;
        } else {

            $scope.ShowTender = false;
            $scope.ShowBalanceAmt = false;
        }
        $timeout(function() {
            var html = "<html>";
            html += document.getElementById("PrintBills").innerHTML;
            html += "</html>";
            var printWin = window.open('width=100,height=100');
            printWin.document.write(html);
            printWin.document.close();
            printWin.focus();
            printWin.print();
            printWin.close();
          
        }, 1000);

      
    }
});

var vcountvariable = 0; 


function GetQuntity(Result) {
    debugger;
    //var vamount = $("#TotalAmount" + Result).val();   
   // $("#GrandTotal").val(vamount);
    var vProductId = $("#ProductCodetxt" + Result).val();
    var vTitle = $("#ProductNametxt" + Result).val();
    var vVariancetype = $("#VarianceTypetxt" + Result).val();
    var vQty = $("#QUANTITY" + Result).val();
    var vPrice = $("#sellingPrice" + Result).val();
    var vVariancePrice = $("#VariancePrice" + Result).val();
    var vTaxPercentage = $("#TaxPercentage" + Result).val();
    var vTaxPercentageAmt = vTaxPercentage * vQty;
    var vTotalamount = vQty * vPrice;
    $("#TaxPercentage" + Result).val(vTaxPercentageAmt);
    $("#TotalAmount" + Result).val(vTotalamount);
    var vdiscount = $("#DISCOUNT" + Result).val(vQty * (vVariancePrice - vPrice));
    debugger;

    if (Result == '1') {
      //  var amt = $("#TotalAmount" + Result).val();
        vTotalamountvalue = parseInt($("#TotalAmount" + Result).val());
        $("#GrandTotal").val(vTotalamountvalue);

        vdiscount = parseInt($("#DISCOUNT" + Result).val());
        localStorage.setItem("DISCOUNT", JSON.stringify(vdiscount));   

        vTaxPercentage = parseInt($("#TaxPercentage" + Result).val());
        localStorage.setItem("TaxPercentage", JSON.stringify(vTaxPercentage));  

       // var lengthvalue = parseInt(Result + $("#LengthValue").val());
        $("#LengthValue").val(Result);
    }

    if (Result != '1') {
        var amt = $("#GrandTotal").val();
        vTotalamountvalue = parseInt(amt) + parseInt($("#TotalAmount" + Result).val());
        $("#GrandTotal").val(vTotalamountvalue);

        //var lengthvalue = parseInt(Result + $("#LengthValue").val());
        $("#LengthValue").val(Result);

        var vDiscountamt = JSON.parse(localStorage.getItem("DISCOUNT"));
        var Discount = vDiscountamt;
        vdiscount = parseInt(Discount) + parseInt($("#DISCOUNT" + Result).val());
        localStorage.setItem("DISCOUNT", JSON.stringify(vdiscount));

        var vTaxPercentageamt = JSON.parse(localStorage.getItem("TaxPercentage"));
        var Tax = vTaxPercentageamt;
        vTaxPercentage = parseInt(Tax) + parseInt($("#TaxPercentage" + Result).val());
        localStorage.setItem("TaxPercentage", JSON.stringify(vTaxPercentage));
    }

   
   

    var vCartItem1 = JSON.parse(localStorage.getItem("BulkItems"));
    if (vCartItem1 != undefined && vCartItem1 != null && vCartItem1 != "undefined") {
        var vorderItem1 = [];
        vorderItem1 = vCartItem1;
        var vorderItems = vCartItem1.length;     
        debugger;
        for (var i = 0; i < vorderItems; i++) {           
        }
        vorderItem1.push({
            ProductId: vProductId, ProductName: vTitle, VarianceType: vVariancetype, Qty: vQty,
            Price: vPrice, VariancePrice: vVariancePrice, Tax: vTaxPercentage, TotalAmount: vTotalamount, Discount: vdiscount, CopounPercentage: 0
        });
        debugger;
        localStorage.setItem("BulkItems", JSON.stringify(vorderItem1));
    }



   


}

var vUrl = localStorage.getItem("Url");
debugger;
function getProductVariance1(Result) {
   

    var vProductid = $("#ProductCodetxt" + Result).val();
    debugger;
    var str = vProductid.slice(1);
   // if (str.inclu)
    $.ajax({

        url: "http://webapi.fishermanmarket.in/api/" + "ProductDetails/getProductVariance",
        method: 'GET',
        data: { ProductId: str, CompanyId: 1 },

        headers: {
            "Content-Type": JSON
        }

    }).then(function (response) {
        debugger;
        //Result = response.data;
        //vcount = response.length;
        $("#VarianceTypetxt" + Result).val(response["0"].VarianceType);
        $("#ProductNametxt" + Result).val(response["0"].Title);
        $("#sellingPrice" + Result).val(response["0"].sellingPrice);
        $("#VariancePrice" + Result).val(response["0"].VariancePrice);
        var vTax = response["0"].Tax;
        var vPercentage = vTax["0"].Percentage;
        var Vprice = response["0"].sellingPrice;
        vtaxamt = parseFloat((Vprice * vPercentage) / 100);
        if (vTax.length != 0) {

            $("#TaxPercentage" + Result).val(vtaxamt);
        }

       
       


    });
}

//$("#txtbox1").val(1);
function Addcount(result1) {
    debugger;
    //var vcount = 0;
    var countvar = vcountvariable;
    var result = ++result1;
    var vEditVariants = "";
    vEditVariants = vEditVariants + "<tr>";
    vEditVariants = vEditVariants + " <td style='text-align:center;display:none' ng-show='Showtxtbox'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='txtbox" + (result).toString() + "' type='text' style='border:none;text-align:center;'  />";
    vEditVariants = vEditVariants + "</td>";
   // var vcount = $("#txtbox1").val();
    //var vcount = $("#txtbox1").val();
  
    var sno = result;
    
    vEditVariants = vEditVariants + " <td style='text-align:center;width:8px;'>";
    vEditVariants = vEditVariants + sno;
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductCodetxt" + (result).toString() + "' type='text' onchange='getProductVariance1(" + result + ")' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductNametxt" + (result).toString() + "' type='text' style='border:none;text-align:center;'  />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='VarianceTypetxt" + (result).toString() + "' type='text' style='border:none;text-align:center;' />";   
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='QUANTITY" + (result).toString() + "' type='text'onchange='GetQuntity(" + result + ")' onkeypress='onTextBoxKeyPress(" + result + ")' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='sellingPrice" + (result).toString() + "' type='text'  style='border:none;text-align:center;'/>";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='VariancePrice" + (result).toString() + "' type='text'  style='border:none;text-align:center;'/>";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='TaxPercentage" + (result).toString() + "' type='text'   style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='DISCOUNT" + (result).toString() + "' type='text' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='TotalAmount" + (result).toString() + "' type='text' style='border:none;text-align:center;'  />";
    vEditVariants = vEditVariants + "</td>";

   


    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<span>";
    vEditVariants = vEditVariants + "<a onclick='Delete("+result+")'><img src='..\AdminStyle\images\delete image.png' style='width:20px;height:20px;text-align:center;cursor:pointer;'/></a>";
    vEditVariants = vEditVariants + "</span>";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + "</tr>";
    $("#txtbox1").val(result);    
    $("#variant1").append(vEditVariants);
}

function AddcountRow(result1) {
    debugger;
    //var vcount = 0;
    var countvar = vcountvariable;
    var result = result1;
    var vEditVariants = "";
    vEditVariants = vEditVariants + "<tr>";
    vEditVariants = vEditVariants + " <td style='text-align:center;display:none' ng-show='Showtxtbox'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='txtbox" + (result).toString() + "' type='text' style='border:none;text-align:center;'  />";
    vEditVariants = vEditVariants + "</td>";
    // var vcount = $("#txtbox1").val();
    //var vcount = $("#txtbox1").val();

    var sno = result;

    vEditVariants = vEditVariants + " <td style='text-align:center;width:8px;'>";
    vEditVariants = vEditVariants + sno;
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductCodetxt" + (result).toString() + "' type='text' onchange='getProductVariance1(" + result + ")' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductNametxt" + (result).toString() + "' type='text' style='border:none;text-align:center;'  />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='VarianceTypetxt" + (result).toString() + "' type='text' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='QUANTITY" + (result).toString() + "' type='text'onchange='GetQuntity(" + result + ")' onkeypress='onTextBoxKeyPress(" + result + ")' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='sellingPrice" + (result).toString() + "' type='text'  style='border:none;text-align:center;'/>";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='VariancePrice" + (result).toString() + "' type='text'  style='border:none;text-align:center;'/>";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='TaxPercentage" + (result).toString() + "' type='text'   style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input  class='form-control new1' id='DISCOUNT" + (result).toString() + "' type='text' style='border:none;text-align:center;' />";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<input class='form-control new1' id='TotalAmount" + (result).toString() + "' type='text' style='border:none;text-align:center;'  />";
    vEditVariants = vEditVariants + "</td>";




    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
    vEditVariants = vEditVariants + "<span>";
    vEditVariants = vEditVariants + "<a onclick='Delete(" + result + ")'><img src='..\AdminStyle\images\delete image.png' style='width:20px;height:20px;text-align:center;cursor:pointer;'/></a>";
    vEditVariants = vEditVariants + "</span>";
    vEditVariants = vEditVariants + "</td>";
    vEditVariants = vEditVariants + "</tr>";
    $("#txtbox1").val(result);
    $("#variant1").append(vEditVariants);
}

function onTextBoxKeyPress(result) {
    debugger;
    if (event.keyCode == 13) {
        Addcount(result);
       
    }
}


function Delete(Result) {
    debugger;
    var vProductId = $("#ProductCodetxt" + Result).val();
    var vCart = localStorage.getItem("BulkItems");
    vCartItem = JSON.parse(vCart);
    for (var i = vCartItem.length - 1; i >= 0; i--) {
        if (vCartItem[i].ProductId == vProductId) {
            vCartItem.splice(i, 1);
        }
        localStorage.setItem("BulkItems", JSON.stringify(vCartItem));
        var vCartItems = localStorage.getItem("BulkItems");
        vCartItems = JSON.parse(vCartItems);
        var vItems = vCartItems.length;
        Result = vItems;
        for (var i = 0; i < vItems; i++) {
            $("#ProductCodetxt" + Result).val();
            $("#ProductNametxt" + Result).val();
            $("#VarianceTypetxt" + Result).val();
            $("#QUANTITY" + Result).val();
            $("#sellingPrice" + Result).val();
            $("#VariancePrice" + Result).val();
            $("#TaxPercentage" + Result).val();
            var vTotalamount = ($("#QUANTITY" + Result).val() * $("#sellingPrice" + Result).val());
            $("#TotalAmount" + Result).val(vTotalamount);
            //var vdiscount = $("#DISCOUNT" + Result).val(($("#QUANTITY" + Result).val() * ($("#sellingPrice" + Result).val()) - $("#VariancePrice" + Result).val())));
            debugger;
            var amt = $("#GrandTotal").val();
            vTotalamountvalue = parseInt(amt) + parseInt($("#TotalAmount" + Result).val());
            $("#GrandTotal").val(vTotalamountvalue);
            var vOrderItems = JSON.parse(localStorage.getItem("BulkItems"));
            if (vOrderItems != undefined || vOrderItems != null || vOrderItems != "") {
                var vItems = vOrderItems.length;
                Result = vItems;
                var vProductid = $("#ProductCodetxt" + Result).val();
                var vitems = vOrderItems;
                $("#variant1").empty();
                for (var i = 0; i < Result; i++) {
                    $("#ProductCodetxt" + Result).val(vitems[i].ProductId);
                    $("#ProductNametxt" + Result).val(vitems[i].ProductName);
                    $("#VarianceTypetxt" + Result).val(vitems[i].VarianceType);
                    $("#QUANTITY" + Result).val(vitems[i].Qty);
                    $("#sellingPrice" + Result).val(vitems[i].Price);
                    $("#VariancePrice" + Result).val(vitems[i].VariancePrice);
                    $("#TaxPercentage" + Result).val(vitems[i].Tax);
                    var vTotalamount = ($("#QUANTITY" + Result).val(vitems[i].Qty) * $("#sellingPrice" + Result).val(vitems[i].Price));
                     //$("#TotalAmount" + Result).val(vitems[i].TotalAmount);
                   // $("#DISCOUNT" + Result).val(($("#QUANTITY" + Result).val(vitems[].Qty) * ($("#sellingPrice" + Result).val(vitems[].Price)) - $("#VariancePrice" + Result).val(vitems[].VariancePrice)));
                    var amt = $("#GrandTotal").val();
                    vTotalamountvalue = parseInt(amt) + parseInt($("#TotalAmount" + Result).val());
                    $("#GrandTotal").val(vTotalamountvalue);
                    var countvar = Result;
                    var vEditVariants = "";
                    var vcount = Result;
                    var result = vcount;
                    var sno = result;
                    vEditVariants = vEditVariants + "<tr>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;width:8px;'>";
                    vEditVariants = vEditVariants + sno;
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductCodetxt" + (result).toString() + "' type='text' onchange='getProductVariance1(" + result + ")' value='" + vitems[i].ProductId + "' style='border:none;text-align:center;' />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input class='form-control new1' id='ProductNametxt" + (result).toString() + "' value='" + vitems[i].ProductName + "' type='text' style='border:none;text-align:center;'  />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input class='form-control new1' id='VarianceTypetxt" + (result).toString() + "' value='" + vitems[i].VarianceType + "' type='text' style='border:none;text-align:center;' />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input class='form-control new1' id='QUANTITY" + (result).toString() + "' value='" + vitems[i].Qty + "' type='text'onchange='GetQuntity(" + result + ")' onkeypress='onTextBoxKeyPress(" + result + ")' style='border:none;text-align:center;' />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input  class='form-control new1' id='sellingPrice" + (result).toString() + "' value='" + vitems[i].Price + "' type='text'  style='border:none;text-align:center;'/>";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input  class='form-control new1' id='VariancePrice" + (result).toString() + "' value='" + vitems[i].VariancePrice + "' type='text'  style='border:none;text-align:center;'/>";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input  class='form-control new1' id='TaxPercentage" + (result).toString() + "' value='" + vitems[i].Tax + "' type='text'   style='border:none;text-align:center;' />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input  class='form-control new1' id='DISCOUNT" + (result).toString() + "'value='" + ($("#QUANTITY" + Result).val(vitems[i].Qty) * $("#sellingPrice" + Result).val(vitems[i].Price)) + "' type='text' style='border:none;text-align:center;' />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<input class='form-control new1' id='TotalAmount" + (result).toString() + "' value='" + ($("#QUANTITY" + Result).val(vitems[i].Qty) * $("#sellingPrice" + Result).val(vitems[i].Price)) + "' type='text' style='border:none;text-align:center;'  />";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + " <td style='text-align:center;'>";
                    vEditVariants = vEditVariants + "<span>";
                    vEditVariants = vEditVariants + "<a onclick='Delete(" + result + ")'><img src='..\AdminStyle\images\delete image.png' style='width:20px;height:20px;text-align:center;cursor:pointer;'/></a>";
                    vEditVariants = vEditVariants + "</span>";
                    vEditVariants = vEditVariants + "</td>";
                    vEditVariants = vEditVariants + "</tr>";
                    $("#txtbox").val(result);
                    $("#variant1").append(vEditVariants);
                }
            }
        }
    }    
}

//function Delete(Result) {
//    debugger;
//    var vProductId = $("#ProductCodetxt" + Result).val();
//    var vCart = localStorage.getItem("BulkItems");
//    vCartItem = JSON.parse(vCart);
//    for (var i = vCartItem.length - 1; i >= 0; i--) {
//        if (vCartItem[i].ProductId == vProductId) {
//            vCartItem.splice(i, 1);
//        }       
//        localStorage.setItem("BulkItems", JSON.stringify(vCartItem));
//        $("#variant1").empty();
//        var vCartItems = localStorage.getItem("BulkItems");
//        vCartItems = JSON.parse(vCartItems);
//        var vItems = vCartItems.length;
//       // Result = vItems;
//        for (var i = 0; i < vItems; i++) {
//            AddcountRow(vItems);
//            $("#ProductCodetxt" + vItems).val(vCartItems[i].ProductId);
//            $("#ProductNametxt" + vItems).val(vCartItems[i].ProductName);
//            $("#VarianceTypetxt" + vItems).val(vCartItems[i].VarianceType);
//            $("#QUANTITY" + vItems).val(vCartItems[i].Qty);
//            $("#sellingPrice" + vItems).val(vCartItems[i].Price);
//            $("#VariancePrice" + vItems).val(vCartItems[i].VariancePrice);
//            $("#TaxPercentage" + vItems).val(vCartItems[i].Tax);                  
//        }
//    }
//}


function onTextBoxKeyPress1() {

    debugger;
    if (event.keyCode == 13) {
        getProductVariance1(Result);
    }
}