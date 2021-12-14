using System;
using System.Collections.Generic;

#nullable disable

namespace PShop.Models
{
    public partial class ProductsOrder
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
