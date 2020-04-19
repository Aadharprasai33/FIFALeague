using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class seedData
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Leagues.Any())
            {
                var leagues = new List<League>
                {
                    new League {
                        Title = "League 1",
                        Description = "This is league 1",
                        Date = DateTime.Now.AddMonths(3)
                    },

                    new League {
                        Title = "League 2",
                        Description = "This is league 2",
                        Date = DateTime.Now.AddMonths(-8)
                    },

                    new League {
                        Title = "League 3",
                        Description = "This is league 3",
                        Date = DateTime.Now.AddMonths(-7)
                    },

                    new League {
                        Title = "League 4",
                        Description = "This is league 4",
                        Date = DateTime.Now.AddMonths(-3)
                    },

                    new League {
                        Title = "League 5",
                        Description = "This is league 5",
                        Date = DateTime.Now.AddMonths(-5)
                        
                    },

                    new League {
                        Title = "League 6",
                        Description = "This is league 6",
                        Date = DateTime.Now.AddMonths(-1)
                    }
                     
                };

                context.Leagues.AddRange(leagues);
                context.SaveChanges();
            }
        }
    }
}