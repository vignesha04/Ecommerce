'use strict'; Ecom.controller('ViewProductSearchController', function ($scope, $http, $rootScope, $routeParams, $timeout, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    $window.scrollTo(0, 0);

    //$scope.currentLocation = $location.url();
    //$scope.$on("$locationChangeSuccess", function handleLocationChangeStartEvent(event) {
    //    $scope.currentLocation = $location.url();
    //})

    //var startWatchingTimer = $timeout(startWatchingForLocationChanges, 0, false);
    //var stopWatchingLocation = null;
    //function handleLocationChangeStartEvent(event) {
    //    event.preventDefault();
    //    var targetPath = "#!HomePage";
    //    if ($scope.currentLocation != targetPath) {
    //        
    //        $location.path(targetPath);
    //        stopWatchingLocation();
    //        $scope.$applyAsync(startWatchingForLocationChanges);
    //    }
    //}
    ////

    //function startWatchingForLocationChanges() {
    //    
    //    stopWatchingLocation = $scope.$on("$locationChangeStart", handleLocationChangeStartEvent)
    //}


    $rootScope.$watch('SubDomain', function () {

        //vUrl = "http://localhost:56397/api/";
        vUrl = $rootScope.SubDomain;
        if (vUrl != null && vUrl != undefined && vUrl != "") {
            //  BindSiteSettingConfig();
            //GetHomeSlider();
            //GetTodayDeals();
            //GetHomepageConfiguration();
            siteconfig();
            SPlist();
            Gnewitem();
            BindRightSideSubCat();
        }


    });




    $scope.ViewSingleProductPage = function (ProductId) {
        
        var vProductId = ProductId;

        $.session.set('ProductId', vProductId);

        var vLocation = "#!Product";
        window.location = vLocation;

    }


    var vSearchtxt = $routeParams.searchtxt;
    var vCatId = $routeParams.CatId;
    var vGridSizeClient = 5;
    $scope.loader = true;

    var siteconfig = function () {
        $http({
            url: vUrl + "IndexPage/GetSiteSettingConfiguration",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            var vResult = response.data;
            var vCurrencyType = vResult["0"].CurrencyType;
            vGridSizeClient = vResult["0"].GridSizeClient;
            $scope.CurrencyType = vCurrencyType;
        }).catch(function (response) {
        });
    }


    $scope.aHomeClick = function () {
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined) {
            var vLocation = "#!HomePage/" + vclientMemberId;
            window.location.href = vLocation;
        }
        else {
            var vLocation = "#!HomePage/0";
            window.location.href = vLocation;
        }
    }
    var vCartItem = localStorage.getItem("CartItem");

    $scope.AddToCart = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, ProductVarianceId, MrpPrice1, offeramount) {
        debugger
        var vDiscount = 0, vTax = 0, vCopounPercentage = 0, vCopounCode = "";
        var vImg = "";
        if (ImageURL.length != 0) {
            vImg = ImageURL["0"].ImageURL;
        }


        var vGST = TaxDetailsId;
        //if (TaxDetailsId != null && TaxDetailsId != "" && TaxDetailsId != undefined) {
        //    if (TaxDetailsId.length != 0) {
        //        vGST = TaxDetailsId["0"].Percentage;
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
                                    $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: linetotal, VarianceId: ProductVarianceId, VarienceType: "", GSTPercentage: vGST, MrpPrice: MrpPrice1, Discoutamont: offeramount });
                                }
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                            else {
                                var order = []; $scope.CartItem = order;
                                var linetotal = vPrice * qty1;
                                vTax = vTax * qty1;
                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: linetotal, VarianceId: ProductVarianceId, VarienceType: "", GSTPercentage: vGST, MrpPrice: MrpPrice1, Discoutamont: offeramount });
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                            var vCount = 0;
                            var vAmount = 0;
                            var vtotalAmount = 0;
                            angular.forEach($scope.CartItem, function (value) {
                                vCount = vCount + Number(value.Qty || 0);
                                vAmount = vAmount + (Number(value.Qty) * (Number(value.Price || 0)));
                                vtotalAmount = vtotalAmount + (Number(value.LineTotal || 0));

                            });
                            debugger;
                            var vCartItems = localStorage.getItem("CartItem");
                            localStorage.setItem("Amount", vAmount);
                            localStorage.setItem("Count", vCount);
                            localStorage.setItem("totalamount", vtotalAmount);
                            $rootScope.CartItems = JSON.parse(vCartItems);
                            $rootScope.TotalAmount = vAmount;
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

    var SPlist = function () {

        $http({
            url: vUrl + "ProductList/GetSearchProductList",
            method: 'GET',
            params: { strSearchText: vSearchtxt },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            debugger;
            var vResult = response.data;
            if (vResult == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.allItems = response.data;
                $scope.pageSize = vGridSizeClient;
                $scope.sort('name');
                $scope.loader = false;
            }
        }).catch(function (response) {

        });
    }


    var Gnewitem = function () {
        $http({
            url: vUrl + "ProductList/GetNewItems",
            method: 'GET',
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            $scope.NewItems = response.data;
            $scope.loader = false;
        }).catch(function (response) {
        });
    }
  

    $scope.Reset = function () {
        $scope.search.price_min="";
        $scope.search.price_max="";
    }
    var BindRightSideSubCat = function () {
        $http({
            url: vUrl + "ProductList/GetSubCategoryList",
            method: 'GET',
            params: { CategoryId: vCatId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            //debugger;
            $scope.SubCatList = response.data;
            $scope.loader = false;
            }).catch(function (response) {
            });
    }
    BindRightSideSubCat();
    $scope.SearchSubCatClick = function (SubCategoryId) {
        BindProductList(SubCategoryId);
    }
    $scope.reverse = false;
    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.currentPage = 0;
    }
    $scope.pagination = function () {
        var retVal = [];
        for (var i = 0; i < $scope.filteredList.length; i++){
            if (i % $scope.pageSize === 0) {
            retVal[Math.floor(i / $scope.pageSize)] = [$scope.filteredList[i]];
            }
            else
            {
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
        var ret = []; if (!total) {
            total = input; input = 0;
        }
        for (var i = input; i < total; i++){
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


    $scope.SearchPriceList = function (SearchText) {
        
        if ($scope.FilterSearchTxt == "" || $scope.FilterSearchTxt == undefined || $scope.FilterSearchTxt == null) {
            BindRightSideSubCat();
            return false;
        }
        $http({
            url: vUrl + "ProductList/GetSearchProdPriceList",
            method: 'GET',
            params: { strFilterSearchText: SearchText, strSearchText: vSearchtxt },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var vResult = response.data;
            if (vResult == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.allItems = response.data;
                $scope.pageSize = vGridSizeClient;
                $scope.sort('name');
            }
            }).catch(function (response) { });
    }
    $scope.priceFiltering = function () {
        
        var vminPrice = $scope.search.price_min;
        var vmaxPrice = $scope.search.price_max;
        $http({
            url: vUrl + "ProductList/GetPriceFilterList", method: 'GET',
            params: { minPrice: vminPrice, maxPrice: vmaxPrice, strSearchText: vSearchtxt },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var vResult = response.data;
            if (vResult == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.allItems = response.data;
                $scope.pageSize = vGridSizeClient;
                $scope.sort('name');
            }
            }).catch(function (response) {
         });
    }


    siteconfig();
    SPlist();
    Gnewitem();
    BindRightSideSubCat();
});