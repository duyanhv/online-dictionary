﻿using OnlineDictionary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineDictionary.Service
{
    public interface IUserService
    {
        bool Authenticate(LoginModel data);
    }
}
