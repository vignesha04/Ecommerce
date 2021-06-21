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
    public class SiteSettingsController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();

        //[HttpGet]
        //[Route("api/Setting/GetCaptchaType")]
        //public IEnumerable<CaptchaType> GetCaptchaType()
        //{
        //    try
        //    {
        //        log.Debug("GetCaptchaType");
        //        var a = (from p in db.CaptchaTypes.AsEnumerable()
                    
        //             select new CaptchaType
        //             {
        //                 CaptchaId = p.CaptchaId,
        //                 CaptchaType1 = p.CaptchaType1,
        //             });
        //    return a;
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }
        //}


        [HttpGet]
        [Route("api/Setting/getEcommerceAPI")]
        public IEnumerable getEcommerceAPI(int CompanyId)
        {
            try
            {
                log.Debug("getEcommerceAPI");
                var a = (from s in db.Settings.AsEnumerable()
                         where(s.CompanyDetailId== CompanyId)
                     select new
                     {
                         SettingId = s.SettingId,
                         DateFormat = s.DateFormat,
                         CurrencyType = s.CurrencyType,
                         GridSizeAdmin = s.GridSizeAdmin,
                         GridSizeClient = s.GridSizeClient,
                         ButtonColorAdmin = s.ButtonColorAdmin,
                         CompanyDetailId = s.CompanyDetailId,
                      //   CaptchaId = s.CaptchaId,
                         MetaTag = s.MetaTag,
                         CouponApplicable =s.CouponApplicable,
                         DiscountApplicable=s.DiscountApplicable,
                         FacebookSignup = s.FacebookSignup,
                         colorApplicable = s.colorApplicable,
                         FotterImage=s.FotterImage,
                         Themecolour= s.Themecolour,
                         Invoice = db.InvoiceNumbers.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.invoiceprefix,
                                             t.InvoiceNumber1,
                                            
                                         }),


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
        [Route("api/Setting/GetInvoiceNumber")]
        public IEnumerable GetInvoiceNumber(string CompanyId)
        {
            try
            {
                log.Debug("GetInvoiceNumber");
                var a = (from s in db.InvoiceNumbers.AsEnumerable()
                         where (s.Companyid == CompanyId)
                         select new
                         {
                           s.invoiceprefix,
                           s.InvoiceNumber1,


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
        [Route("api/Setting/InsertSettings")]
        public IHttpActionResult InsertSettings([FromBody]JObject jsonString,int CompanyId)
        {
            try
            {
                log.Debug("InsertSettings");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            clInsertSetting objjson = JsonConvert.DeserializeObject<clInsertSetting>(json);
            var context = new EcommerceEntities();
            Setting obj = new Setting();

         
            obj.DateFormat = objjson.DateFormat;
            obj.CurrencyType = objjson.CurrencyType;
                obj.colorApplicable = objjson.colorApplicable;
            obj.GridSizeAdmin = objjson.GridSizeAdmin;
            obj.GridSizeClient = objjson.GridSizeClient;
            obj.ButtonColorAdmin = objjson.ButtonColorAdmin;
                // obj.CaptchaId = objjson.;
                obj.MetaTag = objjson.MetaTag;
            obj.FacebookSignup = objjson.FacebookSignup;
            obj.CouponApplicable = objjson.CouponApplicable;
            obj.DiscountApplicable = objjson.DiscountApplicable;
                obj.Themecolour = objjson.ThemeColour;
                obj.CompanyDetailId = CompanyId;
            context.Settings.Add(obj);
            context.SaveChanges();

                InvoiceNumber invoice = new InvoiceNumber();
                invoice.invoiceprefix = objjson.InvoicePrefix;
                invoice.InvoiceNumber1 = objjson.InvoiceNumber;
                invoice.Companyid = Convert.ToString(CompanyId);
                context.InvoiceNumbers.Add(invoice);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        public class clInsertSetting
        {

            public string DateFormat;
            public string CurrencyType;
            public int GridSizeAdmin;
            public int GridSizeClient;
            public string ButtonColorAdmin;
            public int CaptchaId;
            public string FacebookSignup;
            public string CouponApplicable;
            public string DiscountApplicable;
            public int colorApplicable;
            public string MetaTag { get;  set; }
            public string ThemeColour { get;  set; }
            public string Themecolour { get;  set; }
            public string InvoicePrefix { get;  set; }
            public int InvoiceNumber { get;  set; }
            public string FotterImage { get;  set; }
            //internal string MetaTag;
        }
        [HttpPost]
        [Route("api/FileUpload/FooterImage")]
        public IHttpActionResult FooterImage(int CompanyId , string vFileUploadURl)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                // var vUrl = "https://petwebapi.sysmedacmicrosoft.com/";
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

                var result = db.Settings.FirstOrDefault(X => X.CompanyDetailId == CompanyId);
                if(result != null)
                {
                    result.FotterImage = path;
                    db.SaveChanges();
                }

                var vURL = path;
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpPost]
        [Route("api/Setting/UpdateSetting")]
        public IHttpActionResult UpdateSetting([FromBody]JObject jsonString, int CompanyId , string settingid)
        {
            try
            {
                log.Debug("UpdateSetting");
             
                var result = db.Settings.First(x => x.SettingId == Convert.ToInt32(settingid));
                if (result != null)
                {

                    string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                    clInsertSetting objjson = JsonConvert.DeserializeObject<clInsertSetting>(json);
                    var context = new EcommerceEntities();              
                    result.DateFormat = objjson.DateFormat;
                    result.CurrencyType = objjson.CurrencyType;
                    result.GridSizeAdmin = objjson.GridSizeAdmin;
                    result.GridSizeClient = objjson.GridSizeClient;
                    result.ButtonColorAdmin = objjson.ButtonColorAdmin;
                    //  result.CaptchaId = UpdateSettings.CaptchaId;
                    result.MetaTag = objjson.MetaTag;
                    result.FacebookSignup = objjson.FacebookSignup;
                    result.CouponApplicable = objjson.CouponApplicable;
                    result.DiscountApplicable = objjson.DiscountApplicable;
                    result.CompanyDetailId = CompanyId;
                    result.Themecolour = objjson.Themecolour;
                    result.colorApplicable = objjson.colorApplicable;
                    result.MetaTag = objjson.MetaTag;
                    result.FotterImage = objjson.FotterImage;

                    context.SaveChanges();


                }

                var result1 = db.InvoiceNumbers.First(x => x.Companyid == Convert.ToString(CompanyId));
                if (result1 != null)
                {
                    string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                    clInsertSetting objjson = JsonConvert.DeserializeObject<clInsertSetting>(json);
                    var context = new EcommerceEntities();
                    result1.invoiceprefix = objjson.InvoicePrefix;
                    result1.InvoiceNumber1 = objjson.InvoiceNumber;
                    result1.Companyid = Convert.ToString(CompanyId);

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



       
    }
}

    



    
