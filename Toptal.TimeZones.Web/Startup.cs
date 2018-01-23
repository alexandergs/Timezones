using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Toptal.Timezones.AccountManagement;
using Toptal.Timezones.Entities;
using Toptal.Timezones.Entities.Identity;
using Toptal.TimeZones.Services;

namespace Toptal.TimeZones.Web
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _env;

        public Startup(IConfiguration config, IHostingEnvironment env)
        {
            _config = config;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<AppIdentityUser, AppIdentityRole>(cfg =>
            {
                cfg.User.AllowedUserNameCharacters = "";
                cfg.User.RequireUniqueEmail = true;
                cfg.SignIn.RequireConfirmedEmail = true;
                cfg.SignIn.RequireConfirmedPhoneNumber = false;
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddDefaultTokenProviders();

            services.AddDbContext<AppIdentityDbContext>(cfg =>
            {
                cfg.UseSqlServer(_config.GetConnectionString("AspnetIdentityDB"));
            });

            services.AddAuthentication().AddCookie();

            services.AddTransient<IEmailSender, EmailSender>();

            services.AddMvc(opt =>
            {
                if (_env.IsProduction() && _config["DisableSSL"] != "true")
                {
                    opt.Filters.Add(new RequireHttpsAttribute());
                }
            })
            .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddTransient<IAccountManager, AccountManager>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", Action = "Index" }
                    );
            });

            // Seed the database
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var accountManager = scope.ServiceProvider.GetService<IAccountManager>();
                accountManager.CreateAccountDefaults().Wait();
            }
        }
    }
}
