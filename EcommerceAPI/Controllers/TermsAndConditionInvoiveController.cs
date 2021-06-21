using EcommerceAPI.Models;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class TermsAndConditionInvoiveController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/TermsAndConditionInvoive/")]
        public IEnumerable<TermsAndConditionInvoive> Get()
        {
            return db.TermsAndConditionInvoives.ToList();
        }

        [HttpGet]
        [Route("api/TermsAndConditionInvoive/GetTermsInvoive")]
        public IEnumerable<TermsAndConditionInvoive> GetTermsInvoive(int CompanyId)
        {
            try
            {
                log.Debug("GetTermsInvoive");
                var a = (from p in db.TermsAndConditionInvoives.AsEnumerable()
                         where (p.CompanyDetailId == CompanyId)
                         select new TermsAndConditionInvoive
                         {
                             CompanyDetailId = p.CompanyDetailId,
                             InvoiveTermsAndConditionId = p.InvoiveTermsAndConditionId,
                             InvoiceTermsAndCondition = p.InvoiceTermsAndCondition
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
        [Route("api/TermsAndConditionInvoive/InsertTermsInvoive")]
        public IHttpActionResult InsertTermsInvoive([FromBody]JObject jsonString, int CompanyId)
        {
            try
            {
                log.Debug("InsertTermsInvoive");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinsertterminvoive objjson = JsonConvert.DeserializeObject<clinsertterminvoive>(json);
                //var result = db.TermsAndConditionInvoives.First(b => b.CompanyDetailId == CompanyId);
                
                if (objjson.Name1 != null && objjson.Name1 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name1;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name2 != null && objjson.Name2 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name2;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name3 != null && objjson.Name3 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name3;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name4 != null && objjson.Name4 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name4;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name5 != null && objjson.Name5 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name5;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name6 != null && objjson.Name6 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name6;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name7 != null && objjson.Name7 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name7;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name8 != null && objjson.Name8 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name8;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name9 != null && objjson.Name9 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name9;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name10 != null && objjson.Name10 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name10;
                    db.TermsAndConditionInvoives.Add(terms);
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
        [Route("api/TermsAndConditionInvoive/UpdateTermsInvoive")]
        public IHttpActionResult UpdateTermsInvoive([FromBody]JObject jsonString, int CompanyId)
        {
            try
            {
                log.Debug("UpdateTermsInvoive");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinsertterminvoive objjson = JsonConvert.DeserializeObject<clinsertterminvoive>(json);

                db.TermsAndConditionInvoives.RemoveRange(db.TermsAndConditionInvoives.Where(p => p.CompanyDetailId == CompanyId));
                db.SaveChanges();

                if (objjson.Name1 != null && objjson.Name1 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name1;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name2 != null && objjson.Name2 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name2;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name3 != null && objjson.Name3 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name3;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name4 != null && objjson.Name4 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name4;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name5 != null && objjson.Name5 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name5;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name6 != null && objjson.Name6 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name6;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name7 != null && objjson.Name7 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name7;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name8 != null && objjson.Name8 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name8;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name9 != null && objjson.Name9 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name9;
                    db.TermsAndConditionInvoives.Add(terms);
                    db.SaveChanges();
                }
                if (objjson.Name10 != null && objjson.Name10 != "")
                {
                    TermsAndConditionInvoive terms = new TermsAndConditionInvoive();
                    terms.CompanyDetailId = CompanyId;
                    terms.InvoiceTermsAndCondition = objjson.Name10;
                    db.TermsAndConditionInvoives.Add(terms);
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
    }
    public class clinsertterminvoive
    {
        public string Name1 { get; set; }
        public string Name2 { get; set; }
        public string Name3 { get; set; }
        public string Name4 { get; set; }
        public string Name5 { get; set; }
        public string Name6 { get; set; }
        public string Name7 { get; set; }
        public string Name8 { get; set; }
        public string Name9 { get; set; }
        public string Name10 { get; set; }
        
    }
}
