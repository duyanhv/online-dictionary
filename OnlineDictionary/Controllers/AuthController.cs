using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineDictionary.Service;

namespace OnlineDictionary.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        private IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}