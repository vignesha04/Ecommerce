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
    
    public partial class ProductDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProductDetail()
        {
            this.MemberCarts = new HashSet<MemberCart>();
            this.MemberOrders = new HashSet<MemberOrder>();
            this.ProductFeatures = new HashSet<ProductFeature>();
            this.ProductImages = new HashSet<ProductImage>();
            this.ProductReviews = new HashSet<ProductReview>();
            this.ProductStocks = new HashSet<ProductStock>();
            this.ProductTecDetails = new HashSet<ProductTecDetail>();
            this.ProductVariances = new HashSet<ProductVariance>();
            this.SalesOrderItems = new HashSet<SalesOrderItem>();
            this.TodayDeals = new HashSet<TodayDeal>();
        }
    
        public long ProductId { get; set; }
        public Nullable<long> SubCategoryId { get; set; }
        public Nullable<long> TaxDetailsId { get; set; }
        public Nullable<long> DiscountDetailsId { get; set; }
        public Nullable<long> CouponId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<long> InStock { get; set; }
        public Nullable<long> IsActive { get; set; }
        public string Picture { get; set; }
        public Nullable<long> InsertedBy { get; set; }
        public Nullable<System.DateTime> InsertedDate { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public string ProdFeatures { get; set; }
        public string ProdTecDetails { get; set; }
        public Nullable<long> CompanyDetailId { get; set; }
        public Nullable<long> Variance { get; set; }
        public string ProductType { get; set; }
        public Nullable<long> BrandTypeId { get; set; }
        public Nullable<long> wholesale { get; set; }
        public Nullable<long> colorcode { get; set; }
        public string Description2 { get; set; }
        public string Description3 { get; set; }
    
        public virtual CouponDetail CouponDetail { get; set; }
        public virtual DiscountDetail DiscountDetail { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MemberCart> MemberCarts { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MemberOrder> MemberOrders { get; set; }
        public virtual SubCategory SubCategory { get; set; }
        public virtual TaxDetail TaxDetail { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductFeature> ProductFeatures { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductStock> ProductStocks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductTecDetail> ProductTecDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductVariance> ProductVariances { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SalesOrderItem> SalesOrderItems { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TodayDeal> TodayDeals { get; set; }
    }
}
