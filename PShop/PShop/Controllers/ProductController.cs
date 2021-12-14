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
            return PhysicalFile(hostEnvironment.ContentRootPath + picture, "image/jpeg");
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



        [HttpPost("createImage")]
        public ActionResult SaveImageAsync([FromForm]FileModel imageFile)
        {
            //string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            string imageName = Convert.ToString(store.Products.Count() + 1) + ".jpg";
            //imageName = "src/" + id + Path.GetExtension(imageFile.FileName);
            var imagePath = hostEnvironment.ContentRootPath +  "/src/" +  imageName;
            using (Stream stream = new FileStream(imagePath,FileMode.Create))
            {
                imageFile.FormFile.CopyTo(stream);
            }
            return StatusCode(StatusCodes.Status200OK);
        }

    }
}
