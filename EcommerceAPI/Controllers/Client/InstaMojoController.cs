using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EcommerceAPI.Models;
using EcommerceAPI.PaymentGateway;
using InstamojoAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PayPal.PayPalAPIInterfaceService;
using PayPal.PayPalAPIInterfaceService.Model;
using paytm;

namespace EcommerceAPI.Controllers.Client
{
    [EnableCors("*", "*", "GET,POST")]
    public class InstaMojoController : ApiController
    {

        private EcommerceEntities db = new EcommerceEntities();

        static String clientId = "PAYPAL-CLIENT-ID";
        static String secret = "PAYPAL-CLIENT-SECRET";

        //public static HttpClient client()
        //{
        //    // Creating a sandbox environment
        //    PayPalEnvironment environment = new SandboxEnvironment(clientId, secret);

        //    // Creating a client for the environment
        //    PayPalHttpClient client = new PayPalHttpClient(environment);
        //    return client;
        //}

        public class clsSalOrderDelAdress
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
        }


        [HttpPost]
        [Route("api/CartPayment/InstaMojoPayment")]
        public IHttpActionResult InstaMojoPayment([FromBody]JObject jsonString, decimal TotalAmount)
        {
            /***** Create a new payment order *******/
            string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
            clsSalOrderDelAdress objjson = JsonConvert.DeserializeObject<clsSalOrderDelAdress>(json);

            Instamojo objClass = InstamojoImplementation.getApi("test_xF9fKqUPpz5xjHO3cDdBo0ITyC9YkxREehP", "test_99DEDkNnxEywk3Djz19NgHONwFnd3cE8P0IrqYQq05CY15BO6eXDXOsvKdtxGZpEGaZu6WEu9PMH75P5O3ToX6tYN5jh6arxzi0QDUdP6V88KurKLfab1nR50fz", "https://test.instamojo.com/v2/", "https://test.instamojo.com/oauth2/token/");
            //Instamojo objClass = InstamojoImplementation.getApi("hhy0e7SagUHbrFzyRapvVa3lR4jn7YVdGgh0BxjG", "GoOxemJpkpFzknUxa6YJBgMh9yq1hw0yATVdm1CY4rPh1KtN0JwSv7XD0WPvmA67EyEaDTOhhqWQsjUTVnA7iN9GSJhi3JuIOrnSm3bALTU4le4O5YxhnyS8HiypLsF9", "https://api.instamojo.com/v2/", "https://www.instamojo.com/oauth2/token/");

            PaymentOrder objPaymentRequest = new PaymentOrder();
            //Required POST parameters
            objPaymentRequest.name = objjson.MemberName;
            objPaymentRequest.email = objjson.EmailId;
            objPaymentRequest.phone = objjson.ContactNo;
            objPaymentRequest.amount = Convert.ToDouble(TotalAmount);
            string randomName = Path.GetRandomFileName();
            randomName = randomName.Replace(".", string.Empty);
            objPaymentRequest.transaction_id = randomName; // Unique Id to be provided
                        
            //objPaymentRequest.redirect_url = "http://localhost:56337/IndexPage.html#!/Invoice";
            objPaymentRequest.redirect_url = "https://groceryshopapp.sysmedacmicrosoft.com/#!/Invoice";
            
            //webhook is optional.
            //objPaymentRequest.webhook_url = "https://your.server.com/webhook";

            if (objPaymentRequest.validate())
            {
                if (objPaymentRequest.emailInvalid)
                {
                    return Ok("");
                }
                if (objPaymentRequest.nameInvalid)
                {
                    return Ok("Name is not valid");
                }
                if (objPaymentRequest.phoneInvalid)
                {
                    return Ok("Phone is not valid");
                }
                if (objPaymentRequest.amountInvalid)
                {
                    return Ok("Amount is not valid");
                }
                if (objPaymentRequest.currencyInvalid)
                {
                    return Ok("Currency is not valid");
                }
                if (objPaymentRequest.transactionIdInvalid)
                {
                    return Ok("Transaction Id is not valid");
                }
                if (objPaymentRequest.redirectUrlInvalid)
                {
                    return Ok("Redirect Url Id is not valid");
                }
                //          if (objPaymentRequest.webhookUrlInvalid)
                //          {
                //MessageBox.Show("Webhook URL is not valid");
                //               return Ok("");
                //           }

            }
            else
            {
                try
                {
                    CreatePaymentOrderResponse objPaymentResponse = objClass.createNewPaymentRequest(objPaymentRequest);
                    string strReturn = objPaymentResponse.payment_options.payment_url + "|" + objPaymentResponse.order.id;
                    return Ok(strReturn);

                }
                catch (ArgumentNullException ex)
                {
                    return Ok(ex.Message);
                }
                catch (WebException ex)
                {
                    return Ok(ex.Message);
                }
                catch (IOException ex)
                {
                    return Ok(ex.Message);
                }
                catch (InvalidPaymentOrderException ex)
                {
                    //if (!ex.IsWebhookValid())
                    //{
                    //    MessageBox.Show("Webhook is invalid");
                    //    return Ok("");
                    //}

                    if (!ex.IsCurrencyValid())
                    {
                        return Ok("Currency is Invalid");
                    }

                    if (!ex.IsTransactionIDValid())
                    {
                        return Ok("Transaction ID is Inavlid");
                    }
                }
                catch (ConnectionException ex)
                {
                    return Ok(ex.Message);
                }
                catch (BaseException ex)
                {
                    return Ok(ex.Message);
                }
                catch (Exception ex)
                {
                    return Ok("Error:" + ex.Message);
                }
            }

            return Ok("OK Success");
        }

