//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EcommerceAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Setting
    {
        public long SettingId { get; set; }
        public Nullable<long> CaptchaId { get; set; }
        public string DateFormat { get; set; }
        public string CurrencyType { get; set; }
        public Nullable<long> GridSizeAdmin { get; set; }
        public Nullable<long> GridSizeClient { get; set; }
        public string ButtonColorAdmin { get; set; }
        public string FacebookSignup { get; set; }
        public string CouponApplicable { get; set; }
        public string DiscountApplicable { get; set; }
        public Nullable<long> CompanyDetailId { get; set; }
        public string MetaTag { get; set; }
        public Nullable<long> colorApplicable { get; set; }
        public string FotterImage { get; set; }
        public string Themecolour { get; set; }
        public string favicon { get; set; }
    
        public virtual CaptchaType CaptchaType { get; set; }
    }
}
