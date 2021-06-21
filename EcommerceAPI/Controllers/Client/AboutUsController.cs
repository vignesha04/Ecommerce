using EcommerceAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class AboutUsController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
       
         [HttpGet]
        [Route("api/AboutUs/GetAboutUsAdmin")]
        public IEnumerable GetAboutUsAdmin()
        {
         
            var a = (from p in db.AboutUsAdmins.AsEnumerable()
                     select new 
                     {
                       
                         AboutUsAdminId =p.AboutUsAdminId,
                         ThemeId = p.ThemeId,
                         Image1 = p.Image1,
                         Description = p.Description,
                        
                     });
            return a;

        }
        [HttpGet]
        [Route("api/AboutUs/GetFaqId")]
        public IEnumerable GetFaqId()
        {
            var vSno = 0;
            var a = (from p in db.AboutUsFAQs.AsEnumerable()
                     select new
                     {
                         demo = "demo" + vSno++,
                         AboutUsAdminId = p.AboutUsAdminId,
                         FaqId = p.FaqId,
                         Question = p.Question,
                         Answer = p.Answer,
                         

                     });
            return a;

        }
    }
}