        [HttpPost]
        [Route("api/CartPayment/PaytmTest")]
        public IEnumerable PaytmTest([FromBody]JObject jsonString, decimal TotalAmount)
        {
            string randomName = Path.GetRandomFileName();
            randomName = randomName.Replace(".", string.Empty);
            string paytmURL = "https://securegw-stage.paytm.in/theia/processTransaction?orderid=" + randomName;
           
            String merchantKey = "XCF#e1O9kH_qh!OS";
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("MID", "PIoymk64144414523497");
            parameters.Add("CHANNEL_ID", "WEB");
            parameters.Add("INDUSTRY_TYPE_ID", "Retail");
            parameters.Add("WEBSITE", "WEBSTAGING");

            
            parameters.Add("EMAIL", "rajadurai@sysmedac.com");
            parameters.Add("MOBILE_NO", "7502885875");
            parameters.Add("CUST_ID", "1");
            parameters.Add("ORDER_ID", randomName);
            parameters.Add("TXN_AMOUNT", TotalAmount.ToString());
            parameters.Add("CALLBACK_URL", "http://localhost:56337/IndexPage.html#!/Invoice"); //This parameter is not mandatory. Use this to pass the callback url dynamically.
            //parameters.Add("CALLBACK_URL", "https://ecomtest.sysmedacmicrosoft.com/#!/Invoice");
            string checksum = CheckSum.generateCheckSum(merchantKey, parameters);


            //var outputHTML = "<html>";
            //outputHTML += "<head>";
            //outputHTML += "<title>Merchant Check Out Page</title>";
            //outputHTML += "</head>";
            //outputHTML += "<body>";
            //outputHTML += "<center><h1>Please do not refresh this page...</h1></center>";
            var outputHTML = "<form method='post' action='" + paytmURL + "' name='f1' id='f1'>";
            outputHTML += "<table border='1'>";
            outputHTML += "<tbody>";
            foreach (string key in parameters.Keys)
            {
                outputHTML += "<input type='hidden' name='" + key + "' value='" + parameters[key] + "'>";
            }
            outputHTML += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'>";
            outputHTML += "</tbody>";
            outputHTML += "</table>";
            outputHTML += "<script type='text/javascript'>";
            outputHTML += "document.f1.submit();";
            outputHTML += "</script>";
            outputHTML += "</form>";
            //outputHTML += "</body>";
            //outputHTML += "</html>";
            //System.Web.HttpContext.Current.Response.Write(outputHTML);

            return outputHTML;
           // return Ok(outputHTML);





        }

        [HttpPost]
        [Route("api/CartPayment/PayPalTest")]
        public IHttpActionResult PayPalTest([FromBody]JObject jsonString, decimal TotalAmount)
        {
            OrderClass objOrder = new OrderClass();
            //Call method to get paypal url to post payment request

            objOrder.TotalAmount = Convert.ToDecimal(TotalAmount);

            //string ReqUrl = "https://localhost:56337/#!/ShoppingCart";
            //string ResponseUrl = "https://localhost:56337/#!/Invoice";

            string ReqUrl = "https://mithas.uk/#!/ShoppingCart";
            string ResponseUrl = "https://mithas.uk/#!/Invoice";

            string paypalUrl = PayPalPaymentGateway.GetPayPalUrl(objOrder, ReqUrl, ResponseUrl);

            //if (paypalUrl != null && paypalUrl != "")
            //{
            //    Response.Redirect(paypalUrl);
            //}
            return Ok(paypalUrl);
        }

