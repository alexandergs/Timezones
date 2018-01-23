using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Toptal.Timezones.Entities.Identity
{
    public class AppIdentityRole : IdentityRole
    {
        public AppIdentityRole()
        { }

        public AppIdentityRole(string roleName) : base(roleName)
        {
        }
    }
}
