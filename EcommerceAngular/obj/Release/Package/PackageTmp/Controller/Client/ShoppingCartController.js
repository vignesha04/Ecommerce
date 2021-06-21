'use strict'; Ecom.controller('ShoppingCartController', function ($scope, $http, $rootScope, $timeout, $window, $sce) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $scope.divShoppingCart = true;
    $scope.divPaytm = false;
    $scope.IsDisabled = false;

    $scope.CoupounTextBox = false;
    $scope.CoupoupApplyBtn = false;


    $scope.PaymentGateway = $.session.get('PaymentGateway');
    $scope.PaymentGatewayKey = $.session.get('PaymentGatewayKey');
    var vDeliveryAddress = localStorage.getItem("DeliveryAddress");

    var vclientMemberId = $.session.get('clientMemberId');
    $window.scrollTo(0, 0);
    if (vDeliveryAddress != undefined && vDeliveryAddress != null && vDeliveryAddress != "") {
        var vDelName = vDeliveryAddress["0"].MemberName;
        var vDelAddressLine1 = vDeliveryAddress["0"].AddressLine1;
        var vDelAddressLine2 = vDeliveryAddress["0"].AddressLine2;
        var vDelCity = vDeliveryAddress["0"].City;
        var vDelState = vDeliveryAddress["0"].State;
        var vDelPinCode = vDeliveryAddress["0"].PinCode;
        var vDelLandmark = vDeliveryAddress["0"].Landmark;
        var vDelContactNo = vDeliveryAddress["0"].ContactNo;
        var vDelEmailId = vDeliveryAddress["0"].EmailId;
        $scope.MemberName = vDelName;
        $scope.AddressLine1 = vDelAddressLine1;
        $scope.AddressLine2 = vDelAddressLine2;
        $scope.City = vDelCity;
        $scope.State = vDelState;
        $scope.PinCode = vDelPinCode;
        $scope.Landmark = vDelLandmark;
        $scope.ContactNo = vDelContactNo;
        $scope.EmailId = vDelEmailId;
    }

    $rootScope.$watch('CartItems', function () {
        debugger;
        $scope.CartItems1 = $rootScope.CartItems;
        console.log($rootScope.CartItems)
    });
    $rootScope.$watch('TotalAmount', function () {
        debugger;
        //     $scope.TotalAmount = $rootScope.TotalAmount;
        console.log($rootScope.TotalAmount)
        $scope.TotalAmount = $rootScope.TotalAmount;
        RemoveProductBindDeliveryCharges($scope.TotalAmount);

    });
    $rootScope.$watch('Count', function () {
        console.log($rootScope.Count)
    });

    $rootScope.$watch('cAmcurrent', function () {
        $scope.TotalAmount = localStorage.getItem("totalamount");
        console.log($rootScope.cAmcurrent)

    });

    $rootScope.$watch('Subtotal', function () {
        debugger;
        console.log($rootScope.Subtotal)
    });

    $rootScope.$watch('CoupounDiscountAmt', function () {
        //     $scope.TotalAmount = $rootScope.TotalAmount;
        console.log($rootScope.CoupounDiscountAmt)

    });

   
    
    $scope.aHomeClick = function () {
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined) {
            var vLocation = "#!HomePage/" + vclientMemberId;
            window.location.href = vLocation;
        }
        else { var vLocation = "#!HomePage/0"; window.location.href = vLocation; }
    }
    $http({
        url: vUrl + "IndexPage/GetSiteSettingConfiguration", method: 'GET',
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        var vResult = response.data;
        var vCurrencyType = vResult["0"].CurrencyType;
        var vGridSizeClient = vResult["0"].GridSizeClient;
        $scope.CurrencyType = vCurrencyType;
    }).catch(function (response) {
    });
    $scope.isNumber = function (event) {
        var keycode = event.which;
        if (!(keycode >= 48 && keycode <= 57)) {
            event.preventDefault();
        }
    }

    var vTotalAmountForcart = "";
    vTotalAmountForcart = $rootScope.TotalAmount;
    //$scope.totalamountcart = vTotalAmountForcart;

    var vCartItem = localStorage.getItem("CartItem");

    var vCount = localStorage.getItem("Count");
    var vAmount = localStorage.getItem("Amount");
    var vAmount = localStorage.getItem("totalamount");
    var vCoupounDiscountAmt = localStorage.getItem("CoupounDiscountAmt");

    var vSubtotal = localStorage.getItem("Subtotal");

    if (vCoupounDiscountAmt != null) {
        $scope.CoupounDiscountAmt = parseInt(vCoupounDiscountAmt);
    }

    if (vCartItem != null) {
        $scope.CartItems1 = JSON.parse(vCartItem);
    }
    if (vAmount != null) {
        $scope.TotalAmount1 = vAmount;
    }
    else
        $scope.TotalAmount1 = 0;

    var BindDeliveryCharges = function () {
        debugger;
        var vTotQty = 0;
        var vCart = localStorage.getItem("CartItem");
        $scope.CartItem = JSON.parse(vCart);
       

        vTotQty = $scope.TotalAmount1;
        $http({
            url: vUrl + "IndexPage/GetProductDelCharges",
            method: 'GET',
            params: { strCount: vTotQty },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            var vData = response.data;
            var vDCharge = 0;
            if (response.data.length == 0) {
                $http({
                    url: vUrl + "IndexPage/GetProductDelCharges",
                    method: 'GET',
                    params: { strCount: vTotQty },
                    headers: { "Content-Type": JSON }
                }).then(function (response) {
                    debugger;
                    vData = response.data;
                    if (response.data.length != 0) {
                        $scope.DeliveryCharges = vData["0"].Price;
                        vDCharge = vData["0"].Price;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        //   $scope.TotalAmount = Number($rootscope.cAmcurrent) + Number(vData["0"].Price);
                        $scope.TotalAmount = Number(localStorage.getItem("totalamount")) + Number(vData["0"].Price);
                        debugger;
                        $scope.Subtotal = parseInt($scope.TotalAmount - Number(vData["0"].Price)) ;
                        $rootScope.Subtotal = $scope.Subtotal;
                        localStorage.setItem("Subtotal", $scope.Subtotal);
                    }
                    else {
                        $scope.DeliveryCharges = 0;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        //  $scope.TotalAmount = ($rootscope.cAmcurrent);
                        $scope.TotalAmount = localStorage.getItem("totalamount");
                        debugger;
                        $scope.Subtotal = Number(localStorage.getItem("totalamount"));
                        $rootScope.Subtotal = $scope.Subtotal;
                        localStorage.setItem("Subtotal", $scope.Subtotal);
                    }
                });
            }
            else {
                debugger;
                $scope.Deliverycharge = true;
                $scope.Deliverych = vData["0"].Price;
                vDCharge = vData["0"].Price;
                localStorage.setItem("DeliveryCharges", vDCharge);
                $scope.DeliveryCharges = vData["0"].Price;
                //     $scope.TotalAmount = Number($rootscope.cAmcurrent) + Number(vData["0"].Price);
                $scope.TotalAmount = Number(localStorage.getItem("totalamount")) + Number(vData["0"].Price);
                debugger;
                $scope.Subtotal = parseInt($scope.TotalAmount - Number(vData["0"].Price));
                $rootScope.Subtotal = $scope.Subtotal;
                localStorage.setItem("Subtotal", $scope.Subtotal);
            }

        }).catch(function (response) {
        });
    }

   // BindDeliveryCharges();

    var RemoveProductBindDeliveryCharges = function(totalvAmount) {
        debugger;
    

       // vTotQty = $scope.TotalAmount1;
        $http({
            url: vUrl + "IndexPage/GetProductDelCharges",
            method: 'GET',
            params: { strCount: totalvAmount },
            headers: { "Content-Type": JSON }
        }).then(function(response) {
            debugger;
            var vData = response.data;
            var vDCharge = 0;
            if (response.data.length == 0) {
                $http({
                    url: vUrl + "IndexPage/GetProductDelCharges",
                    method: 'GET',
                    params: { strCount: totalvAmount },
                    headers: { "Content-Type": JSON }
                }).then(function(response) {
                    debugger;
                    vData = response.data;
                    if (response.data.length != 0) {
                        $scope.DeliveryCharges = vData["0"].Price;
                        vDCharge = vData["0"].Price;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        //   $scope.TotalAmount = Number($rootscope.cAmcurrent) + Number(vData["0"].Price);
                        $scope.TotalAmount = Number($rootScope.TotalAmount) + Number(vData["0"].Price);
                        debugger;
                        var vtotalOrderamt = parseInt($rootScope.TotalAmount);
                        $rootScope.Subtotal = parseInt($rootScope.TotalAmount);
                        $scope.Subtotal = parseInt($rootScope.TotalAmount);
                    }
                    else {
                        $scope.DeliveryCharges = 0;
                        debugger;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        //  $scope.TotalAmount = ($rootscope.cAmcurrent);
                        $scope.TotalAmount = $rootScope.TotalAmount;
                        var vtotalOrderamt = parseInt($rootScope.TotalAmount);
                        $rootScope.Subtotal = parseInt(localStorage.getItem("totalamount"));
                        $scope.Subtotal = parseInt(localStorage.getItem("totalamount"));

                    }
                });
            }
            else {
                debugger;
                $scope.Deliverycharge = true;
                $scope.Deliverych = vData["0"].Price;
                vDCharge = vData["0"].Price;
                localStorage.setItem("DeliveryCharges", vDCharge);
                $scope.DeliveryCharges = vData["0"].Price;
                //     $scope.TotalAmount = Number($rootscope.cAmcurrent) + Number(vData["0"].Price);
                $scope.TotalAmount = Number($scope.TotalAmount) + Number(vData["0"].Price);
                debugger;
                var vtotalOrderamt = parseInt($scope.TotalAmount);
                $rootScope.Subtotal = parseInt($scope.TotalAmount);
                $scope.Subtotal = parseInt($scope.TotalAmount);
            }

        }).catch(function(response) {
        });
    }

    $scope.RemoveFromCart = function (VarianceId) {
        debugger;
        var vCart = localStorage.getItem("CartItem");
        $scope.CartItem = JSON.parse(vCart);
        for (var i = $scope.CartItem.length - 1; i >= 0; i--) {
            if ($scope.CartItem[i].VarianceId == VarianceId) {
                $scope.CartItem.splice(i, 1);
            }
        }
        //localStorage.clear(); 
        //vCartItem = null; 
        //vCart = null;
        //vCartItem = vCart; 
        localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
        var vCartItems = localStorage.getItem("CartItem");
        var vCoupounDiscountAmt = localStorage.getItem("CoupounDiscountAmt");
        if (vCoupounDiscountAmt == "" || vCoupounDiscountAmt == null || vCoupounDiscountAmt == undefined) {

            vCoupounDiscountAmt = 0;
        }
        var vCount = 0; var vAmount = 0;
        var totalvAmount = 0;
        angular.forEach($scope.CartItem, function (value) {
            vCount = vCount + Number(value.Qty || 0);
            totalvAmount = totalvAmount + ((Number(value.Qty || 0) * Number(value.Price || 0))
                - ((Number(value.Qty || 0)) * (Number(value.Discount || 0)))
                - ((Number(value.Qty || 0)) * (Number(value.vTodayDealAmountt || 0)))
                - (Number(value.CopounAmount || 0)) + ((Number(value.Qty || 0)) * (Number(value.Tax || 0))));
            vAmount = vAmount + ((Number(value.Qty || 0) * Number(value.Price || 0))
            );
        });
        localStorage.setItem("Amount", vAmount);
        localStorage.setItem("Count", vCount);
        $rootScope.CartItems = JSON.parse(vCartItems);
        $rootScope.TotalAmount = vAmount;
       
        localStorage.setItem("totalamount", totalvAmount);
        $rootScope.cAmcurrent = totalvAmount;

        var vtotalOrderamt = parseInt(vAmount);
        $rootScope.Subtotal = $rootScope.TotalAmount;
        $scope.Subtotal = $rootScope.TotalAmount;;
        debugger;
        $rootScope.TotalAmount = parseInt($rootScope.Subtotal);
        $scope.TotalAmount = $rootScope.TotalAmount;

        if ($rootScope.TotalAmount == "0" || $rootScope.TotalAmount == 0) {
            debugger;
            $scope.Subtotal = 0;
            $scope.CoupounDiscountAmt = 0;
            localStorage.setItem("Subtotal", $scope.Subtotal);
            localStorage.setItem("CoupounDiscountAmt", $scope.CoupounDiscountAmt);
        }


        localStorage.setItem("CoupounDiscountAmt", vCoupounDiscountAmt);
        localStorage.setItem("totalamount", $scope.TotalAmount);
        localStorage.setItem("Subtotal", $scope.Subtotal);



        $rootScope.Count = vCount;
        $scope.CartItems1 = JSON.parse(vCartItems);
        $scope.TotalAmount = totalvAmount;
        RemoveProductBindDeliveryCharges(totalvAmount);

      
    }

    //$Scope.CoupounDiscountAmt = 0;

    $scope.CoupounDiscountAmt = 0;

    $scope.UpdateCountFromCart = function (ProductId, Qty, VarianceId) {
        $scope.CoupounTextBox = true;
        $scope.CoupoupApplyBtn = true;

        $scope.CoupounDiscountAmt = parseInt($scope.CoupounDiscountAmt * Qty); 

        if (Qty == undefined) {
            addProductNotice('Invalid Quantity', '', '<h3>Please enter the valid Quantity.</h3>', 'Success');
            return;
        }
        if (Qty < 1) {
            addProductNotice('Invalid Quantity', '', '<h3>Please enter the valid Quantity.</h3>', 'Success');
            return;
        }
        $http({
            url: vUrl + "IndexPage/GetProductStockCount",
            method: 'GET',
            params: { iProdId: ProductId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {

            var vResponse = response.data;
            if (vResponse == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                if (vResponse.length == 0) {
                    addProductNotice('Out of Stock', '', '<h3>Ordered Product in out of stock.</h3>', 'Success');
                    return;
                }
                var vStockCount = vResponse["0"].StockCount;
                if ($scope.CoupounDiscountAmt != null || $scope.CoupounDiscountAmt != "" || $scope.CoupounDiscountAmt != undefined) {

                    var vCouponDiscountAmt = parseInt($scope.CoupounDiscountAmt);
                }
                else {

                    var vCouponDiscountAmt = 0;
                }

                if (vStockCount >= Qty) {
                    var vCart = localStorage.getItem("CartItem");
                    $scope.CartItem = JSON.parse(vCart);
                    $scope.CartItem.find(v => v.ProductId == ProductId && v.VarianceId == VarianceId).Qty = Qty;
                    localStorage.clear();
                    localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                    var vCartItems = localStorage.getItem("CartItem");
                    var vCount = 0; var vAmount = 0;
                    var totalvAmount = 0;

                    angular.forEach($scope.CartItem, function (value) {
                        debugger;
                        vCount = vCount + Number(value.Qty || 0);
                        vAmount = vAmount + ((Number(value.Qty || 0)) * Number(value.Price || 0));
                        totalvAmount = totalvAmount + ((Number(value.Qty || 0) * Number(value.Price || 0))
                            - ((Number(value.Qty || 0)) * (Number(value.Discount || 0))) -
                            ((Number(value.Qty || 0)) * (Number(value.vTodayDealAmountt || 0))) -
                            (Number(vCouponDiscountAmt || 0)) + ((Number(value.Qty || 0))) * (Number(value.Tax || 0)));
                    });
                    debugger;
                    localStorage.setItem("Amount", vAmount);
                    RemoveProductBindDeliveryCharges(vAmount);
                    localStorage.setItem("Count", vCount);
                    $rootScope.CartItems = JSON.parse(vCartItems);
                    $rootScope.cAmcurrent = totalvAmount;
                    
                    // $scope.TotalAmount = vAmount;

                    var vtotalOrderamt = parseInt(vAmount);
                    $rootScope.Subtotal = vAmount;
                    localStorage.setItem("Subtotal", vAmount);
                    debugger;
                    $rootScope.TotalAmount = parseInt($rootScope.Subtotal - vCouponDiscountAmt);
                    $scope.TotalAmount = totalvAmount;
                    $rootScope.TotalAmount = $scope.TotalAmount;
                    localStorage.setItem("CoupounDiscountAmt", vCouponDiscountAmt);
                    localStorage.setItem("totalamount", $scope.TotalAmount);
                    $rootScope.Count = vCount;

                    $scope.CartItems1 = JSON.parse(vCartItems);
                }
                else {
                    addProductNotice('Out of Stock', '', '<h3>Ordered Product in out of stock.</h3>', 'Success'); return;
                }
            }
        });
    }

    $scope.ApplyCOuponBtn = "Apply";
    $scope.CouponshowAmt = false;
    $scope.ApplyCopounCode = function (id, ProductId, Price, Tax, Qty, VarianceId, txtid, CoupounCode) {
        debugger;
        var vbtnid = id["0"];
        var vtxtbox = txtid["0"];
        var vCoupounValue = CoupounCode;

        $http({
            url: vUrl + "IndexPage/GetProductCoupouns",
            method: 'GET',
            params: { CopounName: vCoupounValue, ProductDetailId: ProductId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            if (response.data.length != 0) {
                // var result = response.data;
                var vOfferType = response.data["0"].OfferType;
                var vAmountFrom = response.data["0"].AmountFrom;
                var vDiscountPercentage = response.data["0"].DiscountPercentage;
                if (vOfferType == "A") {
                    var vprice = parseInt(vAmountFrom);
                }
                if (vOfferType == "P") {
                    var vprice = parseInt((vDiscountPercentage * Price)/ 100);
                }
                $scope.CoupounDiscountAmt = parseInt($scope.CoupounDiscountAmt + (vprice * Qty));
                debugger;
                // $scope.ci.CoupounDiscountAmt = $scope.CoupounDiscountAmt;
                var vCart = localStorage.getItem("CartItem");
                $scope.CartItem = JSON.parse(vCart);
                $scope.CartItem.find(v => v.ProductId == ProductId && v.VarianceId == VarianceId).Qty = Qty;
                localStorage.clear();
                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                var vCartItems = localStorage.getItem("CartItem");
                var vCount = 0; var vAmount = 0;
                var totalvAmount = 0;

                angular.forEach($scope.CartItem, function (value) {
                    debugger;
                    vCount = vCount + Number(value.Qty || 0);
                    vAmount = vAmount + ((Number(value.Qty || 0)) * Number(Price || 0));
                    debugger;
                    totalvAmount = totalvAmount + ((Number(value.Qty || 0) * Number(Price || 0))
                        - ((Number(value.Qty || 0)) * (Number(value.Discount || 0))) -
                        ((Number(value.Qty || 0)) * (Number(value.vTodayDealAmountt || 0))) -
                        ((Number(value.Qty || 0))) * (Number(value.Tax || 0)));
                });
                debugger;
                localStorage.setItem("Amount", vAmount);
                RemoveProductBindDeliveryCharges(vAmount);
                localStorage.setItem("Count", vCount);
                $rootScope.CartItems = JSON.parse(vCartItems);
                $rootScope.cAmcurrent = totalvAmount;
                $rootScope.TotalAmount = vAmount;
                // $scope.TotalAmount = vAmount;

                var vtotalOrderamt = parseInt(vAmount);
                $rootScope.Subtotal = $rootScope.TotalAmount;
                localStorage.setItem("Subtotal", vAmount);
                debugger;
                $rootScope.TotalAmount = parseInt($rootScope.Subtotal - $scope.CoupounDiscountAmt);
                $scope.TotalAmount = $rootScope.TotalAmount;
                localStorage.setItem("CoupounDiscountAmt", $scope.CoupounDiscountAmt);
                localStorage.setItem("totalamount", $scope.TotalAmount);


                //localStorage.setItem("totalamount", totalvAmount);
                $rootScope.Count = vCount;
                $scope.CartItems1 = JSON.parse(vCartItems);
                addProductNotice(' Copon Code Applied', '', '<h3>Copon Code Applied SuccessFully. </h3>', 'Success');

                $("#"+vbtnid).prop("disabled", true); 
                $("#" + vtxtbox).prop("disabled", true);

                document.getElementById(""+vbtnid).innerText = "Applied";
                $scope.CoupounTextBox = true;
                $scope.CoupoupApplyBtn = true;
                $scope.ApplyCOuponBtn = "Applied";
                debugger;
                $scope.CouponshowAmt = true;
            }
            else
            {
                addProductNotice('Invalid Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success');
                $scope.CoupounTextBox = false;
                $scope.CoupoupApplyBtn = false;
                $scope.CouponshowAmt = false;
                document.getElementById(""+vbtnid).innerText = "Apply";
                //$scope.ApplyCOuponBtn = "Apply";
            }
        }).catch(function (response) {
        });
        // else { addProductNotice('Invalid Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success'); }
    }

    $scope.ApplyCopounCodeforMobile = function (id, ProductId, Price, Tax, Qty, VarianceId, txtid, CoupounCode) {
        debugger;
        var vbtnid = id["0"];
        var vtxtbox = txtid["0"];
        var vCoupounValue = CoupounCode;



        $http({
            url: vUrl + "IndexPage/GetProductCoupouns",
            method: 'GET',
            params: { CopounName: vCoupounValue, ProductDetailId: ProductId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            if (response.data.length != 0) {
                // var result = response.data;
                var vOfferType = response.data["0"].OfferType;
                var vAmountFrom = response.data["0"].AmountFrom;
                var vDiscountPercentage = response.data["0"].DiscountPercentage;
                if (vOfferType == "A") {
                    var vprice = parseInt(vAmountFrom);
                }
                if (vOfferType == "P") {
                    var vprice = parseInt((vDiscountPercentage * Price) / 100);
                }
                $scope.CoupounDiscountAmt = parseInt($rootScope.CoupounDiscountAmt + (vprice * Qty));
                // $scope.ci.CoupounDiscountAmt = $scope.CoupounDiscountAmt;
                var vCart = localStorage.getItem("CartItem");
                $scope.CartItem = JSON.parse(vCart);
                $scope.CartItem.find(v => v.ProductId == ProductId && v.VarianceId == VarianceId).Qty = Qty;
                localStorage.clear();
                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                var vCartItems = localStorage.getItem("CartItem");
                var vCount = 0; var vAmount = 0;
                var totalvAmount = 0;

                angular.forEach($scope.CartItem, function (value) {
                    debugger;
                    vCount = vCount + Number(value.Qty || 0);
                    vAmount = vAmount + ((Number(value.Qty || 0)) * Number(Price || 0));
                    debugger;
                    totalvAmount = totalvAmount + ((Number(value.Qty || 0) * Number(Price || 0))
                        - ((Number(value.Qty || 0)) * (Number(value.Discount || 0))) -
                        ((Number(value.Qty || 0)) * (Number(value.vTodayDealAmountt || 0))) -
                        ((Number(value.Qty || 0))) * (Number(value.Tax || 0)));
                });
                debugger;
                localStorage.setItem("Amount", vAmount);
                RemoveProductBindDeliveryCharges(vAmount);
                localStorage.setItem("Count", vCount);
                $rootScope.CartItems = JSON.parse(vCartItems);
                $rootScope.cAmcurrent = totalvAmount;
                $rootScope.TotalAmount = vAmount;
                // $scope.TotalAmount = vAmount;

                var vtotalOrderamt = parseInt(vAmount);
                $rootScope.Subtotal = $rootScope.TotalAmount;
                localStorage.setItem("Subtotal", vAmount);
                debugger;
                $rootScope.TotalAmount = parseInt($rootScope.Subtotal - $scope.CoupounDiscountAmt);
                $scope.TotalAmount = $rootScope.TotalAmount;
                localStorage.setItem("CoupounDiscountAmt", $scope.CoupounDiscountAmt);
                localStorage.setItem("totalamount", $scope.TotalAmount);


                //localStorage.setItem("totalamount", totalvAmount);
                $rootScope.Count = vCount;
                $scope.CartItems1 = JSON.parse(vCartItems);
                addProductNotice(' Copon Code Applied', '', '<h3>Copon Code Applied SuccessFully. </h3>', 'Success');

                $("#" + vbtnid).prop("disabled", true);
                $("#" + vtxtbox).prop("disabled", true);

                document.getElementById("" + vbtnid).innerText = "Applied";
                $scope.CoupounTextBox = true;
                $scope.CoupoupApplyBtn = true;
                $scope.ApplyCOuponBtn = "Applied";
                debugger;
                $scope.CouponshowAmt = true;
            }
            else {
                addProductNotice('Invalid Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success');
                $scope.CoupounTextBox = false;
                $scope.CoupoupApplyBtn = false;
                $scope.CouponshowAmt = false;
                document.getElementById("" + vbtnid).innerText = "Apply";
                //$scope.ApplyCOuponBtn = "Apply";
            }
        }).catch(function (response) {
        });
        // else { addProductNotice('Invalid Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success'); }
    }

    $scope.btnCheckoutClick = function () {
        debugger;
        $("#shoppingcart").attr("disabled", true);

        var vDeliveryCharge = localStorage.getItem("DeliveryCharges");
        var vAmtTotal = localStorage.getItem("Amount");
        var vLocaltotal = localStorage.getItem("totalamount");

        var vTotAmount = Number(vDeliveryCharge) + Number(vLocaltotal);
        var vCount = $rootScope.Count; if (vCount == undefined || vCount == null || vCount == 0) {
            addProductNotice('Empty Cart', '', '<h3>Add atleast one item into the cart before checkout.</h3>', 'Success');
            $("#shoppingcart").attr("disabled", false);
            return;
        }
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '') {
            addProductNotice('SignIn Required', '', '<h3>Please SignIn first then only you can able to Checkout.</h3>', 'Success');
            $("#shoppingcart").attr("disabled", false);
            return;
        }
        else {
            var vDeliveryAddress = localStorage.getItem("DeliveryAddress");


            //if (vDeliveryAddress != undefined && vDeliveryAddress != null && vDeliveryAddress != "" && vDeliveryAddress != "[]") {
            //    let rPass = Math.random().toString(36).substring(7);
            //    var vOrderNo = rPass; $.session.set('SalOrderNo', vOrderNo);
            //    if (confirm("Do you want to place an order?")) {
            //        //vAmtTotal = n.round(2);
            //        //vAmtTotal = vAmtTotal.round(2);
            //        $http({
            //            url: vUrl + "CartPayment/PayPalTest",
            //            dataType: 'json',
            //            method: 'POST',
            //            data: vDeliveryAddress,
            //            params: { TotalAmount: $scope.TotalAmount },
            //            headers: {
            //                "Content-Type": "application/json"
            //            }
            //        }).then(function (response) {
            //            
            //            var vOrderno = response.data;
            //            window.location.href = vOrderno;
            //        }).catch(function (response) {
            //            
            //        });
            //    }
            //        //window.location.href = "#!Invoice";
            //}

            $http({
                url: vUrl + "IndexPage/EditMemberProfile", method: 'GET',
                params: { MemberId: vclientMemberId }, headers: { "Content-Type": JSON }
            }).then(function (response) {
                debugger;
                var vResult = response.data;
                if (vResult == "TimeOut")
                    window.location.href = "#!TimeOut";
                else {
                    var vMemberName = vResult["0"].MemberName;
                    var vContactNo = vResult["0"].ContactNo;
                    var vEmailId = vResult["0"].EmailId;
                    var vAddressLine1 = vResult["0"].AddressLine1;
                    var vAddressLine2 = vResult["0"].AddressLine2;
                    var vCity = vResult["0"].City;
                    var vMemberId = vResult["0"].MemberId;
                    var vState = vResult["0"].State;
                    var vPinCode = vResult["0"].PinCode;
                    $scope.Profile = {
                        MemberId: vMemberId, MemberName: vMemberName, ContactNo: vContactNo,
                        EmailId: vEmailId, AddressLine1: vAddressLine1, AddressLine2: vAddressLine2,
                        City: vCity, State: vState, PinCode: vPinCode
                    }; $('#myModalDelAddress').modal('show');
                }
            }).catch(function (response) {
            });

        }
    }

   

    $http({
        url: vUrl + "ProductDetail/Deliverycharge",
        method: 'GET',
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        $scope.Deliverycharges = response.data;
        $scope.Toprice = response.data["0"].Toprice;
        if (response.data.length != 0) {
            $scope.deliveryhide = true;
            $scope.showdeliveryfree = true;
        }

    }).catch(function (response) {

    });

   

    $scope.checkout = function () { }
    //$scope.ApplyCopoun = function (ProductId, CopounCode) {
    //    var vTaxPercentage = 0; if (txtCopounCode == CopounCode) {
    //        var vDiscount = 0, vTax = 0;
    //        var vCoponAmt = (Number(Price) * Number(CopounPercentage) / 100);
    //        if (DiscountDetailsId != null && DiscountDetailsId != "") {
    //            $http({
    //                url: vUrl + "IndexPage/GetProductDiscountDetais",
    //                method: 'GET',
    //                params: { iDiscountDetailsId: DiscountDetailsId },
    //                headers: { "Content-Type": JSON }
    //            }).then(function (response) {
    //                var vResult = response.data;
    //                var vDiscountPercentage = vResult["0"].DiscountPercentage;
    //                vDiscount = Price * vDiscountPercentage / 100;
    //                }).catch(function (response) {
    //                });
    //        }
    //        if (TaxDetailsId != null && TaxDetailsId != "") {
    //            $http({
    //                url: vUrl + "IndexPage/GetProductTaxDetais",
    //                method: 'GET',
    //                params: { iTaxDetailsId: TaxDetailsId },
    //                headers: { "Content-Type": JSON }
    //            }).then(function (response) {
    //                var vResult = response.data;
    //                vTaxPercentage = vResult["0"].Percentage;
    //            }).catch(function (response) { });
    //        }
    //        var vCart = localStorage.getItem("CartItem");
    //        $scope.CartItem = JSON.parse(vCart); $timeout(function () {
    //            vTax = (Price - vDiscount - vCoponAmt) * vTaxPercentage / 100;
    //            var vCount = 0; var vAmount = 0;
    //            angular.forEach($scope.CartItem, function (value) {
    //                vCount = vCount + Number(value.Qty || 0);
    //                if (ProductId == value.ProductId) {
    //                    vCoponAmt = ((Number(value.Qty || 0)) * (Number(vCoponAmt || 0)))
    //                    $scope.CartItem.find(v => v.ProductId == ProductId).CopounAmount = vCoponAmt;
    //                    $scope.CartItem.find(v => v.ProductId == ProductId).Tax = vTax;
    //                }
    //                vAmount = vAmount + ((Number(value.Qty || 0) * Number(value.Price || 0)) - ((Number(value.Qty || 0)) * (Number(value.Discount || 0))) - ((Number(value.Qty || 0)) * (Number(value.CopounAmount || 0))) + ((Number(value.Qty || 0)) * (Number(value.Tax || 0))));
    //            }); localStorage.clear();
    //            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
    //            var vCartItems = localStorage.getItem("CartItem");
    //            vAmount = Math.round(vAmount); localStorage.setItem("Amount", vAmount);
    //            localStorage.setItem("Count", vCount); $scope.CartItems1 = JSON.parse(vCartItems);
    //            $rootScope.CartItems1 = JSON.parse(vCartItems);
    //            $rootScope.TotalAmount = vAmount;
    //            $rootScope.Count = vCount;
    //        }, 1500);
    //    }
    //    else { addProductNotice('Invalid Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success'); }
    //}

   


    $scope.btnContinueClick = function () {

        if ($scope.Profile.MemberName == undefined || $scope.Profile.MemberName == null || $scope.Profile.MemberName == "") {
            $scope.msgUpdate = 'Please Enter MemberName';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.ContactNo == undefined || $scope.Profile.ContactNo == null || $scope.Profile.ContactNo == "") {
            $scope.msgUpdate = 'Please Enter ContactNo';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        //if ($scope.Profile.EmailId == undefined || $scope.Profile.EmailId == null || $scope.Profile.EmailId == "") {
        //    $scope.msgUpdate = 'Please Enter EmailId'; $scope.showmsgErrorUpdate = true; return false;
        //}
        if ($scope.Profile.AddressLine1 == undefined || $scope.Profile.AddressLine1 == null || $scope.Profile.AddressLine1 == "") {
            $scope.msgUpdate = 'Please Enter the AddressLine1';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.AddressLine2 == undefined || $scope.Profile.AddressLine2 == null || $scope.Profile.AddressLine2 == "") {
            $scope.msgUpdate = 'Please Enter The AddressLine2';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.City == undefined || $scope.Profile.City == null || $scope.Profile.City == "") {
            $scope.msgUpdate = 'Please Enter the City';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.State == undefined || $scope.Profile.State == null || $scope.Profile.State == "") {
            $scope.msgUpdate = 'Please Enter The State';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.PinCode == undefined || $scope.Profile.PinCode == null || $scope.Profile.PinCode == "") {
            $scope.msgUpdate = 'Please Enter the PinCode';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        if ($scope.Profile.Landmark == undefined || $scope.Profile.Landmark == null || $scope.Profile.Landmark == "") {
            $scope.msgUpdate = 'Please enter your nearby Landmark';
            $scope.showmsgErrorUpdate = true;
            return false;
        }
        localStorage.setItem("DeliveryAddress", JSON.stringify($scope.Profile));

        var vDeliveryAddress = localStorage.getItem("DeliveryAddress");
        var vDeliveryCharge = localStorage.getItem("DeliveryCharges");
        var vAmtTotal = localStorage.getItem("Amount");
        var vTotAmount = Number(vDeliveryCharge) + Number(vAmtTotal);
        let rPass = Math.random().toString(36).substring(7);
        var vOrderNo = rPass;
        $.session.set('SalOrderNo', vOrderNo);
        var vDeliveryaddressstate = "";
        vDeliveryaddressstate = document.getElementById('State').value;

        $.session.set('Deliveryaddressstate', vDeliveryaddressstate);

        //$('#myModalDelAddress').modal('hide');
        //var vclientMemberId = $scope.Profile.MemberId;
        $http({
            url: vUrl + "ProductDetail/UpdateMemberAddress",
            dataType: 'json',
            method: 'POST',
            data: vDeliveryAddress,
            params: { MemberId: vclientMemberId },
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {


            if ($scope.PaymentGateway == "Y") {

                $('#myModalDelAddress').modal('hide');
                window.location.href = "#!checkout";
            }
            if ($scope.PaymentGateway != "Y") {

                $('#myModalDelAddress').modal('hide');
                window.location.href = "#!Invoice";
            }

        }).catch(function (response) {
        });
    }

    $scope.btnPayClick = function () {


    }


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

    //var vtotalOrderamt = parseInt($rootScope.TotalAmount) ; 
    //$rootScope.Subtotal = parseInt(vtotalOrderamt + $rootScope.CoupounDiscountAmt);
    //debugger;

    $scope.ApplyCopounTotaly = function () {
        $scope.IsDisabled = true; var vCopounCode = $scope.CopounCode;
        if (vCopounCode == undefined || vCopounCode == null || vCopounCode == "") {
            addProductNotice('Empty Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success');
        }
        else {
            $http({
                url: vUrl + "IndexPage/GetCopounDetais", method: 'GET', params: { sCouponId: vCopounCode }, headers: { "Content-Type": JSON }
            }).then(function (response) {
                var vResult = response.data; if (vResult == "TimeOut")
                    window.location.href = "#!TimeOut"; else {
                    if (response.data.Count > 0) {
                        var vTotAmt = $rootScope.TotalAmount; var vCopounAmount = vResult["0"].DiscountPercentage; var vOfferType = vResult["0"].OfferType; localStorage.setItem("OfferType", vOfferType); if (vOfferType == "Price") { vTotAmt = Number(vTotAmt) - Number(vCopounAmount); $rootScope.TotalAmount = vTotAmt; localStorage.setItem("Amount", vTotAmt); localStorage.setItem("CopounAmount", vCopounAmount); $scope.IsDisabled = true; }
                        if (vOfferType == "Free Product") { }
                    }
                    else { addProductNotice('Invalid Copon', '', '<h3>Invalid CoponCode.</h3>', 'Success'); $scope.IsDisabled = false; }
                }
            }).catch(function (response) { $scope.IsDisabled = false; });
        }
    }



    $scope.sameasAddress = function () {
        debugger
        const cb = document.getElementById('sameasAddress');
        var cbvalue = cb.checked;

        if (cbvalue == true) {
            debugger
            var vBillingAddressMemberName3 = document.getElementById('BillingAddressMemberName3').value;
            var vBillingAddressContact = document.getElementById('BillingAddressContact').value;
            var vBillingAddressEmail = document.getElementById('BillingAddressEmail').value;
            var vBillingAddressAddressLine1 = document.getElementById('BillingAddressAddressLine1').value;
            var vBillingAddressAddressLine2 = document.getElementById('BillingAddressAddressLine2').value;
            var vBillingAddressCity = document.getElementById('BillingAddressCity').value;
            var vBillingAddressState = document.getElementById('BillingAddressState').value;
            var vBillingAddressPinCode = document.getElementById('BillingAddressPinCode').value;
            var vBillingAddressLandmar = document.getElementById('BillingAddressLandmar').value;
            var vMemberName3 = vBillingAddressMemberName3;
            var vContact = vBillingAddressContact;
            var vEmail = vBillingAddressEmail;
            var vAddressLine1 = vBillingAddressAddressLine1;
            var vAddressLine2 = vBillingAddressAddressLine2;
            var vCity = vBillingAddressCity;
            var vState = vBillingAddressState;
            var vPinCode = vBillingAddressPinCode;
            var vLandmar = vBillingAddressLandmar;
            $scope.Profile.MemberName1 = vMemberName3;
            $scope.Profile.ContactNo1 = vContact;
            $scope.Profile.EmailId1 = vEmail;
            $scope.Profile.AddressLine11 = vAddressLine1;
            $scope.Profile.AddressLine21 = vAddressLine2;
            $scope.Profile.City1 = vCity;
            $scope.Profile.State1 = vState;
            $scope.Profile.PinCode1 = vPinCode;
            $scope.Profile.Landmark1 = vLandmar;
        }

        else {
            debugger
            $scope.Profile.MemberName1 = "";
            $scope.Profile.ContactNo1 = "";
            $scope.Profile.EmailId1 = "";
            $scope.Profile.AddressLine11 = "";
            $scope.Profile.AddressLine21 = "";
            $scope.Profile.City1 = "";
            $scope.Profile.State1 = "";
            $scope.Profile.PinCode1 = "";
            $scope.Profile.Landmark1 = "";
        }
    }

    $scope.ProfileEdit = function () {
        $scope.EmailId3 = true; var vEmailId = $scope.EmailId; var vMemberId = $scope.MemberId;
        $http({
            url: vUrl + "IndexPage/EditMemberProfile", method: 'GET',
            params: { MemberId: vclientMemberId }, headers: { "Content-Type": JSON }
        }).then(function mySuccess(response) {
            var result = response.data;
            var vMemberName = result["0"].MemberName;
            var vContactNo = result["0"].ContactNo;
            var vEmailId = result["0"].EmailId;
            var vAddressLine1 = result["0"].AddressLine1;
            var vAddressLine2 = result["0"].AddressLine2;
            var vCity = result["0"].City;
            var vState = result["0"].State;
            var vPinCode = result["0"].PinCode;
            $scope.Profile = result["0"].MemberId;

            $scope.Profile = {
                MemberName: vMemberName, ContactNo: vContactNo, EmailId: vEmailId, AddressLine1:
                    vAddressLine1, AddressLine2: vAddressLine2, City: vCity, State: vState, PinCode: vPinCode
            };
        }).catch(function (response) {

        });
    }


});