        [HttpPost]
        [Route("api/CartPayment/PayPalCheckOutTest")]
        public IHttpActionResult PayPalCheckOutTest(string sToken, decimal TotalAmount)
        {
            string sTransactionId = "";
            //string token = Request.QueryString["token"];
            // build getdetails request
            GetExpressCheckoutDetailsReq req = new GetExpressCheckoutDetailsReq()
            {
                GetExpressCheckoutDetailsRequest = new GetExpressCheckoutDetailsRequestType()
                {
                    Version = "60.0",
                    Token = sToken
                }
            };
            var service = new PayPalAPIInterfaceServiceService();
            // query PayPal for transaction details
            var resp = service.GetExpressCheckoutDetails(req);
            if (resp.Errors != null && resp.Errors.Count > 0)
            {
            }
            else
            {
                GetExpressCheckoutDetailsResponseDetailsType respDetails =
                    resp.GetExpressCheckoutDetailsResponseDetails;
                // setup UI and save transaction details to session
                //Session["CheckoutDetails"] = resp;

                //Calling method to finally commit payment transaction
                if (TotalAmount != null)
                {
                    var service1 = new PayPalAPIInterfaceServiceService();
                    // get transaction details
                    //var resp = Session["CheckoutDetails"] as GetExpressCheckoutDetailsResponseType;

                    //prepare for commiting transaction
                    var payReq = new DoExpressCheckoutPaymentReq()
                    {
                        DoExpressCheckoutPaymentRequest = new DoExpressCheckoutPaymentRequestType()
                        {
                            Version = "60.0",
                            DoExpressCheckoutPaymentRequestDetails = new DoExpressCheckoutPaymentRequestDetailsType
                            {
                                Token = resp.GetExpressCheckoutDetailsResponseDetails.Token,
                                PaymentAction = PaymentActionCodeType.SALE,
                                PayerID = resp.GetExpressCheckoutDetailsResponseDetails.PayerInfo.PayerID,
                                PaymentDetails = new List<PaymentDetailsType>
                            {
                                new PaymentDetailsType
                                {
                                    OrderTotal = new BasicAmountType
                                    {
                                        currencyID =  (CurrencyCodeType)Enum.Parse(typeof(CurrencyCodeType),"GBP"),
                                        value = TotalAmount.ToString()
                                    }
                                }
                            }
                            },
                        }
                    };

                    // commit transaction and display results to user
                    DoExpressCheckoutPaymentResponseType doResponse = service1.DoExpressCheckoutPayment(payReq);
                    
                    if (doResponse.Errors != null && doResponse.Errors.Count > 0)
                    {
                        sTransactionId = "Error";
                    }
                    else
                    {
                        sTransactionId = doResponse.DoExpressCheckoutPaymentResponseDetails.PaymentInfo[0].TransactionID;

                        if (sTransactionId != null)
                        {

                        }
                        else
                        {
                            sTransactionId = "Error";
                        }
                    }
                }

            }

            return Ok(sTransactionId);
        }

        //protected void CommitPayPalPayment(decimal TotalAmount)
        //{
        //    var service1 = new PayPalAPIInterfaceServiceService();
        //    // get transaction details
        //    var resp = Session["CheckoutDetails"] as GetExpressCheckoutDetailsResponseType;

        //    //prepare for commiting transaction
        //    var payReq = new DoExpressCheckoutPaymentReq()
        //    {
        //        DoExpressCheckoutPaymentRequest = new DoExpressCheckoutPaymentRequestType()
        //        {
        //            Version = "60.0",
        //            DoExpressCheckoutPaymentRequestDetails = new DoExpressCheckoutPaymentRequestDetailsType
        //            {
        //                Token = resp.GetExpressCheckoutDetailsResponseDetails.Token,
        //                PaymentAction = PaymentActionCodeType.SALE,
        //                PayerID = resp.GetExpressCheckoutDetailsResponseDetails.PayerInfo.PayerID,
        //                PaymentDetails = new List<PaymentDetailsType>
        //                    {
        //                        new PaymentDetailsType
        //                        {
        //                            OrderTotal = new BasicAmountType
        //                            {
        //                                currencyID =  (CurrencyCodeType)Enum.Parse(typeof(CurrencyCodeType),"GBP"),
        //                                value = TotalAmount.ToString()
        //                            }
        //                        }
        //                    }
        //            },
        //        }
        //    };

        //    // commit transaction and display results to user
        //    DoExpressCheckoutPaymentResponseType doResponse = service1.DoExpressCheckoutPayment(payReq);

        //    if (doResponse.Errors != null && doResponse.Errors.Count > 0)
        //    {
                
        //    }
        //    else
        //    {
        //        string sTransactionId = doResponse.DoExpressCheckoutPaymentResponseDetails.PaymentInfo[0].TransactionID;

        //        if (sTransactionId != null)
        //        {
                    
        //        }
        //        else
        //        {
        //            lblError.Text = "Error";
        //        }
        //    }
        //}
    }
}
