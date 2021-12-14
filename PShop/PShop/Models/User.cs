using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace PShop.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        [JsonIgnore]
        public string Pass { get; set; }
        public string Mail { get; set; }
        public string Picture { get; set; }
        public string RoleOfUser { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
