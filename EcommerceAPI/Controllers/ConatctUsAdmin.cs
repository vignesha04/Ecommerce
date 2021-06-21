using EcommerceAPI.Models;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class ConatctUsAdminController : ApiController

    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();

        

        [HttpGet]
        [Route("api/ContactUsAdmin/GetThemeDetail")]
        public IEnumerable<ThemeDetail> GetThemeDetails(int CompanyDetailId)
        {
            try
            {
                log.Debug("GetThemeDetail");
                var a = (from p in db.ThemeDetails.AsEnumerable()
                         where (p.Type == "Contact" && p.CompanyDetailId == CompanyDetailId)
                         select new ThemeDetail
                         {
                           CompanyDetailId=p.CompanyDetailId,
                             ThemeId = p.ThemeId,
                             ThemeImage = p.ThemeImage,
                             ThemeName = p.ThemeName,
                            
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
        [Route("api/ContactUsAdmin/InsertContact")]
        public IHttpActionResult InsertContactUsAdmin([FromBody]ContactUsAdmin contact ,int CompanyDetailId)
        {
            try
            {
               
                log.Debug("InsertContact");
                var descExist = db.ContactUsAdmins.Any(x => x.Description == contact.Description && CompanyDetailId==contact.CompanyDetailId);
                if (descExist)
                {
                    return Ok("Exist");
                }
                else
                {
                    contact.CompanyDetailId = CompanyDetailId;
                    db.ContactUsAdmins.Add(contact);
                    db.SaveChanges();
                    return Ok();

                }
                   
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpPost]
        [Route("api/ContactUsAdmin/UpdateContact")]
        public IHttpActionResult UpdateContact([FromBody]ContactUsAdmin contact, int ContactUsAdminId,int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateContact");
                var context = new EcommerceEntities();
                var result = context.ContactUsAdmins.First(p => p.ContactUsAdminId == ContactUsAdminId && p.CompanyDetailId==CompanyDetailId);
                if (result != null)
                {
                    result.ContactUsAdminId = ContactUsAdminId;
                    result.Address = contact.Address;
                    result.Address1 = contact.Address1;
                    result.ThemeId = contact.ThemeId;
                    result.CompanyDetailId = CompanyDetailId;

                    result.EmailId = contact.EmailId;
                    result.ContactNo = contact.ContactNo;
                    result.Description = contact.Description;
                    result.Iframe = contact.Iframe;


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
        [Route("api/ContactUsAdmin/GetContactDetail")]
        public IEnumerable<ContactUsAdmin> GetContactUs( int CompanyDetailId)
        {
            try
            {
                log.Debug("GetContactDetail");
                var a = (from p in db.ContactUsAdmins.AsEnumerable()

                         where (p.CompanyDetailId==CompanyDetailId)
                         select new ContactUsAdmin
                         {
                             ThemeId = p.ThemeId,
                             Address = p.Address,
                             Address1 = p.Address1,
                             CompanyDetailId=p.CompanyDetailId,

                             EmailId = p.EmailId,
                             ContactNo = p.ContactNo,
                             Description = p.Description,
                             ContactUsAdminId = p.ContactUsAdminId,
                             Iframe = p.Iframe 

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
        [Route("api/ContactUsAdmin/GetThemeId")]
        public IEnumerable GetThemeId(int themeId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetThemeId");
                var a = (from p in db.ThemeDetails.AsEnumerable()
                         where (p.ThemeId == themeId && p.CompanyDetailId==CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = p.CompanyDetailId,
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
    }
}
