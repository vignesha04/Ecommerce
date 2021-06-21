using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EcommerceAPI.Models;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class BrandTypeeController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        [HttpPost]
        [Route("api/ProdBrand/InsertBrand")]
        public IHttpActionResult InsertBrand([FromBody] BrandType cates, int CompanyId)
        {
            try
            {
                log.Debug("api/ProdBrand/InsertBrand");
                cates.CompanyDetailId = CompanyId;
                cates.InsertedBy = 1;
                cates.InsertedDate = DateTime.Now;
                var usrBrandExists = db.BrandTypes.Any(x => x.BrandTypeName == cates.BrandTypeName && x.CompanyDetailId==CompanyId);
                if (usrBrandExists)
                    return Ok("Already Exist");
                else
                {
                    db.BrandTypes.Add(cates);
                    db.SaveChanges();
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
        [Route("api/Demoproduct/Insertdemolist")]
        public IHttpActionResult InsertCategorieslist(int CompanyId, string CategoyName, int Active)
        {
            try
            {
                Category ins = new Category();
                log.Debug("InsertCategories");
                ins.CompanyDetailId = CompanyId;
                ins.InsertedBy = 1;
                ins.InsertedDate = DateTime.Now;
                var usrNameExists = db.Categories.Any(x => x.CategoyName == CategoyName && x.CompanyDetailId == CompanyId);
                if (usrNameExists)
                    return Ok("Already Exist");
                else
                {
                    ins.CategoyName = CategoyName;
                    ins.IsActive = Active;
                    db.Categories.Add(ins);
                    db.SaveChanges();
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
        [Route("api/ProdBrand/GetBrandType")]
        public IEnumerable GetBrandType(int iActive, int CompanyId)
        {
            try
            {
                log.Debug("GetBrandType");
                var Srno = 0;
                var a = (from p in db.BrandTypes.AsEnumerable()
                         where (p.IsActive == iActive && p.CompanyDetailId==CompanyId)
                         orderby p.BrandTypeId 
                         select new
                         {
                             Rownumber = ++Srno,
                             CompanyDetailId = p.CompanyDetailId,
                             BrandTypeId = p.BrandTypeId,
                             BrandName = p.BrandTypeName,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/active.png" : "AdminStyle/images/inactive.png",
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
        [Route("api/ProdBrand/GetBrandTypeById")]
        public IEnumerable GetBrandTypeById(int BrandTypeId, int CompanyId)
        {
            try
            {
                log.Debug("GetCategoriesById");
                var a = (from p in db.BrandTypes.AsEnumerable()
                         where (p.BrandTypeId == BrandTypeId && p.CompanyDetailId==CompanyId)
                         select new
                         {
                             BrandTypeId = p.BrandTypeId,
                             CompanyDetailId = p.CompanyDetailId,
                             BrandName = p.BrandTypeName,
                             IsActive = p.IsActive
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
        [Route("api/ProdBrand/UpdateBrandType")]
        public IHttpActionResult UpdateBrandType([FromBody] JObject jsonString, int BrandTypeId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateBrandType");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clinsertBrand Objjson = JsonConvert.DeserializeObject<clinsertBrand>(json);
               

                var context = new EcommerceEntities();
                var result = context.BrandTypes.First(b => b.BrandTypeId == BrandTypeId && b.CompanyDetailId==CompanyId);
                if (result != null)
                {
                    //result.BrandTypeId = BrandTypeId;
                    result.CompanyDetailId = CompanyId;
                    result.BrandTypeName = Objjson.BrandTypeName.ToString();
                    if (Objjson.IsActive == true)
                        result.IsActive = 1;
                    else
                        result.IsActive = 0;
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
        [Route("api/ProdBrand/CheckProductExist")]
        public IEnumerable CheckProductExist(int BrandId, int CompanyId)
        {
            try
            {
                log.Debug("CheckProductExist");
                var a = (from p in db.ProductDetails.AsEnumerable()
                     where (p.IsActive == 1 && p.BrandTypeId == BrandId && p.CompanyDetailId==CompanyId)
                     select new
                     {
                         BrandTypeId = p.BrandTypeId,
                         CompanyDetailId = p.CompanyDetailId
                         
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
        [Route("api/ProdBrand/GetSearch")]
        public IEnumerable GetSearch(string Search, int Status, int CompanyId)
        {
            try
            {
                log.Debug("GetSearch");
                var Srno = 0;
                var a = (from p in db.BrandTypes.AsEnumerable()
                         where (p.IsActive == Status && p.CompanyDetailId==CompanyId && (p.BrandTypeName.ToLower().Contains(Search.ToLower())))
                         select new
                         {
                             Rownumber = ++Srno,
                             BrandTypeId = p.BrandTypeId,
                             BrandName = p.BrandTypeName,
                             CompanyDetailId = p.CompanyDetailId,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/active.png" : "AdminStyle/images/inactive.png",
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

    internal class clinsertBrand
    {
        public string BrandTypeName { get; set; }
        public bool IsActive { get; set; }
    }
}
