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

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class ProductConfigurationController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        [HttpGet]
        [Route("api/ProductConfiguration/GetDiscountDetails")]
        public IEnumerable GetDiscountDetails(int TaxDetailsId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetDiscountDetails");
                var a = (from p in db.DiscountDetails.AsEnumerable()
                         where (p.ValidTo>=DateTime.Now && p.CompanyDetailId == CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = p.CompanyDetailId,
                             TaxDetailsId = p.DiscountDetailsId,
                             Description = p.Description,
                         });
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        //(Bind Grid)
        [HttpGet]
        [Route("api/ProductConfiguration/GetProductConfiguration")]
        public IEnumerable GetProductConfiguration(int CompanyId)
        {
            try
            {
                log.Debug("GetProductConfiguration");
                var no = 1;
                // var a = (from p in db.ProductDetails.AsEnumerable()



                var a = ((from p in db.ProductDetails
                          join q in db.SubCategories on p.SubCategoryId equals q.SubCategoryId
                          join r in db.Categories on q.CategoryId equals r.CategoryId
                          join s in db.DiscountDetails on p.DiscountDetailsId equals s.DiscountDetailsId
                          select new

                          {
                               sno = no+1,
                              p.Title,
                              r.CategoyName,
                              q.SubCategoryName,
                              Type = "Discount",
                              Des = s.Description,

                              Percentage = (decimal?)s.DiscountPercentage
                          }).Distinct()
           ).Union
           (
               (from p in db.ProductDetails
                join q in db.SubCategories on p.SubCategoryId equals q.SubCategoryId
                join r in db.Categories on q.CategoryId equals r.CategoryId
                join s in db.TaxDetails on p.TaxDetailsId equals s.TaxDetailsId
                select new
                {
                   sno = no +2,
                    p.Title,
                    r.CategoyName,
                    q.SubCategoryName,
                    Type = "Tax",
                    Des = s.Description,
                    Percentage = (decimal?)s.Percentage
                }).Distinct()

           ).Union
           (
               (from p in db.ProductDetails
                join q in db.SubCategories on p.SubCategoryId equals q.SubCategoryId
                join r in db.Categories on q.CategoryId equals r.CategoryId
                join s in db.CouponDetails on p.CouponId equals s.CouponId
                select new
                {
                    sno = no+1,
                    p.Title,
                    r.CategoyName,
                    q.SubCategoryName,
                    Type = "Copoun",
                    Des = s.Code,
                    Percentage = (decimal?)s.DiscountPercentage
                }).Distinct()
           );


                //join q in db.SubCategories.AsEnumerable() on p.SubCategoryId equals q.SubCategoryId
                //join n in db.Categories.AsEnumerable() on q.CategoryId equals n.CategoryId
                //  join r in db.TaxDetails.AsEnumerable() on p.TaxDetailsId equals r.TaxDetailsId
                //  join s in db.DiscountDetails.AsEnumerable() on p.DiscountDetailsId equals s.DiscountDetailsId
                //  join t in db.CouponDetails.AsEnumerable() on p.CouponId equals t.CouponId
                //where /*(p.IsActive == iActive) &&*/ (p.CompanyDetailId == CompanyId)
                //orderby p.ProductId descending
                //select new
                //{
                //    sno = no++,
                //    CompanyDetailId = p.CompanyDetailId,
                //    CategoyName = r.CategoyName,
                //    SubCategoryName = q.SubCategoryName,
                //    Title = p.Title

                //});
                return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpGet]
        [Route("api/ProductConfiguration/GetTaxDetails")]
        public IEnumerable<TaxDetail> GetTaxDetails(int TaxDetailsId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetTaxDetails");
                var a = (from p in db.TaxDetails.AsEnumerable()
                         where ((p.IsActive == 1) && (p.CompanyDetailId == CompanyDetailId))
                         select new TaxDetail
                         {
                             CompanyDetailId = p.CompanyDetailId,
                             TaxDetailsId = p.TaxDetailsId,
                             Description = p.Description,
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
        [Route("api/ProductConfiguration/GetCouponDetails")]
        public IEnumerable GetCouponDetails(int TaxDetailsId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetCouponDetails");
                var a = (from p in db.CouponDetails.AsEnumerable()
                         where (p.ValidTo>=DateTime.Now && p.CompanyDetailId == CompanyDetailId)

                         select new
                         {
                             CompanyDetailId = p.CompanyDetailId,
                             TaxDetailsId = p.CouponId,
                             Description = p.Description,
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
        [Route("api/ProductConfiguration/GetSubCategoryDetails")]
        public IEnumerable<SubCategory> GetSubCategorydetails(int CategoryId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSubCategoryDetails");
                var a = (from p in db.SubCategories.AsEnumerable()
                         where ((p.CategoryId == CategoryId) && (p.CompanyDetailId == CompanyDetailId))
                         select new SubCategory
                         {
                             CategoryId = p.CategoryId,
                             SubCategoryId = p.SubCategoryId,
                             CompanyDetailId = p.CompanyDetailId,
                             SubCategoryName = p.SubCategoryName,
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
        [Route("api/ProductConfiguration/GetCategoryDetails")]
        public IEnumerable<Category> GetCategorydetails(int CompanyDetailId)
        {
            try
            {
                log.Debug("GetCategoryDetails");
                var a = (from p in db.Categories.AsEnumerable()
                         where ((p.IsActive == 1) && (p.CompanyDetailId == CompanyDetailId))
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
        [Route("api/ProductConfiguration/GetProductdetails")]
        public IEnumerable GetProductdetails(int SubCategoryId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductdetails");
                var a = (from p in db.ProductDetails.AsEnumerable()
                         where ((p.SubCategoryId == SubCategoryId) && (p.CompanyDetailId == CompanyDetailId))
                         select new ProductDetail
                         {
                             SubCategoryId = p.SubCategoryId,
                             ProductId = p.ProductId,
                             Title = p.Title,
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
        [Route("api/ProductConfiguration/UpdateProductDetails")]
        public IHttpActionResult UpdateProductDetails(string ProductId, int TypeId, int selectedId, int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateProductDetails");
                var context = new EcommerceEntities();
                string[] strProdId = ProductId.Split('|');
                foreach (string strProductId in strProdId)
                {
                    var iProduct = Convert.ToInt32(strProductId);
                    var result = context.ProductDetails.First(p => p.ProductId == iProduct);
                    if (result != null)
                    {
                        if (TypeId == 1)
                        {
                            result.DiscountDetailsId = selectedId;
                            result.CompanyDetailId = CompanyDetailId;
                            context.SaveChanges();
                        }
                        else if (TypeId == 2)
                        {
                            result.TaxDetailsId = selectedId;
                            result.CompanyDetailId = CompanyDetailId;
                            context.SaveChanges();
                        }
                        else
                        {
                            result.CouponId = selectedId;
                            result.CompanyDetailId = CompanyDetailId;
                            context.SaveChanges();
                        }

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

        [HttpGet]
        [Route("api/ProductConfiguration/GetProductdetailusingSubcatId")]
        public IEnumerable GetProductdetailusingSubcatId(int CategoryId, int SubCategoryId, int ProductId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductdetailusingSubcatId");
                var a = (from s in db.SubCategories.AsEnumerable()
                         join r in db.ProductDetails.AsEnumerable() on s.SubCategoryId equals r.SubCategoryId
                         where (r.SubCategoryId == SubCategoryId && r.CompanyDetailId == CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = r.CompanyDetailId,
                             ProductId = r.ProductId,
                             Title = r.Title
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
        [Route("api/ProductConfiguration/GetProductdetailusingCatId")]
        public IEnumerable GetProductdetailusingCatId(int CategoryId, int SubCategoryId, int ProductId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductdetailusingCatId");
                var a = (from q in db.Categories.AsEnumerable()
                         join s in db.SubCategories.AsEnumerable() on q.CategoryId equals s.CategoryId
                         join r in db.ProductDetails.AsEnumerable() on s.SubCategoryId equals r.SubCategoryId
                         where (q.CategoryId == CategoryId && r.CompanyDetailId == CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = r.CompanyDetailId,
                             ProductId = r.ProductId,
                             Title = r.Title
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
        [Route("api/ProductConfiguration/GetProductdetailusingProdId")]
        public IEnumerable GetProductdetailusingProdId(int CategoryId, int SubCategoryId, int ProductId, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductdetailusingProdId");
                var a = (from r in db.ProductDetails.AsEnumerable()
                         where (r.ProductId == ProductId && r.CompanyDetailId == CompanyDetailId)
                         select new
                         {
                             CompanyDetailId = r.CompanyDetailId,
                             ProductId = r.ProductId,
                             Title = r.Title
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
        [Route("api/ProductConfiguration/GetProductConfigSearch")]
        public IEnumerable GetProductConfigSearch(string Search, int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductConfigSearch");
                //var no = 1;
                // var a = (from p in db.ProductDetails.AsEnumerable()



                var a = ((from p in db.ProductDetails
                          join q in db.SubCategories on p.SubCategoryId equals q.SubCategoryId
                          join r in db.Categories on q.CategoryId equals r.CategoryId
                          join s in db.DiscountDetails on p.DiscountDetailsId equals s.DiscountDetailsId
                          where p.Title.ToString().Contains(Search.ToLower()) || r.CategoyName.ToString().Contains(Search.ToLower()) || q.SubCategoryName.ToString().Contains(Search.ToString()) || s.Description.ToString().Contains(Search.ToString()) && p.CompanyDetailId == CompanyDetailId
                          select new

                          {

                              p.Title,
                              r.CategoyName,
                              q.SubCategoryName,
                              Type = "Discount",
                              Des = s.Description,

                              Percentage = (decimal?)s.DiscountPercentage
                          }).Distinct()
            ).Union
            (
                (from p in db.ProductDetails
                 join q in db.SubCategories on p.SubCategoryId equals q.SubCategoryId
                 join r in db.Categories on q.CategoryId equals r.CategoryId
                 join s in db.TaxDetails on p.TaxDetailsId equals s.TaxDetailsId
                 where p.Title.ToString().Contains(Search.ToLower()) || r.CategoyName.ToString().Contains(Search.ToLower()) || q.SubCategoryName.ToString().Contains(Search.ToString()) || s.Description.ToString().Contains(Search.ToString()) || s.Percentage.ToString().Contains(Search.ToString()) && p.CompanyDetailId == CompanyDetailId
                 select new
                 {

                     p.Title,
                     r.CategoyName,
                     q.SubCategoryName,
                     Type = "Tax",
                     Des = s.Description,
                     Percentage = (decimal?)s.Percentage
                 }).Distinct()

            ).Union
            (
                (from p in db.ProductDetails
                 join q in db.SubCategories on p.SubCategoryId equals q.SubCategoryId
                 join r in db.Categories on q.CategoryId equals r.CategoryId
                 join s in db.CouponDetails on p.CouponId equals s.CouponId
                 where p.Title.ToString().Contains(Search.ToLower()) || r.CategoyName.ToString().Contains(Search.ToLower()) || q.SubCategoryName.ToString().Contains(Search.ToString()) || s.Code.ToString().Contains(Search.ToString()) || s.DiscountPercentage.ToString().Contains(Search.ToString()) && p.CompanyDetailId == CompanyDetailId
                 select new
                 {
                     p.Title,
                     r.CategoyName,
                     q.SubCategoryName,
                     Type = "Copoun",
                     Des = s.Code,
                     Percentage = (decimal?)s.DiscountPercentage
                 }).Distinct()
            );



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

