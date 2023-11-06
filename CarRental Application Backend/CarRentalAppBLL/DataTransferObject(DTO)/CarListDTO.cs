using System;
using System.Collections.Generic;
using System.Text;

namespace CarRentalAppBLL.DataTransferObject_DTO_
{
   public class CarListDTO
    {

      
        public int VechicleId { get; set; }
        
        public string Maker { get; set; }
      
        public string Model { get; set; }
      
        public string Color { get; set; }
       
        public double? RentalPrice { get; set; }
     
        public string ImageFileName { get; set; }
      
        public string AvailablityStatus { get; set; }
    }
}
