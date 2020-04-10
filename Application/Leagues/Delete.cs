using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Leagues
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

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
                var league = await _context.Leagues.FindAsync(request.Id);

                if (league == null)
                    throw new Exception("Couldnot find league");

                _context.Remove(league);
                  
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}