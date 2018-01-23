using System.Threading.Tasks;

namespace Toptal.TimeZones.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
