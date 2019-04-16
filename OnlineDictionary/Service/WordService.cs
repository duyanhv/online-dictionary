using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineDictionary.Models;

namespace OnlineDictionary.Service
{
    public class WordService : IWordService
    {
        public List<WordModel> GetAll(string filter = null)
        {
            return new List<WordModel>();
        }

        public WordModel GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
