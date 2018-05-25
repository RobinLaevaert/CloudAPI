using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Model;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/v1/games")]
    public class GamesController : Controller
    {
        private readonly LibraryContext context;
        public GamesController(LibraryContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public returning GetAllGames(string Category, string Title, int? page, double? price, string sort, int length = 5, string dir = "asc") {
            IQueryable<Game> query = context.Games;

            if (!string.IsNullOrWhiteSpace(Category))
                query = query.Where(d => d.Category.ToLower() == Category.ToLower());
            if (!string.IsNullOrWhiteSpace(Title))
                query = query.Where(d => d.Title.ToLower().Contains(Title.ToLower()));
            if (price.HasValue)
                query = query.Where(d => d.Price <= price);
            if (!string.IsNullOrWhiteSpace(sort)) {
                switch (sort) {
                    case "title":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Title);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Title);
                        break;
                    case "price":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Price);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Price);
                        break;
                    case "id":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.ID);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.ID);
                        break;
                }
            }
            query = query.Include(d => d.Studio);
            var numberOfPages = Math.Ceiling((double)query.Count() / 5);
            if (page.HasValue)
                query = query.Skip(page.Value * length);
            
            query = query.Take(length);
            var queryt = query.ToList();
            returning returner = new returning() { Games = queryt, Pages = numberOfPages};


            return returner;
        }
        public class returning{
            public List<Game> Games { get; set; }
            public double Pages { get; set; }
        }

        [HttpPost]
        public IActionResult CreateGame([FromBody] Game newGame) {
            
            context.Games.Add(newGame);
            context.SaveChanges();
            return Created("", newGame);
        }

        [HttpPut]
        public IActionResult UpdateGame([FromBody] Game updatedGame) {
            var orgGame = context.Games.Find(updatedGame.ID);
            if (orgGame == null)
                return NotFound();
            orgGame.Title = updatedGame.Title;
            orgGame.Price = updatedGame.Price;
            orgGame.Cover = updatedGame.Cover;
            orgGame.Category = updatedGame.Category;
            orgGame.Studio = updatedGame.Studio;
            context.SaveChanges();
            return Ok(orgGame);
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetGame(int id) {
            var game = context.Games
                        .Include(d => d.Studio).SingleOrDefault(d => d.ID == id);
            if (game == null)
                return NotFound();

            return Ok(game);                    
        }

        [Route("{id}/studio")]
        [HttpGet]
        public IActionResult GetStudioForGame(int id) {
            var game = context.Games
                .Include(d => d.Studio)
                .SingleOrDefault(d => d.ID == id);
            if (game == null)
                return NotFound();

            return Ok(game.Studio);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteGame(int id)
        {
            var game = context.Games.Find(id);
            if (game == null)
                return NotFound();

            context.Games.Remove(game);
            context.SaveChanges();
            return NoContent();
        }

    }
}
