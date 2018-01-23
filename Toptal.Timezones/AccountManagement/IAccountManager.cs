using System.Threading.Tasks;

namespace Toptal.Timezones.AccountManagement
{
    public interface IAccountManager
    {
        Task CreateAccountDefaults();
    }
}