using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace CarRentalAppDAL.Repository.Entities
{
    public class UserRegister
    {
        [Key]
        public int UserId { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(100)]
        public string Role { get; set; }

  
        [StringLength(100)]
        public string Password { get; set; }

    }
}
