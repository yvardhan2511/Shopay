using System.Diagnostics;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shopay.Models;

namespace Shopay.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
        private readonly IAccountRepository _accountRepository;

    public HomeController(ILogger<HomeController> logger, IAccountRepository accountRepository)
    {
         _accountRepository = accountRepository;
        _logger = logger;
    }

    public IActionResult Index()
    {
        
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

        [HttpGet("confirm-email")]
        public async Task ConfirmEmail(string uid, string token)
        {
            if(!string.IsNullOrEmpty(uid) && !string.IsNullOrEmpty(token))
            {
                var result = await _accountRepository.ConfirmEmailAsync(uid, token);
                if(result.Succeeded)
                {
                    ViewBag.IsSuccess = true;
                }
            }
            
         View();
        }
}
