using CarRental_Application_Backend.Repository;
using CarRentalAppDAL.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarRentalAppDAL
{
    public class UserRegisterDAL
    {
        public List<UserRegister> GetUsersRegister()
        {
            var db = new CarRentalAppDB();
            return db.UserRegister.ToList();
        }


        public void AddUsersRegister(UserRegister userRegister)
        {
            var db = new CarRentalAppDB();
            db.UserRegister.Add(userRegister);
            db.SaveChanges();
        }

        public bool IsEmailExists(string email)
        {
            var db = new CarRentalAppDB();
            return db.UserRegister.Any(u => u.Email == email);
        }


        public UserRegister IsLogin(UserLogin userLogin)
        {
            using var db = new CarRentalAppDB();
            var userAvaiable = db.UserRegister.Where(u => u.Email == userLogin.Email && u.Password == userLogin.Password).FirstOrDefault();


            return userAvaiable;
        }

    }
}
