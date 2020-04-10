using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Leagues
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var league = new League
                {
                    Id = request.Id,
                    Title = request.Title
                };
                _context.Leagues.Add(league);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}