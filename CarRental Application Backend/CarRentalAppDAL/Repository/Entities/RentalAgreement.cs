using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarRentalAppDAL.Repository.Entities
{
   public class RentalAgreement
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string VechicleId { get; set; }

        [StringLength(100)]
        public string PersonName { get; set; }

        [StringLength(100)]
        public string Mobile { get; set; }

        [StringLength(100)]
        public string Adhar { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(100)]
        public string Duration { get; set; }

        [StringLength(100)]
        public string TotalCost { get; set; }
    }
}
