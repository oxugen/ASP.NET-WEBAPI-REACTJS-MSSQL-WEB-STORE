using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Dtos
{
    public class OrderDto
    {
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        public int Price { get; set; }
        public string CountOfProducts { get; set; }
        public string productId { get; set; }
    }
}
