using EcommerceAPI.Models;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class SubCategoryController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/SubCategory/")]
        public IEnumerable<SubCategory> Get()
        {
            return db.SubCategories.ToList();
        }

        [HttpGet]
        [Route("api/SubCategory/GetSubCategorydetails")]
        public IEnumerable GetSubCategorydetails(int iActive, int CompanyId)
        {
            try {
                log.Debug("GetSubCategorydetails");
                var vsno = 0;
                var a = (from p in db.SubCategories.AsEnumerable()
                         join s in db.Categories.AsEnumerable() on p.CategoryId equals s.CategoryId
                         where (p.IsActive == iActive && p.CompanyDetailId==CompanyId)
                         orderby p.SubCategoryId descending
                         select new
                         {
                             sno = ++vsno,
                             CategoyName = s.CategoyName,
                             CompanyDetailId=p.CompanyDetailId,
                             SubCategoryId = p.SubCategoryId,
                             SubCategoryName = p.SubCategoryName,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                             IsActive1 = p.IsActive == 1 ? "Active" : "InActive",

                             ImageURL=p.ImageURL


                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetCategorydetails")]
        public IEnumerable<Category> GetCategorydetails(int CompanyId)
        {
            try
            {
                log.Debug("GetCategorydetails");
                var a = (from p in db.Categories.AsEnumerable()
                         where (p.IsActive == 1 && p.CompanyDetailId== CompanyId)
                         select new Category
                         {
                             CategoryId = p.CategoryId,
                             CategoyName = p.CategoyName,
                             CompanyDetailId=p.CompanyDetailId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpGet]
        [Route("api/SubCategory/GetSubCategoriesAdminbyId")]
        public IEnumerable<SubCategory> GetSubCategoriesAdminbyId(int SubCategoryId, int CompanyId)
        {
            try
            {
                log.Debug("GetSubCategoriesAdminbyId");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.SubCategoryId == SubCategoryId && p.CompanyDetailId == CompanyId)
                         select new SubCategory
                         {
                             SubCategoryId = p.SubCategoryId,
                             SubCategoryName = p.SubCategoryName,
                             CategoryId = p.CategoryId,
                             CompanyDetailId = p.CompanyDetailId,
                             IsActive = p.IsActive,
                             ImageURL = p.ImageURL,

                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpPost]
        [Route("api/FileUpload/subCategoryImage")]
        public IHttpActionResult subCategoryImage(int CompanyId,int categoryid,string subname , string vFileUploadURl)
        {
            try
            {
                log.Debug("AddDetail");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = vFileUploadURl;
                // var vUrl = "https://petwebapi.sysmedacmicrosoft.com/";
                //var vUrl = "http://localhost:56397/";
                string modifiedfilename = string.Empty;

                for (int i = 0; i < files.Count; i++)
                {
                    System.Web.HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                        }
                    }
                }
                var vURL = vUrl + "/Uploads/ProductDetails/" + modifiedfilename;
                var descExist = db.SubCategories.FirstOrDefault(x => x.SubCategoryName == subname && x.CategoryId == categoryid && x.CompanyDetailId == CompanyId);
                if (descExist != null)
                {
                    descExist.ImageURL = vURL;
                    db.SaveChanges();
                }
                return Ok(vURL);

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/FileUpload/UpdateSubCategoryImage")]
        public IHttpActionResult UpdateSubCategoryImage(int ProductId, int CompanyId , string vFileUploadURl)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                //var vUrl = "https://petwebapi.sysmedacmicrosoft.com/";
                //var vUrl = "http://localhost:56397/";
                var vUrl = vFileUploadURl;
                string modifiedfilename = string.Empty;
                string path = string.Empty;
                for (int i = 0; i < files.Count; i++)
                {
                    System.Web.HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            if (path == string.Empty)
                            {
                                path = vUrl + "/Uploads/ProductDetails/" + modifiedfilename;
                            }
                            else
                                path = path + "|" + vUrl + "/Uploads/ProductDetails/" + modifiedfilename;

                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                        }
                    }
                }


                var result = db.SubCategories.FirstOrDefault(k => k.SubCategoryId == ProductId && k.CompanyDetailId == CompanyId);
                db.SaveChanges();
                var vURL = path;
                string[] strPicture = vURL.Split('|');
                //foreach (string str2 in strPicture)
                if (strPicture.Length > 0)
                {
                    //foreach (string str2 in strPicture)
                    //if (strsplitfilepath.Length > 0)
                    for (int cnt = 0; cnt < strPicture.Length; cnt++)
                    {
                        if (result != null)
                        {
                            result.ImageURL = strPicture[cnt];
                            db.SaveChanges();
                        }
                    }
                }
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }


        }

        [HttpPost]
        [Route("api/SubCategory/InsertSubCategory")]
        public IHttpActionResult InsertSubCategory([FromBody]SubCategory InsertSubCategory, int CompanyId)
        {
            try
            {
                log.Debug("InsertSubCategory");
                InsertSubCategory.CompanyDetailId = CompanyId;
                InsertSubCategory.InsertedBy = 1;
                InsertSubCategory.InsertedDate = DateTime.Now;
                var descExist = db.SubCategories.Any(x => x.SubCategoryName == InsertSubCategory.SubCategoryName && x.CategoryId == InsertSubCategory.CategoryId && x.CompanyDetailId==CompanyId);
                if (descExist)
                {
                    return Ok("Exist");
                }
                else

                {
                    db.SubCategories.Add(InsertSubCategory);

                    db.SaveChanges();
                    return Ok("Not Exist");
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        [HttpPost]
        [Route("api/SubCategory/UpdateSubCategory")]
        public IHttpActionResult UpdateSubCatgeory([FromBody]SubCategory UpdateSubCategory, int SubCategoryId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateSubCategory");
                var context = new EcommerceEntities();


                var result = context.SubCategories.First(p => p.SubCategoryId == SubCategoryId && p.CompanyDetailId==CompanyId);
                if (result != null)
                {
                    result.SubCategoryId = SubCategoryId;
                    result.SubCategoryName = UpdateSubCategory.SubCategoryName;
                    result.CategoryId = UpdateSubCategory.CategoryId;
                    result.IsActive = UpdateSubCategory.IsActive;
                    result.CompanyDetailId = CompanyId;
                    result.UpdatedBy = 1;
                    result.UpdatedDate = DateTime.Now;

                    context.SaveChanges();
                }


                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSubCat1")]
        public IEnumerable GetSubCat1()
        {
            try
            {
                log.Debug("GetSubCat1");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.IsActive == 1 && p.CategoryId == 1)
                         select new
                         {
                             SubCategoryName = p.SubCategoryName,
                             SubCategoryId = p.SubCategoryId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSubCat2")]
        public IEnumerable GetSubCat2()
        {
            try
            {
                log.Debug("GetSubCat2");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.IsActive == 1 && p.CategoryId == 1)
                         select new
                         {
                             SubCategoryName = p.SubCategoryName,
                             SubCategoryId = p.SubCategoryId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSubCat3")]
        public IEnumerable GetSubCat3()
        {
            try
            {
                log.Debug("GetSubCat3");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.IsActive == 1 && p.CategoryId == 1)
                         select new
                         {
                             SubCategoryName = p.SubCategoryName,
                             SubCategoryId = p.SubCategoryId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSubCat4")]
        public IEnumerable GetSubCat4()
        {
            try
            {
                log.Debug("GetSubCat4");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.IsActive == 1 && p.CategoryId == 1)
                         select new
                         {
                             SubCategoryName = p.SubCategoryName,
                             SubCategoryId = p.SubCategoryId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSubCat5")]
        public IEnumerable GetSubCat5()
        {
            try
            {
                log.Debug("GetSubCat5");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.IsActive == 1 && p.CategoryId == 1)
                         select new
                         {
                             SubCategoryName = p.SubCategoryName,
                             SubCategoryId = p.SubCategoryId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSubCat6")]
        public IEnumerable GetSubCat6()
        {
            try
            {
                log.Debug("GetSubCat6");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where (p.IsActive == 1 && p.CategoryId == 1)
                         select new
                         {
                             SubCategoryName = p.SubCategoryName,
                             SubCategoryId = p.SubCategoryId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/ProductValid")]
        public IEnumerable GetProduct(int SubCategoryId, int CompanyId)
        {
            try
            {
                log.Debug("ProductValid");
                var a = (from p in db.ProductDetails.AsEnumerable()
                         where (p.IsActive == 1 && p.SubCategoryId == SubCategoryId && p.CompanyDetailId==CompanyId)
                         select new
                         {
                             SubCategoryId = p.SubCategoryId,
                             CompanyDetailId = p.CompanyDetailId
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/SubCategory/GetSearch")]
        public IEnumerable getsubcatbysearch(string Search, int Status, int CompanyId)
        {
            try
            {
                log.Debug("GetSearch");
                var vsno = 0;
                var a = (from p in db.SubCategories.AsEnumerable()
                         join s in db.Categories.AsEnumerable() on p.CategoryId equals s.CategoryId
                         where (p.IsActive == Status && p.CompanyDetailId==CompanyId && (p.SubCategoryName.ToLower().Contains(Search.Trim().ToLower()) || s.CategoyName.ToLower().Contains(Search.ToLower())))
                         orderby p.SubCategoryId descending
                         select new
                         {
                             sno = ++vsno,
                             CategoyName = s.CategoyName,
                             SubCategoryId = p.SubCategoryId,
                             SubCategoryName = p.SubCategoryName,
                             CompanyDetailId=p.CompanyDetailId,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                             IsActive1 = p.IsActive == 1 ? "Active" : "InActive",
                             ImageURL = p.ImageURL,
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
        //Insering the validated data to database
        [HttpPost]
        [Route("api/SubCategory/InsertImportSubCategory")]
        public IHttpActionResult InsertImportCategory(List<clInsertImportSubCategory> SubCategoryImport, int companyid)
        {
            try
            {

                log.Debug("InsertImportSubCategory");
                var context = new EcommerceEntities();
                string lscnt = SubCategoryImport.Count.ToString();
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        for (int cnt = 0; cnt < SubCategoryImport.Count; cnt++)
                        {
                            SubCategory objCategory = new SubCategory();

                            if (SubCategoryImport[cnt].CategoryName != null && SubCategoryImport[cnt].CategoryName != "" && SubCategoryImport[cnt].CategoryName != string.Empty)
                            {
                                var CatName = Convert.ToString(SubCategoryImport[cnt].CategoryName);
                                var Categoryname = db.Categories.FirstOrDefault(x => x.CategoyName.ToLower().Replace(" ", "") == CatName.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid).CategoryId;
                                objCategory.CategoryId = Categoryname;

                            }


                            objCategory.SubCategoryName = Convert.ToString(SubCategoryImport[cnt].SubCategoryName);
                            objCategory.CompanyDetailId = companyid;
                            objCategory.IsActive = 1;
                            objCategory.InsertedBy = 1;
                            objCategory.InsertedDate = dtCNow;
                            db.SubCategories.Add(objCategory);
                            db.SaveChanges();


                        }
                        transaction.Commit();
                        return Ok("Success");


                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return Ok("Error");
                    }
                }

            }
            catch (Exception ex)
            {
                //transaction.Rollback();
                return Ok("Error");
            }
            // return Ok("Success");
        }


        //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
        //Before Importing the data validation process
        [HttpPost]
        [Route("api/SubCategory/ImportSubCategoryvalidation")]
        public IHttpActionResult ImportCategoryvalidation(List<clInsertImportSubCategory> SubCategoryImport, int companyid)
        {
            try
            {
                log.Debug("ImportSubCategoryvalidation");
                var context = new EcommerceEntities();
                string lscnt = SubCategoryImport.Count.ToString();
                string duplicatenos = string.Empty;
                try
                {
                    for (int cnt = 0; cnt < SubCategoryImport.Count; cnt++)
                    {

                        if (cnt == 0)
                        {

                            if (SubCategoryImport[cnt].CategoryName == null &&

                                SubCategoryImport[cnt].SubCategoryName == null
                               )
                            {
                                return Ok("SubCategory Template is Wrong");
                            }
                        }

                        //(OR) 1st row Datas Should not be Empty

                        //Category Name Empty Validation
                        if (SubCategoryImport[cnt].CategoryName == null || SubCategoryImport[cnt].CategoryName.ToString().Trim() == string.Empty)
                        {

                            return Ok("Category Name Data Row " + (cnt + 1) + " Should not be Empty.");
                        }

                        //Category Name db chk Validation
                        if (SubCategoryImport[cnt].CategoryName != null && SubCategoryImport[cnt].CategoryName != "" && SubCategoryImport[cnt].CategoryName != string.Empty)
                        {
                            var Cat = SubCategoryImport[cnt].CategoryName.Trim().ToLower();
                            var Catid = Convert.ToString(Cat);
                            var Categoryid = db.Categories.FirstOrDefault(x => x.CategoyName.ToLower().Replace(" ", "") == Catid.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid);
                            if (Categoryid != null)
                            {
                            }
                            else
                            {
                                return Ok("Category Name Data Row " + (cnt + 1) + " Is Not Found.");
                            }
                        }


                        //SubCategory Name Empty Validation
                        if (SubCategoryImport[cnt].SubCategoryName == null || SubCategoryImport[cnt].SubCategoryName.ToString().Trim() == string.Empty)
                        {

                            return Ok("SubCategory Name Data Row " + (cnt + 1) + " Should not be Empty.");
                        }



                        //SubCategory Name db chk Validation
                        if (SubCategoryImport[cnt].SubCategoryName != null || SubCategoryImport[cnt].SubCategoryName.ToString().Trim() != string.Empty)
                        {

                            var vSubCatname = Convert.ToString(SubCategoryImport[cnt].SubCategoryName);

                            var SubCategory = db.SubCategories.FirstOrDefault(x => x.SubCategoryName == vSubCatname && x.CompanyDetailId == companyid);

                            if (SubCategory != null)
                            {

                                return Ok("SubCategoy Name Data Row " + (cnt + 1) + " Is Already Exist.");
                            }
                            else
                            {

                            }

                        }




                    }

                    if (duplicatenos != string.Empty)
                    {
                        return Ok("duplicate|" + duplicatenos);
                    }
                    else
                    {
                        return Ok("Success");
                    }
                }
                catch (Exception ex)
                {
                    return Ok("Error");
                }


            }
            catch (Exception ex)
            {
                string register = ex.ToString();
                return Ok("Error");
            }
        }

        public class clInsertImportSubCategory
        {
            public string CategoryName { get;  set; }
            public string SubCategoryName { get;  set; }
        }
    }
}


























