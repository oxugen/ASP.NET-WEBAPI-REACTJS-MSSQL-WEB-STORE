using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

#nullable disable

namespace PShop.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductsOrders = new HashSet<ProductsOrder>();
        }

        public int ProductId { get; set; }
        public string NameOfProduct { get; set; }
        public int NumberOfProducts { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int CategoryId { get; set; }
       

        public virtual Category Category { get; set; }
        public virtual ICollection<ProductsOrder> ProductsOrders { get; set; }
    }
}
