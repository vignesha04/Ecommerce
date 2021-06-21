using EcommerceAPI.Models;
using log4net;
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
    public class AboutUsAdminController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        //private IEnumerable<string> strfunc;

        [HttpGet]
        [Route("api/AboutUsAdmin/")]
        public IEnumerable<AboutUsAdmin> Get()
        {
            return db.AboutUsAdmins.ToList();
        }

        [HttpGet]
        [Route("api/AboutUsAdmin/GetThemeDetails")]
        public IEnumerable<ThemeDetail> GetThemeDetails(int CompanyId)
        {
            try
            {
                log.Debug("GetThemeDetails");
                var a = (from p in db.ThemeDetails.AsEnumerable()
                     where (p.Type == "About" && p.CompanyDetailId==CompanyId)
                     select new ThemeDetail
                     {
                         CompanyDetailId=p.CompanyDetailId,
                         ThemeId = p.ThemeId,
                         ThemeName = p.ThemeName,
                         ThemeImage=p.ThemeImage
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
        [Route("api/AboutUsAdmin/GetAboutUsAdminDetails")]
        public IEnumerable GetAboutUsAdminDetails(int CompanyId)
        {
            try
            {
                log.Debug("GetAboutUsAdminDetails");
                var a = (from p in db.AboutUsAdmins.AsEnumerable()
                         where p.CompanyDetailId==CompanyId
                     select new
                     {
                         AboutUsAdminId = p.AboutUsAdminId,
                         ThemeId = p.ThemeId,
                         Image1 = p.Image1,
                         Image2 = p.Image2,
                         Description = p.Description,
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
        [Route("api/ThemeDetail/GetThemeId")]
        public IEnumerable GetThemeId(int themeId, int CompanyId)
        {
            try
            {
                log.Debug("GetThemeId");
                var a = (from p in db.ThemeDetails.AsEnumerable()
                     where (p.ThemeId == themeId && p.CompanyDetailId==CompanyId)
                     select new
                     {
                         CompanyDetailId=p.CompanyDetailId,
                         ThemeId = p.ThemeId,
                         ThemeName = p.ThemeName,
                         ThemeImage = p.ThemeImage
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
        [Route("api/AboutUsAdmin/GetFaqDetails")]
        public IEnumerable<AboutUsFAQ> GetFaqDetails(int CompanyId)
        {
            try
            {
                log.Debug("GetFaqDetails");
                var a = (from p in db.AboutUsFAQs.AsEnumerable()
                         where p.CompanyDetailId==CompanyId
                     select new AboutUsFAQ
                     {
                         AboutUsAdminId = p.AboutUsAdminId,
                         FaqId = p.FaqId,
                         Question = p.Question,
                         Answer = p.Answer,
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


        [HttpPost]
        [Route("api/AboutUsAdmin/InsertAboutUsAdmin")]
        public IHttpActionResult InsertAboutUsAdmin([FromBody]AboutUsAdmin about, string filepath, string FaqQuestions, string FaqAnswers, int CompanyId)
        {
            try
            {
                log.Debug("InsertAboutUsAdmin");
                string[] strImgPath = filepath.Split('|');
            about.Image1 = strImgPath[0];
            about.Image2 = strImgPath[1];
            about.CompanyDetailId = CompanyId;
            db.AboutUsAdmins.Add(about);
            db.SaveChanges();

                int iId = Convert.ToInt32(about.AboutUsAdminId);

                string[] strFaqQuestion = FaqQuestions.Split('|');
                string[] strFaqAnswer = FaqAnswers.Split('|');
                int i = 0;
                foreach (string strQuestion in strFaqQuestion)
                {
                    AboutUsFAQ insertfaq = new AboutUsFAQ();

                    insertfaq.AboutUsAdminId = iId;
                    insertfaq.Question = strQuestion;
                    insertfaq.Answer = strFaqAnswer[i];
                    insertfaq.CompanyDetailId = CompanyId;
                    db.AboutUsFAQs.Add(insertfaq);
                    db.SaveChanges();
                    i++;
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
        [Route("api/AboutUsAdmin/UpdateAboutUsAdmin")]
        public IHttpActionResult UpdateAboutUsAdmin([FromBody]AboutUsAdmin aboutUs,string FaqQuestion,string FaqAnswer, int AboutusId, string filepath1, int CompanyId)
        {
            try
            {
                log.Debug("UpdateAboutUsAdmin");
                var context = new EcommerceEntities();
            var result = context.AboutUsAdmins.First(p => p.AboutUsAdminId == AboutusId && p.CompanyDetailId==CompanyId);
            if (result != null)
            {
                    if (filepath1 != null && filepath1 != string.Empty)
                    {
                        string[] strpath = filepath1.Split('|');

                        result.Image1 = strpath[0];
                        result.Image2 = strpath[1];
                    }
                        
                result.AboutUsAdminId = AboutusId;
                result.CompanyDetailId = CompanyId;
                result.Description = aboutUs.Description;
                
                context.SaveChanges();
            }
            
            db.AboutUsFAQs.RemoveRange(db.AboutUsFAQs.Where(x=>x.CompanyDetailId==CompanyId));
            db.SaveChanges();

            int iId = Convert.ToInt32(aboutUs.AboutUsAdminId);
                if(FaqQuestion != null && FaqQuestion != "" && FaqQuestion != "null")
                {
                    string[] strFaqQuestion = FaqQuestion.Split('|');
                    string[] strFaqAnswer = FaqAnswer.Split('|');
                    int i = 0;
                    foreach (string strQuestion in strFaqQuestion)
                    {
                        AboutUsFAQ faq = new AboutUsFAQ();

                        faq.AboutUsAdminId = iId;
                        faq.Question = strQuestion;
                        faq.Answer = strFaqAnswer[i];
                        faq.CompanyDetailId = CompanyId;
                        db.AboutUsFAQs.Add(faq);
                        db.SaveChanges();
                        i++;
                    }
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
        [Route("api/Fileupload/Aboutus")]
        public IHttpActionResult Upload(string vFileUploadURl)
        {
            try
            {
                log.Debug("Aboutus");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/Aboutus/");
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
                        path += "" + vUrl + "/Uploads/Aboutus/" + modifiedfilename + "|";

                        file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                    }
                }
            }
            //path = MyExtensions.TrimLastCharacter(path);
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
        [Route("api/Fileupload/UploadAbout")]
        public IHttpActionResult UploadAbout( string vFileUploadURl)
        {
            try
            {
                log.Debug("UploadAbout");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/Aboutus/");
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
                      path += "" + vUrl + "/Uploads/Aboutus/" + modifiedfilename + "|";

                        file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                    }
                }
            }
            //db.AboutUsAdmins.RemoveRange(db.AboutUsAdmins);
            //db.SaveChanges();

            //var vURL = path;
            //string[] strpath = vURL.Split('|');
            //AboutUsAdmin insertAbout = new AboutUsAdmin();
            //insertAbout.Image1 = strpath[0];
            //insertAbout.Image2 = strpath[1];
            //insertAbout.AboutUsAdminId = AboutusId;

            //db.AboutUsAdmins.Add(insertAbout);
            //db.SaveChanges();

            var vURL = path;
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
