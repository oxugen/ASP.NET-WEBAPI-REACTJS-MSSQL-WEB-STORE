using System;
using System.Collections.Generic;

#nullable disable

namespace PShop.Models
{
    public partial class Payment
    {
        public Payment()
        {
            Orders = new HashSet<Order>();
        }

        public int PaymentId { get; set; }
        public string PaymentType { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
