using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Leagues.Any())
            {
                var leagues = new List<League>
                {
                    new League {
                        Title = "League 1"
                    },

                    new League {
                        Title = "League 2"
                    },

                    new League {
                        Title = "League 3"
                    },

                    new League {
                        Title = "League 4"
                    },

                    new League {
                        Title = "League 5"
                    },

                    new League {
                        Title = "League 6"
                    }
                     
                };

                context.Leagues.AddRange(leagues);
                context.SaveChanges();
            }
        }
    }
}