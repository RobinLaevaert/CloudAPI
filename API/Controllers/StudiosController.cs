using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Model;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/v1/studios")]
    public class StudiosController : Controller
    {
        private readonly LibraryContext context;
        public StudiosController(LibraryContext context) {
            this.context = context;
        }

        [HttpPut]
        public IActionResult UpdateStudio([FromBody] Studio UpdateStudio)
        {
            var orgStudio = context.Studios.Find(UpdateStudio.ID);
            if (orgStudio == null) { return NotFound(); }
            orgStudio.Name = UpdateStudio.Name;
            orgStudio.Location = UpdateStudio.Name;
            orgStudio.Site = UpdateStudio.Site;
            orgStudio.Games = UpdateStudio.Games;
            context.SaveChanges();
            return Ok(orgStudio);
        }
        // GET: api/values
        [HttpGet]
        public List<Studio> GetAllStudios()
        {

            return context.Studios.ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetStudio(int id)
        {
            var studio = context.Studios.Find(id);
            if (studio == null)
                return NotFound();
            return Ok(studio);
        }





        // POST api/values
        [HttpPost]
        public IActionResult CreateStudio([FromBody] Studio newStudio)
        {
            context.Studios.Add(newStudio);
            context.SaveChanges();
            return Created("", newStudio);
        }


        

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteStudio(int id)
        {
            var Studio = context.Studios.Find(id);
            if (Studio == null) { return NotFound(); }
            context.Studios.Remove(Studio);
            context.SaveChanges();
            return NoContent();
        }
    }
}
