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
using System.Data.SqlClient;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class DashBoardController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        [HttpGet]
        [Route("api/DashBoardAdmin/GetNewSales")]
        public IEnumerable GetNewSales()
        {
            try
            {
                log.Debug("GetNewSales");
                var vSno = 0;
                var NewSales = (from p in db.SalesOrders.AsEnumerable()
                                join r in db.MemberDetails.AsEnumerable() on p.MemberId equals r.MemberId
                                orderby p.SalesOrderId descending
                                select new
                                {
                                    Sno=++vSno,
                                    OrderNo = p.OrderNo,
                                    MemberName = p.DeliveryName,
                                    OrderedDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                                    Amoount = p.Amoount,


                                }).Take(5);

                return NewSales;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        [HttpGet]
        [Route("api/DashBoardAdmin/GetNewProducts")]
        public IEnumerable GetNewProducts()
        {
            try
            {
                log.Debug("GetNewProducts");
                var NewProducts = (from p in db.ProductDetails.AsEnumerable()
                                   join r in db.ProductVariances.AsEnumerable() on p.ProductId equals r.ProductId
                                   where p.IsActive == 1
                                   orderby p.ProductId descending
                                   select new
                                   {
                                       Title = p.Title,
                                       Price = r.sellingPrice,
                                       Picture = p.Picture,
                                       ProductId = p.ProductId,
                                       Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                       {
                                           s.ImageURL
                                       }).Take(1),

                                   }).Take(5);

                return NewProducts;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/DashBoardAdmin/GetSiteSettingConfiguration")]
        public IEnumerable GetSiteSettingConfiguration()
        {
            var TrendingItems = (from n in db.Settings.AsEnumerable()
                                 select new
                                 {
                                     CurrencyType = n.CurrencyType,
                                     GridSizeClient = n.GridSizeClient
                                 });

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/DashBoardAdmin/GetNewClients")]
        public IEnumerable GetNewClients()
        {
            try
            {
                log.Debug("GetNewClients");
                var NewClient = (from p in db.MemberDetails.AsEnumerable()
                                 orderby p.MemberId descending
                                 select new
                                 {
                                     MemberName = p.MemberName,
                                     ContactNo = p.ContactNo,
                                     EmailId = p.EmailId

                                 }).Take(5);

                return NewClient;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        [HttpGet]
        [Route("api/DashBoardAdmin/GetCounts")]
        public IEnumerable GetCounts()
        {
            try
            {
                log.Debug("GetCounts");
                var a = (from p in db.ProductDetails.AsEnumerable()
                         select new
                         {

                             ProductCount = (from k in db.ProductDetails.AsEnumerable()
                                             where k.IsActive == 1
                                             select k).Count()

                             ,
                             InActiveUser = (from l in db.MemberDetails.AsEnumerable()
                                             where l.IsActive == 0
                                             select l).Count()

                             ,
                             ActiveUser = (from m in db.MemberDetails.AsEnumerable()
                                           where m.IsActive == 1
                                           select m).Count()
                            ,
                             ProductInActiveCount = (from n in db.ProductDetails.AsEnumerable()
                                                     where n.IsActive == 0
                                                     select n).Count()
                                                     ,
                             ProductTotalCount = (from o in db.ProductDetails.AsEnumerable()
                                                  select o).Count(),
                             TotalSalesCount = (from o in db.SalesOrders.AsEnumerable()
                                                select o).Count(),
                             TotalSalesAmount = (from q in db.SalesOrders.AsEnumerable()
                                                 select q.Amoount).Sum(),
                             TotalUsers = (from r in db.MemberDetails.AsEnumerable()
                                           select r).Count(),


                         }).Distinct();
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return ex.ToString();
            }
        }


        [HttpGet]
        [Route("api/DashBoardAdmin/GetNewCoupons")]
        public IEnumerable GetNewCoupons()
        {
            try
            {
                log.Debug("GetNewCoupons");
                var NewClient = (from p in db.CouponDetails.AsEnumerable()
                                 orderby p.CouponId descending
                                 select new
                                 {
                                     Name = p.Name,
                                     Description = p.Description,
                                     DiscountPercentage = p.DiscountPercentage

                                 }).Take(5);

                return NewClient;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/DashBoardAdmin/Weekwize")]
        public IEnumerable Weekwize(DateTime FDate, DateTime TDate)
        {
            try
            {
                log.Debug("api/DashBoardAdmin/GetChartDetails");

                string tableName = "SalesOrder";
                //var results1 = db.Database.SqlQuery<string>("SELECT LOWER(column_name) AS column_name FROM information_schema.columns WHERE table_name = @p0", tableName).ToArray();
                var tes = "select  sum(Amoount) as Amount,convert(varchar, OrderDate, 110) as oDate  from SalesOrder where convert(varchar, OrderDate, 110) between '" + Convert.ToDateTime(FDate).ToString("MM/dd/yyyy") + "' " +
  "and '" + Convert.ToDateTime(TDate).ToString("MM/dd/yyyy") + "'   group by convert(varchar, OrderDate, 110) ";
                //var books = db.SalesOrders.FromSql("SELECT BookId, Title, AuthorId, Isbn FROM Books").ToList();
                var results = db.Database.SqlQuery<SalInfo>("select  sum(Amoount) as SalAmount,convert(varchar, OrderDate, 110) as oDate  from SalesOrder where OrderDate between '" + Convert.ToDateTime(FDate).ToString("MM/dd/yyyy") + "' " +
  "and '" + Convert.ToDateTime(TDate).ToString("MM/dd/yyyy") + "'   group by convert(varchar, OrderDate, 110)  ", tableName).ToList();

                return results;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }
        [HttpGet]
        [Route("api/DashBoardAdmin/Yearreport")]
        public IEnumerable Yearreport(string FMonth, string TMonth)
        {
            try
            {
                log.Debug("api/DashBoardAdmin/GetChartDetails");

                string tableName = "SalesOrder";
                //var results1 = db.Database.SqlQuery<string>("SELECT LOWER(column_name) AS column_name FROM information_schema.columns WHERE table_name = @p0", tableName).ToArray();
                var TES = "select  sum(Amoount) as SalAmount,DATENAME(YEAR, OrderDate)  as oDate  from SalesOrder where OrderDate between '01-01" + FMonth + "' " +
  "and '12-31-" + TMonth + "'   group by DATENAME(YEAR, OrderDate) ";
                //var books = db.SalesOrders.FromSql("SELECT BookId, Title, AuthorId, Isbn FROM Books").ToList();
                var results = db.Database.SqlQuery<SalInfo>("select  sum(Amoount) as SalAmount,DATENAME(YEAR, OrderDate)  as oDate  from SalesOrder where OrderDate between '01-01-" + FMonth + "' " +
  "and '12-31-" + TMonth + "'   group by DATENAME(YEAR, OrderDate) ", tableName).ToList();

                return results;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpGet]
        [Route("api/DashBoardAdmin/Monthwize")]
        public IEnumerable Monthwize(DateTime FMonth, DateTime TMonth)
        {
            try
            {
                log.Debug("api/DashBoardAdmin/GetChartDetails");

                string tableName = "SalesOrder";
                //var results1 = db.Database.SqlQuery<string>("SELECT LOWER(column_name) AS column_name FROM information_schema.columns WHERE table_name = @p0", tableName).ToArray();

                //var books = db.SalesOrders.FromSql("SELECT BookId, Title, AuthorId, Isbn FROM Books").ToList();
                var results = db.Database.SqlQuery<SalInfo>("select  sum(Amoount) as SalAmount,DATENAME(MONTH, OrderDate)  as oDate  from SalesOrder where OrderDate between '" + FMonth + "' " +
  "and '" + Convert.ToDateTime(TMonth).ToString("MM/dd/yyyy") + "'   group by DATENAME(MONTH, OrderDate) ", tableName).ToList();

                return results;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpGet]
        [Route("api/DashBoardAdmin/GetChartDetails")]
        public IEnumerable GetChartDetails()
        {
            try
            {
                log.Debug("api/DashBoardAdmin/GetChartDetails");
                //            var NewClient = from x in (
                //(from SalOrder in db.SalesOrders
                // select new
                // {
                //     OrderDate = Convert.ToString(SalOrder.OrderDate),
                //     SalOrder.Amoount
                // }))
                //                            group x by new
                //                            {
                //                                x.OrderDate
                //                            } into g
                //                            orderby
                //                              g.Key.OrderDate descending
                //                            select new
                //                            {
                //                                g.Key.OrderDate,
                //                                Total = (decimal?)g.Sum(p => p.Amoount),
                //                                SalCount = g.Count(p => p.Amoount != null)
                //                            };

                //            return NewClient;
                string tableName = "SalesOrder";
                //var results1 = db.Database.SqlQuery<string>("SELECT LOWER(column_name) AS column_name FROM information_schema.columns WHERE table_name = @p0", tableName).ToArray();

                //var books = db.SalesOrders.FromSql("SELECT BookId, Title, AuthorId, Isbn FROM Books").ToList();
                var results = db.Database.SqlQuery<SalInfo>("select top 7 sum(Amount) as SalAmount,oDate from (select  sum(Amoount) as Amount, convert(varchar, OrderDate, 110) as oDate  from SalesOrder group by OrderDate)x group by oDate order by  oDate desc ", tableName).ToList();
                //var results;
                //using (var context = new EcommerceEntities())
                //{
                //    var commandText = "INSERT Categories (CategoryName) VALUES (@CategoryName)";
                //    results= context.Database.ExecuteSqlCommand(commandText);
                //}
                return results;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        class SalInfo
        {
            public Nullable<decimal> SalAmount { get; set; }
            public string oDate { get; set; }
        }

        [HttpGet]
        [Route("api/DashBoardAdmin/GetProductDetails")]
        public IEnumerable GetProductDetails()
        {
            try
            {
                log.Debug("GetNewProducts");
                var NewProducts = (from p in db.ProductDetails.AsEnumerable() 
                                   join q in db.ProductStocks.AsEnumerable() on p.ProductId equals q.ProductId 
                                   where p.IsActive == 1 && q.StockCount<=0 
                                   orderby p.ProductId descending
                                   select new
                                   {
                                       Title = p.Title,
                                       Price = p.Price,
                                       Picture = p.Picture,
                                       ProductId = p.ProductId,
                                           Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                           {
                                               s.ImageURL
                                           }).Take(1),
                                   }).Take(5);

                return NewProducts;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
    }
}
