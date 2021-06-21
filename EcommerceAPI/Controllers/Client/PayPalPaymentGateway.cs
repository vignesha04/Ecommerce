using PayPal.PayPalAPIInterfaceService;
using PayPal.PayPalAPIInterfaceService.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace EcommerceAPI.PaymentGateway
{
    public class PayPalPaymentGateway
    {
        public PayPalPaymentGateway()
        {

        }

        public static string GetPayPalUrl(OrderClass objOrder, string RequestPageUrl, string ResponsePageUrl)
        {
            try
            {
                var service = new PayPalAPIInterfaceServiceService();

                SetExpressCheckoutReq req = PayPalPayment("GBP", Convert.ToString(objOrder.TotalAmount), ConfigurationManager.AppSettings["ServerUrl"] + RequestPageUrl, ConfigurationManager.AppSettings["ServerUrl"] + ResponsePageUrl);
                var resp = service.SetExpressCheckout(req);
                string strAck = service.SetExpressCheckout(req).Ack.ToString();
                //checking response 
                if (strAck != null && (strAck == "SUCCESS" || strAck == "SUCCESSWITHWARNING"))
                {
                    objOrder.TotalAmount = objOrder.TotalAmount;
                    //HttpContext.Current.Session["TotalAmt"] = objOrder.TotalAmount;
                    //Store token in your order class          
                    objOrder.Token = resp.Token.ToString();
                    //HttpContext.Current.Session["Token"] = resp.Token.ToString();
                    return (string.Format("{0}?cmd=_express-checkout&token={1}&useraction=commit", "https://www.sandbox.paypal.com/cgi-bin/webscr", resp.Token));
                    //return (string.Format("{0}?cmd=_express-checkout&token={1}&useraction=commit", "https://www.paypal.com/cgi-bin/webscr", resp.Token));
                }
                else
                {
                    var er = resp.Errors;
                }
                return null;
            }
            catch (Exception ee)
            {
                string error = ee.Message.ToString();
                return null;
            }
        }
        /// <summary>
        /// creating Paypal payment request object method.
        /// </summary>
        /// <param name="CurrencyCode"></param>
        /// <param name="PayAmount"></param>
        /// <param name="cancelUrl"></param>
        /// <param name="ReturnUrl"></param>
        /// <returns></returns>
        public static SetExpressCheckoutReq PayPalPayment(string CurrencyCode, string PayAmount, string cancelUrl, string ReturnUrl)
        {
            var sdt = new SetExpressCheckoutRequestDetailsType();
            //setting order amount & currency
            var orderTotal = new BasicAmountType()
            {
                currencyID = (CurrencyCodeType)Enum.Parse(typeof(CurrencyCodeType), CurrencyCode),
                value = PayAmount
            };
            sdt.OrderTotal = orderTotal;
            sdt.PaymentAction = PaymentActionCodeType.AUTHORIZATION;

            sdt.CancelURL = cancelUrl;
            sdt.ReturnURL = ReturnUrl;


            var req = new SetExpressCheckoutReq()
            {

                SetExpressCheckoutRequest = new SetExpressCheckoutRequestType()
                {
                    SetExpressCheckoutRequestDetails = sdt,
                    Version = "60.0",

                }
            };
            return req;
        }

    }

    public class OrderClass
    {
        public decimal TotalAmount { get; set; }
        public string Token { get; set; }
    }
}