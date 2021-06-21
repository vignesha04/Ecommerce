'use strict';

ScBusinez.controller('DashBoardController', function ($scope, $http, $window, $rootScope) {
    $scope.SubDomain = $.session.get('SubDomain');

   
    var vUrl = "";
    $window.scrollTo(0, 0);
    var vAdminId = $.session.get('AdminId');

    $rootScope.$watch('SubDomain', function () {
        
         //vUrl = "http://localhost:56397/api/";
        vUrl = $rootScope.SubDomain;
        if (vUrl != null && vUrl != undefined && vUrl != "") {
            GetNewSales();
            GetSiteSettingConfiguration();
            GetProductDetails();
            getuser();
            GetChartDetails();
            GetNewProducts();
            GetNewClients();
            GetCounts();
            UserCount();
        }


    });




    $scope.Weeksales = false;
    $scope.MonthSales = false;
    $scope.YearlySales1 = false;

    $scope.ShowWeeklySales = false;
    $scope.ShowMonthlySales = false;
    $scope.ShowYearlySales = false;
    $scope.week = function () {
        $scope.Weeksales = true;
        $scope.MonthSales = false;
        $scope.YearlySales1 = false;

        $scope.ShowWeeklySales = true;
        $scope.ShowMonthlySales = false;
        $scope.ShowYearlySales = false;
    }
    $scope.Monthsales = function () {
        $scope.MonthSales = true;
        $scope.YearlySales1 = false;
        $scope.Weeksales = false;

        $scope.ShowWeeklySales = false;
        $scope.ShowMonthlySales = true;
        $scope.ShowYearlySales = false;
    }

    $scope.YearlySales = function () {
        $scope.YearlySales1 = true;
        $scope.Weeksales = false;
        $scope.MonthSales = false;

        $scope.ShowWeeklySales = false;
        $scope.ShowMonthlySales = false;
        $scope.ShowYearlySales = true;
    }
    $scope.Yearreport = function () {
        // d3.selectAll("svg > *").remove();
        $("svg").remove()

        
        if ($scope.FYear == undefined || $scope.FYear == null || $scope.FYear == "") {
            $scope.msg = "Please Enter From Month";
            return false;
        }
        if ($scope.TYear == undefined || $scope.TYear == null || $scope.TYear == "") {
            $scope.msg = "Please Enter To Month";
            return false;
        }
        $http({
            url: vUrl + "DashBoardAdmin/Yearreport",
            method: 'GET',
            params: { FMonth: $scope.FYear, TMonth: $scope.TYear },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.YearlySales1 = false;
            var vData = response.data;

            const data = vData;
            var vAmt = 0;
            for (var i = 0; i < response.data.length; i++) {

                vAmt = vAmt + response.data[i].SalAmount;
            }
            var vMax = Math.max.apply(Math, response.data.map(function (vData) { return vData.SalAmount; }));

            const margin = { top: 50, right: 0, bottom: 80, left: 50 };
            const width = 450 - margin.left - margin.right;
            const height = 330 - margin.top - margin.bottom;

            const fullWidth = width + margin.left + margin.right;
            const fullHeight = height + margin.top + margin.bottom;

            const xScale = d3.
                scaleBand().
                padding(0.2).
                domain(data.map(d => d.oDate)).
                range([0, width]);

            const yScale = d3.
                scaleLinear().
                domain([0, vMax]).
                range([height, 0]);

            const svg = d3.
                select(".chart").
                append("svg").
                attr("width", fullWidth).
                attr("height", fullHeight).
                attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`).
                append("g").
                attr("transform", `translate(${margin.left}, ${margin.top})`);

            const fade = (selection, opacity) => {
                selection.style("fill-opacity", opacity);
            };

            svg.
                append("g").
                selectAll("rect").
                data(data).
                enter().
                append("rect").
                attr("x", d => xScale(d.oDate)).
                attr("y", d => yScale(d.SalAmount)).
                attr("width", d => xScale.bandwidth()).
                attr("height", d => height - yScale(d.SalAmount)).
                on("mouseover", (d, i, els) => {
                    d3.selectAll(els).
                        filter(":not(:hover)").
                        call(fade, 0.5);
                }).
                on("mouseout", (d, i, els) => {
                    d3.selectAll(els).call(fade, 1);
                });

            const yAxis = d3.axisLeft(yScale);
            svg.append("g").call(yAxis);

            const xAxis = d3.axisBottom(xScale);
            svg.
                append("g").
                attr("transform", `translate(0, ${height})`).
                call(xAxis).
                selectAll("text").
                style("text-anchor", "end").
                attr("transform", "rotate(-45)");

        }).catch(function (response) {
            debugger
        });

    }
    $scope.Monthreport = function () {
        // d3.selectAll("svg > *").remove();
        $("svg").remove()

        
        if ($scope.fromMonth == undefined || $scope.fromMonth == null || $scope.fromMonth == "") {
            $scope.msg = "Please Enter From Month";
            return false;
        }
        if ($scope.ToMonth == undefined || $scope.ToMonth == null || $scope.ToMonth == "") {
            $scope.msg = "Please Enter To Month";
            return false;
        }
        $http({
            url: vUrl + "DashBoardAdmin/Monthwize",
            method: 'GET',
            params: { FMonth: $scope.fromMonth, TMonth: $scope.ToMonth },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.MonthSales = false;
            var vData = response.data;

            const data = vData;
            var vAmt = 0;
            for (var i = 0; i < response.data.length; i++) {

                vAmt = vAmt + response.data[i].SalAmount;
            }
            var vMax = Math.max.apply(Math, response.data.map(function (vData) { return vData.SalAmount; }));

            const margin = { top: 50, right: 0, bottom: 80, left: 50 };
            const width = 450 - margin.left - margin.right;
            const height = 330 - margin.top - margin.bottom;

            const fullWidth = width + margin.left + margin.right;
            const fullHeight = height + margin.top + margin.bottom;

            const xScale = d3.
                scaleBand().
                padding(0.2).
                domain(data.map(d => d.oDate)).
                range([0, width]);

            const yScale = d3.
                scaleLinear().
                domain([0, vMax]).
                range([height, 0]);

            const svg = d3.
                select(".chart").
                append("svg").
                attr("width", fullWidth).
                attr("height", fullHeight).
                attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`).
                append("g").
                attr("transform", `translate(${margin.left}, ${margin.top})`);

            const fade = (selection, opacity) => {
                selection.style("fill-opacity", opacity);
            };

            svg.
                append("g").
                selectAll("rect").
                data(data).
                enter().
                append("rect").
                attr("x", d => xScale(d.oDate)).
                attr("y", d => yScale(d.SalAmount)).
                attr("width", d => xScale.bandwidth()).
                attr("height", d => height - yScale(d.SalAmount)).
                on("mouseover", (d, i, els) => {
                    d3.selectAll(els).
                        filter(":not(:hover)").
                        call(fade, 0.5);
                }).
                on("mouseout", (d, i, els) => {
                    d3.selectAll(els).call(fade, 1);
                });

            const yAxis = d3.axisLeft(yScale);
            svg.append("g").call(yAxis);

            const xAxis = d3.axisBottom(xScale);
            svg.
                append("g").
                attr("transform", `translate(0, ${height})`).
                call(xAxis).
                selectAll("text").
                style("text-anchor", "end").
                attr("transform", "rotate(-45)");

        }).catch(function (response) {
            debugger
        });

    }
    $scope.weekreport = function () {
        // d3.selectAll("svg > *").remove();
        $("svg").remove()

        
        if ($scope.FromDate == undefined || $scope.FromDate == null || $scope.FromDate == "") {
            $scope.msg = "Please Enter From Date";
            return false;
        }
        if ($scope.ToDate == undefined || $scope.ToDate == null || $scope.ToDate == "") {
            $scope.msg = "Please Enter From Date";
            return false;
        }
        $http({
            url: vUrl + "DashBoardAdmin/Weekwize",
            method: 'GET',
            params: { FDate: $scope.FromDate, TDate: $scope.ToDate },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.Weeksales = false;
            var vData = response.data;

            const data = vData;
            var vAmt = 0;
            for (var i = 0; i < response.data.length; i++) {

                vAmt = vAmt + response.data[i].SalAmount;
            }
            var vMax = Math.max.apply(Math, response.data.map(function (vData) { return vData.SalAmount; }));

            const margin = { top: 50, right: 0, bottom: 80, left: 50 };
            const width = 450 - margin.left - margin.right;
            const height = 330 - margin.top - margin.bottom;

            const fullWidth = width + margin.left + margin.right;
            const fullHeight = height + margin.top + margin.bottom;

            const xScale = d3.
                scaleBand().
                padding(0.2).
                domain(data.map(d => d.oDate)).
                range([0, width]);

            const yScale = d3.
                scaleLinear().
                domain([0, vMax]).
                range([height, 0]);

            const svg = d3.
                select(".chart").
                append("svg").
                attr("width", fullWidth).
                attr("height", fullHeight).
                attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`).
                append("g").
                attr("transform", `translate(${margin.left}, ${margin.top})`);

            const fade = (selection, opacity) => {
                selection.style("fill-opacity", opacity);
            };

            svg.
                append("g").
                selectAll("rect").
                data(data).
                enter().
                append("rect").
                attr("x", d => xScale(d.oDate)).
                attr("y", d => yScale(d.SalAmount)).
                attr("width", d => xScale.bandwidth()).
                attr("height", d => height - yScale(d.SalAmount)).
                on("mouseover", (d, i, els) => {
                    d3.selectAll(els).
                        filter(":not(:hover)").
                        call(fade, 0.5);
                }).
                on("mouseout", (d, i, els) => {
                    d3.selectAll(els).call(fade, 1);
                });

            const yAxis = d3.axisLeft(yScale);
            svg.append("g").call(yAxis);

            const xAxis = d3.axisBottom(xScale);
            svg.
                append("g").
                attr("transform", `translate(0, ${height})`).
                call(xAxis).
                selectAll("text").
                style("text-anchor", "end").
                attr("transform", "rotate(-45)");

        }).catch(function (response) {
            debugger
        });

    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');

    var vCouponApplicable = $.session.get('CouponApplicable');

    if (vCouponApplicable == "1") {
        $scope.showCoupon = true;
    }
    else
        $scope.showCoupon = false;

    var vDiscountApplicable = $.session.get('DiscountApplicable');

    if (vDiscountApplicable == "1") {
        $scope.showDiscount = true;
    }
    else
        $scope.showDiscount = false;

    $scope.LogoutClick = function () {
        $.session.set('AdminId', "");
        window.location.href = '#!home';
    }
    //End//////////////////////////////////

    var GetNewSales = function () {
        $http({
            url: vUrl + "DashBoardAdmin/GetNewSales",
            
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            //MemberName, OrderedDate,Amoount
            $scope.NewSales = response.data;

        }).catch(function (response) {
        });

    }
    var GetSiteSettingConfiguration = function () {

        $http({
            url: vUrl + "DashBoardAdmin/GetSiteSettingConfiguration",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            var vResult = response.data;
            var vCurrencyType = vResult["0"].CurrencyType;
            var vGridSizeClient = vResult["0"].GridSizeClient;

            //$.session.set('CurrencyType', vResult["0"].vCurrencyType);
            //$.session.set('GridSizeClient', vResult["0"].vGridSizeClient);

            $scope.CurrencyType = vCurrencyType;
        }).catch(function (response) {

        });

    }
    var GetProductDetails = function () {



        $http({
            url: vUrl + "DashBoardAdmin/GetProductDetails",
            method: 'GET',
            //params: { ProductId: ProdId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            $scope.OutOfProduct = response.data;

            //$scope.OutOfStock = { ProdTitle: vTitle, ProductId: vProductId, IsActive: vStatus };
            //$scope.ProdTitle = vTitle;
            //$scope.ProductId = vProductId;
            //$scope.IsActive = vIsActive;
            //if ($scope.StockCount.length != 0) {
            //    $scope.StockCount = "Out of Stock";
            //    $scope.Showstockout = true;
            //}
            if ($scope.OutOfProduct.StockCount != 0) {
                $scope.StockCount = "Out of Stock";
                $scope.Showstockout = true;
            }

        }).catch(function (response) {
        });

    }
    var getuser = function () {

        $http({
            url: vUrl + "ProductVariance/User",
            method: "Get",
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            $scope.UserDetails = response.data.length;
        }).catch(function (response) {
        });


    }
    var GetChartDetails = function () {

        $http({
            url: vUrl + "DashBoardAdmin/GetChartDetails",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            var vData = response.data;

            const data = vData;
            var vAmt = 0;
            for (var i = 0; i < response.data.length; i++) {

                vAmt = vAmt + response.data[i].SalAmount;
            }
            var vMax = Math.max.apply(Math, response.data.map(function (vData) { return vData.SalAmount; }));

            const margin = { top: 50, right: 0, bottom: 80, left: 50 };
            const width = 400 - margin.left - margin.right;
            const height = 330 - margin.top - margin.bottom;

            const fullWidth = width + margin.left + margin.right;
            const fullHeight = height + margin.top + margin.bottom;

            const xScale = d3.
                scaleBand().
                padding(0.2).
                domain(data.map(d => d.oDate)).
                range([0, width]);

            const yScale = d3.
                scaleLinear().
                domain([0, vMax]).
                range([height, 0]);

            const svg = d3.
                select(".chart").
                append("svg").
                attr("width", fullWidth).
                attr("height", fullHeight).
                attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`).
                append("g").
                attr("transform", `translate(${margin.left}, ${margin.top})`);

            const fade = (selection, opacity) => {
                selection.style("fill-opacity", opacity);
            };

            svg.
                append("g").
                selectAll("rect").
                data(data).
                enter().
                append("rect").
                attr("x", d => xScale(d.oDate)).
                attr("y", d => yScale(d.SalAmount)).
                attr("width", d => xScale.bandwidth()).
                attr("height", d => height - yScale(d.SalAmount)).
                on("mouseover", (d, i, els) => {
                    d3.selectAll(els).
                        filter(":not(:hover)").
                        call(fade, 0.5);
                }).
                on("mouseout", (d, i, els) => {
                    d3.selectAll(els).call(fade, 1);
                });

            const yAxis = d3.axisLeft(yScale);
            svg.append("g").call(yAxis);

            const xAxis = d3.axisBottom(xScale);
            svg.
                append("g").
                attr("transform", `translate(0, ${height})`).
                call(xAxis).
                selectAll("text").
                style("text-anchor", "end").
                attr("transform", "rotate(-45)");

        }).catch(function (response) {
            debugger
        });

    }
    var GetNewProducts = function () {

        $http({
            url: vUrl + "DashBoardAdmin/GetNewProducts",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response1) {
            
            //Title, Price, Picture, ProductId
            $scope.NewProducts = response1.data;

        }).catch(function (response) {
        });

    }
    var GetNewClients = function () {

        $http({
            url: vUrl + "DashBoardAdmin/GetNewClients",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response2) {

            //MemberName, ContactNo, EmailId
            $scope.NewClients = response2.data;

        }).catch(function (response) {

        });

    }
    var GetCounts = function () {

        $http({
            url: vUrl + "DashBoardAdmin/GetCounts",
            method: 'GET',
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response3) {
            
            //ProductCount, InActiveUser, ActiveUser
            var vCounts = response3.data;
            
            var vProductCount = response3.data["0"].ProductCount;
            var vActiveUser = response3.data["0"].ActiveUser;
            var vProductTotalCount = response3.data["0"].ProductTotalCount;
            var vTotalSalesCount = response3.data["0"].TotalSalesCount;
            var vTotalSalesAmount = response3.data["0"].TotalSalesAmount;

            $scope.NewProductCount = vProductCount;
            $scope.ActiveUsrCount = vActiveUser;
            $scope.ProductTotalCount = vProductTotalCount;
            $scope.TotalSalesCount = vTotalSalesCount;
            $scope.TotalSalesAmount = vTotalSalesAmount;

        }).catch(function (response) {
            
        });

    }   
    $scope.MenuClick = function (value) {

    }
    //Abinesh
    var UserCount = function () {

        $http({
            url: vUrl + "ProductVariance/UserCount",
            method: "Get",
            params: { UserId: vAdminId },
            headers: {
                "Content-Type": JSON
            }

        }).then(function (response) {
            var UserDetails = response.data.length;
            $scope.VarianceCount = UserDetails;
            $.session.set('VarianceCount', UserDetails);
        }).catch(function (response) {
        });


    }
    
});