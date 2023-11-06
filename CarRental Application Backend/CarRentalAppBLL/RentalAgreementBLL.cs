using AutoMapper;
using CarRentalAppDAL.Repository.Entities;
using CarRentalAppBLL.DataTransferObject_DTO_;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarRentalAppBLL
{
   public class RentalAgreementBLL
    {

        private CarRentalAppDAL.RentalAgreementDAL _DAL;
        private IMapper _RentalMapper;

        public RentalAgreementBLL()
        {
            _DAL = new CarRentalAppDAL.RentalAgreementDAL();

            var _configCar = new MapperConfiguration(cfg => cfg.CreateMap<RentalAgreement, RentalAgreementDTO>().ReverseMap());
            _RentalMapper = new Mapper(_configCar); // Initialize IMapper

            
        }

        public List<RentalAgreementDTO> GetRentalAgreements()
        {
            List<RentalAgreement> rentalAgreementFromDb = _DAL.GetRentalAgreements();
            List<RentalAgreementDTO> mappedRentalAgreement = _RentalMapper.Map<List<RentalAgreement>, List<RentalAgreementDTO>>(rentalAgreementFromDb);
            return mappedRentalAgreement;
        }

        public RentalAgreementDTO GetRentalAgreementsById(int id)
        {
            var rentalAgreementEntity = _DAL.GetRentalAgreementsById(id);
            RentalAgreementDTO rentalAgreementModel = _RentalMapper.Map<RentalAgreement, RentalAgreementDTO>(rentalAgreementEntity);
            return rentalAgreementModel;
        }

        /*   public RentalAgreementDTO GetRentalAgreementsByEmail(string email)
           {
               var rentalAgreementEntity = _DAL.GetRentalAgreementsByEmail(email);
               RentalAgreementDTO rentalAgreementModel = _RentalMapper.Map<RentalAgreement, RentalAgreementDTO>(rentalAgreementEntity);
               return rentalAgreementModel;
           }
        */

        public List<RentalAgreementDTO> GetRentalAgreementsByEmail(string email)
        {
            List<RentalAgreement> rentalAgreementEntities = _DAL.GetRentalAgreementsByEmail(email);
            List<RentalAgreementDTO> rentalAgreementModels = _RentalMapper.Map<List<RentalAgreement>, List<RentalAgreementDTO>>(rentalAgreementEntities);
            return rentalAgreementModels;
        }

        public void AddRentalAgreement(RentalAgreementDTO rentalAgreementDTO)
        {
            RentalAgreement rentalEntity = _RentalMapper.Map<RentalAgreementDTO, RentalAgreement>(rentalAgreementDTO);
            _DAL.AddRentalAgreement(rentalEntity);
        }

        public void DeleteRentalAgreement(int id)
        {
            _DAL.DeleteRentalAgreement(id);
        }
    }
}
