using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental_Application_Backend.Controllers
{
    public class ImageController : Controller
    {
        private readonly IWebHostEnvironment _environment;
        public ImageController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("UploadFile")]
        public async Task<ActionResult> UploadFile(IFormFile file)
        {
            try
            {
                file = Request.Form.Files[0];
                string fName = file.FileName;
                string path = Path.Combine(_environment.ContentRootPath, "Images", file.FileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return Ok(new { fileName = file.FileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error uploading file: {ex.Message}");
            }
        }



        [HttpGet("GetImage/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            string imagePath = Path.Combine(_environment.ContentRootPath, "Images", imageName);
            if (!System.IO.File.Exists(imagePath))
                return NotFound("Image not found");

            byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);
            return File(imageBytes, "image/jpeg");
        }
    }

}
