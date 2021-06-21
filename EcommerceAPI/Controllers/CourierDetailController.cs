using EcommerceAPI.Models;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers

{
    [EnableCors("*", "*", "GET,POST")]
    public class CourierDetailController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();
        //[HttpGet]
        //[Route("api/courierDetails/GetSalesOrder")]
        //public IEnumerable<SalesOrder> GetSalesOrder()
        //{
        //    try
        //    {
        //        log.Debug("GetSalesOrder");
        //        var a = (from p in db.SalesOrders.AsEnumerable()

        //                 select new SalesOrder
        //                 {
        //                     SalesOrderId = p.SalesOrderId,
        //                     SalesOrderItems = p.SalesOrderItems
        //                 });


        //        return a;
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }



        [HttpGet]
        [Route("api/courierDetails/GetMemberDetails")]
        public IEnumerable<MemberDetail> GetMemberDetails()
        {
            try
            {
                log.Debug("GetMemberDetails");
                var a = (from p in db.MemberDetails.AsEnumerable()

                         select new MemberDetail
                         {
                             MemberId = p.MemberId,
                             MemberOrders = p.MemberOrders,
                             MemberName = p.MemberName
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
        [Route("api/courierDetails/GetOrderDetail")]
        public IEnumerable<SalesOrder> GetOrderDetail(int MemberId)
        {
            try
            {
                log.Debug("GetOrderDetail");
                var a = (from p in db.SalesOrders.AsEnumerable()
                         where p.MemberId == MemberId

                         select new SalesOrder
                         {
                             SalesOrderId = p.SalesOrderId,
                             MemberId = p.MemberId,
                             OrderNo = p.OrderNo
                            

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
        [Route("api/courierDetails/InsertcourierDetails")]
        public IHttpActionResult InsertcourierDetails([FromBody]CourierDetail InsertCourier)
        {
            try
            {
                log.Debug("InsertSubCategory");
                //InsertCourier.InsertedBy = 1;
                //InsertSubCategory.InsertedDate = DateTime.Now;
                var noExist = db.CourierDetails.Any(x => x.CourierNo == InsertCourier.CourierNo);
                if (noExist)
                {
                    return Ok("Exist");
                }
                else

                {
                    db.CourierDetails.Add(InsertCourier);

                    db.SaveChanges();
                    return Ok("Not Exist");
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpGet]
        [Route("api/courierDetails/GetCourierDetails")]
        public IEnumerable GetCourierDetails()
        {
            try
            {
                log.Debug("GetCourierDetails");
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);
                var vsno = 0;
                var a = (from p in db.CourierDetails.AsEnumerable()
                         join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                         join r in db.MemberDetails.AsEnumerable() on s.MemberId equals r.MemberId
                         orderby p.CourierDetailId descending
                         select new
                         {
                             sno = ++vsno,
                             CourierName = p.CourierName,
                             CourierDetailId = p.CourierDetailId,
                             SalesOrderId = p.SalesOrderId,
                             OrderNo = s.OrderNo,
                             CourierNo = p.CourierNo,
                             MemberName = r.MemberName,
                             CompanyDetailId = p.CompanyDetailId,
                             OrderDate = s.OrderDate,
                             BookedDate = Convert.ToDateTime (p.BookedDate).ToString("dd/MM/yyyy")
                         });
                return a;

            }




            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        //---Search---//
        [HttpGet]
        [Route("api/courierDetails/GetSearch")]
        public IEnumerable GetSearch(string Search)
        {
            try
            {
                log.Debug("GetSearch");
                var vsno = 0;
                var a = (from p in db.CourierDetails.AsEnumerable()
                         join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                         join r in db.MemberDetails.AsEnumerable() on s.MemberId equals r.MemberId

                         where (p.CourierName.ToLower().Contains(Search.Trim().ToLower()) || r.MemberName.ToString().Contains(Search.ToLower()) || s.OrderNo.ToString().Contains(Search.ToLower()) ||p.CourierNo.ToString().Contains(Search.ToLower()))

                         orderby p.CourierDetailId descending
                         select new
                         {

                             sno = ++vsno,
                             CourierName = p.CourierName,
                             CourierNo = p.CourierNo,
                             MemberName = r.MemberName,
                             OrderNo = s.OrderNo,
                             MemberId = r.MemberId,
                             SalesOrderId = s.SalesOrderId,
                             CourierDetailId = p.CourierDetailId


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
        [Route("api/courierDetails/Getsalesorderchange")]
        public IEnumerable getsalesorderchange(int SalesOrderId)
        {
            try
            {
                log.Debug("getsalesorderchange");
                var a = (from p in db.CourierDetails.AsEnumerable()
                         join s in db.SalesOrders.AsEnumerable() on p.SalesOrderId equals s.SalesOrderId
                         join q in db.MemberDetails.AsEnumerable()on s.MemberId equals q.MemberId
                         where p.SalesOrderId == SalesOrderId 
                         select new 
                         {
                             CourierDetailId = p.CourierDetailId,
                             SalesOrderId = s.SalesOrderId,
                             OrderNo = s.OrderNo,
                             MemberId = q.MemberId,
                             MemberName = q.MemberName,
                             CourierName = p.CourierName,
                             BookedDate = p.BookedDate,
                             Description = p.Description,
                             CourierNo = p.CourierNo
                            

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
        [Route("api/courierDetails/GetOrderDate")]
        public IEnumerable getorderdate(int SalesOrderId)
        {
            try
            {
                log.Debug("getorderdate");
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);
                var a = (from p in db.SalesOrders.AsEnumerable()
                         where (p.SalesOrderId == SalesOrderId)
                         select new
                         {
                             SalesOrderId = p.SalesOrderId,

                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy")

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


