'use strict'; Ecom.controller('ClientOrdesController', function ($scope, $http, $rootScope, $timeout, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";
    
    var vclientMemberId = $.session.get('clientMemberId');
    var vclientMemberName = $.session.get('clientMemberName');
    var vAmount = localStorage.getItem("Amount");
    $scope.loader = true;
    
    var vAmount1 = localStorage.getItem("Amount");
    var vDeliveryAddress = localStorage.getItem("DeliveryAddress");
    var vDeliveryCharges = localStorage.getItem("DeliveryCharges");
    $scope.CouponApplicable = $.session.get('CouponApplicable');
    $.session.set('vcilentorderno','');
    $scope.MemberName = vclientMemberName;
    var vCompanyId = $.session.get('CompanyId');
    
    //vInvoice = localStorage.getItem("Invoice");

    if ($scope.MemberName == "null" || $scope.MemberName == undefined || $scope.MemberName == "" || $scope.MemberName == null) {

        $scope.MemberName = "";

    }
    if (vclientMemberId == undefined || vclientMemberId == null || vclientMemberId == '' || vclientMemberId == 'undefined') {
        alert("Please login first then only you can able to Checkout.");
        window.location.href = "#!HomePage";
        return;
    }
    $window.scrollTo(0, 0);

 $scope.ShowmsgStatus = false; $scope.CancelledComments = "";

 $scope.SGSTshow = false;
 $scope.CGSTshow = false;
 $scope.IGSTshow = false;
 $scope.SGSTshowTD = false;
 $scope.CGSTshowTD = false;
 $scope.IGSTshowTD = false;
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

         if (vDeliveryaddressstate == vCompAddressState) {
             $scope.SGSTshow = true;
             $scope.CGSTshow = true;
             $scope.IGSTshow = false;
             $scope.SGSTshowTD = true;
             $scope.CGSTshowTD = true;
             $scope.IGSTshowTD = false;
         }
         else {

             $scope.SGSTshow = false;
             $scope.CGSTshow = true;
             $scope.IGSTshow = true;
             $scope.SGSTshowTD = false;
             $scope.CGSTshowTD = true;
             $scope.IGSTshowTD = true;
         }
     }
     else {
         $scope.SGSTshow = false;
         $scope.CGSTshow = false;
         $scope.IGSTshow = false;
         $scope.SGSTshowTD = false;
         $scope.CGSTshowTD = false;
         $scope.IGSTshowTD = false;
     }
 }).then(function myError(response) {

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

    $scope.ShowratingTH = false;
    $scope.ShowratingTD = false;
    $scope.ShowOrderItems = function (Orderno, Statuscheck, Status) {
        var x = document.getElementById(Orderno);
        var vButton = document.getElementById(Statuscheck);
        
        if (Status == "Ordered") {
            vButton.style.display = "block";
        }
        else {
            vButton.style.display = "none";
        }
        if (x.style.display == "contents") {
            x.style.display = "none";
        }
        else {
            x.style.display = "contents";
        }
        if (Status == "SHIPPED") {
            $scope.ShowratingTH = true;
            $scope.ShowratingTD = true;
        }
        else {
            $scope.ShowratingTH = false;
            $scope.ShowratingTD = false;
        }
        $scope.ShowStars = true;
        $scope.ReviewComments = "";

    }


    $scope.ReOrder = function (SalesOrderId) {
        
        $scope.SalesOrderId = SalesOrderId;

        localStorage.setItem("SalesOrderId", JSON.stringify($scope.SalesOrderId));

        window.location.href = "#!Reorder/" + $scope.SalesOrderId;

    }
   


    var vGridSizeClient = 5;
    $http({
        url: vUrl + "IndexPage/GetSiteSettingConfiguration",
        method: 'GET',
        headers: { "Content-Type": JSON }
    }).then(function (response) {
        
        var vResult = response.data;
        $scope.CurrencyType = vResult["0"].CurrencyType;
        vGridSizeClient = vResult["0"].GridSizeClient;
        $scope.CurrencyType = vCurrencyType;
        }).catch(function (response) {
        });


    $scope.BindSalOrderOrderedGrid = function (vclientMemberId) {
        
        $http({
            url: vUrl + "ProductDetail/GetClientSalOrderDetails",
            method: 'GET',
            params: { memberid: vclientMemberId },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            $scope.allItems = response.data;
            $scope.pageSize = vGridSizeClient;
            $scope.sort('name');
            $scope.loader = false;
        }).catch(function (response) { });
    }
    $http({
        url: vUrl + "SalesReport/GetCompanyDetails",
        method: 'GET',
        params: { CompanyDetailId: vCompanyId },
        headers: { "Content-Type": JSON }
    }).then(function (Response) {
        $scope.ShowSalesreport = false;
        var vCompanyDetails = Response.data;
        
        $scope.CompanyName = Response.data["0"].CompanyName;
        $scope.GSTNo = Response.data["0"].GSTNo;
        $scope.CINno = Response.data["0"].CINno;
        $scope.InvoiceLogo = Response.data["0"].InvoiceLogo;
        $scope.EmailId = Response.data["0"].EmailId;
        $scope.PhoneNo = Response.data["0"].PhoneNo;
        }).catch(function (response) {
            
        });
    $http({
        url: vUrl + "SalesReport/GetTermsandContionInvoice",
        method: 'GET',
        params: { CompanyDetailId: 1 },
        headers: { "Content-Type": JSON }
    }).then(function (Response) {
        
        $scope.salesinvoice = Response.data;
        
        $scope.InvoiceTermsAndCondition = Response.data["0"].InvoiceTermsAndCondition;
        }).catch(function (response) {
            
        });
 

    var BindDeliveryCharges = function () {
        
        var vTotQty = 0;
        var vCart = localStorage.getItem("CartItem");
        $scope.CartItem = JSON.parse(vCart);     
       
        vTotQty = $scope.TotalAmount1;
        $http({
            url: vUrl + "IndexPage/GetProductDelCharges",
            method: 'GET',
            params: { strCount: vAmount1 },
            headers: { "Content-Type": JSON }
        }).then(function (response) {
            
            var vData = response.data;
            var vDCharge = 0;
            if (response.data.length == 0) {
                $http({
                    url: vUrl + "IndexPage/GetProductDelCharges1",
                    method: 'GET',
                    params: { strCount: vTotQty },
                    headers: { "Content-Type": JSON }
                }).then(function (response) {
                    
                    vData = response.data;
                    if (response.data.length != 0) {
                        $scope.DeliveryCharges = Number(vData["0"].Price);
                        vDCharge = vData["0"].Price;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        $scope.TotalAmount = Number($rootScope.TotalAmount) + Number(vData["0"].Price);
                        $scope.printPage1("Salesreport1");
                        //localStorage.setItem("Amount", $scope.TotalAmount);
                        // var vAmount = localStorage.getItem("Amount");
                    }
                    else {
                        $scope.DeliveryCharges = 0;
                        localStorage.setItem("DeliveryCharges", vDCharge);
                        $scope.printPage1("Salesreport1");
                    }
                   // $scope.printPage1("Salesreport1");
                });
            }
            else {
                $scope.Deliverycharge = true;
                $scope.Deliverych = vData["0"].Price;
                vDCharge = vData["0"].Price;
                localStorage.setItem("DeliveryCharges", vDCharge);
                $scope.DeliveryCharges = Number(vData["0"].Price);
                $scope.TotalAmount = Number($rootScope.TotalAmount) + Number(vData["0"].Price);
                $scope.printPage1("Salesreport1");
            }
          
            
        }).catch(function (response) {
        });
    }
    

    $scope.GenarateInvoice = function (vSalId) {
        
        //var vSalId = $scope.report.SalesOrderId;
        if (vSalId != undefined && vSalId != null && vSalId != "") {

              $http({
                url: vUrl + "SalesReport/GetSalesReportDetails",
                method: 'GET',
                params: { SalesOrderId: vSalId, CompanyDetailId: 1 },
                headers: {
                    "Content-Type": JSON
                }

              }).then(function (Response) {
                  debugger;
                $scope.CartItems2 = Response.data["0"].OrderItems;
                $scope.ShowPrint = true;             
                $scope.MemberName = Response.data["0"].MemberName;
                $scope.DeliveryContactNo = Response.data["0"].DeliveryContactNo;
                $scope.DeliveryAddressLine1 = Response.data["0"].DeliveryAddressLine1;
                $scope.DeliveryAddressLine2 = Response.data["0"].DeliveryAddressLine2;
                $scope.DeliveryCity = Response.data["0"].DeliveryCity;
                $scope.DeliveryState = Response.data["0"].DeliveryState;
                $scope.DeliveryPinCode = Response.data["0"].DeliveryPinCode;
                $scope.DeliveryEmail = Response.data["0"].DeliveryEmail;
                $scope.OrderNo = Response.data["0"].OrderNo;
                $scope.OrderDate = Response.data["0"].OrderDate;
                $scope.Amoount = Response.data["0"].Amoount;
                //BindDeliveryCharges();
                $scope.DeliveryCharge = Response.data["0"].DeliveryCharge; 
                $scope.TotalAmoount = Response.data["0"].TotalAmoount; 
                $scope.CouponCode = Response.data["0"].CouponCode;
                
            }).catch(function (response) {
                
            });
            $http({
                url: vUrl + "SalesDetail/GetCompanyDetails",
                method: 'GET',
                params: { CompanyDetailId: 1 },
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                $scope.ShowSalesreport = false;
                $scope.ShowSalesreportmobile = true;

               // var vCompanyDetails = Response.data;
                
                $scope.CompanyName = Response.data["0"].CompanyName;
                $scope.GSTNo = Response.data["0"].GSTNo;
                $scope.CINno = Response.data["0"].CINno;
                $scope.InvoiceLogo = Response.data["0"].InvoiceLogo;
                $scope.EmailId = Response.data["0"].EmailId;
                $scope.PhoneNo = Response.data["0"].PhoneNo; 
                $scope.AddressLine1 = Response.data["0"].AddressLine1;
            $scope.AddressLine2 = Response.data["0"].AddressLine2;
            $scope.City = Response.data["0"].City;
            $scope.State = Response.data["0"].State;
            $scope.Country = Response.data["0"].Country;
            $scope.PinCode = Response.data["0"].PinCode;
            }).catch(function (response) {
                
            });

            $http({

                url: vUrl + "SalesReport/GetTermsandContionInvoice",
                method: 'GET',
                params: { CompanyDetailId: 1 },
                headers: {
                    "Content-Type": JSON
                }

            }).then(function (Response) {
                
             if (Response.data.length != 0) {
               $scope.salesinvoice = Response.data
                
                $scope.InvoiceTermsAndCondition = Response.data["0"].InvoiceTermsAndCondition;
              }
                $timeout(function () {
                
               $scope.printPage1('divSalInv');
            }, 1000);
               
               
            }).catch(function (response) {
                
            });

           
        }
        else {
        }
    }
   
    $scope.ShowdivSalInv = false;
    
    $scope.printPage1 = function (id) {
        
       // document.getElementById('divSalInv').style.display = 'block';
        
        var html = "<html>";
        html += document.getElementById(id).innerHTML;
        html += "</html>";
        var printWin = window.open('width=100,height=100');
        printWin.document.write(html);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
    }


    $scope.BindSalOrderOrderedGrid(vclientMemberId);
    $scope.Showmsg = false;
    $scope.OpenPopUp = function (SalesOrderId) {


        if (confirm("Do you Want to Cancel this order!")) {

            $scope.msgStatus = "";
            $scope.Comments = "";
            $scope.SalesOrderIdForCancel = SalesOrderId;
            $http({
                url: vUrl + "Cancelcomments/GetCancelcomments",
                method: 'GET',
                headers: { "Content-Type": JSON }
            }).then(function (response) {

                var result = response.data;
                $scope.cancellation = response.data;
                var vCancelledCommentsId = result["0"].CancelledCommentsId;
                var vComments = result["0"].Comments;
                $scope.od = { CancelledCommentsId: vCancelledCommentsId, Comments: vComments };
            }).catch(function (response) {

            });
        }

        else {
            return false;
        }
    }

    var vsalesorderid = "";

       $scope.ChangeStatus = function () {
           
           if ($scope.Comments == null || $scope.Comments == undefined || $scope.Comments == "") {
               $scope.Showmsg = true;
               $scope.msg = "Please Select The Reason for Cancel the Order";
               return false;
           }
          
           var vSalId = $scope.SalesOrderIdForCancel;
           vsalesorderid = vSalId;
            var vCancelledComments=$scope.Comments;
           
          if ($scope.Status == "Ordered") {
            $scope.Status = true;
          }
          else
           $scope.Status = false;
         $http({
            url: vUrl + "SalOrder/UpdateSalOrderStatus",
            dataType: 'json',
            method: 'POST',
            params: { OrderId: vSalId, Status: 'Cancelled', CancelledComments: vCancelledComments },
            headers: { "Content-Type": "application/json" }
         }).then(function (data) {
            
            $scope.Showmsg = false;
            $scope.ShowmsgStatus = true;
            $scope.msgStatus = "Your Order Cancelled Successfully";
           
            $timeout(function () {
                 $('#myModalcancel').modal('hide');
            }, 900);
            $scope.BindSalOrderOrderedGrid(vclientMemberId);
            var vResult = Response.data;
            $scope.SalesOrderIdForCancel = "";
         });
       }
       $scope.ShowStars = true;
       $scope.ReviewComments = "";
       $scope.ShowReviewProduct = false;
       $scope.ShowProductReview = true;
       $scope.StarRating = function (Rating) {
           if (Rating == "star1") {
               $scope.Showstar1 = true;
               $scope.Showstar2 = false;
               $scope.Showstar3 = false;
               $scope.Showstar4 = false;
               $scope.Showstar5 = false;
               $scope.ShowStars = false;
           }
           if (Rating == "star2") {
               $scope.Showstar1 = false;
               $scope.Showstar2 = true;
               $scope.Showstar3 = false;
               $scope.Showstar4 = false;
               $scope.Showstar5 = false;
               $scope.ShowStars = false;
           }
           if (Rating == "star3") {
               $scope.Showstar1 = false;
               $scope.Showstar2 = false;
               $scope.Showstar3 = true;
               $scope.Showstar4 = false;
               $scope.Showstar5 = false;
               $scope.ShowStars = false;
           }
           if (Rating == "star4") {
               $scope.Showstar1 = false;
               $scope.Showstar2 = false;
               $scope.Showstar3 = false;
               $scope.Showstar4 = true;
               $scope.Showstar5 = false;
               $scope.ShowStars = false;
           }
           if (Rating == "star5") {
               $scope.Showstar1 = false;
               $scope.Showstar2 = false;
               $scope.Showstar3 = false;
               $scope.Showstar4 = false;
               $scope.Showstar5 = true;
               $scope.ShowStars = false;
           }
       }
       
       $scope.OpenReview = function (ProductId) {
           
           $scope.ProductIdForReview = ProductId;
           $scope.ReviewCheck(ProductId);
           $scope.ShowStars = true;
           $scope.od.ReviewComments = "";
           $scope.Showstar1 = false;
           $scope.Showstar2 = false;
           $scope.Showstar3 = false;
           $scope.Showstar4 = false;
           $scope.Showstar5 = false;
           $scope.Showmsgsuccess = false;
           $scope.Showmsgerror = false;
           $scope.msgStatus = '';
           $scope.msg = '';
       }
       $scope.ReviewCheck = function (vProductId) {
           
           $http({
               url: vUrl + "ProductReview/GetClientProductReviewsExistCHek",
               method: 'GET',
               params: { ProductId: vProductId, MemberId: vclientMemberId },
               headers: { "Content-Type": JSON }
           }).then(function (response) {

               debugger;
               var result = response.data;
               if (result.length != 0) {
                   $scope.ShowStars = false;
                   document.getElementById("SubmitBtn").style.display = "none";
                   $scope.ShowReviewProduct = true;
                   $scope.ShowProductReview = false;
                   $scope.reviewRating = response.data;
                   var vReviewComments = result["0"].ReviewComments;
                   var vProductId = result["0"].ProductId;
                   var vMemberId = result["0"].MemberId;
                   var vMemberName = result["0"].MemberName;
                   var vCity = result["0"].City;
                   var vRating = result["0"].Rating;
                   $scope.od = {
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

               }
                   
               else {
                   $scope.ShowStars = true;
                   document.getElementById("SubmitBtn").style.display = "Block";
                   $scope.ShowReviewProduct = false;
                   $scope.ShowProductReview = true;
               }
           }).catch(function (response) {
           });
       }
     
    $scope.SubmitReview = function () {
        debugger;
        if ($scope.ShowStars == true) {
            $scope.msg = 'Please Select a Star to Rate our product';
            $scope.Showmsgerror = true;
            $scope.Showmsgsuccess = false;
            return;
        }
          if($scope.Showstar1==true)
             $scope.od.Rating = 1;
          else if
         ($scope.Showstar2 == true)
              $scope.od.Rating = 2;
          else if
              ($scope.Showstar3 == true)
              $scope.od.Rating = 3;
          else if
              ($scope.Showstar4 == true)
              $scope.od.Rating = 4;
          else if
              ($scope.Showstar5 == true)
            $scope.od.Rating = 5;
          var od = $scope.od;
          var vProductIdForReview = $scope.ProductIdForReview;
          
          $http({
              url: vUrl + "SalesOrder/SubmitProductReviews",
              dataType: 'json',
              method: 'POST',
             // data: od,
              params: { ProductId: vProductIdForReview, MemberId: vclientMemberId, ReviewComments: $scope.od.ReviewComments, Rating: $scope.od.Rating },
              headers: { "Content-Type": "application/json" }
          }).then(function (data) {
              debugger;
              $scope.msgStatus = "Review Submitted Successfully";
              $scope.Showmsgsuccess = true;
              $scope.Showmsgerror = false;
              $timeout(function () {
                   $('#myModalRating').modal('hide');
              }, 900);
          });
       }

    $scope.UpdateStockCountForcancelorder = function () {
        
  
        $http({
            url: vUrl + "SalesOrder/UpdateStockCountForcancelorder",
            dataType: 'json',
            method: 'POST',
            // data: od,
            params: { salesorderid: vsalesorderid },
            headers: { "Content-Type": "application/json" }
        }).then(function (data) {
            
           
        });
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
            else {
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
        for (var i = input; i < total; i++){
            if (i != 0 && i != total - 1) { ret.push(i); }
        }
        return ret;
    }; $scope.sort = function (sortBy) {
        var iconName = "";
        $scope.resetAll();
        $scope.pagination();
    };
});