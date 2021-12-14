using System;
using System.Collections.Generic;

#nullable disable

namespace PShop.Models
{
    public partial class Order
    {
        public Order()
        {
            ProductsOrders = new HashSet<ProductsOrder>();
        }

        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        public int Price { get; set; }
        public DateTime OrderDate { get; set; }
        public int CountOfProducts { get; set; }

        public virtual Payment Payment { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<ProductsOrder> ProductsOrders { get; set; }
    }
}
