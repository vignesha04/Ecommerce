using EcommerceAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
    public class TodayDealAdminController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/Todaydeal/GetCategoryDetails")]
        public IEnumerable<Category> GetCategorydetails(int CompanyDetailId)
        {
            var a = (from p in db.Categories.AsEnumerable()
                     where ((p.IsActive == 1) && (p.CompanyDetailId == CompanyDetailId))
                     select new Category
                     {
                         CompanyDetailId = p.CompanyDetailId,
                         CategoryId = p.CategoryId,
                         CategoyName = p.CategoyName,
                     });
            return a;
        }
        [HttpGet]
        [Route("api/Todaydeal/GetSubCategoryDetails")]
        public IEnumerable<SubCategory> GetSubCategorydetails(int CategoryId, int CompanyDetailId)
        {
            var a = (from p in db.SubCategories.AsEnumerable()
                     where p.CategoryId == CategoryId
                     where p.IsActive == 1
                     where p.CompanyDetailId == CompanyDetailId
                     select new SubCategory
                     {
                         CompanyDetailId = p.CompanyDetailId,
                         CategoryId = p.CategoryId,
                         SubCategoryId = p.SubCategoryId,
                         SubCategoryName = p.SubCategoryName,
                     });
            return a;
        }
        [HttpGet]
        [Route("api/Todaydeal/GetProductDetails")]
        public IEnumerable<ProductDetail> GetProductDetails(int SubCategoryId, int CompanyDetailId)
        {
            var a = (from p in db.ProductDetails.AsEnumerable()
                     where ((p.SubCategoryId == SubCategoryId) && (p.CompanyDetailId == CompanyDetailId))
                     select new ProductDetail
                     {
                         CompanyDetailId = p.CompanyDetailId,
                         SubCategoryId = p.SubCategoryId,
                         ProductId = p.ProductId,
                         Title = p.Title,
                     });
            return a;
        }

        [HttpGet]
        [Route("api/Todaydeal/GetTodaydealdetails")]
        public IEnumerable GetTodaydealdetails(int CompanyDetailId)
        {
            var no = 1;
            var a = (from k in db.TodayDeals.AsEnumerable()
                     join l in db.ProductDetails.AsEnumerable() on k.ProductId equals l.ProductId
                     join m in db.SubCategories.AsEnumerable() on l.SubCategoryId equals m.SubCategoryId
                     join n in db.Categories.AsEnumerable() on m.CategoryId equals n.CategoryId
                     orderby k.TodayDealId descending
                     where k.CompanyDetailId == CompanyDetailId
                     select new
                     {
                         sno = no++,
                         CompanyDetailId = k.CompanyDetailId,
                         TodayDealId = k.TodayDealId,
                         Date = Convert.ToDateTime(k.Date).ToString("dd/MM/yyyy"),
                         Title = l.Title,
                         TodayDiscountAmount = k.TodayDiscountAmount,
                         SubCategoryName = m.SubCategoryName,
                         CategoyName = n.CategoyName

                     });
            return a;
        }

        [HttpPost]
        [Route("api/Todaydeal/InsertTodaydealdetails")]
        public IHttpActionResult InsertProductStocks([FromBody]TodayDeal deal, int CompanyDetailId)
        {
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

            DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(deal.Date), timeZoneInfo);

            DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(deal.Date), timeZoneInfo);

            string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");

            TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;

            deal.Date = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
            deal.CompanyDetailId = CompanyDetailId;
            db.TodayDeals.Add(deal);
            db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/Todaydeal/GetSearch")]
        public IEnumerable GetSearch(string Search, int CompanyDetailId)
        {
            var vsno = 0;
            var a = (from k in db.TodayDeals.AsEnumerable()
                     join l in db.ProductDetails.AsEnumerable() on k.ProductId equals l.ProductId
                     join m in db.SubCategories.AsEnumerable() on l.SubCategoryId equals m.SubCategoryId
                     join n in db.Categories.AsEnumerable() on m.CategoryId equals n.CategoryId
                     where k.CompanyDetailId == CompanyDetailId && (k.Date.ToString().Contains(Search.ToString()) || k.TodayDiscountAmount.ToString().Contains(Search.ToString()) || l.Title.ToLower().Contains(Search.ToLower()) || m.SubCategoryName.ToLower().Contains(Search.ToLower()) || n.CategoyName.ToLower().Contains(Search.ToLower()))
                     orderby k.TodayDealId descending
                     select new
                     {
                         sno = ++vsno,
                         CompanyDetailId = k.CompanyDetailId,
                         TodayDealId = k.TodayDealId,
                         Date = Convert.ToDateTime(k.Date).ToString("dd/MM/yyyy"),
                         Title = l.Title,
                         TodayDiscountAmount = k.TodayDiscountAmount,
                         SubCategoryName = m.SubCategoryName,
                         CategoyName = n.CategoyName
                     });
            return a;
        }
    }
}
