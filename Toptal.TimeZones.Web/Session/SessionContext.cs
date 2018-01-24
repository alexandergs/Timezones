using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Toptal.Timezones.Web.Models;

namespace Toptal.Timezones.Web.Session
{
    public class SessionContext
    {
        private static HttpContext _httpContext;
        const string SESSION_TOKEN_INFO_KEY = "SESSION_TOKEN_INFO_KEY";

        public SessionContext(HttpContext httpContext)
        {
            _httpContext = httpContext;
        }
        public BearerTokenInfo SessionTokenInfo
        {
            get
            {
                return _httpContext.Session.Get<BearerTokenInfo>(SESSION_TOKEN_INFO_KEY);
            }
            set
            {
                _httpContext.Session.Set<BearerTokenInfo>(SESSION_TOKEN_INFO_KEY, value);
            }
        }

    }
}
