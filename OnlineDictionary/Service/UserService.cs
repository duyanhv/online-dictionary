using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineDictionary.Models;

namespace OnlineDictionary.Service
{
    public class UserService : IUserService
    {
        private const string ROLE_ADMIN = "ADMIN";
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        private List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "admin", Password = "admin", Role = ROLE_ADMIN },
            new User { Id = 2, Username = "test", Password = "test" }
        };
        public bool Authenticate(LoginModel data)
        {
            var user = _users.SingleOrDefault(x => x.Username == data.Username && x.Password == data.Password);

            // return null if user not found
            if (user == null)
            {
                return false;
            }
            return true;
        }
    }
}
