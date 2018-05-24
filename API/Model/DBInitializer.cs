using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class DBInitializer
    {
        public static void Initialize(LibraryContext context)
        {

            //Create the db if not yet exists
            context.Database.EnsureCreated();

            if (!context.Games.Any())
            {
                
                var CDProjectRed = new Studio()
                {
                    Games = new List<Game>(),
                    Name = "CDProjekt Red",
                    Location = "Poland",
                    Site = "http://en.cdprojektred.com/",
                };
                context.Studios.Add(CDProjectRed);

                var Valve = new Studio()
                {
                    Games = new List<Game>(),
                    Name = "Valve Software",
                    Location = "United States",
                    Site = "https://www.valvesoftware.com",

                };
                context.Studios.Add(Valve);
                var Dice = new Studio()
                {
                    Name = "EA Digital Illusions CE",
                    Location = "Sweden",
                    Site = "http://www.dice.se/"
                };

                
                context.Studios.Add(Dice);

                var Bluehole = new Studio()
                {
                    Name = "Bluehole",
                    Location = "South-Korea",
                    Site = "https://www.bluehole.net/en/"
                };


                context.Studios.Add(Bluehole);

                var Psyonix = new Studio()
                {
                    Name = "Psyonix",
                    Location = "United States",
                    Site = "https://psyonix.com/"
                };


                context.Studios.Add(Psyonix);


                var witcher1 = new Game()
                {
                    Title = "The Witcher",
                    Category = "ActionRPG",
                    Studio = CDProjectRed,
                    Price = 19.99,
                    Cover = "https://images-na.ssl-images-amazon.com/images/I/81odfR7UoUL._SY445_.jpg",

                };
                context.Games.Add(witcher1);

                var witcher2 = new Game()
                {
                    Title = "The Witcher 2: Assassin of Kings",
                    Category = "ActionRPG",
                    Studio = CDProjectRed,
                    Price = 9.99,
                    Cover = "http://zalu.be/wp-content/uploads/2011/06/assoking.jpg",

                };
                context.Games.Add(witcher2);

                var game = new Game()
                {
                    Title = "The Witcher 3: Wild Hunt",
                    Category = "ActionRPG",
                    Studio = CDProjectRed,
                    Price = 39.99,
                    Cover = "https://tweakers.net/i/xkRV5K5AKi6NF3TtApA6SbbMPTY=/i/1403090908.jpeg",

                };
                context.Games.Add(game);



                var CounterStrike = new Game()
                {
                    Title = "Counter Strike : Global Offensive",
                    Category = "First Person Shooter",
                    Studio = Valve,
                    Price = 14.99,
                    Cover = "https://www.gamereactor.nl/media/87/counter_strike_538761.jpg",

                };
                context.Games.Add(CounterStrike);

                var BattleField3 = new Game()
                {
                    Title = "BattleField 3",
                    Category = "First Person Shooter",
                    Studio = Dice,
                    Price = 19.99,
                    Cover = "https://www.licente-jocuri.ro/image/data/imported_games/battlefield-3-592.jpg"
                };
                context.Games.Add(BattleField3);

                var BattleField4 = new Game()
                {
                    Title = "BattleField 4",
                    Category = "First Person Shooter",
                    Studio = Dice,
                    Price = 19.99,
                    Cover = "https://static.posters.cz/image/750/poster/battlefield-4-cover-i14536.jpg"
                };
                context.Games.Add(BattleField4);


                var BattleField = new Game()
                {
                    Title = "BattleField 1",
                    Category = "First Person Shooter",
                    Studio = Dice,
                    Price = 59.99,
                    Cover = "https://tko.ise.com.bd/wp-content/uploads/2017/01/bf1-product-image.jpg"
                };
                context.Games.Add(BattleField);

                var portal = new Game()
                {
                    Title = "Portal",
                    Category = "Puzzle",
                    Studio = Valve,
                    Price = 8.19,
                    Cover = "https://vignette.wikia.nocookie.net/half-life/images/6/6f/Portal.jpg/revision/latest?cb=20081209155217&path-prefix=en"
                };
                context.Games.Add(portal);

                var portal2 = new Game()
                {
                    Title = "Portal 2",
                    Category = "Puzzle",
                    Studio = Valve,
                    Price = 16.79,
                    Cover = "https://vignette.wikia.nocookie.net/half-life/images/8/89/Portal_2_cover.jpg/revision/latest?cb=20110102221935&path-prefix=en"
                };
                context.Games.Add(portal2);

                var pubg = new Game()
                {
                    Title = "Polayer Unknowns: Battlegrounds",
                    Category = "Action",
                    Studio = Bluehole,
                    Price = 29.99,
                    Cover = "https://static.giantbomb.com/uploads/scale_small/8/87790/2955325-box_pubg.png"
                };
                context.Games.Add(pubg);

                var rocketo = new Game()
                {
                    Title = "Rocket League",
                    Category = "Racing",
                    Studio = Psyonix,
                    Price = 19.99,
                    Cover = "https://microplay.com/media/catalog/product/cache/small_image/350x438/e9c3970ab036de70892d86c6d221abfe/6/2/6251_cover_1.jpg"
                };
                context.Games.Add(rocketo);




                context.SaveChanges();


            }
        }
    }
}
