using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EcommerceAPI.Models;
using log4net;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class TaxDetailsController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        [HttpGet]
        [Route("api/TaxDetails/")]
        public IEnumerable<TaxDetail> Get()
        {
            return db.TaxDetails.ToList();
        }
        [HttpGet]
        [Route("api/TaxDetails/GetTaxDetails")]
        public IEnumerable GetTaxDetails(int iActive, int CompanyId)
        {
            try
            {
                log.Debug("GetTaxDetails");
                var vSno = 0;
                var a = (from p in db.TaxDetails.AsEnumerable()
                         where (p.IsActive == iActive && p.CompanyDetailId== CompanyId)
                         orderby p.TaxDetailsId descending
                         select new
                         {
                             Sno = ++vSno,
                             TaxDetailsId = p.TaxDetailsId,
                             CGSTPercentage = p.CGSTPercentage,
                             SGSTPercentage = p.SGSTPercentage,
                             IGSTPercentage = p.IGSTPercentage,
                             Percentage= p.Percentage,
                             CompanyDetailId=p.CompanyDetailId,
                             ProductId= p.ProductId,
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
        [Route("api/TaxDetails/GetTaxDetailsId")]
        public IEnumerable GetTaxDetailsId(int TaxId, int CompanyId)
        {
            try
            {
                log.Debug("GetTaxDetailsId");
                var a = (from p in db.TaxDetails.AsEnumerable()
                         where (p.TaxDetailsId == TaxId && p.CompanyDetailId==CompanyId)
                         select new
                         {
                             TaxDetailsId = p.TaxDetailsId,
                             IGSTPercentage = p.IGSTPercentage,
                             CGSTPercentage = p.CGSTPercentage,
                             SGSTPercentage = p.SGSTPercentage,
                             CompanyDetailId =p.CompanyDetailId,
                             IsActive = p.IsActive,
                             CategoryId= p.CategoryId,
                             SubCategoryId= p.SubCategoryId,
                             ProductId= p.ProductId,
                             Percentage=p.Percentage,
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
        [Route("api/TaxDetails/InsertTaxDetails")]
        public IHttpActionResult InsertTaxDetails([FromBody] JObject jsonString, int CompanyId)
        {
            try
            {
                log.Debug("InsertTaxDetails");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinserttaxdetail objjson = JsonConvert.DeserializeObject<clinserttaxdetail>(json);
                var context = new EcommerceEntities();
               
                var descExist = db.TaxDetails.Any(x => x.ProductId == objjson.ProductId && x.CompanyDetailId == CompanyId);
                if (descExist)
                {
                    return Ok("Exist");
                }
                else
                {
                    TaxDetail objtaxdetail = new TaxDetail();
                    objtaxdetail.TaxDetailsId = objjson.TaxDetailsId;
                    objtaxdetail.CGSTPercentage = objjson.CGSTPercentage;
                    objtaxdetail.SGSTPercentage = objjson.SGSTPercentage;
                    objtaxdetail.IGSTPercentage = objjson.IGSTPercentage;
                        objtaxdetail.Percentage = objjson.Percentage;
                    objtaxdetail.CategoryId = objjson.CategoryId;
                    objtaxdetail.SubCategoryId = objjson.SubCategoryId;
                    objtaxdetail.ProductId = objjson.ProductId;
                    objtaxdetail.CompanyDetailId = CompanyId;
                    if (objjson.IsActive == true)
                        objtaxdetail.IsActive = 1;
                    else
                        objtaxdetail.IsActive = 0;

                    objtaxdetail.InsertedBy = 1;
                    objtaxdetail.InsertedDate = DateTime.Now;
                    context.TaxDetails.Add(objtaxdetail);
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
        [HttpPost]
        [Route("api/TaxDetails/UpdateTaxDetails")]
        public IHttpActionResult UpdateTaxDetails([FromBody] JObject jsonString,int TaxId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateTaxDetails");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinserttaxdetail objjson = JsonConvert.DeserializeObject<clinserttaxdetail>(json);
                var context = new EcommerceEntities();
                var result = context.TaxDetails.First(b => b.TaxDetailsId == TaxId && b.CompanyDetailId==CompanyId);
                if (result != null)
                {
                    result.TaxDetailsId = TaxId;
                    result.CGSTPercentage = objjson.CGSTPercentage;
                    result.SGSTPercentage = objjson.SGSTPercentage;

                    if (objjson.IsActive == true)
                        result.IsActive = 1;
                    else
                    {
                        result.IsActive = 0;

                    }
                      
                    result.Percentage = objjson.Percentage;
                    result.IGSTPercentage = objjson.IGSTPercentage;
                    result.CategoryId = objjson.CategoryId;
                    result.SubCategoryId = objjson.SubCategoryId;
                    result.ProductId = objjson.ProductId;
                    result.CompanyDetailId = CompanyId;
                    result.UpdatedBy = 1;
                    result.UpdatedDate = DateTime.Now;

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

        [HttpGet]
        [Route("api/TaxDetails/GetSearch")]
        public IEnumerable GetSearch(string Search, int Status, int CompanyId)
        {
            try
            {
                log.Debug("GetSearch");
                var vSno = 0;
                var a = (from p in db.TaxDetails.AsEnumerable()
                         where (p.IsActive == Status && p.CompanyDetailId==CompanyId && (p.ProductId.ToLower().Contains(Search.Trim().ToLower()) || p.Percentage.ToString().Contains(Search.ToString())))
                         select new
                         {
                             Sno = ++vSno,
                             TaxDetailsId = p.TaxDetailsId,
                             Description = p.Description,
                             Percentage = p.Percentage,
                             ProductId= p.ProductId,
                             CompanyDetailId=p.CompanyDetailId,
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
        [Route("api/ProductDetails/GetProductDetailsforTAX")]
        public IEnumerable GetProductDetails(string SubCategoryId, int CompanyId)
       {
            try
            {
                var category1 = (from p in db.SubCategories.AsEnumerable() where p.SubCategoryName == SubCategoryId select new { p.SubCategoryId }).FirstOrDefault();
                if (category1 != null)
                {
                    var a = (from p in db.ProductDetails.AsEnumerable()
                             where (p.SubCategoryId == category1.SubCategoryId && p.CompanyDetailId == CompanyId)
                             select new 
                             {
                                 
                                 SubCategoryId = p.SubCategoryId,
                                Title=p.Title,
                                ProductId=p.ProductId,
                                 CompanyDetailId = p.CompanyDetailId
                             });
                    return a;
                }
                return null;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }



    }

    public class clinserttaxdetail
    {
        public bool IsActive { get; set; }
        public string Description { get; set; }
        public decimal Percentage { get;  set; }
        public long TaxDetailsId { get; set; }
        public string CategoryId { get; set; }
       
        public string SubCategoryId { get;  set; }
        
        public string ProductId { get;  set; }
       
        public string Tax { get;  set; }
        public string CGSTPercentage { get;  set; }
        public string SGSTPercentage { get;  set; }
        public string IGSTPercentage { get;  set; }
    }
}
