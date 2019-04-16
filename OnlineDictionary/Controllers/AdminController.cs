using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineDictionary.Models;
using OnlineDictionary.Service;

namespace OnlineDictionary.Controllers
{
    public class AdminController : Controller
    {
        private IWordService _wordService;
        public AdminController(IWordService wordService)
        {
            _wordService = wordService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddWord(WordModel word)
        {
            _wordService.GetAll();
            return Json(new { success = true });
        }
    }
}