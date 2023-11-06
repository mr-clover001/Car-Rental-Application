using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using CarRentalAppBLL.DataTransferObject_DTO_;

namespace CarRental_Application_Backend.Controllers
{

    [ApiController]
    [EnableCors("AllowSpecificOrigin")]

    public class RentalAgreementController : ControllerBase
    {

        private CarRentalAppBLL.RentalAgreementBLL _BLL;

        public RentalAgreementController()
        {
            _BLL = new CarRentalAppBLL.RentalAgreementBLL();

        }
        
        [HttpGet]
        [Route("ViewRentalAgreement")]
        public List<RentalAgreementDTO> GetRentalAgreements()
        {
            return _BLL.GetRentalAgreements();
        }


        // ex: /ViewRentalDetailById? id = 2
        [HttpGet]
        [Route("ViewRentalDetailById")]
        public ActionResult<RentalAgreementDTO> GetRentalAgreementsById(int id)
        {
            var data = _BLL.GetRentalAgreementsById(id);

            if (data == null)
            {
                return NotFound("Invalid ID");
            }

            return Ok(data);
        }

        // ex:   /ViewRentalDetail?email=Anoop
        /*     [HttpGet]
             [Route("ViewRentalDetail")]
             public ActionResult<RentalAgreementDTO> GetRentalAgreementsByEmail(string email)
             {
                 var data = _BLL.GetRentalAgreementsByEmail(email);

                 if (data == null)
                 {
                     return NotFound("Invalid ID");
                 }

                 return Ok(data);
             }

             */
        [HttpGet]
        [Route("ViewRentalDetail")]
        public ActionResult<List<RentalAgreementDTO>> GetRentalAgreementsByEmail(string email)
        {
            var data = _BLL.GetRentalAgreementsByEmail(email);

            if (data == null)
            {
                return NotFound("No matching records found");
            }

            return Ok(data);
        }


        [Route("AddRentalAgreement")]
        [HttpPost]
        public ActionResult AddRentalAgreement([FromBody] RentalAgreementDTO rentalAgreementDTO)
        {
            _BLL.AddRentalAgreement(rentalAgreementDTO);
            return Ok(rentalAgreementDTO);
            
        }

        //  DeleteRentalAgreement?id= {id}
        [Route("DeleteRentalAgreement")]
        [HttpDelete]
        public IActionResult DeleteCarDetail(int id)
        {
            var car = _BLL.GetRentalAgreementsById(id);

            if (car == null)
            {
                return NotFound("Invalid ID");
            }

            _BLL.DeleteRentalAgreement(id);

            return NoContent();
        }


    }
}
