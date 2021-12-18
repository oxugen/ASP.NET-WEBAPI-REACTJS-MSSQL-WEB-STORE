using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Models
{
    public class Card
    {
        [Key]
        public int ProductId { get; set; }
        public int CountOfProducts { get; set; }

        public virtual Product Product { get; set; }

    }
}
