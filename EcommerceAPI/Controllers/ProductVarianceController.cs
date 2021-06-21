using EcommerceAPI.Models;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
   
    [EnableCors("*", "*", "GET,POST")]
    public class ProductVarianceController : ApiController
    {
        private string connect = ConfigurationManager.ConnectionStrings["EcommerceEntities"].ToString();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();
        [HttpGet]
        [Route("api/ProductVariance/User")]
        public IEnumerable User()
        {
            try
            {
                var a = (from p in db.AdminLogins.AsEnumerable()
                         where (p.Type != "Admin")
                         select new
                         {
                             AdminLoginId = p.AdminLoginId,
                             CompanyDetailId = p.Username,
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            };
    }

        [HttpGet]
        [Route("api/ProductVariance/Register")]
        public IEnumerable Register(int Active)
        {
            try
            {
                var a = (from p in db.MemberDetails.AsEnumerable()
                         where (p.IsActive ==Active)
                         select new
                         {
                             p.AddressLine1,
                             p.City,
                             p.ContactNo,
                             p.EmailId,
                             p.MemberName,
                             p.State,
                         }).Take(20);
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            };
        }
        [HttpGet]
        [Route("api/ProductVariance/GetRegisteSearch")]
        public IEnumerable GetRegisteSearch( int CompanyId,string vsearch,int Active)
        {
            try
            {
                var a = (from p in db.MemberDetails.AsEnumerable()
                         where (p.IsActive == Active && p.CompanyDetailId == CompanyId || (p.MemberName != null && p.MemberName.ToString().ToLower().Contains(vsearch.ToLower())) || (p.EmailId != null && p.EmailId.ToString().ToLower().Contains(vsearch.ToLower())) || (p.AddressLine1 != null && p.AddressLine1.ToString().ToLower().Contains(vsearch.ToLower())))
                         
                         select new
                         {
                             p.AddressLine1,
                             p.City,
                             p.ContactNo,
                             p.EmailId,
                             p.MemberName,
                             p.State,
                         }).Take(20);
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            };
        }
        [HttpGet]
        [Route("api/ProductVariance/VarianceCount")]
        public IEnumerable VarianceCount(DateTime Date ,int userid)
        {
            Date.ToString("dd/MM/yyyy");
            var date1 = Date.AddDays(1);
            try
            {
                var a = (from p  in db.ProductVariances
                         where ((p.InsertedDate >= Date && p.InsertedDate <= date1) && p.InsertedBy == userid)
                         select new
                         {
                          Varianceount =   p.VarianceType
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            };
        }

        [HttpGet]
        [Route("api/ProductVariance/ProductCount")]
        public IEnumerable ProductCount(DateTime Date, int userid)
        {
            Date.ToString("dd/MM/yyyy");
            var date1 = Date.AddDays(1);
            try
            {
                var a = (from p in db.ProductDetails
                         where ((p.InsertedDate >= Date && p.InsertedDate <= date1) && p.InsertedBy == userid)
                         select new
                         {
                             Varianceount = p.ProductStocks
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            };
        }

        [HttpGet]
        [Route("api/ProductVariance/UserCount")]
        public IEnumerable UserCount( int userid)
        {
            
            try
            {
                var a = (from q in db.ProductVariances.AsEnumerable() 
                         where ( q.InsertedBy == userid)
                         select new
                         {
                             Varianceount = q.VarianceType
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            };
        }

    }
}
