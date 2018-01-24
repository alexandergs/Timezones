using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Toptal.Timezones.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles="Admin")]
    public class UserManagementController : Controller
    {
        // GET api/users
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/users
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
