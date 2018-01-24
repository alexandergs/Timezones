using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using Toptal.Timezones.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Toptal.Timezones.Repository
{
    public class TimezonesRepository : ITimezonesRepository
    {
        private readonly TimezonesContext _context;
        private readonly ILogger<TimezonesRepository> _logger;
        public TimezonesRepository(TimezonesContext context, ILogger<TimezonesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IList<UserTimeZone> GetAllTimezones()
        {
            return _context.UserTimeZone.OrderBy(utz => utz.UserEmail).ToList();
        }
    }
}
