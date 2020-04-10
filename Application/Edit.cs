using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application
{
    public class Edit
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
                var league = await _context.Leagues.FindAsync(request.Id);

                if(league == null)
                
                    throw new Exception("Could not find activity");
                
                league.Title = request.Title ?? league.Title;


                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}