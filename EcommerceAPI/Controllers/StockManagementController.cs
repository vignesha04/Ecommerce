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
    [EnableCors("*", "*", "GET,POST")]
    public class StockManagementController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();
        [HttpGet]
        [Route("api/ProductStock/GetCategoryDetails")]
        public IEnumerable<Category> GetCategorydetails( int CompanyDetailId)
        {
            try
            {
                log.Debug("GetCategoryDetails");
                var a = (from p in db.Categories.AsEnumerable()
                     where ((p.IsActive == 1) &&(p.CompanyDetailId== CompanyDetailId))
                     select new Category
                     {
                         CompanyDetailId=p.CompanyDetailId,
                         CategoryId = p.CategoryId,
                         CategoyName = p.CategoyName,
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
        [Route("api/ProductStock/GetSubCategoryDetails")]
        public IEnumerable<SubCategory> GetSubCategorydetails(int CategoryId , int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSubCategoryDetails");
                var a = (from p in db.SubCategories.AsEnumerable()
                     where p.CategoryId == CategoryId
                     where p.IsActive == 1
                     where p.CompanyDetailId== CompanyDetailId
                         select new SubCategory
                     {
                             CompanyDetailId=p.CompanyDetailId,
                         CategoryId = p.CategoryId,
                         SubCategoryId = p.SubCategoryId,
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
        [Route("api/ProductStock/GetProductDetails")]
        public IEnumerable GetProductDetails(int SubCategoryId , int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductDetails");
                var a = (from p in db.ProductDetails.AsEnumerable()
                     where ((p.SubCategoryId == SubCategoryId)&&(p.CompanyDetailId== CompanyDetailId))
                     select new 
                     {
                         CompanyDetailId=p.CompanyDetailId,
                         SubCategoryId = p.SubCategoryId,
                         ProductId = p.ProductId,
                         Title = p.Title
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
        [Route("api/ProductStock/GetProductStocks")]
        public IEnumerable GetProductStocks(int ProductvarianceId)
        {
            try
            {
                log.Debug("GetProductStocks");
                var a = (from p in db.ProductStocks.AsEnumerable()
                     where (p.ProductVarianceId == ProductvarianceId)
                     orderby p.StockId descending
                     select new 
                     {
                         CompanyDetailId=p.CompanyDetailId,
                         StockId=p.StockId,
                         ProductVarianceId = p.ProductVarianceId,
                         ProductId = p.ProductId,
                         StockCount = p.StockCount,
                         ShowToUser=p.ShowToUser,
                         ShowIfNoStock= p.ShowIfNoStock
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
        [Route("api/ProductStock/GetProductvariancedetails")]
        public IEnumerable GetProductvariancedetails(int ProductId)
        {
            try
            {
                log.Debug("GetProductvariancedetails");
                var a = (from p in db.ProductVariances.AsEnumerable()
                     where (p.ProductId == ProductId)
                     orderby p.ProductVarianceId descending
                     select new 
                     {
                         p.ProductVarianceId,
                         p.ProductId,
                         p.VarianceType,
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
        [Route("api/ProductStock/GetProductInStock")]
        public IEnumerable GetProductInStock( int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductInStock");
                var no = 1;
                var a = (from k in db.ProductStocks.AsEnumerable()
                     join p in db.ProductVariances.AsEnumerable() on k.ProductVarianceId equals p.ProductVarianceId
                     join l in db.ProductDetails.AsEnumerable() on k.ProductId equals l.ProductId
                     join m in db.SubCategories.AsEnumerable() on l.SubCategoryId equals m.SubCategoryId
                     join n in db.Categories.AsEnumerable() on m.CategoryId equals n.CategoryId
                     
                     orderby k.StockId descending
                     where (k.StockCount > 0)
                     select new
                     {
                         sno = no++,
                         CompanyDetailId=k.CompanyDetailId,
                         StockId = k.StockId,
                         StockCount = k.StockCount,
                         Title = l.Title,
                         SubCategoryName = m.SubCategoryName,
                         CategoyName = n.CategoyName,
                         p.ProductVarianceId,
                         p.VariancePrice,
                         p.VarianceType,
                         p.sellingPrice
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
        [Route("api/ProductStock/GetProductOutStock")]
        public IEnumerable GetProductOutStock(int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductOutStock");
                var no = 1;
                var a = (from k in db.ProductStocks.AsEnumerable()
                         join p in db.ProductVariances.AsEnumerable() on k.ProductVarianceId equals p.ProductVarianceId
                         join l in db.ProductDetails.AsEnumerable() on k.ProductId equals l.ProductId
                         join m in db.SubCategories.AsEnumerable() on l.SubCategoryId equals m.SubCategoryId
                         join n in db.Categories.AsEnumerable() on m.CategoryId equals n.CategoryId

                         orderby k.StockId descending
                         where (k.StockCount <= 0)
                         select new
                         {
                             sno = no++,
                             CompanyDetailId = k.CompanyDetailId,
                             StockId = k.StockId,
                             StockCount = k.StockCount,
                             Title = l.Title,
                             SubCategoryName = m.SubCategoryName,
                             CategoyName = n.CategoyName,
                             p.ProductVarianceId,
                             p.VariancePrice,
                             p.VarianceType,
                             p.sellingPrice
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
        [Route("api/ProductStock/InsertProductStocks")]
        public IHttpActionResult InsertProductStocks([FromBody]JObject jsonString,int CompanyDetailId)
        {
            try
            {
                log.Debug("InsertProductStocks");
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clInsertProductStocks objjson = JsonConvert.DeserializeObject<clInsertProductStocks>(json);
                var context = new EcommerceEntities();
                ProductStock obj = new ProductStock();
                obj.CompanyDetailId = CompanyDetailId;
                obj.ProductVarianceId = objjson.ProductVarianceId;
                obj.ProductId = objjson.ProductId;
                obj.StockCount = objjson.StockCount;
                obj.ShowToUser = objjson.ShowToUser;
                obj.ShowIfNoStock = objjson.ShowIfNoStock;
                
                var ProductExist = db.ProductStocks.Any(x => x.ProductVarianceId == obj.ProductVarianceId);
                if (ProductExist)
                {
                    return Ok("Exist");
                }
                else
                {
                    context.ProductStocks.Add(obj);
                    context.SaveChanges();
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
        [Route("api/ProductStock/GetSearch")]
        public IEnumerable GetSearch(string Search ,int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSearch");
                var vsno = 0;
            var a = (from k in db.ProductStocks.AsEnumerable()
                     join l in db.ProductDetails.AsEnumerable() on k.ProductId equals l.ProductId
                     join m in db.SubCategories.AsEnumerable() on l.SubCategoryId equals m.SubCategoryId
                     join n in db.Categories.AsEnumerable() on m.CategoryId equals n.CategoryId
                     where (k.StockCount.ToString().Contains(Search.ToString()) || l.Title.ToLower().Contains(Search.ToLower()) || m.SubCategoryName.ToLower().Contains(Search.ToLower()) || n.CategoyName.ToLower().Contains(Search.ToLower()))
                     orderby k.StockId descending
                     select new
                     {

                         sno = ++vsno,
                         CompanyDetailId =k.CompanyDetailId,
                         StockId = k.StockId,
                         StockCount = k.StockCount,
                         Title = l.Title,
                         SubCategoryName = m.SubCategoryName,
                         CategoyName = n.CategoyName

                     });
            return a;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        public class clInsertProductStocks
        {
            public int ProductId;
            public int StockCount;
            public String ShowToUser;
            public String ShowIfNoStock;
            public long? CompanyDetailId { get; set; }
            public long? ProductVarianceId { get; set; }
        }
        //EDIT
        [HttpGet]
        [Route("api/ProductStock/GetProductStockAdminbyId")]
        public IEnumerable GetProductStockAdminbyId(int StockId,int CompanyDetailId)
        {
            try
            {
                log.Debug("GetProductStockAdminbyId");
                var a = (from p in db.ProductStocks.AsEnumerable()
                     join q in db.ProductVariances.AsEnumerable() on p.ProductVarianceId equals q.ProductVarianceId
                     join l in db.ProductDetails.AsEnumerable() on p.ProductId equals l.ProductId
                     join m in db.SubCategories.AsEnumerable() on l.SubCategoryId equals m.SubCategoryId
                     join n in db.Categories.AsEnumerable() on m.CategoryId equals n.CategoryId
                     where (p.StockId == StockId)
                     orderby p.StockId descending
                     select new
                     {
                         CompanyDetailId=p.CompanyDetailId,
                         StockId = p.StockId,
                         StockCount = p.StockCount,
                         Title = l.Title,
                         SubCategoryId = m.SubCategoryId,
                         SubCategoryName = m.SubCategoryName,
                         CategoryId = n.CategoryId,
                         CategoyName = n.CategoyName,
                         ProductId = p.ProductId,
                         ShowToUser= p.ShowToUser,
                         ShowIfNoStock=p.ShowIfNoStock,
                         ProductVarianceId = q.ProductVarianceId,
                         VariancePrice = q.VariancePrice,
                         sellingPrice = q.sellingPrice,
                         VarianceType = q.VarianceType,
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
        [Route("api/ProductStock/UpdateProductStock")]
        public IHttpActionResult UpdateProductStock([FromBody]ProductStock UpdateProductStock, int StockId ,int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateProductStock");
                var context = new EcommerceEntities();
                var result = context.ProductStocks.First(p => p.StockId == StockId);
                if (result != null)
                {
                    result.StockId = StockId;
                    result.CompanyDetailId = CompanyDetailId;
                    result.ProductId = UpdateProductStock.ProductId;
                    result.StockCount = UpdateProductStock.StockCount;
                    result.ShowIfNoStock = UpdateProductStock.ShowIfNoStock;
                    result.ShowToUser = UpdateProductStock.ShowToUser;
                    result.ProductVarianceId = UpdateProductStock.ProductVarianceId;
                }
                context.SaveChanges();
                var vvariantId = result.ProductVarianceId;

                //var vresult = db.ProductVariances.First(x => x.ProductVarianceId == vvariantId);
                //if (vresult != null)
                //{
                //    vresult.VariancePrice = varianceprice;
                //    vresult.sellingPrice = sellingprice;
                //    db.SaveChanges();
                //}
                return Ok();

            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
    }
}

    
