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
    public class SocialMediaSettingController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger("ErrorLog");
        private EcommerceEntities db = new EcommerceEntities();


        //(Bind Grid)
        [HttpGet]
        [Route("api/SocialMediaSetting/GetSocialDetails")]
        public IEnumerable GetSocialDetails( int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSocialDetails");
                var vsno = 0;
                var a = (from p in db.SocialMedias.AsEnumerable()
                         where(p.CompanyDetailId == CompanyDetailId)
                         orderby p.SocialMediaId descending
                         select new
                         {
                             sno = ++vsno,
                             CompanyDetailId=p.CompanyDetailId,
                             SocialMediaId = p.SocialMediaId,
                             SocialMediaType = p.SocialMediaType
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
        [Route("api/SocialMediaSetting/GetSocialMedia")]
        public IEnumerable GetSocialType( int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSocialMedia");
                var vsno = 0;
                var a = (from p in db.SocialMediaLinks.AsEnumerable()
                         join q in db.SocialMedias.AsEnumerable() on p.SocialMediaId equals q.SocialMediaId
                         where (p.CompanyDetailId== CompanyDetailId)
                         orderby p.SocialMediaLinkId descending
                         select new
                         {
                             sno = ++vsno,
                             CompanyDetailId=p.CompanyDetailId,
                             SocialMediaId = p.SocialMediaId,
                             SocialMediaLinkId = p.SocialMediaLinkId,
                             SocialMediaLink1 = p.SocialMediaLink1,
                             SocialMediaType = q.SocialMediaType
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
        [Route("api/SocialMediaLink/InsertSocialMediaLinks")]
        public IHttpActionResult InsertSocialMediaLinks([FromBody]JObject jsonString , int CompanyDetailId)
        {
            try
            {
                log.Debug("InsertSocialMediaLinks");
                
                string json = jsonString.ToString(Newtonsoft.Json.Formatting.None);
                clInsertSocialMediaLinks objjson = JsonConvert.DeserializeObject<clInsertSocialMediaLinks>(json);
                var context = new EcommerceEntities();
                SocialMediaLink obj = new SocialMediaLink();

                obj.SocialMediaId = objjson.SocialMediaId;
                obj.SocialMediaLink1 = objjson.SocialMediaLink1;
                obj.CompanyDetailId = CompanyDetailId;

                var SocialMediaExist = db.SocialMediaLinks.Any(x => x.SocialMediaId == obj.SocialMediaId && x.CompanyDetailId==CompanyDetailId);
                if (SocialMediaExist)
                {
                    return Ok("Exist");
                }
                else
                {
                    context.SocialMediaLinks.Add(obj);
                    context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }

        public class clInsertSocialMediaLinks
        {
            public int SocialMediaId;
            public string SocialMediaLink1;

            public long? CompanyDetailId { get; set; }
        }

        [HttpGet]
        [Route("api/SocialMediaSetting/GetSocialMedias")]
        public IEnumerable<SocialMediaLink> GetSocialMedias(int SocialId, int CompanyDetailId)
        {
            var a = (from p in db.SocialMediaLinks.AsEnumerable()
                     where ((p.SocialMediaId == SocialId) && (p.CompanyDetailId == CompanyDetailId))
                     orderby p.SocialMediaLinkId descending
                     select new SocialMediaLink
                     {
                         CompanyDetailId = p.CompanyDetailId,
                         SocialMediaId = p.SocialMediaId,
                         SocialMediaLinkId = p.SocialMediaLinkId,
                         SocialMediaLink1 = p.SocialMediaLink1
                     });
            return a;
        }

        //(Edit)
        [HttpGet]
        [Route("api/SocialMediaSetting/GetSocialMediabySocialMediaLinkId")]
        public IEnumerable GetSocialDetailsBySocialMediaId(long SocialMediaLinkId , int CompanyDetailId)
        {
            try
            {
                log.Debug("GetSocialMediabySocialMediaLinkId");
                var a = (from p in db.SocialMediaLinks.AsEnumerable()
                         join q in db.SocialMedias.AsEnumerable() on p.SocialMediaId equals q.SocialMediaId
                         where( (p.SocialMediaLinkId == SocialMediaLinkId) &&(p.CompanyDetailId== CompanyDetailId))
                         orderby p.SocialMediaLinkId descending
                         select new
                         {
                             CompanyDetailId=p.CompanyDetailId,
                             SocialMediaLink1 = p.SocialMediaLink1,
                             SocialMediaType = q.SocialMediaType,
                             SocialMediaId = p.SocialMediaId,
                             SocialMediaLinkId = p.SocialMediaLinkId

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
        [Route("api/SocialMediaLink/UpdateSocialMedia")]
        public IHttpActionResult UpdateSocialMedia([FromBody]SocialMediaLink UpdateSocialMedia, long SocialMediaLinkId, int CompanyDetailId)
        {
            try
            {
                log.Debug("UpdateSocialMedia");
                db.SocialMediaLinks.Add(UpdateSocialMedia);
                var context = new EcommerceEntities();

                var result = context.SocialMediaLinks.First(p => p.SocialMediaLinkId == SocialMediaLinkId && p.CompanyDetailId==CompanyDetailId);
                if (result != null)
                {
                    result.SocialMediaLinkId = SocialMediaLinkId;
                    result.SocialMediaId = UpdateSocialMedia.SocialMediaId;
                    result.SocialMediaLink1 = UpdateSocialMedia.SocialMediaLink1;
                    result.CompanyDetailId = CompanyDetailId;
                }
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return null;
            }
        }
        [HttpPost]
        [Route("api/SocialMediaLink/DeleteSocialMedia")]
        public IHttpActionResult DeleteSocialMedia(long SocialMediaLinkId ,int CompanyDetailId)
        {
            try
            {
                log.Debug("DeleteSocialMedia");
                var context = new EcommerceEntities();
                var result = context.SocialMediaLinks.First(b => b.SocialMediaLinkId == SocialMediaLinkId && b.CompanyDetailId== CompanyDetailId);
                if (result != null)
                {
                    db.SocialMediaLinks.RemoveRange(db.SocialMediaLinks.Where(x => x.SocialMediaLinkId == SocialMediaLinkId && x.CompanyDetailId==CompanyDetailId));
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
    }
}


        
           
        
        
    


            
            
    




    





