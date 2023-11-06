using CarRental_Application_Backend.Repository;
using CarRentalAppDAL.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarRentalAppDAL
{
   public class RentalAgreementDAL
    {


        public List<RentalAgreement> GetRentalAgreements()
        {
            var db = new CarRentalAppDB();
            return db.RentalAgreement.ToList();
        }

        public RentalAgreement GetRentalAgreementsById(int id)
        {
            var db = new CarRentalAppDB();
            RentalAgreement rentalAgreement = new RentalAgreement();

            rentalAgreement = db.RentalAgreement.FirstOrDefault(x => x.Id == id);

            return rentalAgreement;
        }


        /*   public RentalAgreement GetRentalAgreementsByEmail(string email)
           {
               var db = new CarRentalAppDB();
               RentalAgreement rentalAgreement = new RentalAgreement();

               rentalAgreement = db.RentalAgreement.FirstOrDefault(x => string.Equals(x.Email, email));

               return rentalAgreement;
           }
        */

        public List<RentalAgreement> GetRentalAgreementsByEmail(string email)
        {
            var db = new CarRentalAppDB();
            List<RentalAgreement> rentalAgreements = db.RentalAgreement.Where(x => string.Equals(x.Email, email)).ToList();
            return rentalAgreements;
        }

        public void AddRentalAgreement(RentalAgreement rentalAgreement)
        {
            var db = new CarRentalAppDB();
            db.Add(rentalAgreement);
            db.SaveChanges();
        }

        public void DeleteRentalAgreement(int id)
        {
            var db = new CarRentalAppDB();
            var rentalAgreement = db.RentalAgreement.FirstOrDefault(x => x.Id == id);

            if (rentalAgreement != null)
            {
                db.RentalAgreement.Remove(rentalAgreement);
                db.SaveChanges();
            }
        }
    }
}

