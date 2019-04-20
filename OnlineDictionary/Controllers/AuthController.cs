using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineDictionary.Models;
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
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginModel data)
        {
            var result  = _userService.Authenticate(data);
            //Session["Username"] = "hey";
            return Json(new { success =  result });
        }
    }
}