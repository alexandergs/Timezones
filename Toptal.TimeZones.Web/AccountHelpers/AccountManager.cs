using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Toptal.Timezones.Entities.Identity;

namespace Toptal.Timezones.Web.AccountHelpers
{
    public class AccountManager : IAccountManager
    {
        private readonly ILogger<AccountManager> _logger;
        private readonly SignInManager<AppIdentityUser> _signInManager;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly RoleManager<AppIdentityRole> _roleManager;
        private readonly IConfiguration _config;


        const string DEFAULT_ADMIN_EMAIL_KEY = "AccountDefaults:DefaultAdmin:Email";
        const string DEFAULT_ADMIN_PASSWORD_KEY = "AccountDefaults:DefaultAdmin:Password";
        const string DEFAULT_ROLES_KEY = "AccountDefaults:Roles";



        public AccountManager(ILogger<AccountManager> logger,
          SignInManager<AppIdentityUser> signInManager,
          UserManager<AppIdentityUser> userManager,
          RoleManager<AppIdentityRole> roleManager,
          IConfiguration config)
        {
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
        }
        public async Task CreateAccountDefaults()
        {
            try
            {
                //initializing custom roles 
                string[] roleNames = _config[DEFAULT_ROLES_KEY].Split(",");

                IdentityResult roleResult;

                foreach (var roleName in roleNames)
                {
                    var roleExist = await _roleManager.RoleExistsAsync(roleName);
                    if (!roleExist)
                    {
                        //create the roles and seed them to the database: Question 1
                        roleResult = await _roleManager.CreateAsync(new AppIdentityRole(roleName));
                    }
                }
            }
            catch (Exception exception)
            {
                _logger.LogError($"Error while creating default roles. {exception}");
            }

            try
            {
                //Here you could create a super user who will maintain the web app
                var powerUser = new AppIdentityUser
                {
                    UserName = _config[DEFAULT_ADMIN_EMAIL_KEY],
                    Email = _config[DEFAULT_ADMIN_EMAIL_KEY],
                    PasswordHash = _config[DEFAULT_ADMIN_PASSWORD_KEY]
                };

                //Ensure you have these values in your appsettings.json file
                var _user = await _userManager.FindByEmailAsync(powerUser.Email);

                if (_user == null)
                {
                    var createPowerUser = await _userManager.CreateAsync(powerUser, powerUser.PasswordHash);
                    if (createPowerUser.Succeeded)
                    {
                        //here we tie the new user to the role
                        await _userManager.AddToRoleAsync(powerUser, RoleNames.Admin);

                    }
                }
                else
                {
                    await _userManager.AddToRoleAsync(_user, RoleNames.Admin);
                }
            }
            catch (Exception exception)
            {
                _logger.LogError($"Error while creating default Admin user. {exception}");
            }
        }
    }
}
