using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Dtos
{
    public class ProductDto
    {
        public string ProductId { get; set; }
        public string NameOfProduct { get; set; }
        public string NumberOfProducts { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
        public string? CategoryId { get; set; }
    }
}
