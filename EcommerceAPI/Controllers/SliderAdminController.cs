using EcommerceAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors("*", "*", "GET,POST")]
    public class SliderAdminController : ApiController
    {
        private EcommerceEntities db = new EcommerceEntities();

        [HttpGet]
        [Route("api/Slider/GetSliderdetails")]
        public IEnumerable GetSliderdetails(int iActive)
        {
            var sno = 0;
            var a = (from p in db.HomeSliders.AsEnumerable()
                     where (p.IsActive == iActive)
                     orderby p.HomeSliderId descending
                     select new
                     {
                         RowNo=++sno,
                         HomeSliderId = p.HomeSliderId,
                         SliderName = p.SliderName,
                         CutofDate = Convert.ToDateTime(p.CutofDate).ToString("dd/MM/yyyy"),
                         ImageUrl = p.ImageUrl,
                         IsActive = p.IsActive == 1 ? "AdminStyle/images/active.png" : "AdminStyle/images/inactive.png",
                         IsActive1 = p.IsActive == 1 ? "Active" : "InActive"
                     });
            return a;
        }

        [HttpGet]
        [Route("api/Slider/GetSliderdetailsId")]
        public IEnumerable GetSliderdetailsId(int homesliderId)
        {
            var a = (from p in db.HomeSliders.AsEnumerable()
                     where (p.HomeSliderId == homesliderId)
                     select new
                     {
                         HomeSliderId = p.HomeSliderId,
                         SliderName = p.SliderName,
                         CutofDate = p.CutofDate,
                         IsActive = p.IsActive,
                         ImageUrl = p.ImageUrl
                     });
            return a;
        }

        [HttpPost]
        [Route("api/Slider/InserSliderdetails")]
        public IHttpActionResult InsertSliderdetails([FromBody] HomeSlider slider)
        {
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

            string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
            TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

            DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

            DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(slider.CutofDate), timeZoneInfo);

            DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(slider.CutofDate), timeZoneInfo);

            string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");

            TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;

            slider.CutofDate = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
            slider.InsertedBy = 1;
            slider.InsertedDate = DateTime.Now;
            db.HomeSliders.Add(slider);
            db.SaveChanges();
            var iId = slider.HomeSliderId;
            return Ok(iId);
        }

        [HttpPost]
        [Route("api/Slider/UpdateSliderdetails")]
        public IHttpActionResult UpdateSliderdetails([FromBody] HomeSlider slider, int homesliderId)
        {
            var result = db.HomeSliders.First(x => x.HomeSliderId == homesliderId);
            if(result!=null)
            {
                TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                DateTime dtCNow = TimeZoneInfo.ConvertTime(Convert.ToDateTime(DateTime.Now), timeZoneInfo);

                string dtCNowdate = Convert.ToDateTime(dtCNow).ToString("yyyy-MM-dd");
                TimeSpan tsnow = Convert.ToDateTime(dtCNow).TimeOfDay;

                DateTime currentdatetime = Convert.ToDateTime(dtCNowdate + " " + tsnow.Hours + ":" + tsnow.Minutes);

                DateTime dtCheckin = TimeZoneInfo.ConvertTime(Convert.ToDateTime(slider.CutofDate), timeZoneInfo);

                DateTime dtCheckintime = TimeZoneInfo.ConvertTime(Convert.ToDateTime(slider.CutofDate), timeZoneInfo);

                string chkindate = Convert.ToDateTime(dtCheckin).ToString("yyyy-MM-dd");

                TimeSpan tsin = Convert.ToDateTime(dtCheckintime).TimeOfDay;

                slider.CutofDate = Convert.ToDateTime(chkindate + " " + tsin.Hours + ":" + tsin.Minutes);
                result.HomeSliderId = homesliderId;
                result.SliderName = slider.SliderName;
                result.CutofDate = slider.CutofDate;
                if (slider.IsActive == 1)
                    result.IsActive = 1;
                else
                    result.IsActive = 0;
                result.UpdatedBy = 1;
                result.UpdatedDate = DateTime.Now;
                db.SaveChanges();
            }
            return Ok(homesliderId);
        }

        [HttpGet]
        [Route("api/Slider/GetSearch")]
        public IEnumerable GetSearch(string Search, int Status)
        {
            var sno = 0;
            var a = (from p in db.HomeSliders.AsEnumerable()
                     where (p.IsActive == Status && (p.SliderName.ToLower().Contains(Search.ToLower()) || p.CutofDate.ToString().Contains(Search.ToLower())))
                     select new
                     {
                         RowNo = ++sno,
                         HomeSliderId = p.HomeSliderId,
                         SliderName = p.SliderName,
                         CutofDate = Convert.ToDateTime(p.CutofDate).ToString("dd/MM/yyyy"),
                         ImageUrl = p.ImageUrl,
                         IsActive = p.IsActive == 1 ? "AdminStyle/images/active.png" : "AdminStyle/images/inactive.png",
                         IsActive1 = p.IsActive == 1 ? "Active" : "InActive"
                     });
            return a;
        }

        [HttpPost]
        [Route("api/Fileupload/SliderUpload")]
        public IHttpActionResult SliderUpload(int sliderId , string Fileupload)
        {
            string spath = System.Web.Hosting.HostingEnvironment.MapPath("/Uploads/HomeSlider/");
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            var vUrl = Fileupload;
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
                        //Stream strm = file.InputStream;
                        //using (var image = System.Drawing.Image.FromStream(strm))
                        //{
                        //    var newWidth = (int)(450);
                        //    var newHeight = (int)(340);
                        //    var thumbnailImg = new Bitmap(newWidth, newHeight);
                        //    var thumbGraph = Graphics.FromImage(thumbnailImg);
                        //    thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                        //    thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                        //    thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        //    var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
                        //    thumbGraph.DrawImage(image, imageRectangle);
                        //    thumbnailImg.Save(spath + Path.GetFileName(modifiedfilename), image.RawFormat);
                        //}
                        var result = db.HomeSliders.First(p => p.HomeSliderId == sliderId);
                        if (result != null)
                        {
                            result.ImageUrl = vUrl + "/Uploads/HomeSlider/" + modifiedfilename;
                            db.SaveChanges();
                        }
                    }
                }
            }
            var vURL = vUrl + "/Uploads/HomeSlider/" + modifiedfilename;
            return Ok(vURL);
        }
    }
}
