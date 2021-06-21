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
    
    public partial class SubCategory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SubCategory()
        {
            this.ProductDetails = new HashSet<ProductDetail>();
        }
    
        public long SubCategoryId { get; set; }
        public Nullable<long> CategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public Nullable<long> IsActive { get; set; }
        public string PictureURL { get; set; }
        public Nullable<long> InsertedBy { get; set; }
        public Nullable<System.DateTime> InsertedDate { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<long> CompanyDetailId { get; set; }
        public string ImageURL { get; set; }
        public Nullable<long> orderno { get; set; }
    
        public virtual Category Category { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductDetail> ProductDetails { get; set; }
    }
}