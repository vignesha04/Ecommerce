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
    
    public partial class MemberDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MemberDetail()
        {
            this.MemberCarts = new HashSet<MemberCart>();
            this.MemberOrders = new HashSet<MemberOrder>();
            this.ProductReviews = new HashSet<ProductReview>();
            this.SalesOrders = new HashSet<SalesOrder>();
        }
    
        public long MemberId { get; set; }
        public string MemberName { get; set; }
        public Nullable<long> ContactNo { get; set; }
        public string EmailId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<long> PinCode { get; set; }
        public string Password { get; set; }
        public Nullable<System.DateTime> InsertedDate { get; set; }
        public Nullable<long> IsActive { get; set; }
        public string ConfirmationCode { get; set; }
        public Nullable<long> CompanyDetailId { get; set; }
        public string MobileToken { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MemberCart> MemberCarts { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MemberOrder> MemberOrders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SalesOrder> SalesOrders { get; set; }
    }
}
