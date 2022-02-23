using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManangerExtensions
    {
        public static async Task<AppUser> FindByEmailWithAddressAsync(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
           var email = user?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email)?.Value;
           return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }
        public static async Task<AppUser> FindByEmailClaimsPrinciple(this UserManager<AppUser> input , ClaimsPrincipal user)
        {
           var email = user?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email)?.Value; 
           return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}