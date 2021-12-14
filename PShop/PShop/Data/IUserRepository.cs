using PShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PShop.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        public User GetById(int id);
    }
}
