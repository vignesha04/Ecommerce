using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EcommerceAPI.Models;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class CategoryController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

       
        [HttpPost]
        [Route("api/FileUpload/UpdateCategoryImage")]
        public IHttpActionResult UpdateCategoryImage(int ProductId, int CompanyId , string vFileUploadURl)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = vFileUploadURl;
                //var vUrl = "http://localhost:56397/";
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


              var result=  db.Categories.FirstOrDefault(k => k.CategoryId == ProductId && k.CompanyDetailId == CompanyId);
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
                        if(result != null)
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

   


        [HttpGet]
        [Route("api/Category/GetCategories")]
        public IEnumerable GetCategories(int iActive, int CompanyId)
        {
            try
            {
                log.Debug("GetCategories");
                var Srno = 0;
                var a = (from p in db.Categories.AsEnumerable()
                         where (p.IsActive == iActive && p.CompanyDetailId==CompanyId)
                         orderby p.CategoryId descending
                         select new
                         {
                             Rownumber = ++Srno,
                             CompanyDetailId = p.CompanyDetailId,
                             CategoryId = p.CategoryId,
                             CategoyName = p.CategoyName,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/active.png" : "AdminStyle/images/inactive.png",
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

        [HttpGet]
        [Route("api/Category/GetCategoriesById")]
        public IEnumerable GetCategoriesById(int CategoryId, int CompanyId)
        {
            try
            {
                log.Debug("GetCategoriesById");
                var a = (from p in db.Categories.AsEnumerable()
                         where (p.CategoryId == CategoryId && p.CompanyDetailId==CompanyId)
                         select new
                         {
                             CategoryId = p.CategoryId,
                             CompanyDetailId = p.CompanyDetailId,
                             CategoyName = p.CategoyName,
                             IsActive = p.IsActive,
                             ImageURL=p.ImageURL,
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
        [Route("api/Category/UpdateCategories")]
        public IHttpActionResult UpdateCategories([FromBody] JObject jsonString, int CategoryId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateCategories");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinsertCategory Objjson = JsonConvert.DeserializeObject<clinsertCategory>(json);
               

                var context = new EcommerceEntities();
                var result = context.Categories.First(b => b.CategoryId == CategoryId && b.CompanyDetailId==CompanyId);
                if (result != null)
                {
                    result.CategoryId = CategoryId;
                    result.CompanyDetailId = CompanyId;
                    result.CategoyName = Objjson.CategoyName.ToString();
                    if (Objjson.IsActive == true)
                        result.IsActive = 1;
                    else
                        result.IsActive = 0;
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
        [Route("api/Category/SubcategoryValid")]
        public IEnumerable GetSubCategory(int CatId, int CompanyId)
        {
            try
            {
                log.Debug("SubcategoryValid");
                var a = (from p in db.SubCategories.AsEnumerable()
                     where (p.IsActive == 1 && p.CategoryId == CatId && p.CompanyDetailId==CompanyId)
                     select new
                     {
                         CategoryId = p.CategoryId,
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
        [Route("api/Category/GetSearch")]
        public IEnumerable GetSearch(string Search, int Status, int CompanyId)
        {
            try
            {
                log.Debug("GetSearch");
                var Srno = 0;
                var a = (from p in db.Categories.AsEnumerable()
                         where (p.IsActive == Status && p.CompanyDetailId==CompanyId && (p.CategoyName.ToLower().Contains(Search.ToLower())))
                         select new
                         {
                             Rownumber = ++Srno,
                             CategoryId = p.CategoryId,
                             CategoyName = p.CategoyName,
                             CompanyDetailId = p.CompanyDetailId,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/active.png" : "AdminStyle/images/inactive.png",
                             ImageURL = p.ImageURL,
                             IsActive1 = p.IsActive == 1 ? "Active" : "InActive"
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
        [Route("api/FileUpload/CategoryImage")]
        public IHttpActionResult Uploads(int CompanyId, string CategoyName , string vFileUploadURl)
        {
            try
            {
                log.Debug("AddDetail");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = vFileUploadURl;
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
                var result = db.Categories.FirstOrDefault(x => x.CategoyName == CategoyName);
                if(result != null)
                {
                    result.ImageURL = vURL;
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


        //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
        //Insering the validated data to database
        [HttpPost]
        [Route("api/Category/InsertImportCategory")]
        public IHttpActionResult InsertImportCategory(List<clInsertImportCategory> CategoryImport, int companyid)
        {
            try
            {
                
                log.Debug("InsertImportCategory");
                var context = new EcommerceEntities();
                string lscnt = CategoryImport.Count.ToString();
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        for (int cnt = 0; cnt < CategoryImport.Count; cnt++)
                        {
                            Category objCategory = new Category();
                            objCategory.CategoyName = Convert.ToString(CategoryImport[cnt].CategoryName);                         
                            objCategory.CompanyDetailId = companyid;
                            objCategory.IsActive = 1;
                            objCategory.InsertedBy = 1;
                            objCategory.InsertedDate = dtCNow;
                            db.Categories.Add(objCategory);
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
        [Route("api/Category/ImportCategoryvalidation")]
        public IHttpActionResult ImportCategoryvalidation(List<clInsertImportCategory> CategoryImport, int companyid)
        {
            try
            {
                log.Debug("ImportCategoryvalidation");
                var context = new EcommerceEntities();

                string lscnt = CategoryImport.Count.ToString();
                string duplicatenos = string.Empty;
                try
                {
                    for (int cnt = 0; cnt < CategoryImport.Count; cnt++)
                    {

                        if (cnt == 0)
                        {

                            if (CategoryImport[cnt].CategoryName == null 

                               )
                            {
                                return Ok("Category Template is Wrong");
                            }
                        }

                        //(OR) 1st row Datas Should not be Empty

                        //Category Name Empty Validation
                        if (CategoryImport[cnt].CategoryName == null || CategoryImport[cnt].CategoryName.ToString().Trim() == string.Empty)
                        {

                            return Ok("Category Name Data Row " + (cnt + 1) + " Should not be Empty.");
                        }



                        //Category Name db chk Validation
                        if (CategoryImport[cnt].CategoryName != null || CategoryImport[cnt].CategoryName.ToString().Trim() != string.Empty)
                        {

                            var vCatname = Convert.ToString(CategoryImport[cnt].CategoryName);

                            var Category = db.Categories.FirstOrDefault(x => x.CategoyName == vCatname && x.CompanyDetailId == companyid);

                            if (Category != null)
                            {

                                return Ok("Categoy Name Data Row " + (cnt + 1) + " Is Already Exist.");
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

        public class clInsertImportCategory
        {
            public string CategoryName { get;  set; }
            
        }
    }

    internal class clinsertCategory
    {
        public string CategoyName { get; set; }
        public bool IsActive { get; set; }
    }
}
