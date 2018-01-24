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

        public IList<UserTimeZone> GetTimezonesByUser(string email)
        {
            return _context.UserTimeZone.Where(tz => tz.UserEmail == email).OrderBy(utz => utz.CityName).ToList();
        }

        public void UpdateTimezone(UserTimeZone userTimeZone)
        {
            _context.Attach(userTimeZone);
        }

        public void AddTimeZone(UserTimeZone userTimeZone)
        {
            if(_context.User.FirstOrDefault(tz => tz.Email == userTimeZone.UserEmail) == null)
                _context.User.Add(new User { Email = userTimeZone.UserEmail });
            _context.Add(userTimeZone);
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

    }
}
