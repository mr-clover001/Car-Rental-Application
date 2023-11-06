using System;
using System.Collections.Generic;
using System.Text;

namespace CarRentalAppBLL.DataTransferObject_DTO_
{
    public class RentalAgreementDTO
    {
        public int Id { get; set; }

        public string VechicleId { get; set; }

        public string PersonName { get; set; }


        public string Mobile { get; set; }

        public string Adhar { get; set; }

        public string Email { get; set; }

        public string Duration { get; set; }

        public string TotalCost { get; set; }
    }
}
