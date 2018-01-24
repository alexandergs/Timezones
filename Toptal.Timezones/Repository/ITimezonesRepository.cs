using System.Collections.Generic;
using Toptal.Timezones.Entities;

namespace Toptal.Timezones.Repository
{
    public interface ITimezonesRepository
    {
        IList<UserTimeZone> GetAllTimezones();
    }
}