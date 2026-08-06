using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetShopAPI.Data;
using PetShopAPI.Models;
using PetShopAPI.Services;

namespace PetShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly PetShopContext _context;
        private readonly AuthService _authService;

        public AuthController(PetShopContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var cliente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Email == login.Email);

            if (cliente == null)
                return Unauthorized("Email ou senha inválidos");

            // ⚠️ EM PRODUÇÃO, USE HASH (BCRYPT)
            if (cliente.SenhaHash != login.Senha)
                return Unauthorized("Email ou senha inválidos");

            var token = _authService.GerarToken(cliente);

            return Ok(new
            {
                Token = token,
                Usuario = new
                {
                    cliente.Id,
                    cliente.Nome,
                    cliente.Email,
                    cliente.Role
                }
            });
        }

        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] Cliente cliente)
        {
            if (await _context.Clientes.AnyAsync(c => c.Email == cliente.Email))
                return BadRequest("E-mail já cadastrado");

            // ⚠️ EM PRODUÇÃO, USE HASH (BCRYPT)
            // Por enquanto mantemos a senha em texto plano para teste
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return Ok(new { Mensagem = "Cliente registrado com sucesso!" });
        }
    }
}