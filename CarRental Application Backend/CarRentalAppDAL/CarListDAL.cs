using CarRental_Application_Backend.Repository;
using CarRental_Application_Backend.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarRentalAppDAL
{
    public class CarListDAL
    {

        public List<CarLists> GetCarList()
        {
            var db = new CarRentalAppDB();
            return db.CarLists.ToList();
        }

        public CarLists GetCarDetailById(int vechicleId)
        {
            var db = new CarRentalAppDB();
            CarLists carList = new CarLists();

            carList = db.CarLists.FirstOrDefault(x => x.VechicleId == vechicleId);

            return carList;
        }


        public CarLists UpdateCarDetail(CarLists carList)
        {
            using (var db = new CarRentalAppDB())
            {

                var existingCar = db.CarLists.Find(carList.VechicleId);

                if (existingCar != null)
                {
                    // Update the properties of the existing product with the new values
                    existingCar.Maker = carList.Maker;
                    existingCar.Model = carList.Model;
                    existingCar.Color = carList.Color;
                    existingCar.ImageFileName = carList.ImageFileName;
                    existingCar.RentalPrice = carList.RentalPrice;
                    existingCar.AvailablityStatus = carList.AvailablityStatus;

                    // Save the changes to the database
                    db.SaveChanges();



                    return existingCar;

                }
            }

            return null;
        }


        public void AddCarDetail(CarLists carlist)
        {
            var db = new CarRentalAppDB();
            db.Add(carlist);
            db.SaveChanges();
        }


        public void DeleteCarDetail(int vechicleId)
        {
            var db = new CarRentalAppDB();
            var carList = db.CarLists.FirstOrDefault(x => x.VechicleId == vechicleId);

            if (carList != null)
            {
                db.CarLists.Remove(carList);
                db.SaveChanges();
            }
        }
    }
}
