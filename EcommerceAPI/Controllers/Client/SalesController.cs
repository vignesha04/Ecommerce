using EcommerceAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
using Razorpay.Api;
using System.Web.Script.Serialization;

namespace EcommerceAPI.Controllers.Client
{
    [EnableCors("*", "*", "GET,POST")]
    public class SalesController : ApiController
    {

      
        private EcommerceEntities db = new EcommerceEntities();


        [HttpPost]
        [Route("api/SalesDetail/InsertSalesOrder")]
        public IHttpActionResult InsertSalesOrder([FromBody]JObject jsonString, string strOrderNo, int strMemberId, decimal decTotalAmount,decimal decDeliveryCharge , string razorpay_payment_id, string vCoupounAmt, string Subtotal)
        {
            string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            clsSalOrder objjson = JsonConvert.DeserializeObject<clsSalOrder>(json);


            SalesOrder objSalesOrder = new SalesOrder();

            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("dd-MM-yyyy");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
            string sCurDate = dtCNowdate.Replace(@"-", string.Empty);
            string sTime = tsnow.Hours + "" + tsnow.Minutes;
            string sOrderNo = sCurDate + "-" + sTime;


            objSalesOrder.OrderNo = sOrderNo;
            objSalesOrder.MemberId = strMemberId;
            objSalesOrder.OrderDate = DateTime.Now;
            objSalesOrder.Amoount = decTotalAmount;
            objSalesOrder.InsertedDate = DateTime.Now;
            objSalesOrder.DeliveryName = objjson.MemberName;
            objSalesOrder.DeliveryContactNo = objjson.ContactNo;
            objSalesOrder.DeliveryEmail = objjson.EmailId;
            objSalesOrder.DeliveryAddressLine1 = objjson.AddressLine1;
            objSalesOrder.DeliveryAddressLine2 = objjson.AddressLine2;
            objSalesOrder.DeliveryCity = objjson.City;
            objSalesOrder.DeliveryState = objjson.State;
            objSalesOrder.DeliveryPinCode = objjson.Pincode;
            objSalesOrder.DeliveryLandMark = objjson.Landmark;
            objSalesOrder.OrderDeliveryCharge = decDeliveryCharge;
            objSalesOrder.PaymentId = razorpay_payment_id;
            objSalesOrder.Status = "Ordered";
            objSalesOrder.CouponCode = vCoupounAmt;
            objSalesOrder.Subtotal = Subtotal;
            objSalesOrder.DeliveryCharge = Convert.ToString(decDeliveryCharge);

            db.SalesOrders.Add(objSalesOrder);
            db.SaveChanges();

            int iId = Convert.ToInt32(objSalesOrder.SalesOrderId);
            string strID = Convert.ToString(iId) + "|" + sOrderNo;
            return Ok(strID);


        }
        public class clsSalOrder
        {
            public string MemberName { get; set; }
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Pincode { get; set; }
            public string Landmark { get; set; }
            public string EmailId { get; set; }
            public string ContactNo { get; set; }
            public DateTime DeliveryDate { get; set; }
            public string Invoicenumber { get; set; }
            public string SalesPerson { get; set; }
            public string DeliveryMode { get; set; }
            public string OrderNotes { get; set; }
        }


        [HttpPost]
        [Route("api/SalesDetail/InsertSalesOrderItems")]
        public IHttpActionResult InsertSalesOrderItems(List<clientSalesOrderItems> obj, int strOrderId)
        {

            for (int i = 0; i < obj.Count; i++)
            {

                SalesOrderItem objSalesOrderItem = new SalesOrderItem();
                objSalesOrderItem.ProductId = obj[i].ProductId;
                objSalesOrderItem.Quantity = obj[i].Qty;
                objSalesOrderItem.DiscountPercentage = obj[i].Discount;
                objSalesOrderItem.TaxPercentage = obj[i].Tax;
                objSalesOrderItem.CouponPercentage = obj[i].CopounPercentage;
                objSalesOrderItem.ProductPrice = obj[i].Price;
                objSalesOrderItem.SalesOrderId = strOrderId;
                objSalesOrderItem.ProductVarianceId = obj[i].VarianceId;

                db.SalesOrderItems.Add(objSalesOrderItem);
                db.SaveChanges();


                var iProdId = obj[i].VarianceId;
                var result = db.ProductStocks.First(p => p.ProductVarianceId == iProdId);
                if (result != null)
                {
                    var vCount = result.StockCount - obj[i].Qty;
                    result.StockCount = Convert.ToInt32(vCount);
                    db.SaveChanges();
                }

            }

            //for (int i = 0; i < obj.Count; i++)
            //{
            //    var result = db.ProductStocks.First(p => p.ProductId == obj[i].ProductId);
            //    if (result != null)
            //    {
            //        var vCount = result.StockCount - obj[i].Qty;
            //        result.StockCount = Convert.ToInt32(vCount);
            //        db.SaveChanges();
            //    }
            //}
            return Ok("Success");


        }

        [HttpPost]
        [Route("api/BulkSales/InsertBulkSalesItems")]
        public IHttpActionResult InsertBulkSalesItems(List<clientSalesOrderItems> obj, int strOrderId)
      {

            for (int i = 0; i < obj.Count; i++)
            {

                SalesOrderItem objSalesOrderItem = new SalesOrderItem();
                objSalesOrderItem.ProductId = obj[i].ProductId;
                objSalesOrderItem.Quantity = obj[i].Qty;
                objSalesOrderItem.DiscountPercentage = obj[i].Discount;
                objSalesOrderItem.TaxPercentage = obj[i].Tax;
                objSalesOrderItem.CouponPercentage = obj[i].CopounPercentage;
                objSalesOrderItem.ProductPrice = obj[i].Price;
                objSalesOrderItem.SalesOrderId = strOrderId;
                objSalesOrderItem.ProductVarianceId = obj[i].ProductId;

                db.SalesOrderItems.Add(objSalesOrderItem);
                db.SaveChanges();


                var iProdId = obj[i].ProductId;
                var result = db.ProductStocks.First(p => p.ProductId == iProdId);
                if (result != null)
                {
                    var vCount = result.StockCount - obj[i].Qty;
                    result.StockCount = Convert.ToInt32(vCount);
                    db.SaveChanges();
                }

            }

          
            return Ok("Success");


        }

