'use strict'; Ecom.controller('HomePageController', function ($scope, $http, $rootScope, $timeout, $interval, $window, $routeParams) {
    $scope.SubDomain = $.session.get('SubDomain');
   // $scope.SubDomain = "http://localhost:56397/api/";
   
    
    debugger;
    //var vMemberId = $routeParams.MemId;
   // $.session.set('clientMemberId', vMemberId);
    var vUrl ="";
    $window.scrollTo(0, 0);
    $scope.Subcategoryshoe = false;
    $scope.category = true;
    $scope.loader = true;

   
    
    //var vUrl = "http://localhost:56397/api/";
    
   
    var BindSiteSettingConfig = function () {
        $http({
            url: vUrl + "IndexPage/GetSiteSettingConfiguration",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            var vResult = response.data;
            var vCurrencyType = vResult["0"].CurrencyType;
            var vGridSizeClient = vResult["0"].GridSizeClient;
            $scope.CurrencyType = vCurrencyType;
        }).catch(function (response) { });
    }

    var GetHomeSlider  = function () {

        $http({
            url: vUrl + "IndexPage/GetHomeSlider",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            $scope.Customers = response.data;
            if ($scope.Customers == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.Customer = $scope.Customers["0"];
            }
        }).catch(function (response) {
        });

    }

    var GetTodayDeals = function () {

        $http({
            url: vUrl + "IndexPage/GetTodayDeals",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            if (response.data.length != 0) {
                $scope.Todaydeal = true;
            }
            else {
                $scope.Todaydeal = false;
            }
            $scope.TodayDeal = response.data;
            if ($scope.TodayDeal == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.TodayDeals = response.data[0];
                $scope.TodayTitle = response.data[0].Title;
                $scope.TodayDescription = response.data[0].Description;
                $scope.TodayPrice = response.data[0].Price;
                var vPrice = response.data[0].Price;
                var vProdVariance = response.data[0].ProdVariance;
                $scope.ProdId = response.data[0].ProductId;
                if (vProdVariance != undefined && vProdVariance != null && vProdVariance != "") {
                    $scope.VarMRP = vProdVariance["0"].VariancePrice;
                    $scope.VarSellingPrice = vProdVariance["0"].sellingPrice;
                }
                var vTodayTodayDiscountPercentage = response.data[0].TodayDiscountAmount;
                var vDiscountPrice = vTodayTodayDiscountPercentage;
                $scope.TodayDiscountPrice = vDiscountPrice;
                var vDiscount = response.data[0].Discount;
                if (vDiscount != undefined && vDiscount != null && vDiscount != "")
                    $scope.ProdDiscount = vDiscount;
                else
                    $scope.ProdDiscount = 0;
            }
        }).catch(function (response) {
            
        });

    }

    var GetHomepageConfiguration = function () {

        $http({
            url: vUrl + "IndexPage/GetHomepageConfiguration",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var vHomePageSettings = response.data;
            var vShowSlider = vHomePageSettings["0"].ShowSlider;
            var vShowTrendingItems = vHomePageSettings["0"].ShowTrendingItems;
            var vShowNewItems = vHomePageSettings["0"].ShowNewItems;
            var vDisplayBannerImages = vHomePageSettings["0"].DisplayBannerImages;
            var vShowAdvertisement = vHomePageSettings["0"].ShowAdvertisement;
            var SliderImgs = vHomePageSettings["0"].SliderImages;
            var BannerImgs = vHomePageSettings["0"].BannerImages;
            if (vShowTrendingItems == "true") {
                $scope.ShowTrending = true;
                BindCategories();
            }
            if (vShowNewItems == "true") { }
            if (vShowAdvertisement == "true") { }
            if (vDisplayBannerImages == "true") {
                $scope.ShowBanners = true;
                if (BannerImgs["0"].BannerImageURL != undefined && BannerImgs["0"].BannerImageURL != null && BannerImgs["0"].BannerImageURL != "")
                    $scope.ImgBanner1 = BannerImgs["0"].BannerImageURL;
                if (BannerImgs["1"].BannerImageURL != undefined && BannerImgs["1"].BannerImageURL != null && BannerImgs["1"].BannerImageURL != "")
                    $scope.ImgBanner2 = BannerImgs["1"].BannerImageURL;
                if (BannerImgs["2"].BannerImageURL != undefined && BannerImgs["2"].BannerImageURL != null && BannerImgs["2"].BannerImageURL != "")
                    $scope.ImgBanner3 = BannerImgs["2"].BannerImageURL;
                if (BannerImgs["3"].BannerImageURL != undefined && BannerImgs["3"].BannerImageURL != null && BannerImgs["3"].BannerImageURL != "")
                    $scope.ImgBanner4 = BannerImgs["3"].BannerImageURL;
                if (BannerImgs["4"].BannerImageURL != undefined && BannerImgs["4"].BannerImageURL != null && BannerImgs["4"].BannerImageURL != "")
                    $scope.ImgBanner5 = BannerImgs["4"].BannerImageURL;
            }
            if (vShowSlider == "true") {
                $scope.ShowSlider = true;
                if (SliderImgs["0"].ImageUrl != undefined && SliderImgs["0"].ImageUrl != null && SliderImgs["0"].ImageUrl != "")
                    $scope.ImgSlider1 = SliderImgs["0"].ImageUrl;
                if (SliderImgs["1"].ImageUrl != undefined && SliderImgs["1"].ImageUrl != null && SliderImgs["1"].ImageUrl != "")
                    $scope.ImgSlider2 = SliderImgs["1"].ImageUrl;
                if (SliderImgs["2"].ImageUrl != undefined && SliderImgs["2"].ImageUrl != null && SliderImgs["2"].ImageUrl != "")
                    $scope.ImgSlider3 = SliderImgs["2"].ImageUrl;
                if (SliderImgs["3"].ImageUrl != undefined && SliderImgs["3"].ImageUrl != null && SliderImgs["3"].ImageUrl != "")
                    $scope.ImgSlider4 = SliderImgs["3"].ImageUrl;
                if (SliderImgs["4"].ImageUrl != undefined && SliderImgs["4"].ImageUrl != null && SliderImgs["4"].ImageUrl != "")
                    $scope.ImgSlider5 = SliderImgs["4"].ImageUrl;
            }
            $scope.ShowSlider = true;
        }).catch(function (response) {
            
        });
    }

    
    $rootScope.$watch('SubDomain', function () {
        
        //vUrl = "http://localhost:56397/api/";
        vUrl = $rootScope.SubDomain;
        if (vUrl != null && vUrl != undefined && vUrl != "") {
            BindSiteSettingConfig();
            GetHomeSlider();
            //GetTodayDeals();
            GetHomepageConfiguration();


        }


    }); 


    $scope.Customer = null;
        var index = 0;
        var indexToday = 0;
        $interval(function () {
            if ($scope.Customers != undefined && $scope.Customers != null && $scope.Customers != "") {
                $scope.Customer = $scope.Customers[index];
                index++;
                if (index > $scope.Customers.length - 1) { index = 0 }
            }
        if ($scope.TodayDeal != undefined && $scope.TodayDeal != null && $scope.TodayDeal != "") {
            $scope.TodayDeals = $scope.TodayDeal[indexToday];
            $scope.TodayTitle = $scope.TodayDeal[indexToday].Title;
            $scope.TodayDescription = $scope.TodayDeal[indexToday].Description;
            $scope.TodayPrice = $scope.TodayDeal[indexToday].Price;
            $scope.ProdId = $scope.TodayDeal[indexToday].ProductId;
            var vPrice = $scope.TodayDeal[indexToday].Price;
            var vTodayTodayDiscountPercentage = $scope.TodayDeal[indexToday].TodayDiscountAmount;
            $scope.TodayDiscountPrice = vTodayTodayDiscountPercentage;
            var vProdVariance = $scope.TodayDeal[indexToday].ProdVariance;
            if (vProdVariance != undefined && vProdVariance != null && vProdVariance != "") {
                $scope.VarMRP = vProdVariance["0"].VariancePrice;
                $scope.VarSellingPrice = vProdVariance["0"].sellingPrice;
            }
            indexToday++; if (indexToday > $scope.TodayDeal.length - 1) { indexToday = 0 }
        }
        }, 3500);
        var vCartItem = localStorage.getItem("CartItem");

    ////$scope.AddToCart22 = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, ProductVarianceId) {
        
    ////    var vDiscount = 0, vTax = 0, vCopounPercentage = 0, vCopounCode = "";
    ////    var vImg ="";
    ////    if(ImageURL.length !=0)
    ////    {         vImg = ImageURL["0"].ImageURL;
    ////    }
    ////    vCartItem = localStorage.getItem("CartItem");
    ////    $http({
    ////        url: vUrl + "IndexPage/GetProductStockCount",
    ////        method: 'GET',
    ////        params: { iProdId: ProductId },
    ////        headers: { "Content-Type": JSON }
    ////    }).then(function (response) {
    ////         var vResponse = response.data;
    ////        if (vResponse == "TimeOut")
    ////            window.location.href = "#!TimeOut";
    ////        else {
    ////            if (vResponse.length == 0) {
    ////                alert("Ordered Product in out of stock.");
    ////                return;
    ////            }
    ////            var vStockCount = vResponse["0"].StockCount; if (vStockCount >= Qty) {
    ////                var vTaxPercentage = 0; if (DiscountDetailsId == null || DiscountDetailsId == "") {
    ////                    DiscountDetailsId = 0;
    ////                }
    ////                if (TaxDetailsId == null || TaxDetailsId == "") {
    ////                    TaxDetailsId = 0;
    ////                }
    ////                if (CouponId == null || CouponId == "") {
    ////                    CouponId = 0;
    ////                }
    ////                $http({
    ////                    url: vUrl + "IndexPage/GetProdTaxDiscountDetails",
    ////                    method: 'GET',
    ////                    params: { iProdId: ProductId, iDiscountDetailsId: DiscountDetailsId, iTaxDetailsId: TaxDetailsId, iCouponId: CouponId },
    ////                    headers: { "Content-Type": JSON }
    ////                }).then(function (response) {
                        
    ////                    var vResult = response.data;
    ////                    var vDiscountPercentage = vResult["0"].DiscountPercentage;
    ////                    if (DiscountDetailsId != 0)
    ////                        vDiscount = vDiscountPercentage;
    ////                    var vTaxPercentage = vResult["0"].TaxPercentage;
    ////                    if (TaxDetailsId != 0)
    ////                        vTax = (Price - vDiscount) * vTaxPercentage / 100; if (CouponId != 0) { vCopounCode = vResult["0"].CouponCode; vCopounPercentage = vResult["0"].CouponPercentage; }
    ////                    $timeout(function () {
    ////                         vTax = (Price - vDiscount) * vTaxPercentage / 100;
    ////                        var vPrice = Price - vDiscount + vTax; var vPrice = vPrice;
    ////                        if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
    ////                            $scope.CartItem = JSON.parse(vCartItem);
    ////                           // var vFindProductId = null;
    ////                            var vProductVarianceId = null;
    ////                            var index;
                                
    ////                            for (var i = 0; i < $scope.CartItem.length; ++i) {
    ////                                if ($scope.CartItem[i].VarianceId == VarianceId ) {
    ////                                    index = i;

    ////                                    //vFindProductId = $scope.CartItem[i].ProductId;
                                        
    ////                                    vProductVarianceId = $scope.CartItem[i].VarianceId;
    ////                                    $scope.CartItem[i].Qty = $scope.CartItem[i].Qty +  Number(qty1); ; 
    ////                                    $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
    ////                                    break;
    ////                                }
    ////                                //if ($scope.CartItem[i].ProductId == ProductId) {
    ////                                //    index = i;
    ////                                //    vFindProductId = $scope.CartItem[i].ProductId;
    ////                                //    
                                       
    ////                                //    $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + qty1;
    ////                                //    $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
    ////                                //    break;
    ////                                //}

    ////                            }
    ////                            if (vProductVarianceId != undefined && vProductVarianceId != null && vProductVarianceId != "") { }
    ////                            else {
    ////                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: Qty, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vPrice, VarianceId: ProductVarianceId, VarienceType: "" });
    ////                            }
    ////                            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
    ////                        }
    ////                        else {
    ////                            var order = []; $scope.CartItem = order;
    ////                            $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: Qty, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vPrice, VarianceId: ProductVarianceId, VarienceType: "" });
    ////                            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
    ////                        }
    ////                        var vCount = 0;
    ////                        var vAmount = 0;
    ////                        angular.forEach($scope.CartItem, function (value) {
    ////                            vCount = vCount + Number(value.Qty || 0); vAmount = vAmount + (Number(value.Qty || 0) * Number(value.LineTotal || 0));
    ////                        }); var vCartItems = localStorage.getItem("CartItem");
    ////                        localStorage.setItem("Amount", vAmount);
    ////                        localStorage.setItem("Count", vCount);
    ////                        $rootScope.CartItems = JSON.parse(vCartItems);
    ////                        $rootScope.TotalAmount = vAmount;
    ////                        $rootScope.Count = vCount;
    ////                    }, 400); addProductNotice('Product Added to cart', '', '<h3>Success: You have added ' + Title + ' to your Cart</h3>!', 'Success');
    ////                });
    ////            }
    ////            else {
    ////                alert("Ordered Qty is in out of stock.");
    ////                return;
    ////            }
    ////        }
    ////    });
    ////}
    //$scope.AddToCart22 = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, ProductVarianceId) {

    //    var vDiscount = 0, vTax = 0, vCopounPercentage = 0, vCopounCode = "";
    //    var vImg = "";
    //    if (ImageURL.length != 0) {
    //        vImg = ImageURL["0"].ImageURL;
    //    }
    //    vCartItem = localStorage.getItem("CartItem");
    //    $http({
    //        url: vUrl + "IndexPage/GetProductStockCount",
    //        method: 'GET',
    //        params: { iProdId: ProductId },
    //        headers: { "Content-Type": JSON }
    //    }).then(function (response) {
    //        var vResponse = response.data;
    //        if (vResponse == "TimeOut")
    //            window.location.href = "#!TimeOut";
    //        else {
    //            if (vResponse.length == 0) {
    //                alert("Ordered Product in out of stock.");
    //                return;
    //            }
    //            var vStockCount = vResponse["0"].StockCount; if (vStockCount >= Qty) {
    //                var vTaxPercentage = 0; if (DiscountDetailsId == null || DiscountDetailsId == "") {
    //                    DiscountDetailsId = 0;
    //                }
    //                if (TaxDetailsId == null || TaxDetailsId == "") {
    //                    TaxDetailsId = 0;
    //                }
    //                if (CouponId == null || CouponId == "") {
    //                    CouponId = 0;
    //                }
    //                $http({
    //                    url: vUrl + "IndexPage/GetProdTaxDiscountDetails",
    //                    method: 'GET',
    //                    params: { iProdId: ProductId, iDiscountDetailsId: DiscountDetailsId, iTaxDetailsId: TaxDetailsId, iCouponId: CouponId },
    //                    headers: { "Content-Type": JSON }
    //                }).then(function (response) {

    //                    var vResult = response.data;
    //                    var vDiscountPercentage = vResult["0"].DiscountPercentage;
    //                    if (DiscountDetailsId != 0)
    //                        vDiscount = vDiscountPercentage;
    //                    var vTaxPercentage = vResult["0"].TaxPercentage;
    //                    if (TaxDetailsId != 0)
    //                        vTax = (Price - vDiscount) * vTaxPercentage / 100; if (CouponId != 0) { vCopounCode = vResult["0"].CouponCode; vCopounPercentage = vResult["0"].CouponPercentage; }
    //                    $timeout(function () {
    //                        vTax = (Price - vDiscount) * vTaxPercentage / 100;
    //                        var vPrice = Price - vDiscount + vTax; var vPrice = vPrice;
    //                        if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
    //                            $scope.CartItem = JSON.parse(vCartItem);
    //                            // var vFindProductId = null;
    //                            var vProductVarianceId = null;
    //                            var index;

    //                            for (var i = 0; i < $scope.CartItem.length; ++i) {
    //                                if ($scope.CartItem[i].VarianceId == VarianceId) {
    //                                    index = i;



    //                                    //vFindProductId = $scope.CartItem[i].ProductId;

    //                                    vProductVarianceId = $scope.CartItem[i].VarianceId;
    //                                    $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + Number(qty1);;
    //                                    $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
    //                                    break;
    //                                }
    //                                //if ($scope.CartItem[i].ProductId == ProductId) {
    //                                //    index = i;
    //                                //    vFindProductId = $scope.CartItem[i].ProductId;
    //                                //    

    //                                //    $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + qty1;
    //                                //    $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
    //                                //    break;
    //                                //}



    //                            }
    //                            if (vProductVarianceId != undefined && vProductVarianceId != null && vProductVarianceId != "") { }
    //                            else {
    //                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: Qty, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vPrice, VarianceId: ProductVarianceId, VarienceType: "" });
    //                            }
    //                            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
    //                        }
    //                        else {
    //                            var order = []; $scope.CartItem = order;
    //                            $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: Qty, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vPrice, VarianceId: ProductVarianceId, VarienceType: "" });
    //                            localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
    //                        }
    //                        var vCount = 0;
    //                        var vAmount = 0;
    //                        angular.forEach($scope.CartItem, function (value) {
    //                            vCount = vCount + Number(value.Qty || 0); vAmount = vAmount + (Number(value.Qty || 0) * Number(value.LineTotal || 0));
    //                        }); var vCartItems = localStorage.getItem("CartItem");
    //                        localStorage.setItem("Amount", vAmount);
    //                        localStorage.setItem("Count", vCount);
    //                        $rootScope.CartItems = JSON.parse(vCartItems);
    //                        $rootScope.TotalAmount = vAmount;
    //                        $rootScope.Count = vCount;
    //                    }, 400); addProductNotice('Product Added to cart', '', '<h3>Success: You have added ' + Title + ' to your Cart</h3>!', 'Success');
    //                });
    //            }
    //            else {
    //                alert("Ordered Qty is in out of stock.");
    //                return;
    //            }
    //        }
    //    });
    //}
    $scope.RemoveFromCart = function () { }


    var BindCategories = function () {
        $http({
            url: vUrl + "IndexPage/GetSubCategory",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            $scope.Categoryitm = response.data;
            $scope.loader = false;
            GetAllSubCategory();
            if ($scope.TrendingItems == "TimeOut")
                window.location.href = "#!TimeOut";
            else { }
            
        }).catch(function (response) { });
    }

    var GetAllSubCategory = function () {
        debugger;
        $http({
            url: vUrl + "IndexPage/GetAllSubCategory",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            $scope.Categoryitm = response.data;
            $scope.loader = false;
            if ($scope.TrendingItems == "TimeOut")
                window.location.href = "#!TimeOut";
            else { }
            
        }).catch(function (response) { });
    }

    $scope.BackCategory = function () {
        $scope.category = true;
        $scope.Subcategoryshoe = false;
    }

    
   // $scope.SubCategoryClick = function () {
        
        //$http({
           // url: vUrl + "IndexPage/GetSubCategory",
           // method: 'GET',
           
           // headers: { "Content-Type": JSON }
        //}).then(function (response) {
            
           // $scope.category = false;
           // $scope.Subcategoryshoe = true;
           // $scope.SubCategory = response.data;
           // if ($scope.GetSubCategory == "TimeOut")
            //    window.location.href = "#!TimeOut";
            //else { }
            
       // }).catch(function (response) {
       // });
   // }

    //$scope.SubCategoryClick();

    //var vCatId = $.session.get('CategoryId');
    //if (vCatId != null || vCatId != "" || vCatId != undefined) {
    //    
    //    $scope.SubCategoryClick(vCatId);
    //}
    //else {

    //    $.session.set('SubCategoryId', '');
    //    $.session.set('CategoryId', '');
    //    $.session.set('ProductId', '');
    //}

    var BindTrendingItems = function () {
        $http({
            url: vUrl + "IndexPage/GetTrendingItems",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            $scope.TrendingItems = response.data;
            if ($scope.TrendingItems == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
            }
            
            }).catch(function (response) {
            });
    }
    var BindNewItems = function () {
        $http({
            url: vUrl + "IndexPage/GetNewItems",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            $scope.NewItems = response.data;
            }).catch(function (response) {
            });
    }
    var BindNewProductLeft = function () {
        $http({
            url: vUrl + "IndexPage/GetNewProducts",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response1) {
            $scope.NewProducts = response1.data;
            }).catch(function (response) {
            });
    }
    var BindTopRatedLeft = function () {
        $http({
            url: vUrl + "IndexPage/GetTopRateProducts",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response1) {
            $scope.TopRateProducts = response1.data;
            }).catch(function (response) {
            });
    }
    var BindAddDetails = function () {
        $http({
            url: vUrl + "IndexPage/GetAddDetails",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response1) {
            $scope.AddDetails = response1.data;
            }).catch(function (response) {
            });
    }
    $scope.TodayDealClick = function () {
        var vProdId = $scope.ProdId;
        var vLocation = "#!Product/" + vProdId
        window.location = vLocation;
    }

    $scope.ViewSingleProductPage = function (ProductId) {
        
        var vProductId = ProductId;
       
        $.session.set('ProductId', vProductId);
       
        var vLocation = "#!Product";
        window.location = vLocation;

    }

    $scope.ViewProductPage = function (SubCategoryId) {
        
        var vSubCategoryId = SubCategoryId;

        $.session.set('SubCategoryId', vSubCategoryId);

        var vLocation = "#!ViewProduct";
        window.location = vLocation;

    }

//$scope.AddToCart = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, ProductVarianceId, MrpPrice1) {
        
//        var vDiscount = 0, vTax = 0, vCopounPercentage = 0, vCopounCode = "";
//        var vImg = "";
//        if (ImageURL.length != 0) {
//            vImg = ImageURL["0"].ImageURL;
//        }


//    var vGST = TaxDetailsId;
//        //if (TaxDetailsId != null && TaxDetailsId != "" && TaxDetailsId != undefined) {
//        //    if (TaxDetailsId.length != 0) {
//        //        vGST = TaxDetailsId;
//        //    }

//        //}


//        var qty1 = Qty;



//        vCartItem = localStorage.getItem("CartItem");
//        $http({
//            url: vUrl + "IndexPage/GetProductStockCount",
//            method: 'GET',
//            params: { iProdId: ProductId },
//            headers: { "Content-Type": JSON }
//        }).then(function (response) {
//             var vResponse = response.data;
//            if (vResponse == "TimeOut")
//                window.location.href = "#!TimeOut";
//            else {
//                if (vResponse.length == 0) {
//                    alert("Ordered Product in out of stock.");
//                    return;
//                }
//                var vStockCount = vResponse["0"].StockCount;
//                if (vStockCount >= Qty) {
//                    var vTaxPercentage = 0;
//                    if (DiscountDetailsId == null || DiscountDetailsId == "") {
//                        DiscountDetailsId = 0;
//                    }
//                    //if (TaxDetailsId == null || TaxDetailsId == "") {
//                    //    TaxDetailsId = 0;
//                    //}
//                    //else
//                    //    TaxDetailsId = TaxDetailsId.TaxDetailsId;
//                    if (CouponId == null || CouponId == "") {
//                        CouponId = 0;
//                    }
//                    $http({
//                        url: vUrl + "IndexPage/GetProdTaxDiscountDetails",
//                        method: 'GET',
//                        params: { iProdId: ProductId, iDiscountDetailsId: DiscountDetailsId, iCouponId: CouponId },
//                        headers: { "Content-Type": JSON }
//                    }).then(function (response) {
                        
//                        var vResult = response.data;
//                        var vDiscountPercentage = vResult["0"].DiscountPercentage;
//                        if (DiscountDetailsId != 0)
//                            vDiscount = vDiscountPercentage;
//                        //var vTaxPercentage = vResult["0"].TaxPercentage; 
//                        //if (TaxDetailsId != 0)
//                        //    vTax = (Price - vDiscount) * vTaxPercentage / 100;
//                        if (CouponId != 0) {
//                            vCopounCode = vResult["0"].CouponCode;
//                            vCopounPercentage = vResult["0"].CouponPercentage;
//                        }
//                        $timeout(function () {
                            
//                            vTax = (Price - vDiscount) * vGST / 100;
//                            var vPrice = Price - vDiscount + vTax;
//                            var vPrice = vPrice;

//                            if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
//                                $scope.CartItem = JSON.parse(vCartItem);
//                                // var vFindProductId = null;
//                                var vProductVarianceId = null;
//                                var index;

//                                for (var i = 0; i < $scope.CartItem.length; ++i) {
//                                    if ($scope.CartItem[i].VarianceId == ProductVarianceId) {
//                                        index = i;

//                                        //vFindProductId = $scope.CartItem[i].ProductId;
                                        
//                                        vProductVarianceId = $scope.CartItem[i].VarianceId;
//                                        $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + Number(qty1);;
//                                        $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
//                                        break;
//                                    }
//                                    //if ($scope.CartItem[i].ProductId == ProductId) {
//                                    //    index = i;
//                                    //    vFindProductId = $scope.CartItem[i].ProductId;
//                                    //    

//                                    //    $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + qty1;
//                                    //    $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
//                                    //    break;
//                                    //}

//                                }
//                                if (vProductVarianceId != undefined && vProductVarianceId != null && vProductVarianceId != "") { }
//                                else {
                                    
//                                    var linetotal = vPrice * qty1;
//                                    $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: Price, VarianceId: ProductVarianceId, VarienceType: "", GSTPercentage: vGST, MrpPrice: MrpPrice1});
//                                }
//                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
//                            }
//                            else {
//                                var order = []; $scope.CartItem = order;
//                                var linetotal = vPrice * qty1;
//                                vTax = vTax * qty1;
//                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: Price, VarianceId: ProductVarianceId, VarienceType: "", GSTPercentage: vGST, MrpPrice: MrpPrice1});
//                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
//                            }
//                            var vCount = 0;
//                            var vAmount = 0;
//                            angular.forEach($scope.CartItem, function (value) {
//                                vCount = vCount + Number(value.Qty || 0);
//                                vAmount = vAmount + (Number(value.LineTotal || 0));
//                            }); var vCartItems = localStorage.getItem("CartItem");
//                            localStorage.setItem("Amount", vAmount);
//                            localStorage.setItem("Count", vCount);
//                            $rootScope.CartItems = JSON.parse(vCartItems);
//                            $rootScope.TotalAmount = vAmount;
//                            $rootScope.Count = vCount;
//                        }, 400); addProductNotice('Product Added to cart', '', '<h3>Success: You have added ' + Title + ' to your Cart</h3>!', 'Success');
//                    });
//                }
//                else {
//                    alert("Ordered Qty is in out of stock.");
//                    return;
//                }
//            }
//        });
//    }
    $scope.AddToCart = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, ProductVarianceId, MrpPrice1) {

        var vDiscount = 0, vTax = 0, vCopounPercentage = 0, vCopounCode = "";
        var vImg = "";
        if (ImageURL.length != 0) {
            vImg = ImageURL["0"].ImageURL;
        }


        var vGST = TaxDetailsId;
        //if (TaxDetailsId != null && TaxDetailsId != "" && TaxDetailsId != undefined) {
        //    if (TaxDetailsId.length != 0) {
        //        vGST = TaxDetailsId;
        //    }

        //}


        var qty1 = Qty;



        vCartItem = localStorage.getItem("CartItem");
        $http({
            url: vUrl + "IndexPage/GetProductStockCount",
            method: 'GET',
            params: { iProdId: ProductId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            var vResponse = response.data;
            if (vResponse == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                if (vResponse.length == 0) {
                    alert("Ordered Product in out of stock.");
                    return;
                }
                var vStockCount = vResponse["0"].StockCount;
                if (vStockCount >= Qty) {
                    var vTaxPercentage = 0;
                    if (DiscountDetailsId == null || DiscountDetailsId == "") {
                        DiscountDetailsId = 0;
                    }
                    //if (TaxDetailsId == null || TaxDetailsId == "") {
                    //    TaxDetailsId = 0;
                    //}
                    //else
                    //    TaxDetailsId = TaxDetailsId.TaxDetailsId;
                    if (CouponId == null || CouponId == "") {
                        CouponId = 0;
                    }
                    $http({
                        url: vUrl + "IndexPage/GetProdTaxDiscountDetails",
                        method: 'GET',
                        params: { iProdId: ProductId, iDiscountDetailsId: DiscountDetailsId, iCouponId: CouponId },
                        headers: { "Content-Type": JSON }
                    }).then(function (response) {
                        debugger;
                        var vResult = response.data;
                        var vDiscountPercentage = vResult["0"].DiscountPercentage;
                        if (DiscountDetailsId != 0)
                            vDiscount = vDiscountPercentage;
                        //var vTaxPercentage = vResult["0"].TaxPercentage; 
                        //if (TaxDetailsId != 0)
                        //    vTax = (Price - vDiscount) * vTaxPercentage / 100;
                        if (CouponId != 0) {
                            vCopounCode = vResult["0"].CouponCode;
                            vCopounPercentage = vResult["0"].CouponPercentage;
                        }
                        $timeout(function () {
                            debugger;

                            vTax = (Price - vDiscount) * vGST / 100;
                            var vPrice = Price - vDiscount + vTax;
                            var vPrice = vPrice;

                            if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
                                $scope.CartItem = JSON.parse(vCartItem);
                                // var vFindProductId = null;
                                var vProductVarianceId = null;
                                var index;

                                for (var i = 0; i < $scope.CartItem.length; ++i) {
                                    if ($scope.CartItem[i].VarianceId == ProductVarianceId) {
                                        index = i;

                                        //vFindProductId = $scope.CartItem[i].ProductId;

                                        vProductVarianceId = $scope.CartItem[i].VarianceId;
                                        $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + Number(qty1);;
                                        $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
                                        break;
                                    }
                                    //if ($scope.CartItem[i].ProductId == ProductId) {
                                    //    index = i;
                                    //    vFindProductId = $scope.CartItem[i].ProductId;
                                    //    

                                    //    $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + qty1;
                                    //    $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
                                    //    break;
                                    //}

                                }
                                if (vProductVarianceId != undefined && vProductVarianceId != null && vProductVarianceId != "") { }
                                else {
                                    debugger;
                                    var linetotal = vPrice * qty1;
                                    $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: linetotal, VarianceId: ProductVarianceId, VarienceType: "", GSTPercentage: vGST, MrpPrice: MrpPrice1 });
                                }
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                            else {
                                debugger;
                                var order = []; $scope.CartItem = order;
                                var linetotal = vPrice * qty1;
                                vTax = vTax * qty1;
                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: linetotal, VarianceId: ProductVarianceId, VarienceType: "", GSTPercentage: vGST, MrpPrice: MrpPrice1 });
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                            var vCount = 0;
                            var vAmount = 0;
                            var vtotalAmount = 0;
                            angular.forEach($scope.CartItem, function (value) {
                                debugger;
                                vCount = vCount + Number(value.Qty || 0);
                                vAmount = vAmount + (Number(value.Qty)*(Number(value.Price || 0)));
                                vtotalAmount = vtotalAmount + (Number(value.LineTotal || 0));
                            }); var vCartItems = localStorage.getItem("CartItem");
                            localStorage.setItem("Amount", vAmount);
                            localStorage.setItem("Count", vCount);
                            localStorage.setItem("totalamount", vtotalAmount);
                            $rootScope.CartItems = JSON.parse(vCartItems);
                            $rootScope.TotalAmount = vAmount;
                            $rootScope.cAmcurrent = vtotalAmount;
                            $rootScope.Count = vCount;
                        }, 400); addProductNotice('Product Added to cart', '', '<h3>Success: You have added ' + Title + ' to your Cart</h3>', 'Success');
                    });
                }
                else {
                    alert("Ordered Qty is in out of stock.");
                    return;
                }
            }
        });
    }
});