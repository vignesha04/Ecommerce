using EcommerceAPI.Models;
using log4net;
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
    public class TermsAndConditionController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        private EcommerceEntities db = new EcommerceEntities();


        [HttpGet]
        [Route("api/TermsAndCondition/GetEcommerceAPI")]
        public IEnumerable GetEcommerceAPI(int CompanyDetailId)
        {
            try
            {
                log.Debug("GetEcommerceAPI");
                var a = (from k in db.TermsAndConditions.AsEnumerable()
                         where (k.CompanyDetailId == CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = k.CompanyDetailId,
                             TermsAndConditionId = k.TermsAndConditionId,
                             TermsAndConditions = k.TermsAndConditions
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
        [Route("api/TermsAndCondition/GetTermsAndCondition")]
        public IEnumerable GetTermsAndCondition()
        {
            try
            {
                log.Debug("GetEcommerceAPI");
                var a = (from k in db.TermsAndConditions.AsEnumerable()
                       
                         select new
                         {
                             CompanyDetailId = k.CompanyDetailId,
                             TermsAndConditionId = k.TermsAndConditionId,
                             TermsAndConditions = k.TermsAndConditions
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
        [Route("api/TermsAndCondition/InsertTerms")]
        public IHttpActionResult InsertTermsAndCondition([FromBody]JObject jsonString, int CompanyDetailId)
        {
            try
            {
                log.Debug("InsertTerms");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clsTermsAndConditions objjson = JsonConvert.DeserializeObject<clsTermsAndConditions>(json);

                if (objjson.Name01 != null && objjson.Name01 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name01;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name02 != null && objjson.Name02 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name02;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name03 != null && objjson.Name03 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name03;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name04 != null && objjson.Name04 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name04;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name05 != null && objjson.Name05 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name05;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name06 != null && objjson.Name06 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name06;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name07 != null && objjson.Name07 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name07;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name08 != null && objjson.Name08 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name08;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name09 != null && objjson.Name09 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name09;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name10 != null && objjson.Name10 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name10;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                  return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        [HttpPost]
        [Route("api/TermsAndCondition/UpdateTermsAndCondition")]
        public IHttpActionResult UpdateTermsAndCondition([FromBody]JObject jsonString, int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateTermsAndCondition");

                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clsTermsAndConditions objjson = JsonConvert.DeserializeObject<clsTermsAndConditions>(json);

                db.TermsAndConditions.RemoveRange(db.TermsAndConditions.Where(p=>p.CompanyDetailId==CompanyDetailId));
                db.SaveChanges();

                if (objjson.Name01 != null && objjson.Name01 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.TermsAndConditions = objjson.Name01;
                    Terms.CompanyDetailId = CompanyDetailId;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name02 != null && objjson.Name02 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.TermsAndConditions = objjson.Name02;
                    Terms.CompanyDetailId = CompanyDetailId;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name03 != null && objjson.Name03 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.TermsAndConditions = objjson.Name03;
                    Terms.CompanyDetailId = CompanyDetailId;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name04 != null && objjson.Name04 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name04;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name05 != null && objjson.Name05 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name05;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name06 != null && objjson.Name06 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name06;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name07 != null && objjson.Name07 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name07;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name08 != null && objjson.Name08 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name08;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name09 != null && objjson.Name09 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name09;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name10 != null && objjson.Name10 != "")
                {
                    TermsAndCondition Terms = new TermsAndCondition();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.TermsAndConditions = objjson.Name10;
                    db.TermsAndConditions.Add(Terms);
                    db.SaveChanges();
                }

                return Ok();

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/Privacypolicy/InsertPrivacypolicy")]
        public IHttpActionResult InsertPrivacypolicy([FromBody]JObject jsonString, int CompanyDetailId)
        {
            try
            {
                log.Debug("InsertPrivacypolicy");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clsPrivacypolicy objjson = JsonConvert.DeserializeObject<clsPrivacypolicy>(json);

                if (objjson.Name01 != null && objjson.Name01 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name01;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name02 != null && objjson.Name02 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name02;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name03 != null && objjson.Name03 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name03;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name04 != null && objjson.Name04 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name04;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name05 != null && objjson.Name05 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name05;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name06 != null && objjson.Name06 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name06;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name07 != null && objjson.Name07 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name07;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name08 != null && objjson.Name08 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name08;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name09 != null && objjson.Name09 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name09;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name10 != null && objjson.Name10 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name10;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/Privacypolicy/UpdatePrivacypolicy")]
        public IHttpActionResult UpdatePrivacypolicy([FromBody]JObject jsonString, int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdatePrivacypolicy");

                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clsPrivacypolicy objjson = JsonConvert.DeserializeObject<clsPrivacypolicy>(json);

                db.PrivacyPolicies.RemoveRange(db.PrivacyPolicies.Where(p => p.CompanyDetailId == CompanyDetailId));
                db.SaveChanges();

                if (objjson.Name01 != null && objjson.Name01 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name01;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name02 != null && objjson.Name02 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name02;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name03 != null && objjson.Name03 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name03;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name04 != null && objjson.Name04 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name04;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name05 != null && objjson.Name05 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name05;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name06 != null && objjson.Name06 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name06;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name07 != null && objjson.Name07 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name07;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name08 != null && objjson.Name08 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name08;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name09 != null && objjson.Name09 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name09;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }
                if (objjson.Name10 != null && objjson.Name10 != "")
                {
                    PrivacyPolicy Terms = new PrivacyPolicy();
                    Terms.CompanyDetailId = CompanyDetailId;
                    Terms.PrivacyPolicies = objjson.Name10;
                    db.PrivacyPolicies.Add(Terms);
                    db.SaveChanges();
                }

                return Ok();

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/Privacypolicy/GetPrivacypolicy")]
        public IEnumerable GetPrivacypolicy(int CompanyDetailId)
        {
            try
            {
                log.Debug("GetPrivacypolicy");
                var a = (from k in db.PrivacyPolicies.AsEnumerable()
                         where (k.CompanyDetailId == CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = k.CompanyDetailId,
                             PrivacyPolicyId = k.PrivacyPolicyId,
                             PrivacyPolicies = k.PrivacyPolicies
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

    internal class clsPrivacypolicy
    {
        public string Name01 { get;  set; }
        public string Name02 { get;  set; }
        public string Name03 { get;  set; }
        public string Name04 { get;  set; }
        public string Name05 { get;  set; }
        public string Name06 { get;  set; }
        public string Name07 { get;  set; }
        public string Name08 { get;  set; }
        public string Name09 { get;  set; }
        public string Name10 { get;  set; }
    }

    public class clsTermsAndConditions
    {
        public string Name01 { get; set; }
        public string Name02 { get; set; }
        public string Name03 { get; set; }
        public string Name04 { get; set; }
        public string Name05 { get; set; }
        public string Name06 { get; set; }
        public string Name07 { get; set; }
        public string Name08 { get; set; }
        public string Name09 { get; set; }
        public string Name10 { get; set; }
        public object TermsAndConditions { get; internal set; }
    }
}
