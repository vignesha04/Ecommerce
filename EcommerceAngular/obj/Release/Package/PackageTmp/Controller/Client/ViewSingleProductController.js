'use strict'; Ecom.controller('ViewSingleProductController', function ($scope, $http, $location, $rootScope, $routeParams, $timeout, $window,) {
    $scope.SubDomain = $.session.get('SubDomain');
debugger;
    //$scope.SubDomain = "http://localhost:56397/api/";

   var vUrl = $scope.SubDomain;
  // var vUrl = "http://localhost:56397/api/";
    $window.scrollTo(0, 0);
 $scope.Quantity = 1; $scope.sVarianceId = false;
    var vSellingPrice = '';
    var vMRpPrice = '';
    $scope.Domain = $.session.get('Domain');
    //var locatoin = $location.host();
   
   
    $scope.loader = true;
    $scope.ShowMainDiv=false;

    $(".vertical-wrapper").css("display", "none");
   
    $(".sub-menu").css("display", "none"); 
    $(".content").css("display", "none");
    //var Vsubcatid = "";

    var siteconfig = function () {
        $http({
            url: vUrl + "IndexPage/GetSiteSettingConfiguration",
            method: 'GET',
            // params: { website: locatoin },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            var vResult = response.data;
            var vCurrencyType = vResult["0"].CurrencyType;
            var vGridSizeClient = vResult["0"].GridSizeClient;
            $scope.CurrencyType = vCurrencyType;
        }).catch(function (response) { });
    }
   
    $scope.aHomeClick = function () {
        var vclientMemberId = $.session.get('clientMemberId');
        if (vclientMemberId != null && vclientMemberId != '' && vclientMemberId != undefined) {
            var vLocation = "#!HomePage/" + vclientMemberId; window.location.href = vLocation;
        }
        else { var vLocation = "#!HomePage/0"; window.location.href = vLocation; }
    }
    //var vProdId = $.session.get('ProductId');
   
     var vProdId = $routeParams.Prod;
     $scope.proid=vProdId;

    $rootScope.$watch('SubDomain', function () {

        //vUrl = "http://localhost:56397/api/";
        vUrl = $rootScope.SubDomain;
        if (vUrl != null && vUrl != undefined && vUrl != "") {
            //  BindSiteSettingConfig();
            //GetHomeSlider();
            //GetTodayDeals();
            //GetHomepageConfiguration();
            siteconfig();
            BindProductDetails(vProdId);
            Reviews();
            category();
        }


    });
    

    //let currentHash = window.location.hash;

    //window.addEventListener('popstate', function (event) {
    //    
    //    $timeout(function () {
    //        if (window.location.hash == currentHash) {

    //            window.location = "#!ViewProduct";


    //        }
    //        //else
    //        //    window.location.reload();
    //    }, 4700);
    //});
    
   
        
    //setTimeout(function () {
    //    window.addEventListener('popstate', onpopstate, false);
    //}, 5000);

    //if (window.history && window.history.pushState) {

    //    window.history.pushState('forward', null, './#forward');

    //    $(window).on('popstate', function () {
    //        var vLocation = "#!Product";
    //        window.location = vLocation;
    //    });

    //}

    //window.onbeforeunload = function () {
    //    
    //    var vLocation = "#!Product";
    //    window.location = vLocation;
    //};

    //window.onpopstate = function (event) {
    //    
    //   if (event.state = true) {
    //        var vLocation = "#!ViewProduct";
    //        window.location = vLocation;
    //    } else {
    //        var vLocation = "#!Product";
    //       window.location = vLocation;
    //    }
    //}

    
    //$scope.currentLocation = $location.url();
    //$scope.$on("$locationChangeSuccess", function handleLocationChangeStartEvent(event) {
    //    $scope.currentLocation = $location.url();
    //})

    //var startWatchingTimer = $timeout(startWatchingForLocationChanges, 0, false);
    //var stopWatchingLocation = null;
    //function handleLocationChangeStartEvent(event) {
    //    event.preventDefault();
    //    var targetPath = "#!ViewProduct";
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


    $scope.ShowWhattsappBtn = false;
    $scope.ShowfacebookBtn = false;
    $scope.ShowGooglePlusBtn = false;
    $scope.ShowTwitterBtn = false;
    $scope.ShowpInterestBtn = false;
    $scope.ShowShareBtn1 = true; 
    $scope.ShowShareBtn2 = false;

    $scope.ShareBtnClick = function () {
        
        $scope.ShowWhattsappBtn = true;
        $scope.ShowfacebookBtn = true;
        $scope.ShowGooglePlusBtn = true;
        $scope.ShowTwitterBtn = true;
        $scope.ShowpInterestBtn = true;
        $scope.ShowShareBtn1 = false;
        $scope.ShowShareBtn2 = true;
    }

    $scope.ShareBtnClick1 = function () {
        
        $scope.ShowWhattsappBtn = false;
        $scope.ShowfacebookBtn = false;
        $scope.ShowGooglePlusBtn = false;
        $scope.ShowTwitterBtn = false;
        $scope.ShowpInterestBtn = false;
        $scope.ShowShareBtn1 = true;
        $scope.ShowShareBtn2 = false;
    }
    $scope.Whattsappsharing = function () {




        //target = "_blank";
        var vlink = "http://" + $scope.Domain + "/%23!/Product/" + $scope.proid;
        //$scope.link = vlink;
        $scope.link1 = vlink;





        const button = document.getElementById("button");
        //var divblock = $('.divblock').text();
        /*button.addEventListener("click", event => {*/



        // Whatsapp Message on Button Click
        window.open("https://api.whatsapp.com/send?text=" + vlink)



        /*});*/





    }



    $scope.facebooksharing = function () {




        var vlink = "http://" + $scope.Domain + "/%23!/Product/" + $scope.proid;



        var faceurl = 'https://www.facebook.com/sharer/sharer.php?u=';
        faceurl += vlink;
        window.open(faceurl);



        ////target = "_blank";
        //window.open = "'https://www.facebook.com/sharer/sharer.php?u=http://"+$scope.Domain+"/!#/Product/'+$scope.proid+'&t=http://"+$scope.Domain+"/!#/Product/'+$scope.proid+'", '_blank';
    }



    $scope.Twittersharing = function () {



        var vlink = "http://" + $scope.Domain + "/%23!/Product/" + $scope.proid;



        var tweet_url = 'https://twitter.com/intent/tweet?text=';
        tweet_url += vlink;
        window.open(tweet_url);
    }



    $scope.GooglePlussharing = function () {




        var vlink = "http://" + $scope.Domain + "/%23!/Product/" + $scope.proid;



        var gplusurl = 'https://plus.google.com/share?url=';
        gplusurl += vlink;
        window.open(gplusurl);
        //////target = "_blank";
        ////window.open = "'https://plus.google.com/share?url=http://"+$scope.Domain+"/!#/Product/'+$scope.proid+ ':%20 ' http://"+$scope.Domain+"/!#/Product/'+$scope.proid+'", '_blank';
    }



    $scope.Pinterestsharing = function () {



        var vlink = "http://" + $scope.Domain + "/%23!/Product/" + $scope.proid;



        var pinturl = 'http://pinterest.com/pin/create/button/?url';
        pinturl += vlink;
        window.open(pinturl);
        // //target = "_blank";
        //// window.open = "'http://pinterest.com/pin/create/button/?url=http://" + $scope.Domain + "/!#/Product/'+$scope.proid+ ':%20 ' http://"+$scope.Domain+"/!#/Product/'+$scope.proid+'", '_blank';
    }

  
    var BindProductDetails = function (ProdId) {
        $http({
            url: vUrl + "ProductDetail/GetProductDetails",
            method: 'GET',
            params: { ProductId: ProdId},
            headers: { "Content-Type": JSON }
        }).then(function (response) {
           
            
            $scope.ProductDetails = response.data;
            if ($scope.ProductDetails == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                var result = response.data;
                debugger;
                var vTitle = result["0"].Title;
                var vPrice = result["0"].Price;
                var vProductId = result["0"].ProductId;
                var vDescription = result["0"].Description; 
                var vDescription2 = result["0"].Description2;
                var vDescription3 = result["0"].Description3;
                var vCategoyName = result["0"].CategoyName;
                var vSubCategoryName = result["0"].SubCategoryName;
                var vSubCategoryId = result["0"].SubCategoryId;
                var vCategoryId = result["0"].CategoryId;
                var vDiscountDetailsId = result["0"].DiscountDetailsId;
                var vCouponId = result["0"].CouponId;
                var vTaxDetailsId = result["0"].TaxDetailsId; 
                //var vTaxDetailsId = vTaxDetailsId["0"].Percentage;
                if (vTaxDetailsId.length !=0){
                   var vTaxPercentage = vTaxDetailsId["0"].Percentage;
                 }else
                var vTaxPercentage = 0;
                var vImage1 = result["0"].Image1;
                var vBigImage = vImage1["0"].ImageURL;
                var vstock = result["0"].stock;
                var vDisFrom = result["0"].DisFrom;
                var vDisTo = result["0"].DisTo;
                var vCurDate = result["0"].CurDate;
                var vDiscount = result["0"].Discount;
                var vCouponCode = result["0"].CouponCode;
                var vCouponPercentade = result["0"].CouponPercentade;               
                var vVariance = result["0"].Variance;
                var vshowVariance = result["0"].showVariance;
                var vTodaydealAmt = result["0"].TodaydealAmt;               
                var vProdSellingPrice1 = result["0"].ProductSellingPrice;
                var vProdSellingPrice = vProdSellingPrice1["0"].sellingPrice;
                var vProdVariancePrice1 = result["0"].ProductVariancePrice;
                var vProdVariancePrice = vProdVariancePrice1["0"].VariancePrice;
                var vProductVariancetype = result["0"].ProductVariancetype;
                $scope.VarianceType= vProductVariancetype["0"].VarianceType;              
                $scope.MrpPrice1 = vProdVariancePrice;              
                var vDiscoutamont1 = (vProdVariancePrice - vProdSellingPrice);
                $scope.offeramount = vDiscoutamont1;
                $scope.Discoutamont = ((vDiscoutamont1 / vProdVariancePrice) * 100);
                $scope.Discoutamont = parseFloat($scope.Discoutamont).toFixed(2) + "%" + ''; 
                $scope.ProdTitle = vTitle;
                $scope.PriceNew = vPrice;
                $scope.ProductId = vProductId;
                $scope.Description = vDescription;
                $scope.Description2 = vDescription2;
                $scope.Description3 = vDescription3;
                $scope.CategoyName = vCategoyName;
                $scope.SubCategoryName = vSubCategoryName;
                $scope.SubCategoryId = vSubCategoryId;
                BindProductList($scope.SubCategoryId);
                $scope.CategoryId = vCategoryId;
                $scope.DiscountDetailsId = vDiscountDetailsId;
                $scope.CouponId = vCouponId;
                //$scope.TaxDetail = vTaxDetail;
                $scope.Image1 = vImage1;
                $scope.BigImage = vBigImage;
                $scope.TaxPercentage = vTaxPercentage;
                $scope.VarianceId = "";              
                $scope.VarienceType = "";
                if (vstock.length != 0) {
                    $scope.StockCount = "InStock (" + vstock["0"].StockCount + ")";
                    $scope.ProdStock = vstock["0"].StockCount;
                    $scope.Showstock = true;
                    $scope.Showstockout = false;
                }
                else {
                    $scope.StockCount = "Out of stock";
                    $scope.ProdStock = 0;
                    $scope.Showstock = false; $scope.Showstockout = true;
                }
                if (vTodaydealAmt.length != 0) {
                    $scope.TodayDealAmountt = vTodaydealAmt["0"].TodayDiscountAmount;
                }
                else {
                $scope.TodayDealAmountt = 0;
                }
                if (vDiscount != undefined && vDiscount != null && vDiscount != "") {
                    if (vDisFrom <= vCurDate && vDisTo >= vCurDate) {
                        $scope.ShowDiscount = true;
                        $scope.DiscountPercentage = "Additional " + vDiscount + " Rs Discount."; $scope.DiscountAmt = 0; $scope.DiscountPercen = 0;
                    }
                    else {
                        $scope.ShowDiscount = false;
                        $scope.DiscountPercentage = "";
                        $scope.DiscountAmt = 0;
                        $scope.DiscountPercen = 0;
                    }
                }
                if (vCouponCode != undefined && vCouponCode != null && vCouponCode != "") {
                    $scope.ShowCouponCode = true;
                    $scope.CouponCode = vCouponCode;
                    $scope.CouponPercentage = vCouponPercentade;
                }
                if (vVariance == 1) {
                    $http({
                        url: vUrl + "ProductDetail/GetProductVarienceDetails",
                        method: 'GET',
                        params: { ProductId: vProdId },
                        headers: { "Content-Type": JSON }
                    }).then(function (response) {
                        
                        $scope.ProductVarient = response.data;
                        var result = response.data; 
                        if (result["0"].VarianceType == "" || result["0"].VarianceType == null || result["0"].VarianceType == undefined) {
                            $scope.varianthide = false;
                        }
                        else {
                            $scope.varianthide = true;
                        }
                       var vPrice = result["0"].sellingPrice;
                       vSellingPrice = result["0"].sellingPrice;

                       var vVariancePrice = result["0"].VariancePrice;
                       vMRpPrice = result["0"].VariancePrice;
                       
                       //vVariancePrice = result["0"].VariancePrice;


                        var wholesalelengt = result["0"].wholesale.length - 1; 
                        if (result["0"].wholesale.length != 0) {
                            $scope.wholehide = true;
                            $scope.wholesaleProductVarient = result["0"].wholesale;
                            $scope.wholesaleQty = result["0"].wholesale[wholesalelengt].wholesaleToQty;
                            $scope.wholesaleprizeqty = result["0"].wholesale[wholesalelengt].wholesaleprize;
                        }
                        if (result["0"].vaeiancecolor.length != 0) {
                            $scope.colorvaria = true;
                            $scope.ColorVariance = result["0"].vaeiancecolor;
                            $scope.colour = result["0"].vaeiancecolor["0"].colorcode;
                        }
                        else {

                            $scope.colour = "";
                        }
                        var vVarianceId = result["0"].ProductVarianceId;
                        $scope.PriceNew = vPrice; 
                        $scope.MRPPriceNew = vVariancePrice;
                        $scope.VariancePrice = vVariancePrice; 
                        $scope.VarianceId = vVarianceId;
                        $scope.VarienceType = result["0"].VarianceType;
                        var vDiscount = result["0"].Discount;
                        
                    }).catch(function (response) {
                        
                    });
                    $http({
                        url: vUrl + "ProductDetail/Deliverycharge",
                        method: 'GET',
                       // params: { website: locatoin },
                        headers: { "Content-Type": JSON }
                    }).then(function (response) {
                        $scope.Deliverycharges = response.data;
                        if (response.data.length != 0) {
                            $scope.deliveryhide = true;
                        }
                        
                    }).catch(function (response) {
                        
                    });
                }
            }
        }).catch(function (response) { });
    }
    BindProductDetails(vProdId);

    // Bind Product Techinical Details
    $http({
        url: vUrl + "ProductDetail/GetProductTecDetails",
        method: 'GET',
        params: { ProductId: vProdId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.ProductTecDetails = response.data;

    }).catch(function (response) {

    });

    // Bind Product Features
    $http({
        url: vUrl + "ProductDetail/GetProductFeatures",
        method: 'GET',
        params: { ProductId: vProdId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {

        $scope.ProductFeatures = response.data;

    }).catch(function (response) {
        });


    $scope.ChangeImgInSlider = function (imgURL) {
        $scope.BigImage = imgURL;
    }
    var vVarianceTypeforCart = "";
    $scope.ChangeProdVarience = function (varienceid, Price, Type, wholesale, MrpPrice) {

        $scope.PriceNew = Price;
        $scope.MRPPriceNew = MrpPrice;
        vSellingPrice = Price;
        vMRpPrice = MrpPrice;
        $scope.VarianceId = varienceid;
        $scope.VarienceType = "-" + Type;
        vVarianceTypeforCart = $scope.VarienceType;

        if (wholesale.length != 0 && wholesale.length != undefined && wholesale.length != "" && wholesale.length != null) {

            $scope.wholesaleProductVarient = wholesale;
            //var wholesalelengt = wholesale.length - 1;
            //$scope.wholesaleQty = wholesale[wholesalelengt].wholesaleToQty;
            //$scope.wholesaleprizeqty = wholesale[wholesalelengt].wholesaleprize;
            //$scope.ColorVariance = wholesale.vaeiancecolor;
        }



    }

    $scope.heighlight = function (colour) {
        
        $scope.colour = "-" + colour;


    }

    $scope.ViewSingleProductPage = function (ProductId) {
        
        var vProductId = ProductId;

        $.session.set('ProductId', vProductId);

        var vLocation = "#!Product";
        window.location = vLocation;

    }



    var BindProductList = function () {
        
        $http({
            url: vUrl + "ProductList/GetRelatedProductList",
            method: 'GET',
            params: { SubCategoryId: $scope.SubCategoryId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            $scope.ProductList = response.data;
            $scope.loader = false;
            $scope.ShowMainDiv=true;
            //
            //var vResult = response.data;

            //if (vResult == "TimeOut")
            //    window.location.href = "#!TimeOut";
            //else {
            //    $scope.allItems = response.data;
            //    $scope.pageSize = vGridSizeClient;

            //    $scope.Quantity = 1;
            //    $scope.sort('name');
            //}
        }).catch(function (response) {
        });
    }
    
    $scope.ShowReview=false;
   $scope.ShowLoadMore=false;

    var Reviews = function () {
        $http({
            url: vUrl + "ProductReview/GetClientProductReviews",
            method: 'GET',
            params: { ProductId: vProdId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {

            var result = response.data;
            if (result == "TimeOut")
                window.location.href = "#!TimeOut";
            if (response.data.length != 0) {
                $scope.ShowReview = true;
                $scope.ShowLoadMore = false;
                if (response.data.length > 4) {
                    $scope.ShowLoadMore = true;
                }
                $scope.reviewRating = response.data;
                var vReviewComments = result["0"].ReviewComments;
                var vProductId = result["0"].ProductId;
                var vMemberId = result["0"].MemberId;
                var vMemberName = result["0"].MemberName;
                var vCity = result["0"].City;
                var vRating = result["0"].Rating;
                var vInsertedDate = result["0"].InsertedDate;
                $scope.review = {
                    Rating: vRating, ReviewComments: vReviewComments,
                    ProductId: vProductId, MemberId: vMemberId, MemberName: vMemberName, City: vCity, InsertedDate: vInsertedDate
                };
                if (vRating == "1") {
                    $scope.Showstar1 = true;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "2") {

                    $scope.Showstar1 = false;
                    $scope.Showstar2 = true;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "3") {

                    $scope.Showstar1 = false;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = true;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "4") {

                    $scope.Showstar1 = false;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = true;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "5") {

                    $scope.Showstar1 = false;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = true;
                }
                $scope.loader = false;
                $scope.ShowMainDiv = true;
            }
        }).catch(function (response) { });

    }
  

    $scope.ShowallReview = function () {
    $scope.ShowLoadMore=false;
         
        $http({
            url: vUrl + "ProductReview/GetClientProductAllReviews",
            method: 'GET',
            params: { ProductId: vProdId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var result = response.data;
            if (result == "TimeOut")
                window.location.href = "#!TimeOut";
            else {
                $scope.reviewRating = response.data;
                var vReviewComments = result["0"].ReviewComments;
                var vProductId = result["0"].ProductId;
                var vMemberId = result["0"].MemberId;
                var vMemberName = result["0"].MemberName;
                var vCity = result["0"].City;
                var vRating = result["0"].Rating;
                $scope.review = {
                    Rating: vRating, ReviewComments: vReviewComments,
                    ProductId: vProductId, MemberId: vMemberId, MemberName: vMemberName, City: vCity
                };
                if (vRating == "1") {
                     $scope.Showstar1 = true;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "2") {
                    
                    $scope.Showstar1 = false;
                    $scope.Showstar2 = true;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "3") {
                    
                    $scope.Showstar1 = false;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = true;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "4") {
                    
                    $scope.Showstar1 = false;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = true;
                    $scope.Showstar5 = false;
                }
                else if (vRating == "5") {
                    
                    $scope.Showstar1 = false;
                    $scope.Showstar2 = false;
                    $scope.Showstar3 = false;
                    $scope.Showstar4 = false;
                    $scope.Showstar5 = true;
                }
                $scope.loader = false;
$scope.ShowMainDiv=true;
            }
        }).catch(function (response) { });


    }
    var category = function () {
        $http({
            url: vUrl + "ProductDetail/GetNewItems",
            method: 'GET',
            // params: {  website: locatoin },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            $scope.NewItems = response.data;
            $scope.loader = false;
        }).catch(function (response) { });
        $http({
            url: vUrl + "IndexPage/GetCategorydetails",
            method: 'GET',
            //params: { website: locatoin },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            $scope.Category = response.data;
            $scope.loader = false;
        }).catch(function (response) { });
    }
   
    $scope.AddQty = function (Quantity, VarianceId) {
        
        var vQuantity = ++Quantity;
        $scope.Quantity = vQuantity;
        
        var whole = $scope.wholesaleProductVarient;
        if (whole != undefined && whole != null && whole != "") {
            Quantity = parseInt(Quantity);
            for (var i = 0; i < whole.length; i++) {
                var wholesalevariance = whole[i].productVarianceId;
                var wholesaleminqty = parseInt(whole[i].wholesaleFromQty);
                var wholesalemaxqty = parseInt(whole[i].wholesaleToQty);
                if (wholesalevariance == VarianceId) {
                    if (Quantity >= wholesaleminqty && Quantity <= wholesalemaxqty) {
                        $scope.PriceNew = whole[i].wholesaleprize;
                        return;
                    }
                    //else 
                    // $scope.PriceNew =vSellingPrice;
                }
            }
        }

    }
    $scope.Quantityperproduct = function (Quantity, VarianceId) {
        
        Quantity = parseInt(Quantity);
        var whole = $scope.wholesaleProductVarient;
        if (whole != undefined && whole != null && whole != "") {

            for (var i = 0; i < whole.length; i++) {
                var wholesalevariance = whole[i].productVarianceId;
                var wholesaleminqty = parseInt(whole[i].wholesaleFromQty);
                var wholesalemaxqty = parseInt(whole[i].wholesaleToQty);
                if (wholesalevariance == VarianceId) {
                    if (Quantity >= wholesaleminqty && Quantity <= wholesalemaxqty) {
                        $scope.PriceNew = whole[i].wholesaleprize;
                        return;
                    }
                    //else 
                    // $scope.PriceNew =vSellingPrice;
                }
            }
        }
        else {


        }
        
    }
    $scope.MinusQty = function (Quantity, VarianceId) {
        
        if (Quantity > 1) {
            var vQuantity = --Quantity;
            $scope.Quantity = vQuantity;
            var whole = $scope.wholesaleProductVarient;
            vQuantity = parseInt(vQuantity);
            for (var i = 0; i < whole.length; i++) {
                var wholesalevariance = whole[i].productVarianceId;
                var wholesaleminqty = parseInt(whole[i].wholesaleFromQty);
                var wholesalemaxqty = parseInt(whole[i].wholesaleToQty);
                if (wholesalevariance == VarianceId) {
                    if (vQuantity >= wholesaleminqty && vQuantity <= wholesalemaxqty) {
                        $scope.PriceNew = whole[i].wholesaleprize;
                        return;
                    }
                    //else
                      //  $scope.PriceNew = vSellingPrice;

                }
            }
        }
    }
    $scope.Showstock = true; $scope.Showstockout = false;
    var vCartItem = localStorage.getItem("CartItem");

    $scope.AddToCart = function (Title, Price, ProductId, Picture, Qty, DiscountDetailsId, TaxDetailsId, CouponId, ImageURL, VarianceId, MrpPrice1, offeramount, VarianceType) {

        var vDiscount = 0, vTax = 0, vCopounPercentage = 0, linetotal = 0, vCopounCode = "";
        var vImg = "";
        if (ImageURL.length != 0) {
            vImg = ImageURL["0"].ImageURL;
        }
        var vGST = TaxDetailsId;
        if (TaxDetailsId != null && TaxDetailsId != "" && TaxDetailsId != undefined) {
            if (TaxDetailsId.length != 0) {
                vGST = TaxDetailsId;
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

                            vTax = (Price - vDiscount) * vGST / 100;
                            var vPrice = Price - vDiscount + vTax;
                            // var vPrice = Price - vDiscount ;

                            var vPrice = vPrice;
                            var vlinetotal = vPrice * qty1;
                            if (vCartItem != undefined && vCartItem != null && vCartItem != "undefined") {
                                $scope.CartItem = JSON.parse(vCartItem);
                                // var vFindProductId = null;
                                var vProductVarianceId = null;
                                var index;

                                for (var i = 0; i < $scope.CartItem.length; ++i) {
                                    if ($scope.CartItem[i].VarianceId == VarianceId) {
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


                                    $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: vlinetotal, VarianceId: VarianceId, VarienceType: vVarianceTypeforCart, GSTPercentage: vGST, MrpPrice: MrpPrice1, Discoutamont: offeramount });
                                }
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                            else {
                                var order = []; $scope.CartItem = order;
                                var linetotal = vPrice * qty1;
                                vTax = vTax * qty1;
                                $scope.CartItem.push({ Title: Title, Price: Price, ProductId: ProductId, Picture: Picture, Qty: qty1, DiscountDetailsId: DiscountDetailsId, TaxDetailsId: TaxDetailsId, CouponId: CouponId, ImageURL: vImg, Discount: vDiscount, Tax: vTax, CopounCode: vCopounCode, CopounPercentage: vCopounPercentage, CopounAmount: 0, LineTotal: linetotal, VarianceId: VarianceId, VarienceType: vVarianceTypeforCart, GSTPercentage: vGST, MrpPrice: MrpPrice1, Discoutamont: offeramount });
                                localStorage.setItem("CartItem", JSON.stringify($scope.CartItem));
                            }
                   
                            var vCount = 0;
                            var vAmount = 0;
                            var vtotalAmount = 0;
                            angular.forEach($scope.CartItem, function (value) {
                                vCount = vCount + Number(value.Qty || 0);
                                vAmount = vAmount + (Number(value.Qty) * (Number(value.Price || 0)));
                                vtotalAmount = vtotalAmount + (Number(value.LineTotal || 0));
                            }); var vCartItems = localStorage.getItem("CartItem");
                            localStorage.setItem("Amount", vAmount);
                            localStorage.setItem("Count", vCount);
                            localStorage.setItem("totalamount", vtotalAmount);
                            //  $rootScope.cAmcurrent = totalvAmount;
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
    $scope.isNumber = function (event) {
         var keycode = event.which; if (!(keycode >= 48 && keycode <= 57)) { event.preventDefault(); }
    }
    siteconfig();
    BindProductDetails(vProdId);
    Reviews();
    category();
});

