using OnlineDictionary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineDictionary.Service
{
    public interface IUserService
    {
        string Authenticate(string username, string password);
    }
}
