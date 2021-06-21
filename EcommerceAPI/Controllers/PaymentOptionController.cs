using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EcommerceAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class PaymentOptionController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        [HttpPost]
        [Route("api/PaymentOption/InsertPaymentOptions")]
        public IHttpActionResult InsertPaymentOptions([FromBody] PaymentOption PaymentOpt)
        {
            PaymentOpt.InsertedBy = 1;
            PaymentOpt.InsertedDate = DateTime.Now;
            var usrNameExists = db.PaymentOptions.Any(x => x.Name == PaymentOpt.Name);
            if (usrNameExists)
                return Ok("Already Exist");
            else
            {
                db.PaymentOptions.Add(PaymentOpt);
                db.SaveChanges();
                return Ok("Not Exist");
            }
        }

        [HttpGet]
        [Route("api/PaymentOption/GetPaymentOptions")]
        public IEnumerable<PaymentOption> GetPaymentOptions()
        {
            var a = (from p in db.PaymentOptions.AsEnumerable()
                     select new PaymentOption
                     {
                         PaymentOptionId = p.PaymentOptionId,
                         Name = p.Name,
                         Link = p.Link,
                         UserName = p.UserName,
                         Password = p.Password,
                         IsActive = p.IsActive
                     });
            return a;
        }

        [HttpGet]
        [Route("api/PaymentOption/GetPaymentOptionsById")]
        public IEnumerable GetPaymentOptionsById(int PaymentOptionId)
        {
            var a = (from p in db.PaymentOptions.AsEnumerable()
                     where (p.PaymentOptionId == PaymentOptionId)
                     select new
                     {
                         PaymentOptionId = p.PaymentOptionId,
                         Name = p.Name,
                         Link = p.Link,
                         UserName = p.UserName,
                         Password = p.Password,
                         IsActive = p.IsActive
                     });

            return a;
        }

        //[HttpPost]
        //[Route("api/PaymentOption/Insertpaymentoptions")]
        //public IHttpActionResult Insertpaymentoptions([FromBody] JObject jsonString)
        //{
        //    string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
        //    clinsertPaymentOptions Objjson = JsonConvert.DeserializeObject<clinsertPaymentOptions>(json);
        //    var context = new EcommerceEntities();
        //    paymentoption objpaymentoption=new paymentoption();
        //    objpaymentoption.PaymentOptionId = PaymentOptionId;
        //    objpaymentoption.Name = Objjson.Name.ToString();
        //        if (Objjson.Status == true)
        //        objpaymentoption.IsActive = 1;
        //        else
        //        objpaymentoption.IsActive = 0;
        //    objpaymentoption.Link = Objjson.Link;
        //    objpaymentoption.UserName = Objjson.UserName;
        //    objpaymentoption.Password = Objjson.Password;
        //        context.SaveChanges();

        //    return Ok();
        //}

        [HttpPost]
        [Route("api/PaymentOption/UpdatePaymentOptions")]
        public IHttpActionResult UpdatePaymentOptions([FromBody] JObject jsonString, int PaymentOptionId)
        {
            string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            clinsertPaymentOptions Objjson = JsonConvert.DeserializeObject<clinsertPaymentOptions>(json);
            var context = new EcommerceEntities();
            var result = context.PaymentOptions.First(b => b.PaymentOptionId == PaymentOptionId);
            if (result != null)
            {
                result.PaymentOptionId = PaymentOptionId;
                result.Name = Objjson.Name.ToString();
                if (Objjson.IsActive == true)
                    result.IsActive = 1;
                else
                    result.IsActive = 0;
                result.Link = Objjson.Link;
                result.UserName = Objjson.UserName;
                result.Password = Objjson.Password;
                result.UpdatedBy = 1;
                result.UpdatedDate = DateTime.Now;
                context.SaveChanges();
            }
            return Ok();
        }
    }

    public class clinsertPaymentOptions
    {
        public long PaymentOptionId { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
    }
}

