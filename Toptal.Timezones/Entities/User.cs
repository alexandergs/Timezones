using System;
using System.Collections.Generic;

namespace Toptal.Timezones.Entities
{
    public partial class User
    {
        public User()
        {
            UserTimeZone = new HashSet<UserTimeZone>();
        }

        public string Email { get; set; }

        public ICollection<UserTimeZone> UserTimeZone { get; set; }
    }
}
