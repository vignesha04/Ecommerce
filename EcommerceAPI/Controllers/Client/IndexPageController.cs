using EcommerceAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Configuration;
using System.Data;
using log4net;




namespace EcommerceAPI.Controllers.Client
{
    [EnableCors("*", "*", "GET,POST")]

    public class IndexPageController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        static string mStrMemberId = "";
        private readonly string Password1;


        [HttpGet]
        [Route("api/IndexPage/InsertWebConfig")]
        public IEnumerable InsertWebConfig( string vEntityName , string vDB_Connection_String)
        {
            try
            {
                var a = "";
               
                var v1 = vEntityName;
                string v2 = vDB_Connection_String;
                string v3 = "System.Data.EntityClient";


                Configuration configuration = WebConfigurationManager.OpenWebConfiguration("~");             
                AppSettingsSection appSettingsSection = (AppSettingsSection)configuration.GetSection("appSettings");              
                KeyValueConfigurationCollection settings = appSettingsSection.Settings;               
                settings["EcommerceEntities"].Value = v1;
                settings["providerName"].Value = v3;
                settings["Connectionstring"].Value = System.Web.HttpUtility.HtmlDecode(v2); 
                  var vtestvariable = System.Web.HttpUtility.HtmlDecode(v2); 

                // var v3 = System.Web.HttpUtility.HtmlDecode(v2);

                //var escaped = new System.Xml.Linq.XText(v3).ToString();

                //string encodedXml1 = System.Security.SecurityElement.Escape(v2);
                //string encodedXml2 = System.Net.WebUtility.HtmlDecode(v2);

                //string connectionString = ConfigurationManager.ConnectionStrings[v1].ConnectionString;
                configuration.ConnectionStrings.ConnectionStrings.Remove(new ConnectionStringSettings(v1, vtestvariable, v3));
                configuration.ConnectionStrings.ConnectionStrings.Add(new ConnectionStringSettings(v1, vtestvariable, v3));
                //save update webconfig file
                configuration.Save();

                // string conStr = WebConfigurationManager.ConnectionStrings[v1].ConnectionString;
                //var pathFromConfig = ConfigurationManager.AppSettings[v1];
                //var expandedPath = Environment.ExpandEnvironmentVariables(conStr);

                // var dbconnection = list[0].DB_Connection_String;
                //ConfigurationManager.ConnectionStrings.
                //config.ConnectionStrings.ConnectionStrings.Add(new ConnectionStringSettings(v1, ""));
                //config.Save();

                // string strcon = ConfigurationManager.ConnectionStrings[v1].ConnectionString;
                //create new sqlconnection and connection to database by using connection string from web.config file  
                // SqlConnection con = new SqlConnection(strcon);
                // con.Open();

                // Receive connection string from web.config
                //string myConnStr = ConfigurationManager.ConnectionStrings
                // [v1].ConnectionString;

                //// Create new connection to database and open database
                //SqlConnection myConn = new SqlConnection();
                //myConn.ConnectionString = myConnStr; // Set connection string
                //myConn.Open();

                return (vtestvariable);
            }
            catch (Exception ex)
            {
               
                return null;
            }
        }

