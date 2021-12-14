using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Models
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile{get;set;}
    }
}
