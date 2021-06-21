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
    public class CopyRightAdminController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();

        public long? CompanyDetailId { get; private set; }

        [HttpGet]
        [Route("api/CopyRightAdmin/GetEcommerceAPI")]
        public IEnumerable GetEcommerceAPI( int CompanyDetailId)
        {
            try
            {
                log.Debug("GetEcommerceAPI");
                var a = (from k in db.CopyRights.AsEnumerable()
                         where (k.CompanyDetailId== CompanyDetailId)
                     select new
                     {
                         CompanyDetailId=k.CompanyDetailId,
                         CopyRights = k.CopyRight1
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
        [Route("api/CopyRightAdmin/InsertCopyRight")]
        public IHttpActionResult InsertCopyRight(string ParamCopyRight,int CompanyDetailId)
        {
            try
            {
                log.Debug("InsertCopyRight");
                CopyRight cr = new CopyRight();
                cr.CopyRight1 = ParamCopyRight;
                cr.CompanyDetailId = CompanyDetailId;
                db.CopyRights.Add(cr);
                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpPost]
        [Route("api/CopyRightAdmin/UpdateCopyRight")]
        public IHttpActionResult UpdateCopyRight(string ParamCopyRight,int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateCopyRight");
                
                db.CopyRights.RemoveRange(db.CopyRights.Where(p => p.CompanyDetailId == CompanyDetailId));
                db.SaveChanges();
            
                CopyRight cr = new CopyRight();

                cr.CopyRight1 = ParamCopyRight;
                cr.CompanyDetailId = CompanyDetailId;
                db.CopyRights.Add(cr);
                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
    }
}