        [HttpPost]
        [Route("api/BulkSales/InsertBulkSalesOrder")]
        public IHttpActionResult InsertBulkSalesOrder([FromBody]JObject jsonString, string strOrderNo, int strMemberId, decimal decTotalAmount, decimal decDeliveryCharge, string razorpay_payment_id , string CompanyId)
        {
            string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            clsSalOrder objjson = JsonConvert.DeserializeObject<clsSalOrder>(json);


            SalesOrder objSalesOrder = new SalesOrder();

            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("dd-MM-yyyy");

            string Deliverydate = Convert.ToDateTime(objjson.DeliveryDate).ToString("dd-MM-yyyy");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;
            string sCurDate = dtCNowdate.Replace(@"-", string.Empty);
            string sTime = tsnow.Hours + "" + tsnow.Minutes;
            string sOrderNo = sCurDate + "-" + sTime;


            objSalesOrder.OrderNo = sOrderNo;
            objSalesOrder.MemberId = strMemberId;
            objSalesOrder.OrderDate = DateTime.Now;
            objSalesOrder.Amoount = decTotalAmount;
            objSalesOrder.InsertedDate = DateTime.Now;
            objSalesOrder.DeliveryName = objjson.MemberName;
            objSalesOrder.DeliveryContactNo = objjson.ContactNo;
            objSalesOrder.DeliveryEmail = objjson.EmailId;
            objSalesOrder.DeliveryAddressLine1 = objjson.AddressLine1;
            objSalesOrder.DeliveryAddressLine2 = objjson.AddressLine2;
            objSalesOrder.DeliveryCity = objjson.City;
            objSalesOrder.DeliveryState = objjson.State;
            objSalesOrder.DeliveryPinCode = objjson.Pincode;
            objSalesOrder.DeliveryLandMark = objjson.Landmark;
            objSalesOrder.OrderDeliveryCharge = decDeliveryCharge;
            objSalesOrder.PaymentId = razorpay_payment_id;
            objSalesOrder.Status = "Ordered";
            objSalesOrder.InvoiceNo = objjson.Invoicenumber;
            objSalesOrder.SalesPersonName = objjson.SalesPerson;
            objSalesOrder.DeliveryDate = Deliverydate;
            objSalesOrder.DeliveryMode = objjson.DeliveryMode;
           objSalesOrder.OrderNotes = objjson.OrderNotes;

            db.SalesOrders.Add(objSalesOrder);
            db.SaveChanges();

            int iId = Convert.ToInt32(objSalesOrder.SalesOrderId);
            string strID = Convert.ToString(iId) + "|" + sOrderNo;
           

            var vinvoicenumber = db.InvoiceNumbers
                                     .Where(x
                                         => x.Companyid == CompanyId)
                                     
                                     .Take(1)
                                     .Select(x => x.InvoiceNumber1)
                                     .FirstOrDefault();

            if (vinvoicenumber == null)
                vinvoicenumber = 1;
            else
                vinvoicenumber = vinvoicenumber + 1;

            InvoiceNumber invoice = new InvoiceNumber();
            invoice.Companyid = CompanyId;
            invoice.InvoiceNumber1 = vinvoicenumber;          
            db.SaveChanges();
            return Ok(strID);


        }

        public class clientSalesOrderItems
        {
            public string Title { get; set; }
            public decimal Price { get; set; }
            public long ProductId { get; set; }
            public decimal Qty { get; set; }
            public long DiscountDetailsId { get; set; }
            public long TaxDetailsId { get; set; }
            public long CouponId { get; set; }
            public string ImageURL { get; set; }
            public decimal Discount { get; set; }
            public decimal Tax { get; set; }
            public string CopounCode { get; set; }
            public decimal CopounPercentage { get; set; }
            public decimal CopounAmount { get; set; }
            public long VarianceId { get; set; }

        }

