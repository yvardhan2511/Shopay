using System.Net;
using System.Net.Mail;
using System.Text;
using Infrastructure.Data.Config;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {

        private const string templatePath = @"EmailTemplate/{0}.html";
        private readonly SMTPConfiguration _smtpConfig;
        public async Task SendTestEmail(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Hello {{UserName}}, This is test email Subject", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody ("TestEmail"), userEmailOptions.PlaceHolders);


            await SendMail(userEmailOptions);
        }

        public async Task SendEmailForEmailConfirmation(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Hello {{UserName}}, Confirm your email id. ", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody ("EmailConfirm"), userEmailOptions.PlaceHolders);


            await SendMail(userEmailOptions);
        }

        public EmailService(IOptions<SMTPConfiguration> smtpConfig)
        {
            _smtpConfig = smtpConfig.Value;
            
        }

        private async Task SendMail(UserEmailOptions userEmailOptions)
        {
            MailMessage mail = new MailMessage
            {
                Subject = userEmailOptions.Subject,
                Body = userEmailOptions.Body,
                From = new MailAddress(_smtpConfig.SenderAddress, _smtpConfig.SenderDisplayName),
                IsBodyHtml = _smtpConfig.IsBodyHTML
            };

            foreach (var toEmail in userEmailOptions.ToEmails)
            {
                mail.To.Add(toEmail);
            }

            NetworkCredential networkCredential = new NetworkCredential(_smtpConfig.UserName, _smtpConfig.Password);

            SmtpClient smtpClient = new SmtpClient
            {
                Host = _smtpConfig.Host,
                Port = _smtpConfig.Port,
                EnableSsl = _smtpConfig.EnableSSL,
                UseDefaultCredentials = _smtpConfig.UseDefaultCredentials,
                Credentials = networkCredential
            };

            mail.BodyEncoding = Encoding.Default;

           await smtpClient.SendMailAsync(mail);
        }

        private string GetEmailBody(string templateName)
        {
            var body = File.ReadAllText(string.Format(templatePath, templateName));
            return body;
        }

        private string UpdatePlaceHolders(string text, List<KeyValuePair<string, string>> keyValuePairs)
        {
            if(!string.IsNullOrEmpty(text) && keyValuePairs != null)
            {
                foreach (var placeholder in keyValuePairs)
                {
                    if(text.Contains(placeholder.Key))
                    {
                        text = text.Replace(placeholder.Key, placeholder.Value);
                    }
                }
            }

            return text;
        }
    }
}