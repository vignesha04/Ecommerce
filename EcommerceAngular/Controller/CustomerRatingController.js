'use strict';

ScBusinez.controller('CustomerRatingController', function ($scope, $http, $window) {

    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);

    $scope.ShowApproveTh = false;
    $scope.ShowRejectTh = false;
    $scope.ShowApproveTD = false;
    $scope.ShowRejectTD = false;

    $scope.BindGrid = function () {
        $http(
            {
                url: vUrl + "CustomerRatings/GetCustomerRatingsDetails",
                method: 'GET',
                //params: { iActive: Active, CompanyId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                $scope.allItems = response.data;
                $scope.sort('name');
                $scope.ShowApproveTh = true;
                $scope.ShowRejectTh = true;
                $scope.ShowApproveTD = true;
                $scope.ShowRejectTD = true;
            }).catch(function (response) {
                //
            });
    }
    $scope.BindGrid();
      
    $scope.GetApprovedReview = function () {
        
       

        $http({
            method: "GET",
            url: vUrl + "CustomerRatings/GetApprovedReview",
            params: { Status: "Approve"},
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
            $scope.ShowApproveTh = false;
            $scope.ShowRejectTh = true;
            $scope.ShowApproveTD = false;
            $scope.ShowRejectTD = true;
        }).catch(function (response) {
            //debugger
        });
    }

    $scope.GetRejectedReview = function () {
        


        $http({
            method: "GET",
            url: vUrl + "CustomerRatings/GetRejectedReview",
            params: { Status: "Reject" },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            
            $scope.allItems = response.data;
            $scope.sort('name');
            $scope.ShowApproveTh = true;
            $scope.ShowRejectTh = false;
            $scope.ShowApproveTD = true;
            $scope.ShowRejectTD = false;
        }).catch(function (response) {
            //debugger
        });
    }

    $scope.Approve = function (ProductReviewId) {
        
             
            $http({
                url: vUrl + "CustomerRatings/UpdateCustomerRatingsStatus",
                method: 'POST',
                params: { ProductReviewId: ProductReviewId, Status: "Approve" },
                //data: cats,
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                alert('This Review Approved');
                $scope.BindGrid();
            }).catch(function (response) {
            })
        
        

    }

    $scope.Reject = function (ProductReviewId) {
        

        $http({
            url: vUrl + "CustomerRatings/UpdateCustomerRatingsStatus",
            method: 'POST',
            params: { ProductReviewId: ProductReviewId, Status: "Reject" },
            //data: cats,
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            alert('This Review Rejected');
            $scope.BindGrid();
        }).catch(function (response) {
        })



    }

    $scope.exportData = function () {
        //
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Category>{worksheet}</x:Category><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");

        //var filters = $('.ng-table-filters').remove();
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        // $('.ng-table-sort-header').after(filters);
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Category.xls';
        a.click();
    };


    $scope.Search = function () {
        //
        var vdata = $scope.Category.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid(1);
        }
    }

    var GetSearch = function (vsearch) {
        
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        $http({
            url: vUrl + "Category/GetSearch",
            method: "GET",
            params: { Search: vsearch, Status: vStatus, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
            //
            $scope.data = response.data;
            $scope.allItems = response.data;
            $scope.sort('name');
        }).catch(function myError(response) {
            //
        });
    };




    //-----------------------   Pagination Start   -----------------------------
    var vPageCount = $.session.get('GridSizeAdmin');
    //$scope.pageSize = vPageCount;
    $scope.pageSize = vPageCount;
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

    //-----------------------   Pagination End   -----------------------------


});
