using System;
using System.Collections.Generic;

namespace Toptal.Timezones.Entities
{
    public partial class UserTimeZone
    {
        public string UserEmail { get; set; }
        public string CityName { get; set; }
        public string TimeZoneName { get; set; }
        public DateTime TimeZoneTime { get; set; }
        public User UserEmailNavigation { get; set; }
    }
}
