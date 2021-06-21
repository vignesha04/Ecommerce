using EcommerceAPI.Models;
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

namespace EcommerceAPI.Controllers.Client
{
    [EnableCors("*", "*", "GET,POST")]
    public class ContactUsController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        public object Name { get; private set; }
        public object Email { get; private set; }
        public object Message { get; private set; }

        [HttpGet]
        [Route("api/ContactUs/GetContactUsAdminId")]
        public IEnumerable GetContactUsAdminId()
        {
            var a = (from p in db.ContactUsAdmins.AsEnumerable()
                     select new
                     {
                         ContactUsAdminId = p.ContactUsAdminId,
                         ThemeId = p.ThemeId,
                         Address = p.Address,
                         Address1 = p.Address1,
                         ContactNo = p.ContactNo,
                         Description = p.Description,
                         EmailId = p.EmailId,
                         Iframe=p.Iframe
                         

                     });
            return a;
        }






        [HttpPost]
        [Route("api/ContactUs/sendmail")]
        public IHttpActionResult RegisterMemberDetails(string Email, string Name, string Message)
        {
            List<ProjectComInfo> vCompanyDetails = getComDetails();



            //Msg Code
            ///string strVerificationMsg="Verification code from zapata, Your Verification Code is  "+strPassword;
            //Your authentication key 
            string authKey = "338037AGkojtcSDiYL5f2b91e7P1";
            //Multiple mobiles numbers separated by comma 
            string mobileNumber = "91" + vCompanyDetails[0].PhoneNo;
            // string mobileNumber = "";
            //Sender ID,While using route4 sender id should be 6 characters long. 
            string senderId = "zapata";
            //Your message to send, Add URL encoding here. 
            //mailMsg.To.Add(vMemberdet[0].EmailId);
            //mailMsg.CC.Add(vCompanyDetails[0].EmailId);
            string message1 = HttpUtility.UrlEncode("You Received New Enquiry From " + Name + ",Mobile No " + Email + " Message " + Message + " ");
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

            //  string strPassword = CreateRandomPassword(7);
            //MailMessage mailMsg = new MailMessage();
            //// From
            //MailAddress mailAddress = new MailAddress("contact@arcnuts.com", "Enquiry From "+ vCompanyDetails[0].CompanyName);
            //mailMsg.From = mailAddress;

            //// Subject and Body
            //mailMsg.Subject = "New Enquiry From "+ vCompanyDetails[0].CompanyName;
            //string messegeitem = string.Empty;

            //messegeitem = "<html> ";
            //messegeitem += "<head> ";
            //messegeitem += "<title> New Enquiry </title>";
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
            //messegeitem += "<td height = \"15\" style = \"height:15px;line-height:15px;text-align:center\" > ";
            //messegeitem += "<img align = \"center\" border = \"0\"  Width=300px\" alt = \"Sysmedac Ecom\" src =\"" + vCompanyDetails[0].WebsiteLogo + "\" style = \"margin:audio\" ><br><h2 style = \"margin:0px;font-family:Arial,sans-serif;font-size:20px;color:#3a3a3a;\" > " +
            //       "</h2></td>";
            //messegeitem += " </tr>";
            //messegeitem += " <tr> ";
            //messegeitem += " <td> &nbsp;</td> ";
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
            //messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:17px;color:#3a3a3a;padding:15px\" > Hi Arnuts Ecom, </p>";
            //messegeitem += "<table width = \"100%\" style = \"font-family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\">";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\">You Got a New Enquiry From " + vCompanyDetails[0].CompanyName + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"></td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"></td><td></td>";
            //messegeitem += "</tr>";

            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> Name : " + Name + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> Email : " + Email + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //messegeitem += "<td width = \"100%\"> Message : " + Message + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            ////messegeitem += "<td width = \"100%\"> code: " + strPassword + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "<tr> ";
            //// messegeitem += "<td width = \"100%\"> Password : " + Login.Password.Trim() + "</td><td></td>";
            //messegeitem += "</tr>";
            //messegeitem += "</table>";
            ////messegeitem += "<p style = \"font -family:Arial,sans-serif;text-align:left;font-size:15px;color:#3a3a3a;padding:15px\" > Regards, <br/>Team Sysmedac Ecom.</p> ";
            ////messegeitem += "<p style = \"text -align:left;font-family:Arial,sans-serif;color:#2f2f2f\" > ";
            ////messegeitem += "</p><p style = \"text -align:justify;font-family:Arial,sans-serif;padding:15px;color:grey\" >";
            ////messegeitem += "<small> CONFIDENTIALITY NOTICE:<br> ";
            ////messegeitem += "Proprietary / Confidential information belonging to Sysmedac Ecom and its affiliates";
            ////messegeitem += "may be contained in this message.If you are not a recipient indicated or intended in this message(or responsible for delivery of this message to such person), or you think for any reason that this message may have been addressed to you in error, you may not use or copy or deliver this message to anyone else.In such case, you should destroy this message and are asked to notify the sender by reply email.</small>";
            ////messegeitem += "</p> ";
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
            //mailMsg.To.Add(vCompanyDetails[0].EmailId);


            //mailMsg.IsBodyHtml = true;
            //SmtpClient emailClient = new SmtpClient("arcnuts.com", 587);
            //System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("contact@arcnuts.com", "bc1t8M^3");
            //emailClient.Credentials = credentials;
            //try
            //{
            //    emailClient.Send(mailMsg);
            //}
            //catch (Exception ex)
            //{
            //    string register = ex.ToString();
            //}

            ////using (var mail = new MailMessage("contact@sysmedacmicrosoft.com", Login.EmailId))
            //{
            // string body = "Your message : [Ipaddress]/Views/ForgotPassword.html";
            // mail.Subject = "Forgot password";
            // mail.Body = body;
            // mail.IsBodyHtml = false;
            // var smtp = new SmtpClient();
            // smtp.Host = "smtp.gmail.com";
            // smtp.EnableSsl = true;
            // smtp.UseDefaultCredentials = false;
            // smtp.Credentials = new NetworkCredential("contact@sysmedacmicrosoft.com", "6^6Ftr6a");
            // smtp.Port = 587;
            // smtp.Send(mail);
            //}
            return Ok();
        }
        class ProjectComInfo
        {
            public string CompanyName { get; set; }
            public string EmailId { get; set; }
            public string WebsiteLogo { get; set; }
            public string PhoneNo { get;  set; }
        }

        private List<ProjectComInfo> getComDetails()
        {
            var a = (from p in db.CompanyDetails.AsEnumerable()
                     select new ProjectComInfo()
                     {
                         CompanyName = p.CompanyName,
                         EmailId = p.EmailId,
                         WebsiteLogo = p.WebsiteLogo,
                         PhoneNo=p.PhoneNo
                     });
            return a.ToList();
        }

    }

}
