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
    
    public partial class ProductVariance
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProductVariance()
        {
            this.ProductStocks = new HashSet<ProductStock>();
            this.Variancecolorcodes = new HashSet<Variancecolorcode>();
            this.Variancecolorcodes1 = new HashSet<Variancecolorcode>();
            this.Variancecolorcodes2 = new HashSet<Variancecolorcode>();
            this.Wholesaleprices = new HashSet<Wholesaleprice>();
            this.Wholesaleprices1 = new HashSet<Wholesaleprice>();
            this.Wholesaleprices2 = new HashSet<Wholesaleprice>();
        }
    
        public long ProductVarianceId { get; set; }
        public Nullable<long> ProductId { get; set; }
        public string VarianceType { get; set; }
        public Nullable<decimal> VariancePrice { get; set; }
        public Nullable<long> CompanyDetailId { get; set; }
        public Nullable<decimal> sellingPrice { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<int> InsertedBy { get; set; }
        public Nullable<System.DateTime> InsertedDate { get; set; }
        public Nullable<long> VarianceActive { get; set; }
    
        public virtual ProductDetail ProductDetail { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductStock> ProductStocks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Variancecolorcode> Variancecolorcodes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Variancecolorcode> Variancecolorcodes1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Variancecolorcode> Variancecolorcodes2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Wholesaleprice> Wholesaleprices { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Wholesaleprice> Wholesaleprices1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Wholesaleprice> Wholesaleprices2 { get; set; }
    }
}
