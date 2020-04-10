using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Leagues
{
    public class Details
    {
        public class Query : IRequest<League>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, League>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<League> Handle(Query request, CancellationToken cancellationToken)
            {
                var league = await _context.Leagues.FindAsync(request.Id);

                return league;
            }
        }
    }
}