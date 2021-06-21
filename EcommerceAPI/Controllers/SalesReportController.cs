using EcommerceAPI.Models;
using log4net;
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
    public class SalesReportController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/SalesReport/GetOrderNoByDate")]
        public IEnumerable GetOrderNoByDate(DateTime FromDate, DateTime ToDate, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetOrderNoByDate");
                ToDate= ToDate.AddDays(1);
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                var result = (from salOrdr in db.SalesOrders
                              where
                               salOrdr.OrderDate >= FromDate && salOrdr.OrderDate <= ToDate
                              select new
                              {
                                  salOrdr.SalesOrderId,
                                  salOrdr.OrderNo
                              });
                return result;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/SalesReport/GetCompanyDetails")]
        public IEnumerable GetCompanyDetails(int CompanyDetailId)
        {
            var a = (from p in db.CompanyDetails.AsEnumerable()
                     where p.CompanyDetailId== CompanyDetailId

                     select new
                     {
                         CompanyName = p.CompanyName,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         City = p.City,
                         State = p.State,
                         Country = p.Country,
                         PinCode = p.PinCode,
                         GSTNo = p.GSTNo,
                         CINno = p.CINno,
                         PhoneNo = p.PhoneNo,
                         EmailId = p.EmailId,
                         InvoiceLogo=p.InvoiceLogo
                     });
            return a;
        }

        [HttpGet]
        [Route("api/SalesReport/GetTermsandContionInvoice")]
        public IEnumerable GetTermsandContionInvoice(int CompanyDetailId)
        {
            var a = (from p in db.TermsAndConditionInvoives.AsEnumerable()
                     where p.CompanyDetailId == CompanyDetailId
                     select new
                     {
                         InvoiceTermsAndCondition = p.InvoiceTermsAndCondition
                     });
            return a;
        }

        [HttpGet]
        [Route("api/SalesReport/GetSalesReportDetails")]
        public IEnumerable GetSalesReportDetails(int SalesOrderId ,int CompanyDetailId)
        {
            try
            {
                log.Debug("api/SalesReport/GetSalesReportDetails");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where p.SalesOrderId==SalesOrderId
                         orderby p.SalesOrderId descending
                         select new
                         {
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.Status,
                             q.MemberName,
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             p.DeliveryEmail,
                             p.DeliveryContactNo,
                             p.DeliveryCharge,
                             p.Subtotal,
                             p.CouponCode,
                          
                             TotalAmoount = ((p.Amoount) + (p.DeliveryCharge)),
                             OrderItems = p.SalesOrderItems.AsEnumerable().Select(s => new 
                             {
                                 sno = ++vsno,
                                 s.ProductPrice,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 
                                 product = s.ProductDetail.Title,
                                 Variance = s.ProductVarianceId == 0 ? null : (from v in db.ProductVariances.AsEnumerable()
                                                                               where v.ProductVarianceId == s.ProductVarianceId
                                                                               select new
                                                                               {
                                                                                   v.VarianceType
                                                                               }
                                                                               ),
                                 ProductType=s.ProductDetail.ProductType
                             }),
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
