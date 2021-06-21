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
    public class AdminController : ApiController
    {
        //private string adminusername;
        //private string adminpassword;
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/Admin/Get")]
        public IEnumerable<AdminLogin> Get()
        {
            using (EcommerceEntities ob = new EcommerceEntities())
            {
                return ob.AdminLogins.ToList();
            }
        }
        [HttpGet]
        [Route("api/Admin/Getuserdetails")]
        public AdminLogin Getuserdetails(string username, string password)
        {
            try
            {
                log.Debug("Getuserdetails");
                using (EcommerceEntities ob = new EcommerceEntities())
                {
                    return ob.AdminLogins.FirstOrDefault(x => x.Username == username && x.Password == password);
                    //var a = from p in ob.AdminLogins.AsEnumerable()
                    //        where (p.Username == username && p.Password == password)
                    //        select p;
                    //return a;
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/Admin/GetuserdetailsforUserlogin")]
        public AdminLogin GetuserdetailsforUserlogin(string username, string password)
        {
            try
            {
                log.Debug("GetuserdetailsforUserlogin");
                using (EcommerceEntities ob = new EcommerceEntities())
                {
                    //return ob.AdminLogins.FirstOrDefault(x => x.Username == username && x.Password == password);
                    return ob.AdminLogins.FirstOrDefault(x => x.Username == username && x.Password == password && x.IsActive =="1");
                }

               
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }



        public static string UpdateVisitorCount()
        {
            EcommerceEntities db = new EcommerceEntities();
            try
            {
                var result = db.VisitorCounts.First();
                if (result != null)
                {
                    result.VisitorCountNo = result.VisitorCountNo + 1;
                    db.SaveChanges();
                }
                return "Success";
            }
            catch (Exception ex)
            {
                //log.Error(ex.Message, ex);
                return "";
            }
        }

        [HttpGet]
        [Route("api/Admin/GetSiteSettingConfiguration")]
        public IEnumerable GetSiteSettingConfiguration()
        {
            var TrendingItems = (from n in db.Settings.AsEnumerable()
                                 select new
                                 {
                                     GridSizeAdmin = n.GridSizeAdmin,
                                     ButtonColorAdmin = n.ButtonColorAdmin,
                                     CouponApplicable = n.CouponApplicable,
                                     DiscountApplicable = n.DiscountApplicable,
                                     FacebookSignup = n.FacebookSignup,
                                     n.colorApplicable,
                                 });

            return TrendingItems;
        }


        [HttpGet]
        [Route("api/Admin/GetCompanydetails")]
        public IEnumerable GetCompanydetails()
        {
            var a = (from n in db.CompanyDetails.AsEnumerable()
                     select new
                     {
                         WebsiteLogo = n.WebsiteLogo,
                         PhoneNo = n.PhoneNo,
                         n.CompanyName,
                         n.AddressLine1,
                         n.AddressLine2,
                         n.City,n.State,n.Country,n.PinCode,
                         n.InvoiceLogo,
                         n.CompanyDetailId,
                         n.favicon,
                         n.PaymentGateway,
                         n.PaymentGatewayKey
                     });
            return a;
        }

        [HttpGet]
        [Route("api/AdminIndex/GetCompanydetailsAdminIndex")]
        public IEnumerable GetCompanydetailsAdminIndex()
        {
            var a = (from n in db.CompanyDetails.AsEnumerable()
                     select new
                     {
                         WebsiteLogo = n.WebsiteLogo,
                         PhoneNo = n.PhoneNo,
                         n.CompanyName,
                         n.AddressLine1,
                         n.AddressLine2,
                         n.City,
                         n.State,
                         n.Country,
                         n.PinCode,
                         n.InvoiceLogo,
                         n.CompanyDetailId,
                         //n.favicon,
                         n.PaymentGateway,
                         n.PaymentGatewayKey,
                         n.GSTNo
                     });
            return a;
        }

        [HttpGet]
        [Route("api/CustomerDetails/GetCustomerDetails")]
        public IEnumerable GetCustomerDetails()
        {
            try
            {
                log.Debug("GetCustomerDetails");
                var Srno = 0;
                var a = (from p in db.MemberDetails.AsEnumerable()

                         orderby p.MemberId descending
                         select new
                         {
                             Rownumber = ++Srno,
                             CompanyDetailId = p.CompanyDetailId,
                             MemberName = p.MemberName,
                             ContactNo = p.ContactNo,
                             EmailId = p.EmailId,
                             AddressLine1 = p.AddressLine1,
                             AddressLine2 = p.AddressLine2,
                             State = p.State,
                             City = p.City
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
        [Route("api/UserManagement/InsertUser")]
        public IHttpActionResult InsertUser(int CompanyId, string UserName , string Password)
        {
            try
            {
                log.Debug("InsertUser");
                
                 var descExist = db.AdminLogins.Any(x => x.Username == UserName &&  x.CompanyDetailId == CompanyId);
                if (descExist)
                {
                    return Ok("Exist");
                }
                else

                {
                    var context = new EcommerceEntities();

                    AdminLogin User = new AdminLogin();
                    User.CompanyDetailId = CompanyId;
                    User.Username = UserName;
                    User.Password = Password;
                    User.IsActive = "1";
                    User.Type = "User";
                    db.AdminLogins.Add(User);

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
        [Route("api/UserManagement/GetUserManagement")]
        public IEnumerable GetUserManagementGetUserManagement(string iActive, int CompanyId)
        {
            try
            {
                log.Debug("GetUserManagement");
                var vSno = 0;
                var a = (from p in db.AdminLogins.AsEnumerable()
                         where (p.IsActive == iActive && p.CompanyDetailId == CompanyId)
                         orderby p.AdminLoginId descending
                         select new
                         {
                             Sno = ++vSno,
                             p.Username,
                             p.Password,
                             p.AdminLoginId,
                             CompanyDetailId = p.CompanyDetailId,
                             IsActive = p.IsActive == "1" ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                             IsActive1 = p.IsActive == "1" ? "Active" : "InActive"

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
        [Route("api/UserManagement/GetUserManagementById")]
        public IEnumerable GetUserManagementById(int AdminLoginId, int CompanyId)
        {
            try
            {
                log.Debug("GetUserManagementById");
                var a = (from p in db.AdminLogins.AsEnumerable()
                         where (p.AdminLoginId == AdminLoginId && p.CompanyDetailId == CompanyId)
                         select new
                         {
                             AdminLoginId = p.AdminLoginId,
                             CompanyDetailId = p.CompanyDetailId,
                             Username = p.Username,
                             IsActive = p.IsActive,
                             Password = p.Password,
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
        [Route("api/UserManagement/UpdateUserManagement")]
        public IHttpActionResult UpdateUserManagement( int CompanyId, string UserName , string Password, string IsActive , int AdminLoginId)
        {
            try
            {
                log.Debug("UpdateUserManagement");
               
                var context = new EcommerceEntities();
                var result = context.AdminLogins.First(b => b.AdminLoginId == AdminLoginId && b.CompanyDetailId == CompanyId);
                if (result != null)
                {
                    result.AdminLoginId = AdminLoginId;
                    result.CompanyDetailId = CompanyId;
                    result.Username = UserName;
                    result.Password = Password;
                    if (IsActive == "1")
                        result.IsActive = "1";
                    else
                        result.IsActive = "0";                  
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
        [Route("api/CustomerDetails/GetCustomerDetails")]
        public IEnumerable GetCustomerDetails(string Mobilenumber)
        {

            var a = (from p in db.MemberDetails.AsEnumerable()
                     where (p.ContactNo == Convert.ToDouble(Mobilenumber))

                     select new MemberDetail
                     {
                         EmailId = p.EmailId,
                         Password = p.Password,
                         ContactNo = p.ContactNo,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         State = p.State,
                         City = p.City,
                         PinCode = p.PinCode,
                         MemberName = p.MemberName,
                         MemberId = p.MemberId
                     });

            return a;
        }

        [HttpPost]
        [Route("api/CustomerDetails/InsertCustomerDetails")]
        public IHttpActionResult InsertCustomerDetails([FromBody]JObject jsonString)
        {
            string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            ClinsertMemberDetail Objjson = JsonConvert.DeserializeObject<ClinsertMemberDetail>(json);
            var context = new EcommerceEntities();
            MemberDetail cusDetail = new MemberDetail ();
            cusDetail.MemberName = Objjson.MemberName.ToString();
            cusDetail.ContactNo = Objjson.ContactNo;
            //cusDetail.EmailId = Objjson.EmailId;
            cusDetail.AddressLine1 = Objjson.AddressLine1;
            cusDetail.AddressLine2 = Objjson.AddressLine2;
            //cusDetail.State = Objjson.State;
            db.MemberDetails.Add(cusDetail);
            db.SaveChanges();
            var vMemberId = cusDetail.MemberId;
            return Ok(vMemberId);
        }


        [HttpGet]
        [Route("api/InvoiceNumber/GetInvoiceNumber")]
        public IEnumerable GetInvoiceNumber(string CompanyId)
        {

            var a = (from p in db.InvoiceNumbers.AsEnumerable()
                     where (p.Companyid == CompanyId)

                     select new 
                     {
                        p.Companyid,
                        p.InvoiceNumber1,
                        p.invoiceprefix
                       
                     });

            return a;
        }


    }

    internal class ClinsertMemberDetail
    {
        public string MemberName { get;  set; }
        public long? ContactNo { get;  set; }
        public string AddressLine1 { get;  set; }
        public string AddressLine2 { get;  set; }
    }
}
