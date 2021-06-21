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
    public class DeliveryController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        [HttpPost]
        [Route("api/Delivery/InsertDeliveryChargeDetails")]
        public IHttpActionResult InsertDeliveryChargeDetails([FromBody] JObject jsonString, int CompanyId)
        {
            try
            {
                log.Debug("api/Delivery/InsertDeliveryChargeDetails");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clsDelivery objjson = JsonConvert.DeserializeObject<clsDelivery>(json);
                var context = new EcommerceEntities();
                DeliveryCharge DeliveryCharge = new DeliveryCharge();
                var result = context.DeliveryCharges.First(b => b.Fromprice == objjson.Fromprice && b.CompanyDetailId == CompanyId);
                if (result != null) {
                    DeliveryCharge.Qty = objjson.Qty;
                    DeliveryCharge.Fromprice = objjson.Fromprice;
                    DeliveryCharge.Toprice = objjson.Toprice;
                    DeliveryCharge.Price = objjson.Price;
                    DeliveryCharge.CompanyDetailId = CompanyId;
                    if (objjson.IsActive == true)
                        DeliveryCharge.IsActive = 1;
                    else
                        DeliveryCharge.IsActive = 0;

                    DeliveryCharge.InsertedBy = 1;
                    DeliveryCharge.InsertedDate = DateTime.Now;
                    context.DeliveryCharges.Add(DeliveryCharge);
                    context.SaveChanges();

                }
                else
                {
                    return Ok("Exist");

                }
                return Ok ();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }


        [HttpGet]
        [Route("api/Delivery/GetDeliveryChargeDetails")]
        public IEnumerable GetDeliveryChargeDetails(int iActive, int CompanyId)
        {
            try
            {
                log.Debug("api/Delivery/GetDeliveryChargeDetails");
                var vSno = 0;
                var a = (from p in db.DeliveryCharges.AsEnumerable()
                         where (p.IsActive == iActive && p.CompanyDetailId == CompanyId)
                         orderby p.DeliveryChargeId descending
                         select new
                         {
                             Sno = ++vSno,
                             DeliveryChargeId = p.DeliveryChargeId,
                             Qty = p.Qty,
                             Price = p.Price,
                             p.Fromprice,
                             p.Toprice,
                             CompanyDetailId = p.CompanyDetailId,
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

        [HttpPost]
        [Route("api/Delivery/UpdateDeliveryChargeDetails")]
        public IHttpActionResult UpdateDeliveryChargeDetails([FromBody] JObject jsonString, int DeliveryId, int CompanyId)
        {
            try
            {
                log.Debug("api/Delivery/UpdateDeliveryChargeDetails");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clsDelivery objjson = JsonConvert.DeserializeObject<clsDelivery>(json);
                var context = new EcommerceEntities();
                var result = context.DeliveryCharges.First(b => b.DeliveryChargeId == DeliveryId && b.CompanyDetailId == CompanyId);
                if (result != null)
                {
                    result.DeliveryChargeId = DeliveryId;
                    result.Qty = objjson.Qty;
                    result.Fromprice = objjson.Fromprice;
                    result.Toprice = objjson.Toprice;

                    if (objjson.IsActive == true)
                        result.IsActive = 1;
                    else
                        result.IsActive = 0;

                    result.Price = objjson.Price;
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
        [Route("api/Delivery/GetSearchResult")]
        public IEnumerable GetSearch(string Search, int Status, int CompanyId)
        {
            try
            {
                log.Debug("GetSearch");
                var vSno = 0;
                var a = (from p in db.DeliveryCharges.AsEnumerable()
                         where (p.IsActive == Status && p.CompanyDetailId == CompanyId && (p.Qty.ToString().Contains(Search.Trim().ToLower()) || p.Price.ToString().Contains(Search.ToString())))
                         select new
                         {
                             Sno = ++vSno,
                             DeliveryChargeId = p.DeliveryChargeId,
                             Qty = p.Qty,
                             Price = p.Price,
							 p.Fromprice,
							 p.Toprice,
                             CompanyDetailId = p.CompanyDetailId,
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



        public class clsDelivery
        {
            public bool IsActive { get; set; }
            public decimal Price { get; set; }
            public decimal Qty { get; set; }
            public long DeliveryChargeId { get; set; }
            public long Fromprice { get; set; }
            public long Toprice { get; set; }
        }

    }


}
