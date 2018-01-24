using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Toptal.Timezones.Web.Models.Identity;
using Toptal.Timezones.Web.Session;
using Toptal.Timezones.Web.Models;
using Toptal.Timezones.Web.Models.ViewModels;
using Toptal.TimeZones.Services;
using Toptal.Timezones.Web.AccountHelpers;

namespace Toptal.TimeZones.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<AppIdentityUser> _signInManager;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly RoleManager<AppIdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        private SessionContext _sessionContext;

        public AccountController(ILogger<AccountController> logger,
          SignInManager<AppIdentityUser> signInManager,
          UserManager<AppIdentityUser> userManager,
          RoleManager<AppIdentityRole> roleManager,
          IConfiguration config,
          IEmailSender emailSender)
        {
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _emailSender = emailSender;
        }

        [HttpGet]
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
            _sessionContext = new SessionContext(this.HttpContext);
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.UserName,
                  model.Password,
                  model.RememberMe,
                  false);

                if (result.Succeeded)
                {
                    await SetBearerTokem(model);

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

        private async Task SetBearerTokem(LoginViewModel model)
        {
            var tokenInfo = await CreateTokenAsync(model);
            _sessionContext.SessionTokenInfo = tokenInfo;
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
        [Authorize]
        public async Task<IActionResult> GetBearerToken()
        {
            _sessionContext = new SessionContext(this.HttpContext);
            if (_sessionContext.SessionTokenInfo == null)
            {
                var currentUser = await _userManager.GetUserAsync(this.User);
                await SetBearerTokem(new LoginViewModel
                {
                    UserName = currentUser.UserName,
                    Password = currentUser.PasswordHash
                });
            }
            return Ok(_sessionContext.SessionTokenInfo);
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

        public async Task<BearerTokenInfo> CreateTokenAsync(LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                if (result.Succeeded)
                {
                    var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                    // Create the token
                    var claims = new[]
                    {
                          new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                          new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                          new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
                          new Claim("roles", role)
                };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                      _config["Tokens:Issuer"],
                      _config["Tokens:Audience"],
                      claims,
                      expires: DateTime.Now.AddMinutes(30),
                      signingCredentials: creds);

                    var results = new BearerTokenInfo
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        Expiration = token.ValidTo
                    };

                    return results;
                }
            }
            return null;
        }

        [HttpGet]
        [Authorize(Roles = RoleNames.Admin)]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = _userManager.Users.OrderBy(user => user.Email);
                var result = users.Select(user => new AppUserInfoViewModel
                {
                    Email = user.Email,
                    UserName = user.UserName
                }).ToList();

                foreach (var user in users)
                {
                    var currentUser = result.First(u => u.Email == user.Email);
                    currentUser.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                }

                return Ok(result);
            }
            catch (Exception exception)
            {
                _logger.LogError($"Error while retrieving users. {exception}");
            }

            return StatusCode(500);
        }

        [HttpPut]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<IActionResult> UpdateUserRole(string id, [FromBody]AppUserInfoViewModel userInfo)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentUser = await _userManager.FindByNameAsync(userInfo.Email);
                    var roles = await _userManager.GetRolesAsync(currentUser);
                    await _userManager.RemoveFromRolesAsync(currentUser, roles.ToArray());
                    if (!String.IsNullOrWhiteSpace(userInfo.Role))
                        await _userManager.AddToRoleAsync(currentUser, userInfo.Role);

                    return Ok(userInfo);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save user role: {ex}");
            }

            return BadRequest("Failed to save user role");
        }

        [HttpDelete]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentUser = await _userManager.FindByNameAsync(id);
                    var result = await _userManager.DeleteAsync(currentUser);
                    if (result.Succeeded)
                    {
                        return Ok(id);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete user: {ex}");
            }

            return BadRequest("Failed to delete user");
        }
    }
}