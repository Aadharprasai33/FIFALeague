using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Leagues
{
    public class List
    {
        public class Query : IRequest<List<League>> { }

        public class Handler : IRequestHandler<Query, List<League>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }


            public async Task<List<League>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var leagues = await _context.Leagues.ToListAsync();

                return leagues;
            }
        }
    }
}