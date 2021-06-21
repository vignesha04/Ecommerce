'use strict';

Ecom.controller('Reorder', function ($scope, $http, $rootScope, $routeParams, $timeout, $window) {
    
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";  
    var vclientMemberId = $.session.get('clientMemberId');
    var vclientMemberName = $.session.get('clientMemberName');
    $scope.MemberName = vclientMemberName;
    //var vGridSizeClient = 20;
    //$scope.Pagination = false;
    $scope.loader = true;
    if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '') {
        alert("Please login first then only you can able to Checkout.");
        return;
    }
    $window.scrollTo(0, 0);

    var vSalesOrderId = $routeParams.SalesOrderId;
    $scope.productcount = "";

    $scope.BindSalOrderOrderedGrid = function (vSalesOrderId) {
        
        $http({
            url: vUrl + "Reorder/GetClientSalOrderitemDetailsforReorder",
            method: 'GET',
            params: { SalesOrderId: vSalesOrderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            // vsno,OrderNo, OrderDate,Amoount, Status, MemberName, SalesOrderId
            $scope.OrderDetails = response.data;
            $scope.productcount = $scope.OrderDetails.length;
            $scope.loader = false;
           
            //$scope.orderno = response['0'].orderno;
            //$scope.orderdate = response['0'].orderdate;
           

        }).catch(function (response) {
        });

    }

    var GetOrderNumber = function (vSalesOrderId) {
        
        $http({
            url: vUrl + "Reorder/GetClientSalOrderDetailsReorder",
            method: 'GET',
            params: { memberid: vclientMemberId, SalesOrderId: vSalesOrderId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            var result = response.data;
            var vOrderno = result["0"].OrderNo;
            var vorderdate = result["0"].OrderDate;
            $scope.loader = false;

            $scope.OrderNumber = { Orderno: vOrderno, orderdate: vorderdate };
        }).catch(function (response) {
        });


    }




    var vSalesOrderId = localStorage.getItem("SalesOrderId");
    localStorage.getItem("SalesOrderId", "");
    //localStorage.clear();
    if (vSalesOrderId != undefined && vSalesOrderId != null && vSalesOrderId != "") {
        

        $scope.BindSalOrderOrderedGrid(vSalesOrderId);
        GetOrderNumber(vSalesOrderId);
    }

    $scope.ViewOrderPage = function () {

        $scope.SalesOrderId1 = vSalesOrderId;
        localStorage.setItem("SalesOrderId1", JSON.stringify($scope.SalesOrderId1));

        window.location.href = "#!ClientOrder/";
    }

    var vCartItem = localStorage.getItem("CartItem");

   // $scope.OrderDetails = [];

    //$scope.values = [];
    var vqty = "";

   

   // $scope.OrderDetails = vqty;
    

  

    $scope.AddToCart = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, VarianceId, MrpPrice1, VarianceType) {
        debugger;
        var vDiscount = 0, vTax = 0, vCopounPercentage = 0, linetotal = 0, vCopounCode = "";
        var vImg = ImageURL;
        //if (ImageURL.length != 0) {
        //    vImg = ImageURL["0"].ImageURL;
        //}
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
                            var vlinetotal = vPrice * qty1;
                            if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
                                debugger;
                                $scope.CartItem = JSON.parse(vCartItem);
                                // var vFindProductId = null;
                                var vProductVarianceId = null;
                                var index;
                                for (var i = 0; i < $scope.CartItem.length; ++i) {
                                    if ($scope.CartItem[i].VarianceId == VarianceId) {
                                        index = i;
                                        //vFindProductId = $scope.CartItem[i].ProductId;
                                        
                                        vProductVarianceId = $scope.CartItem[i].VarianceId;
                                        $scope.CartItem[i].Qty = $scope.CartItem[i].Qty + qty1;
                                        $scope.CartItem[i].LineTotal = $scope.CartItem[i].Qty * vPrice;
                                        break;
                                    }
                                }
                                if (vProductVarianceId != undefined && vProductVarianceId != null && vProductVarianceId != "") { }
                                else {
                                    

                                    $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vlinetotal, VarianceId: VarianceId, VarienceType: VarianceType, GSTPercentage: vGST, MrpPrice: MrpPrice1 });
                                }
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                            else {
                                var order = []; $scope.CartItem = order;

                                vTax = vTax * qty1;
                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vlinetotal, VarianceId: VarianceId, VarienceType: VarianceType, GSTPercentage: vGST, MrpPrice: MrpPrice1 });
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
                        }, 400); addProductNotice('Product Added to cart', '', '<h3>Success: You have added ' + Title + ' to your Cart</h3>!', 'Success');
                    });
                }
                else {
                    alert("Ordered Qty is in out of stock.");
                    return;
                }
            }
        });
    }
   

    $scope.onTextBoxKeyPress = function (event) {
        //



        if (event.keyCode == 45 || event.keyCode == 43 || event.keyCode == 46) {
            event.preventDefault();
            return false;
        }
    }


    // ------------- Bindgrid-------------------//
    var vid = "";
    $scope.Qty = function (ProductId) {
        

       
        vid= ProductId ;
       // $scope.od.Quantity = vqty;

    }


    //ViewCart Click Event
     $scope.CheckOutClick = function () {
        
        var vCount = localStorage.getItem("Count");
        var vclientMemberId = $.session.get('clientMemberId');
        if (vCount != undefined && vCount != null && vCount != 0) {
            if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '' || vclientMemberId == 'undefined' || vclientMemberId == '0') {
                
                if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '' || vclientMemberId == 'undefined' || vclientMemberId == '0') {
                   // addProductNotice('', '', '<h3>Please Sign In first and try again. ', 'Success');
                    $window.scrollTo(0, 0);
                    $('#myModal').modal('show');
                    angular.element(document.querySelector('#myModalmobSignIn')).addClass("displayMobMenu");
                  
                }
                else
                { window.location.href = "#!ShoppingCart"; }
            }
        else
                window.location.href = "#!ShoppingCart";
        }
        else {
            addProductNotice('Your cart is empty', '', '<h3>Please add atleast one product to continue. ', 'Success');
        }
    }

    //-----------------------   Pagination Start   -----------------------------//
    // var vPageCount = $.session.get('');
    //$scope.pageSize = vGridSizeClient;
    //$scope.pageSize = 10;
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

});