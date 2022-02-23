using Microsoft.AspNetCore.Identity;

namespace Core.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> ConfirmEmailAsync(string uid, string token);
    }
}