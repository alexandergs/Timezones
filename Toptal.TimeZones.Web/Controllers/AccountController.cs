using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Toptal.Timezones.Entities.Identity;
using Toptal.TimeZones.Services;
using Toptal.TimeZones.Web.ViewModels;

namespace Toptal.TimeZones.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<AppIdentityUser> _signInManager;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;



        public AccountController(ILogger<AccountController> logger,
          SignInManager<AppIdentityUser> signInManager,
          UserManager<AppIdentityUser> userManager,
          IConfiguration config,
          IEmailSender emailSender)
        {
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
            _config = config;
            _emailSender = emailSender;
        }

        public IActionResult Login()
        {
            if (this.User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username,
                  model.Password,
                  model.RememberMe,
                  false);

                if (result.Succeeded)
                {
                    if (Request.Query.Keys.Contains("ReturnUrl"))
                    {
                        return Redirect(Request.Query["ReturnUrl"].First());
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
            }

            ModelState.AddModelError("", "Failed to login");

            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterUserViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = new AppIdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await this._userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var confirmationCode =
                     await this._userManager.GenerateEmailConfirmationTokenAsync(user);

                var callbackurl = Url.Action(
                    controller: "Account",
                    action: "ConfirmEmail",
                    values: new { userId = user.Id, code = confirmationCode },
                    protocol: Request.Scheme);

                await this._emailSender.SendEmailAsync(
                    email: user.Email,
                    subject: "Confirm Email",
                    message: callbackurl);

                return RedirectToAction("Index", "Home");
            }

            foreach (IdentityError error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return View(model);
        }


        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
                return RedirectToAction("Index", "Home");

            var user = await this._userManager.FindByIdAsync(userId);
            if (user == null)
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");

            var result = await this._userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
                return View("ConfirmEmail");

            return RedirectToAction("Index", "Home");
        }

    }
}