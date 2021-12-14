using PShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Data
{
    interface IProductRepository
    {
        Product Create(Product user);
        List<Product> GetProducts();
        public Product GetById(int id);
    }
}
