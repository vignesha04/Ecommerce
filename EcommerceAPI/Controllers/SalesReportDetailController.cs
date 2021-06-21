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
using log4net;


namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class SalesReportDetailController : ApiController

    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");


        private EcommerceEntities db = new EcommerceEntities();
        [HttpGet]
        [Route("api/SalesReportDetails/GetSalesOrderDate")]
        public IEnumerable salesorderdate(DateTime FromDate, DateTime ToDate, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSalesOrderDate");

                ToDate = ToDate.AddDays(1);
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                string dtCNowdate = Convert.ToDateTime(ToDate).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);
                
               // var vsno = 0;
                var result = (from salOrdr in db.SalesOrders
                              join q in db.MemberDetails.AsEnumerable() on salOrdr.MemberId equals q.MemberId
                              where
                               salOrdr.OrderDate >= FromDate && salOrdr.OrderDate <= ToDate
                               orderby salOrdr.OrderDate descending
                              select new
                              {
                                  //sno = ++vsno,
                                  OrderNo =salOrdr.OrderNo,                                
                                 OrderDate=salOrdr.OrderDate,
                                  
                                  Amoount = salOrdr.Amoount,
                                  Status= salOrdr.Status,
                                  MemberName=  q.MemberName,
                                  //CouponCode=salOrdr.CouponCode,
                                  CouponCode = salOrdr.CouponCode != null ? salOrdr.CouponCode : "-",

                              });


                return result;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }



        ////Search 
        //[HttpGet]
        //[Route("api/SalesReportDetails/SearchOrderDate")]
        //public IEnumerable SearchOrderDate(DateTime FromDate, DateTime ToDate, int CompanyDetailId, string Search)
        //{
        //    try
        //    {
        //        log.Debug("SearchOrderDate");
               
        //        var a = (from salOrdr in db.SalesOrders
        //                 join q in db.MemberDetails.AsEnumerable() on salOrdr.MemberId equals q.MemberId
        //                 where salOrdr.OrderDate >= FromDate && salOrdr.OrderDate <= ToDate &&
        //                 salOrdr.CompanyDetailId == CompanyDetailId && 
        //                 (salOrdr.OrderNo.ToLower().Contains(Search.Trim().ToLower())|| 
        //                 (salOrdr.Amoount.ToString().Contains(Search.Trim().ToLower()) || salOrdr.Status.ToString().Contains(Search.ToLower()) || q.MemberName.ToString().Contains(Search.ToLower())))

        //                  orderby salOrdr.OrderNo descending
        //                 select new
        //                 {
                           
        //                     OrderNo = salOrdr.OrderNo,

        //                     OrderDate = salOrdr.OrderDate,
        //                     Amoount = salOrdr.Amoount,
        //                     Status = salOrdr.Status,
        //                     MemberName = q.MemberName

        //                 });
        //        return a;

        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }
        //}

    }
}
