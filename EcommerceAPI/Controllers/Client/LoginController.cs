using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using EcommerceAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;



namespace EcommerceAPI.Controllers.Client
{

    [EnableCors("*", "*", "*")]
    public class LoginController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();


        [HttpGet]
        [Route("api/MemberLogin/GetMemberDetailsByEmailId")]
        public IEnumerable GetMemberDetailByEmailId(string EmailId, string Password)
        {

            var a = (from p in db.MemberDetails.AsEnumerable()
                     where (p.EmailId == EmailId)

                     select new MemberDetail
                     {

                         EmailId = p.EmailId,
                         Password = p.Password,

                     });

            return a;
        }

      
    }
}