        [HttpGet]
        [Route("api/SalesInvoice/GetDiscountDetails")]
        public IEnumerable GetDiscountDetails()
        {
            try
            {
                var a = from b in db.Settings
                        select new
                        {
                            b.DiscountApplicable,
                            b.CouponApplicable,
                            b.FacebookSignup,

                        };
                return a;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("api/SalesDetail/SendInvoiceMail")]
        public IHttpActionResult SendInvoiceMail(List<clientSalesOrderItems> OrderItm, string strOrderNo, int strMemberId, decimal decTotalAmount , string vCompanyName , string vDomain)
        {
            List< ProjectComInfo> vCompanyDetails = getComDetails();
            List<ProjectMembInfo>  vMemberdet = GetMemberdet(strMemberId);
            List<ProjectDeliveryAdd> vMemberdelAddress = GetDeliveryAdd(strOrderNo);

            List<ProjectComcurrency> vCompanycurrency = getComcurrency();

           

            var a = (from p in db.SalesOrders.AsEnumerable()
                     join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                     where p.MemberId == strMemberId && p.OrderNo == strOrderNo
                     orderby p.SalesOrderId descending
                     select new
                     {

                         p.Amoount,
                         OrderItems = p.SalesOrderItems.AsEnumerable().Select(s => new
                         {
                             s.ProductPrice,
                             s.ProductId,
                             s.Quantity,
                             s.DiscountPercentage,
                             s.TaxPercentage,
                             s.CouponPercentage,
                             product = s.ProductDetail.Title,
                             s.ProductVarianceId,
                             Total = (s.Quantity * s.ProductPrice) - (s.DiscountPercentage) - (s.CouponPercentage) + (s.TaxPercentage),


                             Variance = s.ProductVarianceId == 0 ? null : (from v in db.ProductVariances.AsEnumerable()
                                                                           where v.ProductVarianceId == s.ProductVarianceId
                                                                           select new
                                                                           {
                                                                               v.VarianceType
                                                                           }
                                                                           ),

                         }),

                     }).ToList();


            //Msg Code
             //string strVerificationMsg = "Verification code from zapata, Your Verification Code is  " + strPassword;
            //Your authentication key
            string authKey = "338037AGkojtcSDiYL5f2b91e7P1";
            //Multiple mobiles numbers separated by comma
             string mobileNumber = "91" + Convert.ToString(vMemberdet[0].ContactNo);
            //string mobileNumber = "";
           // Sender ID, While using route4 sender id should be 6 characters long.
            string senderId = "zapata";
           // Your message to send, Add URL encoding here.
            //mailMsg.To.Add(vMemberdet[0].EmailId);
            //mailMsg.CC.Add(vCompanyDetails[0].EmailId);
            string message1 = HttpUtility.UrlEncode("Your order is confirmed in " + vCompanyDetails[0].CompanyName + " - Your Order Id :" + strOrderNo + " and price " + vCompanycurrency[0].CurrencyType + +decTotalAmount + " for more details visit http://"+vDomain+"/#!/ClientOrder/"+strOrderNo+" -Team "+ vCompanyName + "");
           // Prepare you post parameters
            StringBuilder sbPostData = new StringBuilder();
            sbPostData.AppendFormat("authkey={0}", authKey);
            sbPostData.AppendFormat("&mobiles={0}", mobileNumber);
            sbPostData.AppendFormat("&country={0}", 0);
            sbPostData.AppendFormat("&message={0}", message1);
            sbPostData.AppendFormat("&sender={0}", senderId);
            sbPostData.AppendFormat("&route={0}", "4");

            //Call Send SMS API
            string sendSMSUri = "https://api.msg91.com/api/sendhttp.php";
           // Create HTTPWebrequest
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
           // Close the response
            reader.Close(); response.Close();



            //Msg Code to Vendor
            // string strVerificationMsg = "Verification code from zapata, Your Verification Code is  " + strPassword;
            //Your authentication key
             string authKey1 = "338037AGkojtcSDiYL5f2b91e7P1";
           // Multiple mobiles numbers separated by comma
             string mobileNumber1 = "91" + vCompanyDetails[0].PhoneNo;
            //string mobileNumber = "";
            //Sender ID, While using route4 sender id should be 6 characters long.
             string senderId1 = "zapata";
            //Your message to send, Add URL encoding here.
            //mailMsg.To.Add(vMemberdet[0].EmailId);
            //mailMsg.CC.Add(vCompanyDetails[0].EmailId);
            string message2 = HttpUtility.UrlEncode("Hello " + vCompanyDetails[0].CompanyName + " - You Got a New Order ... New Order Id :" + strOrderNo + " and Order Value is : " + vCompanycurrency[0].CurrencyType + +decTotalAmount + " for more details visit http://"+vDomain+"/AdminIndex.html#!/home"); 
            //Prepare you post parameters
            StringBuilder sbPostData1 = new StringBuilder();
            sbPostData1.AppendFormat("authkey={0}", authKey1);
            sbPostData1.AppendFormat("&mobiles={0}", mobileNumber1);
            sbPostData.AppendFormat("&country={0}", 0);
            sbPostData1.AppendFormat("&message={0}", message2);
            sbPostData1.AppendFormat("&sender={0}", senderId1);
            sbPostData1.AppendFormat("&route={0}", "4");

            //Call Send SMS API
             string sendSMSUri1 = "https://api.msg91.com/api/sendhttp.php";
           // Create HTTPWebrequest
            HttpWebRequest httpWReq1 = (HttpWebRequest)WebRequest.Create(sendSMSUri1);
            //Prepare and Add URL Encoded data
             UTF8Encoding encoding1 = new UTF8Encoding();
            byte[] data1 = encoding1.GetBytes(sbPostData1.ToString());
            //Specify post method
             httpWReq1.Method = "POST"; httpWReq1.ContentType = "application/x-www-form-urlencoded";
            httpWReq1.ContentLength = data1.Length;
            using (Stream stream = httpWReq1.GetRequestStream())
            {
                stream.Write(data1, 0, data1.Length);
            }
            //Get the response
            HttpWebResponse response1 = (HttpWebResponse)httpWReq1.GetResponse();
            StreamReader reader1 = new StreamReader(response1.GetResponseStream());
            string responseString1 = reader1.ReadToEnd();
            //Close the response
            reader1.Close(); response1.Close();

            //MailMessage mailMsg = new MailMessage();
            //// From
            //MailAddress mailAddress = new MailAddress(vCompanyDetails[0].EmailId, "Order Confirmation");
            //mailMsg.From = mailAddress;
            //// Subject and Body
            //mailMsg.Subject = "Order Confirmation- Your Order with " + vCompanyDetails[0].CompanyName;
            //string messegeitem = string.Empty;
            //messegeitem = "<html> ";
            //messegeitem += "<head> ";
            //messegeitem += "<title> Order Confirmation- Your Order with " + vCompanyDetails[0].CompanyName + "</title>";
            //messegeitem += "</head>";
            //messegeitem += "<body style = \"padding:0px;margin:0px\" >";
            //messegeitem += "<div style = \"background-color:#f2f2f2;height:100%\" >";
            //messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" > ";
            //messegeitem += "<tbody>";
            //messegeitem += "<tr>";
            //messegeitem += "<td align = \"center\" valign = \"top\" style = \"padding:0 20px\" >";
            //messegeitem += "<table align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            //messegeitem += "<tbody><tr> ";
            //messegeitem += "<td width = \"320\" align = \"center\" valign = \"top\" >";
            //messegeitem += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            //messegeitem += "<tbody> ";
            //messegeitem += "<tr> ";
            //messegeitem += "<td height = \"30\" style = \"height:30px;line-height:30px;text-align:center\" > ";
            //messegeitem += "<img align = \"center\" border = \"0\"  Width=300px\" alt = \"Mithas\"  src='http://webapi.kasimedufishandmeat.in/Uploads/Companydetails/invoice.jpg' style = \"margin:audio\" ><br><h2 style = \"margin:0px;font-family:Arial,sans-serif;font-size:20px;color:#3a3a3a;\" > </h2></td>";
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
            //messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:17px;color:#3a3a3a;padding:15px\" > Hi " + vMemberdet[0].MemberName + "</p>";
            //messegeitem += "<table width = \"100%\" style = \"font-family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\">";          
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\">Greetings from " + vCompanyDetails[0].CompanyName + "!</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\">Thanks for Your Order ,Your Order successfully placed.</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> Your Order No : " + strOrderNo + "</td><td></td>";
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
            //messegeitem += "<td width = \"100%\">" + vMemberdelAddress[0].MemberName.ToString() + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> " + vMemberdelAddress[0].AddressLine1.ToString() + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> " + vMemberdelAddress[0].AddressLine2.ToString() + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> " + vMemberdelAddress[0].City.ToString() + ", " + vMemberdelAddress[0].State.ToString() + " - " + vMemberdelAddress[0].PinCode.ToString() + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> LandMark : " + vMemberdelAddress[0].DeliveryLandMark.Trim() + "</td><td></td>";
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
            //messegeitem += "<td align = \"center\" valign = \"top\" style = \"color:#777777;font-family:Arial,sans-serif;font-size:12px;line-height:23px;font-weight:400\" > Copyright© -2021 " + vCompanyDetails[0].CompanyName + ".All Rights Reserved.";
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
            //mailMsg.To.Add(vMemberdet[0].EmailId);


            //mailMsg.IsBodyHtml = true;
            //SmtpClient emailClient = new SmtpClient("208.91.198.202", 587);
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



            //MailMessage mailMsg1 = new MailMessage();
            //// From
            //MailAddress mailAddress1 = new MailAddress("contact@sysmedacmicrosoft.com", "Hello  "+ vCompanyDetails[0].CompanyName +"");
            //mailMsg1.From = mailAddress1;
            //// Subject and Body
            //mailMsg1.Subject = "New Order";

            //string messegeitem1 = string.Empty;
            //messegeitem1 = "<html> ";
            //messegeitem1 += "<head> ";
            //messegeitem1 += "<title> New Order- Hello" + vCompanyDetails[0].CompanyName +" You got a new order </title>";
            //messegeitem1 += "</head>";
            //messegeitem1 += "<body style = \"padding:0px;margin:0px\" >";
            //messegeitem1 += "<div style = \"background-color:#f2f2f2;height:100%\" >";
            //messegeitem1 += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" > ";
            //messegeitem1 += "<tbody>";
            //messegeitem1 += "<tr>";
            //messegeitem1 += "<td align = \"center\" valign = \"top\" style = \"padding:0 20px\" >";
            //messegeitem1 += "<table align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            //messegeitem1 += "<tbody><tr> ";
            //messegeitem1 += "<td width = \"320\" align = \"center\" valign = \"top\" >";
            //messegeitem1 += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            //messegeitem1 += "<tbody> ";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td height = \"30\" style = \"height:30px;line-height:30px;text-align:center\" > ";
            //messegeitem1 += "<img align = \"center\" border = \"0\"  Width=300px\" alt = \"Mithas\"  src='http://webapi.kasimedufishandmeat.in/Uploads/Companydetails/invoice.jpg' style = \"margin:audio\" ><br><h2 style = \"margin:0px;font-family:Arial,sans-serif;font-size:20px;color:#3a3a3a;\" > </h2></td>";
            //messegeitem1 += " </tr>";
            //messegeitem1 += " <tr> ";
            //messegeitem1 += " <td> </td> ";
            //messegeitem1 += " </tr>";
            //messegeitem1 += " </tbody> ";
            //messegeitem1 += " </table> ";
            //messegeitem1 += " </td> ";
            //messegeitem1 += " </tr> ";
            //messegeitem1 += " </tbody> ";
            //messegeitem1 += " </table> ";
            //messegeitem1 += " </td> ";
            //messegeitem1 += " </tr> ";
            //messegeitem1 += " </tbody>";
            //messegeitem1 += "</table>";
            //messegeitem1 += "<table width = \"76%\" align = \"center\" cellpadding =\"0\" cellspacing = \"0\" border = \"0\" style = \"background-color:#fff;box-shadow:0px 0px 5px #ccc;border-left:5px\">";
            //messegeitem1 += "<tbody> ";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td align = \"left\" valign = \"top\" style = \"padding:3%\" > ";
            //messegeitem1 += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:17px;color:#3a3a3a;padding:15px\" > Hi " + vMemberdet[0].MemberName + "</p>";
            //messegeitem1 += "<table width = \"100%\" style = \"font-family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\">";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\">Greetings from" + vCompanyDetails[0].CompanyName + "!</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\">Thanks for Your Order ,Your Order successfully placed. Your Order No : " + strOrderNo + "</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\"></td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\">Delivery Address</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\"></td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\">" + vMemberdelAddress[0].MemberName.ToString() + "</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\"> " + vMemberdelAddress[0].AddressLine1.ToString() + "</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\"> " + vMemberdelAddress[0].AddressLine2.ToString() + "</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\"> " + vMemberdelAddress[0].City.ToString() + ", " + vMemberdelAddress[0].State.ToString() + " - " + vMemberdelAddress[0].PinCode.ToString() + "</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr> ";
            //messegeitem1 += "<td width = \"100%\"> LandMark : " + vMemberdelAddress[0].DeliveryLandMark.Trim() + "</td><td></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "</table>";
            //messegeitem1 += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\" >  Regards, <br/>Team " + vCompanyDetails[0].CompanyName + ".</p> ";
            //messegeitem1 += "<p style = \"text -align:left;font-family:Arial,sans-serif;color:#2f2f2f\" > ";
            //messegeitem1 += "</p><p style = \"text -align:justify;font-family:Arial,sans-serif;padding:15px;color:grey\" >";
            //messegeitem1 += "<small> CONFIDENTIALITY NOTICE:<br> ";
            //messegeitem1 += "Proprietary / Confidential information belonging to " + vCompanyDetails[0].CompanyName + " and its affiliates";
            //messegeitem1 += "may be contained in this message.If you are not a recipient indicated or intended in this message(or responsible for delivery of this message to such person), or you think for any reason that this message may have been addressed to you in error, you may not use or copy or deliver this message to anyone else.In such case, you should destroy this message and are asked to notify the sender by reply email.</small>";
            //messegeitem1 += "</p> ";
            //messegeitem1 += "<p></p> ";
            //messegeitem1 += "</td> ";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "</tbody>";
            //messegeitem1 += "</table>";
            //messegeitem1 += "<table width = \"100%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            //messegeitem1 += "<tbody>";
            //messegeitem1 += "<tr>";
            //messegeitem1 += "<td><table width = \"40%\" align = \"center\" cellpadding = \"0\" cellspacing = \"0\" border = \"0\" >";
            //messegeitem1 += "<tbody><tr> ";
            //messegeitem1 += "<td colspan = \"3\" style = \"padding:10px\" >";
            //messegeitem1 += "</td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "</tbody></table> </td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr>";
            //messegeitem1 += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr>";
            //messegeitem1 += "<td align = \"center\" valign = \"top\" style = \"color:#777777;font-family:Arial,sans-serif;font-size:12px;line-height:23px;font-weight:400\" > Copyright© -2021 " + vCompanyDetails[0].CompanyName + ".All Rights Reserved.";
            //messegeitem1 += "</td>";
            //messegeitem1 += "</tr>";
            //messegeitem1 += "<tr>";
            //messegeitem1 += "<td height = \"12\" style = \"height:12px;line-height:12px\" ></td> ";
            //messegeitem1 += "</tr> ";
            //messegeitem1 += "</tbody>";
            //messegeitem1 += "</table><div class=\"yj6qo\"></div><div class=\"adL\">";
            //messegeitem1 += "</div></div>";
            //messegeitem1 += " </body>";
            //messegeitem1 += "</html>";
            //mailMsg1.Body = messegeitem1;
            // mailMsg1.To.Add(vCompanyDetails[0].EmailId);
            ////mailMsg1.To.Add("hemanth@sysmedac.com");


            //mailMsg1.IsBodyHtml = true;
            //SmtpClient emailClient1 = new SmtpClient("208.91.198.202", 587);
            //System.Net.NetworkCredential credentials1 = new System.Net.NetworkCredential("contact@sysmedacmicrosoft.com", "6^6Ftr6a");
            //emailClient1.Credentials = credentials1;
            //try
            //{
            //    emailClient1.Send(mailMsg1);
            //}
            //catch (Exception ex)
            //{
            //    string register = ex.ToString();
            //}





            //for (int i = 0; i < OrderItm.Count; i++)
            //{
            //}

            return Ok("Success");
        }

        class ProjectComInfo
        {
            public string CompanyName { get; set; }
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Country { get; set; }
            public string PinCode { get; set; }
            public string GSTNo { get; set; }
            public string CINno { get; set; }
            public string PhoneNo { get; set; }

            public string EmailId { get; set; }
            public string InvoiceLogo { get; set; }
        }

        private List<ProjectComInfo> getComDetails()
        {
            var a = (from p in db.CompanyDetails.AsEnumerable()
                     select new ProjectComInfo()
                     {
                         CompanyName = p.CompanyName,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         City = p.City,
                         State = p.State,
                         Country = p.Country,
                         PinCode = p.PinCode,
                         GSTNo = p.GSTNo,
                         CINno = p.CINno,
                         PhoneNo = p.PhoneNo,
                         EmailId = p.EmailId,
                         InvoiceLogo = p.InvoiceLogo
                     });
            return a.ToList();
        }


        class ProjectComcurrency
        {
           
            public string CurrencyType { get;  set; }
        }

        private List<ProjectComcurrency> getComcurrency()
        {
            var a = (from r in db.Settings.AsEnumerable()
                     select new ProjectComcurrency()
                     {
                       CurrencyType =  r.CurrencyType
                     });
            return a.ToList();
        }




        class ProjectMembInfo
        {
            public string MemberName { get; set; }
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public Nullable<long> PinCode { get; set; }
            public Nullable<long> ContactNo { get; set; }
            public string EmailId { get; set; }
        }

        private List<ProjectMembInfo> GetMemberdet(int strMemberId)
        {
            var a = (from p in db.MemberDetails.AsEnumerable()
                     where p.MemberId== strMemberId
                     select new ProjectMembInfo()
                     {
                         MemberName = p.MemberName,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         City = p.City,
                         State = p.State,
                         PinCode = p.PinCode,
                         ContactNo = p.ContactNo,
                         EmailId = p.EmailId
                     });
            return a.ToList();
        }
        class ProjectDeliveryAdd
        {
            public string MemberName { get; set; }
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string PinCode { get; set; }
            public string DeliveryLandMark { get; set; }
        }

        private List<ProjectDeliveryAdd> GetDeliveryAdd(string strOrderNo)
        {
            var a = (from p in db.SalesOrders.AsEnumerable()
                     where p.OrderNo == strOrderNo
                     select new ProjectDeliveryAdd()
                     {
                         MemberName = p.DeliveryName,
                         AddressLine1 = p.DeliveryAddressLine1,
                         AddressLine2 = p.DeliveryAddressLine2,
                         City = p.DeliveryCity,
                         State = p.DeliveryState,
                         PinCode = p.DeliveryPinCode,
                         DeliveryLandMark = p.DeliveryLandMark
                     });
            return a.ToList();
        }

        //Edit
        [HttpGet]
        [Route("api/SalesDetail/GetCompanyDetails")]
        public IEnumerable GetCompanyDetails()
        {
            var a = (from p in db.CompanyDetails.AsEnumerable()
                     select new
                     {
                         CompanyName = p.CompanyName,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         City = p.City,
                         State = p.State,
                         Country = p.Country,
                         PinCode = p.PinCode,
                         GSTNo = p.GSTNo,
                         CINno = p.CINno,
                         PhoneNo = p.PhoneNo,
                         EmailId = p.EmailId,
                         InvoiceLogo = p.InvoiceLogo,
                     });
            return a;
        }
        [HttpGet]
        [Route("api/SalesDetail/GetMemberDetails")]
        public IEnumerable GetMemberDetails(int strMemberId)
        {
            var a = (from p in db.MemberDetails.AsEnumerable()
                     where p.MemberId == strMemberId
                     select new
                     {
                         MemberName = p.MemberName,
                         AddressLine1 = p.AddressLine1,
                         AddressLine2 = p.AddressLine2,
                         City = p.City,
                         State = p.State,
                         PinCode = p.PinCode,
                         ContactNo = p.ContactNo,
                         EmailId = p.EmailId
                     });
            return a;
        }

        [HttpGet]
        [Route("api/Reorder/GetClientSalOrderitemDetailsforReorder")]
        public IEnumerable GetClientSalOrderitemDetailsforReorder(int SalesOrderId)
        {
            try
            {

                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                var a = (from p in db.SalesOrderItems.AsEnumerable()
                         where p.SalesOrderId == SalesOrderId
                         select new
                         {
                             //p.TaxPercentage,
                             Productdetails = db.ProductDetails.AsEnumerable().Select(s => new
                             {

                                 Title = s.Title,
                                 // Price = s.Price,
                                 Picture = s.Picture,
                                 ProductId = s.ProductId,
                                 DiscountDetailsId = s.DiscountDetailsId,
                                 CouponId = s.CouponId,
                                 TaxDetail = s.TaxDetailsId,
                                 Description = s.Description,
                                 CurDate = currentdatetime,
                                 p.ProductVarianceId,

                                 stock = s.ProductStocks.AsEnumerable().Select(t => new
                                 {
                                     t.StockCount
                                 }),





                                 Discount = s.DiscountDetailsId != null ? Convert.ToString(s.DiscountDetail.DiscountPercentage) : "",
                                 DisFrom = s.DiscountDetailsId != null ? (s.DiscountDetail.ValidFrom) : null,
                                 DisTo = s.DiscountDetailsId != null ? (s.DiscountDetail.ValidTo) : null,

                                 CouponCode = s.CouponId != null ? Convert.ToString(s.CouponDetail.Code) : "",
                                 CouponPercentade = s.CouponId != null ? Convert.ToString(s.CouponDetail.DiscountPercentage) : "",
                                 TaxPercentage = s.TaxDetailsId != null ? Convert.ToString(s.TaxDetail.Percentage) : "0",
                                 s.Variance,
                                 showVariance = s.Variance == 1 ? "none" : "block",
                                 TodaydealAmt = s.TodayDeals.AsEnumerable().Select(u => new
                                 {
                                     TodayDiscountAmount = u.Date == currentdatetime ? u.TodayDiscountAmount : 0
                                 })

                                

                             }).Where(t => t.ProductId == p.ProductId),
                             p.ProductId,

                             p.Quantity,
                             orderno = db.SalesOrders
                                                       .Where(x => x.SalesOrderId == p.SalesOrderId).Take(1)
                                                       .Select(x => x.OrderNo).FirstOrDefault(),
                             orderdate = db.SalesOrders
                                                       .Where(x => x.SalesOrderId == p.SalesOrderId).Take(1)
                                                       .Select(x => x.OrderDate).FirstOrDefault(),
                             Price = db.ProductVariances.Where(x => x.ProductVarianceId == p.ProductVarianceId).Take(1)
                                                       .Select(x => x.sellingPrice).FirstOrDefault(),

                             MRpPrice = db.ProductVariances.Where(x => x.ProductVarianceId == p.ProductVarianceId).Take(1)
                                                       .Select(x => x.VariancePrice).FirstOrDefault(),
                                                       
                             VarianceType = db.ProductVariances.Where(x => x.ProductVarianceId == p.ProductVarianceId).Take(1)
                                                       .Select(x => x.VarianceType).FirstOrDefault(),
                             ProductVarianceId = db.ProductVariances.Where(x => x.ProductId == p.ProductId).Take(1)
                                                       .Select(x => x.ProductVarianceId).FirstOrDefault(),

                             Image1 = db.ProductImages.Where(x => x.ProductId == p.ProductId).Take(1)
                                                       .Select(x => x.ImageURL).FirstOrDefault(),


                             TaxDetailsId = db.TaxDetails.Where(x => x.ProductId == p.ProductDetail.Title && x.IsActive==1).Take(1)
                                                       .Select(x => x.Percentage).FirstOrDefault(),




                         })
                       ;


                return a;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
       
       [HttpGet]
        [Route("api/Reorder/GetClientSalOrderDetailsReorder")]
        public IEnumerable GetClientSalOrderDetailsReorder(int memberid, int SalesOrderId)
        {
            try
            {
                //log.Debug("api/SalOrde/GetSalOrderDetails");
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where p.MemberId == memberid && p.SalesOrderId == SalesOrderId
                         orderby p.SalesOrderId descending
                         select new
                         {

                             sno = ++vsno,
                             p.OrderNo,
                             //OrderNo1 = "tex" + p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("MM/dd/yyyy"),
                             Qty = db.SalesOrderItems
                                                                      .Where(x => x.SalesOrderId == p.SalesOrderId).Sum(
                                                                         x => x.Quantity),
                             p.Amoount,
                             p.Status,
                             MemberName = q.MemberName,
                             p.SalesOrderId,
                             p.DeliveryName,
                             p.DeliveryAddressLine1,
                             p.DeliveryAddressLine2,
                             p.DeliveryContactNo,
                             p.DeliveryCity,
                             p.DeliveryState,
                             p.DeliveryPinCode,
                             p.DeliveryLandMark,
                             p.DeliveryEmail,
                             Active = p.Status != "Ordered" ? "true" : "false",
                             OrderItems = p.SalesOrderItems.AsEnumerable().Select(s => new
                             {
                                 s.ProductPrice,
                                 s.ProductId,
                                 s.Quantity,
                                 s.DiscountPercentage,
                                 s.TaxPercentage,
                                 s.CouponPercentage,
                                 product = s.ProductDetail.Title,
                                 s.ProductVarianceId,
                                 Variance = s.ProductVarianceId == 0 ? null : (from v in db.ProductVariances.AsEnumerable()
                                                                               where v.ProductVarianceId == s.ProductVarianceId
                                                                               select new
                                                                               {
                                                                                   v.VarianceType,

                                                                               }
                                                                               ),

                                 //VariancePrice = s.ProductVarianceId == 0 ? null : (from v in db.ProductVariances.AsEnumerable()
                                 //                                              where v.ProductVarianceId == s.ProductVarianceId
                                 //                                              select new
                                 //                                              {

                                 //                                                  v.VariancePrice
                                 //                                              }
                                 //                                              ),
                                

                             }),
                             Productdetails = db.ProductDetails.AsEnumerable().Select(s => new
                             {

                                 Title = s.Title,
                                 Price = s.Price,
                                 Picture = s.Picture,
                                 ProductId = s.ProductId,
                                 DiscountDetailsId = s.DiscountDetailsId,
                                 CouponId = s.CouponId,
                                 TaxDetail = s.TaxDetailsId,
                                 Description = s.Description,
                                 CurDate = currentdatetime,
                                 Image1 = s.ProductImages.AsEnumerable().Select(d => new
                                 {
                                     s.ProductId,
                                     d.ImageURL
                                 }).OrderBy(c => c.ProductId),
                                 stock = s.ProductStocks.AsEnumerable().Select(t => new
                                 {
                                     t.StockCount
                                 }),

                                 Discount = s.DiscountDetailsId != null ? Convert.ToString(s.DiscountDetail.DiscountPercentage) : "",
                                 DisFrom = s.DiscountDetailsId != null ? (s.DiscountDetail.ValidFrom) : null,
                                 DisTo = s.DiscountDetailsId != null ? (s.DiscountDetail.ValidTo) : null,

                                 CouponCode = s.CouponId != null ? Convert.ToString(s.CouponDetail.Code) : "",
                                 CouponPercentade = s.CouponId != null ? Convert.ToString(s.CouponDetail.DiscountPercentage) : "",
                                 TaxPercentage = s.TaxDetailsId != null ? Convert.ToString(s.TaxDetail.Percentage) : "0",
                                 s.Variance,
                                 showVariance = s.Variance == 1 ? "none" : "block",
                                 TodaydealAmt = s.TodayDeals.AsEnumerable().Select(u => new
                                 {
                                     TodayDiscountAmount = u.Date == currentdatetime ? u.TodayDiscountAmount : 0
                                 })
                             }),



                             Courier = p.CourierDetails.AsEnumerable().Select(o => new
                             {
                                 o.CourierDetailId,
                                 o.CourierName,
                                 o.CourierNo,


                             })

                         });
                return a;
            }
            catch (Exception ex)
            {
                //log.Error(ex.Message, ex);
                return null;
            }
        }

        public class OrderClass
        {
            public string orderId;
            public string amount;
            public string contact;
            public string name;
            public string product;
            public string email;
        }

        [HttpPost]
        [Route("api/CartPayment/RazsorPayTest")]
        public IHttpActionResult RazsorPayTest( string TotalAmount)
        {

         
            Random randomObj = new Random();
            string transactionId = randomObj.Next(10000000, 100000000).ToString();
            string key = "rzp_test_wk6FALHcivT0vo";
            string secret = "QpNywt0dlTBUYVQyDQlPDZGQ";
            Razorpay.Api.RazorpayClient client = new Razorpay.Api.RazorpayClient(key, secret);
            Dictionary<string, object> options = new Dictionary<string, object>();
            options.Add("amount", (Convert.ToInt32(50) * 100));  // Amount will in paise
            options.Add("receipt", transactionId);
            options.Add("currency", "INR");
            options.Add("payment_capture", "0"); // 1 - automatic  , 2 - manual
                                                 //options.Add("notes", "-- You can put any notes here --");
            Razorpay.Api.Order orderResponse = client.Order.Create(options);
            string orderId = orderResponse["id"].ToString();

            return Ok(orderId);


        }

        //[HttpPost]
        //[Route("api/CartPayment/RazsorPayTest")]
        //public IHttpActionResult RazsorPayTest([FromBody]JObject jsonString, string TotalAmount)
        //{

        //    string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
        //    PaymentCustomardetail Objjson = JsonConvert.DeserializeObject<PaymentCustomardetail>(json);

        //    Random randomObj = new Random();
        //    string transactionId = randomObj.Next(10000000, 100000000).ToString();
        //    string key = "rzp_test_wk6FALHcivT0vo";
        //    string secret = "QpNywt0dlTBUYVQyDQlPDZGQ";
        //    Razorpay.Api.RazorpayClient client = new Razorpay.Api.RazorpayClient(key, secret);
        //    Dictionary<string, object> options = new Dictionary<string, object>();
        //    options.Add("amount", (Convert.ToInt32(50) * 100));  // Amount will in paise
        //    options.Add("receipt", transactionId);
        //    options.Add("currency", "INR");
        //    options.Add("payment_capture", "0"); // 1 - automatic  , 2 - manual
        //                                         //options.Add("notes", "-- You can put any notes here --");
        //    Razorpay.Api.Order orderResponse = client.Order.Create(options);
        //    string orderId = orderResponse["id"].ToString();

        //    return Ok(orderId);

        //    // Create order model for return on view
        //    //OrderModel orderModel = new OrderModel
        //    //{
        //    //    orderId = orderResponse.Attributes["id"],
        //    //    razorpayKey = key,
        //    //    amount = (Convert.ToInt32(50) * 100),
        //    //    currency = "INR",
        //    //    name = Objjson.MemberName.ToString(),
        //    //    email = Objjson.EmailId.ToString(),
        //    //    contactNumber = Objjson.ContactNo.ToString(),
        //    //    address = Objjson.City.ToString(),
        //    //    description = "Testing description"
        //    //};


        //    //QueryString1.amount = (Convert.ToInt32(50) * 100).ToString();
        //    //QueryString1.contact = Objjson.ContactNo.ToString();
        //    //QueryString1.name = Objjson.MemberName.ToString();
        //    //QueryString1.product = Objjson.City.ToString();
        //    //QueryString1.email = Objjson.EmailId.ToString();

        //    //Dictionary<string, object> input = new Dictionary<string, object>();
        //    //input.Add("amount", QueryString1.amount);
        //    //input.Add("currency", "INR");
        //    //input.Add("payment_capture", 1);

        //    //string key = "rzp_test_wk6FALHcivT0vo";
        //    //string secret = "QpNywt0dlTBUYVQyDQlPDZGQ";

        //    //RazorpayClient client = new RazorpayClient(key, secret);

        //    //Order order = client.Order.Create(input);
        //    //QueryString1.orderId = order["id"].ToString();
        //    //try
        //    //{
        //    //    string paymentId = "razorpay_payment_id";
        //    //    string orderId = "razorpay_order_id";
        //    //    string signature = "razorpay_signature";

        //    //    string key = "key";
        //    //    string secret = "secret";

        //    //    RazorpayClient client = new RazorpayClient(key, secret);

        //    //    Dictionary<string, string> attributes = new Dictionary<string, string>();

        //    //    attributes.Add("razorpay_payment_id", paymentId);
        //    //    attributes.Add("razorpay_order_id", orderId);
        //    //    attributes.Add("razorpay_signature", signature);

        //    //    Utils.verifyPaymentSignature(attributes);
        //    //    pTxnId.InnerText = paymentId;
        //    //    pOrderId.InnerText = orderId;
        //    //    return ("Transaction Successfull");
        //    //}
        //    //catch (Exception)
        //    //{
        //    //    return ("Transaction Unsuccessfull");
        //    //}


        //}

        //private IHttpActionResult view(string v, OrderModel orderModel)
        //{
        //    throw new NotImplementedException();
        //}



        //protected void Page_Load(object sender, EventArgs e)
        //{
        //    try
        //    {
        //        string paymentId = Request.Form["razorpay_payment_id"];
        //        string orderId = Request.Form["razorpay_order_id"];
        //        string signature = Request.Form["razorpay_signature"];

        //        string key = "key";
        //        string secret = "secret";

        //        RazorpayClient client = new RazorpayClient(key, secret);

        //        Dictionary<string, string> attributes = new Dictionary<string, string>();

        //        attributes.Add("razorpay_payment_id", paymentId);
        //        attributes.Add("razorpay_order_id", orderId);
        //        attributes.Add("razorpay_signature", signature);

        //        Utils.verifyPaymentSignature(attributes);
        //        pTxnId.InnerText = paymentId;
        //        pOrderId.InnerText = orderId;
        //        h1Message.InnerText = "Transaction Successfull";
        //    }
        //    catch (Exception)
        //    {
        //        h1Message.InnerText = "Transaction Unsuccessfull";
        //    }
        //}


        //[HttpGet]
        //[Route("api/ProductDetail/GetProductDetails")]
        //public IEnumerable GetProductDetails(int ProductId)
        //{
        //    try
        //    {
        //        TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        //        DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

        //        string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
        //        TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

        //        DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

        //        var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
        //                             join q in db.SubCategories.AsEnumerable() on p.SubCategoryId equals q.SubCategoryId
        //                             join r in db.Categories.AsEnumerable() on q.CategoryId equals r.CategoryId
        //                             where p.IsActive == 1 && p.ProductId == ProductId
        //                             orderby p.Title ascending
        //                             select new
        //                             {
        //                                 Title = p.Title,
        //                                 Price = p.Price,
        //                                 Picture = p.Picture,
        //                                 ProductId = p.ProductId,
        //                                 DiscountDetailsId = p.DiscountDetailsId,
        //                                 CouponId = p.CouponId,
        //                                 TaxDetail = p.TaxDetailsId,
        //                                 Description = p.Description,
        //                                 CategoyName = r.CategoyName,
        //                                 SubCategoryName = q.SubCategoryName,
        //                                 SubCategoryId = p.SubCategoryId,
        //                                 CategoryId = q.CategoryId,
        //                                 Image1 = p.ProductImages.AsEnumerable().Select(s => new
        //                                 {
        //                                     s.ProductId,
        //                                     s.ImageURL
        //                                 }).OrderBy(c => c.ProductId),
        //                                 stock = p.ProductStocks.AsEnumerable().Select(t => new
        //                                 {
        //                                     t.StockCount
        //                                 }),

        //                                 Discount = p.DiscountDetailsId != null ? Convert.ToString(p.DiscountDetail.DiscountPercentage) : "",
        //                                 DisFrom = p.DiscountDetailsId != null ? (p.DiscountDetail.ValidFrom) : null,
        //                                 DisTo = p.DiscountDetailsId != null ? (p.DiscountDetail.ValidTo) : null,
        //                                 CurDate = currentdatetime,
        //                                 CouponCode = p.CouponId != null ? Convert.ToString(p.CouponDetail.Code) : "",
        //                                 CouponPercentade = p.CouponId != null ? Convert.ToString(p.CouponDetail.DiscountPercentage) : "",
        //                                 TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
        //                                 p.Variance,
        //                                 showVariance = p.Variance == 1 ? "none" : "block",
        //                                 TodaydealAmt = p.TodayDeals.AsEnumerable().Select(u => new
        //                                 {
        //                                     TodayDiscountAmount = u.Date == currentdatetime ? u.TodayDiscountAmount : 0
        //                                 })
        //                             });

        //        return TrendingItems;
        //    }
        //    catch (WebException ex)
        //    {
        //        if (ex.Status == WebExceptionStatus.Timeout)
        //        {
        //            // Handle timeout exception
        //            return "TimeOut";
        //        }
        //        else
        //            return null;
        //    }
        //}


    }

    internal class OrderModel
    {
        public dynamic orderId { get;  set; }
        public string razorpayKey { get;  set; }
        public int amount { get;  set; }
        public string currency { get;  set; }
        public string name { get;  set; }
        public string contactNumber { get;  set; }
        public string email { get;  set; }
        public string address { get;  set; }
        public string description { get;  set; }
    }

    internal class PaymentCustomardetail
    {
        public string ContactNo { get;  set; }
        public string MemberName { get;  set; }
        public string City { get;  set; }
        public string EmailId { get;  set; }
    }
}
