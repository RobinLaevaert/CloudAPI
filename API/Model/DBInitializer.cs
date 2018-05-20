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
                    Name = "CD Project Red",
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

                var BattleField = new Game()
                {
                    Title = "BattleField 1",
                    Category = "First Person Shooter",
                    Studio = Dice,
                    Price = 59.99,
                    Cover = "https://tko.ise.com.bd/wp-content/uploads/2017/01/bf1-product-image.jpg"
                };
                context.Games.Add(BattleField);

                
                
                

                context.SaveChanges();


            }
        }
    }
}
