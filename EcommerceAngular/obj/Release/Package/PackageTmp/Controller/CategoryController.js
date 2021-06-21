'use strict';

ScBusinez.controller('CategoryController', function ($scope, $http, $window) {
    $scope.SubDomain = $.session.get('SubDomain');
    $scope.FileUploadURL = $.session.get('FileUploadURL');
    //var vUrl = $scope.SubDomain;
    $scope.Domain = $.session.get('Domain');
    var vUrl = "http://localhost:56397/api/";

    $window.scrollTo(0, 0);
    
    var vAdminId = $.session.get('AdminId');
    if (vAdminId == undefined || vAdminId == null || vAdminId == "") {
        window.location.href = '#!home';
    }

    var vCompanyId = $.session.get('CompanyId');
    $scope.WebsiteLogo = $.session.get('WebsiteLogo');
    $scope.CompanyName = $.session.get('CompanyName');

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
    //vMenuDiscountShow.style.display = 'none';
    var vmenuShow = document.getElementById("menuShow");
    //vmenuShow.style.display = 'none';
    var vSettingsmenuShow = document.getElementById("SettingsmenuShow");
    //vSettingsmenuShow.style.display = 'none';
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
    //vmenuShow1.style.display = 'none';

    var vSettingsmenuShow1 = document.getElementById("SettingsmenuShow1");
    //vSettingsmenuShow1.style.display = 'none';

    var vMenuSalMobile = document.getElementById("MenuSalMobile");
    //vMenuSalMobile.style.display = 'none';

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
    //End//////////////////////////////////


    var showLeftPush = document.getElementById('showLeftPush');
    var menus1 = document.getElementById('cbp-spmenu-s1');
    $scope.spmenus1 = true;
    $scope.LeftMenuClick = function () {
        //
        //classie.toggle(this, 'active');
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        //disableOther('showLeftPush');

        //classie.toggle(showLeftPush, 'disabled');
        $scope.spmenus1 = false;
    }

    $scope.ShowSave = true;
    $scope.ShowUpdate = false;
    $scope.Show = false;
    $scope.Categ = true;
    $scope.Inactive = true;
    $scope.Active = false;

    var ee = document.getElementById("showLeftPush1");
    //ee.style.display = 'none';

    var vCompanyId = $.session.get('CompanyId');

    $scope.BindGrid = function (Active) {
        $http(
            {
                url: vUrl+"Category/GetCategories",
                method: 'GET',
                params: { iActive: Active, CompanyId:vCompanyId},
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                 
                $scope.allItems = response.data;
                $scope.sort('name');
               
            }).catch(function (response) {
                //
            });
    }
    $scope.BindGrid(1);

    var funPlaceholderReset = function () {
        var element = document.getElementById("lblCategoyName");
        element.className = '';
        element.innerHTML = "CategoyName";
    }

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

    $scope.onTextBoxKeyPress = function (event) {
        
       
        if (event.keyCode == 39 || event.keyCode == 34) {
            event.preventDefault();
            $scope.msg = "Single quote and Double Quote are not allowed";
            return false;
        }
    }

    var vCompanyId = $.session.get('CompanyId');
  
    $scope.Save = function () {
        
        $("#Cateorysave").attr("disabled", true);
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Category.CategoyName == "" || $scope.Category.CategoyName == undefined || $scope.Category.CategoyName == null) {
            $scope.msg = CategoryMessages(1);
            $("#Cateorysave").attr("disabled", false);
            return false;
        }
        var cats = $scope.Category;
        
        if ($scope.Category.IsActive == true) {
            $scope.Category.IsActive = 1;
        }
        else
            $scope.Category.IsActive = 0;

        if ($scope.theFile == undefined || $scope.theFile == null || $scope.theFile == "") {
            $scope.msg = "Please select the Category Image";
            $("#Cateorysave").attr("disabled", false);
            $scope.IsDisabled = false;
            return false;
        }
        $http({
            url: vUrl + "Demoproduct/Insertdemolist",
            method: 'POST',
            params: { CompanyId: vCompanyId, CategoyName: $scope.Category.CategoyName, Active: $scope.Category.IsActive },
            headers: {
                'Content-Type': "application/json"
            }
        }).then(function (response) {

            

            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);
            var request = {
                method: 'POST',
                url: vUrl + "FileUpload/CategoryImage",
                data: fromdata,
                params: { CompanyId: vCompanyId, CategoyName: $scope.Category.CategoyName, vFileUploadURl: $scope.FileUploadURL },
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function mySuccess(response) {
                
                var Picture = response.data;
                $("input[type='file']").val('');

            }).catch(function myError(response) {
                
            });
            var vExist = response.data;
            if (vExist == "Already Exist") {
                $("#Cateorysave").attr("disabled", false);
                $scope.msg = CategoryMessages(2);
            }
            else {
                $scope.BindGrid(1);
                $scope.msgStatus = CategoryMessages(3);
                $("#Cateorysave").attr("disabled", false);
                $scope.Category.CategoyName = "";
                $scope.ShowSave = true;
                $scope.ShowUpdate = false;
                $scope.Categ = true;
                funPlaceholderReset();
                //$scope.Category.IsActive = true;
            }
        }).catch(function (response) {
            
        });

       
    }

    var vCompanyId = $.session.get('CompanyId');

    $scope.Edit = function (categoryId) {
        
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.Categ = false;
        $scope.msgStatus = '';
        $scope.msg = '';
        var vCompanyId = $.session.get('CompanyId');

        $http({
            method: "GET",
            url: vUrl + "Category/GetCategoriesById",
            params: { CategoryId: categoryId, CompanyId: vCompanyId },
            headers: {
                'Content-Type': JSON
            }
        }).then(function (response) {
            var result = response.data;

            

            //var New = response.data;
            var vCategoryName = result["0"].CategoyName;
            var vCompanyDetailId = result["0"].CompanyDetailId;
            var IsActive = result["0"].IsActive;
            var ImageUrl = result["0"].ImageURL;
            var vstatus = false;
            if (IsActive == "1")
                vstatus = true;

            //

            $scope.Category = { CategoyName: vCategoryName, IsActive: vstatus, CompanyDetailId: vCompanyDetailId, ImageUrl: ImageUrl};
            $scope.hiddenCategoryId = categoryId;
            $window.scrollTo(0, 0);
           
        }).catch(function (response) {
            //debugger
        });
    }

    var vCompanyId = $.session.get('CompanyId');

    $scope.Update = function () {
        
        $("#Cateoryupdate").attr("disabled", true);
        $scope.ShowSave = false;
        $scope.ShowUpdate = true;
        $scope.Show = true;
        $scope.msgStatus = '';
        $scope.msg = '';

        if ($scope.Category.CategoyName == undefined || $scope.Category.CategoyName == null || $scope.Category.CategoyName == "") {
            $scope.msg = CategoryMessages(1);
            $("#Cateoryupdate").attr("disabled", false);
            return false;
        }

        var vcategoryId = $scope.hiddenCategoryId;

        var cats = $scope.Category;


        if ($scope.Category.IsActive == false) {
            //
            $http({
                url: vUrl + "Category/SubcategoryValid",
                method: 'GET',
                params: { CatId: vcategoryId, CompanyId: vCompanyId },
                data: cats,
                headers: {
                    "Content-Type": JSON
                }
            }).then(function (response) {
                
                $scope.cats = response.data;
                if (response.data.length > 0) {
                    $("#Cateoryupdate").attr("disabled", false);
                    $scope.msg = CategoryMessages(5);
                    return false;//"This Category is already used in the Subcategory";
                }
                else {
                    $scope.UpdateCat(cats, vcategoryId, vCompanyId);
                }
            }).catch(function (response) {
            })
        }
        else {
            $scope.UpdateCat(cats, vcategoryId, vCompanyId);
        }

    }

    $scope.UpdateCat = function (cats, vcategoryId, vCompanyId) {


        if ($scope.theFile != undefined && $scope.theFile != "") {
            var fromdata = new FormData();
            fromdata.append("uploadedFile", $scope.theFile);

            var request = {
                method: 'POST',
                url: vUrl + "Fileupload/UpdateCategoryImage",
                data: fromdata,
                params: { ProductId: vcategoryId, CompanyId: vCompanyId, vFileUploadURl: $scope.FileUploadURL  },
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
            url: vUrl + "Category/UpdateCategories",
            dataType: 'json',
            method: 'POST',
            data: cats,
            params: { CategoryId: vcategoryId, CompanyId:vCompanyId},
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            //
            $scope.BindGrid(1);
            $scope.msgStatus = CategoryMessages(4);
            $("#Cateoryupdate").attr("disabled", false);
            $scope.Category.CategoyName = "";
            $scope.Category.IsActive = "";
            $scope.Show = false;
            $scope.Categ = true;
            $scope.ShowSave = true;
            $scope.ShowUpdate = false;
            funPlaceholderReset();
            //$scope.Category.IsActive = true;
        });
    }

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

    $scope.Clear = function () {
        //
        $scope.msgStatus = '';
        $scope.msg = '';
        $("#Cateorysave").attr("disabled", false);
        $("#Cateoryupdate").attr("disabled", false);
        $scope.Show = false;
        $scope.Category.CategoyName = "";
        $scope.Category.IsActive = "";
        $scope.ProductDetail.Filetexts = "";
        $("input[type='file']").val('');
        $scope.ShowSave = true;
        $scope.ShowUpdate = false;
        $("#ProductFile").val('');
        $scope.Categ = true;
        funPlaceholderReset();
    }


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


    $scope.InActiveclick = function () {
        //
        $scope.BindGrid(0);
        $scope.Inactive = false;
        $scope.Active = true;
    }

    $scope.Activeclick = function () {
       // 
        $scope.BindGrid(1);
        $scope.Inactive = true;
        $scope.Active = false;
    }

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
        debugger;

        //$('#Image1').hide();
        //var fromdata = new FormData();
        //fromdata.onload = function (e) {
        //    $('#Image1').show();
        //    $('#Image1').attr("src", e.target.result);
        //    $('#Image1').Jcrop({
        //        onChange: SetCoordinates,
        //        onSelect: SetCoordinates
        //    });
        //}
        //fromdata.readAsDataURL($(this)[0].files[0]);


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

         a.download = 'ImportCategory.xls';//downloading template name
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
     var InsertImportCategory = function (vCompanyId, vvdata) {
         
         $http({
             method: "POST",
             url: vUrl + "Category/InsertImportCategory",
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
                 $scope.BindGrid(1);
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
             url: vUrl + "Category/ImportCategoryvalidation",
             params: { companyid: vCompanyId },
             data: JSON.stringify(data),
             headers: {
                 'Content-Type': 'application/json'
             }

         }).then(function (data) {
             
             if (data.data.includes("Success")) {
                 InsertImportCategory(vCompanyId, vvvdata);
             }
             else if (data.data.includes("duplicate")) {
                 var splitdataval = data.data.split('|');

                 var r = confirm("Already This Category is  Available");

                 if (r == true) {
                     InsertImportCategory(vCompanyId, vvvdata);
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

     //$scope.FIleuploadImg = function () {
     //    debugger;
       

     //}
     //$(function () {
     //    $('#FileUpload6').change(function () {
     //        debugger;
            
     //    });

     //    $('#btnCrop').click(function () {
     //        var x1 = $('#imgX1').val();
     //        var y1 = $('#imgY1').val();
     //        var width = $('#imgWidth').val();
     //        var height = $('#imgHeight').val();
     //        var canvas = $("#canvas")[0];
     //        var context = canvas.getContext('2d');
     //        var img = new Image();
     //        img.onload = function () {
     //            canvas.height = height;
     //            canvas.width = width;
     //            context.drawImage(img, x1, y1, width, height, 0, 0, width, height);
     //            $('#imgCropped').val(canvas.toDataURL());
     //            $('[id*=btnUpload]').show();
     //        };
     //        img.src = $('#Image1').attr("src");
     //    });
     //});
     //function SetCoordinates(c) {
     //    $('#imgX1').val(c.x);
     //    $('#imgY1').val(c.y);
     //    $('#imgWidth').val(c.w);
     //    $('#imgHeight').val(c.h);
     //    $('#btnCrop').show();
     //};


    
});
