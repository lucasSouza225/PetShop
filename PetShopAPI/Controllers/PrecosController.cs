using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetShopAPI.Data;
using PetShopAPI.Models;
using PetShopAPI.DTOs;

namespace PetShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrecosController : ControllerBase
    {
        private readonly PetShopContext _context;

        public PrecosController(PetShopContext context)
        {
            _context = context;
        }

        // GET: api/Precos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrecoServicoDTO>>> GetPrecos()
        {
            var precos = await _context.Precos.ToListAsync();
            
            return Ok(precos.Select(p => new PrecoServicoDTO
            {
                Id = p.Id,
                Tipo = p.Tipo,
                Descricao = p.Descricao,
                Preco = p.Preco,
                Ativo = p.Ativo
            }));
        }

        // GET: api/Precos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PrecoServicoDTO>> GetPreco(int id)
        {
            var preco = await _context.Precos.FindAsync(id);
            if (preco == null)
                return NotFound();

            return Ok(new PrecoServicoDTO
            {
                Id = preco.Id,
                Tipo = preco.Tipo,
                Descricao = preco.Descricao,
                Preco = preco.Preco,
                Ativo = preco.Ativo
            });
        }

        // GET: api/Precos/tipo/{tipo}
        [HttpGet("tipo/{tipo}")]
        public async Task<ActionResult<PrecoServicoDTO>> GetPrecoByTipo(string tipo)
        {
            var preco = await _context.Precos
                .FirstOrDefaultAsync(p => p.Tipo.ToLower() == tipo.ToLower() && p.Ativo);

            if (preco == null)
                return NotFound($"Preço para o serviço '{tipo}' não encontrado.");

            return Ok(new PrecoServicoDTO
            {
                Id = preco.Id,
                Tipo = preco.Tipo,
                Descricao = preco.Descricao,
                Preco = preco.Preco,
                Ativo = preco.Ativo
            });
        }

        // POST: api/Precos
        [HttpPost]
        public async Task<ActionResult<PrecoServicoDTO>> CreatePreco(PrecoServicoCreateDTO dto)
        {
            // Verifica se o tipo já existe
            var existe = await _context.Precos
                .AnyAsync(p => p.Tipo.ToLower() == dto.Tipo.ToLower());

            if (existe)
                return BadRequest($"O serviço '{dto.Tipo}' já está cadastrado.");

            var preco = new PrecoServico
            {
                Tipo = dto.Tipo.Trim(),
                Descricao = dto.Descricao?.Trim(),
                Preco = dto.Preco,
                Ativo = true,
                DataCriacao = DateTime.Now
            };

            _context.Precos.Add(preco);
            await _context.SaveChangesAsync();

            var result = new PrecoServicoDTO
            {
                Id = preco.Id,
                Tipo = preco.Tipo,
                Descricao = preco.Descricao,
                Preco = preco.Preco,
                Ativo = preco.Ativo
            };

            return CreatedAtAction(nameof(GetPreco), new { id = preco.Id }, result);
        }

        // PUT: api/Precos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePreco(int id, PrecoServicoUpdateDTO dto)
        {
            var preco = await _context.Precos.FindAsync(id);
            if (preco == null)
                return NotFound();

            preco.Preco = dto.Preco;
            
            if (dto.Ativo.HasValue)
                preco.Ativo = dto.Ativo.Value;

            preco.DataAtualizacao = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Preço atualizado com sucesso!" });
        }

        // PATCH: api/Precos/{id}/status
        [HttpPatch("{id}")]
        public async Task<IActionResult> ToggleStatus(int id, [FromBody] bool ativo)
        {
            var preco = await _context.Precos.FindAsync(id);
            if (preco == null)
                return NotFound();

            preco.Ativo = ativo;
            preco.DataAtualizacao = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { 
                message = $"Serviço {(ativo ? "ativado" : "desativado")} com sucesso!",
                ativo = preco.Ativo
            });
        }

        // DELETE: api/Precos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePreco(int id)
        {
            var preco = await _context.Precos.FindAsync(id);
            if (preco == null)
                return NotFound();

            _context.Precos.Remove(preco);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}