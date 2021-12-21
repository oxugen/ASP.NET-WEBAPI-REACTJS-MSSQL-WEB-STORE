using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PShop.Data;
using PShop.Dtos;
using PShop.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;

namespace PShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly PaintShopContext store;
        private readonly IWebHostEnvironment hostEnvironment;
        private readonly IProductRepository _repository;
        public ProductController(PaintShopContext store, IWebHostEnvironment hostEnvironment)
        {
            this.store = store;
            this.hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAvailableProducts()
        {
            return Ok(store.Products);
        }


        [HttpGet]
        [Route("cart")]
        public IActionResult GetCart()
        {
            var orders = store.Products.Join(store.Card,
                 u => u.ProductId,
                c => c.ProductId,
                (u, c) => new
                { 
                    ProductId = u.ProductId,
                    NameOfProduct = u.NameOfProduct,
                    Price = u.Price * c.CountOfProducts,
                    Picture = u.Picture,
                    CountOfProducts = c.CountOfProducts,
                    UserId = c.UserId
                });
            return Ok(orders);
        }

        [HttpPost]
        [Route("removeCart")]
        public IActionResult removeCart(int userId)
        {

            var c = store.Card.Where( u => u.UserId == Convert.ToInt32(userId)).ToList();

            foreach (Card b in c) {
                Product product = store.Products.FirstOrDefault(u => u.ProductId == b.ProductId);
                product.NumberOfProducts = product.NumberOfProducts + b.CountOfProducts;
                store.Products.Update(product);
                store.SaveChanges();
            }
            store.Card.RemoveRange(c);
            store.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("orders")]
        public IActionResult GetOrders()
        {
            var orderproduct = store.ProductsOrders.Join(store.Products,
                u => u.ProductId,
                c => c.ProductId,
                (u, c) => new
                {
                    OrderId = u.OrderId,
                    NameOfProduct = c.NameOfProduct,
                });

            var users = store.Orders.Join(store.Users,
                u => u.UserId,
                c => c.UserId,
                (u, c) => new
                {
                    OrderId = u.OrderId,
                    UserId = u.UserId,
                    OrderDate = u.OrderDate,
                    CountOfProducts = u.CountOfProducts,
                    Mail = c.Mail,
                    Price = u.Price
                });

            var orders = users.Join(orderproduct,
                u => u.OrderId,
                c => c.OrderId,
                (u, c) => new
                {
                    OrderId = u.OrderId,
                    Mail = u.Mail,
                    OrderDate = u.OrderDate,
                    CountOfProducts = u.CountOfProducts,
                    NameOfProduct = c.NameOfProduct,
                    Price = u.Price
                });
            return Ok(orders);
        }


        //[HttpPost]
        //[Route("productsById")]
        //public IActionResult GetProductsById(List<ProductsDto> dto) 
        //{
        //    return 
        //}

        [HttpGet]
        [Route("productById")]
        public IActionResult GetById(int id)
        {
            return Ok(store.Products.FirstOrDefault(p => p.ProductId == id));
        }


        [HttpGet]
        [Route("getbyname")]
        public IActionResult GetProductByName(string nameOfProduct)
        {
            return Ok(store.Products.Where(p => EF.Functions.Like(p.NameOfProduct, '%' + nameOfProduct + '%')));
        }


        [HttpGet]
        [Route("image")]
        public IActionResult Get(int id)
        {
            string picture = store.Products.FirstOrDefault(p => p.ProductId == id).Picture;
            return PhysicalFile(@"C:/Users/Asus/PShop/PShop/" + picture, "image/jpeg");
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create(ProductDto dto)
        {
            var imagePath = "src/" + Convert.ToString(store.Products.Count() + 1) + ".jpg";
            var product = new Product
            {
                NameOfProduct = dto.NameOfProduct,
                NumberOfProducts = Convert.ToInt32(dto.NumberOfProducts),
                Price = Convert.ToInt32(dto.Price),
                Description = dto.Description,
                Picture = imagePath,
                CategoryId = Convert.ToInt32(dto.CategoryId)
            };

            store.Products.Add(product);
            store.SaveChanges();
             return Ok();
        }

        [HttpPost("makeOrder")]
        public IActionResult Create(int userId)
        {
            var c = store.Card.Where(u => u.UserId == Convert.ToInt32(userId)).ToList();

            foreach(Card u in c)
            {
                var order = new Order { UserId = u.UserId, PaymentId = 1, Price = 50 * u.CountOfProducts, OrderDate = DateTime.Now, CountOfProducts = u.CountOfProducts };
                store.Orders.Add(order);
                store.SaveChanges();
                var productorder = new ProductsOrder {OrderId = order.OrderId, ProductId = u.ProductId };
                store.ProductsOrders.Add(productorder);
                store.SaveChanges();
            }
            store.Card.RemoveRange(c);
            store.SaveChanges();
            
            //var order = new Order
            //{
            //    UserId = (dto.UserId),
            //    PaymentId = (dto.PaymentId),
            //    Price = (dto.Price),
            //    OrderDate = DateTime.Now,
            //    CountOfProducts = Convert.ToInt32(dto.CountOfProducts)
            //};
            //store.Orders.Add(order);
            //store.SaveChanges();
            //var productsorders = new ProductsOrder
            //{
            //    ProductId = Convert.ToInt32(dto.productId),
            //    OrderId = order.OrderId
            //};
            //store.ProductsOrders.Add(productsorders);
            //store.SaveChanges();
            //Product product = store.Products.FirstOrDefault(u => u.ProductId == Convert.ToInt32(dto.productId));
            //product.NumberOfProducts = product.NumberOfProducts - Convert.ToInt32(dto.CountOfProducts);
            //store.SaveChanges();
            MailAddress from = new MailAddress("dubrovskay.7830@gmail.com", "PaintShop");
            MailAddress to = new MailAddress("dubrovskay.7830@mail.ru");
            MailMessage m = new MailMessage(from, to);
            m.Subject = "New Order";
            m.Body = "<h2>Здравствуйте,Вы заказали у нас товар!" + "</h2>";
            m.Body += "<h1>С вами свяжется наш менеджер!</h1>";
            m.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("dubrovskay.7830@gmail.com", "rungun23");
            smtp.EnableSsl = true;
            smtp.SendMailAsync(m);
            return Ok("Yea");
        }

        [HttpPost("addCart")]
        public IActionResult addCart(CardDto dto)
        {
            if (store.Card.Where(u => u.ProductId == Convert.ToInt32(dto.productId) && u.UserId == dto.UserId).Count() != 0)
            {
                var card = store.Card.Where(u => u.ProductId == Convert.ToInt32(dto.productId) && u.UserId == dto.UserId).FirstOrDefault();
                card.CountOfProducts = card.CountOfProducts + Convert.ToInt32(dto.CountOfProducts);
            }
            else
            {
                var card = new Card
                {
                    ProductId = Convert.ToInt32(dto.productId),
                    CountOfProducts = Convert.ToInt32(dto.CountOfProducts),
                    UserId = dto.UserId
                };

                store.Card.Add(card);
             
            }

           // store.SaveChanges();
            Product product = store.Products.FirstOrDefault(u => u.ProductId == Convert.ToInt32(dto.productId));
            product.NumberOfProducts = product.NumberOfProducts - Convert.ToInt32(dto.CountOfProducts);
            store.Products.Update(product);
            store.SaveChanges();
            return Ok(store.Card);
        }

       

        [HttpPost("createImage")]
        public ActionResult SaveImageAsync([FromForm]FileModel imageFile)
        {
            //string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            string imageName = Convert.ToString(store.Products.Count() + 1) + ".jpg";
            //imageName = "src/" + id + Path.GetExtension(imageFile.FileName);
            var imagePath = hostEnvironment.ContentRootPath +  "\\src\\" +  imageName;
            using (Stream stream = new FileStream(imagePath,FileMode.Create))
            {
                imageFile.FormFile.CopyTo(stream);
            }
            return StatusCode(StatusCodes.Status200OK);
        }

    }
}
