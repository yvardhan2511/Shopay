using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<AppUser> _userManager;
        public AccountRepository(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

        }

        public async Task<IdentityResult> ConfirmEmailAsync(string uid, string token)
        {
            return await _userManager.ConfirmEmailAsync(await _userManager.FindByIdAsync(uid), token);
        }

    }
}