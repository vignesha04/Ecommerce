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
    public class MessageAlertController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/Messagealert/GetMessagedetails")]
        public IEnumerable GetMessagedetails()
        {
            var sno = 0;
            var a = (from p in db.MessageAlerts.AsEnumerable()
                     orderby p.MessageAlertId descending
                     select new
                     {
                         Sno = ++sno,
                         MessageAlertId = p.MessageAlertId,
                         Message = p.Message,
                         Date = Convert.ToDateTime(p.Date).ToString("dd/MM/yyyy")
                     });
            return a;
        }

        [HttpPost]
        [Route("api/Messagealert/InsertMessagealertdetails")]
        public IHttpActionResult InsertMessagealertdetails([FromBody]MessageAlert message)
        {
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

            DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(message.Date), timeZoneInfo);

            DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(message.Date), timeZoneInfo);

            string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");

            TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;

            message.Date = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
            db.MessageAlerts.Add(message);
            db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/Messagealert/GetSearch")]
        public IEnumerable GetSearch(string Search)
        {
            var Srno = 0;
            var a = (from p in db.MessageAlerts.AsEnumerable()
                     where (p.Message.ToLower().Contains(Search.ToLower()))
                     orderby p.MessageAlertId descending
                     select new
                     {
                         Sno = ++Srno,
                         MessageAlertId = p.MessageAlertId,
                         Message = p.Message,
                         Date = Convert.ToDateTime(p.Date).ToString("dd/MM/yyyy")
                     });
            return a;
        }
    }
}
