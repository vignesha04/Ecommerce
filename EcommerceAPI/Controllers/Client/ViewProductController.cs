using EcommerceAPI.Models;
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
    public class ViewProductController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        public string proID { get;  set; }

        [HttpGet]
        [Route("api/ProductList/GetProductList")]
        public IEnumerable GetTrendingItems(int SubCategoryId)
        {
            try
            {
                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()

                                     where p.IsActive == 1 && p.SubCategoryId == SubCategoryId
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         //TaxDetailsId = p.TaxDetailsId,
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.ProductVarianceId,
                                             t.VarianceType,
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             Discountamt = (t.VariancePrice - t.sellingPrice)
                                         }),
                                         sellingprice = db.ProductVariances.Where(X => X.ProductId == p.ProductId).Take(1).Select(X => X.sellingPrice).FirstOrDefault(),
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0,
                                         TaxDetailsId = db.TaxDetails.AsEnumerable().Select(s => new
                                         {
                                             ProductId = Convert.ToString(s.ProductId),
                                             s.TaxDetailsId,
                                             s.IsActive,
                                             //s.Percentage
                                             Percentage = s.Percentage != null ? Convert.ToString(s.Percentage) : "0",

                                         }).Where(m => m.ProductId == p.Title && m.IsActive ==1).Take(1)
                                     }).Distinct();

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
        [Route("api/ProductList/GetRelatedProductList")]
        public IEnumerable GetRelatedProductList(int SubCategoryId)
        {
            try
            {
                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()

                                     where p.IsActive == 1 && p.SubCategoryId == SubCategoryId
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         TaxDetailsId = p.TaxDetailsId,
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.ProductVarianceId,
                                             t.VarianceType,
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             Discountamt = (t.VariancePrice - t.sellingPrice)
                                         }),
                                         sellingprice = db.ProductVariances.Where(X => X.ProductId == p.ProductId).Take(1).Select(X => X.sellingPrice).FirstOrDefault(),
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0
                                     }).Distinct().Take(5);

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
        [Route("api/ProductList/GetSearchProductList")]
        public IEnumerable GetSearchProductList(string strSearchText)
        {
            try
            {

                var TrendingItems = (from n in db.Categories.AsEnumerable()
                                     join o in db.SubCategories.AsEnumerable() on n.CategoryId equals o.CategoryId
                                     join p in db.ProductDetails.AsEnumerable() on o.SubCategoryId equals p.SubCategoryId

                                     where p.IsActive == 1 && (n.CategoyName.ToLower().Contains(strSearchText.Trim().ToLower()) || o.SubCategoryName.ToLower().Contains(strSearchText.Trim().ToLower()) || p.Title.ToLower().Contains(strSearchText.Trim().ToLower()))

                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         TaxDetailsId = db.TaxDetails.Where(x => x.ProductId == p.Title && x.IsActive == 1).Take(1)
                                                       .Select(x => x.Percentage).FirstOrDefault(),
                                         //proID = Convert.ToString(p.ProductId),
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,


                                         //TaxDetailsId = db.TaxDetails.AsEnumerable().Select(s => new
                                         //{
                                         //    ProductId = Convert.ToString(s.ProductId),
                                         //    s.TaxDetailsId,
                                         //    s.IsActive,
                                         //    s.Percentage
                                         //}).Where(m => m.ProductId == p.Title && m.IsActive ==1).Take(1),


                                         //TaxDetailsId = p.TaxDetailsId,
                                         // TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.ProductVarianceId,
                                             t.sellingPrice,
                                             t.VarianceType,
                                             Discountamt = (t.VariancePrice - t.sellingPrice)
                                         }).Take(1) : null,
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0
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
        [Route("api/ProductList/GetNewItems")]
        public IEnumerable GetNewItems()
        {
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
                                         s.ImageURL
                                     }).Take(1),
                                     TaxDetailsId = p.TaxDetailsId,
                                     TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                     p.Variance,
                                     showVariance = p.Variance == 1 ? "none" : "block"
                                 }).Take(5);

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/ProductList/GetSubCategoryList")]
        public IEnumerable GetSubCategoryList()
        {
            var TrendingItems = (from s in db.SubCategories.AsEnumerable()
                                 where s.IsActive == 1
                                 orderby s.SubCategoryName ascending
                                 select new
                                 {
                                     SubCategoryName = s.SubCategoryName,
                                     SubCategoryId = s.SubCategoryId
                                 });

            return TrendingItems;
        }

        [HttpGet]
        [Route("api/ProductList/GetCategoryNameForRoot")]
        public IEnumerable GetCategoryNameForRoot(int SubCategoryId)
        {
            var TrendingItems = (from s in db.SubCategories.AsEnumerable()
                                 join t in db.Categories.AsEnumerable() on s.CategoryId equals t.CategoryId
                                 where s.IsActive == 1 && s.SubCategoryId== SubCategoryId
                                 select new
                                 {
                                     CategoyName = t.CategoyName,
                                     SubCategoryName = s.SubCategoryName
                                 });

            return TrendingItems;
        }
        [HttpGet]
        [Route("api/ProductList/GetPriceFilterProductList")]
        public IEnumerable GetPriceFilterProductList(int SubCategoryId, int minPrice, int maxPrice)
        {
            try
            {
                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()
                                     join q in db.ProductVariances.AsEnumerable() on p.ProductId equals q.ProductId
                                     where (p.IsActive == 1 && p.SubCategoryId == SubCategoryId
                                     //&& (Convert.ToDecimal(p.Price) + (Convert.ToDecimal(p.Price) * (p.TaxDetailsId != null ? Convert.ToDecimal(p.TaxDetail.Percentage) : 0) / 100)) >= Convert.ToDecimal(minPrice) && (Convert.ToDecimal(p.Price) + (Convert.ToDecimal(p.Price) * (p.TaxDetailsId != null ? Convert.ToDecimal(p.TaxDetail.Percentage) : 0) / 100)) <= Convert.ToDecimal(maxPrice))
                                     //&& (Convert.ToDecimal(q.sellingPrice) - (Convert.ToDecimal(q.sellingPrice) * (p.DiscountDetailsId != null ? Convert.ToDecimal(p.DiscountDetail.DiscountPercentage) : 0) / 100)) >= Convert.ToDecimal(minPrice) && (Convert.ToDecimal(q.sellingPrice) - (Convert.ToDecimal(q.sellingPrice) * (p.DiscountDetailsId != null ? Convert.ToDecimal(p.DiscountDetail.DiscountPercentage) : 0) / 100)) <= Convert.ToDecimal(maxPrice))
                                     && (Convert.ToDecimal(q.sellingPrice) >= Convert.ToDecimal(minPrice)) && (Convert.ToDecimal(q.sellingPrice) <= Convert.ToDecimal(maxPrice)))
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         TaxDetailsId = p.TaxDetailsId,
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             t.VarianceType
                                         }).Take(1) : null,
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0

                                     }).Distinct();
                //TrendingItems.Where(c => c.ProdAmount <= maxPrice && c.ProdAmount >= minPrice).AsEnumerable();
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
        [Route("api/ProductList/GetFilterSearch")]
        public IEnumerable GetFilterSearch(string strFilterSearchText, int SubCategoryId)
        {
            try
            {
                var TrendingItems = (from p in db.ProductDetails.AsEnumerable()

                                     where ((p.Title.ToLower().Contains(strFilterSearchText.Trim().ToLower())) && (p.SubCategoryId == SubCategoryId) && (p.IsActive == 1))
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         TaxDetailsId = p.TaxDetailsId,
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             t.VarianceType
                                         }).Take(1) : null,
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0
                                     });

                return TrendingItems;
                //var a = (from p in db.SubCategories.AsEnumerable()
                //         join s in db.Categories.AsEnumerable() on p.CategoryId equals s.CategoryId
                //         where (p.SubCategoryName.ToLower().Contains(strFilterSearchText.Trim().ToLower()))
                //         orderby p.SubCategoryId descending
                //         select new
                //         {
                //             CategoyName = s.CategoyName,
                //             SubCategoryId = p.SubCategoryId,
                //             SubCategoryName = p.SubCategoryName
                //         });
                //return a;
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
        [Route("api/ProductList/GetSearchProdPriceList")]
        public IEnumerable GetSearchProdPriceList(string strFilterSearchText, string strSearchText)
        {
            try
            {
                var TrendingItems = (from n in db.Categories.AsEnumerable()
                                     join o in db.SubCategories.AsEnumerable() on n.CategoryId equals o.CategoryId
                                     join p in db.ProductDetails.AsEnumerable() on o.SubCategoryId equals p.SubCategoryId

                                     where p.IsActive == 1 && (n.CategoyName.ToLower().Contains(strSearchText.Trim().ToLower()) || o.SubCategoryName.ToLower().Contains(strSearchText.Trim().ToLower()) || p.Title.ToLower().Contains(strSearchText.Trim().ToLower())) &&
                                     (p.Title.ToLower().Contains(strFilterSearchText.Trim().ToLower()))



                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         //TaxDetailsId = p.TaxDetailsId,
                                         TaxDetailsId = db.TaxDetails.Where(x => x.ProductId == p.Title && x.IsActive == 1).Take(1)
                                                       .Select(x => x.Percentage).FirstOrDefault(),
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             t.VarianceType
                                         }).Take(1) : null,
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0
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
        [Route("api/ProductList/GetPriceFilterList")]
        public IEnumerable GetPriceFilterList(int minPrice, int maxPrice, string strSearchText)
        {
            try
            {
                var TrendingItems = (from n in db.Categories.AsEnumerable()
                                     join o in db.SubCategories.AsEnumerable() on n.CategoryId equals o.CategoryId
                                     join p in db.ProductDetails.AsEnumerable() on o.SubCategoryId equals p.SubCategoryId
                                     join q in db.ProductVariances.AsEnumerable() on p.ProductId equals q.ProductId
                                     where p.IsActive == 1 && (n.CategoyName.ToLower().Contains(strSearchText.Trim().ToLower()) || o.SubCategoryName.ToLower().Contains(strSearchText.Trim().ToLower()) || p.Title.ToLower().Contains(strSearchText.Trim().ToLower())) &&
                                      //((Convert.ToDecimal(p.Price) + (Convert.ToDecimal(p.Price) * (p.TaxDetailsId != null ? Convert.ToDecimal(p.TaxDetail.Percentage) : 0) / 100)) >= Convert.ToDecimal(minPrice) && (Convert.ToDecimal(p.Price) + (Convert.ToDecimal(p.Price) * (p.TaxDetailsId != null ? Convert.ToDecimal(p.TaxDetail.Percentage) : 0) / 100)) <= Convert.ToDecimal(maxPrice))
                                      // ((Convert.ToDecimal(q.sellingPrice) - (Convert.ToDecimal(q.sellingPrice) * (p.DiscountDetailsId != null ? Convert.ToDecimal(p.DiscountDetail.DiscountPercentage) : 0) / 100)) >= Convert.ToDecimal(minPrice) && (Convert.ToDecimal(q.sellingPrice) - (Convert.ToDecimal(q.sellingPrice) * (p.DiscountDetailsId != null ? Convert.ToDecimal(p.DiscountDetail.DiscountPercentage) : 0) / 100)) <= Convert.ToDecimal(maxPrice))
                                      ((Convert.ToDecimal(q.sellingPrice)) >= Convert.ToDecimal(minPrice) && (Convert.ToDecimal(q.sellingPrice)) <= Convert.ToDecimal(maxPrice))
                                     orderby p.Title ascending
                                     select new
                                     {
                                         Title = p.Title,
                                         Price = p.Price,
                                         Picture = p.Picture,
                                         ProductId = p.ProductId,
                                         Image1 = p.ProductImages.AsEnumerable().Select(s => new
                                         {
                                             s.ProductId,
                                             s.ImageURL,
                                             s.ProductImageId,
                                             s.productvarinceid
                                         }).Where(m => m.ImageURL != "" && m.productvarinceid == null).OrderBy(c => c.ProductImageId).Take(1),
                                         Image2 = p.ProductImages.AsEnumerable().Select
                                         (t => new
                                         {
                                             t.ProductId,
                                             t.ImageURL,
                                             t.ProductImageId
                                         }).Where(n => n.ImageURL != "").OrderByDescending(d => d.ProductImageId).Take(1),
                                         DiscountDetailsId = p.DiscountDetailsId,
                                         CouponId = p.CouponId,
                                         TaxDetailsId = p.TaxDetailsId,
                                         TaxPercentage = p.TaxDetailsId != null ? Convert.ToString(p.TaxDetail.Percentage) : "0",
                                         p.Variance,
                                         showVariance = p.Variance == 1 ? "none" : "block",
                                         ProdVariance = p.Variance == 1 ? p.ProductVariances.AsEnumerable().Select(t => new
                                         {
                                             t.VariancePrice,
                                             t.sellingPrice,
                                             t.VarianceType
                                         }).Take(1) : null,
                                         Discount = p.DiscountDetailsId != null ? p.DiscountDetail.DiscountPercentage : 0

                                     }).Distinct();
                //TrendingItems.Where(c => c.ProdAmount <= maxPrice && c.ProdAmount >= minPrice).AsEnumerable();
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

    }
}
