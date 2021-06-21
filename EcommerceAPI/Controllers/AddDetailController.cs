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
    public class AddDetailController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        private EcommerceEntities db = new EcommerceEntities();

        public long? CompanyDetailId { get; private set; }

        //(Insert)
        [HttpPost]
        [Route("api/AddDetail/InsertAddDetails")]
        public IHttpActionResult InsertAddDetails([FromBody] AddDetail addsdet, string filpath, int CompanyDetailId)
        {
            try
            {
                log.Debug("InsertAddDetails");
                //paymentOption.PaymentOptionId = 1;
                addsdet.InsertedBy = 1;
                addsdet.IsActive = 1;
                
                addsdet.CompanyDetailId = CompanyDetailId;
                addsdet.InsertedDate = DateTime.Now;
                addsdet.PictureURL = filpath;
                
                var usrNameExists = db.AddDetails.Any(x => x.AddName == addsdet.AddName && x.CompanyDetailId==CompanyDetailId);
                if (usrNameExists)
                    return Ok("Already Exist");
                else
                {
                    db.AddDetails.Add(addsdet);
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

        //(Bind Grid)
        [HttpGet]
        [Route("api/AddDetail/GetAddDetails")]
        public IEnumerable GetAddDetails(int iActive,int CompanyDetailId)
        {
            try
            {
                log.Debug("GetAddDetails");
                var vsno = 0;
                var a = (from p in db.AddDetails.AsEnumerable()
                         where ((p.IsActive == iActive) && (p.CompanyDetailId == CompanyDetailId))
                         
                         orderby p.AddId descending
                         select new
                         {
                             sno = ++vsno,
                             CompanyDetailId = p.CompanyDetailId,
                             AddId = p.AddId,
                             AddName = p.AddName,
                             Link = p.Link,
                             Picture = p.Picture,
                             PictureURL = p.PictureURL,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",

                             IsActive1 = p.IsActive == 1 ? "Active" : "Inactive"


                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        //(Edit)
        [HttpGet]
        [Route("api/AddDetail/GetAddDetailsById")]
        public IEnumerable GetAddDetailsById(int AddId , int CompanyDetailId)
        {
            try
            {
                log.Debug("GetAddDetailsById");
                var a = (from p in db.AddDetails.AsEnumerable()
                             // where p.IsActive==1
                         where ((p.AddId == AddId) && (p.CompanyDetailId == CompanyDetailId))
                        // where (p.AddId == AddId)
                         select new
                         {
                             AddId = p.AddId,
                             CompanyDetailId=p.CompanyDetailId,
                             AddName = p.AddName,
                             Link = p.Link,
                             Picture = p.Picture,
                             PictureURL = p.PictureURL,
                             IsActive = p.IsActive
                         });

                return a;

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        //Search 
        [HttpGet]
        [Route("api/AddDetail/GetSearch")]
        public IEnumerable GetSearch(string Search, int Status , int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSearch");
                var vsno = 0;
                var a = (from p in db.AddDetails.AsEnumerable()

                         where p.IsActive == Status && p.CompanyDetailId== CompanyDetailId && (p.AddName.ToLower().Contains(Search.Trim().ToLower()) || p.Link.ToLower().Contains(Search.ToLower()))

                         orderby p.AddId descending
                         select new
                         {

                             sno = ++vsno,
                             AddId = p.AddId,
                             CompanyDetailId=p.CompanyDetailId,
                             AddName = p.AddName,
                             Link = p.Link,
                             Picture = p.Picture,
                             PictureURL = p.PictureURL,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png"

                         });
                return a;

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        //(Update)
        [HttpPost]
        [Route("api/AddDetail/UpdateAddDetails")]
        public IHttpActionResult UpdateAddDetails([FromBody] JObject jsonString, int AddId, string filepath ,int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateAddDetails");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinsertAddDetails Objjson = JsonConvert.DeserializeObject<clinsertAddDetails>(json);
                var context = new EcommerceEntities();
                //Objjson.PictureURL = filepath;
                var result = context.AddDetails.First(b => b.AddId == AddId && b.CompanyDetailId==CompanyDetailId);

                if (result != null)
                {
                    result.AddId = AddId;
                    result.CompanyDetailId = CompanyDetailId;
                    result.AddName = Objjson.AddName.ToString();
                    if (Objjson.IsActive == true)
                        result.IsActive = 1;
                    else
                        result.IsActive = 0;
                    //result.PictureURL = Objjson.PictureURL;
                    result.Link = Objjson.Link;

                    if (filepath != null && filepath != string.Empty)
                        result.PictureURL = filepath;
                    //result.PictureURL = Objjson.Picture;
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
        //(File Upload)
        [HttpPost]
        [Route("api/Fileupload/AddDetail")]
        public IHttpActionResult Upload()
        {
            try
            {
                log.Debug("AddDetail");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/Adds/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;

                var vUrl = "http://webapi.kasimedufishandmeat.in/"; 
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
                var vURL = vUrl + "/Uploads/Adds/" + modifiedfilename;
                return Ok(vURL);

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        //[HttpPost]
        //[Route("api/AddDetail/ActivateAddDetails")]

        //public IHttpActionResult ActivateAddDetail(int AddId, string AddName, string Status)
        //{
        //    var context = new EcommerceEntities();
        //    var result = context.AddDetails.First(b => b.AddId == AddId);

        //    if (result != null)
        //    {
        //        if (Status == "0")
        //            result.IsActive = 'N';
        //        else
        //            result.IsActive = 'Y';
        //        context.SaveChanges();
        //    }

        //    return Ok();
        //}



        public class clinsertAddDetails
        {
            public long AddId { get; set; }
            public string AddName { get; set; }
            public string Link { get; set; }
            public string PictureURL { get; set; }
            public string Picture { get; set; }
            public bool IsActive { get; set; }
            public long? CompanyDetailId { get; set; }


        }

    }
}

