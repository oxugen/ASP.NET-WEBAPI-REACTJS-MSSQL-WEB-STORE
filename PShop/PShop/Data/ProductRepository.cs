using PShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Data
{
    public class ProductRepository: IProductRepository
    {
        private readonly PaintShopContext _context;

        public ProductRepository(PaintShopContext context)
        {
            _context = context;
        }

        public Product Create(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public Product GetById(int id)
        {
            return _context.Products.FirstOrDefault(u => u.ProductId == id);
        }

        public List<Product> GetProducts()
        {
            throw new NotImplementedException();
        }

        //public List<Product> GetProducts()
        //{

        //    return _context.Products.All;
        //}
    }
}
