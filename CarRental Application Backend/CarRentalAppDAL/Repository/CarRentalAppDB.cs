using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CarRental_Application_Backend.Repository.Entities;
using CarRentalAppDAL.Repository.Entities;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CarRental_Application_Backend.Repository
{
    public partial class CarRentalAppDB : DbContext
    {
        public CarRentalAppDB()
        {
        }

        public CarRentalAppDB(DbContextOptions<CarRentalAppDB> options)
            : base(options)
        {
        }

        public virtual DbSet<CarLists> CarLists { get; set; }

        public virtual DbSet<UserRegister> UserRegister { get; set; }

        public virtual DbSet<UserLogin> UserLogin { get; set; }

        public virtual DbSet<RentalAgreement> RentalAgreement { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=IN-G50D5S3;Initial Catalog=CarRentalAppDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarLists>(entity =>
            {
                

                entity.Property(e => e.AvailablityStatus).IsUnicode(false);

                entity.Property(e => e.Color).IsUnicode(false);

                entity.Property(e => e.ImageFileName).IsUnicode(false);

                entity.Property(e => e.Maker).IsUnicode(false);

                entity.Property(e => e.Model).IsUnicode(false);

                //entity.Property(e => e.VechicleId).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UserRegister>(entity =>
            {
                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.Role).IsUnicode(false);


                entity.Property(e => e.Password).IsUnicode(false);


            });

            modelBuilder.Entity<UserLogin>(entity =>
            {
                entity.HasNoKey();
                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Password).IsUnicode(false);
            });

            modelBuilder.Entity<RentalAgreement>(entity =>
            {
                entity.Property(e => e.VechicleId).IsUnicode(false);

                entity.Property(e => e.PersonName).IsUnicode(false);

                entity.Property(e => e.Mobile).IsUnicode(false);

                entity.Property(e => e.Adhar).IsUnicode(false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Duration).IsUnicode(false);

                entity.Property(e => e.TotalCost).IsUnicode(false);


            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
