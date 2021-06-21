'use strict';

ScBusinez.controller('AddDetailController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');

    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";  

    $window.scrollTo(0, 0);

    var vAdminId = $.session.get('AdminId');
    $scope.CompanyName = $.session.get('CompanyName');

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    

    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }
    if (vCompanyId == undefined || vCompanyId == null || vCompanyId == "") {
        window.location.href = '#!home';
    }

    var vLoginType = $.session.get('Type');
    if (vLoginType == "User") {
        $scope.MenuDashboard = false;
        $scope.MenuSalesOrders = false;
        $scope.MenuDelConfirm = false;
        $scope.MenuCategory = false;
        $scope.MenuSubCat = false;
        $scope.MenuAdd = false;
        $scope.MenuDiscount = false;
        $scope.MenuSettings = false;
        $scope.MenuSales = false;
        $scope.MenuAnalytics = false;
        $scope.AdminVariance = false;
    }
    else if (vLoginType == "Admin") {
        $scope.MenuDashboard = true;
        $scope.MenuSalesOrders = true;
        $scope.MenuDelConfirm = true;
        $scope.MenuCategory = true;
        $scope.MenuSubCat = true;
        $scope.MenuAdd = true;
        $scope.MenuDiscount = true;
        $scope.MenuSettings = true;
        $scope.MenuSales = true;
        $scope.MenuAnalytics = true;
        $scope.AdminVariance = true;
    }

    var vbackgroundColor = $.session.get('ButtonColorAdmin');
    $scope.myObj = {
        "background-color": vbackgroundColor
    }

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
    //For SubMenu/////////////////////////////
    var vMenuDiscountShow = document.getElementById("MenuDiscountShow");
    vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    vSettingsmenuShow.style.display = 'none';
    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    vSettingsmenuShow1.style.display = 'none';

    $scope.ShowHideSubMenu = function (menu, menuhide, menuhide1, menuhide2) {
        
        var x = document.getElementById(menu);
        var xHide = document.getElementById(menuhide);
        var xHide1 = document.getElementById(menuhide1);
        var xHide2 = document.getElementById(menuhide2);

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }

        if (xHide.style.display == "block") {
            xHide.style.display = "none";
        }
        if (xHide1.style.display == "block") {
            xHide1.style.display = "none";
        }
        if (xHide2.style.display == "block") {
            xHide2.style.display = "none";
        }
    }
    //'menuDisShow1'
    var vmenuShow1 = document.getElementById("menuShow1");
    vmenuShow1.style.display = 'none';

    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
    vMenuSalMobile.style.display = 'none';

    var vmenuDisShow1 = document.getElementById("menuDisShow1");
    vmenuDisShow1.style.display = 'none';

    $scope.ShowHideSubMenu1 = function (menu, menu2, menuhide, menuhide1) {
        //
        var x = document.getElementById(menu);
        var x12 = document.getElementById(menu2);
        var xhide12 = document.getElementById(menuhide);
        var xhide13 = document.getElementById(menuhide1);
        x12.style.display = "none";
        xhide12.style.display = "none";
        xhide13.style.display = "none";

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }

    $scope.LogoutClick = function () {
        $.session.set('AdminId', "");
        window.location.href = '#!home';
    }
    //End//////////////////////////////////
    //End//////////////////////////////////

    
    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.Inactive = true;
    $scope.Active = false;
    $scope.addname = true;
    $scope.addlink = true;

    var ee = document.getElementById("showLeftPush1");
    ee.style.display = 'none';

    //-------------  Mobile Toggle Switch   -----------//

    $scope.toggle_visibility = function (id, id1) {
        // 
        var e = document.getElementById(id);
        var e1 = document.getElementById(id1);

        e.style.display = 'none';
        e1.style.display = 'block';

    }
    $scope.myFunction = function () {
        //

        var x = document.getElementById("myLinks");

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }
      //-------------  Mobile Toggle Switch Ends  -----------//

 

    //--------------Bind Grid---------------//
    

    $scope.BindGrid = function (Active) {


        
        $http(
            {
                url: vUrl+"AddDetail/GetAddDetails",
                method: 'GET',
                params: { iActive: Active, CompanyDetailId: vCompanyId },
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                $scope.allItems = response.data;
                $scope.sort('name');
              //  $.session.set('vCompanyId', result["0"].CompanyId);


             
            }).catch(function (response) {
               
            });
    }

    $scope.BindGrid(1);

    //-------------    Insert Funtion   ---------------//
 

    var InsertAddDetails = function (adds, filepath) {
        
        if ($scope.AddDetail.IsActive == true) {
            $scope.AddDetail.IsActive = 1;
        }
        else
            $scope.AddDetail.IsActive = 0;

        //
        $http({
            url: vUrl+"AddDetail/InsertAddDetails",
            dataType: 'json',
            method: 'POST',
            data: adds,
            params: { filpath: filepath, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            
            $scope.msgStatus = AddDetailMessages(1);//'Advertisement Details Added Successfully'
            
            $scope.showSuccessMsg = true;
            $scope.BindGrid(1);
            $scope.AddDetail.AddName = "";
            $scope.AddDetail.Link = "";
            $scope.AddDetail.Picture = "";
            $scope.AddDetail.PictureURL = "";
            $scope.theFile = "";
          
            $scope.fromdata = "";
            $scope.resultOPImage = "";
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.addname = true;
            $scope.addlink = true;
        });
    };

    $scope.onTextBoxKeyPress = function (event) {
       
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    //------------------   Save Function  -----------------//

   // var vCompanyId = $.session.get('CompanyId');

    $scope.Save = function () {
        
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.AddDetail.AddName == undefined || $scope.AddDetail.AddName == null || $scope.AddDetail.AddName == "" || $scope.AddDetail.AddName == "'\'") {
            $scope.msg = AddDetailMessages(2);//'Please Enter the AddName'
            return false;
        }
        if ($scope.AddDetail.Link == undefined || $scope.AddDetail.Link == null || $scope.AddDetail.Link == "") {
            $scope.msg = AddDetailMessages(3)//'Please Enter the Link'
            return false;
        }
        if ($scope.theFile == undefined || $scope.theFile == "" || $scope.theFile  == null) {
            $scope.msg = AddDetailMessages(4);//'Please Upload the Image File'
            return false;
        }

        //-------------   Save Function Ends    -------------//

      

        //--------------  URL validation  -----------------//
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
       // 
        if (!re.test($scope.AddDetail.Link)) {
            //alert("url error");
            $scope.msg = AddDetailMessages(5);//'Please Enter the valid Link'
            return false;
        }
        //--------------    URL validation Ends   ---------------//
       
        //----------------   File Upload     -----------------//

        var fromdata = new FormData();
        fromdata.append("uploadedFile", $scope.theFile);
        var fileName = document.getElementById("FileUpload1").value,
            idxDot = fileName.lastIndexOf(".") + 1,
            extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO
        } else {
            $scope.msg = AddDetailMessages(6);//'You must select an image file only'
            return false;
        }
       
        var request = {
            method: 'POST',
            params: { CompanyDetailId: vCompanyId },
            url: vUrl+"Fileupload/AddDetail",
            data: fromdata,
            headers: {
                'Content-Type': undefined
            }
        };

        $http(request).then(function mySuccess(response) {
            
            var filepath = response.data;
            var Data = $scope.AddDetail;
            var vData = JSON.stringify(Data);
            InsertAddDetails(Data, filepath);
            //$scope.BindGrid(1);
        }).then(function myError(response) {
        });
    }

    //-------------     File Upload Ends   ----------//

    //----------   Picture Validation     -------------//
    $scope.setFile = function (element) {
       // 
        $scope.$apply(function ($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.jpeg' || strsubstring == '.jpg' || strsubstring == '.png' || strsubstring == '.gif') {
               // 
            }
            else {
              //  
                $scope.msg = AddDetailMessages(7);//'Please Choose the valid Image File'

                return false;
            }
           
        });
    };
    
    //-----------------    Picture Validation Ends    -----------------------//


    //------------------    Edit Function   ------------------//

  

    $scope.Edit = function (addId) {
       // 
        $scope.ShowSave = false;
        $scope.Show = true;
        $scope.ShowUpdate = true;
        $scope.addname = false;
        $scope.addlink = false;
        $scope.msgStatus = '';
        $scope.msg = '';
       
        $http({
            method: "GET",
            url: vUrl+"AddDetail/GetAddDetailsById",
            params: { AddId: addId, CompanyDetailId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            var result = response.data;
           // 
            var New = response.data;
            var vAddName = result["0"].AddName;
            var vLink = result["0"].Link;
            var vPictureURL = result["0"].PictureURL;
            //var vFiletexts = result["0"].Filetexts;
            var vIsActive = result["0"].IsActive;
            var vCompanyDetailId = result["0"].CompanyDetailId;
            var vstatus = false;
            if (vIsActive == "1")
                vstatus = true;
           // 
            $scope.AddDetail = { AddName: vAddName, Link: vLink, Picture: vPictureURL, IsActive: vstatus, CompanyDetailId: vCompanyDetailId };
            $scope.hiddenAddId = addId;
            if (vPictureURL != undefined && vPictureURL != null && vPictureURL != "")
                $scope.resultOPImage = response.data;
            else
                $scope.resultOPImage = "";

        }).catch(function (response) {
            //debugger
        });
    }
    //---------------------   Edit Funtion Ends    ----------------//

    //----------------------    Update Function   --------------------//
 

    var UpdateAddDetails = function (adds, vaddId, filepath) {
       // 
        if ($scope.AddDetail.IsActive == true) {
            $scope.AddDetail.IsActive = 1;
        }

        else
            $scope.AddDetail.IsActive = 0;
      
        $http({
            url: vUrl+"AddDetail/UpdateAddDetails",
            dataType: 'json',
            method: 'POST',
            data: adds,
            params: { AddId: vaddId, filepath: filepath, CompanyDetailId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
           // 
           // $scope.BindGrid();
            $scope.msgStatus = AddDetailMessages(8);// 'Advertisement Details Updated Successfully'
            $scope.BindGrid(1);
          //  $scope.showSuccessMsg = true;
            $scope.AddDetail.AddName = "";
            $scope.AddDetail.Link = "";
            $scope.AddDetail.Picture = "";
            $scope.AddDetail.PictureURL = "";
           // $scope.AddDetail.Picture = "";
            $scope.resultOPImage = "";
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.Show = false;
            $scope.addname = true;
            $scope.addlink = true;
        });
    };

   

    $scope.Update = function () {
        
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Show = true;
        if ($scope.AddDetail.AddName == undefined || $scope.AddDetail.AddName == null || $scope.AddDetail.AddName == "") {
            $scope.msg = AddDetailMessages(2);//'Please Enter the AddName'
            //$scope.msgStatus = true;
            return false;
        }
        if ($scope.AddDetail.Link == undefined || $scope.AddDetail.Link == null || $scope.AddDetail.Link == "") {
            $scope.msg = AddDetailMessages(3);//'Please Enter the Link'
            //$scope.msgStatus = true;
            return false;
        }
        
        var vaddId = $scope.hiddenAddId;

        var adds = $scope.AddDetail;
        var vadds = JSON.stringify(adds)
        var fromdata = new FormData();
        if ($scope.theFile != undefined && $scope.theFile != "") {

            var fileName = document.getElementById("FileUpload1").value,
                idxDot = fileName.lastIndexOf(".") + 1,
                extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                
            } else {
                $scope.msg = AddDetailMessages(6);//'You must select an image file only'
                return false;
            }
            fromdata.append("uploadedFile", $scope.theFile);
            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/AddDetail",
                params: { CompanyDetailId: vCompanyId },
                data: fromdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function (response) {
              //  
                var filepath = response.data;
                UpdateAddDetails(adds, vaddId, filepath);
            }).then(function (response) {
            });
        }
        else {
            var vFilepath = "";
            UpdateAddDetails(adds, vaddId, vFilepath)
        }
    }

    //-------------------  Update Function Ends   --------------//

    //-----------------   Clear Function    -------------//

    $scope.Clear = function () {
       // 
        $scope.msgStatus = '';
        $scope.msg = '';
        $scope.Show = false;
        $scope.AddDetail.AddName = "";
        $scope.AddDetail.Link = "";
        $scope.AddDetail.Picture = "";
        $scope.AddDetail.PictureURL = "";
        $scope.theFile = "";
        $scope.resultOPImage = "";
        $scope.AddDetail.IsActive = "";
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.addname = true;
        $scope.addlink = true;
        $scope.Search = "";
        //$scope.setFile = "";
        $scope.fromdata = "";
        
        //$scope.AddDetail.Status = true;
    }

    //--------------------   Clear Funtion Ends   ---------------------//


    //-----------------------   Pagination Start   -----------------------------//
    var vPageCount = $.session.get('GridSizeAdmin');
    $scope.pageSize = vPageCount;
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


    //---------------------   export funtion   ---------------------//

    $scope.exportData = function () {
       // 
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Advertisement>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");
       

        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
     
        a.href = url;

        //var today = new Date();
        //var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        a.download = 'Advertisement.xls';
        a.click();
    };

    //---------------------    export funtion    ---------------------//



    //---------------------------   Search Function    --------------//
   

    $scope.Search = function () {
        //
        var vdata = $scope.AddDetail.Search;

        if (vdata != undefined && vdata != null && vdata != '') {
            GetSearch(vdata);
        }
        else {
            $scope.BindGrid(1);
        }
    }

    var GetSearch = function (vSearch) {
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;
       // 
        $http({
            //url: vUrl + "AddDetail/GetSearch",
            url: vUrl+"AddDetail/GetSearch",
            method: "GET",
            params: { Search: vSearch, Status: vStatus, CompanyDetailId: vCompanyId},
            headers: {
                'Content-Type': JSON
            }

        }).then(function mySuccess(response) {
           // 
            $scope.allItems = response.data;

          
            $scope.sort('name');
        }).catch(function myError(response) {
           // 
        });
    };

     //-----------------------  Search Function --------------//

  
    //-------------   Active & InActive Function   --------//
    $scope.InActiveclick = function () {
        $scope.BindGrid(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
        $scope.BindGrid(1);
        $scope.Inactive = true;
        $scope.Active = false;
    }
    //-------------------------------------//

    //-------------  sorting filter -------//

    $scope.column = 'name';

    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function (col) {
        $scope.column = col;
        if ($scope.reverse) {
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up1';
        } else {
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down1';
        }
    };

    // remove and change class
    $scope.sortClass = function (col) {
        if ($scope.column == col) {
            if ($scope.reverse) {
                return 'arrow-down1';
            } else {
                return 'arrow-up1';
            }
        } else {
            return '';
        }
    }
   
});
