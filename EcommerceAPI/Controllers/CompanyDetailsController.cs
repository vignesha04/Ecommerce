using EcommerceAPI.Models;
using log4net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class CompanyDetailsController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();

        [HttpPost]
        [Route("api/CompDetails/InsertCompanydetail")]
        public IHttpActionResult InsertCompanydetail([FromBody]CompanyDetail companys)
        {
            try
            {

                var NameExist = db.CompanyDetails.Any(x => x.CompanyName == companys.CompanyName);

                if (NameExist)
                {
                    return Ok("Exist");
                }
                else
                    db.CompanyDetails.Add(companys);
                db.SaveChanges();
                int dId = Convert.ToInt32(companys.CompanyDetailId);
                return Ok(dId);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/CompDetails/GetCompanyDetail")]
        public IEnumerable<CompanyDetail> GetCompany()
        {
            try
            {
                var a = (from p in db.CompanyDetails.AsEnumerable()


                         select new CompanyDetail

                         {
                             CompanyDetailId = p.CompanyDetailId,
                             CompanyName = p.CompanyName,
                             AddressLine1 = p.AddressLine1,
                             AddressLine2 = p.AddressLine2,
                             Country = p.Country,
                             State = p.State,
                             City = p.City,
                             GSTNo = p.GSTNo,
                             CINno = p.CINno,
                             EmailId = p.EmailId,
                             PhoneNo = p.PhoneNo,
                             PinCode = p.PinCode,
                             WebsiteLink = p.WebsiteLink,
                             InvoiceLogo = p.InvoiceLogo,
                             WebsiteLogo = p.WebsiteLogo

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
        [Route("api/CompDetails/UpdateCompanyDetail")]
        public IHttpActionResult UpdateCompany([FromBody]CompanyDetail company, int CompanyDetailId)
        {
            try
            {
                var context = new EcommerceEntities();
                var result = context.CompanyDetails.First(p => p.CompanyDetailId == CompanyDetailId);
                if (result != null)

                {
                    //if (filepath != null && filepath != string.Empty)
                    //{
                    //    string[] strpath = filepath.Split('|');

                    //    result.WebsiteLogo = strpath[0];
                    //    result.InvoiceLogo = strpath[1];
                    //}
                    result.CompanyDetailId = CompanyDetailId;
                    result.CompanyName = company.CompanyName;
                    result.Country = company.Country;
                    result.State = company.State;
                    result.City = company.City;
                    result.AddressLine1 = company.AddressLine1;
                    result.AddressLine2 = company.AddressLine2;
                    result.CINno = company.CINno;
                    result.GSTNo = company.GSTNo;
                    result.PinCode = company.PinCode;
                    result.PhoneNo = company.PhoneNo;
                    result.EmailId = company.EmailId;
                    result.WebsiteLink = company.WebsiteLink;
                    result.InvoiceLogo = company.InvoiceLogo;
                    result.WebsiteLogo = company.WebsiteLogo;
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
        [HttpPost]
        [Route("api/FileUpload/CompanydetailsFileUpload1")]
        public IHttpActionResult CompanydetailsFileUpload1(int CompanyDetailId , string Fileupload)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/Companydetails/");

                HttpFileCollection files = HttpContext.Current.Request.Files;
                var vUrl = Fileupload;
                //var vUrl = "http://localhost:56397/";

                string modifiedfilename = string.Empty;
                for (int i = 0; i < files.Count; i++)

                {

                    HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;
                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));
                            //CompanyDetail InsertWebsiteLogo = new CompanyDetail();
                            //InsertWebsiteLogo.CompanyDetailId = CompanyDetailId;
                            //InsertWebsiteLogo.WebsiteLogo = vUrl + "/Uploads/Companydetails/" + modifiedfilename;

                            var result = db.CompanyDetails.First(p => p.CompanyDetailId == CompanyDetailId);
                            if (result != null)
                            {
                                result.WebsiteLogo= vUrl + "/Uploads/Companydetails/" + modifiedfilename;
                                db.SaveChanges();
                            }
                        }
                    }
                }
                var vURL = vUrl + "/Uploads/Companydetails/" + modifiedfilename;



                return Ok(vURL);

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpPost]
        [Route("api/FileUpload/CompanydetailsFileUpload2")]
        public IHttpActionResult CompanydetailsFileUpload2(int CompanyDetailId , string Fileupload)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/Companydetails/");
                HttpFileCollection files = HttpContext.Current.Request.Files;
                var vUrl = Fileupload;
                //var vUrl = "http://localhost:56397/";

                string modifiedfilename = string.Empty;
                for (int i = 0; i < files.Count; i++)

                {
                    HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));
                            //CompanyDetail InsertInvoiceLogo = new CompanyDetail();
                            //InsertInvoiceLogo.CompanyDetailId = CompanyDetailId;
                            //InsertInvoiceLogo.InvoiceLogo = vUrl + "/Uploads/Companydetails/" + modifiedfilename;


                            var result = db.CompanyDetails.First(p => p.CompanyDetailId == CompanyDetailId);
                            if (result != null)
                            {
                                result.InvoiceLogo = vUrl + "/Uploads/Companydetails/" + modifiedfilename;
                                db.SaveChanges();
                            }
                        }


                    }
                }
                var vURL = vUrl + "/Uploads/Companydetails/" + modifiedfilename;
                return Ok(vURL);

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/FileUpload/CompanydetailsFileUpload3")]
        public IHttpActionResult CompanydetailsFileUpload3(int CompanyDetailId, string Fileupload)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/Companydetails/");
                HttpFileCollection files = HttpContext.Current.Request.Files;
                var vUrl = Fileupload;
                //var vUrl = "http://localhost:56397/";

                string modifiedfilename = string.Empty;
                for (int i = 0; i < files.Count; i++)

                {
                    HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));
                            //CompanyDetail InsertInvoiceLogo = new CompanyDetail();
                            //InsertInvoiceLogo.CompanyDetailId = CompanyDetailId;
                            //InsertInvoiceLogo.InvoiceLogo = vUrl + "/Uploads/Companydetails/" + modifiedfilename;


                            var result = db.CompanyDetails.First(p => p.CompanyDetailId == CompanyDetailId);
                            if (result != null)
                            {
                                result.favicon = vUrl + "/Uploads/Companydetails/" + modifiedfilename;
                                db.SaveChanges();
                            }
                        }


                    }
                }
                var vURL = vUrl + "/Uploads/Companydetails/" + modifiedfilename;
                return Ok(vURL);

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

    }
}



