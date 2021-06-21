using EcommerceAPI.Models;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ScBusinezAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]

    public class IndexController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        [HttpGet]
        [Route("api/Index/GetCatDetails")]
        public IEnumerable GetCatDetails()
        {
            try
            {
                log.Debug("GetCatDetails");
                var a = (from p in db.Categories.AsEnumerable()
                     where (p.IsActive == 1)
                     select new
                     {
                         categoryname=p.CategoyName,
                         categoryid=p.CategoryId
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
        [Route("api/Index/GetSubCatDetails")]
        public IEnumerable GetSubCatDetails(int CatId)
        {
            try
            {
                log.Debug("GetSubCatDetails");
                var a = (from p in db.SubCategories.AsEnumerable()
                     where (p.IsActive == 1 && p.CategoryId == CatId)
                     select new
                     {
                         subcategoryname=p.SubCategoryName,
                         subcategoryid=p.SubCategoryId
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
        [Route("api/Index/GetTopSearch")]
        public IEnumerable GetTopSearch(string SearchData)
        {
            try
            {
                log.Debug("GetTopSearch");
                var a = (from p in db.SubCategories.AsEnumerable()
                     where (p.IsActive == 1 && p.SubCategoryName.Contains(SearchData))
                     select new
                     {
                         categoryname = p.SubCategoryName,
                         categoryid = p.SubCategoryId
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
        [Route("api/Index/GetFilterSearch")]
        public IEnumerable GetFilterSearch(string SearchData)
        {
            try
            {
                log.Debug("GetFilterSearch");
                var a = (from p in db.SubCategories.AsEnumerable()
                     where (p.IsActive == 1 && p.SubCategoryName.Contains(SearchData))
                     select new
                     {
                         categoryname=p.SubCategoryName,
                         categoryid=p.SubCategoryId
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
        [Route("api/Index/GetFilterSearchId")]
        public IEnumerable GetFilterSearchId(int SubCatId)
        {
            try
            {
                log.Debug("GetFilterSearchId");
                var a = (from p in db.SubCategories.AsEnumerable()
                     where (p.IsActive == 1 && p.SubCategoryId == SubCatId)
                     select new
                     {
                         categoryname=p.SubCategoryName,
                         categoryid=p.SubCategoryId
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
}
