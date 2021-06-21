using EcommerceAPI.Models;
using System;
using System.Linq;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class RegisterController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities(); 
        [HttpPost]
        [Route("api/MemberDetail/InsertMemberDetail")]
        public IHttpActionResult InsertMemberDetails([FromBody] MemberDetail memberdetail)
        {          
            bool varEmailIdExist = db.MemberDetails.Any(x => x.EmailId == memberdetail.EmailId);
            if (varEmailIdExist)
            {
                return Ok("Exist");
            }
            else
            {
                db.MemberDetails.Add(memberdetail);
                db.SaveChanges();
                return Ok("Not Exist");
            }       
        }
    }
}








