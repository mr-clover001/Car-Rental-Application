using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CarRental_Application_Backend.Repository.Entities
{
    public partial class CarLists
    {
        [Column("vechicle_id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VechicleId { get; set; }
        [Column("maker")]
        [StringLength(100)]
        public string Maker { get; set; }
        [Column("model")]
        [StringLength(100)]
        public string Model { get; set; }
        [Column("color")]
        [StringLength(100)]
        public string Color { get; set; }
        [Column("rental_price")]
        public double? RentalPrice { get; set; }
        [Column("image_file_name")]
        [StringLength(100)]
        public string ImageFileName { get; set; }
        [Column("availablity_status")]
        [StringLength(50)]
        public string AvailablityStatus { get; set; }
    }
}
