using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Infrastructure.Data.Config;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)    //constructor for access to our configuration that's being injected to our startup class
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)    //method to configure services
        {

            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();          //service to add controllers


            services.AddDbContext<StoreContext>( x => 
                    x.UseSqlite(_config.GetConnectionString("DefaultConnection")));

            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions.Parse(_config.GetConnectionString("Redis"),
                true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddDbContext<AppIdentityDbContext>(x =>
            {
                x.UseSqlite(_config.GetConnectionString("IdentityConnection"));
            });

            services.Configure<SMTPConfiguration>(_config.GetSection("SMTPConfig"));  //SMTPConfiguration

            services.AddApplicationServices();

            services.AddIdentityServices(_config);

            services.AddControllersWithViews();

            

            services.AddSwaggerDocumentation();
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                { 
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();  //commenting UseDeveloperExceptionPage and add this

            // if (env.IsDevelopment())           //check if we are in development mode
            // {
            //     //app.UseDeveloperExceptionPage();      //developer encounters exception
            //     app.UseSwagger();
            //     app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            // }

            app.UseStatusCodePagesWithReExecute("/errors/{0}");    //middeleware for not found endpoint error handler

            app.UseHttpsRedirection();     //middleware

            app.UseRouting();              //middleware
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");
            /*app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());*/
            //app.UseHttpsRedirection();
            app.UseAuthentication();

            app.UseAuthorization();         //middleware

            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>           //middleware to know which endpoints are available inside our controller so that they can be routed to
            {
                endpoints.MapControllers();
            });

        }
    }
}
