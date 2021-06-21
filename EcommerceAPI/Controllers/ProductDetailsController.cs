using EcommerceAPI.Models;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Collections;
using System.IO;
using System.Xml.Linq;
using System.Xml.XPath;
using Newtonsoft.Json.Schema;
using log4net;


namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class ProductDetailsController : ApiController

    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();
        [HttpGet]
        [Route("api/ProductDetails/GetSubCategoryDetails")]
        public IEnumerable<SubCategory> GetSubCategorydetails(string CategoryId, int CompanyId)
        {
            try
            {
                var category = (from p in db.Categories.AsEnumerable() where p.CategoyName == CategoryId select new { p.CategoryId }).FirstOrDefault();
                if (category != null)
                {
                    var a = (from p in db.SubCategories.AsEnumerable()
                             where (p.CategoryId == category.CategoryId && p.CompanyDetailId == CompanyId)
                             select new SubCategory
                             {
                                 CategoryId = p.CategoryId,
                                 SubCategoryId = p.SubCategoryId,
                                 SubCategoryName = p.SubCategoryName,
                                 CompanyDetailId = p.CompanyDetailId
                             });
                    return a;
                }
                return null;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpGet]
        [Route("api/ProductDetails/GetCategoryDetails")]
        public IEnumerable<Category> GetCategorydetails(int CompanyId)
        {
            try
            {
                var a = (from p in db.Categories.AsEnumerable()
                         where (p.IsActive == 1) && (p.CompanyDetailId == CompanyId)
                         select new Category
                         {
                             CategoryId = p.CategoryId,
                             CategoyName = p.CategoyName,
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
        [Route("api/ProductDetails/GetDiscountDetails")]
        public IEnumerable<DiscountDetail> GetDiscountDetails(int CompanyId)
        {
            try
            {
                var a = (from p in db.DiscountDetails.AsEnumerable()
                             //    where p.IsActive == 1
                         where (p.ValidTo >= DateTime.Now && p.CompanyDetailId == CompanyId)
                         select new DiscountDetail
                         {
                             DiscountDetailsId = p.DiscountDetailsId,
                             Description = p.Description,
                             DiscountPercentage = p.DiscountPercentage,
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
        [Route("api/ProductDetails/GetTaxDetails")]
        public IEnumerable<TaxDetail> GetTaxDetails(int CompanyId)
        {
            try
            {
                var a = (from p in db.TaxDetails.AsEnumerable()
                         where (p.IsActive == 1) && (p.CompanyDetailId == CompanyId)
                         select new TaxDetail
                         {
                             TaxDetailsId = p.TaxDetailsId,
                             Description = p.Description,
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
        [Route("api/ProductDetails/GetCouponDetails")]
        public IEnumerable<CouponDetail> GetCouponDetails(int CompanyId)
        {
            try
            {
                var a = (from p in db.CouponDetails.AsEnumerable()
                         where (p.ValidTo >= DateTime.Now && p.CompanyDetailId == CompanyId)
                         select new CouponDetail
                         {
                             CouponId = p.CouponId,
                             Code = p.Code,
                             DiscountPercentage = p.DiscountPercentage,
                             Name = p.Name,
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
        ////////////////////////////////////////////////   gridbind

        [HttpGet]
        [Route("api/ProductDetails/GetProductDetailsForBindGrid")]
        public IEnumerable GetProductDetails(int iActive, int CompanyId)
        {
            try
            {
                var vsno = 0;
                var a = (from p in db.ProductDetails.AsEnumerable()
                         where (p.IsActive == iActive && p.CompanyDetailId == CompanyId)
                         orderby p.ProductId descending
                         select new
                         {
                             Image = (from k in db.ProductImages.AsEnumerable()
                                      where p.ProductId == k.ProductId
                                      select new { k.ImageURL }).Take(1),
                             sno = ++vsno,
                            
                             ProductId = p.ProductId,
                             Title = p.Title,
                             Description = p.Description,
                             Price = p.Price,
                             ProductType = p.ProductType,
                             Picture = p.Picture,
                             CompanyDetailId = p.CompanyDetailId,
                             IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                             IsActive1 = p.IsActive == 1 ? "Active" : "InActive",
                             showCart = p.Variance == 1 ? "none" : "block",
                             ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                             {
                                 t.ProductVarianceId,
                                 t.VariancePrice,
                                 t.sellingPrice,
                                 t.VarianceType,
                                 t.VarianceActive
                             }).Where(s=>s.VarianceActive ==1) : null,
                             StockCount = p.ProductStocks.AsEnumerable().Select(F => new
                             {
                                 F.StockCount,
                                 F.ProductId,
                                 F.ProductVarianceId
                             }).Where(s => s.ProductId == p.ProductId)

                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        //[HttpGet]
        //[Route("api/ProductDetails/GetProductDetailsForZeroPrice")]
        //public IEnumerable GetProductDetailsForZeroPrice(int iActive, int CompanyId)
        //{
        //    try
        //    {
        //        var vsno = 0;
        //        var a = (from p in db.ProductDetails.AsEnumerable()
        //                 where (p.IsActive == iActive && p.CompanyDetailId == CompanyId)
        //                 orderby p.ProductId descending
        //                 select new
        //                 {
        //                     Image = (from k in db.ProductImages.AsEnumerable()
        //                              where p.ProductId == k.ProductId
        //                              select new { k.ImageURL }).Take(1),
        //                     sno = ++vsno,
        //                     ProductId = p.ProductId,
        //                     Title = p.Title,
        //                     Description = p.Description,
        //                     Price = p.Price,
        //                     ProductType = p.ProductType,
        //                     Picture = p.Picture,
        //                     CompanyDetailId = p.CompanyDetailId,
        //                     IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
        //                     IsActive1 = p.IsActive == 1 ? "Active" : "InActive",
        //                     showCart = p.Variance == 1 ? "none" : "block",
        //                     ProdVariance = p.Variance == 1  ? p.ProductVariances.AsEnumerable().Select(t => new
        //                     {
        //                         t.ProductVarianceId,
        //                         t.VariancePrice,
        //                         t.sellingPrice,
        //                         t.VarianceType,
        //                         t.VarianceActive
        //                     }).Where(s =>s.sellingPrice ==0) : null,
        //                     StockCount = p.ProductStocks.AsEnumerable().Select(F => new
        //                     {
        //                         F.StockCount,
        //                         F.ProductId,
        //                         F.ProductVarianceId
        //                     }).Where(s => s.ProductId == p.ProductId)

        //                 });
        //        return a;
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }

        //}

        [HttpGet]
        [Route("api/ProductDetails/GetProductDetailsForZeroPrice")]
        public IEnumerable GetProductDetailsForZeroPrice(int iActive, int CompanyId)
        {
            try
            {
                var vsno = 0;
                var a = from x in (from p in db.ProductDetails.AsEnumerable()
                                   join q in db.ProductVariances.AsEnumerable() on p.ProductId equals q.ProductId
                                  
                                   where (q.sellingPrice == 0)
                                   select new
                                   {
                                       Image = (from k in db.ProductImages.AsEnumerable()
                                                where p.ProductId == k.ProductId
                                                select new { k.ImageURL }).Take(1),
                                       sno = ++vsno,
                                       ProductId = p.ProductId,
                                       Title = p.Title,
                                       Description = p.Description,
                                       Price = p.Price,
                                       ProductType = p.ProductType,
                                       Picture = p.Picture,
                                       CompanyDetailId = p.CompanyDetailId,
                                       IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                                       IsActive1 = p.IsActive == 1 ? "Active" : "InActive",
                                       showCart = p.Variance == 1 ? "none" : "block",
                                       ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                       {
                                           t.ProductVarianceId,
                                           t.VariancePrice,
                                           t.sellingPrice,
                                           t.VarianceType,
                                           t.VarianceActive
                                       }).Where(s => s.VarianceActive == 1) : null,
                                       StockCount = p.ProductStocks.AsEnumerable().Select(F => new
                                       {
                                           F.StockCount,
                                           F.ProductId,
                                           F.ProductVarianceId
                                       }).Where(s => s.ProductId == p.ProductId)

                                   })
                        select new
                        {
                            x.ProductId,
                            x.Title,                            
                            x.Description,                        
                            x.Price,
                            x.ProductType,                        
                            x.IsActive,
                            x.Picture,                          
                            x.CompanyDetailId,  
                            x.ProdVariance,
                            x.StockCount
                        };
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/FileUpload/ProductDetails")]
        public IHttpActionResult Uploads(int CompanyId , string vFileUploadURl)
        {
            try
            {
                log.Debug("AddDetail");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = vFileUploadURl;
                //    var vUrl = "https://petwebapi.sysmedacmicrosoft.com/";
                //var vUrl = "http://localhost:56397/";

                string modifiedfilename = string.Empty;
                string path = string.Empty;
                for (int i = 0; i < files.Count; i++)
                {
                    System.Web.HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            if (path == string.Empty)
                            {
                                path = vUrl + "/Uploads/ProductDetails/" + modifiedfilename;
                            }
                            else
                                path = path + "|" + vUrl + "/Uploads/ProductDetails/" + modifiedfilename;

                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                        }
                    }
                }



                var vURL = path;
                return Ok(vURL);

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        //[HttpPost]
        //[Route("api/FileUpload/ProductDetails")]
        //public IHttpActionResult Uploads(int CompanyId)
        //{
        //    try
        //    {
        //        string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
        //        System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
        //        //var vUrl = "https://groceryshopappapi.sysmedacmicrosoft.com/";
        //        var vUrl = "http://localhost:56397/";
        //        string modifiedfilename = string.Empty;
        //        string path = string.Empty;
        //        for (int i = 0; i < files.Count; i++)
        //        {
        //            System.Web.HttpPostedFile file = files[i];
        //            string fileName = new FileInfo(file.FileName).Name;

        //            if (file.ContentLength > 0)
        //            {
        //                Guid id = Guid.NewGuid();
        //                modifiedfilename = id.ToString() + "_" + fileName;

        //                if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
        //                {
        //                    if (path == string.Empty)
        //                    {
        //                        path = vUrl + "/Uploads/ProductDetails/" + modifiedfilename;
        //                    }
        //                    else
        //                        path = path + "|" + vUrl + "/Uploads/ProductDetails/" + modifiedfilename;

        //                    file.SaveAs(spath + Path.GetFileName(modifiedfilename));

        //                }
        //            }
        //        }
        //        var vURL = path;
        //        return Ok(vURL);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }
        //}


        [HttpPost]
        [Route("api/FileUpload/UpdateProductImage")]
        public IHttpActionResult UpdateProductImage(int ProductId, int CompanyId , string vFileUploadURl)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                // var vUrl = "https://petwebapi.sysmedacmicrosoft.com/";
                //var vUrl = "http://localhost:56397/";
                var vUrl = vFileUploadURl;
                string modifiedfilename = string.Empty;
                string path = string.Empty;
                for (int i = 0; i < files.Count; i++)
                {
                    System.Web.HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        Guid id = Guid.NewGuid();
                        modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(modifiedfilename)))
                        {
                            if (path == string.Empty)
                            {
                                path = vUrl + "/Uploads/ProductDetails/" + modifiedfilename;
                            }
                            else
                                path = path + "|" + vUrl + "/Uploads/ProductDetails/" + modifiedfilename;

                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                        }
                    }
                }


               // db.ProductImages.RemoveRange(db.ProductImages.Where(k => k.ProductId == ProductId && k.CompanyDetailId == CompanyId && k.productvarinceid == null));
                //db.SaveChanges();
                var vURL = path;
                string[] strPicture = vURL.Split('|');
                //foreach (string str2 in strPicture)
                if (strPicture.Length > 0)
                {
                    //foreach (string str2 in strPicture)
                    //if (strsplitfilepath.Length > 0)
                    for (int cnt = 0; cnt < strPicture.Length; cnt++)
                    {

                        ProductImage InsertProductImage = new ProductImage();
                        InsertProductImage.ImageURL = strPicture[cnt];
                        InsertProductImage.CompanyDetailId = CompanyId;
                        InsertProductImage.ProductId = ProductId;
                        db.ProductImages.Add(InsertProductImage);

                        db.SaveChanges();
                    }
                }
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }


        }


        [HttpPost]
        [Route("api/FileUpload/ProductVarienceDetails")]
        public IHttpActionResult ProductVarienceDetails(int CompanyId , string vFileUploadURl)
        {
            try
            {
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/ProductDetails/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                // var vUrl = "https://petwebapi.sysmedacmicrosoft.com/";
                //var vUrl = "http://localhost:56397/";
                var vUrl = vFileUploadURl;
                string modifiedfilename = string.Empty;
                string path = string.Empty;
                for (int i = 0; i < files.Count; i++)
                {
                    System.Web.HttpPostedFile file = files[i];
                    string fileName = new FileInfo(file.FileName).Name;

                    if (file.ContentLength > 0)
                    {
                        //Guid id = Guid.NewGuid();
                        //modifiedfilename = id.ToString() + "_" + fileName;

                        if (!File.Exists(spath + Path.GetFileName(fileName)))
                        {
                            if (path == string.Empty)
                            {
                                path = vUrl + "/Uploads/ProductDetails/" + fileName;
                            }
                            else
                                path = path + "|" + vUrl + "/Uploads/ProductDetails/" + fileName;

                            file.SaveAs(spath + Path.GetFileName(fileName));

                        }
                    }
                }
                var vURL = path;
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/ProductDetails/GetProductDetailsbyAdmin")]
        public IEnumerable GetProductDetailsbyAdmin(int ProductId, int CompanyId)
        {
            try
            {
                var a = from x in (from p in db.ProductDetails.AsEnumerable()
                                   join q in db.SubCategories.AsEnumerable() on p.SubCategoryId equals q.SubCategoryId
                                   join r in db.AdminLogins.AsEnumerable() on p.InsertedBy equals r.AdminLoginId
                                   where (p.ProductId == ProductId && p.CompanyDetailId == CompanyId)
                                   select new
                                   {
                                       ProductId = p.ProductId,
                                       Title = p.Title,
                                       Description = p.Description,
                                       Description2 = p.Description2,
                                       Description3 = p.Description3,
                                       Price = p.Price,
                                       ProductType = p.ProductType,
                                       DiscountDetailsId = p.DiscountDetailsId,
                                       TaxDetailsId = p.TaxDetailsId,
                                       SubCategoryId = p.SubCategoryId,
                                       CouponId = p.CouponId,
                                       IsActive = p.IsActive,
                                       Picture = p.Picture,
                                       CategoryId = q.CategoryId,
                                       SubCategoryName = q.SubCategoryName,
                                       CompanyDetailId = p.CompanyDetailId,
                                       p.Variance,
                                       p.BrandTypeId,
                                       r.Username,
                                       InsertedDate = Convert.ToDateTime(p.InsertedDate).ToString("dd/MM/yyyy"),
                                       // p.InsertedDate,
                                       UpdatedDate = Convert.ToDateTime(p.UpdatedDate).ToString("dd/MM/yyyy"),
                                       p.UpdatedBy,
                                       p.wholesale,
                                       p.colorcode,
                                       // p.UpdatedDate,
                                   })
                        select new
                        {
                            x.ProductId,
                            x.Title,
                            x.wholesale,
                            x.Description,
                            x.colorcode,
                            x.Price,
                            x.ProductType,
                            x.DiscountDetailsId,
                            x.TaxDetailsId,
                            x.SubCategoryId,
                            x.CouponId,
                            x.IsActive,
                            x.Picture,
                            x.CategoryId,
                            x.SubCategoryName,
                            x.CompanyDetailId,
                            x.UpdatedDate,
                            x.InsertedDate,
                            ModifiedName = db.AdminLogins.Where(X => X.AdminLoginId == x.UpdatedBy).Take(1).Select(X => X.Username).FirstOrDefault(),
                            x.Variance,
                            x.BrandTypeId,
                            x.Username,
                            Coupon = db.CouponDetails.Where(X => X.CouponId == x.CouponId).Take(1).Select(X => X.Code).FirstOrDefault(),
                            BrandName = db.BrandTypes.Where(X => X.BrandTypeId == x.BrandTypeId).Take(1).Select(X => X.BrandTypeName).FirstOrDefault(),
                            CategoryName = db.Categories.Where(X => X.CategoryId == x.CategoryId).Take(1).Select(X => X.CategoyName).FirstOrDefault(),
                            DiscountName = db.DiscountDetails.Where(X => X.DiscountDetailsId == x.DiscountDetailsId).Take(1).Select(X => X.Description).FirstOrDefault(),
                        };
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/ProductDetails/GetProductTecDetails")]
        public IEnumerable<ProductTecDetail> GetProductTecDetails(int ProductId, int CompanyId)
        {
            try
            {
                var a = (from p in db.ProductTecDetails.AsEnumerable()
                         where (p.ProductId == Convert.ToInt32(ProductId)  && p.CompanyDetailId == CompanyId)
                         select new ProductTecDetail
                         {
                             ProductTecDetailsId = p.ProductTecDetailsId,
                             TechinalDetails = p.TechinalDetails,
                             ProductId = p.ProductId,
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
        [Route("api/ProductDetails/GetProductFeatures")]
        public IEnumerable<ProductFeature> GetProductFeatures(int ProductId, int CompanyId)
        {
            try
            {
                var a = (from p in db.ProductFeatures.AsEnumerable()
                         where ((p.ProductId == Convert.ToInt32(ProductId) ) && (p.CompanyDetailId == CompanyId))
                         select new ProductFeature
                         {
                             CompanyDetailId = p.CompanyDetailId,
                             Features = p.Features,
                             ProductId = p.ProductId
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
        [Route("api/ProductDetails/GetProductVarienceDet")]
        public IEnumerable GetProductVarienceDet(int ProductId, int CompanyId)
        {
            try
            {
                var a = (from p in db.ProductVariances.AsEnumerable()

                         where (p.ProductId == ProductId && p.VarianceActive == 1)
                         select new
                         {
                             ProductVarianceId = p.ProductVarianceId,
                             VarianceType = p.VarianceType,
                             VariancePrice = p.VariancePrice,
                             CompanyDetailId = p.CompanyDetailId,
                             sellingPrice = p.sellingPrice,
                             ImageUrl = p.ImageUrl,
                             VarianceActive = p.VarianceActive,

                             Wholesaleprice = p.Wholesaleprices.Select(x => new {
                                 x.wholesaleFromQty,
                                 x.wholesaleprize,
                                 x.wholesaleToQty,
                                 x.WholesalepriceId,
                                 Status = x.Status == 1 ? true : false,
                             }),
                             variancecolor = p.Variancecolorcodes.Select(x => new
                             {
                                 x.colorcode,
                                 x.VariancecolorcodeId,
                                 Status = x.Status == 1 ? true : false,
                             }),


                             STockCount = p.ProductStocks.Select(x => new
                             {
                                x.StockCount,
                             }),
                            // dte = db.ProductStocks.FirstOrDefault(x => x.ProductVarianceId == p.ProductVarianceId).StockCount,

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
        [Route("api/ProductDetails/Updatecolorvariance")]
        public IHttpActionResult Updatecolorvariance(List<clientvariance> multicolor1, int ProductvarianceId)
        {
            try
            {
                for(int i=0; i< multicolor1.Count; i++)
                {
                    if(multicolor1[i].colorvariance != 0)
                    {
                        var variance = multicolor1[i].colorvariance;
                        var result = db.Variancecolorcodes.FirstOrDefault(x => x.VariancecolorcodeId == variance);
                        if (result != null)
                        {
                            result.colorcode = multicolor1[i].colorcode;
                            db.SaveChanges();
                        }
                    }
                    else
                    {
                        Variancecolorcode Ins = new Variancecolorcode();
                        Ins.colorcode = multicolor1[i].colorcode;
                        Ins.ProductVarianceId = ProductvarianceId;
                        db.Variancecolorcodes.Add(Ins);
                        db.SaveChanges();
                    }
                  
                }
                return Ok("Success");
            }
            catch(Exception ex)
            {
                return null;
            }
         
        }

        [HttpPost]
        [Route("api/ProductDetails/InsertProductVariancecolor")]
        public IHttpActionResult InsertProductVariancecolor(List<clientvariance> multicolor1, int ProductvarianceId)
        {
            try
            {
                for(int i=0; i< multicolor1.Count; i++)
                {
                    Variancecolorcode Ins = new Variancecolorcode();
                    Ins.colorcode = multicolor1[i].colorcode;
                    Ins.ProductVarianceId = ProductvarianceId;
                    Ins.Status = 1;
                    db.Variancecolorcodes.Add(Ins);
                    db.SaveChanges();
                }
                

                return Ok("Success");
            }
            catch(Exception ex)
            {
                return null;
            }
           
        }

        [HttpPost]
        [Route("api/ProductDetails/UpdatewholesaleProductVariance")]
        public IHttpActionResult UpdatewholesaleProductVariance(List<clientwholesalevariance> wholesale,int ProductvarId)
        {
            try
            {
                if (wholesale != null)
                {

                    for (int i = 0; i < wholesale.Count; i++)
                    {
                        var wholesalevariance = wholesale[i].WholesalepriceId;
                        if(wholesalevariance != 0)
                        {
                            var WholesaleID = wholesale[i].WholesalepriceId;
                            if (wholesale[i].WholesalepriceId != 0)
                            {
                                int wholesaleid = Convert.ToInt32(wholesale[i].WholesalepriceId);
                                var result = db.Wholesaleprices.FirstOrDefault(x => x.WholesalepriceId == wholesaleid);
                                if (result != null)
                                {
                                    result.wholesaleFromQty = wholesale[i].wholesaleFromQty;
                                    result.wholesaleToQty = wholesale[i].wholesaleToQty;
                                    result.wholesaleprize = wholesale[i].wholesaleprize;
                                    result.Status = wholesale[i].VarianceActive;
                                    db.SaveChanges();
                                }

                            }
                           
                        }
                        else
                        {
                            EcommerceEntities db1 = new EcommerceEntities();
                            Wholesaleprice Ins = new Wholesaleprice();
                            Ins.wholesaleFromQty = wholesale[i].wholesaleFromQty;
                            Ins.wholesaleToQty = wholesale[i].wholesaleToQty;
                            Ins.wholesaleprize = wholesale[i].wholesaleprize;
                            Ins.productVarianceId = ProductvarId;
                            Ins.Status = wholesale[i].VarianceActive;
                            db.Wholesaleprices.Add(Ins);
                            db.SaveChanges();
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                return Ok("Fail");
            }
            return Ok("Success");
        }


        [HttpPost]
        [Route("api/ProductDetails/InsertProduct")]
        public IHttpActionResult InsertProductDetails([FromBody]ProductDetail InsertProduct, int CompanyId, string BrandTypeId, string SubCategory, string Discount1,int wholsesale , string Coupoun1)
        {
            try
            {

                long Discount2 = 0;
                long Coupoun2 = 0;
                string strId = "";
                // InsertProduct.Picture = Picture;
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                string strProductFeatures = "", strProductTecDetails = "", stPicture = "";
                strProductFeatures = InsertProduct.ProdFeatures;
                strProductTecDetails = InsertProduct.ProdTecDetails;
                stPicture = InsertProduct.Picture;
                InsertProduct.InsertedDate = dtCNow;
                var BrandType = (from p in db.BrandTypes where p.BrandTypeName == BrandTypeId select new { p.BrandTypeId }).FirstOrDefault();
                var SubCate = (from p in db.SubCategories where p.SubCategoryName == SubCategory select new { p.SubCategoryId }).FirstOrDefault();
                if (Discount1 != "" && Discount1 != null)
                {
                    var Discount = (from p in db.DiscountDetails where p.Description == Discount1 select new { p.DiscountDetailsId }).FirstOrDefault();
                    Discount2 = Discount.DiscountDetailsId;
                }

                if (Coupoun1 != "" && Coupoun1 != null)
                {
                    var Coupoun = (from p in db.CouponDetails where p.Code == Coupoun1 select new { p.CouponId }).FirstOrDefault();
                    Coupoun2 = Coupoun.CouponId;
                }

                var descExist = db.ProductDetails.Any(x => x.Title == InsertProduct.Title && x.CompanyDetailId == CompanyId);
                if (descExist)
                {
                    return Ok("Exist");
                }
                else
                {
                    InsertProduct.BrandTypeId = BrandType.BrandTypeId;
                    InsertProduct.SubCategoryId = SubCate.SubCategoryId;
                    if (Discount1 != "" && Discount1 != null)
                    {
                        InsertProduct.DiscountDetailsId = Discount2;
                    }
                    else
                    {
                        InsertProduct.DiscountDetailsId = null;
                    }

                    if (Coupoun1 != "" && Coupoun1 != null)
                    {
                        InsertProduct.CouponId = Coupoun2;
                    }
                    else
                    {
                        InsertProduct.CouponId = null;
                    }


                    InsertProduct.wholesale = wholsesale;
                   // InsertProduct.CouponId = Coupoun1;
                    InsertProduct.ProdFeatures = "";
                    InsertProduct.ProdTecDetails = "";
                    InsertProduct.Picture = "";
                    InsertProduct.CompanyDetailId = CompanyId;
                    db.ProductDetails.Add(InsertProduct);
                    db.SaveChanges();



                    int iId = Convert.ToInt32(InsertProduct.ProductId);
                    strId = iId.ToString();

                    string[] strfunc = strProductFeatures.Split('|');
                    foreach (string str in strfunc)

                    {
                        ProductFeature InsertFeature = new ProductFeature();

                        InsertFeature.Features = str;
                        InsertFeature.ProductId = iId;
                        InsertFeature.CompanyDetailId = CompanyId;
                        db.ProductFeatures.Add(InsertFeature);

                        db.SaveChanges();
                    }
                    int pId = Convert.ToInt32(InsertProduct.ProductId);

                    string[] strTecfunc = strProductTecDetails.Split('|');
                    foreach (string str1 in strTecfunc)
                    {
                        ProductTecDetail InsertTechincalDetails = new ProductTecDetail();
                        InsertTechincalDetails.TechinalDetails = str1;
                        InsertTechincalDetails.CompanyDetailId = CompanyId;
                        InsertTechincalDetails.ProductId = iId;
                        db.ProductTecDetails.Add(InsertTechincalDetails);

                        db.SaveChanges();
                    }


                    string[] strPicture = stPicture.Split('|');
                    //foreach (string str2 in strPicture)
                    if (strPicture.Length > 0)
                    {
                        //foreach (string str2 in strPicture)
                        //if (strsplitfilepath.Length > 0)
                        for (int cnt = 0; cnt < strPicture.Length; cnt++)
                        {

                            ProductImage InsertProductImage = new ProductImage();

                            if (strPicture[cnt] != "" && strPicture[cnt] != null)
                            {
                                InsertProductImage.ImageURL = strPicture[cnt];

                            }
                            else
                                InsertProductImage.ImageURL = "";

                            //InsertProductImage.ImageURL = strPicture[cnt];
                            InsertProductImage.CompanyDetailId = CompanyId;
                            InsertProductImage.ProductId = iId;

                            db.ProductImages.Add(InsertProductImage);

                            db.SaveChanges();
                        }
                    }
                }
                return Ok(strId);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpPost]
        [Route("api/ProductDetails/InsertProductVariance")]
        public IHttpActionResult InsertProductVariance(int ProductId, string VariantType, int varianceprice, int sellingprice, int AdminId,int CompanyId , int StockCount)
        {
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
            ProductVariance variance = new ProductVariance();
            variance.VariancePrice = varianceprice;
            variance.sellingPrice = sellingprice;
            variance.VarianceType = VariantType;
            variance.ProductId = ProductId;
            variance.InsertedBy = AdminId;
            variance.InsertedDate = dtCNow;
            variance.VarianceActive = 1;
            variance.CompanyDetailId = CompanyId;
            db.ProductVariances.Add(variance);
            db.SaveChanges();

            var iId = variance.ProductVarianceId;

            ProductStock stock = new ProductStock();
            stock.ProductVarianceId = iId;
            stock.ProductId = ProductId;
            stock.StockCount = StockCount;
            stock.CompanyDetailId = CompanyId;
            db.ProductStocks.Add(stock);
            db.SaveChanges();
            var id = Convert.ToInt32(iId);

            ProductImage objProductimg = new ProductImage();
            objProductimg.ProductId = ProductId;
            objProductimg.productvarinceid = id;
            if (variance.ImageUrl != "" && variance.ImageUrl != null)
            {
                objProductimg.ImageURL = variance.ImageUrl;

            }
            else
                objProductimg.ImageURL = "";

            objProductimg.CompanyDetailId = variance.CompanyDetailId;
            db.ProductImages.Add(objProductimg);
            db.SaveChanges();


            return Ok("Success");
        }

        public class clientwholesalevariance
        {
            public long WholesalepriceId { get; set; }
            public string wholesaleFromQty { get; set; }
            public string wholesaleToQty { get; set; }
            public decimal wholesaleprize { get; set; }
            public long VarianceActive { get; set; }
            public long ProductVarianceId { get; set; }
        }

        public class clientvariance
        {
            public string colorcode { get; set; }
            public int colorvariance { get; set; }
        }

        [HttpPost]
        [Route("api/ProductDetails/InsertProductVariancewholesaledetails")]
        public IHttpActionResult InsertProductVariancewholesaledetails(List<clientwholesalevariance> wholesale, int ProductvarianceId)
        {
            try
            {
                for (int i = 0; i < wholesale.Count; i++)
                {
                    Wholesaleprice Ins = new Wholesaleprice();
                    Ins.productVarianceId = ProductvarianceId;
                    Ins.wholesaleFromQty = wholesale[i].wholesaleFromQty;
                    Ins.wholesaleToQty = wholesale[i].wholesaleToQty;
                    Ins.wholesaleprize = wholesale[i].wholesaleprize;
                    Ins.Status = 1;
                    db.Wholesaleprices.Add(Ins);
                    db.SaveChanges();
                }
                   
            }
            catch(Exception ex)
            {
                return Ok("Fail");
            }
            return Ok("Success");
        }

        [HttpPost]
        [Route("api/ProductDetails/InsertProductVariancedetails")]
        public IHttpActionResult InsertProductVariancedetails(List<clientProductVariance> ProdVarience, int ProductId, int AdminId, int CompanyId ,  string VariantStockCount)
        {
            if (ProdVarience != null)
            {

                for (int i = 0; i < ProdVarience.Count; i++)
                {
                    TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                    DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                    ProductVariance objProductVariance = new ProductVariance();
                    objProductVariance.ProductId = ProductId;
                    objProductVariance.VarianceType = ProdVarience[i].VarianceType;
                    objProductVariance.VariancePrice = ProdVarience[i].VariancePrice;
                    objProductVariance.sellingPrice = ProdVarience[i].sellingPrice;
                    objProductVariance.ImageUrl = ProdVarience[i].ImageUrl;
                    objProductVariance.InsertedBy = AdminId;
                    objProductVariance.InsertedDate = dtCNow;
                    objProductVariance.CompanyDetailId = CompanyId;
                    objProductVariance.VarianceActive = ProdVarience[i].VarianceActive;
                    db.ProductVariances.Add(objProductVariance);
                    db.SaveChanges();

                    var iId = objProductVariance.ProductVarianceId;

                    
                    ProductStock stock = new ProductStock();
                    stock.ProductVarianceId = iId;
                    stock.ProductId = ProductId;
                    stock.StockCount = Convert.ToInt32(VariantStockCount);
                    stock.CompanyDetailId = CompanyId;
                    db.ProductStocks.Add(stock);
                    db.SaveChanges();
                    if (objProductVariance.ImageUrl != "" && objProductVariance.ImageUrl != null)
                    {
                        var test = Convert.ToInt32(objProductVariance.ProductVarianceId);
                        ProductImage objProductimg = new ProductImage();
                    objProductimg.ProductId = ProductId;

                    
                        objProductimg.ImageURL = objProductVariance.ImageUrl;

                        objProductimg.productvarinceid = test;

                    //objProductimg.ImageURL = objProductVariance.ImageUrl;
                    objProductimg.CompanyDetailId = objProductVariance.CompanyDetailId;
                    db.ProductImages.Add(objProductimg);
                    db.SaveChanges();
                    }
                   

                    return Ok(iId);
                }
            }
            return Ok("Success");
        }


        public class clientProductVariance
        {
            public long ProductVarianceId { get; set; }
            public string VarianceType { get; set; }
            public decimal VariancePrice { get; set; }
            public decimal sellingPrice { get; set; }
            public string ImageUrl { get; set; }
            public Nullable<long> VarianceActive { get; set; }
            public long WholesalepriceId { get; set; }
            public string wholesaleFromQty { get; set; }
            public string wholesaleToQty { get; set; }
            public decimal wholesaleprize { get; set; }
            public long VarianceActive1 { get; set; }
            public string StockCount { get;  set; }
        }


        [HttpPost]
        [Route("api/ProductDetails/UpdateProduct")]
        public IHttpActionResult UpdateProductDetails([FromBody]ProductDetail UpdateProduct, int ProductId, int CompanyId, string BrandTypeId, string SubCategory, string Discount1 , string Coupoun1)
        {
            try
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                long Discount2 = 0;
                long Coupoun2 = 0;
                string strId = "";
                string strProductFeatures = "", strProductTecDetails = "";
                strProductFeatures = UpdateProduct.ProdFeatures;
                strProductTecDetails = UpdateProduct.ProdTecDetails;
                var BrandType = (from p in db.BrandTypes where p.BrandTypeName == BrandTypeId select new { p.BrandTypeId }).FirstOrDefault();
                var SubCate = (from p in db.SubCategories where p.SubCategoryName == SubCategory select new { p.SubCategoryId }).FirstOrDefault();
                if (Discount1 != "" && Discount1 != null)
                {
                    var Discount = (from p in db.DiscountDetails where p.Description == Discount1 select new { p.DiscountDetailsId }).FirstOrDefault();
                    Discount2 = Discount.DiscountDetailsId;
                }

                if (Coupoun1 != "" && Coupoun1 != null)
                {
                    var Coupoun = (from p in db.CouponDetails where p.Code == Coupoun1 select new { p.CouponId }).FirstOrDefault();
                    Coupoun2 = Coupoun.CouponId;
                }

                var context = new EcommerceEntities();
                var result = context.ProductDetails.First(p => p.ProductId == ProductId && p.CompanyDetailId == CompanyId);
                if (result != null)
                {
                    result.ProductId = ProductId;
                    result.Title = UpdateProduct.Title;
                    result.Description = UpdateProduct.Description;
                    result.Description2 = UpdateProduct.Description2;
                    result.Description3 = UpdateProduct.Description3;
                    result.Price = UpdateProduct.Price;
                    result.ProductType = UpdateProduct.ProductType;
                    //result.DiscountDetailsId = UpdateProduct.DiscountDetailsId;
                    if (Discount1 != "" && Discount1 != null)
                    {
                        result.DiscountDetailsId = Discount2;
                    }

                    if (Coupoun1 != "" && Coupoun1 != null)
                    {
                        result.CouponId = Coupoun2;
                    }
                    else
                    {
                        result.CouponId = null;
                    }


                    result.CouponId = UpdateProduct.CouponId;
                    result.TaxDetailsId = UpdateProduct.TaxDetailsId;
                    result.SubCategoryId = SubCate.SubCategoryId;
                    result.CompanyDetailId = CompanyId;
                    result.IsActive = UpdateProduct.IsActive;
                    result.Variance = UpdateProduct.Variance;
                    result.BrandTypeId = BrandType.BrandTypeId;
                    result.UpdatedBy = UpdateProduct.UpdatedBy;
                    result.UpdatedDate = dtCNow;
                    context.SaveChanges();

                    int iId = Convert.ToInt32(ProductId);
                    strId = iId.ToString();


                    db.ProductFeatures.RemoveRange(db.ProductFeatures.Where(k => k.ProductId == iId && k.CompanyDetailId == CompanyId));
                    db.SaveChanges();

                    string[] strfunc = strProductFeatures.Split('|');
                    foreach (string str in strfunc)

                    {
                        ProductFeature InsertFeature = new ProductFeature();

                        InsertFeature.Features = str;
                        InsertFeature.ProductId = iId;
                        InsertFeature.CompanyDetailId = CompanyId;
                        db.ProductFeatures.Add(InsertFeature);

                        db.SaveChanges();
                    }
                    int pId = Convert.ToInt32(ProductId);

                    db.ProductTecDetails.RemoveRange(db.ProductTecDetails.Where(k => k.ProductId == pId && k.CompanyDetailId == CompanyId));
                    db.SaveChanges();

                    string[] strTecfunc = strProductTecDetails.Split('|');
                    foreach (string str1 in strTecfunc)
                    {
                        ProductTecDetail InsertTechincalDetails = new ProductTecDetail();
                        InsertTechincalDetails.TechinalDetails = str1;
                        InsertTechincalDetails.CompanyDetailId = CompanyId;
                        InsertTechincalDetails.ProductId = iId;
                        db.ProductTecDetails.Add(InsertTechincalDetails);

                        db.SaveChanges();
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpPost]
        [Route("api/ProductDetails/UpdateProdTecDetails")]
        public IHttpActionResult UpdateProductTecDetails([FromBody]ProductTecDetail UpdateProdTecDetails, int ProductId, string ProdTecDetails, int CompanyId)
        {
            try
            {
                db.ProductTecDetails.RemoveRange(db.ProductTecDetails.Where(k => k.ProductId == ProductId && k.CompanyDetailId == CompanyId));
                db.SaveChanges();


                string[] strTecfunc = ProdTecDetails.Split('|');
                foreach (string str in strTecfunc)
                {
                    ProductTecDetail InsertTechincalDetails = new ProductTecDetail();
                    InsertTechincalDetails.TechinalDetails = str;
                    InsertTechincalDetails.ProductId = ProductId;
                    InsertTechincalDetails.CompanyDetailId = CompanyId;
                    db.ProductTecDetails.Add(InsertTechincalDetails);

                    db.SaveChanges();
                }


                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }


        }

        [HttpPost]
        [Route("api/ProductDetails/varianceActive")]
        public IHttpActionResult varianceActive(string variance, int VarianceActive, int ProductId)
        {
            if (VarianceActive == 1)
            {
                VarianceActive = 0;
            }
            else
            {
                VarianceActive = 1;
            }
            var resultVar = db.ProductVariances.FirstOrDefault(x => x.ProductVarianceId == ProductId);
            if (resultVar != null)
            {//Update Query

                resultVar.VarianceActive = VarianceActive;

                db.SaveChanges();
            }
            return Ok("Success");
        }

        [HttpPost]
        [Route("api/ProductDetails/UpdateProductVariance")]
        public IHttpActionResult UpdateProductVariance(List<clientProductVariance> obj, int ProductId, int VaDMIN)
        {
            for (int i = 0; i < obj.Count; i++)
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                if (obj[i].ProductVarianceId != 0)
                {
                    var vId = Convert.ToInt32(obj[i].ProductVarianceId);
                    var resultVar = db.ProductVariances.First(x => x.ProductVarianceId == vId);
                    if (resultVar != null)
                    {//Update Query
                        resultVar.VarianceType = obj[i].VarianceType;
                        resultVar.VariancePrice = obj[i].VariancePrice;
                        resultVar.sellingPrice = obj[i].sellingPrice;
                        resultVar.ImageUrl = obj[i].ImageUrl;
                        resultVar.VarianceActive = obj[i].VarianceActive;
                        resultVar.InsertedBy = VaDMIN;
                        resultVar.InsertedDate = dtCNow;
                        db.SaveChanges();
                        db.ProductImages.RemoveRange(db.ProductImages.Where(x => x.productvarinceid == vId));
                        if (resultVar.ImageUrl != "" && resultVar.ImageUrl != null)
                        {
                            ProductImage objProductimg = new ProductImage();
                            objProductimg.ProductId = ProductId;
                            objProductimg.productvarinceid = vId;
                            objProductimg.ImageURL = resultVar.ImageUrl;                                              
                            objProductimg.CompanyDetailId = resultVar.CompanyDetailId;
                            db.ProductImages.Add(objProductimg);
                            db.SaveChanges();
                        }
                        if (obj[i].StockCount != "" ){
                            db.ProductStocks.RemoveRange(db.ProductStocks.Where(x => x.ProductVarianceId == vId));
                            ProductStock objProductStock = new ProductStock();
                       objProductStock.ProductId = ProductId;
                       objProductStock.ProductVarianceId = vId;
                       objProductStock.StockCount = Convert.ToInt32(obj[i].StockCount);
                       db.ProductStocks.Add(objProductStock);
                       db.SaveChanges();
            }
                        
                    }
                   
                    return Ok(resultVar.ProductVarianceId);
                }
                else
                {//Insert 
                    ProductVariance objProductVariance = new ProductVariance();
                    objProductVariance.ProductId = ProductId;
                    objProductVariance.VarianceType = obj[i].VarianceType;
                    objProductVariance.VariancePrice = obj[i].VariancePrice;
                    objProductVariance.sellingPrice = obj[i].sellingPrice;
                    objProductVariance.ImageUrl = obj[i].ImageUrl;
                    objProductVariance.VarianceActive = 1;
                    objProductVariance.InsertedBy = VaDMIN;
                    objProductVariance.InsertedDate = dtCNow;
                    db.ProductVariances.Add(objProductVariance);
                    db.SaveChanges();

                    var iId = Convert.ToInt32(objProductVariance.ProductVarianceId);

                    ProductStock stock = new ProductStock();
                    stock.ProductVarianceId = iId;
                    stock.ProductId = ProductId;
                    stock.StockCount = Convert.ToInt32(obj[i].StockCount);
                    db.ProductStocks.Add(stock);
                    db.SaveChanges();
                    if (objProductVariance.ImageUrl != "" && objProductVariance.ImageUrl != null)
                    {
                        ProductImage objProductimg = new ProductImage();
                        objProductimg.ProductId = ProductId;

                        objProductimg.productvarinceid = iId;
                        objProductimg.ImageURL = objProductVariance.ImageUrl;




                        //objProductimg.ImageURL = resultVar.ImageUrl;
                        objProductimg.CompanyDetailId = objProductVariance.CompanyDetailId;
                        db.ProductImages.Add(objProductimg);
                        db.SaveChanges();
                    }
                    return Ok(iId);
                }
            }
            //var result = db.ProductVariances.First(x => x.ProductId == ProductId);
            //if (result != null)
            //{

            //}

            return Ok("Success");
        }

        //search
        [HttpGet]
        [Route("api/ProductDetails/GetProductSearch")]
        public IEnumerable GetSearch(string Search, int Status, int CompanyId)
        {
            try
            {
                var vsno = 0;
                var a = from x in (from p in db.ProductDetails.AsEnumerable()
                                   join q in db.BrandTypes on p.BrandTypeId equals q.BrandTypeId
                                   join e in db.SubCategories.AsEnumerable() on p.SubCategoryId equals e.SubCategoryId
                                   join f in db.Categories on e.CategoryId equals f.CategoryId
                                   where (p.CompanyDetailId == CompanyId) && (p.IsActive == Status)


                                   //where (p.Code.ToLower().Contains(Search.Trim().ToString()))
                                   //where (p.AddName.ToLower().Contains(Search.Trim().ToLower())

                                   orderby p.ProductId descending
                                   select new

                                   {
                                       Image = (from k in db.ProductImages.AsEnumerable()//---Inner joint query for getting images from another table ---//
                                                where p.ProductId == k.ProductId && p.CompanyDetailId == k.CompanyDetailId
                                                select new { k.ImageURL }).Take(1),

                                       sno = ++vsno,
                                       Title = p.Title,
                                       //Description = p.Description,
                                       Price = p.Price,
                                       CompanyDetailId = p.CompanyDetailId,
                                       ProductId = p.ProductId,
                                       q.BrandTypeName,
                                       e.SubCategoryName,
                                       f.CategoyName,
                                       IsActive = p.IsActive == 1 ? "AdminStyle/images/checked.png" : "AdminStyle/images/cancel.png",
                                       IsActive1 = p.IsActive == 1 ? "Active" : "InActive",
                                       ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                       {
                                           t.ProductVarianceId,
                                           t.VariancePrice,
                                           t.sellingPrice,
                                           t.VarianceType,
                                           t.VarianceActive
                                       }) : null,

                                   })
                        where (x.Title.ToLower().Contains(Search.Trim().ToLower()) || x.BrandTypeName.ToLower().Contains(Search.Trim().ToLower()) ||  x.Price.ToString().Contains(Search.ToString()) || x.CategoyName.ToLower().Contains(Search.Trim().ToLower()) || x.SubCategoryName.ToLower().Contains(Search.Trim().ToLower()))
                        select new
                        {
                            x.Image,

                            x.sno,
                            x.Title,
                           // x.Description,
                            x.Price,
                            x.CompanyDetailId,
                            x.ProductId,
                            x.IsActive,
                            x.IsActive1,
                            x.ProdVariance,
                        };

                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }

        [HttpPost]
        [Route("api/ProductDetails/UpdateProdFeatures")]
        public IHttpActionResult UpdateProductFeatures([FromBody]ProductFeature UpdateProductFeatures, int ProductId, string ProductFeatures, int CompanyId)
        {
            try
            {
                db.ProductFeatures.RemoveRange(db.ProductFeatures.Where(k => k.ProductId == ProductId && k.CompanyDetailId == CompanyId));
                db.SaveChanges();


                string[] strfunc = ProductFeatures.Split('|');
                foreach (string str in strfunc)
                {
                    ProductFeature InsertFeature = new ProductFeature();

                    InsertFeature.Features = str;
                    InsertFeature.ProductId = ProductId;
                    InsertFeature.CompanyDetailId = CompanyId;
                    db.ProductFeatures.Add(InsertFeature);
                    db.SaveChanges();
                }


                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }
        //Product detail
        [HttpPost]
        [Route("api/ProductDetails/UpdateProdTecdetail")]
        public IHttpActionResult UpdateProdTecdetail([FromBody]ProductTecDetail UpdateProductTecDetail, int ProductId, string ProdTecDetails, int CompanyId)
        {
            try
            {
                db.ProductTecDetails.RemoveRange(db.ProductTecDetails.Where(k => k.ProductId == ProductId && k.CompanyDetailId == CompanyId));
                db.SaveChanges();


                string[] strfunc = ProdTecDetails.Split('|');
                foreach (string str in strfunc)
                {
                    ProductTecDetail InsertDetail = new ProductTecDetail();

                    InsertDetail.TechinalDetails = str;
                    InsertDetail.ProductId = ProductId;
                    InsertDetail.CompanyDetailId = CompanyId;
                    db.ProductTecDetails.Add(InsertDetail);
                    db.SaveChanges();
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
        [Route("api/ProductDetails/GetImages")]
        public IEnumerable GetImages(int ProductId, int CompanyId)
        {
            try
            {
                var a = (from p in db.ProductImages.AsEnumerable()
                         where (p.ProductId == ProductId && p.CompanyDetailId == CompanyId)
                         select new
                         {
                             ProductImageId = p.ProductImageId,
                             ProductId = p.ProductId,
                             ImageURL = p.ImageURL,
                             CompanyDetailId = p.CompanyDetailId,
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
        [Route("api/ProductDetails/DeleteProductImage")]
        public IHttpActionResult DeleteProductImage(int ProductImageId , int CompanyId)
        {
            try
            {
                log.Debug("DeleteProductImage");
                var context = new EcommerceEntities();
                var result = context.ProductImages.First(b => b.ProductImageId == ProductImageId && b.CompanyDetailId == CompanyId);
                if (result != null)
                {
                    db.ProductImages.RemoveRange(db.ProductImages.Where(x => x.ProductImageId == ProductImageId && x.CompanyDetailId == CompanyId));
                    db.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        //Print Barcode
        //[HttpPost]
        //[Route("api/Barcode/PrintBarcode")]
        //public IHttpActionResult PrintBarcode( int CompanyId)
        //{
        //    try
        //    {
        //        log.Debug("PrintBarcode");
        //        Barcode barcode = new Barcode();
        //        Image img = barcode.Encode(TYPE.CODE128, code, Color.Black, Color.White, 250, 100);
        //        var data = ConvertImageToBytes(img);
        //        return File(data, "images/jpg");

        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }
        //}


        //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
        //Insering the validated data to database
        [HttpPost]
        [Route("api/Product/InsertImportProduct")]
        public IHttpActionResult InsertImportProduct(List<clInsertImportProduct> ProductImport, int companyid)
        {
            try
            {
                int id = 0;
                int id1 = 0;
                log.Debug("InsertImportProduct");
                var context = new EcommerceEntities();
                string lscnt = ProductImport.Count.ToString();
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        for (int cnt = 0; cnt < ProductImport.Count; cnt++)
                        {
                            ProductDetail objProduct = new ProductDetail();

                            if (ProductImport[cnt].CategoryName != null && ProductImport[cnt].CategoryName != "" && ProductImport[cnt].CategoryName != string.Empty)
                            {
                                var CatName = Convert.ToString(ProductImport[cnt].CategoryName);
                                var Categoryname = db.Categories.FirstOrDefault(x => x.CategoyName.ToLower().Replace(" ", "") == CatName.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid).CategoryId;
                                //  objProduct.ca = Categoryname;

                            }

                            if (ProductImport[cnt].SubcategoryName != null && ProductImport[cnt].SubcategoryName != "" && ProductImport[cnt].SubcategoryName != string.Empty)
                            {
                                var SubcatName = Convert.ToString(ProductImport[cnt].SubcategoryName);
                                var Subcateryname = db.SubCategories.FirstOrDefault(x => x.SubCategoryName.ToLower().Replace(" ", "") == SubcatName.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid).SubCategoryId;
                                var Dlrid = Convert.ToInt32(Subcateryname);
                                objProduct.SubCategoryId = Dlrid;

                            }

                            if (ProductImport[cnt].BrandType != null && ProductImport[cnt].BrandType != "" && ProductImport[cnt].BrandType != string.Empty)
                            {
                                var Brand = Convert.ToString(ProductImport[cnt].BrandType);
                                var Brandtypename = db.BrandTypes.FirstOrDefault(x => x.BrandTypeName.ToLower().Replace(" ", "") == Brand.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid).BrandTypeId;
                                objProduct.BrandTypeId = Brandtypename;

                            }

                            objProduct.ProductType = Convert.ToString(ProductImport[cnt].ProductType);
                            objProduct.Title = Convert.ToString(ProductImport[cnt].ProductTitle);
                            objProduct.Description = Convert.ToString(ProductImport[cnt].Description);
                            objProduct.CompanyDetailId = companyid;
                            objProduct.IsActive = 1;
                            objProduct.InsertedBy = 1;
                            objProduct.Variance = 1;
                            objProduct.ProdFeatures = "";
                            objProduct.ProdTecDetails = "";
                            objProduct.Picture = "";
                            objProduct.InsertedDate = dtCNow;
                            db.ProductDetails.Add(objProduct);
                            db.SaveChanges();

                            id = Convert.ToInt32(objProduct.ProductId);
                            var variancelength = 0;
                            string[] varianttype1;
                            if (ProductImport[cnt].Varianttype == "" || ProductImport[cnt].Varianttype == null)
                            {
                                variancelength = 1;
                                varianttype1 = null;

                            }
                            else
                            {
                                variancelength = ProductImport[cnt].Varianttype.Split(',').Length;
                                varianttype1 = ProductImport[cnt].Varianttype.Split(',');
                            }

                            var MrpPrice = ProductImport[cnt].MRPPrice.Split(',');
                            var sellingPrice = ProductImport[cnt].SellingPrice.Split(',');
                            for (var i = 0; i < variancelength; i++)
                            {
                                ProductVariance objvariance = new ProductVariance();
                                objvariance.ProductId = id;
                                if (varianttype1 == null)
                                {
                                    objvariance.VarianceType = "";
                                }
                                else
                                {
                                    objvariance.VarianceType = Convert.ToString(varianttype1[i]);
                                }
                                objvariance.VariancePrice = Convert.ToInt32(MrpPrice[i]);
                                objvariance.sellingPrice = Convert.ToInt32(sellingPrice[i]);
                                objvariance.VarianceActive = 1;
                                objvariance.InsertedBy = 1;
                                objvariance.InsertedDate = dtCNow;

                                db.ProductVariances.Add(objvariance);
                                db.SaveChanges();

                                id1 = Convert.ToInt32(objvariance.ProductVarianceId);
                                ProductStock objStock = new ProductStock();
                                objStock.ProductId = id;
                                objStock.CompanyDetailId = companyid;
                                objStock.StockCount = 1000;
                                objStock.ProductVarianceId = id1;
                                db.ProductStocks.Add(objStock);
                                db.SaveChanges();
                            }




                        }
                        transaction.Commit();
                        return Ok("Success");


                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return Ok("Error");
                    }
                }

            }
            catch (Exception ex)
            {
                //transaction.Rollback();
                return Ok("Error");
            }
            // return Ok("Success");
        }


        //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
        //Before Importing the data validation process
        [HttpPost]
        [Route("api/Product/ImportProductvalidation")]
        public IHttpActionResult ImportProductvalidation(List<clInsertImportProduct> ProductImport, int companyid)
        {
            try
            {
                log.Debug("ImportProductvalidation");
                var context = new EcommerceEntities();

                string lscnt = ProductImport.Count.ToString();
                string duplicatenos = string.Empty;
                try
                {
                    for (int cnt = 0; cnt < ProductImport.Count; cnt++)
                    {

                        if (cnt == 0)
                        {

                            if (ProductImport[cnt].CategoryName == null && ProductImport[cnt].SubcategoryName == null
                               && ProductImport[cnt].BrandType == null && ProductImport[cnt].ProductType == null
                               && ProductImport[cnt].ProductTitle == null
                               && ProductImport[cnt].Varianttype == null
                                && ProductImport[cnt].MRPPrice == null
                               && ProductImport[cnt].SellingPrice == null && ProductImport[cnt].Description == null

                               )
                            {
                                return Ok("Product Import Template is Wrong");
                            }
                        }

                        //(OR) 1st row Datas Should not be Empty

                        //Category Name Empty Validation
                        if (ProductImport[cnt].CategoryName == null || ProductImport[cnt].CategoryName.ToString().Trim() == string.Empty)
                        {

                            return Ok("Category Name Data Row " + (cnt + 1) + " Should not be Empty.");
                        }

                        //Category Name db chk Validation
                        if (ProductImport[cnt].CategoryName != null && ProductImport[cnt].CategoryName != "" && ProductImport[cnt].CategoryName != string.Empty)
                        {
                            var Cat = ProductImport[cnt].CategoryName.Trim().ToLower();
                            var Catid = Convert.ToString(Cat);
                            var Categoryid = db.Categories.FirstOrDefault(x => x.CategoyName.ToLower().Replace(" ", "") == Catid.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid);
                            if (Categoryid != null)
                            {
                            }
                            else
                            {
                                return Ok("Category Name Data Row " + (cnt + 1) + " Is Not Found.");
                            }
                        }

                        // Subcategory Name Empty Validation
                        if (ProductImport[cnt].SubcategoryName == null || ProductImport[cnt].SubcategoryName.ToString().Trim() == string.Empty)
                        {

                            return Ok("Subcategory Name Data Row " + (cnt + 1) + " Should not be Empty.");
                        }

                        //Subcategory Name db chk Validation
                        var vSubcategoryName = ((ProductImport[cnt].SubcategoryName == null ? "" : ProductImport[cnt].SubcategoryName));
                        if (vSubcategoryName != "")
                        {
                            var Subcat = ProductImport[cnt].SubcategoryName.Trim().ToLower();
                            var Subcatid = Convert.ToString(Subcat);
                            var SubCategoryid = db.SubCategories.FirstOrDefault(x => x.SubCategoryName.ToLower().Replace(" ", "") == Subcatid.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid);
                            if (SubCategoryid != null)
                            {
                            }
                            else
                            {
                                return Ok("Subcategory Name Data Row " + (cnt + 1) + " Is Not Found.");
                            }
                        }

                        //Department Name Empty Validation
                        if (ProductImport[cnt].BrandType == null || ProductImport[cnt].BrandType.ToString().Trim() == string.Empty)
                        {

                            return Ok("Brand Type Data Row " + (cnt + 1) + " Should not be Empty.");
                        }
                        //Brand Type db chk Validation
                        if (ProductImport[cnt].BrandType != null && ProductImport[cnt].BrandType != "" && ProductImport[cnt].BrandType != string.Empty)
                        {
                            var Brand = ProductImport[cnt].BrandType.Trim().ToLower();
                            var Brandid = Convert.ToString(Brand);
                            var Brandidchk = db.BrandTypes.FirstOrDefault(x => x.BrandTypeName.ToLower().Replace(" ", "") == Brandid.ToLower().Replace(" ", "") && x.CompanyDetailId == companyid);
                            if (Brandidchk != null)
                            {
                            }
                            else
                            {
                                return Ok("Brand Type Data Row " + (cnt + 1) + " Is Not Found.");
                            }
                        }


                        //Product Type  Empty Validation
                        if (ProductImport[cnt].ProductType == null || ProductImport[cnt].ProductType.ToString().Trim() == string.Empty)
                        {

                            return Ok("Product Type Data Row " + (cnt + 1) + " Should not be Empty.");
                        }

                        //Product Title  Empty Validation
                        if (ProductImport[cnt].ProductTitle == null || ProductImport[cnt].ProductTitle.ToString().Trim() == string.Empty)
                        {

                            return Ok("Product Title Data Row " + (cnt + 1) + " Should not be Empty.");
                        }


                        //Product Title db chk Validation
                        if (ProductImport[cnt].ProductTitle != null || ProductImport[cnt].ProductTitle.ToString().Trim() != string.Empty)
                        {

                            var vProductTitle = Convert.ToString(ProductImport[cnt].ProductTitle);

                            var aadharnoChk = db.ProductDetails.FirstOrDefault(x => x.Title == vProductTitle && x.CompanyDetailId == companyid);

                            if (aadharnoChk != null)
                            {

                                return Ok("Product Title Data Row " + (cnt + 1) + " Is Already Exist.");
                            }
                            else
                            {

                            }

                        }

                        int varianttypelength = 0;
                        //Product Varianttype  Empty Validation
                        if (ProductImport[cnt].Varianttype == null || ProductImport[cnt].Varianttype.ToString().Trim() == string.Empty)
                        {
                            varianttypelength = 1;
                            //return Ok("Product Variant Type Data Row " + (cnt + 1) + " Should not be Empty.");
                        }
                        else
                        {
                            varianttypelength = ProductImport[cnt].Varianttype.Split(',').Length;
                        }

                        //     var varianttypelength = ProductImport[cnt].Varianttype.Split(',').Length;

                        //Product MRPPrice  Empty Validation
                        if (ProductImport[cnt].MRPPrice == null || ProductImport[cnt].MRPPrice.ToString().Trim() == string.Empty)
                        {

                            return Ok("MRP Price Data Row " + (cnt + 1) + " Should not be Empty.");
                        }
                        var mrppricelength = ProductImport[cnt].MRPPrice.Split(',').Length;
                        if (varianttypelength != mrppricelength)
                        {
                            return Ok("Product Variant Type and MRP Price Data Row " + (cnt + 1) + " Should not be Match.");
                        }
                        //Product SellingPrice  Empty Validation
                        if (ProductImport[cnt].SellingPrice == null || ProductImport[cnt].SellingPrice.ToString().Trim() == string.Empty)
                        {

                            return Ok("Product Selling Price Data Row " + (cnt + 1) + " Should not be Empty.");
                        }
                        var sellinglength = ProductImport[cnt].SellingPrice.Split(',').Length;
                        if (varianttypelength != sellinglength)
                        {
                            return Ok("Product Variant Type and MRP Price Data Row " + (cnt + 1) + " Should not be Match.");
                        }
                        //Product Title  Empty Validation
                        if (ProductImport[cnt].Description == null || ProductImport[cnt].Description.ToString().Trim() == string.Empty)
                        {

                            //return Ok("Product Description Data Row " + (cnt + 1) + " Should not be Empty.");
                        }


                    }

                    if (duplicatenos != string.Empty)
                    {
                        return Ok("duplicate|" + duplicatenos);
                    }
                    else
                    {
                        return Ok("Success");
                    }
                }
                catch (Exception ex)
                {
                    return Ok("Error");
                }


            }
            catch (Exception ex)
            {
                string register = ex.ToString();
                return Ok("Error");
            }
        }


        //Date: 05 / 05 / 2020 Developer Name: Hemanth Task: Bulk Upload Import Option
        // After the import is completed get and bind the data in grid
        //[HttpGet]
        //[Route("api/Product/GetImportProduct")]
        //public IEnumerable GetImportProduct(int companyid)
        //{
        //    try
        //    {
        //        log.Debug("GetImportProduct");

        //        int index = 1;
        //        var a = from p in db.Salesexecutives.AsEnumerable()
        //                join q in db.Agencies.AsEnumerable() on p.agencyid equals q.agencyid
        //                join r in db.departments.AsEnumerable() on p.departmentid equals r.departmentid
        //                join s in db.companyrolls.AsEnumerable() on p.companyrollid equals s.companyrollid
        //                where p.companyid == companyid
        //                orderby p.salesexecutiveid descending
        //                select new
        //                {

        //                    index = index++,
        //                    salesexecutivename = p.salesexecutivename,
        //                    agencyname = q.agencyname,
        //                    salesexecutivephoneno = p.salesexecutivephoneno,
        //                    departmentname = r.departmentname,
        //                    salesexecutivecity = p.salesexecutivecity,
        //                    rollname = s.rollname,
        //                    Approvestatus = (p.Approvalstatus == null || p.Approvalstatus == string.Empty) ? "Waiting" :
        //                            p.Approvalstatus == "R" ? "Rejected" :
        //                            p.Approvalstatus == "A" ? "Approved" : p.Approvalstatus == "J" ? "Joined" : "-",
        //                    salesexecutivestatus = p.salesexecutivestatus == "Y" ? "images/active.png" : "images/inactive.png",
        //                    salesexecutivestatus1 = p.salesexecutivestatus == "Y" ? "Active" : "Inactive",

        //                };

        //        return a;
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //        return null;
        //    }
        //}

        [HttpGet]
        [Route("api/ProductDetails/getProductVariance")]
        public IEnumerable getProductVariance(int ProductId, int CompanyId)
            {
            try
            {
               
                    var a = (from p in db.ProductVariances.AsEnumerable()
                             join q in db.ProductDetails on p.ProductId equals q.ProductId
                             where (p.ProductVarianceId == ProductId && p.CompanyDetailId == CompanyId && p.VarianceActive ==1)
                             select new 
                             {
                                 VarianceType = p.VarianceType,
                                 sellingPrice = p.sellingPrice,
                                 VariancePrice = p.VariancePrice,
                                 CompanyDetailId = p.CompanyDetailId,
                                 VarianceActive = p.VarianceActive,
                             
                                 q.Title,
                                 Tax = db.TaxDetails.AsEnumerable().Select(L => new
                                 {
                                     
                                     L.TaxDetailsId,
                                     L.Percentage,
                                     L.ProductId,
                                     L.IsActive,

                                 }).Where(m => m.ProductId == Convert.ToString(q.Title) && m.IsActive == 1),
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
        [Route("api/ProductDetails/getProductName")]
        public IEnumerable getProductName(string ProductId, int CompanyId)
        {
            try
            {

                var a = (from p in db.ProductDetails.AsEnumerable()
                         //join q in db.ProductDetails on p.ProductId equals q.ProductId
                         where (p.ProductId == Convert.ToInt32(ProductId) && p.CompanyDetailId == CompanyId)
                         select new
                         {
                             
                             CompanyDetailId = p.CompanyDetailId,
                            p.ProductId,
                             p.Title,
                         });
                return a;

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }

        }
        public class clInsertImportProduct
        {
            public string CategoryName { get;  set; }
            public string SubcategoryName { get;  set; }
            public string BrandType { get;  set; }
            public string ProductType { get;  set; }
            public string ProductTitle { get;  set; }
            public string Description { get;  set; }
            public string Varianttype { get;  set; }
            public string MRPPrice { get;  set; }
            public string SellingPrice { get;  set; }
        }
    }
}

























