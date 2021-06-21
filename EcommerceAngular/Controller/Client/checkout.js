'use strict'; Ecom.controller('checkoutcontroller', function ($scope, $http, $rootScope, $timeout, $window, $sce) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
  

    var vTotalAmountForcart = "";
    vTotalAmountForcart = $rootScope.TotalAmount;
    //$scope.totalamountcart = vTotalAmountForcart;

    var vCartItem = localStorage.getItem("CartItem");
    
    var vCount = localStorage.getItem("Count");
    var vAmount = localStorage.getItem("Amount");
    if (vCartItem != null) {
        $scope.CartItems1 = JSON.parse(vCartItem);
    }
    if (vAmount != null) {
        $scope.TotalAmount1 = vAmount;
    }
    else
        $scope.TotalAmount1 = 0;


    $scope.btnContinueClick = function () {
        
        $http({
            url: vUrl + "CartPayment/RazsorPayTest",
            dataType: 'json',
            method: 'POST',
            //data: $scope.Profile,
            params: { TotalAmount: vTotalAmountForcart },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var vOrderno = response.data;
            $scope.orderNumber = vOrderno;
            $scope.btnClick();
            //window.location.href = vOrderno;
        }).catch(function (response) {
            
        });
    }
    $scope.PaymentGatewayKey = $.session.get('PaymentGatewayKey');
    $scope.CompanyName = $.session.get('CompanyName');
    $scope.options = {
        'key': $scope.PaymentGatewayKey,
        // Insert the amount here, dynamically, even
        'amount': parseInt($scope.TotalAmount * 100),
        'name': $scope.CompanyName,
        //'description': 'Pay for Order #2323',
        //'image': 'http://webapi.Omshakthitraders.in//Uploads/Companydetails/b0233b98-e8c9-4d59-a3e0-336532dda8cb_OM_Sakthi_Traders-Logo.png',
        "order_id": $scope.orderNumber,
        'handler': function (response) {
            
            if (response.razorpay_payment_id != "" && response.razorpay_payment_id != undefined && response.razorpay_payment_id != null) {
                localStorage.setItem("razorpay_payment_id", response.razorpay_payment_id);
                window.location.href = "#!Invoice";
            }
            else {
                window.location.href = "#!ShoppingCart";
            }
            //alert(response.razorpay_payment_id);
            //alert($scope.orderNumber);
            //alert(response)
        },
        'prefill': {
            'name': '',
            'email': '',
            'contact': ''
        }
    };
    $scope.btnClick = function () {
        
        $.getScript('https://checkout.razorpay.com/v1/checkout.js', function () {
            var rzp1 = new Razorpay($scope.options);
            rzp1.open();

        });


    };
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
});