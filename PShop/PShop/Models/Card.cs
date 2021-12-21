using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Models
{
    public class Card
    {
        [Key]
        public int Id { get;  set; }
        public int ProductId { get; set; }
        public int CountOfProducts { get; set; }
        public int UserId { get; set; }
       // public virtual Product Product { get; set; }

    }
}
