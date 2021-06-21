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
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class HomePageConfigurationController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");

        [HttpGet]
        [Route("api/HomePageSetting/")]
        public IEnumerable<HomePageSetting> Get()
        {
            return db.HomePageSettings.ToList();
        }

        [HttpGet]
        [Route("api/HomePageSetting/GetHomePageDetails")]
        public IEnumerable GetHomePageDetails(int CompanyId)
        {
            try
            {
                log.Debug("GetHomePageDetails");
                var a = (from p in db.HomePageSettings.AsEnumerable()
                         where p.CompanyDetailId==CompanyId
                         select new
                         {
                             HomePageSettingsId = p.HomePageSettingsId,
                             ShowSlider = p.ShowSlider,
                             ShowTrendingItems = p.ShowTrendingItems,
                             ShowNewItems = p.ShowNewItems,
                             DisplayBannerImages = p.DisplayBannerImages,
                             ShowAdvertisement = p.ShowAdvertisement,
                             CompanyDetailId=p.CompanyDetailId
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
        [Route("api/HomePageSetting/GetHomeSliderImage")]
        public IEnumerable<HomeSliderImage> GetHomeSliderImage(int CompanyId)
        {
            try
            {
                log.Debug("GetHomeSliderImage");
                var a = (from p in db.HomeSliderImages.AsEnumerable()
                         where p.CompanyDetailId==CompanyId
                         select new HomeSliderImage
                         {
                             HomeSliderImageId = p.HomeSliderImageId,
                             HomePageSettingsId = p.HomePageSettingsId,
                             ImageUrl = p.ImageUrl,
                             CompanyDetailId=p.CompanyDetailId
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
        [Route("api/HomePageSetting/GetHomeBannerImage")]
        public IEnumerable<HomeBannerImage> GetHomeBannerImage(int CompanyId)
        {
            try
            {
                log.Debug("GetHomeBannerImage");
                var a = (from p in db.HomeBannerImages.AsEnumerable()
                         where p.CompanyDetailId==CompanyId
                         select new HomeBannerImage
                         {
                             HomeBannerImageId = p.HomeBannerImageId,
                             HomePageSettingsId = p.HomePageSettingsId,
                             BannerImageURL = p.BannerImageURL,
                             CompanyDetailId=p.CompanyDetailId
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
        [Route("api/HomePageSetting/InsertHomePageSetting")]
        public IHttpActionResult InsertHomePageSetting([FromBody]HomePageSetting homePage, int CompanyId)
        {
            try
            {
                log.Debug("InsertHomePageSetting");
                homePage.CompanyDetailId = CompanyId;
                db.HomePageSettings.Add(homePage);
                db.SaveChanges();

                int iId = Convert.ToInt32(homePage.HomePageSettingsId);

                return Ok(iId);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }


        [HttpPost]
        [Route("api/HomePageSetting/UpdateHomeSetting")]
        public IHttpActionResult UpdateHomeSetting([FromBody]HomePageSetting pageSetting, int homePageId, string Slider, string trending, string newItem, string banner, string adver, int CompanyId)
        {
            try
            {
                log.Debug("UpdateHomeSetting");
                var context = new EcommerceEntities();
                var result = context.HomePageSettings.First(p => p.HomePageSettingsId == homePageId && p.CompanyDetailId==CompanyId);

                if (result != null)
                {
                    result.ShowSlider = Slider;
                    result.ShowTrendingItems = trending;
                    result.ShowNewItems = newItem;
                    result.DisplayBannerImages = banner;
                    result.ShowAdvertisement = adver;
                    result.CompanyDetailId = CompanyId;
                    context.SaveChanges();
                }

                return Ok(homePageId);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/Fileupload/UploadSlideImages")]
        public IHttpActionResult UploadSlideImages(int iHomeSettingID, int CompanyId)
        {
            try
            {
                log.Debug("UploadSlideImages");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/HomepageSlider/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = "http://webapi.kasimedufishandmeat.in/";
                //var vUrl = "http://localhost:56397/";
                string modifiedfilename = string.Empty;
                //string strpath = string.Empty;
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
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));

                            HomeSliderImage InsertHomeSliderImage = new HomeSliderImage();
                            InsertHomeSliderImage.HomePageSettingsId = iHomeSettingID;
                            InsertHomeSliderImage.CompanyDetailId = CompanyId;
                            InsertHomeSliderImage.ImageUrl = vUrl + "/Uploads/HomepageSlider/" + modifiedfilename;
                            db.HomeSliderImages.Add(InsertHomeSliderImage);
                            db.SaveChanges();

                        }
                    }
                }

                var vURL = vUrl + "/Uploads/HomepageSlider/" + modifiedfilename;
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/Fileupload/UploadBannerImages")]
        public IHttpActionResult UploadBannerImages(int iHomeSettingID, int CompanyId)
        {
            try
            {
                log.Debug("UploadBannerImages");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/HomeBannerImages/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = "http://webapi.kasimedufishandmeat.in/";
                //var vUrl = "http://localhost:56397/";
                string modifiedfilename = string.Empty;

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
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));
                            HomeBannerImage insertbannerImage = new HomeBannerImage();
                            insertbannerImage.HomePageSettingsId = iHomeSettingID;
                            insertbannerImage.CompanyDetailId = CompanyId;
                            insertbannerImage.BannerImageURL = vUrl + "/Uploads/HomeBannerImages/" + modifiedfilename;
                            db.HomeBannerImages.Add(insertbannerImage);
                            db.SaveChanges();

                        }
                    }
                }
                var vURL = vUrl + "/Uploads/HomeBannerImages/" + modifiedfilename;
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/Fileupload/UpdateSlideImages")]
        public IHttpActionResult UpdateSlideImages(int ihomeSliderId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateSlideImages");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/HomepageSlider/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = "http://webapi.kasimedufishandmeat.in/";
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
                                path = vUrl + "/Uploads/HomepageSlider/" + modifiedfilename;
                            }
                            else
                                path = path + "|" + vUrl + "/Uploads/HomepageSlider/" + modifiedfilename;
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));
                        }
                    }
                }
                db.HomeSliderImages.RemoveRange(db.HomeSliderImages.Where(k=>k.CompanyDetailId==CompanyId));
                db.SaveChanges();
                var vURL = path;
                string[] strSlider = vURL.Split('|');

                if (strSlider.Length > 0)
                {
                    for (int cnt = 0; cnt < strSlider.Length; cnt++)
                    {
                        HomeSliderImage insertSlider = new HomeSliderImage();
                        insertSlider.ImageUrl = strSlider[cnt];
                        insertSlider.HomePageSettingsId = ihomeSliderId;
                        insertSlider.CompanyDetailId = CompanyId;
                        db.HomeSliderImages.Add(insertSlider);
                        db.SaveChanges();
                    }
                }
                //var vURL = vUrl + "/Uploads/HomepageSlider/" + modifiedfilename;
                return Ok(vURL);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        [HttpPost]
        [Route("api/Fileupload/UpdateBannerImages")]
        public IHttpActionResult UpdateBannerImages(int ihomeBannerId, int CompanyId)
        {
            try
            {
                log.Debug("UpdateBannerImages");
                string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/HomeBannerImages/");
                System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
                var vUrl = "http://webapi.kasimedufishandmeat.in/";
                //var vUrl = "http://localhost:56397/";
                string modifiedfilename = string.Empty;
                string path1 = string.Empty;

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

                            if (path1 == string.Empty)
                            {
                                path1 = vUrl + "/Uploads/HomeBannerImages/" + modifiedfilename;
                            }
                            else
                                path1 = path1 + "|" + vUrl + "/Uploads/HomeBannerImages/" + modifiedfilename;
                            file.SaveAs(spath + Path.GetFileName(modifiedfilename));
                        }
                    }
                }
                db.HomeBannerImages.RemoveRange(db.HomeBannerImages.Where(p=>p.CompanyDetailId==CompanyId));
                db.SaveChanges();

                var vURL1 = path1;
                string[] strBanner = vURL1.Split('|');
                if (strBanner.Length > 0)
                {
                    for (int cnt1 = 0; cnt1 < strBanner.Length; cnt1++)
                    {
                        HomeBannerImage insertBanner = new HomeBannerImage();
                        insertBanner.BannerImageURL = strBanner[cnt1];
                        insertBanner.HomePageSettingsId = ihomeBannerId;
                        insertBanner.CompanyDetailId = CompanyId;
                        db.HomeBannerImages.Add(insertBanner);
                        db.SaveChanges();
                    }
                }

                return Ok(vURL1);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
    }

}
