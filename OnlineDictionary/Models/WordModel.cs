using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineDictionary.Models
{
    public class WordModel
    {
        public string Word { get; set; }
        public string Description { get; set; }
        public string Verbose { get; set; }
        public string Pos { get; set; }

        public string Id { get; set; }
    }
}
