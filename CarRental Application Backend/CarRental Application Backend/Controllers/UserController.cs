using CarRentalAppBLL;
using CarRentalAppBLL.DataTransferObject_DTO_;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization; // Import the correct namespace

namespace CarRental_Application_Backend.Controllers
{
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration config;
        private CarRentalAppBLL.UserRegisterBLL _BLL;

        public UserController(IConfiguration _config)
        {
            config = _config;
            _BLL = new CarRentalAppBLL.UserRegisterBLL();
        }

        //https://localhost:44374/ViewUsers
        [HttpGet("ViewUsers")] // Use the correct attribute for routing
        public List<UserRegisterDTO> GetUsersRegister()
        {
            return _BLL.GetUsersRegister();
        }


        // https://localhost:44374/CreateUser
        [AllowAnonymous]
        [HttpPost("CreateUser")] // Use the correct attribute for routing
        public IActionResult AddUsersRegister([FromBody] UserRegisterDTO usersRegisterM) // Use [FromBody]
        {
            bool isExist = _BLL.AddUsersRegister(usersRegisterM);

            if (isExist)
            {
                return Ok("Already Exist");
            }
            else
            {
                return Ok("Success");
            }
        }

        [AllowAnonymous]
        [HttpPost("login")] // Use the correct attribute for routing
        public IActionResult Login([FromBody] UserLoginDTO userLoginM) // Use [FromBody]
        {
            var userLoginAvailable = _BLL.UserLoggedIn(userLoginM);
            if (userLoginAvailable != null)
            {
                return Ok(new JwtService(config).GenerateToken(
                    userLoginAvailable.UserId.ToString(),
                    userLoginAvailable.FirstName,
                    userLoginAvailable.Email,
                    userLoginAvailable.Role
                ));
            }
            else
            {
                return Ok("Failure");
            }
        }
    }
}
