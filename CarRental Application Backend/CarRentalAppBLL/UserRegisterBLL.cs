using AutoMapper;
using CarRentalAppBLL.DataTransferObject_DTO_;
using CarRentalAppDAL.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarRentalAppBLL
{
   public class UserRegisterBLL
    {

        private CarRentalAppDAL.UserRegisterDAL _DAL;
        private Mapper _UsersRegisterMapper;
        private Mapper _UserLoginMapper;

        public UserRegisterBLL()
        {
            _DAL = new CarRentalAppDAL.UserRegisterDAL();

            var _configUsersRegister = new MapperConfiguration(cfg => cfg.CreateMap<UserRegister, UserRegisterDTO>().ReverseMap());
            _UsersRegisterMapper = new Mapper(_configUsersRegister);


            var _configLogin = new MapperConfiguration(cfg => cfg.CreateMap<UserLogin, UserLoginDTO>().ReverseMap());
            _UserLoginMapper = new Mapper(_configLogin);

        }

        public List<UserRegisterDTO> GetUsersRegister()
        {
            List<UserRegister> usersRegisterFromDb = _DAL.GetUsersRegister();
            List<UserRegisterDTO> usersRegisterM = _UsersRegisterMapper.Map<List<UserRegister>, List<UserRegisterDTO>>(usersRegisterFromDb);
            return usersRegisterM;
        }

        public bool AddUsersRegister(UserRegisterDTO usersRegisterM)
        {

            if (IsEmailExists(usersRegisterM.Email))
            {
                return true;
            }
            else
            {
                UserRegister usersRegisterEntity = _UsersRegisterMapper.Map<UserRegisterDTO, UserRegister>(usersRegisterM);
                _DAL.AddUsersRegister(usersRegisterEntity);
                return false;
            }

        }

        private bool IsEmailExists(string email)
        {
            return _DAL.IsEmailExists(email);
        }

        public UserRegisterDTO UserLoggedIn(UserLoginDTO userLoginM)
        {
            var userLogin = new UserLogin { Email = userLoginM.Email, Password = userLoginM.Password };
            var LoginUserFromDB = _DAL.IsLogin(userLogin);

            UserRegisterDTO usersLoginM = _UsersRegisterMapper.Map<UserRegister, UserRegisterDTO>(LoginUserFromDB);

            return usersLoginM;


        }
    }
}
