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
    public class DeliveryconfirmationController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/DeliveryConfirmation/GetOrderdetail")]
        public IEnumerable<SalesOrder> GetOrderdetail()
        {
            var a = (from p in db.SalesOrders.AsEnumerable()
                     where (p.Status != "Completed" && p.Status != "Cancelled")
                     select new SalesOrder
                     {
                         SalesOrderId = p.SalesOrderId,
                         OrderNo = p.OrderNo
                     });
            return a;
        }
        [HttpPost]
        [Route("api/DeliveryConfirmation/InsertDeliveryConfirmationdetails")]
        public IHttpActionResult InsertDeliveryConfirmationdetails([FromBody]DeliveryConfirmation delivery)
        {
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

            DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(delivery.DeliveredDate), timeZoneInfo);

            DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(delivery.DeliveredDate), timeZoneInfo);

            string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");

            TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;

            delivery.DeliveredDate = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
            db.DeliveryConfirmations.Add(delivery);
            db.SaveChanges();
            return Ok("Success");
        }
        [HttpGet]
        [Route("api/DeliveryConfirmation/GetDeliveryConfirmationdetails")]
        public IEnumerable GetDeliveryConfirmationdetails()
        {
            var vsno = 0;
            var a = (from p in db.DeliveryConfirmations.AsEnumerable()
                     join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                     orderby p.DeliveryConfirmationId descending
                     select new
                     {
                         sno = ++vsno,
                         Name = p.Name,
                         DeliveryConfirmationId = p.DeliveryConfirmationId,
                         SalesOrderId = p.SalesOrderId,
                         OrderNo = s.OrderNo,
                         CompanyDetailId = p.CompanyDetailId,
                         OrderDate = s.OrderDate,
                         Description = p.Description,
                         DeliveredDate = Convert.ToDateTime(p.DeliveredDate).ToString("dd/MM/yyyy")
                     });
            return a;
        }
        //---Search---//
        [HttpGet]
        [Route("api/DeliveryConfirmation/GetSearch")]
        public IEnumerable GetSearch(string Search)
        {
            var vsno = 0;
            var a = (from p in db.DeliveryConfirmations.AsEnumerable()
                     join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                     where (p.Name.ToLower().Contains(Search.Trim().ToLower()) || s.OrderNo.ToString().Contains(Search.ToLower()))
                     orderby p.DeliveryConfirmationId descending
                     select new
                     {
                         sno = ++vsno,
                         Name = p.Name,
                         DeliveryConfirmationId = p.DeliveryConfirmationId,
                         SalesOrderId = p.SalesOrderId,
                         OrderNo = s.OrderNo,
                         CompanyDetailId = p.CompanyDetailId,
                         OrderDate = s.OrderDate,
                         Description = p.Description,
                         DeliveredDate = Convert.ToDateTime(p.DeliveredDate).ToString("dd/MM/yyyy")
                     });
            return a;
        }
        [HttpGet]
        [Route("api/DeliveryConfirmation/GetSalesorderchange")]
        public IEnumerable getsalesorderchange(int SalesOrderId)
        {
            var a = (from p in db.DeliveryConfirmations.AsEnumerable()
                     join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                     where p.SalesOrderId == SalesOrderId
                     select new
                     {
                         Name = p.Name,
                         DeliveryConfirmationId = p.DeliveryConfirmationId,
                         SalesOrderId = p.SalesOrderId,
                         OrderNo = s.OrderNo,
                         Description = p.Description,
                         CompanyDetailId = p.CompanyDetailId,
                         OrderDate = s.OrderDate,
                         DeliveredDate = Convert.ToDateTime(p.DeliveredDate).ToString("dd/MM/yyyy")
                     });
            return a;
        }
        [HttpGet]
        [Route("api/DeliveryConfirmation/GetOrderDatedetails")]
        public IEnumerable getorderdate(int SalesOrderId)
        {
            var a = (from p in db.SalesOrders.AsEnumerable()
                     where (p.SalesOrderId == SalesOrderId)
                     select new
                     {
                         SalesOrderId = p.SalesOrderId,
                         OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy")
                     });
            return a;
        }


        [HttpGet]
        [Route("api/DeliveryConfirmation/GetDeliveryConfirmationId")]
        public IEnumerable GetDeliveryConfirmationId(int DeliveryConfirmationId)
        {
            try
            {
               
                var a = (from p in db.DeliveryConfirmations.AsEnumerable()
                         join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                         where (p.DeliveryConfirmationId == DeliveryConfirmationId)
                         select new
                         {
                            
                             Name = p.Name,
                             DeliveryConfirmationId = p.DeliveryConfirmationId,
                             SalesOrderId = p.SalesOrderId,
                             OrderNo = s.OrderNo,
                             CompanyDetailId = p.CompanyDetailId,
                             OrderDate = s.OrderDate,
                             Description = p.Description,
                             DeliveredDate = Convert.ToDateTime(p.DeliveredDate).ToString("dd/MM/yyyy")
                         });

                return a;
            }
            catch (Exception ex)
            {
               
                return null;
            }
        }
    }
}
