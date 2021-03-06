
using EcommerceAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace EcommerceAPI
{

    public class WebApiApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            log4net.Config.XmlConfigurator.Configure();

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        
        protected void Session_Start()
        {
            try
            {
                string str = AdminController.UpdateVisitorCount();
            }
            catch (System.IO.FileNotFoundException)
            {
                //throw;
            }
            catch
            {
                //Don't throw
            }
        }
        
    }
}
