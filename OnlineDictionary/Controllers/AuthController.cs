using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using  Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Mvc;
using OnlineDictionary.Models;
using OnlineDictionary.Service;
using Microsoft.AspNetCore.Http;

namespace OnlineDictionary.Controllers
{
    public class AuthController : Controller
    {
        private const string SESSION_USERNAME = "Username";
        private const string SESSION_ROLE = "Role";
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
            if (result != null)
            {
                HttpContext.Session.SetString(SESSION_USERNAME, result.Username);
                HttpContext.Session.SetString(SESSION_ROLE, result.Role ?? String.Empty);
            }
            bool hasRole = result != null && result.Role != null;
            return Json(new { success =  result != null, hasRole });
        }
        private bool CheckAuthentication()
        {
            if (String.IsNullOrWhiteSpace(HttpContext.Session.GetString(SESSION_USERNAME)) || String.IsNullOrWhiteSpace(HttpContext.Session.GetString(SESSION_ROLE)))
            {
                return false;
            }
            return true;
        }
        [HttpGet]
        public IActionResult LogOut()
        {
            if (!CheckAuthentication())
            {
                return Redirect("/Auth/Login");
            };
            HttpContext.Session.Clear();
            return Redirect("/Auth/Login");
        }
    }
}