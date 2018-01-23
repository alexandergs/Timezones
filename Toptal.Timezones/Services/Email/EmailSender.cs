using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Toptal.TimeZones.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger _logger;

        public EmailSender(ILogger<EmailSender> logger)
        {
            this._logger = logger;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            this._logger.LogInformation($"{message}");
            return Task.CompletedTask;
        }
    }
}
