'use strict';

Ecom.controller('ViewProductController', function ($scope, $http, $rootScope, $routeParams, $window) {

    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    $scope.CompanyName = $.session.get('CompanyName');
    var vProdId = $routeParams.Prod;


    var vCartItem = localStorage.getItem("CartItem");
    $scope.AddToCart = function (Title, Price, ProductId, Picture, Qty) {

        if (vCartItem != null) {
            $scope.CartItem = JSON.parse(vCartItem);
            $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: Qty });
            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
        }
        else {
            $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: Qty });
            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
        }

        var vCount = 0; var vAmount = 0;
        angular.forEach($scope.CartItem, function (value) {
            vCount = vCount + Number(value.Qty || 0);
            vAmount = vAmount + (Number(value.Qty || 0) * Number(value.Price || 0));
        });

        var vCartItems = localStorage.getItem("CartItem");
        localStorage.setItem("Amount", vAmount);
        localStorage.setItem("Count", vCount);

        $rootScope.CartItems = JSON.parse(vCartItems);
        $rootScope.TotalAmount = vAmount;
        $rootScope.Count = vCount;

        addProductNotice('Product Added to cart', '', '<h3>Success: You have added ' + Title + ' to your Cart</h3>!', 'Success');

    }



    $http({
        url: vUrl + "ProductDetail/GetNewItems",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.NewItems = response.data;

    }).catch(function (response) {
        });


    var BindProductList = function (SubCatId) {
        $http({
            url: vUrl + "ProductDetail/GetRelatedProductDetails",
            method: 'GET',
            params: { SubCategoryId: SubCatId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            $scope.ProductList = response.data;

        }).catch(function (response) {
        });
    }
    BindProductList(vSubCategoryId);


});