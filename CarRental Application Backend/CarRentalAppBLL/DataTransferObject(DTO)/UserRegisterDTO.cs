﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CarRentalAppBLL.DataTransferObject_DTO_
{
    public class UserRegisterDTO
    {
    
        public int UserId { get; set; }

      
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }


        public string Role { get; set; }

        public string Password { get; set; }
    }
}
