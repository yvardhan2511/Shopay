using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using API.Errors;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using API.Extensions;
using AutoMapper;
using Infrastructure.Services;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManger;
        private readonly SignInManager<AppUser> _signInManger;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AccountController> _logger;
        private readonly IEmailService _emailService;
        private readonly IAccountRepository _accountRepository;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
                        ITokenService tokenService, IMapper mapper, IConfiguration configuration,ILogger<AccountController> logger,
                        IEmailService emailService, IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
            _emailService = emailService;
            _logger = logger;
            _configuration = configuration;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManger = userManager;
            _signInManger = signInManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManger.FindByEmailClaimsPrinciple(HttpContext.User);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user)

            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManger.FindByEmailAsync(email) != null;
        }


        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {

            var user = await _userManger.FindByEmailWithAddressAsync(HttpContext.User);
            return _mapper.Map<Address, AddressDto >(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManger.FindByEmailWithAddressAsync(HttpContext.User);
            user.Address= _mapper.Map<AddressDto,Address>(address);
            var result = await _userManger.UpdateAsync(user);
            if(result.Succeeded) return Ok(_mapper.Map<Address,AddressDto>(user.Address));
            return BadRequest("Problem in updating the user");

        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManger.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized(new ApiResponse(401));
            }

            var result = await _signInManger.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            
            return new UserDto
            {
                Email = loginDto.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user)

            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors= new []{"Email address is in Use"}});
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email

            };
            //  await SendEmailAsync(registerDto.Email , "hi" , "hello");
            var result = await _userManger.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                var token = await _userManger.GenerateEmailConfirmationTokenAsync(user);
                if(!string.IsNullOrEmpty(token))
                {
                    await SendEmailConfirmationEmail(user, token);
                }
            }

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return Ok(result);

            // return new UserDto
            // {
            //     DisplayName = user.DisplayName,
            //     Token = _tokenService.CreateToken(user),
            //     Email = user.Email
            // };
        }


        private async Task SendEmailConfirmationEmail(AppUser user, string token)
        {

            string appDomain = _configuration.GetSection("Application:AppDomain").Value;
            string confirmationLink = _configuration.GetSection("Application:EmailConfirmation").Value;

            UserEmailOptions options = new UserEmailOptions 
            { 
                 ToEmails = new List<string>() { user.Email}, 
                 
                 PlaceHolders = new List<KeyValuePair<string, string>>() 
                  { 
                       new KeyValuePair<string, string>("{{UserName}}", user.DisplayName) ,
                       new KeyValuePair<string, string>("{{Link}}", string.Format(appDomain + confirmationLink, user.Id, token))
                     } 
            }; 
            await _emailService.SendEmailForEmailConfirmation(options);
        }

        // [HttpGet("confirm-email")]
        // public async Task ConfirmEmail(string uid, string token)
        // {
        //     if(!string.IsNullOrEmpty(uid) && !string.IsNullOrEmpty(token))
        //     {
        //         var result = await _accountRepository.ConfirmEmailAsync(uid, token);
        //         if(result.Succeeded)
        //         {
        //             return BadRequest()
        //         }
        //     }
        // }

    }
}