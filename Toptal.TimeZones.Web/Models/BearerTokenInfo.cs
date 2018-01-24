using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Toptal.Timezones.Web.Models
{
    public class BearerTokenInfo
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
