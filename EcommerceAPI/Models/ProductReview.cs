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
    
    public partial class ProductReview
    {
        public long ProductReviewId { get; set; }
        public Nullable<long> ProductId { get; set; }
        public Nullable<long> MemberId { get; set; }
        public string ReviewComments { get; set; }
        public Nullable<long> Rating { get; set; }
        public Nullable<System.DateTime> InsertedDate { get; set; }
        public string Status { get; set; }
    
        public virtual MemberDetail MemberDetail { get; set; }
        public virtual ProductDetail ProductDetail { get; set; }
    }
}
