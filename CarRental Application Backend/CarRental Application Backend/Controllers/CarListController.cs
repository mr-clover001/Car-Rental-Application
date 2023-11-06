using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CarRentalAppBLL.DataTransferObject_DTO_;
using System.Linq;
using System.Threading.Tasks;
using CarRentalAppDAL;
using AutoMapper;

namespace CarRental_Application_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]

    [EnableCors("AllowSpecificOrigin")]

    public class CarListController : ControllerBase
    {


        private CarRentalAppBLL.CarListBLL _BLL;

        public CarListController()
        {
            _BLL = new CarRentalAppBLL.CarListBLL();

        }
        // CarList/CarList
        [HttpGet]
        [Route("CarList")]
        public List<CarListDTO> GetCarList()
        {
            return _BLL.GetCarList();
        }

        // CarList/cardetail? vechicleId = {id}
        [HttpGet]
        [Route("CarDetail")]
        public ActionResult<CarListDTO> GetCarDetailById(int vechicleId)
        {
            var data = _BLL.GetCarDetailById(vechicleId);

            if (data == null)
            {
                return NotFound("Invalid ID");
            }

            return Ok(data);
        }


        //CarList/AddCarDetails
        [Route("AddCarDetails")]
        [HttpPost]
        public void AddCarDetail([FromBody] CarListDTO carListDTO)
        {
            CarListDTO carDetail = new CarListDTO();
            carDetail.ImageFileName = carListDTO.ImageFileName;
            _BLL.AddCarDetail(carListDTO);
        }


        //CarList/UpdateCarDetail?vechicleId={id}
        [Route("UpdateCarDetail")]
        [HttpPut]
        public ActionResult UpdateCarDetail(int vechicleId, CarListDTO updatedCarDetail)
        {
            var result = _BLL.UpdateCarDetail(vechicleId, updatedCarDetail);

            if (result != null)
            {
                return Ok("successfully update");
            }
            else
            {
                return NotFound("Failed to update");
            }
        }


        //CarList/DeleteCarDetail?vechicleId={id}
        [Route("DeleteCarDetail")]
       [HttpDelete]
       public IActionResult DeleteCarDetail(int vechicleId)
       {
           var car = _BLL.GetCarDetailById(vechicleId);

           if (car == null)
           {
               return NotFound("Invalid ID");
           }

           _BLL.DeleteCarDetail(vechicleId);

           return NoContent();
       }

     


    }
}
