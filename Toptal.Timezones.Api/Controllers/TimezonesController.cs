using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Toptal.Timezones.Entities;
using Toptal.Timezones.Repository;

namespace Toptal.Timezones.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class TimezonesController : Controller
    {
        private readonly ILogger<TimezonesController> _logger;
        private readonly IConfiguration _config;
        private readonly ITimezonesRepository _repository;

        public TimezonesController(ILogger<TimezonesController> logger,
          IConfiguration config,
          ITimezonesRepository repository)
        {
            this._logger = logger;
            this._config = config;
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAllTimezones());
            }
            catch (Exception exception)
            {
                _logger.LogError($"Error while getting the timezones. {exception}");
            }
            return BadRequest("Error while getting the timezones.");
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