        [HttpGet]
        [Route("api/IndexPage/GetCategorydetails")]
        public IEnumerable GetCategorydetails()
        {



            //var a = (from p in db.Categories.AsEnumerable()
            //         where p.IsActive == 1
            //         select new Category
            //         {
            //             CategoryId = p.CategoryId,
            //             CategoyName = p.CategoyName,
            //         });

            var menu = db.SubCategories.AsEnumerable().Select(c => new
            {
                c.SubCategoryName,
                c.SubCategoryId,
                c.IsActive,
                c.orderno,
                SubMenu = c.ProductDetails.AsEnumerable().Select(s => new
                {
                    s.Title,
                    s.ProductId,
                    s.IsActive
                }).Where(a => a.IsActive == 1)
            }).Where(b => b.IsActive == 1).OrderBy(c => c.orderno);



            return menu;
        }
        [HttpGet]
        [Route("api/IndexPage/ProductSearch")]
        public IEnumerable ProductSearch(string search)
        {
            var product = (from m in db.ProductDetails where m.Title.ToLower().Contains(search.ToLower()) && m.IsActive==1 select new { m.Title });
            return product;
        }
        [HttpGet]
        [Route("api/IndexPage/GetTrendingItems")]
        public IEnumerable GetTrendingItems()
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);


                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
                                     where p.IsActive == 1
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         p.IsActive,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId
                                         }).Where(m => m.ImageURL != "").OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         TaxDetailsId = p.TaxDetailsId,
                                         CouponId = p.CouponId,
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showCart = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             t.VarianceType
                                         }).Take(1) : null,
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0,
                                         DiscountFrom = p.DiscountDetailsId != null ? p.DiscountDetail.ValidFrom : null,
                                         DiscountTo = p.DiscountDetailsId != null ? p.DiscountDetail.ValidTo : null,

                                     }).Take(10);

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }


        [HttpGet]
        [Route("api/IndexPage/GetCategory")]
        public IEnumerable GetCategory()
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);


                var TrendingItems = (from p in db.Categories.AsEnumerable()
                                     where p.IsActive == 1
                                     select new
                                     {
                                         CategoyName = p.CategoyName,
                                         ImageURL = p.ImageURL,
                                         CategoryId = p.CategoryId,
                                     });

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/IndexPage/GetSubCategory")]
        public IEnumerable GetSubCategory()
      {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);


                var TrendingItems = (from p in db.SubCategories.AsEnumerable()
                                     
                                     orderby p.orderno ascending
                                     where p.IsActive == 1
                                     select new
                                     {
                                         SubCategoryName = p.SubCategoryName,
                                         ImageURL = p.ImageURL,
                                         SubCategoryId = p.SubCategoryId,
                                         CategoryId = p.CategoryId,
                                         ProDetail = p.ProductDetails.Select(s => new
                                         {
                                             s.Title,
                                             Price = s.Price,
                                             Picture = s.Picture,
                                             s.IsActive,
                                             ProductId = s.ProductId,

                                             TaxDetailsId = db.TaxDetails.Where(x => x.ProductId == s.Title && x.IsActive ==1).Take(1)
                                                       .Select(x => x.Percentage).FirstOrDefault(),

                                             Image1 = s.ProductImages.AsEnumerable().Select(k => new
                                             {
                                                 k.ProductId,
                                                 k.ImageURL,
                                                 k.ProductImageId
                                             }).Where(m => m.ImageURL != "" && m.ProductId == s.ProductId).OrderBy(c => c.ProductImageId).Take(1),
                                     //        Image2 = s.ProductImages.AsEnumerable().Select
                                     //(y => new
                                     //{
                                     //    y.ProductId,
                                     //    y.ImageURL,
                                     //    y.ProductImageId
                                     //}).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                             DiscountDetailsId = s.DiscountDetailsId,
                                            
                                             CouponId = s.CouponId,
                                             TaxPercentage = s.TaxDetailsId != null ? Convert.ToString(s.TaxDetail.Percentage) : "0",
                                             s.Variance,
                                             showCart = s.Variance == 1 ? "none" : "block",
                                             ProdVariance = s.Variance == 1 ? s.ProductVariances.AsEnumerable().Select(t => new
                                             {
                                                 t.VariancePrice,
                                                 t.sellingPrice,
                                                 t.VarianceType,
                                                 t.ProductVarianceId,
                                                 t.VarianceActive,
                                             }).Where(m => m.VarianceActive == 1).Take(1) : null,
                                             Discount = s.DiscountDetailsId != null ? s.DiscountDetail.DiscountPercentage : 0
                                         }).Where(s => s.IsActive == 1).Take(4)

                                        

                                     }).Take(2);

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }


        [HttpGet]
        [Route("api/IndexPage/GetAllSubCategory")]
        public IEnumerable GetAllSubCategory()
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);


                var TrendingItems = (from p in db.SubCategories.AsEnumerable()
                                    
                                     orderby p.orderno ascending
                                     where p.IsActive == 1
                                     select new
                                     {
                                         SubCategoryName = p.SubCategoryName,
                                         ImageURL = p.ImageURL,
                                         SubCategoryId = p.SubCategoryId,
                                         CategoryId = p.CategoryId,
                                         ProDetail = p.ProductDetails.Select(s => new
                                         {
                                             s.Title,
                                             Price = s.Price,
                                             Picture = s.Picture,
                                             s.IsActive,
                                             ProductId = s.ProductId,

                                             TaxDetailsId = db.TaxDetails.Where(x => x.ProductId == s.Title && x.IsActive ==1).Take(1)
                                                       .Select(x => x.Percentage).FirstOrDefault(),

                                             Image1 = s.ProductImages.AsEnumerable().Select(k => new
                                             {
                                                 k.ProductId,
                                                 k.ImageURL,
                                                 k.ProductImageId
                                             }).Where(m => m.ImageURL != "" && m.ProductId == s.ProductId).OrderBy(c => c.ProductImageId).Take(1),
                                     //        Image2 = s.ProductImages.AsEnumerable().Select
                                     //(y => new
                                     //{
                                     //    y.ProductId,
                                     //    y.ImageURL,
                                     //    y.ProductImageId
                                     //}).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                             DiscountDetailsId = s.DiscountDetailsId,

                                             CouponId = s.CouponId,
                                             TaxPercentage = s.TaxDetailsId != null ? Convert.ToString(s.TaxDetail.Percentage) : "0",
                                             s.Variance,
                                             showCart = s.Variance == 1 ? "none" : "block",
                                             ProdVariance = s.Variance == 1 ? s.ProductVariances.AsEnumerable().Select(t => new
                                             {
                                                 t.VariancePrice,
                                                 t.sellingPrice,
                                                 t.VarianceType,
                                                 t.ProductVarianceId,
                                                 t.VarianceActive,
                                             }).Where(m => m.VarianceActive == 1).Take(1) : null,
                                             Discount = s.DiscountDetailsId != null ? s.DiscountDetail.DiscountPercentage : 0
                                         }).Where(s => s.IsActive == 1).Take(4)



                                     });

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }


        [HttpGet]
        [Route("api/IndexPage/GetNewItems")]
        public IEnumerable GetNewItems()
        {
            var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
                                 where p.IsActive == 1
                                 orderby p.ProductId descending
                                 select new
                                 {
                                     Title = p.Title,
                                     Price = p.Price,
                                     Picture = p.Picture,
                                     ProductId = p.ProductId,
                                     Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                     {
                                         s.ProductId,
                                         s.ImageURL,
                                         s.ProductImageId
                                     }).Where(m => m.ImageURL != "").OrderBy(c => c.ProductImageId).Take(1),
                                     Image2 = p.ProductImages.AsEnumerable().Select
                                     (t => new
                                     {
                                         t.ProductId,
                                         t.ImageURL,
                                         t.ProductImageId
                                     }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                     DiscountDetailsId = p.DiscountDetailsId,
                                     TaxDetailsId = p.TaxDetailsId,
                                     CouponId = p.CouponId,
                                     TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                     p.Variance,
                                     showCart = p.Variance == 1 ? "none" : "block",
                                     ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                     {
                                         t.VariancePrice,
                                         t.VarianceType
                                     }).Take(1) : null,
                                     Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0
                                 }).Take(10);

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/IndexPage/GetNewProducts")]
        public IEnumerable GetNewProducts()
        {
            var NewProducts = (from p in db.ProductDetails.AsEnumerable()

                               where p.IsActive == 1
                               orderby p.ProductId descending
                               select new
                               {
                                   Title = p.Title,
                                   Price = p.Price,
                                   Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                   {
                                       s.ImageURL
                                   }).Take(1),
                                   ProductId = p.ProductId,
                                   TaxDetailsId = p.TaxDetailsId,
                                   TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0"
                               }).Take(5);

            return NewProducts;
        }

        [HttpGet]
        [Route("api/IndexPage/GetTopRateProducts")]
        public IEnumerable GetTopRateProducts()
        {
            var TopRateProducts = (from p in db.ProductDetails.AsEnumerable()

                                   where p.IsActive == 1
                                   orderby p.Price descending
                                   select new
                                   {
                                       Title = p.Title,
                                       Price = p.Price,
                                       Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                       {
                                           s.ImageURL
                                       }).Take(1),
                                       ProductId = p.ProductId,
                                       TaxDetailsId = p.TaxDetailsId,
                                       TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0"
                                   }).Take(5);

            return TopRateProducts;
        }

        [HttpGet]
        [Route("api/IndexPage/GetAddDetails")]
        public IEnumerable GetAddDetails()
        {
            var TrendingItems = (from p in db.AddDetails.AsEnumerable()
                                 where p.IsActive == 1
                                 orderby p.AddId descending
                                 select new
                                 {
                                     Picture = p.PictureURL,
                                     Link = p.Link
                                 }).Take(8);

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductDiscountDetais")]
        public IEnumerable GetProductDiscountDetais(int iDiscountDetailsId)
        {
            var ProductDiscount = (from p in db.DiscountDetails.AsEnumerable()
                                   where p.DiscountDetailsId == iDiscountDetailsId
                                   select new
                                   {
                                       p.DiscountPercentage,
                                       p.Description
                                   }).Take(10);

            return ProductDiscount;
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductTaxDetais")]
        public IEnumerable GetProductTaxDetais(int iTaxDetailsId)
        {
            var ProductTax = (from p in db.TaxDetails.AsEnumerable()
                              where p.IsActive == 1 && p.TaxDetailsId == iTaxDetailsId
                              select new
                              {
                                  p.Percentage,
                                  p.Description
                              }).Take(10);

            return ProductTax;
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductCopounDetais")]
        public IEnumerable GetProductCopounDetais(int iCouponId)
        {
            var ProductCopoun = (from p in db.CouponDetails.AsEnumerable()
                                 where p.CouponId == iCouponId
                                 select new
                                 {
                                     p.DiscountPercentage,
                                     p.Description,
                                     p.Code
                                 }).Take(10);

            return ProductCopoun;
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductCoupouns")]
        public IEnumerable GetProductCoupouns(string CopounName , int ProductDetailId)
        {

            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

          
           var ProductDiscount = (from p in db.CouponDetails.AsEnumerable()
                                  join o in db.ProductDetails.AsEnumerable() on p.CouponId equals o.CouponId
                                  //where p.Code == CopounName && p.IsActive ==1 && p.ValidFrom >= currentdatetime && currentdatetime <= p.ValidTo
                                  where p.Code == CopounName && p.IsActive == 1 
                                  // && p.ValidFrom <= currentdatetime && p.ValidTo >= currentdatetime
                                  select new
                                   {
                                       p.DiscountPercentage,
                                      //p.CouponId,
                                       p.AmountFrom,
                                       p.OfferType,
                                       o.ProductId,
                                       o.CouponId,
                                      
                                   });

            return ProductDiscount;
        }
        //[HttpGet]
        //[Route("api/IndexPage/GetProdDiscountByVariance")]
        //public IEnumerable GetProdTaxDiscountDetails(int iProdId, int iDiscountDetailsId, int iTaxDetailsId, int iCouponId)
        //{
        //    try
        //    {
        //        string tableName = "ProductDetail";

        //        string strQurey = "select DiscountDetails.DiscountPercentage,DiscountDetails.Description as DiscountDescription,TaxDetails.Percentage as TaxPercentage,TaxDetails.Description as TaxDescription,CouponDetails.DiscountPercentage as CouponPercentage,CouponDetails.Description as CouponDescription,CouponDetails.Code as CouponCode from ProductDetail left outer join DiscountDetails on ProductDetail.DiscountDetailsId = DiscountDetails.DiscountDetailsId left outer join CouponDetails on ProductDetail.CouponId = CouponDetails.CouponId left outer join TaxDetails on ProductDetail.TaxDetailsId = TaxDetails.TaxDetailsId where ProductDetail.ProductId='" + iProdId + "'";
        //        if (iDiscountDetailsId != 0)
        //            strQurey = strQurey + " and ProductDetail.DiscountDetailsId='" + iDiscountDetailsId + "'";
        //        if (iTaxDetailsId != 0)
        //            strQurey = strQurey + " and ProductDetail.TaxDetailsId='" + iTaxDetailsId + "'";
        //        if (iCouponId != 0)
        //            strQurey = strQurey + " and ProductDetail.CouponId='" + iCouponId + "'";

        //        var results = db.Database.SqlQuery<ProductDetailInfo>(strQurey, tableName).ToList();



        //        return results;
        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}



        //search
        [HttpGet]
        [Route("api/ProductDetails/Barcode")]
        public IEnumerable GetSearch(string Search, int Status, int CompanyId)
        {
            try
            {
                var vsno = 0;
                var a = from x in (from p in db.ProductDetails.AsEnumerable()
                                   join q in db.ProductVariances on p.ProductId equals q.ProductId
                                  
                                   where (p.CompanyDetailId == CompanyId) && (p.IsActive == Status)


                                   //where (p.Code.ToLower().Contains(Search.Trim().ToString()))
                                   //where (p.AddName.ToLower().Contains(Search.Trim().ToLower())

                                   orderby p.ProductId descending
                                   select new

                                   {
                                       
                                       sno = ++vsno,
                                       Title = p.Title,
                                       //Description = p.Description,
                                       Price = p.Price,
                                       CompanyDetailId = p.CompanyDetailId,
                                       ProductId = p.ProductId,                                      
                                       q.VarianceType

                                   })
                        where (x.Title.ToLower().Contains(Search.Trim().ToLower()) || x.VarianceType.ToLower().Contains(Search.Trim().ToLower()) || x.Price.ToString().Contains(Search.ToString()))
                        select new
                        {
                           
                            x.sno,
                            x.Title,
                          
                            x.Price,
                            x.CompanyDetailId,
                            x.ProductId,
                          x.VarianceType
                        };

                return a;
            }
            catch (Exception ex)
            {
               // log.Error(ex.Message, ex);
                return null;
            }




        }
        [HttpGet]
        [Route("api/IndexPage/GetProdTaxDiscountDetails")]
        public IEnumerable GetProdTaxDiscountDetails(int iProdId, int iDiscountDetailsId, int iCouponId)
        {
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

            try
            {
                string tableName = "ProductDetail";

                string strQurey = "select DiscountDetails.DiscountPercentage,DiscountDetails.Description as DiscountDescription,TaxDetails.Percentage as TaxPercentage,TaxDetails.Description as TaxDescription,CouponDetails.DiscountPercentage as CouponPercentage,CouponDetails.Description as CouponDescription,CouponDetails.Code as CouponCode from ProductDetail left outer join DiscountDetails on ProductDetail.DiscountDetailsId = DiscountDetails.DiscountDetailsId left outer join CouponDetails on ProductDetail.CouponId = CouponDetails.CouponId left outer join TaxDetails on ProductDetail.TaxDetailsId = TaxDetails.TaxDetailsId where ProductDetail.ProductId='" + iProdId + "'";
                if (iDiscountDetailsId != 0)
                    strQurey = strQurey + " and ProductDetail.DiscountDetailsId='" + iDiscountDetailsId + "' and (DiscountDetails.ValidFrom<='" + currentdatetime + "' and DiscountDetails.ValidTo>='" + currentdatetime + "')";
                //if (iTaxDetailsId != 0)
                //    strQurey = strQurey + " and ProductDetail.TaxDetailsId='" + iTaxDetailsId + "'";
                if (iCouponId != 0)
                    strQurey = strQurey + " and ProductDetail.CouponId='" + iCouponId + "'";

                var results = db.Database.SqlQuery<ProductDetailInfo>(strQurey, tableName).ToList();



                return results;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        internal class ProductDetailInfo
        {
            public Nullable<decimal> DiscountPercentage { get; set; }
            public string DiscountDescription { get; set; }
            public Nullable<decimal> TaxPercentage { get; set; }
            public string TaxDescription { get; set; }
            public Nullable<decimal> CouponPercentage { get; set; }
            public string CouponDescription { get; set; }
            public string CouponCode { get; set; }
        }

        [HttpGet]
        [Route("api/IndexPage/GetCopounDetais")]
        public IEnumerable GetCopounDetais(string sCouponId)
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                var ProductCopoun = (from p in db.CouponDetails.AsEnumerable()
                                     where p.Code == sCouponId && (p.ValidFrom <= currentdatetime && p.ValidTo >= currentdatetime)
                                     select new
                                     {
                                         p.DiscountPercentage,
                                         p.Description,
                                         p.Code,
                                         p.OfferType,
                                         p.ProductId,
                                         p.AmountFrom,
                                         p.AmountTo,
                                         ProdDetails = p.OfferType == "Free Product" ? p.ProductDetails.AsEnumerable().Select(t => new
                                         {
                                             t.ProductId,
                                             t.Title,
                                             variance = t.Variance == 1 ? t.ProductVariances.AsEnumerable().Select(s => new
                                             {
                                                 s.ProductVarianceId,
                                                 s.VarianceType
                                             }) : null
                                         }).Take(1) : null
                                     }).Take(1);

                return ProductCopoun;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductStockCount")]
        public IEnumerable GetProductStockCount(int iProdId)
        {
            try
            {
                var ProductCopoun = (from q in db.ProductStocks.AsEnumerable()
                                     where q.ProductId == iProdId
                                     select new
                                     {
                                         q.ProductId,
                                         q.StockCount,
                                         q.StockId
                                     });

                return ProductCopoun;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductDelCharges")]
        public IEnumerable GetProductDelCharges(int strCount)
        {
            
            var ProductCopoun = (from q in db.DeliveryCharges.AsEnumerable()
                                 where q.Fromprice <= Convert.ToDecimal(strCount) && q.Toprice >= Convert.ToDecimal(strCount) && q.IsActive==1
                                 orderby q.Qty descending
                                 select new
                                 {
                                     q.Price,
                                     q.Qty
                                 }).Take(1);

            return ProductCopoun;
        }

        [HttpGet]
        [Route("api/IndexPage/GetProductDelCharges1")]
        public IEnumerable GetProductDelCharges1(string strCount)
        {
            var ProductCopoun = (from q in db.DeliveryCharges.AsEnumerable()
                                 where q.Qty >= Convert.ToDecimal(strCount) && q.IsActive ==1
                                 orderby q.Qty
                                 select new
                                 {
                                     q.Price,
                                     q.Qty
                                 }).Take(1);

            return ProductCopoun;
        }


        [HttpGet]
        [Route("api/IndexPage/GetSearchItems")]
        public IEnumerable GetSearchItems(int iCatId, string strSearchText)
        {
            if (iCatId == 0)
            {
                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
                                     where p.Title.ToLower().Contains(strSearchText.Trim().ToLower())
                                     orderby p.ProductId descending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId
                                     }).Take(1);
                return TrendingItems;
            }
            else
            {
                var TrendingItems = (from n in db.Categories.AsEnumerable()
                                     join o in db.SubCategories.AsEnumerable() on n.CategoryId equals o.CategoryId
                                     join p in db.ProductDetails.AsEnumerable() on o.SubCategoryId equals p.SubCategoryId

                                     where n.CategoryId == iCatId && p.Title.ToLower().Contains(strSearchText.Trim().ToLower())

                                     orderby p.ProductId descending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId
                                     }).Take(1);

                return TrendingItems;
            }
        }

        [HttpGet]
        [Route("api/IndexPage/GetFreeSearchItems")]
        public IEnumerable GetFreeSearchItems(string strSearchText)
        {
            try
            {
                var TrendingItems = (from n in db.Categories.AsEnumerable()
                                     join o in db.SubCategories.AsEnumerable() on n.CategoryId equals o.CategoryId
                                     join p in db.ProductDetails.AsEnumerable() on o.SubCategoryId equals p.SubCategoryId
                                     join q in db.BrandTypes.AsEnumerable() on p.BrandTypeId equals q.BrandTypeId

                                     where (n.CategoyName.ToLower().Contains(strSearchText.Trim().ToLower()) || o.SubCategoryName.ToLower().Contains(strSearchText.Trim().ToLower()) || p.Title.ToLower().Contains(strSearchText.Trim().ToLower()))

                                     orderby p.ProductId descending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         CategoryId = n.CategoryId
                                     }).Take(1);

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/IndexPage/GetHomepageConfiguration")]
        public IEnumerable GetHomepageConfiguration()
        {
            var TrendingItems = (from n in db.HomePageSettings.AsEnumerable()
                                 select new
                                 {
                                     ShowSlider = n.ShowSlider,
                                     ShowTrendingItems = n.ShowTrendingItems,
                                     ShowNewItems = n.ShowNewItems,
                                     DisplayBannerImages = n.DisplayBannerImages,
                                     ShowAdvertisement = n.ShowAdvertisement,
                                     SliderImages = n.HomeSliderImages.AsEnumerable().Select(s => new
                                     {
                                         s.ImageUrl
                                     }),
                                     BannerImages = n.HomeBannerImages.AsEnumerable().Select(s => new
                                     {
                                         s.BannerImageURL
                                     })
                                 });

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/IndexPage/GetSiteSettingConfiguration")]
        public IEnumerable GetSiteSettingConfiguration()
        {
            var TrendingItems = (from n in db.Settings.AsEnumerable()
                                 select new
                                 {
                                     CurrencyType = n.CurrencyType,
                                     GridSizeClient = n.GridSizeClient,
                                     n.FotterImage,
                                     n.Themecolour,
                                     n.CouponApplicable
                                 });

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/IndexPage/GetSocialMediaLink")]
        public IEnumerable GetSocialMediaLink()
        {
            try
            {
                var TrendingItems = (from a in db.SocialMedias.AsEnumerable()
                                     join b in db.SocialMediaLinks.AsEnumerable() on a.SocialMediaId equals b.SocialMediaId
                                     select new
                                     {
                                         a.SocialMediaType,
                                         b.SocialMediaLink1
                                     });

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }
        [HttpGet]
        [Route("api/IndexPage/GetHomeSlider")]
        public IEnumerable GetHomeSlider()
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + (tsnow.Hours) + ":" + tsnow.Minutes);

                var ProductCopoun = (from q in db.HomeSliders.AsEnumerable()
                                     where q.IsActive == 1 && q.CutofDate >= currentdatetime
                                     select new
                                     {
                                         q.SliderName,
                                         q.ImageUrl
                                     });

                return ProductCopoun;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }


        [HttpGet]
        [Route("api/IndexPage/GetTodayDeals")]
        public IEnumerable GetTodayDeals()
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + "00" + ":" + "00");

                var ProductCopoun = (from q in db.TodayDeals.AsEnumerable()
                                     join r in db.ProductDetails.AsEnumerable() on q.ProductId equals r.ProductId
                                     where q.Date == currentdatetime
                                     select new
                                     {
                                         r.ProductId,
                                         r.Title,
                                         r.Description,
                                         r.Price,
                                         q.TodayDiscountAmount,
                                         Image1 = r.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ImageURL
                                         }).Take(1),
                                         ProdVariance = r.Variance == 1 ? r.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             t.VarianceType
                                         }).Take(1) : null,
                                         Discount = r.DiscountDetailsId != null ? Convert.ToString(r.DiscountDetail.DiscountPercentage) : ""

                                     });

                return ProductCopoun;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }
        //(Insert For SignUp)

        [HttpPost]
        [Route("api/IndexPage/InsertMemberDetail")]
        public IHttpActionResult InsertMemberDetails(string strMemberName, string strEmailId, string strPhoneNo, string strPassword, string strMobileToken)
        {
            try
            {
                bool varEmailIdExist = db.MemberDetails.Any(x => x.EmailId == strEmailId);
                if (varEmailIdExist)
                {
                    return Ok("Exist");
                }
                else
                {
                    var vPhone = Convert.ToInt64(strPhoneNo);
                    List<ProjectComInfo> vCompanyDetails = getComDetails();
                    MemberDetail vMem = new MemberDetail();
                    vMem.MemberName = strMemberName;
                    vMem.EmailId = strEmailId;
                    vMem.ContactNo = vPhone;
                    vMem.Password = strPassword;
                    vMem.IsActive = 1;
                    vMem.MobileToken = strMobileToken;
                    db.MemberDetails.Add(vMem);
                    db.SaveChanges();

                    var vMemberId = vMem.MemberId;
                    //db.MemberDetails.Add(memberdetail);
                    //memberdetail.IsActive = 1;
                    //string strPassword = CreateRandomPassword(7);
                    //db.SaveChanges();
                    MailMessage mailMsg = new MailMessage();
                    // From
                    MailAddress mailAddress = new MailAddress("contact@arcnuts.com", "Register Member Details");
                    //MailAddress mailAddress = new MailAddress("contact@sasinkar.in", "Register Member Details");

                    mailMsg.From = mailAddress;

                    // Subject and Body
                    mailMsg.Subject = "Register Member Details";
                    string messegeitem = string.Empty;

                    messegeitem = "<html> ";
                    messegeitem += "<head> ";
                    messegeitem += "<title> " + vCompanyDetails[0].CompanyName + " Confirmation </title>";
                    messegeitem += "</head>";
                    messegeitem += "<body style = \"padding:0px;margin:0px\" >";
                    messegeitem += "<div style = \"background-color:#f2f2f2;height:100%\" >";
                    messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" > ";
                    messegeitem += "<tbody>";
                    messegeitem += "<tr style = \"background-color:#232f3e\" >";
                    messegeitem += "<td align = \"center\" valign = \"top\" style = \"padding:0 20px\" >";
                    messegeitem += "<table align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                    messegeitem += "<tbody><tr> ";
                    messegeitem += "<td width = \"320\" align = \"center\" valign = \"top\" >";
                    messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                    messegeitem += "<tbody> ";
                    messegeitem += "<tr> ";
                    messegeitem += "<td height = \"30\" style = \"height:30px;line-height:30px;text-align:center\" > ";
                    messegeitem += "<img align = \"center\" border = \"0\" Width=300px\" alt = \"Sysmedac Ecom\" src =\"" + vCompanyDetails[0].WebsiteLogo + "\" style = \"margin:audio\" ><br><h2 style = \"margin:0px;font-family:Arial,sans-serif;font-size:20px;color:#3a3a3a;\" >  </h2></td>";
                    messegeitem += " </tr>";
                    messegeitem += " <tr> ";
                    messegeitem += " <td> </td> ";
                    messegeitem += " </tr>";
                    messegeitem += " </tbody> ";
                    messegeitem += " </table> ";
                    messegeitem += " </td> ";
                    messegeitem += " </tr> ";
                    messegeitem += " </tbody> ";
                    messegeitem += " </table> ";
                    messegeitem += " </td> ";
                    messegeitem += " </tr> ";
                    messegeitem += " </tbody>";
                    messegeitem += "</table>";
                    messegeitem += "<table width = \"76%\" align = \"center\" cellpadding =\"0\" cellspacing = \"0\" border = \"0\" style = \"background-color:#fff;box-shadow:0px 0px 5px #ccc;border-left:5px\">";
                    messegeitem += "<tbody> ";
                    messegeitem += "<tr> ";
                    messegeitem += "<td align = \"left\" valign = \"top\" style = \"padding:3%\" > ";
                    messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:17px;color:#3a3a3a;padding:15px\" > Hi &nbsp;" + strMemberName + ",</p>";
                    messegeitem += "<table width = \"100%\" style = \"font-family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\">";
                    messegeitem += "<tr></tr> ";
                    messegeitem += "<td width = \"100%\">Thanks for Registering With us ,Your Registration Credentials</td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr> ";
                    messegeitem += "<td width = \"100%\"></td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr> ";
                    messegeitem += "<td width = \"100%\"></td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr> ";
                    messegeitem += "<td width = \"100%\"> Name : " + strMemberName + "</td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr> ";
                    messegeitem += "<td width = \"100%\"> Phone : " + strPhoneNo + "</td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr> ";
                    messegeitem += "<td width = \"100%\"> UserId : " + strEmailId + "</td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr> ";
                    messegeitem += "<td width = \"100%\"> Password : " + strPassword + "</td><td></td>";
                    messegeitem += "</tr>";
                    messegeitem += "</table>";
                    messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\" >  Regards, <br/>" + vCompanyDetails[0].CompanyName + ".</p> ";
                    messegeitem += "<p style = \"text -align:left;font-family:Arial,sans-serif;color:#2f2f2f\" > ";
                    messegeitem += "</p><p style = \"text -align:justify;font-family:Arial,sans-serif;padding:15px;color:grey\" >";
                    messegeitem += "<small> CONFIDENTIALITY NOTICE:<br> ";
                    messegeitem += "Proprietary / Confidential information belonging to " + vCompanyDetails[0].CompanyName + " and its affiliates";
                    messegeitem += "may be contained in this message.If you are not a recipient indicated or intended in this message(or responsible for delivery of this message to such person), or you think for any reason that this message may have been addressed to you in error, you may not use or copy or deliver this message to anyone else.In such case, you should destroy this message and are asked to notify the sender by reply email.</small>";
                    messegeitem += "</p> ";
                    messegeitem += "<p></p> ";
                    messegeitem += "</td> ";
                    messegeitem += "</tr>";
                    messegeitem += "</tbody>";
                    messegeitem += "</table>";
                    messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                    messegeitem += "<tbody>";
                    messegeitem += "<tr>";
                    messegeitem += "<td><table width = \"40%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                    messegeitem += "<tbody><tr> ";
                    messegeitem += "<td colspan = \"3\" style = \"padding:10px\" >";
                    messegeitem += "</td>";
                    messegeitem += "</tr>";
                    messegeitem += "</tbody></table> </td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr>";
                    messegeitem += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr>";
                    messegeitem += "<td align = \"center\" valign = \"top\" style = \"color:#777777;font-family:Arial,sans-serif;font-size:12px;line-height:23px;font-weight:400\" > Copyright© -2019 " + vCompanyDetails[0].CompanyName + ".All Rights Reserved.";
                    messegeitem += "</td>";
                    messegeitem += "</tr>";
                    messegeitem += "<tr>";
                    messegeitem += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td> ";
                    messegeitem += "</tr> ";
                    messegeitem += "</tbody>";
                    messegeitem += "</table><div class=\"yj6qo\"></div><div class=\"adL\">";
                    messegeitem += "</div></div>";
                    messegeitem += " </body>";
                    messegeitem += "</html>";

                    mailMsg.Body = messegeitem;
                    mailMsg.To.Add(strEmailId);


                    mailMsg.IsBodyHtml = true;
                    SmtpClient emailClient = new SmtpClient("arcnuts.com", 587);
                    System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("contact@arcnuts.com", "yz~855lU");

                    emailClient.Credentials = credentials;
                    try
                    {
                        emailClient.Send(mailMsg);
                    }
                    catch (Exception ex)
                    {
                        string register = ex.ToString();
                    }


                    return Ok(vMemberId);

                }
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return Ok("TimeOut");
                }
                else
                    return null;
            }

        }

        //(Get for SignIn)
        [HttpGet]
        [Route("api/IndexPage/GetMemberDetailsByEmailId")]
        public IEnumerable GetMemberDetailByEmailId(string EmailId, string Password)
        {
            try
            {
                var a = (from p in db.MemberDetails.AsEnumerable()
                         where ((p.EmailId == EmailId) && (p.Password == Password))

                         select new MemberDetail
                         {
                             EmailId = p.EmailId,
                             Password = p.Password,
                             MemberName = p.MemberName,
                             MemberId = p.MemberId,

                         });

                return a;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        //( Get For EditProfile)
        [HttpGet]
        [Route("api/IndexPage/EditMemberProfile")]
        public IEnumerable EditProfile(int MemberId)
        {

            var a = (from p in db.MemberDetails.AsEnumerable()
                     where (p.MemberId == MemberId)

                     select new MemberDetail
                     {
                         EmailId = p.EmailId,
                         Password = p.Password,
                         ContactNo = p.ContactNo,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         State = p.State,
                         City = p.City,
                         PinCode = p.PinCode,
                         MemberName = p.MemberName,
                         MemberId = p.MemberId
                     });

            return a;
        }
        //Update (Post)
        [HttpPost]
        [Route("api/IndexPage/UpdateMemberProfile")]
        public IHttpActionResult UpdateProfiles([FromBody]JObject jsonString, int MemberId)
        {
            string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            ClinsertMemberDetail Objjson = JsonConvert.DeserializeObject<ClinsertMemberDetail>(json);
            var context = new EcommerceEntities();
            var result = context.MemberDetails.First(b => b.MemberId == MemberId);
            if (result != null)
            {
                result.MemberId = MemberId;
                result.MemberName = Objjson.MemberName.ToString();
                result.ContactNo = Objjson.ContactNo;
                result.EmailId = Objjson.EmailId;
                result.AddressLine1 = Objjson.AddressLine1;
                result.AddressLine2 = Objjson.AddressLine2;
                result.City = Objjson.City;
                result.State = Objjson.State;
                result.PinCode = Objjson.PinCode;

                context.SaveChanges();

            }
            return Ok();
        }

        [HttpGet]
        [Route("api/IndexPage/GetMemberDetailsMobileNo")]
        public IEnumerable GetMemberDetailsMobileNo(string MobileNo)
        {
            try
            {
                long? MobileNo1 = Convert.ToInt64(MobileNo);
                var result = db.MemberDetails.FirstOrDefault(x => x.ContactNo == MobileNo1);
                if (result == null)
                {
                    MemberDetail new1 = new MemberDetail();
                    new1.ContactNo = MobileNo1;
                    db.MemberDetails.Add(new1);
                    db.SaveChanges();
                }



                var a = from b in db.MemberDetails
                        where b.ContactNo == MobileNo1
                        select new
                        {
                            b.ContactNo,
                            b.MemberName,
                            b.MemberId,
                            b.EmailId
                        };



                return a;
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        private class ClinsertMemberDetail
        {
            public object MemberName { get; set; }
            public long? ContactNo { get; set; }
            public string EmailId { get; set; }
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public long? PinCode { get; set; }
        }



        private static string CreateRandomPassword(int passwordLength)
        {
            string allowedChars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@$?_-";
            char[] chars = new char[passwordLength];
            Random rd = new Random();

            for (int i = 0; i < passwordLength; i++)
            {
                chars[i] = allowedChars[rd.Next(0, allowedChars.Length)];
            }

            return new string(chars);
        }

        [HttpPost]
        [Route("api/IndexPage/ForgotPassword")]

        public IHttpActionResult ForgotPassword(string EmailId)
        {

            List<ProjectComInfo> vCompanyDetails = getComDetails();

            string strPassword = CreateRandomPassword(7);


            MailMessage mailMsg = new MailMessage();
            // From
            MailAddress mailAddress = new MailAddress("contact@arcnuts.com", "Conformation Code");


            mailMsg.From = mailAddress;

            // Subject and Body
            mailMsg.Subject = "Conformation Code For Forgot Password";
            string messegeitem = string.Empty;

            messegeitem = "<html> ";
            messegeitem += "<head> ";
            messegeitem += "<title> " + vCompanyDetails[0].CompanyName + " Confirmation </title>";
            messegeitem += "</head>";
            messegeitem += "<body style = \"padding:0px;margin:0px\" >";
            messegeitem += "<div style = \"background-color:#f2f2f2;height:100%\" >";
            messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" > ";
            messegeitem += "<tbody>";
            messegeitem += "<tr style = \"background-color:#232f3e\" >";
            messegeitem += "<td align = \"center\" valign = \"top\" style = \"padding:0 20px\" >";
            messegeitem += "<table align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            messegeitem += "<tbody><tr> ";
            messegeitem += "<td width = \"320\" align = \"center\" valign = \"top\" >";
            messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            messegeitem += "<tbody> ";
            messegeitem += "<tr> ";
            messegeitem += "<td height = \"15\" style = \"height:15px;line-height:15px;text-align:center\" > ";
            messegeitem += "<img align = \"center\" border = \"0\" Width=300px\" alt = \"Sysmedac Ecom\" src =\"" + vCompanyDetails[0].WebsiteLogo + "\" style = \"margin:audio\" ><br><h2 style = \"margin:0px;font-family:Arial,sans-serif;font-size:20px;color:#3a3a3a;\" >  </h2></td>";
            messegeitem += " </tr>";
            messegeitem += " <td> &nbsp;</td> ";
            messegeitem += " </tr>";
            messegeitem += " </tbody> ";
            messegeitem += " </table> ";
            messegeitem += " </td> ";
            messegeitem += " </tr> ";
            messegeitem += " </tbody> ";
            messegeitem += " </table> ";
            messegeitem += " </td> ";
            messegeitem += " </tr> ";
            messegeitem += " </tbody>";
            messegeitem += "</table>";
            messegeitem += "<table width = \"76%\" align = \"center\" cellpadding =\"0\" cellspacing = \"0\" border = \"0\" style = \"background-color:#fff;box-shadow:0px 0px 5px #ccc;border-left:5px\">";
            messegeitem += "<tbody> ";
            messegeitem += "<tr> ";
            messegeitem += "<td align = \"left\" valign = \"top\" style = \"padding:3%\" > ";
            messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:17px;color:#3a3a3a;padding:15px\"</p>";
            messegeitem += "<table width = \"100%\" style = \"font-family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\">";
            messegeitem += " <tr> You Requesting a Reset Password Code</tr> ";
            messegeitem += "<tr> ";
            messegeitem += "<td width = \"100%\"></td><td></td>";
            messegeitem += "</tr>";
            messegeitem += "<tr> ";
            // messegeitem += "<td width = \"100%\"> Name : " + Login.MemberName.ToString() + "</td><td></td>";
            messegeitem += "</tr>";
            messegeitem += "<tr> ";
            // messegeitem += "<td width = \"100%\"> Phone : " + Login.ContactNo.ToString() + "</td><td></td>";
            messegeitem += "</tr>";
            messegeitem += "<tr> ";
            messegeitem += "<td width = \"100%\"> code: " + strPassword + "</td><td></td>";
            messegeitem += "</tr>";
            messegeitem += "<tr> ";
            //  messegeitem += "<td width = \"100%\"> Password : " + Login.Password.Trim() + "</td><td></td>";
            messegeitem += "</tr>";
            messegeitem += "</table>";
            messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\" >  Regards, <br/>" + vCompanyDetails[0].CompanyName + ".</p> ";
            messegeitem += "<p style = \"text -align:left;font-family:Arial,sans-serif;color:#2f2f2f\" > ";
            messegeitem += "</p><p style = \"text -align:justify;font-family:Arial,sans-serif;padding:15px;color:grey\" >";
            messegeitem += "<small> CONFIDENTIALITY NOTICE:<br> ";
            messegeitem += "Proprietary / Confidential information belonging to " + vCompanyDetails[0].CompanyName + " and its affiliates";
            messegeitem += "may be contained in this message.If you are not a recipient indicated or intended in this message(or responsible for delivery of this message to such person), or you think for any reason that this message may have been addressed to you in error, you may not use or copy or deliver this message to anyone else.In such case, you should destroy this message and are asked to notify the sender by reply email.</small>";
            messegeitem += "</p> ";
            messegeitem += "<p></p> ";
            messegeitem += "</td> ";
            messegeitem += "</tr>";
            messegeitem += "</tbody>";
            messegeitem += "</table>";
            messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            messegeitem += "<tbody>";
            messegeitem += "<tr>";
            messegeitem += "<td><table width = \"40%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            messegeitem += "<tbody><tr> ";
            messegeitem += "<td colspan = \"3\" style = \"padding:10px\" >";
            messegeitem += "</td>";
            messegeitem += "</tr>";
            messegeitem += "</tbody></table> </td>";
            messegeitem += "</tr>";
            messegeitem += "<tr>";
            messegeitem += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td>";
            messegeitem += "</tr>";
            messegeitem += "<tr>";
            messegeitem += "<td align = \"center\" valign = \"top\" style = \"color:#777777;font-family:Arial,sans-serif;font-size:12px;line-height:23px;font-weight:400\" > Copyright© -2019 " + vCompanyDetails[0].CompanyName + ".All Rights Reserved.";
            messegeitem += "</td>";
            messegeitem += "</tr>";
            messegeitem += "<tr>";
            messegeitem += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td> ";
            messegeitem += "</tr> ";
            messegeitem += "</tbody>";
            messegeitem += "</table><div class=\"yj6qo\"></div><div class=\"adL\">";
            messegeitem += "</div></div>";
            messegeitem += " </body>";
            messegeitem += "</html>";

            mailMsg.Body = messegeitem;
            mailMsg.To.Add(EmailId);


            mailMsg.IsBodyHtml = true;
            SmtpClient emailClient = new SmtpClient("arcnuts.com", 587);
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("contact@arcnuts.com", "yz~855lU");

            emailClient.Credentials = credentials;
            try
            {

                //string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                //ClinsertMemberDetail Objjson = JsonConvert.DeserializeObject<ClinsertMemberDetail>(json);
                var context = new EcommerceEntities();
                var result = context.MemberDetails.First(b => b.EmailId == EmailId);
                if (result != null)
                {
                    emailClient.Send(mailMsg);
                    result.ConfirmationCode = strPassword;
                    context.SaveChanges();
                    return Ok("success");
                }
                else
                {
                    return Ok("Not Registered");
                }
            }
            catch (Exception ex)
            {
                string register = ex.ToString();
                return Ok("Error");
            }

            //return Ok("Success");

            //using (var mail = new MailMessage("contact@sysmedacmicrosoft.com", Login.EmailId))
            //{
            //    string body = "Your message : [Ipaddress]/Views/ForgotPassword.html";
            //    mail.Subject = "Forgot password";
            //    mail.Body = body;
            //    mail.IsBodyHtml = false;
            //    var smtp = new SmtpClient();
            //    smtp.Host = "smtp.gmail.com";
            //    smtp.EnableSsl = true;
            //    smtp.UseDefaultCredentials = false;
            //    smtp.Credentials = new NetworkCredential("contact@sysmedacmicrosoft.com", "6^6Ftr6a");
            //    smtp.Port = 587;
            //    smtp.Send(mail);
            //}

        }

        class ProjectComInfo
        {
            public string CompanyName { get; set; }
            public string EmailId { get; set; }
            public string WebsiteLogo { get; set; }

        }

        private List<ProjectComInfo> getComDetails()
        {
            var a = (from p in db.CompanyDetails.AsEnumerable()
                     select new ProjectComInfo()
                     {
                         CompanyName = p.CompanyName,
                         EmailId = p.EmailId,
                         WebsiteLogo = p.WebsiteLogo
                     });
            return a.ToList();
        }

        //( Get For ConfirmationCode)
        [HttpGet]
        [Route("api/IndexPage/ConfirmationCode")]
        public IEnumerable ConfirmationCode(string EmailId, string ConfirmationCode)
        {

            var a = (from p in db.MemberDetails.AsEnumerable()
                     where (p.EmailId == EmailId)

                     select new MemberDetail
                     {
                         EmailId = p.EmailId,
                         ConfirmationCode = p.ConfirmationCode
                     });

            return a;
        }

        //Update (Post For Change Password)
        [HttpPost]
        [Route("api/IndexPage/ChangePassword")]
        public IHttpActionResult ChangePassword(string EmailId, string ConfirmationCode, string Password)
        {
            string sEmptyCode = "";
            var context = new EcommerceEntities();
            var result = context.MemberDetails.First(b => b.EmailId == EmailId);
            if (result != null)
            {
                result.ConfirmationCode = sEmptyCode;
                result.Password = Password;

                context.SaveChanges();

            }
            return Ok("Success");
        }

        [HttpGet]
        [Route("api/Home/GetContactUsAdminId")]
        public IEnumerable GetContactUsAdminId()
        {
            var a = (from p in db.ContactUsAdmins.AsEnumerable()
                     select new
                     {
                         ContactNo = p.ContactNo

                     });
            return a;
        }

        [HttpPost]
        [Route("api/IndexPage/SaveMemberId")]
        public IHttpActionResult SaveMemberId(string strMemberId)
        {
            mStrMemberId = strMemberId;
            return Ok(strMemberId);
        }
        //GetMemberId
        [HttpGet]
        [Route("api/Home/GetMemberId")]
        public IEnumerable GetMemberId()
        {
            var a = mStrMemberId;
            return a;
        }
    }

    internal class CompanyDetails
    {
        public CompanyDetails()
        {
        }

        public string Domain { get; set; }
        public string SubDomain { get; set; }
        public string DB_Connection_String { get; set; }
        public string FileUploadURL { get; set; }
        public string EntityName { get;  set; }
    }
}
