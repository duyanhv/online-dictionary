﻿using System;
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
            var hey = _wordService.GetAll("t");
            return View();
        }

        [HttpPost]
        public IActionResult CreateWord(WordModel word)
        {
            bool result = _wordService.Create(word);
            return Json(new { success = result });
        }


        [HttpPost]
        public IActionResult EditWord(string id, WordModel word)
        {
            bool result = _wordService.Edit(id, word);
            return Json(new { success = result });
        }

        [HttpGet]
        public IActionResult DeactivateWord(string id)
        {
            bool result = _wordService.Deactivate(id);
            return Json(new { success = result });
        }

        [HttpGet]
        public IActionResult GetAllWord(string id)
        {
            var result = _wordService.GetAll(id);
            return Json(new { Data = result });
        }
    }
}