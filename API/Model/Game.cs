using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Game
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        
        public double Price { get; set; }
        public string Cover { get; set; }
        public Studio Studio { get; set; }

    }
}
