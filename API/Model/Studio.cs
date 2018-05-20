using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Studio
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Site { get; set; }
        [JsonIgnore]
        public ICollection<Game> Games { get; set; }
    }
}
