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

namespace EcommerceAPI.Controllers{
    [EnableCors("*", "*", "*", "*")]

    public class CouponCodeController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        private EcommerceEntities db = new EcommerceEntities();
        //save
        [HttpPost]
        [Route("api/CouponDetail/InsertCouponCode")]
        public IHttpActionResult InsertCouponCode([FromBody] JObject jsonString,int CompanyId)
        {
            try
            {
                log.Debug("InsertCouponCode");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo); 



                ClinsertCouponDetail Objjson = JsonConvert.DeserializeObject<ClinsertCouponDetail>(json);
                var context = new EcommerceEntities();
                CouponDetail objsCouponDetails = new CouponDetail();
                //Objjson.companyi = 1;
                objsCouponDetails.Name = Objjson.Name;
                objsCouponDetails.Code = Objjson.Code;
               // objsCouponDetails.Description = Objjson.Description;
               
                objsCouponDetails.InsertedBy = 1;
                objsCouponDetails.InsertedDate = DateTime.Now.ToLocalTime();
                objsCouponDetails.CompanyDetailId = CompanyId;                                
                objsCouponDetails.ProductId = Objjson.ProductId;
                if(Objjson.OfferType == "Amount")
                {
                    objsCouponDetails.OfferType = "A";
                    objsCouponDetails.AmountFrom = Objjson.Amount;
                    objsCouponDetails.DiscountPercentage = 0;
                }

                else
                {
                    objsCouponDetails.OfferType = "P";
                    objsCouponDetails.DiscountPercentage = Objjson.DiscountPercentage;
                    objsCouponDetails.AmountFrom = 0;

                }
                

                if (Objjson.IsActive == true)
                    objsCouponDetails.IsActive = 1;
                else
                    objsCouponDetails.IsActive = 0;

                

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidFrom), timeZoneInfo);
                DateTime dtCheckout = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidTo), timeZoneInfo);


                DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidFrom), timeZoneInfo);
                DateTime dtCheckouttime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidTo), timeZoneInfo);


                string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");
                string chkoutdate = Convert.ToDateTime(dtCheckout).ToString("yyyy-MM-dd");

                TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;
                TimeSpan tsout = Convert.ToDateTime(dtCheckouttime).TimeOfDay;


                objsCouponDetails.ValidFrom = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
                objsCouponDetails.ValidTo = Convert.ToDateTime(chkoutdate + " " + tsout.Hours + ":" + tsout.Minutes);
                objsCouponDetails.Code = Objjson.Code;

                var descExist = db.CouponDetails.Any(x => x.Name == objsCouponDetails.Name && x.CompanyDetailId== CompanyId);
                var CodeExist = db.CouponDetails.Any(c => c.Code == objsCouponDetails.Code);
                if (descExist)
                {
                    return Ok("Exist");
                }
                else if (CodeExist)

                {
                    return Ok("CodeExist");
                }
                else {
                    context.CouponDetails.Add(objsCouponDetails);
                    context.SaveChanges();
                    return Ok("Not Exist");
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
            //grid bind
            [HttpGet]
            [Route("api/CouponDetail/GetCouponCode")]
            public IEnumerable GetCouponCode(int CompanyId, int iActive)
            {
            try
            {
                var vSno = 0;
                var a = (from p in db.CouponDetails.AsEnumerable()
                         where(p.IsActive==iActive && p.CompanyDetailId== CompanyId)
                         orderby p.CouponId descending
                         select new
                         {
                             Sno = ++vSno,
                             CouponId = p.CouponId,
                             Name = p.Name,
                             Code = p.Code,
                             //Description = p.Description,
                             DiscountPercentage = p.DiscountPercentage,
                             CompanyDetailId= p.CompanyDetailId,
                             AmountFrom= p.AmountFrom,
                             OfferType= p.OfferType,
                             ValidFrom = Convert.ToDateTime(p.ValidFrom).ToString("dd/MM/yyyy"),
                             ValidTo = Convert.ToDateTime(p.ValidTo).ToString("dd/MM/yyyy"),
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                             IsActive1 = p.IsActive == 1 ? "Active" : "InActive"
                         });
                return a;
             }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        //Edit
        [HttpGet]
        [Route("api/CouponDetail/GetCouponId")]
        public IEnumerable GetCouponId(int CouponId, int CompanyId)
        {
            try {
                log.Debug("GetCouponId");
                var a = (from p in db.CouponDetails.AsEnumerable()
                     where (p.CouponId == CouponId)&&(p.CompanyDetailId==CompanyId)
                     orderby p.CouponId descending
                     select new 
                     {
                         CouponId = p.CouponId,
                         Name = p.Name,
                         Code = p.Code,
                         Description = p.Description,
                         DiscountPercentage = p.DiscountPercentage,
                         ValidFrom = p.ValidFrom,
                         ValidTo = p.ValidTo,
                         CompanyDetailId = p.CompanyDetailId,
                         IsActive = p.IsActive,
                         AmountFrom=p.AmountFrom,
                         AmountTo=p.AmountTo,
                         ProductId=p.ProductId,
                         OfferType=p.OfferType
                     });

            return a;

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }
        //Update

        [HttpPost]
        [Route("api/CouponDetail/UpdateCouponCode")]
        public IHttpActionResult UpdateSalesvisit([FromBody] JObject jsonString, int CouponId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateCouponCode");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                ClinsertCouponDetail Objjson = JsonConvert.DeserializeObject<ClinsertCouponDetail>(json);
                var context = new EcommerceEntities();

                var result = context.CouponDetails.First(b => b.CouponId == CouponId);

                if (result != null)
                {
                    result.CouponId = CouponId;
                    result.Name = Objjson.Name;
                    //result.Description = Objjson.Description;
                    //result.DiscountPercentage = Objjson.DiscountPercentage;
                    result.Code = Objjson.Code;
                    result.ValidFrom = Objjson.ValidFrom;
                    result.ValidTo = Objjson.ValidTo;
                    result.CompanyDetailId = CompanyId;
                   // result.AmountFrom = Objjson.AmountFrom;
                   // result.AmountTo = Objjson.AmountTo;
                    result.ProductId = Objjson.ProductId;
                    result.OfferType = Objjson.OfferType;

                    if (Objjson.OfferType == "Amount")
                    {
                        result.OfferType = "A";
                        result.AmountFrom = Objjson.Amount;
                        result.DiscountPercentage = 0;
                    }

                    else
                    {
                        result.OfferType = "P";
                        result.DiscountPercentage = Objjson.DiscountPercentage;
                        result.AmountFrom = 0;

                    }

                    if (Objjson.IsActive == true)
                        result.IsActive = 1;
                    else
                        result.IsActive = 0;

                    TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                    DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                    string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                    TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                    DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                    DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidFrom), timeZoneInfo);
                    DateTime dtCheckout = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidTo), timeZoneInfo);


                    DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidFrom), timeZoneInfo);
                    DateTime dtCheckouttime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(Objjson.ValidTo), timeZoneInfo);


                    string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");
                    string chkoutdate = Convert.ToDateTime(dtCheckout).ToString("yyyy-MM-dd");

                    TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;
                    TimeSpan tsout = Convert.ToDateTime(dtCheckouttime).TimeOfDay;

                    result.ValidFrom = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
                    result.ValidTo = Convert.ToDateTime(chkoutdate + " " + tsout.Hours + ":" + tsout.Minutes);

                    context.SaveChanges();

                    var query = from sched in context.CouponDetails
                                where sched.CouponId == Objjson.CouponId
                                select sched;

                    bool resultexist = query.Any();

                    if (resultexist == true)
                    {
                        return Ok("Duplicate");
                    }

                    var query1 = from sched in context.CouponDetails
                                 where sched.CouponId == Objjson.CouponId
                                 select sched;

                    bool result1 = query1.Any();

                    if (result1 == true)
                    {
                        return Ok("Duplicate");

                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        
        //serach
        [HttpGet]
        [Route("api/CouponDetails/GetCouponSearch")]
        public IEnumerable GetSearchCouponCode(string Search,int CompanyId, int Status)
        {
            try {
                log.Debug("GetCouponSearch");
                var vSno = 0;
                var a = (from p in db.CouponDetails.AsEnumerable()
                     where( p.IsActive== Status && p.CompanyDetailId==CompanyId && (p.Name.ToString().Contains(Search.ToLower()) || p.Code.ToString().Contains(Search.ToLower()) || p.DiscountPercentage.ToString().Contains(Search.ToString()) || p.ValidFrom.ToString().Contains(Search.ToString()) || p.ValidTo.ToString().Contains(Search.ToString()))) 
                     orderby p.CouponId descending
                     select new
                     {
                         Sno = ++vSno,
                         Name = p.Name,
                         Code = p.Code,
                         DiscountPercentage = p.DiscountPercentage,
                         CompanyDetailId = p.CompanyDetailId,
                         ValidFrom = Convert.ToDateTime(p.ValidFrom).ToString("dd/MM/yyyy"),
                         ValidTo = Convert.ToDateTime(p.ValidTo).ToString("dd/MM/yyyy"),
                         IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                         IsActive1 = p.IsActive == 1 ? "Active" : "InActive"
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
        [Route("api/CouponDetails/GetProducts")]
        public IEnumerable GetProducts()
        {
            try
            {
                var a = (from o in db.ProductDetails.AsEnumerable()
                         join p in db.ProductVariances.AsEnumerable() on o.ProductId equals p.ProductId 
                         //from p in ps.DefaultIfEmpty()
                         where (o.IsActive == 1)
                         orderby o.Title
                         select new
                         {
                             ProdName = o.Title,
                             p.VarianceType,
                             ProdId = o.ProductId,
                             p.ProductVarianceId
                         });
                return a;

                //string strQuery = "select Title+' '+ISNULL(VarianceType,'') as ProdName,convert(varchar, ProductDetail.ProductId)+'|'+ISNULL(convert(varchar,ProductVarianceId),'') as ProdId from ProductDetail left outer join ProductVariance on ProductDetail.ProductId=ProductVariance.ProductId where ProductDetail.IsActive=1";


                //string tableName = "ProductDetail";
                //var results = db.Database.SqlQuery<Product>(strQuery, tableName).ToList();

                //return results;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }
        class Product
        {
            public string ProdName { get; set; }
            public string ProdId { get; set; }
        }

    }
    public class ClinsertCouponDetail
    {
        public string Name { get; set; }
        public string Code { get; set; }
      //  public string Description { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public long CouponId { get; internal set; }
        public long? CompanyDetailId { get; internal set; }
        public bool IsActive { get; set; }
        public decimal AmountFrom { get; set; }
       // public decimal AmountTo { get; set; }
        public long? ProductId { get; set; }
        public string OfferType { get; set; }
        public decimal? Amount { get;  set; }
    }


    
}




