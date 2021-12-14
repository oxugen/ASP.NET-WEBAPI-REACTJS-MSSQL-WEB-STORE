using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PShop.Data;
using PShop.Dtos;
using PShop.Helpers;
using PShop.Models;

namespace PShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository,JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                SecondName = dto.SecondName,
                Mail = dto.Email,
                Pass = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                RoleOfUser = "User"
            };


            return Created("success", _repository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(RegisterDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Pass)) return BadRequest(new { message = "Invalid Credentials" });

            var jwt = _jwtService.Generate(user.UserId);
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new
            {
               user
            });
           
        }

        [HttpGet ("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int UserId = int.Parse(token.Issuer);

                var user = _repository.GetById(UserId);
                return Ok(user);
            }
            catch(Exception E)
            {
                return Unauthorized();
            }
        }
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok();
        }
    }
}
