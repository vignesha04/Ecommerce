'use strict'; var Ecom = angular.module('Ecom', ['ngRoute', 'ui']);
Ecom.config(function ($routeProvider, $locationProvider) {
//    debugger;
    $routeProvider.when('/', {
        controller: 'HomePageController',
        templateUrl: 'View/ClientView/HomePage.html'
    }).when('/checkout', {
        controller: 'checkoutcontroller', templateUrl: 'View/ClientView/checkout.html'
    }).when('/HomePage/:MemId', {
        controller: 'HomePageController', templateUrl: 'View/ClientView/HomePage.html'
    }).when('/HomePage', {
        controller: 'HomePageController', templateUrl: 'View/ClientView/HomePage.html'
    }).when('/Register', {
        controller: 'RegisterController', templateUrl: 'View/ClientView/Register.html'
    }).when('/Login', { controller: 'LoginController', templateUrl: 'View/ClientView/Login.html' 
        }).when('/AboutUs',
        {
            controller: 'AboutUsController', templateUrl: 'View/ClientView/AboutUs.html'
        }).when('/ContactUs', {
            controller: 'ContactUsController', templateUrl: 'View/ClientView/ContactUs.html'
        }).when('/ShoppingCart', {
            controller: 'ShoppingCartController',
            templateUrl: 'View/ClientView/ViewShoppingCart.html'
            }).when('/ViewProduct/:SubCatId/:CatId', {
                controller: 'ViewProductController',
                templateUrl: 'View/ClientView/ViewProducts.html'

        //}).when('/ViewProduct', {
        //    controller: 'ViewProductController',
        //    templateUrl: 'View/ClientView/ViewProducts.html'
        //}).when('/Product', {
           // controller: 'ViewSingleProductController',
           // templateUrl: 'View/ClientView/ViewSingleProduct.html'

            }).when('/Product/:Prod', {
               controller: 'ViewSingleProductController',
               templateUrl: 'View/ClientView/ViewSingleProduct.html'

        }).when('/PrivacyPolicy', {
            controller: 'PrivacyPolicyController',
            templateUrl: 'View/ClientView/PrivacyPolicy.html'
        })
        .when('/SearchProduct/:searchtxt/:CatId',
        {
            controller: 'ViewProductSearchController',
            templateUrl: 'View/ClientView/ViewSearchProducts.html'
        }).when('/Invoice', {
            controller: 'SalesInvoiceController',
            templateUrl: 'View/ClientView/SalesInvoiceClient.html'
        }).when('/ClientOrder', {
            controller: 'ClientOrdesController',
            templateUrl: 'View/ClientView/ClientOrders.html'
        }).when('/TimeOut', {
            controller: 'TimeOutController', templateUrl: 'View/ClientView/TimeOut.html'
        }).when('/ClientOrder/:ordeno', {
            controller: 'ClientOrdesnoController',
            templateUrl: 'View/ClientView/ClientOrders.html'
        }).when('AdminMainMenu', {
            controller: 'AdminMainMenu',
            templateUrl: 'View/AdminMainMenu.html'
        }).when('/Reorder/:SalesOrderId', {
            controller: 'Reorder',
            templateUrl: 'View/ClientView/Reorder.html'
        }).when('Simple_Bot', {
            controller: 'Simple_BotController',
            templateUrl: 'View/ClientView/Simple_Bot.html'
        }).when('/TermsAndConditions', {
            controller: 'TermsAndConditionsController',
            templateUrl: 'View/ClientView/TermsAndConditions.html'
        })
/* $locationProvider.html5Mode(true);*/
    


});