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
    
    public partial class MemberCart
    {
        public long MemberCartId { get; set; }
        public Nullable<long> MemberId { get; set; }
        public Nullable<long> ProductId { get; set; }
        public Nullable<long> Quantity { get; set; }
    
        public virtual MemberDetail MemberDetail { get; set; }
        public virtual ProductDetail ProductDetail { get; set; }
    }
}