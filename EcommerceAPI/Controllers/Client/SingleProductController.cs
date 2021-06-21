using EcommerceAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EcommerceAPI.PaymentGateway;
using InstamojoAPI;
//using static System.Net.Mime.MediaTypeNames;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace EcommerceAPI.Controllers.Client
{
    [EnableCors("*", "*", "GET,POST")]
    public class SingleProductController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        public string CancelledComments { get; private set; }
        public long CancelledCommentsId { get; private set; }
        public string CancelledBy { get; private set; }

        [HttpGet]
        [Route("api/ProductDetail/GetNewItems")]
        public IEnumerable GetNewItems()
        {
            //join q in db.DiscountDetails.AsEnumerable() on p.DiscountDetailsId equals q.DiscountDetailsId into ps

            //                     from r in ps
            var TrendingItems = (from p in db.ProductDetails.AsEnumerable()

                                 where p.IsActive == 1
                                 orderby p.ProductId descending
                                 select new
                                 {
                                     Title = p.Title,
                                     Price = p.Price,
                                     Picture = p.Picture,
                                     ProductId = p.ProductId,
                                     Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                     {
                                         s.ProductId,
                                         s.ImageURL
                                     }).OrderBy(c => c.ProductId).Take(1),
                                     TaxDetailsId = p.TaxDetailsId,
                                     TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                     p.Variance,
                                     showVariance = p.Variance == 1 ? "none" : "block"
                                 }).Take(5);

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/ProductDetail/GetProductDetails")]
        public IEnumerable GetProductDetails(int ProductId)
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
                                     join q in db.SubCategories.AsEnumerable() on p.SubCategoryId equals q.SubCategoryId
                                     join r in db.Categories.AsEnumerable() on q.CategoryId equals r.CategoryId

                                     where p.IsActive == 1 && p.ProductId == ProductId
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         TaxDetail = p.TaxDetailsId,
                                         Description = p.Description,
                                         Description2= p.Description2,
                                         Description3= p.Description3,
                                         CategoyName = r.CategoyName,
                                         SubCategoryName = q.SubCategoryName,
                                         SubCategoryId = p.SubCategoryId,
                                         CategoryId = q.CategoryId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL
                                         }).OrderBy(c => c.ProductId),
                                         stock = p.ProductStocks.AsEnumerable().Select(t => new
                                         {
                                             t.StockCount
                                         }),
                                         TaxDetailsId = db.TaxDetails.AsEnumerable().Select(s => new
                                         {
                                             ProductId = Convert.ToString(s.ProductId),
                                             s.TaxDetailsId,
                                             s.IsActive,

                                             //s.Percentage
                                             Percentage = s.Percentage != null ? Convert.ToString(s.Percentage) : "0",
                                             
                                         }).Where(m => m.ProductId == p.Title && m.IsActive ==1).Take(1),


                                         
                                         ProductSellingPrice = db.ProductVariances.AsEnumerable().Select(L => new
                                         {
                                             ProductId1 = Convert.ToString(L.ProductId),
                                           
                                            L.sellingPrice
                                         }).Where(k => k.ProductId1 == Convert.ToString(p.ProductId)).Take(1),

                                         ProductVariancePrice = db.ProductVariances.AsEnumerable().Select(o => new
                                         {
                                             ProductId1 = Convert.ToString(o.ProductId),
                                             o.VariancePrice,
                                             
                                         }).Where(k => k.ProductId1 == Convert.ToString(p.ProductId)).Take(1),

                                         ProductVariancetype = db.ProductVariances.AsEnumerable().Select(o => new
                                         {
                                             ProductId1 = Convert.ToString(o.ProductId),
                                             o.VarianceType,

                                         }).Where(k => k.ProductId1 == Convert.ToString(p.ProductId)).Take(1),



                                         Discount = p.DiscountDetailsId != null ? Convert.ToString(p.DiscountDetail.DiscountPercentage) : "",
                                         DisFrom = p.DiscountDetailsId != null ? (p.DiscountDetail.ValidFrom) : null,
                                         DisTo = p.DiscountDetailsId != null ? (p.DiscountDetail.ValidTo) : null,
                                         CurDate = currentdatetime,
                                         CouponCode = p.CouponId != null ? Convert.ToString(p.CouponDetail.Code) : "",
                                         CouponPercentade = p.CouponId != null ? Convert.ToString(p.CouponDetail.DiscountPercentage) : "",
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         TodaydealAmt = p.TodayDeals.AsEnumerable().Select(u => new
                                         {
                                             TodayDiscountAmount = u.Date == currentdatetime ? u.TodayDiscountAmount : 0
                                         })
                                     });

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }


        [HttpGet]
        [Route("api/ProductDetail/GetRelatedProductDetails")]
        public IEnumerable GetRelatedProductDetails(int SubCategoryId)
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
                                     join q in db.SubCategories.AsEnumerable() on p.SubCategoryId equals q.SubCategoryId
                                     join r in db.Categories.AsEnumerable() on q.CategoryId equals r.CategoryId

                                     where p.IsActive == 1 && p.SubCategoryId == SubCategoryId
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         TaxDetail = p.TaxDetailsId,
                                         Description = p.Description,
                                         CategoyName = r.CategoyName,
                                         SubCategoryName = q.SubCategoryName,
                                         SubCategoryId = p.SubCategoryId,
                                         CategoryId = q.CategoryId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL
                                         }).OrderBy(c => c.ProductId),
                                         stock = p.ProductStocks.AsEnumerable().Select(t => new
                                         {
                                             t.StockCount
                                         }),
                                         TaxDetailsId = db.TaxDetails.AsEnumerable().Select(s => new
                                         {
                                             ProductId = Convert.ToString(s.ProductId),
                                             s.TaxDetailsId,
                                             s.IsActive,

                                             s.Percentage
                                         }).Where(m => m.ProductId == p.Title && m.IsActive ==1).Take(1),

                                         Discount = p.DiscountDetailsId != null ? Convert.ToString(p.DiscountDetail.DiscountPercentage) : "",
                                         DisFrom = p.DiscountDetailsId != null ? (p.DiscountDetail.ValidFrom) : null,
                                         DisTo = p.DiscountDetailsId != null ? (p.DiscountDetail.ValidTo) : null,
                                         CurDate = currentdatetime,
                                         CouponCode = p.CouponId != null ? Convert.ToString(p.CouponDetail.Code) : "",
                                         CouponPercentade = p.CouponId != null ? Convert.ToString(p.CouponDetail.DiscountPercentage) : "",
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         TodaydealAmt = p.TodayDeals.AsEnumerable().Select(u => new
                                         {
                                             TodayDiscountAmount = u.Date == currentdatetime ? u.TodayDiscountAmount : 0
                                         })
                                     });

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }



        [HttpGet]
        [Route("api/ProductDetail/GetProductTecDetails")]
        public IEnumerable GetProductTecDetails(int ProductId)
        {
            var TrendingItems = (from p in db.ProductTecDetails.AsEnumerable()

                                 where p.ProductId == ProductId
                                 select new
                                 {
                                     TecDetails = p.TechinalDetails,
                                     ProductTecDetailsId = p.ProductTecDetailsId
                                 });

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/ProductDetail/Deliverycharge")]
        public IEnumerable Deliverycharge()
        {
            var a = from b in db.DeliveryCharges 
                    where b.IsActive ==1
                    orderby b.Toprice descending
                    select new
                    {
                        b.Fromprice,
                        b.Toprice,
                        b.Price,
                        

                    };
            return a;
        }
        [HttpGet]
        [Route("api/ProductDetail/GetProductVarienceDetails")]
        public IEnumerable GetProductVarienceDetails(int ProductId)
        {
            var TrendingItems = (from p in db.ProductVariances.AsEnumerable()

                                 where p.ProductId == ProductId && p.VarianceActive == 1
                                 select new
                                 {
                                     p.ProductVarianceId,
                                     p.VarianceType,
                                     p.VariancePrice,
                                     p.sellingPrice,
                                     p.ImageUrl,
                                     
                                     wholesale = p.Wholesaleprices.Select(x => new
                                     {
                                         x.wholesaleFromQty,
                                         x.wholesaleToQty,
                                         x.wholesaleprize,
                                         x.productVarianceId,
                                         x.Status,
                                     }).Where(m=> m.Status==1),
                                     vaeiancecolor = p.Variancecolorcodes.Select(x => new
                                     {
                                         x.colorcode,
                                         x.ProductVarianceId,
                                         x.VariancecolorcodeId,
                                         x.Status
                                     }).Where(m => m.Status == 1),
                                 });

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/ProductDetail/GetProductFeatures")]
        public IEnumerable GetProductFeatures(int ProductId)
        {
            var TrendingItems = (from p in db.ProductFeatures.AsEnumerable()

                                 where p.ProductId == ProductId
                                 select new
                                 {
                                     Features = p.Features,
                                     ProductFeaturesID = p.ProductFeaturesID
                                 });

            return TrendingItems;
        }

        [HttpPost]
        [Route("api/ProductDetail/UpdateMemberAddress")]
        public IHttpActionResult UpdateMemberAddress([FromBody]MemberDetail member, int MemberId)
        {
            var result = db.MemberDetails.First(x => x.MemberId == MemberId);
            if(result!=null)
            {
                result.AddressLine1 = member.AddressLine1;
                result.AddressLine2 = member.AddressLine2;
                result.City = member.City;
                result.PinCode = member.PinCode;
                result.State = member.State;
                db.SaveChanges();
            }
            return Ok("Success");
        }

        [HttpGet]
        [Route("api/ProductDetail/GetMemberAddress")]
        public IEnumerable GetMemberAddress(int MemberId)
        {
            try
            {
                var TrendingItems = (from p in db.MemberDetails.AsEnumerable()

                                     where p.MemberId == MemberId
                                     select new
                                     {
                                         p.MemberId,
                                         AddressLine1 = p.AddressLine1,
                                         p.AddressLine2,
                                         p.City,
                                         p.State,
                                         p.PinCode,
                                         p.MemberName,
                                         ContactNo = p.ContactNo,
                                         EmailId = p.EmailId
                                     });

                return TrendingItems;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/ProductDetail/GetClientSalOrderDetails")]
        public IEnumerable GetClientSalOrderDetails(int memberid)
        {
            try
            {
                //log.Debug("api/SalOrde/GetSalOrderDetails");
                var vsno = 0;
                var a = (from p in db.SalesOrders.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where p.MemberId == memberid
                         orderby p.SalesOrderId descending
                         select new
                         {

                             sno = ++vsno,
                             p.OrderNo,
                             OrderNo1 = "tex" + p.OrderNo,
                             OrderDate = Convert.ToDateTime(p.OrderDate).ToString("dd/MM/yyyy"),
                             TotalAmoount = ((p.Amoount) + (p.OrderDeliveryCharge)) ,
                             p.Amoount,
                             p.Status,
                             p.OrderDeliveryCharge,
                             q.MemberName,
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
                             p.DeliveryCharge,
                             p.Subtotal,
                             p.CouponCode,
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
                                                                               where v.ProductVarianceId==s.ProductVarianceId
                                                                               select new
                                                                               {
                                                                                   v.VarianceType
                                                                               }
                                                                               ),

                                 ProVariancePrice = db.ProductVariances.AsEnumerable().Select(L => new
                                 {
                                     s.ProductId,
                                     L.ProductVarianceId,
                                     L.VariancePrice
                                    
                                 }).Where(m => m.ProductVarianceId == s.ProductVarianceId),
                                 //VariancePrice = db.ProductVariances.FirstOrDefault(x => x.ProductVarianceId == s.ProductVarianceId).VariancePrice
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

        [HttpPost]
        [Route("api/ProductDetail/PaypalPayment")]
        public IHttpActionResult PaypalPayment(decimal TotalAmount)
        {
            OrderClass objOrder = new OrderClass();
            //Call method to get paypal url to post payment request

            objOrder.TotalAmount = Convert.ToDecimal(TotalAmount);

            string ReqUrl = "http://localhost:56337/IndexPage.html#!/ShoppingCart";
            string ResponseUrl = "http://localhost:56337/IndexPage.html#!/ShoppingCart";

           // string ReqUrl = "https://ecom.sysmedacmicrosoft.com/#!/ShoppingCart";
            //string ResponseUrl = "https://ecom.sysmedacmicrosoft.com/#!/ShoppingCart";

            string paypalUrl = PayPalPaymentGateway.GetPayPalUrl(objOrder, ReqUrl, ResponseUrl);

            if (paypalUrl != null && paypalUrl != "")
            {
                //Response.Redirect(paypalUrl);
                return Ok(paypalUrl);
            }
            else
            {
                return Ok("ERROR");
            }


        }


        [HttpPost]
        [Route("api/ProductDetail/InstaMojoPayment")]
        public IHttpActionResult InstaMojoPayment(decimal TotalAmount)
        {
            OrderClass objOrder = new OrderClass();
            //Call method to get paypal url to post payment request

            objOrder.TotalAmount = Convert.ToDecimal(TotalAmount);


            string Insta_client_id = "test_xF9fKqUPpz5xjHO3cDdBo0ITyC9YkxREehP",
                   Insta_client_secret = "test_99DEDkNnxEywk3Djz19NgHONwFnd3cE8P0IrqYQq05CY15BO6eXDXOsvKdtxGZpEGaZu6WEu9PMH75P5O3ToX6tYN5jh6arxzi0QDUdP6V88KurKLfab1nR50fz",
                   Insta_Endpoint = InstamojoConstants.INSTAMOJO_API_ENDPOINT,
                   Insta_Auth_Endpoint = InstamojoConstants.INSTAMOJO_AUTH_ENDPOINT;
            try
            {
                Instamojo objClass = InstamojoImplementation.getApi("test_xF9fKqUPpz5xjHO3cDdBo0ITyC9YkxREehP", "test_99DEDkNnxEywk3Djz19NgHONwFnd3cE8P0IrqYQq05CY15BO6eXDXOsvKdtxGZpEGaZu6WEu9PMH75P5O3ToX6tYN5jh6arxzi0QDUdP6V88KurKLfab1nR50fz", "https://test.instamojo.com/v2/", "https://test.instamojo.com/oauth2/token/");

                # region   1. Create Payment Order
                //  Create Payment Order
                PaymentOrder objPaymentRequest = new PaymentOrder();
                //Required POST parameters
                objPaymentRequest.name = "Raja";
                objPaymentRequest.email = "raja30march90@gmail.com";
                objPaymentRequest.phone = "7502885875";
                objPaymentRequest.amount = 100;
                objPaymentRequest.currency = "INR";

                objPaymentRequest.transaction_id = "test1";
                // string randomName = Path.GetRandomFileName();
                // randomName = randomName.Replace(".", string.Empty);
                // objPaymentRequest.transaction_id = "test"+ randomName;

                objPaymentRequest.redirect_url = "https://ecom.sysmedacmicrosoft.com/#!/HomePage";
                //Extra POST parameters 
                //objPaymentRequest.webhook_url = "https://your.server.com/webhook";
                if (objPaymentRequest.validate())
                {

                    if (objPaymentRequest.nameInvalid)
                    {
                        //MessageBox.Show("Name is not valid");
                        return Ok("Name is not valid");
                    }

                }
                else
                {
                    try
                    {
                        CreatePaymentOrderResponse objPaymentResponse = objClass.createNewPaymentRequest(objPaymentRequest);

                        PaymentOrderDetailsResponse objPaymentRequestDetailsResponse = objClass.getPaymentOrderDetails(objPaymentResponse.order.id);
                        //MessageBox.Show("Order Id = " + objPaymentResponse.order.id);
                        return Ok(objPaymentResponse.order.id);
                    }
                    catch (ArgumentNullException ex)
                    {
                        //MessageBox.Show(ex.Message);
                        return Ok(ex.Message);
                    }
                    catch (WebException ex)
                    {
                        //MessageBox.Show(ex.Message);
                        return Ok(ex.Message);
                    }
                    catch (IOException ex)
                    {
                        //MessageBox.Show(ex.Message);
                        return Ok(ex.Message);
                    }
                    catch (InvalidPaymentOrderException ex)
                    {
                        //MessageBox.Show(ex.Message);
                        return Ok(ex.Message);
                    }
                    catch (ConnectionException ex)
                    {
                        //MessageBox.Show(ex.Message);
                        return Ok(ex.Message);
                    }
                    catch (BaseException ex)
                    {
                        //MessageBox.Show(ex.Message);
                        return Ok(ex.Message);
                    }
                    catch (Exception ex)
                    {
                        //MessageBox.Show("Error:" + ex.Message);
                        return Ok("Error:" + ex.Message);
                    }
                }
                #endregion

                #region   2. Get All your Payment Orders List
                //  Get All your Payment Orders
                //try
                //{
                //    PaymentOrderListRequest objPaymentOrderListRequest = new PaymentOrderListRequest();
                //    //Optional Parameters
                //    objPaymentOrderListRequest.limit = 21;
                //    objPaymentOrderListRequest.page = 3;

                //    PaymentOrderListResponse objPaymentRequestStatusResponse = objClass.getPaymentOrderList(objPaymentOrderListRequest);
                //    foreach (var item in objPaymentRequestStatusResponse.orders)
                //    {
                //        Console.WriteLine(item.email + item.description + item.amount);
                //    }
                //    MessageBox.Show("Order List = " + objPaymentRequestStatusResponse.orders.Count());
                //}
                //catch (ArgumentNullException ex)
                //{
                //    MessageBox.Show(ex.Message);
                //}
                //catch (WebException ex)
                //{
                //    MessageBox.Show(ex.Message);
                //}
                //catch (Exception ex)
                //{
                //    MessageBox.Show("Error:" + ex.Message);
                //}
                #endregion

                #region   3. Get details of this payment order Using Order Id
                ////  Get details of this payment order
                //try
                //{
                //    PaymentOrderDetailsResponse objPaymentRequestDetailsResponse = objClass.getPaymentOrderDetails("3189cff7c68245bface8915cac1f"); //"3189cff7c68245bface8915cac1f89df");
                //    MessageBox.Show("Transaction Id = " + objPaymentRequestDetailsResponse.transaction_id);
                //}
                //catch (ArgumentNullException ex)
                //{
                //    MessageBox.Show(ex.Message);
                //}
                //catch (WebException ex)
                //{
                //    MessageBox.Show(ex.Message);
                //}
                //catch (Exception ex)
                //{
                //    MessageBox.Show("Error:" + ex.Message);
                //}
                #endregion

                #region   4. Get details of this payment order Using TransactionId
                ////  Get details of this payment order Using TransactionId
                //try
                //{
                //    PaymentOrderDetailsResponse objPaymentRequestDetailsResponse = objClass.getPaymentOrderDetailsByTransactionId("test1");
                //    MessageBox.Show("Transaction Id = " + objPaymentRequestDetailsResponse.transaction_id);
                //}
                //catch (ArgumentNullException ex)
                //{
                //    MessageBox.Show(ex.Message);
                //}
                //catch (WebException ex)
                //{
                //    MessageBox.Show(ex.Message);
                //}
                //catch (Exception ex)
                //{
                //    MessageBox.Show("Error:" + ex.Message);
                //}
                #endregion

                #region   5. Create Refund
                //  Create Payment Order
                //    Refund objRefundRequest = new Refund();
                //    //Required POST parameters
                //    //objPaymentRequest.name = "ABCD";
                //    objRefundRequest.payment_id = "MOJO6701005J41260385";
                //    objRefundRequest.type = "TNR";
                //    objRefundRequest.body = "abcd";
                //    objRefundRequest.refund_amount = 9;

                //    if (objRefundRequest.validate())
                //    {
                //        if (objRefundRequest.payment_idInvalid)
                //        {
                //            MessageBox.Show("payment_id is not valid");
                //        }
                //    }
                //    else
                //    {
                //        try
                //        {
                //            CreateRefundResponce objRefundResponse = objClass.createNewRefundRequest(objRefundRequest);
                //            MessageBox.Show("Refund Id = " + objRefundResponse.refund.id);
                //        }
                //        catch (ArgumentNullException ex)
                //        {
                //            MessageBox.Show(ex.Message);
                //        }
                //        catch (WebException ex)
                //        {
                //            MessageBox.Show(ex.Message);
                //        }
                //        catch (IOException ex)
                //        {
                //            MessageBox.Show(ex.Message);
                //        }
                //        catch (InvalidPaymentOrderException ex)
                //        {
                //            MessageBox.Show(ex.Message);
                //        }
                //        catch (ConnectionException ex)
                //        {
                //            MessageBox.Show(ex.Message);
                //        }
                //        catch (BaseException ex)
                //        {
                //            MessageBox.Show(ex.Message);
                //        }
                //        catch (Exception ex)
                //        {
                //            MessageBox.Show("Error:" + ex.Message);
                //        }
                //    }
                #endregion

                //Application.Run();

            }
            catch (BaseException ex)
            {
                //MessageBox.Show("CustomException" + ex.Message);
                return Ok("CustomException" + ex.Message);
            }
            catch (Exception ex)
            {
                //MessageBox.Show("Exception" + ex.Message);
                return Ok("Exception" + ex.Message);
            }

            return Ok("OK");
        }

        //update status
        [HttpPost]
        [Route("api/SalOrder/UpdateSalOrderStatus")]
        public IHttpActionResult UpdateSalOrderStatus(int OrderId, string Status , string CancelledComments)
        {
           
                var result = db.SalesOrders.FirstOrDefault(p => p.SalesOrderId == OrderId);

            
                if (result != null)
                {
                    result.Status = Status;
                 result.CancelledComments = CancelledComments;
                result.CancelledDate = DateTime.Now;
                CancelledBy = result.CancelledBy = "client";

                db.SaveChanges();
                }


                return Ok();
           
        }


        //update Stock Count
        [HttpPost]
        [Route("api/SalOrder/UpdateStockCountForcancelorder")]
        public IHttpActionResult UpdateStockCountForcancelorder(int salesorderid)
        {

            var v1 = Convert.ToString(salesorderid);

            //List<ProjectComInfo> vCompanyDetails = getComDetails(v1);


            return Ok();

        }

        class ProjectComInfo
        {
            

        }

        //private List<ProjectComInfo> getComDetails()
        //{
        //    var a = (from p in db.SalesOrderItems.AsEnumerable()
        //             where p.SalesOrderId == salesorderid
        //             select new ProjectComInfo()
        //             {
                       
        //             });
        //    return a.ToList();
        //}

        //Displaying Cancel Comments in ddl
        [HttpGet]
        [Route("api/Cancelcomments/GetCancelcomments")]
        public IEnumerable GetCancelcomments()

        {
            var a = (from p in db.CancelledComments.AsEnumerable()
                     select new
                     {
                         CancelledCommentsId = p.CancelledCommentsId,
                         Comments = p.Comments
                     });
            return a;
        }

        // Product Review
        [HttpPost]
        [Route("api/SalesOrder/SubmitProductReviews")]
        public IHttpActionResult SubmitProductReviews(int ProductId, int MemberId, string ReviewComments, int Rating)
        {

            var context = new EcommerceEntities();
            ProductReview objProductReview = new ProductReview();
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
            var result = context.ProductReviews.FirstOrDefault(b => b.ProductId == ProductId && b.MemberId == MemberId);
            if (result == null)
            {

                objProductReview.ProductId = ProductId;
                objProductReview.MemberId = MemberId;
                objProductReview.ReviewComments = ReviewComments;
                objProductReview.Rating = Rating;
                objProductReview.Status = "New Request";
                objProductReview.InsertedDate = dtCNow;
                db.ProductReviews.Add(objProductReview);
                db.SaveChanges();

            }
            else
            {
                return Ok("Exist");

            }


            return Ok();
        }

        [HttpGet]
        [Route("api/ProductReview/GetClientProductReviews")]
        public IEnumerable GetClientProductReviews(int ProductId)
        {
            try
            {
                var a = (from p in db.ProductReviews.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where p.ProductId == ProductId && p.Status == "Approve"
                         orderby p.ProductReviewId descending
                         select new
                         {

                             p.ProductReviewId,
                             p.Rating,
                             p.ReviewComments,
                             p.ProductId,
                             p.MemberId,
                             q.MemberName,
                             q.City,
                             p.InsertedDate,

                         }).Take(4);
                return a;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }


        [HttpGet]
        [Route("api/ProductReview/GetClientProductAllReviews")]
        public IEnumerable GetClientProductAllReviews(int ProductId)
        {
            try
            {
                var a = (from p in db.ProductReviews.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where p.ProductId == ProductId && p.Status == "Approve"
                         orderby p.ProductReviewId descending
                         select new
                         {

                             p.ProductReviewId,
                             p.Rating,
                             p.ReviewComments,
                             p.ProductId,
                             p.MemberId,
                             q.MemberName,
                             q.City

                         });
                return a;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/ProductReview/GetClientProductReviewsExistCHek")]
        public IEnumerable GetClientProductReviewsExistCHek(int ProductId, int MemberId)
        {
            try
            {
                var a = (from p in db.ProductReviews.AsEnumerable()
                         join q in db.MemberDetails.AsEnumerable() on p.MemberId equals q.MemberId
                         where p.ProductId == ProductId && p.MemberId == MemberId
                        
                         select new
                         {

                             p.ProductReviewId,
                             p.Rating,
                             p.ReviewComments,
                             p.ProductId,
                             p.MemberId,
                             q.MemberName,
                             q.City

                         });
                return a;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.Timeout)
                {
                    // Handle timeout exception
                    return "TimeOut";
                }
                else
                    return null;
            }
        }

        [HttpGet]
        [Route("api/CustomerRatings/GetCustomerRatingsDetails")]
        public IEnumerable GetCustomerRatingsDetails()
        {
            try
            {
                //log.Debug("GetCustomerRatingsDetails");
                var Srno = 0;
                var a = (from p in db.ProductReviews.AsEnumerable()
                         where(p.Status != "Approve" && p.Status != "Reject")
                         orderby p.ProductReviewId descending
                         select new
                         {
                             Rownumber = ++Srno,
                             ReviewComments = p.ReviewComments,
                             Status = p.Status,
                             p.ProductReviewId,
                             InsertedDate = Convert.ToDateTime(p.InsertedDate).ToString("dd/MM/yyyy"),

                             MemberId = p.MemberId,
                             ProductId = p.ProductId,
                             Rating = p.Rating,
                             Membername = db.MemberDetails.AsEnumerable().Select(s => new
                             {
                                 Memberid = Convert.ToString(s.MemberId),
                                 s.MemberName,
                                 s.ContactNo,



                             }).Where(m => m.Memberid == Convert.ToString(p.MemberId)).Take(1),

                             Productname = db.ProductDetails.AsEnumerable().Select(K => new
                             {
                                 Productid = Convert.ToString(K.ProductId),
                                 K.Title



                             }).Where(m => m.Productid == Convert.ToString(p.ProductId)).Take(1)



                         });
                return a;
            }
            catch (Exception ex)
            {
               // log.Error(ex.Message, ex);
                return null;
            }
        }

       

        [HttpGet]
        [Route("api/CustomerRatings/GetApprovedReview")]
        public IEnumerable GetApprovedReview(string Status)
        {
            try
            {
                //log.Debug("GetCustomerRatingsDetails");
                var Srno = 0;
                var a = (from p in db.ProductReviews.AsEnumerable()
                         where (p.Status == Status)
                         orderby p.ProductReviewId descending
                         select new
                         {
                             Rownumber = ++Srno,
                             ReviewComments = p.ReviewComments,
                             Status = p.Status,
                             p.ProductReviewId,
                             InsertedDate = Convert.ToDateTime(p.InsertedDate).ToString("dd/MM/yyyy"),

                             MemberId = p.MemberId,
                             ProductId = p.ProductId,
                             Rating = p.Rating,
                             Membername = db.MemberDetails.AsEnumerable().Select(s => new
                             {
                                 Memberid = Convert.ToString(s.MemberId),
                                 s.MemberName,
                                 s.ContactNo,



                             }).Where(m => m.Memberid == Convert.ToString(p.MemberId)).Take(1),

                             Productname = db.ProductDetails.AsEnumerable().Select(K => new
                             {
                                 Productid = Convert.ToString(K.ProductId),
                                 K.Title



                             }).Where(m => m.Productid == Convert.ToString(p.ProductId)).Take(1)



                         });
                return a;
            }
            catch (Exception ex)
            {
                // log.Error(ex.Message, ex);
                return null;
            }
        }


        [HttpGet]
        [Route("api/CustomerRatings/GetRejectedReview")]
        public IEnumerable GetRejectedReview(string Status)
        {
            try
            {
                //log.Debug("GetCustomerRatingsDetails");
                var Srno = 0;
                var a = (from p in db.ProductReviews.AsEnumerable()
                         where (p.Status == Status)
                         orderby p.ProductReviewId descending
                         select new
                         {
                             Rownumber = ++Srno,
                             ReviewComments = p.ReviewComments,
                             Status = p.Status,
                             p.ProductReviewId,
                             InsertedDate = Convert.ToDateTime(p.InsertedDate).ToString("dd/MM/yyyy"),

                             MemberId = p.MemberId,
                             ProductId = p.ProductId,
                             Rating = p.Rating,
                             Membername = db.MemberDetails.AsEnumerable().Select(s => new
                             {
                                 Memberid = Convert.ToString(s.MemberId),
                                 s.MemberName,
                                 s.ContactNo,



                             }).Where(m => m.Memberid == Convert.ToString(p.MemberId)).Take(1),

                             Productname = db.ProductDetails.AsEnumerable().Select(K => new
                             {
                                 Productid = Convert.ToString(K.ProductId),
                                 K.Title



                             }).Where(m => m.Productid == Convert.ToString(p.ProductId)).Take(1)



                         });
                return a;
            }
            catch (Exception ex)
            {
                // log.Error(ex.Message, ex);
                return null;
            }
        }



        [HttpPost]
        [Route("api/CustomerRatings/UpdateCustomerRatingsStatus")]
        public IHttpActionResult UpdateCustomerRatingsStatus( int ProductReviewId, string Status)
        {
            try
            {
             

                var context = new EcommerceEntities();
                var result = context.ProductReviews.First(b => b.ProductReviewId == ProductReviewId);
                if (result != null)
                {
                    result.ProductReviewId = ProductReviewId;
                    result.Status = Status;                                     
                    context.SaveChanges();
                }
                return Ok();


            }
            catch (Exception ex)
            {
                //log.Error(ex.Message, ex);
                return null;
            }
        }

    }

  
}

internal class ClSubmitProductReview
{
    public long? ProductId { get;  set; }
    public long ProductReviewId { get;  set; }
    public string ReviewComments { get;  set; }
    public long? Rating { get;  set; }
}
