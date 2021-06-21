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
    
    public partial class HomePageSetting
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HomePageSetting()
        {
            this.HomeBannerImages = new HashSet<HomeBannerImage>();
            this.HomeSliderImages = new HashSet<HomeSliderImage>();
        }
    
        public long HomePageSettingsId { get; set; }
        public string ShowSlider { get; set; }
        public string ShowTrendingItems { get; set; }
        public string ShowNewItems { get; set; }
        public string DisplayBannerImages { get; set; }
        public string ShowAdvertisement { get; set; }
        public Nullable<long> CompanyDetailId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HomeBannerImage> HomeBannerImages { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HomeSliderImage> HomeSliderImages { get; set; }
    }
}