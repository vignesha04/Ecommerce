'use strict';

Ecom.controller('ViewProductController', function ($scope, $http, $rootScope, $routeParams, $timeout, $window) {

    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
     // var vUrl = "http://localhost:56397/api/";
     

    
    $window.scrollTo(0, 0);
    $scope.loader = true;
    //var vSubCategoryId = $.session.get('SubCategoryId');
    //var vCatId = $.session.get('CategoryId');
    
    var vSubCategoryId = $routeParams.SubCatId;
    var vCatId = $routeParams.CatId;
    var vGridSizeClient = 5;
    $scope.search = { price_min: '', price_max: '', amount_min: 1000, amount_max: 5000 };
    // Move slider handle and range line
   
    //setTimeout(function () {
    //    window.addEventListener('popstate', onpopstate, false);
    //}, 5000);


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
   
    //$scope.goHome = function () {
    //    
    //    if ((window.location) && (window.location.hash) && (window.location.hash.indexOf('#!HomePage') > 0)) {
    //        navigator.app.exitApp();   // This will exit the application
    //    }
    //    else {
    //        $location.path('#!HomePage');  // This will redirect the application to home page

    //        if (!$scope.$$phase)
    //            $scope.$apply();
    //    }
    //}	
    //window.addEventListener('popstate', (event) => {
    //    
         
    //});
    //let currentHash = window.location.hash;

    //window.addEventListener('popstate', function (event) {
    //    
    //    if (window.location.hash == currentHash) {
    //        window.location = "#!HomePage";
           
    //    }
    //    else
    //        window.location.reload();
    //});


    //window.onpopstate = function () {
    //    
    //    window.location = "#!HomePage";
    //}


    $(".sub-menu").css("display", "none");
    $(".content").css("display", "none");
    $http({
        url: vUrl + "IndexPage/GetSiteSettingConfiguration",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        var vResult = response.data;
        var vCurrencyType = vResult["0"].CurrencyType;
        vGridSizeClient = vResult["0"].GridSizeClient;

        //$.session.set('CurrencyType', vResult["0"].vCurrencyType);
        //$.session.set('GridSizeClient', vResult["0"].vGridSizeClient);

        $scope.CurrencyType = vCurrencyType;
    }).catch(function (response) {

    });

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

    $scope.ChangeProdVarience = function (index, varienceid, Price, Type, ProductId) {
        
        var index; var vFindProductId;
        // $scope.ItemsByPage[index].ProdVariance.sellingprice = Price;
        for (var i = 0; i < $scope.ItemsByPage.length; ++i) {
            var test = $scope.ItemsByPage[0][i].ProductId;
            if ($scope.ItemsByPage[0][i].ProductId == ProductId) {
                
                index = $scope.ItemsByPage[0][i].ProdVariance.length;
                for (var j = 0; j < index; j++) {
                    if ($scope.ItemsByPage[0][i].ProdVariance[j].ProductVarianceId == varienceid) {
                        $scope.ItemsByPage[0][i].ProdVariance[j].sellingprice = Price;
                    }
                }
                
                // vFindProductId = $scope.CartItem[i].ProductId;
                // $scope.ItemsByPage[0][i].ProdVariance.sellingprice = Price;

            }
        }
        // $scope.ItemsByPage.push({ });


        //$scope.ItemsByPage[index].Title = "Name";
        //document.getElementById("price-new").value = Price;
        //$("#price-new").val("");
        //$scope.sellingprice = Price;
        //$scope.VarianceId = varienceid;

        // $scope.VarienceType = "-" + Type;
    }

    var vCartItem = localStorage.getItem("CartItem");
    $scope.AddToCart = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, ProductVarianceId, MrpPrice1, offeramount) {
        debugger;
        var vDiscount = 0, vTax = 0, vCopounPercentage = 0, vCopounCode = "";
        var vImg = "";
        if (ImageURL.length != 0) {
            vImg = ImageURL["0"].ImageURL;
        }


        var vGST = "";
        if (TaxDetailsId != null && TaxDetailsId != "" && TaxDetailsId != undefined) {
            if (TaxDetailsId.length != 0) {
                vGST = TaxDetailsId["0"].Percentage;;
            }

        }


        var qty1 = Qty;



        vCartItem = localStorage.getItem("CartItem");
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
                                vAmount = vAmount + (Number(value.Qty) * (Number(value.Price || 0)));
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


    var BindProductList = function (vSubCategoryId) {
        $http({
            url: vUrl + "ProductList/GetProductList",
            method: 'GET',
            params: { SubCategoryId: vSubCategoryId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            //$scope.ProductList = response.data;
            
            var vResult = response.data;

            if (vResult == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.allItems = response.data;
                $scope.pageSize = vGridSizeClient;
                $scope.loader = false;
                $scope.Quantity = 1;
                $scope.sort('name');
            }
        }).catch(function (response) {
        });
    }
    BindProductList(vSubCategoryId);


    $http({
        url: vUrl + "ProductList/GetNewItems",
        method: 'GET',
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.NewItems = response.data;
    }).catch(function (response) {
    });


    var BindRightSideSubCat = function () {
        $http({
            url: vUrl + "ProductList/GetSubCategoryList",
            method: 'GET',
            params: { CategoryId: vCatId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            $scope.SubCatList = response.data;
            $scope.loader = false;
        }).catch(function (response) {
        });
    }
    BindRightSideSubCat();


    $scope.SearchSubCatClick = function (SubCategoryId) {
        BindProductList(SubCategoryId);
    }


    //Bind Root Details
    $http({
        url: vUrl + "ProductList/GetCategoryNameForRoot",
        method: 'GET',
        params: { SubCategoryId: vSubCategoryId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        var vCatName = response.data["0"].CategoyName;
        var vSubCatName = response.data["0"].SubCategoryName;

        $scope.RootHeading = vCatName + " - " + vSubCatName;
        //$scope.vSubCatName = vSubCatName;
    }).catch(function (response) {
    });



    //-----------------------   Pagination Start   -----------------------------//
    // var vPageCount = $.session.get('');
    //$scope.pageSize = vGridSizeClient;
    //$scope.pageSize = 3;
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

    //-----------------------   Pagination End   -----------------------------//
    $scope.SearchPriceList = function () {
        

        //var vSearch = $scope.search.Search;
        if ($scope.FilterSearchTxt == "" || $scope.FilterSearchTxt == undefined || $scope.FilterSearchTxt == null) {
            //alert("Please Enter the search text first");
            BindProductList(vSubCategoryId);
            //addProductNotice('Empty', '', '<h3>Please Enter the search text first.</h3>', 'Success');
            return false;
        }

        var vSearchText = $scope.FilterSearchTxt;
        $http({
            url: vUrl + "ProductList/GetFilterSearch",
            method: 'GET',
            params: { strFilterSearchText: vSearchText, SubCategoryId: vSubCategoryId },
            headers: {
                "Content-Type": JSON
            }
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



    $scope.priceFiltering = function () {
        
        //BindProductDetails();
        var vminPrice = $scope.search.price_min;
        var vmaxPrice = $scope.search.price_max;
        $http({
            url: vUrl + "ProductList/GetPriceFilterProductList",
            method: 'GET',
            params: { SubCategoryId: vSubCategoryId, minPrice: vminPrice, maxPrice: vmaxPrice },
            headers: {
                "Content-Type": JSON
            }
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

    $scope.ViewSingleProductPage = function (ProductId) {
        
        var vProductId = ProductId;
       
        $.session.set('ProductId', vProductId);
       
        var vLocation = "#!Product";
        window.location = vLocation;

    }
});


//Ecom.directive('sliderRange', ['$document', function ($document) {

//    // Move slider handle and range line
//    var moveHandle = function (handle, elem, posX) {
//        $(elem).find('.handle.' + handle).css("left", posX + '%');
//    };
//    var moveRange = function (elem, posMin, posMax) {
//        $(elem).find('.range').css("left", posMin + '%');
//        $(elem).find('.range').css("width", posMax - posMin + '%');
//    };

//    return {
//        template: '<div class="slider horizontal">' +
//            '<div class="range"></div>' +
//            '<a class="handle min" ng-mousedown="mouseDownMin($event)"></a>' +
//            '<a class="handle max" ng-mousedown="mouseDownMax($event)"></a>' +
//            '</div>',
//        replace: true,
//        restrict: 'E',
//        scope: {
//            valueMin: "=",
//            valueMax: "="
//        },
//        link: function postLink(scope, element, attrs) {
//            // Initilization
//            var dragging = false;
//            var startPointXMin = 0;
//            var startPointXMax = 0;
//            var xPosMin = 0;
//            var xPosMax = 0;
//            var settings = {
//                "min": (typeof (attrs.min) !== "undefined" ? parseInt(attrs.min, 10) : 0),
//                "max": (typeof (attrs.max) !== "undefined" ? parseInt(attrs.max, 10) : 100),
//                "step": (typeof (attrs.step) !== "undefined" ? parseInt(attrs.step, 10) : 1)
//            };
//            if (typeof (scope.valueMin) == "undefined" || scope.valueMin === '')
//                scope.valueMin = settings.min;

//            if (typeof (scope.valueMax) == "undefined" || scope.valueMax === '')
//                scope.valueMax = settings.max;

//            // Track changes only from the outside of the directive
//            scope.$watch('valueMin', function () {
//                if (dragging) return;
//                xPosMin = (scope.valueMin - settings.min) / (settings.max - settings.min) * 100;
//                if (xPosMin < 0) {
//                    xPosMin = 0;
//                } else if (xPosMin > 100) {
//                    xPosMin = 100;
//                }
//                moveHandle("min", element, xPosMin);
//                moveRange(element, xPosMin, xPosMax);
//            });

//            scope.$watch('valueMax', function () {
//                if (dragging) return;
//                xPosMax = (scope.valueMax - settings.min) / (settings.max - settings.min) * 100;
//                if (xPosMax < 0) {
//                    xPosMax = 0;
//                } else if (xPosMax > 100) {
//                    xPosMax = 100;
//                }
//                moveHandle("max", element, xPosMax);
//                moveRange(element, xPosMin, xPosMax);
//            });

//            // Real action control is here
//            scope.mouseDownMin = function ($event) {
//                dragging = true;
//                startPointXMin = $event.pageX;

//                // Bind to full document, to make move easiery (not to lose focus on y axis)
//                $document.on('mousemove', function ($event) {
//                    if (!dragging) return;

//                    //Calculate handle position
//                    var moveDelta = $event.pageX - startPointXMin;

//                    xPosMin = xPosMin + ((moveDelta / element.outerWidth()) * 100);
//                    if (xPosMin < 0) {
//                        xPosMin = 0;
//                    } else if (xPosMin > xPosMax) {
//                        xPosMin = xPosMax;
//                    } else {
//                        // Prevent generating "lag" if moving outside window
//                        startPointXMin = $event.pageX;
//                    }
//                    scope.valueMin = Math.round((((settings.max - settings.min) * (xPosMin / 100)) + settings.min) / settings.step) * settings.step;
//                    scope.$apply();

//                    // Move the Handle
//                    moveHandle("min", element, xPosMin);
//                    moveRange(element, xPosMin, xPosMax);
//                });
//                $document.mouseup(function () {
//                    dragging = false;
//                    $document.unbind('mousemove');
//                    $document.unbind('mousemove');
//                });
//            };

//            scope.mouseDownMax = function ($event) {
//                dragging = true;
//                startPointXMax = $event.pageX;

//                // Bind to full document, to make move easiery (not to lose focus on y axis)
//                $document.on('mousemove', function ($event) {
//                    if (!dragging) return;

//                    //Calculate handle position
//                    var moveDelta = $event.pageX - startPointXMax;

//                    xPosMax = xPosMax + ((moveDelta / element.outerWidth()) * 100);
//                    if (xPosMax > 100) {
//                        xPosMax = 100;
//                    } else if (xPosMax < xPosMin) {
//                        xPosMax = xPosMin;
//                    } else {
//                        // Prevent generating "lag" if moving outside window
//                        startPointXMax = $event.pageX;
//                    }
//                    scope.valueMax = Math.round((((settings.max - settings.min) * (xPosMax / 100)) + settings.min) / settings.step) * settings.step;
//                    scope.$apply();

//                    // Move the Handle
//                    moveHandle("max", element, xPosMax);
//                    moveRange(element, xPosMin, xPosMax);
//                });

//                $document.mouseup(function () {
//                    dragging = false;
//                    $document.unbind('mousemove');
//                    $document.unbind('mousemove');
//                });
//            };
//        }
//    };
//}]);