using System;
using EcommerceAPI.App_Start;

public static class Startup
{
    public static void RegisterAuth()
    {
       

        OAuthWebSecurity.RegisterFacebookClient(
         appId: System.Configuration.ConfigurationManager.AppSettings["422455775016345"],
         appSecret: System.Configuration.ConfigurationManager.AppSettings["71e7600ebe56f505338930bdee1fd1b6"]);

       
    }
}

namespace EcommerceAPI.App_Start
{
    class OAuthWebSecurity
    {
        internal static void RegisterFacebookClient(object appId, object appSecret)
        {
            throw new NotImplementedException();
        }
    }
}