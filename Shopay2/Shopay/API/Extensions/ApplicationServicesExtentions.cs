using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions
{
    public static class ApplicationServicesExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)  //method
        {
            services.AddScoped<ITokenService,TokenService>();    //addscoped = lifetime method 
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.AddScoped<IAccountRepository, AccountRepository>();


            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                                .Where(e => e.Value.Errors.Count > 0)
                                .SelectMany(x => x.Value.Errors)
                                .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
        
    }
}