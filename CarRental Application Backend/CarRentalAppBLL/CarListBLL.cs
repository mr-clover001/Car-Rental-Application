using AutoMapper;
using CarRental_Application_Backend.Repository.Entities;
using CarRentalAppBLL.DataTransferObject_DTO_;
using System.Collections.Generic;

namespace CarRentalAppBLL
{
    public class CarListBLL
    {
        private CarRentalAppDAL.CarListDAL _DAL;
        private IMapper _CarMapper; // Declare IMapper instance

        public CarListBLL()
        {
            _DAL = new CarRentalAppDAL.CarListDAL();

            var _configCar = new MapperConfiguration(cfg => cfg.CreateMap<CarLists, CarListDTO>().ReverseMap());
            _CarMapper = new Mapper(_configCar); // Initialize IMapper

            // Note: You should not declare 'Mapper' as a static class.
        }

        public List<CarListDTO> GetCarList()
        {
            List<CarLists> carDetailFromDb = _DAL.GetCarList();
            List<CarListDTO> mappedCarDetail = _CarMapper.Map<List<CarLists>, List<CarListDTO>>(carDetailFromDb);
            return mappedCarDetail;
        }

        public CarListDTO GetCarDetailById(int vechicleId)
        {
            var carListEntity = _DAL.GetCarDetailById(vechicleId);
            CarListDTO carListModel = _CarMapper.Map<CarLists, CarListDTO>(carListEntity);
            return carListModel;
        }

        public CarListDTO UpdateCarDetail(int vechicleId, CarListDTO updatedCar)
        {
            CarListDTO carDTO = GetCarDetailById(vechicleId);
            CarLists carEntity = _CarMapper.Map<CarListDTO, CarLists>(carDTO);

            if (carEntity != null)
            {
                carEntity.Maker = updatedCar.Maker;
                carEntity.Model = updatedCar.Model;
                carEntity.Color = updatedCar.Color;
                carEntity.ImageFileName = updatedCar.ImageFileName;
                carEntity.RentalPrice = updatedCar.RentalPrice;
                carEntity.AvailablityStatus = updatedCar.AvailablityStatus;

                var data = _DAL.UpdateCarDetail(carEntity);
                CarListDTO carM = _CarMapper.Map<CarLists, CarListDTO>(data);
                return carM;
            }

            return null;
        }

        public void AddCarDetail(CarListDTO carListDTO)
        {
            CarLists carEntity = _CarMapper.Map<CarListDTO, CarLists>(carListDTO);
            _DAL.AddCarDetail(carEntity);
        }

        public void DeleteCarDetail(int id)
        {
            _DAL.DeleteCarDetail(id);
        }
    }
}
