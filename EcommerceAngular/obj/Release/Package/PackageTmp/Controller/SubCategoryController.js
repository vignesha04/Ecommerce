'use strict';

ScBusinez.controller('SubCategoryController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    var vUrl = $scope.SubDomain;
    //var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    $scope.CompanyName = $.session.get('CompanyName');
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    var vCompanyId = $.session.get('CompanyId');

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
   // vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
   // vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
   // vSettingsmenuShow.style.display = 'none';
    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow2");
    //vSettingsmenuShow1.style.display = 'none';

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
   // vmenuShow1.style.display = 'none';

    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
   // vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
   // vMenuSalMobile.style.display = 'none';

    var vmenuDisShow1 = document.getElementById("menuDisShow1");
    //vmenuDisShow1.style.display = 'none';

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

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.sub = true;
    $scope.Inactive = true;
    $scope.Active = false;

    $scope.msg = "";
    $scope.msgStatus = "";
    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';
    //-------------Bindgrid-------------------//
    var vCompanyId = $.session.get('CompanyId');

    $scope.bindgrid = function (Active) {

        $http({
            url: vUrl + "SubCategory/GetSubCategorydetails",

            method: 'GET',
            params: { iActive: Active, CompanyId: vCompanyId },
            headers: {
                "Content-Type": JSON
            }
        }).then(function (response) {
            
            //$scope.subCategory = response.data;
            $scope.allItems = response.data;
            $scope.sort('name');

        }).catch(function (response) {
        });


    }
    $scope.bindgrid(1);
    //$scope.sorted = (event, ui) => { console.log(ui.item[0].getAttribute('id')) }

    //$scope.list = allItems[];

    var funPlaceholderReset = function () {
        var element = document.getElementById("lblSubCategoryName");
        element.className = '';
        element.innerHTML = "SubCategoryName";
    }

    $http({
        url: vUrl + "SubCategory/GetCategorydetails",

        method: 'GET',
        params: { CompanyId: vCompanyId },
        headers: {
            "Content-Type": JSON
        }
    }).then(function (response) {
        $scope.categorydetails = response.data;


    }).catch(function (response) {
    });



    $scope.toggle_visibility = function (id, id1) {

        var e = document.getElementById(id);
        var e1 = document.getElementById(id1);

        e.style.display = 'none';
        e1.style.display = 'block';

    }

    $scope.myFunction = function () {

        var x = document.getElementById("myLinks");

        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }

    $scope.onTextBoxKeyPress = function (event) {
        
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }
    var vCompanyId = $.session.get('CompanyId');

    $scope.Save = function () {
        $("#subsave").attr("disabled", true);
        $scope.msg = "";
        $scope.msgStatus = "";
        if ($scope.subCategory.CategoryId == "" || $scope.subCategory.CategoryId == undefined || $scope.subCategory.CategoryId == null) {
            $scope.msg = SubCategoryMessages(1);  //'Please Select the Category';
            $("#subsave").attr("disabled", false);
            return false;
        }
        if ($scope.subCategory.SubCategoryName == "" || $scope.subCategory.SubCategoryName == undefined || $scope.subCategory.SubCategoryName == null) {
            $scope.msg = SubCategoryMessages(2); //'Please Enter the Subcategoryname';
            $("#subsave").attr("disabled", false);
            return false;
        }
        var subCategory = $scope.subCategory;

        if ($scope.theFile == undefined || $scope.theFile == null || $scope.theFile == "") {
            $scope.msg = "Please select the Sub Category Image";
            $scope.IsDisabled = false;
            $("#subsave").attr("disabled", false);
            return false;
        }
        $http({
            url: vUrl + "SubCategory/InsertSubCategory",
            dataType: 'json',
            method: 'POST',
            data: subCategory,
            params: { CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);
            var request = {
                method: 'POST',
                url: vUrl + "FileUpload/subCategoryImage",
                data: fromdata,
                params: { CompanyId: vCompanyId, categoryid: $scope.subCategory.CategoryId, subname: $scope.subCategory.SubCategoryName, vFileUploadURl: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function mySuccess(response) {
                var Picture = response.data;
                $("input[type='file']").val('');
                
                $scope.subCategory.IsActive = 1;

                $scope.bindgrid(1);
            }).catch(function myError(response) {
                
            });

            var vExist = response.data;
            if (vExist == "Exist") {
                $("#subsave").attr("disabled", false);
                $scope.msg = SubCategoryMessages(3); //"Subcategory is already exist";
            }
            else {
                


                $scope.msgStatus = SubCategoryMessages(4); //"Added Subcategory Successfully";
                $scope.sub = true;

                $("#subsave").attr("disabled", false);
                $scope.subCategory.CategoryId = "";

                $scope.subCategory.SubCategoryName = "";
                $scope.subCategory.IsActive = true;
                funPlaceholderReset();

            }
        }).catch(function (response) {
        });

        
       
    }
    var vCompanyId = $.session.get('CompanyId');

    $scope.UpdateSubcate = function (subCategory, vsubcatid) {
        
        //var vsubcatid = $scope.subCategory.HiddenSubCategoryId;
        //var subCategory = $scope.subCategory;
        if ($scope.theFile != undefined && $scope.theFile != "") {
            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);

            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UpdateSubCategoryImage",
                data: fromdata,
                params: { ProductId: vsubcatid, CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL  },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function (response) {
                
                var Picture = response.data;
                $("input[type='file']").val('');
                $scope.ProductDetail.Filetexts = "";
            }).then(function (response) {
            });
        }

        $http({
            url: vUrl + "SubCategory/UpdateSubCategory",
            dataType: 'json',
            method: 'POST',
            data: subCategory,
            params: { SubCategoryId: vsubcatid, CompanyId: vCompanyId },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            
            $scope.bindgrid(1);
            $("#subupdate").attr("disabled", false);
            $scope.msgStatus = SubCategoryMessages(5); //"Updated Subcategory Successfully";
            $scope.sub = true;
            $scope.Show = false;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            $scope.subCategory.CategoryId = "";
            $scope.subCategory.SubCategoryName = "";
            funPlaceholderReset();

        });
    }
    var vCompanyId = $.session.get('CompanyId');

    $scope.Update = function () {
        
        $("#subupdate").attr("disabled", true);
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msg = "";
        $scope.msgStatus = "";

        if ($scope.subCategory.CategoryId == "" || $scope.subCategory.CategoryId == undefined) {
            $scope.msg = SubCategoryMessages(1); //'Please Select the Category';
            $("#subupdate").attr("disabled", false);
            return false;
        }
        if ($scope.subCategory.SubCategoryName == "" || $scope.subCategory.SubCategoryName == undefined || $scope.subCategory.SubCategoryName == null) {
            $scope.msg = SubCategoryMessages(2); //'Please Enter the Subcategoryname';
            $("#subupdate").attr("disabled", false);
            return false;
        }
        if ($scope.subCategory.IsActive == true) {
            $scope.subCategory.IsActive = 1;
        }
        else
            $scope.subCategory.IsActive = 0;

        var vsubcatid = $scope.subCategory.HiddenSubCategoryId;
        var subCategory = $scope.subCategory;

        if ($scope.subCategory.IsActive == false) {
            
            $http({
                url: vUrl + "SubCategory/ProductValid",
                method: 'GET',
                params: { SubCategoryId: vsubcatid, CompanyId: vCompanyId },
                data: subCategory,
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                $scope.subCategory = response.data;
                if (response.data.length > 0) {
                    $scope.msgStatus = SubCategoryMessages(6); //"This Subcategory is already used in the product";
                    $("#subupdate").attr("disabled", false);
                }
                else {
                    $scope.UpdateSubcate(subCategory, vsubcatid);

                }


            }).catch(function (response) {
            })
        }
        else {
            $scope.UpdateSubcate(subCategory, vsubcatid);
        }

    }
    //---------------Export-------------------//
    $scope.exportData = function () {
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:SubCategory>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        var table = document.getElementById("example1");


        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;


        a.download = 'SubCategory.xls';
        a.click();
    };
    //-----------Search--------------//
    $scope.Search = function () {
        
        var vdata = $scope.subCategory.Search;
        if (vdata != undefined && vdata != null && vdata != '') {
            getsubcatbysearch(vdata);
        }
        else {
            $scope.bindgrid(1);
        }

    }
    var getsubcatbysearch = function (vsearch) {
        
        var vStatus = 0;
        if ($scope.Inactive == true)
            vStatus = 1;

        
        $http({
            url: vUrl + "SubCategory/GetSearch",
            method: "GET",
            params: { Search: vsearch, Status: vStatus, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function mysuccess(response) {
            

            $scope.allItems = response.data;
            $scope.sort('name ');
        }).then(function myError(response) {
        });
    };

    //----------------Active & InActive function-------------//
    $scope.InActiveclick = function () {
        $scope.bindgrid(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
        $scope.bindgrid(1);
        $scope.Inactive = true;
        $scope.Active = false;
    }

    //----------------Pagination Starting--------------//
    var vPageCount = $.session.get('GridSizeAdmin');
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

    //----------------Pagination Ending--------------//
    
    //---To Edit and Delete function--//
    var vCompanyId = $.session.get('CompanyId');

    $scope.edit = function (SubCategoryId) {

        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.sub = false;
        $scope.msg = "";
        $scope.msgStatus = "";
        method: 'GET',
            $http({
            url: vUrl + "SubCategory/GetSubCategoriesAdminbyId",
            params: { SubCategoryId: SubCategoryId, CompanyId: vCompanyId },
                Headers: {
                    'Content-Type': JSON
                }
            }).then(function mysuccess(response) {
                
                var result = response.data;
                var vSubCategoryId = result["0"].SubCategoryId;
                var vSubCategoryName = result["0"].SubCategoryName;
                var vCategoryId = result["0"].CategoryId;
                var vCategoyName = result["0"].CategoyName;
                var vCompanyDetailId = result["0"].CompanyDetailId;
                var vIsActive = result["0"].IsActive;
                var ImageURL = result["0"].ImageURL;
                var vStatus = false;

                if (vIsActive == "1")
                    vStatus = true;

                $scope.subCategory = { CategoryId: vCategoryId, CategoyName: vCategoyName, SubCategoryId: vSubCategoryId, SubCategoryName: vSubCategoryName, HiddenSubCategoryId: vSubCategoryId, IsActive: vStatus, CompanyDetailId: vCompanyDetailId, ImageURL: ImageURL };
                $window.scrollTo(0, 0);
            }).catch(function (response) {
                
            });
    }
    //-------------clear--------------------//
    $scope.Clear = function () {
        $scope.bindgrid();
        $scope.subCategory.SubCategoryId = "";
        $scope.subCategory.SubCategoryName = "";
        $scope.subCategory.HiddenSubCategoryId = "";
        $scope.subCategory.CategoryId = "";
        $scope.subCategory.Filetexts = "";
        $("input[type='file']").val('');
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $scope.Show = false;
        $scope.sub = true;
        $scope.msg = "";
        $scope.msgStatus = "";
        funPlaceholderReset();
        $("#ProductFile").val('');
    }
    //------------Sorting---------------//
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

    $scope.setFile = function (element) {
        
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
                $scope.msg = 'Please Choose the valid Image File'

                return false;
            }

        });
    };


    $scope.Scrolltable1 = function () {
        
        document.getElementById("scrolltable11").focus();
    }
    var vmenuplus11 = document.getElementById("showplus11");
    vmenuplus11.style.display = 'block';
    var vmenuminus11 = document.getElementById("showminus11");
    vmenuminus11.style.display = 'none';
    var acc = document.getElementsByClassName("accordion11");
    var i;
    
    // $scope.length = "450px";
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            
            var panel4 = this.nextElementSibling;
            $scope.empbtnClick = true;
            if (panel4.style.maxHeight) {
                panel4.style.maxHeight = null;

                document.getElementById("showplus11").style.display = "block";
                document.getElementById("showminus11").style.display = "none";


                if ($scope.allItems != undefined && $scope.allItems != null) {
                    //$scope.allItems = null;
                    $scope.resetAll();
                    $scope.pagination();
                }

            }
            else {
                
                if ($scope.length == null || $scope.length == undefined)
                    //$scope.length="850px";
                    $scope.length = "250px";


                document.getElementById("showplus11").style.display = "none";
                document.getElementById("showminus11").style.display = "block";

                //$scope.divlength = $scope.length;
                panel4.style.maxHeight = $scope.length;


                if ($scope.allItems != undefined && $scope.allItems != null) {
                    //$scope.allItems = null;
                    $scope.resetAll();
                    $scope.pagination();
                }
            }
        });
    }

    //Template Download
    $scope.Import = function () {
        
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Advertisement>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        var table = document.getElementById("exampleimport");
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        a.href = url;

        a.download = 'ImportSubCategory.xls';//downloading template name
        a.click();
    };

    $scope.selectedFile = null;

    $scope.loadFile = function (files) {
        
        $scope.$apply(function () {
            
            $scope.selectedFile = files[0];

        })

    }

    //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
    //file validation 
    $scope.handleFile = function () {
        
        var file = $scope.selectedFile;
        $scope.Showmsg = false;
        $scope.ShowSuccess = false;
        $scope.msg = '';

        if (file == undefined || file == null || file == "") {
            $scope.msg = "Please Select Any One Excel File";
            $scope.Showmsg = true;
            $scope.ShowSuccess = false;
            return false;
        }
        else {
            var allowedFiles = [".xls", ".xlsx"];
            var fileUpload = document.getElementById("ProductFile");
            var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
            if (!regex.test(fileUpload.value.toLowerCase())) {
                $scope.msg = "Please upload files having extensions: [" + allowedFiles.join(', ') + "] only [OR] Not allowed Selected file name this type symbols () ";
                $scope.Showmsg = true;
                $scope.ShowSuccess = false;
                return false;
            }
        }

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                

                //reading the file
                var data = e.target.result;

                var workbook = XLSX.read(data, { type: 'binary' });

                var first_sheet_name = workbook.SheetNames[0];

                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                //console.log(excelData);  

                if (dataObjects.length > 0) {


                    $scope.save(dataObjects);
                }
                else {
                    $scope.msg = "Error : Something Wrong !";
                }
            }

            reader.onerror = function (ex) {

            }

            reader.readAsBinaryString(file);
        }
    }

    //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
    //importing process and inserting to db
    var InsertImportSubCategory = function (vCompanyId, vvdata) {
        
        $http({
            method: "POST",
            url: vUrl + "SubCategory/InsertImportSubCategory",
            params: {
                companyid: vCompanyId,

            },
            data: JSON.stringify(vvdata),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (data) {
            

            if (data.data.includes("Success")) {
                $scope.msg = "";
                $scope.msgStatus = "Data has been Imported ! ";              

                $("#ProductFile").val('');
                $scope.bindgrid(1);
                return false;
            }

        }, function (error) {
            $scope.msg = "Error : Something Wrong";
        })

    }

    //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
    //importing data validation process
    $scope.save = function (data) {
        
        var vvvdata = data;
        
        $http({
            method: "POST",
            url: vUrl + "SubCategory/ImportSubCategoryvalidation",
            params: { companyid: vCompanyId },
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (data) {
            
            if (data.data.includes("Success")) {
                InsertImportSubCategory(vCompanyId, vvvdata);
            }
            else if (data.data.includes("duplicate")) {
                var splitdataval = data.data.split('|');

                var r = confirm("Already This Category is  Available");

                if (r == true) {
                    InsertImportSubCategory(vCompanyId, vvvdata);
                }
                else {
                    return false;
                }
            }
            else if (data.data.includes("Error")) {
                $scope.msg = "Transaction Failed Please try again";
                $scope.Showmsg = true;
                $scope.ShowSuccess = false;
                return false;
            }
            else {
                $scope.msg = data.data;
                $scope.Showmsg = true;
                $scope.ShowSuccess = false;
                return false;
            }

        }, function (error) {
            $scope.msg = "Error : Something Wrong";
        })
    }
   
});




