using EcommerceAPI.Models;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{

    [EnableCors("*", "*", "GET,POST")]
    public class SalesOrderDetailController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        private EcommerceEntities db = new EcommerceEntities();


        [HttpGet]
        [Route("api/SalOrde/GetSalOrderDetails")]
        public IEnumerable GetSalOrderDetails(string strStatus)
        {
            try
            {
                log.Debug("GetSalOrderDetails");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where (p.Status == strStatus)
                         orderby p.SalesOrderId descending
                         select new
                         {
                             sno = ++vsno,
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.Status,
                             q.MemberName,
                             q.ContactNo,
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             p.CancelledBy,
                             p.CancelledComments,
                             OrderItems = p.SalesOrderItems.AsEnumerable().Select(s => new
                             {
                                 s.ProductPrice,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 product = s.ProductDetail.Title
                             }),
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
        [Route("api/SalOrde/UpdateSalesStatus")]
        public IHttpActionResult UpdateSalesStatus(int OrderId, string Status , string vCompanyName , string vDomain)
        {
            try
            {
                var orderno = "";
                log.Debug("UpdateSalesStatus");
                var result = db.SalesOrders.First(p => p.SalesOrderId == OrderId);
                if (result != null)
                {
                    orderno = result.OrderNo;
                    result.Status = Status;
                    if (Status == "ACCEPT")
                        result.InProgressDate = DateTime.Now;
                    else if (Status == "SHIPPED")
                        result.CompletedDate = DateTime.Now;
                    db.SaveChanges();
                }

                List<ProjectComdet> vCompanyDetails = getComdetails();
                // List<projectMemdet> Vmembdet = getMemdetails();
                List<ProjectDeldet> VDeldet = getDeldetails(OrderId);

                //Msg Code
                ///string strVerificationMsg="Verification code from zapata, Your Verification Code is  "+strPassword;
                //Your authentication key 
                string authKey = "338037AGkojtcSDiYL5f2b91e7P1";
                //Multiple mobiles numbers separated by comma 
                string mobileNumber = "91" + VDeldet[0].ContactNo + "," + "91" + vCompanyDetails[0].PhoneNo;
                // string mobileNumber = "";
                //Sender ID,While using route4 sender id should be 6 characters long. 
                string senderId = "zapata";
                //Your message to send, Add URL encoding here. 
                //mailMsg.To.Add(vMemberdet[0].EmailId);
                //mailMsg.CC.Add(vCompanyDetails[0].EmailId);
                string message1 = HttpUtility.UrlEncode("Your order is "+ Status + " by " + vCompanyDetails[0].CompanyName + " - Your Order Id :" + orderno + "  for more details visit http://"+vDomain+"/#!/ClientOrder/" + orderno+ "- by "+ vCompanyName +" ");
                //Prepare you post parameters 
                StringBuilder sbPostData = new StringBuilder();
                sbPostData.AppendFormat("authkey={0}", authKey);
                sbPostData.AppendFormat("&mobiles={0}", mobileNumber);
                sbPostData.AppendFormat("&message={0}", message1);
                sbPostData.AppendFormat("&country={0}", 0);
                sbPostData.AppendFormat("&sender={0}", senderId);
                sbPostData.AppendFormat("&route={0}", "4");

                //Call Send SMS API 
                string sendSMSUri = "https://api.msg91.com/api/sendhttp.php";
                //Create HTTPWebrequest 
                HttpWebRequest httpWReq = (HttpWebRequest)WebRequest.Create(sendSMSUri);
                //Prepare and Add URL Encoded data 
                UTF8Encoding encoding = new UTF8Encoding();
                byte[] data = encoding.GetBytes(sbPostData.ToString());
                //Specify post method 
                httpWReq.Method = "POST"; httpWReq.ContentType = "application/x-www-form-urlencoded";
                httpWReq.ContentLength = data.Length;
                using (Stream stream = httpWReq.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
                //Get the response 
                HttpWebResponse response = (HttpWebResponse)httpWReq.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream());
                string responseString = reader.ReadToEnd();
                //Close the response 
                reader.Close(); response.Close();


                return Ok("Success");
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/SalOrde/CancelOrder")]
        public IHttpActionResult CancelOrder(int OrderId, string Status, string CancelledComments, string vCompanyName, string vDomain)
        {
            try
            {
                var orderno = "";
                log.Debug("CancelOrder");
                List<ProjectComdet> vCompanyDetails = getComdetails();
                // List<projectMemdet> Vmembdet = getMemdetails();
                List<ProjectDeldet> VDeldet = getDeldetails(OrderId);
                var result = db.SalesOrders.First(p => p.SalesOrderId == OrderId);
                if (result != null)
                {
                    orderno = result.OrderNo;
                    result.Status = Status;
                    result.CancelledComments = CancelledComments;
                    result.CancelledDate = DateTime.Now;
                    result.CancelledBy = "Admin";
                    db.SaveChanges();

                    List<SalesOrderItem> vsalesOrderItems = GetSalOrderCancelledDetails(OrderId);
                    for (int i = 0; i < vsalesOrderItems.Count; i++)
                    {
                        int iProductId = Convert.ToInt32(vsalesOrderItems[i].ProductId);
                        var resultProd = db.ProductStocks.First(q => q.ProductId == iProductId);
                        if (resultProd != null)
                        {
                            resultProd.StockCount += Convert.ToInt32(vsalesOrderItems[i].Quantity);
                            db.SaveChanges();
                        }
                    }
                }
                //Msg Code
                ///string strVerificationMsg="Verification code from zapata, Your Verification Code is  "+strPassword;
                //Your authentication key 
                string authKey = "338037AGkojtcSDiYL5f2b91e7P1";
                //Multiple mobiles numbers separated by comma 
                string mobileNumber = "91" + VDeldet[0].ContactNo + "," + "91" + vCompanyDetails[0].PhoneNo;
                // string mobileNumber = "";
                //Sender ID,While using route4 sender id should be 6 characters long. 
                string senderId = "zapata";
                //Your message to send, Add URL encoding here. 
                //mailMsg.To.Add(vMemberdet[0].EmailId);
                //mailMsg.CC.Add(vCompanyDetails[0].EmailId);
                string message1 = HttpUtility.UrlEncode("Your order is Cancelled by " + vCompanyDetails[0].CompanyName + " - Your Order Id :" + orderno + "  for more details visit http://"+vDomain+"/#!/ClientOrder/" + orderno + " -by "+ vCompanyName + "");
                //Prepare you post parameters 
                StringBuilder sbPostData = new StringBuilder();
                sbPostData.AppendFormat("authkey={0}", authKey);
                sbPostData.AppendFormat("&mobiles={0}", mobileNumber);
                sbPostData.AppendFormat("&country={0}", 0);
                sbPostData.AppendFormat("&message={0}", message1);

                sbPostData.AppendFormat("&sender={0}", senderId);
                sbPostData.AppendFormat("&route={0}", "4");

                //Call Send SMS API 
                string sendSMSUri = "https://api.msg91.com/api/sendhttp.php";
                //Create HTTPWebrequest 
                HttpWebRequest httpWReq = (HttpWebRequest)WebRequest.Create(sendSMSUri);
                //Prepare and Add URL Encoded data 
                UTF8Encoding encoding = new UTF8Encoding();
                byte[] data = encoding.GetBytes(sbPostData.ToString());
                //Specify post method 
                httpWReq.Method = "POST"; httpWReq.ContentType = "application/x-www-form-urlencoded";
                httpWReq.ContentLength = data.Length;
                using (Stream stream = httpWReq.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
                //Get the response 
                HttpWebResponse response = (HttpWebResponse)httpWReq.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream());
                string responseString = reader.ReadToEnd();
                //Close the response 
                reader.Close(); response.Close();



                return Ok("Success");
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/SalOrde/GetSalOrderCompletedDetails")]
        public IEnumerable GetSalOrderCompletedDetails(string strStatus)
        {
            try
            {
                log.Debug("GetSalOrderCompletedDetails");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where (p.Status == strStatus)
                         orderby p.SalesOrderId descending
                         select new
                         {
                             sno = ++vsno,
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.Status,
                             q.MemberName,
                             CompletedDate = Convert.ToDateTime(p.CompletedDate).ToString("dd/MM/yyyy"),
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             OrderItems = p.SalesOrderItems.AsEnumerable().Select(s => new
                             {
                                 s.ProductPrice,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 product = s.ProductDetail.Title

                             }),

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
        [Route("api/SalOrde/GetAdminSalOrderCancelledDetails")]
        public IEnumerable GetAdminSalOrderCancelledDetails(string strStatus)
        {
            try
            {
                log.Debug("GetAdminSalOrderCancelledDetails");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where (p.Status == strStatus)
                         orderby p.SalesOrderId descending
                         select new
                         {
                             sno = ++vsno,
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.Status,
                             q.MemberName,
                             q.ContactNo,
                             q.EmailId,
                             p.CancelledBy,
                             p.CancelledComments,
                             CancelledDate = Convert.ToDateTime(p.CancelledDate).ToString("dd/MM/yyyy"),
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             OrderItemsCancelled = p.SalesOrderItems.AsEnumerable().Select(s => new
                             {
                                 s.ProductPrice,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 product = s.ProductDetail.Title

                             }),

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
        [Route("api/SalOrder/GetSearch")]
        public IEnumerable GetSearch(string Search, string Type, string Status)
        {
            try
            {
                log.Debug("GetSearch");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId

                         where(p.Status == Type) && ((p.OrderNo.ToLower().Contains(Search.ToLower()) || p.OrderDate.ToString().Contains(Search.ToLower()))
                         || p.Amoount.ToString().Contains(Search.ToString()))
                         orderby p.SalesOrderId descending
                         select new
                         {
                             sno = ++vsno,
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.Status,
                             q.MemberName,
                             q.EmailId,
                             p.CancelledBy,
                             p.CancelledComments,
                             CompletedDate = Convert.ToDateTime(p.CompletedDate).ToString("dd/MM/yyyy"),
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             OrderItems = p.SalesOrderItems.AsEnumerable().Select(s => new
                             {
                                 s.ProductPrice,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 product = s.ProductDetail.Title
                             }),
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
        [Route("api/SalOrder/GetSearchCancel")]
        public IEnumerable GetSearchCancel(string Search, string Status, string Type)
        {
            try
            {
                log.Debug("GetSearchCancel");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId

                         where (p.Status == Type) && ((p.OrderNo.ToLower().Contains(Search.ToLower()) || p.OrderDate.ToString().Contains(Search.ToLower()))
                         || p.Amoount.ToString().Contains(Search.ToString()) || q.MemberName.ToLower().Contains(Search.ToLower()))
                         orderby p.SalesOrderId descending
                         select new
                         {
                             sno = ++vsno,
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.Status,
                             q.MemberName,
                             q.EmailId,
                             p.CancelledBy,
                             p.CancelledComments,
                             CompletedDate = Convert.ToDateTime(p.CompletedDate).ToString("dd/MM/yyyy"),
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             OrderItemsCancelled = p.SalesOrderItems.AsEnumerable().Select(s => new
                             {
                                 s.ProductPrice,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 product = s.ProductDetail.Title
                             }),
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
        [Route("api/SalOrder/GetSearchComplete")]
        public IEnumerable GetSearchComplete(string Search, string Status, string Type)
        {
            try
            {
                log.Debug("GetSearchComplete");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId


                         where (p.Status == Type) && ((p.OrderNo.ToLower().Contains(Search.ToLower()) || p.OrderDate.ToString().Contains(Search.ToLower()))
                         || p.Amoount.ToString().Contains(Search.ToString()) || q.MemberName.ToLower().Contains(Search.ToLower()))
                         orderby p.SalesOrderId descending
                         select new
                         {
                             sno = ++vsno,
                             p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             p.Amoount,
                             p.CourierDetails,
                             p.Status,
                             q.MemberName,
                             q.EmailId,
                             q.MemberOrders,

                             p.CancelledBy,
                             p.CancelledComments,
                             CompletedDate = Convert.ToDateTime(p.CompletedDate).ToString("dd/MM/yyyy"),
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
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
        [Route("api/SalOrde/SendInvoiceMail")]
        public IHttpActionResult SendInvoiceMail(int SalesOrderId )
        {
            try
            {
                log.Debug("SendInvoiceMail");
                List<ProjectComdet> vCompanyDetails = getComdetails();
                // List<projectMemdet> Vmembdet = getMemdetails();
                List<ProjectDeldet> VDeldet = getDeldetails(SalesOrderId);

             
                //MailMessage mailMsg = new MailMessage();
                //// From
                //MailAddress mailAddress = new MailAddress(vCompanyDetails[0].EmailId, "Order Cancellation");

                //mailMsg.From = mailAddress;

                //// Subject and Body
                //mailMsg.Subject = "Order Cancellation- Your Order with " + vCompanyDetails[0].CompanyName;
                //string messegeitem = string.Empty;

                //messegeitem = "<html> ";
                //messegeitem += "<head> ";
                //messegeitem += "<title> Order Cancellation- Your Order with " + vCompanyDetails[0].CompanyName + "</title>";
                //messegeitem += "</head>";
                //messegeitem += "<body style = \"padding:0px;margin:0px\" >";
                //messegeitem += "<div style = \"background-color:#f2f2f2;height:100%\" >";
                //messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" > ";
                //messegeitem += "<tbody>";
                //messegeitem += "<tr style = \"background-color:#232f3e\" >";
                //messegeitem += "<td align = \"center\" valign = \"top\" style = \"padding:0 20px\" >";
                //messegeitem += "<table align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                //messegeitem += "<tbody><tr> ";
                //messegeitem += "<td width = \"320\" align = \"center\" valign = \"top\" >";
                //messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                //messegeitem += "<tbody> ";
                //messegeitem += "<tr> ";
                //messegeitem += "<td height = \"30\" style = \"height:30px;line-height:30px;text-align:center\" > ";
                //messegeitem += "<img align = \"center\" border = \"0\"  Width=300px\" alt = \"Sysmedac Ecom\"  src =\"" + vCompanyDetails[0].InvoiceLogo + "\" style = \"margin:audio\" ><br><h2 style = \"margin:0px;font-family:Arial,sans-serif;font-size:20px;color:#3a3a3a;\" > </h2></td>";
                //messegeitem += " </tr>";
                //messegeitem += " <tr> ";
                //messegeitem += " <td> </td> ";
                //messegeitem += " </tr>";
                //messegeitem += " </tbody> ";
                //messegeitem += " </table> ";
                //messegeitem += " </td> ";
                //messegeitem += " </tr> ";
                //messegeitem += " </tbody> ";
                //messegeitem += " </table> ";
                //messegeitem += " </td> ";
                //messegeitem += " </tr> ";
                //messegeitem += " </tbody>";
                //messegeitem += "</table>";
                //messegeitem += "<table width = \"76%\" align = \"center\" cellpadding =\"0\" cellspacing = \"0\" border = \"0\" style = \"background-color:#fff;box-shadow:0px 0px 5px #ccc;border-left:5px\">";
                //messegeitem += "<tbody> ";
                //messegeitem += "<tr> ";
                //messegeitem += "<td align = \"left\" valign = \"top\" style = \"padding:3%\" > ";
                //messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:17px;color:#3a3a3a;padding:15px\" > Hi " + VDeldet[0].MemberName.ToString() + "</p>";
                //messegeitem += "<table width = \"100%\" style = \"font-family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\">";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\">Greetings from" + vCompanyDetails[0].CompanyName + "!</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\">Your Order is Cancelled. Your Order No : " + VDeldet[0].OrderNo + "</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr>";
                //messegeitem += "<td width = \"100%\">:Your SalesOrder Product Amount: " + VDeldet[0].Amoount + "</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr>";
                //messegeitem += "<td width = \"100%\">:Reason for Cancellation: " + VDeldet[0].CancelledBy + "</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\">Your Order is Cancelled: " + VDeldet[0].CancelledComments + "</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\"></td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\">Delivery Address</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\"></td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr> ";
                //messegeitem += "<td width = \"100%\">" + VDeldet[0].MemberName.ToString() + "</td><td></td>";
                //messegeitem += "</tr>";
                //messegeitem += "</table>";
                //messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\" >  Regards, <br/>Team " + vCompanyDetails[0].CompanyName + ".</p> ";
                //messegeitem += "<p style = \"text -align:left;font-family:Arial,sans-serif;color:#2f2f2f\" > ";
                //messegeitem += "</p><p style = \"text -align:justify;font-family:Arial,sans-serif;padding:15px;color:grey\" >";
                //messegeitem += "<small> CONFIDENTIALITY NOTICE:<br> ";
                //messegeitem += "Proprietary / Confidential information belonging to " + vCompanyDetails[0].CompanyName + " and its affiliates";
                //messegeitem += "may be contained in this message.If you are not a recipient indicated or intended in this message(or responsible for delivery of this message to such person), or you think for any reason that this message may have been addressed to you in error, you may not use or copy or deliver this message to anyone else.In such case, you should destroy this message and are asked to notify the sender by reply email.</small>";
                //messegeitem += "</p> ";
                //messegeitem += "<p></p> ";
                //messegeitem += "</td> ";
                //messegeitem += "</tr>";
                //messegeitem += "</tbody>";
                //messegeitem += "</table>";
                //messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                //messegeitem += "<tbody>";
                //messegeitem += "<tr>";
                //messegeitem += "<td><table width = \"40%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
                //messegeitem += "<tbody><tr> ";
                //messegeitem += "<td colspan = \"3\" style = \"padding:10px\" >";
                //messegeitem += "</td>";
                //messegeitem += "</tr>";
                //messegeitem += "</tbody></table> </td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr>";
                //messegeitem += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr>";
                //messegeitem += "<td align = \"center\" valign = \"top\" style = \"color:#777777;font-family:Arial,sans-serif;font-size:12px;line-height:23px;font-weight:400\" > Copyright© -2019 " + vCompanyDetails[0].CompanyName + ".All Rights Reserved.";
                //messegeitem += "</td>";
                //messegeitem += "</tr>";
                //messegeitem += "<tr>";
                //messegeitem += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td> ";
                //messegeitem += "</tr> ";
                //messegeitem += "</tbody>";
                //messegeitem += "</table><div class=\"yj6qo\"></div><div class=\"adL\">";
                //messegeitem += "</div></div>";
                //messegeitem += " </body>";
                //messegeitem += "</html>";

                //mailMsg.Body = messegeitem;
                //mailMsg.To.Add(VDeldet[0].EmailId);
                //mailMsg.CC.Add("vidhya@sysmedac.com");

                //mailMsg.IsBodyHtml = true;

                //SmtpClient emailClient = new SmtpClient(" 208.91.198.202", 587);
                //System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("contact@sysmedacmicrosoft.com", "6^6Ftr6a");
                //emailClient.Credentials = credentials;
                //try
                //{
                //    emailClient.Send(mailMsg);
                //}
                //catch (Exception ex)
                //{
                //    string register = ex.ToString();
                //}

                return Ok("Success");
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        private List<ProjectDeldet> getDeldetails(int salesOrderId)
        {
            var a = (from p in db.SalesOrders.AsEnumerable()
                     join q in db.MemberDetails on p.MemberId equals q.MemberId
                     where (p.SalesOrderId == salesOrderId)
                     select new ProjectDeldet
                     {
                         Amoount = p.Amoount,
                         MemberId = p.MemberId,
                         MemberName = q.MemberName,
                         EmailId = q.EmailId,
                         OrderNo = p.OrderNo,
                         CancelledBy = p.CancelledBy,
                         CancelledComments = p.CancelledComments,
                         ContactNo= q.ContactNo,
                     });
            return a.ToList();
        }

        private List<ProjectComdet> getComdetails()
        {
            var a = (from p in db.CompanyDetails.AsEnumerable()
                     select new ProjectComdet
                     {
                         CompanyName = p.CompanyName,
                         EmailId = p.EmailId,
                         InvoiceLogo = p.InvoiceLogo,
                         PhoneNo= p.PhoneNo,
                     });
            return a.ToList();
        }

        class ProjectComdet
        {
            public string EmailId { get; internal set; }
            public string CompanyName { get; internal set; }
            public string InvoiceLogo { get; internal set; }
            public string PhoneNo { get; internal set; }
        }

        class ProjectDeldet
        {
            // public object MemberName { get; internal set; }
            public decimal? Amoount { get; internal set; }
            public long? MemberId { get; internal set; }
            public string OrderNo { get; internal set; }
            public string CancelledBy { get; internal set; }
            public string EmailId { get; internal set; }
            public string MemberName { get; internal set; }
            public string CancelledComments { get; internal set; }
            public long? ContactNo { get; internal set; }
        }

        [HttpGet]
        [Route("api/SalOrde/GetCompanyDetails")]
        public IEnumerable GetCompanyDetails()
        {
            try
            {
                log.Debug("GetCompanyDetails");
                var a = (from p in db.CompanyDetails.AsEnumerable()
                         select new
                         {
                             CompanyName = p.CompanyName,
                             EmailId = p.EmailId
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
        [Route("api/ProductStock/UpdateProductStockCount")]
        public IHttpActionResult UpdateProductStockCount(int SalesOrderId)
        {
            try
            {
                log.Debug("UpdateProductStockCount");
                List<SalesOrderItem> vsalesOrderItems = GetSalOrderCancelledDetails(SalesOrderId);
                for (int i = 0; i < vsalesOrderItems.Count; i++)
                {

                    SalesOrderItem objSalesOrderItem = new SalesOrderItem();
                    objSalesOrderItem.ProductId = vsalesOrderItems[i].ProductId;
                    objSalesOrderItem.Quantity = vsalesOrderItems[i].Quantity;
                    objSalesOrderItem.DiscountPercentage = vsalesOrderItems[i].DiscountPercentage;
                    objSalesOrderItem.TaxPercentage = vsalesOrderItems[i].TaxPercentage;
                    objSalesOrderItem.CouponPercentage = vsalesOrderItems[i].CouponPercentage;
                    objSalesOrderItem.ProductPrice = vsalesOrderItems[i].ProductPrice;
                    objSalesOrderItem.SalesOrderId = SalesOrderId;

                    db.SalesOrderItems.Add(objSalesOrderItem);
                    db.SaveChanges();
                }
                return Ok("Success");
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        private List<SalesOrderItem> GetSalOrderCancelledDetails(int salesOrderId)
        {

            var a = (from p in db.SalesOrderItems.AsEnumerable()
                     where p.SalesOrderId == salesOrderId
                     select new SalesOrderItem()
                     {
                         SalesOrderId = p.SalesOrderId,
                         SalesOrderItemId = p.SalesOrderItemId,
                         Quantity = p.Quantity,
                         ProductId = p.ProductId
                     });
            return a.ToList();
        }
    }
}
