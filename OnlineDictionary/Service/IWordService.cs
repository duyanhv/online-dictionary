using OnlineDictionary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineDictionary.Service
{
    public interface IWordService
    {
        WordModel GetById(int id);
        List<WordModel> GetAll(string filter = String.Empty);

    }
}
