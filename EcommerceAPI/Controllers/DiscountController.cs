  
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
    public class DiscountController : ApiController
    {
        private static readonly log4net.ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();

        [HttpPost]
        [Route("api/DiscountDetail/InsertDiscountDetail")]
        public IHttpActionResult InsertDiscountDetails([FromBody]JObject jsonString, int CompanyId)
        {
            try
            {
                log.Debug("InsertDiscountDetail");
               
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            ClinsertDiscountDetails objjson = JsonConvert.DeserializeObject<ClinsertDiscountDetails>(json);
              
            var context = new EcommerceEntities();
            DiscountDetail objdis = new DiscountDetail();
            objdis.DiscountDetailsId = objjson.DiscountDetailsId;
            objdis.Description = objjson.Description;
            objdis.DiscountPercentage = objjson.DiscountPercentage;
            objdis.CompanyDetailId = CompanyId;

            if (objjson.IsActive == true)
                objdis.IsActive = 1;
            else
                objdis.IsActive = 0;

            objdis.InsertedBy = 1;
            objdis.InsertedDate = DateTime.Now;

            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
                
            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

            DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(objjson.ValidFrom), timeZoneInfo);
            DateTime dtCheckout = TimeZoneInfo.ConvertTime(Convert.ToDateTime(objjson.ValidTo), timeZoneInfo);


            DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(objjson.ValidFrom), timeZoneInfo);
            DateTime dtCheckouttime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(objjson.ValidTo), timeZoneInfo);


            string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");
            string chkoutdate = Convert.ToDateTime(dtCheckout).ToString("yyyy-MM-dd");

            TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;
            TimeSpan tsout = Convert.ToDateTime(dtCheckouttime).TimeOfDay;


            objdis.ValidFrom = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
            objdis.ValidTo = Convert.ToDateTime(chkoutdate + " " + tsout.Hours + ":" + tsout.Minutes);

            var descExist = db.DiscountDetails.Any(x => x.Description == objdis.Description && x.CompanyDetailId==CompanyId);
            if (descExist)
            {
                return Ok("Exist");
            }
            else
            {

                context.DiscountDetails.Add(objdis);
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
        
        [HttpGet]
        [Route("api/DiscountDetail/GetDiscountDetails")]
        public IEnumerable GetDiscountDetails(int CompanyId, int iActive)
        {
            try
            {
                log.Debug("GetDiscountDetails");
                
            var vsno = 0;
            var a = (from p in db.DiscountDetails.AsEnumerable()
                     where (p.IsActive==iActive && p.CompanyDetailId== CompanyId)
                     orderby p.DiscountDetailsId descending
                     select new
                     {
                         sno = ++vsno,
                         DiscountDetailsId = p.DiscountDetailsId,
                         Description = p.Description,
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

        //Edit (Get)
        [HttpGet]
        [Route("api/DiscountDetail/GetDiscountDetailsById")]
        public IEnumerable GetDiscountDetailsById(int DiscountDetailsId, int CompanyId)
        {
            try
            {
                log.Debug("GetDiscountDetailsById");
                var a = (from p in db.DiscountDetails.AsEnumerable()
                     where ((p.DiscountDetailsId == DiscountDetailsId)&&(p.CompanyDetailId== CompanyId))
                    orderby p.DiscountDetailsId descending
                     select new
                     { 
                         
                         DiscountDetailsId = p.DiscountDetailsId,
                         Description = p.Description,
                         DiscountPercentage = p.DiscountPercentage,
                         CompanyDetailId = p.CompanyDetailId,
                         ValidFrom = p.ValidFrom,
                         ValidTo=p.ValidTo,
                         IsActive=p.IsActive
                     });

            return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        //Update (Post)
        [HttpPost]
        [Route("api/DiscountDetail/UpdateDiscountDetails")]
        public IHttpActionResult UpdateDiscountDetails([FromBody]JObject jsonString, int DiscountDetailsId,int CompanyId)
        {
            try
            {
                log.Debug("UpdateDiscountDetails");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            ClinsertDiscountDetails Objjson = JsonConvert.DeserializeObject<ClinsertDiscountDetails>(json);
            var context = new EcommerceEntities();
            var result = context.DiscountDetails.First(b => b.DiscountDetailsId == DiscountDetailsId);
            if (result != null)
            {
                result.DiscountDetailsId = DiscountDetailsId;
                result.Description = Objjson.Description.ToString();
                result.DiscountPercentage = Objjson.DiscountPercentage;
                result.ValidFrom = Objjson.ValidFrom;
                result.ValidTo = Objjson.ValidTo;
                result.CompanyDetailId = CompanyId;

            if (Objjson.IsActive == true)
                result.IsActive = 1;
            else
                result.IsActive = 0;

                result.UpdatedBy = 1;
                result.UpdatedDate = DateTime.Now;
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

            }
            return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        //(Search)
        [HttpGet]
        [Route("api/DiscountDetail/GetSearch")]
        public IEnumerable GetSearch(string Search, int CompanyId, int Status)
        {
            try
            {
                log.Debug("GetSearch");
                var vsno = 0;
                var a = (from p in db.DiscountDetails.AsEnumerable()
                     where(p.IsActive==Status && p.CompanyDetailId == CompanyId && (p.Description.ToLower().Contains(Search.Trim().ToLower()) || p.DiscountPercentage.ToString().Contains(Search.ToLower())))
                     orderby p.DiscountDetailsId descending
                     select new
                     {

                         sno = ++vsno,
                         DiscountDetailsId = p.DiscountDetailsId,
                         Description = p.Description,
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
    }
    
    public class ClinsertDiscountDetails
    {
        public bool IsActive { get; set; }
        public string Description { get;  set; }
        public decimal DiscountPercentage { get;  set; }
        public long DiscountDetailsId { get;  set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public long? CompanyDetailId { get; internal set; }
    }

}












