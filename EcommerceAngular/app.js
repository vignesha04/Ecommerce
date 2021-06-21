'use strict';

var ScBusinez = angular.module('ScBusinez', ['ngRoute', 'angularUtils.directives.dirPagination']);

ScBusinez.config(function ($routeProvider) {

    $routeProvider.
        when('/home', {
            controller: 'AdminController',
            templateUrl: 'Admin.html'
        }).
        when('/', {
            controller: 'AdminController',
            templateUrl: 'Admin.html'
        }).
        when('/Discount', {
            controller: 'DiscountController',
            templateUrl: 'View/Discount.html'
        }).
        when('/PaymentOption', {
            controller: 'PaymentOptionController',
            templateUrl: 'View/PaymentOption.html'
        }).
        when('/Subcat', {
            controller: 'SubCategoryController',
            templateUrl: 'View/Subcat.html'
        }).
        when('/TaxDetails', {
            controller: 'TaxDetailsController',
            templateUrl: 'View/TaxDetails.html'
        }).
        when('/CouponDetails', {
            controller: 'CouponCodeController',
            templateUrl: 'View/CouponCode.html'
        }).
        when('/AddDetail', {
            controller: 'AddDetailController',
            templateUrl: 'View/AddDetail.html'
        }).
        when('/Category', {
            controller: 'CategoryController',
            templateUrl: 'View/Category.html'
        }).
        when('/ProductDetails', {
            controller: 'ProductDetailsController',
            templateUrl: 'View/ProductDetails.html'
        }).
        when('/TermsAndCondition', {
            controller: 'TermsAndConditionController',
            templateUrl: 'View/TermsAndCondition.html'
        }).
        when('/AboutUsAdmin', {

            controller: 'AboutUsAdminController',
            templateUrl: 'View/AboutUsAdmin.html'
        }).
        when('/ContactUsAdmin', {
            controller: 'ContactUsAdminController',
            templateUrl: 'View/ContactUsAdmin.html'
        }).
        when('/Stock', {

            controller: 'StockManagementController',
            templateUrl: 'View/StockManagement.html'
        }).
        when('/CopyRights', {
            controller: 'CopyRightAdminController',
            templateUrl: 'View/CopyRightAdmin.html'
        }).
        when('/Settings', {
            controller: 'SiteSettingsController',
            templateUrl: 'View/SiteSettings.html'
        }).
        when('/SocliaMedia', {
            controller: 'SocialMediaSettingController',
            templateUrl: 'View/SocialMediaSettings.html'
        }).
        when('/DashBoard', {
            controller: 'DashBoardController',
            templateUrl: 'View/DashBoardAdmin.html'
        }).
        when('/HomePageConfiguration', {
            controller: 'HomePageConfigurationController',
            templateUrl: 'View/HomePageConfiguration.html'
        }).
        when('/ProductConfiguration', {
            controller: 'ProductConfigurationController',
            templateUrl: 'View/ProductConfiguration.html'
        }).
        when('/Widgets', {
            controller: 'WidgetsController',
            templateUrl: 'View/Widgets.html'
        }).
        when('/SalOrder', {
            controller: 'SalesOrderDetailsController',
            templateUrl: 'View/SalesOrderDetails.html'
        }).
        when('/Company', {
            controller: 'CompanyDetailsController',
            templateUrl: 'View/CompanyDetails.html'
        }).
        when('/Courier', {
            controller: 'CourierDetailController',
            templateUrl: 'View/CourierDetail.html'
        }).
        when('/SalesReport', {
            controller: 'SalesReportController',
            templateUrl: 'View/SalesReport.html'
        }).
        when('/TermsAndConditionInvoive', {
            controller: 'TermsAndConditionInvoiveController',
            templateUrl: 'View/TermsAndConditionInvoive.html'
        }).
        when('/SalesReportDetail', {
            controller: 'SalesReportDetailController',
            templateUrl: 'View/SalesReportDetail.html'
        }).
        when('/PaymentType', {
            controller: 'PaymentTypeController',
            templateUrl: 'View/PaymentType.html'
        }).
        when('/DeliveryChrg', {
            controller: 'DeliveryChargesController',
            templateUrl: 'View/DeliveryCharges.html'
        }).when('/DeliveryConfirmation', {
            controller: 'DeliveryconfirmationController',
            templateUrl: 'View/DeliveryConfirmation.html'
        }).when('/SliderAdmin', {
            controller: 'HomeSliderAdminController',
            templateUrl: 'View/SliderAdmin.html'
        }).when('/TodayDealAdmin', {
            controller: 'TodayDealAdminController',
            templateUrl: 'View/TodayDealAdmin.html'
        }).
        when('/MessageAlertAdmin', {
            controller: 'MessageAlertAdminController',
            templateUrl: 'View/MessageAlertAdmin.html'
        }).
        when('/BrandType', {
            controller: 'BrandTypeController',
            templateUrl: 'View/BrandType.html'
        }).
        when('/ProductVariance', {
        controller: 'ProductVariance',
            templateUrl: 'View/ProductVariance.html'
        }).
        when('/Register', {
            controller: 'AppRegister',
            templateUrl: 'View/AppRegister.html'
        }).
        when('/CustomerDetail', {
            controller: 'CustomerDetailController',
            templateUrl: 'View/CustomerDetail.html'  
        }).
        when('/CustomerRating', {
            controller: 'CustomerRatingController',
            templateUrl: 'View/CustomerRating.html'
        }).
        when('/PrivacyPolicy', {
            controller: 'PrivacyPolicyAdminController',
            templateUrl: 'View/PrivacyPolicy.html'
        }).
        when('/BulkOrder', {
            controller: 'BulkOrderController',
            templateUrl: 'View/BulkOrder.html'
        }).
        when('/UserManagement', {
            controller: 'UserManagementController',
            templateUrl: 'View/UserManagement.html'
        }).
        when('/Barcode', {
            controller: 'BarcodeController',
            templateUrl: 'View/Barcode.html'
        })

    

});
