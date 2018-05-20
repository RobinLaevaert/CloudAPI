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

                var Witcher3 = new Game()
                {
                    Title = "The Witcher 3: Wild Hunt",
                    Category = "ActionRPG",

                    Price = 39.99,
                    Cover = "https://tweakers.net/i/xkRV5K5AKi6NF3TtApA6SbbMPTY=/i/1403090908.jpeg",

                };

                var CounterStrike = new Game()
                {
                    Title = "Counter Strike : Global Offensive",
                    Category = "First Person Shooter",

                    Price = 14.99,
                    Cover = "https://www.gamereactor.nl/media/87/counter_strike_538761.jpg",

                };

                var CDProjectRed = new Studio()
                {
                    Games = new List<Game>(),
                    Name = "CD Project Red",
                    Location = "Poland",
                    Site = "http://en.cdprojektred.com/",
                };


                var Valve = new Studio()
                {
                    Games = new List<Game>() { CounterStrike },
                    Name = "Valve Software",
                    Location = "United States",
                    Site = "https://www.valvesoftware.com",

                };

                var Dice = new Studio()
                {
                    Name = "EA Digital Illusions CE",
                    Location = "Sweden",
                    Site = "http://www.dice.se/"
                };

                Witcher3.Studio = CDProjectRed;
                CounterStrike.Studio = Valve;
                context.Studios.Add(Valve);
                context.Studios.Add(CDProjectRed);
                context.Games.Add(Witcher3);
                context.Games.Add(CounterStrike);

                context.SaveChanges();


            }
        }
    }
}
