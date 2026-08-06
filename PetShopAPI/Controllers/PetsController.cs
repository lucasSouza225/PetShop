using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetShopAPI.Data;
using PetShopAPI.Models;
using PetShopAPI.DTOs;

namespace PetShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly PetShopContext _context;

        public PetsController(PetShopContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetDTO>>> GetPets()
        {
            var pets = await _context.Pets
                .Include(p => p.Cliente)
                .ToListAsync();

            var petsDTO = pets.Select(p => new PetDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Especie = p.Especie,
                Raca = p.Raca,
                Idade = p.Idade,
                Observacoes = p.Observacoes,
                ClienteId = p.ClienteId,
                ClienteNome = p.Cliente?.Nome ?? "Cliente não encontrado"
            });

            return Ok(petsDTO);
        }

        // GET
        [HttpGet("{id}")]
        public async Task<ActionResult<PetDTO>> GetPet(int id)
        {
            var pet = await _context.Pets
                .Include(p => p.Cliente)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pet == null)
            {
                return NotFound();
            }

            // Converte para DTO
            var petDTO = new PetDTO
            {
                Id = pet.Id,
                Nome = pet.Nome,
                Especie = pet.Especie,
                Raca = pet.Raca,
                Idade = pet.Idade,
                Observacoes = pet.Observacoes,
                ClienteId = pet.ClienteId,
                ClienteNome = pet.Cliente?.Nome ?? "Cliente não encontrado"
            };

            return petDTO;
        }

        // GET
        [HttpGet("cliente/{clienteId}")]
        public async Task<ActionResult<IEnumerable<PetDTO>>> GetPetsByCliente(int clienteId)
        {
            var pets = await _context.Pets
                .Where(p => p.ClienteId == clienteId)
                .Include(p => p.Cliente)
                .ToListAsync();

            var petsDTO = pets.Select(p => new PetDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Especie = p.Especie,
                Raca = p.Raca,
                Idade = p.Idade,
                Observacoes = p.Observacoes,
                ClienteId = p.ClienteId,
                ClienteNome = p.Cliente?.Nome ?? "Cliente não encontrado"
            });

            return Ok(petsDTO);
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<PetDTO>> PostPet(PetCreateDTO petDto)
        {
            // Verifica se o cliente existe
            var cliente = await _context.Clientes.FindAsync(petDto.ClienteId);
            if (cliente == null)
            {
                return BadRequest("Cliente não encontrado");
            }

            // Cria o pet
            var pet = new Pet
            {
                Nome = petDto.Nome,
                Especie = petDto.Especie,
                Raca = petDto.Raca,
                Idade = petDto.Idade,
                Observacoes = petDto.Observacoes,
                ClienteId = petDto.ClienteId
            };

            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            var petCriado = await _context.Pets
                .Include(p => p.Cliente)
                .FirstOrDefaultAsync(p => p.Id == pet.Id);

            // aqui eu retorna a poha do DTO
            var petDTO = new PetDTO
            {
                Id = petCriado.Id,
                Nome = petCriado.Nome,
                Especie = petCriado.Especie,
                Raca = petCriado.Raca,
                Idade = petCriado.Idade,
                Observacoes = petCriado.Observacoes,
                ClienteId = petCriado.ClienteId,
                ClienteNome = petCriado.Cliente?.Nome ?? "Cliente não encontrado"
            };

            return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, petDTO);
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPet(int id, Pet pet)
        {
            if (id != pet.Id)
            {
                return BadRequest();
            }

            _context.Entry(pet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound();
            }

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PetExists(int id)
        {
            return _context.Pets.Any(e => e.Id == id);
        }
    }
}