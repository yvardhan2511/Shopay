namespace Infrastructure.Services
{
    public interface IEmailService
    {
        Task SendTestEmail(UserEmailOptions userEmailOptions);
        Task SendEmailForEmailConfirmation(UserEmailOptions userEmailOptions);
    }
}