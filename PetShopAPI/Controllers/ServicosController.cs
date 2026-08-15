using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetShopAPI.Data;
using PetShopAPI.Models;
using PetShopAPI.DTOs;

namespace PetShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosController : ControllerBase
    {
        private readonly PetShopContext _context;

        public ServicosController(PetShopContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServicoDTO>>> GetServicos()
        {
            var servicos = await _context.Servicos
                .Include(s => s.Pet)           
                    .ThenInclude(p => p.Cliente)
                .OrderByDescending(s => s.DataSolicitacao) 
                .ToListAsync();


            var servicosDTO = servicos.Select(s => new ServicoDTO
            {
                Id = s.Id,
                PetId = s.PetId,
                PetNome = s.Pet.Nome,
                DonoNome = s.Pet.Cliente.Nome,
                TelefoneDono = s.Pet.Cliente.Telefone,
                Tipo = s.Tipo,
                Status = s.Status,
                DataSolicitacao = s.DataSolicitacao,
                DataConclusao = s.DataConclusao,
                Observacoes = s.Observacoes,
                Preco = s.Preco,
                Pago = s.Pago
            });

            return Ok(servicosDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServicoDTO>> GetServico(int id)
        {
            var servico = await _context.Servicos
                .Include(s => s.Pet)
                    .ThenInclude(p => p.Cliente)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (servico == null)
            {
                return NotFound("Serviço não encontrado");
            }

            var servicoDTO = new ServicoDTO
            {
                Id = servico.Id,
                PetId = servico.PetId,
                PetNome = servico.Pet.Nome,
                DonoNome = servico.Pet.Cliente.Nome,
                TelefoneDono = servico.Pet.Cliente.Telefone,
                Tipo = servico.Tipo,
                Status = servico.Status,
                DataSolicitacao = servico.DataSolicitacao,
                DataConclusao = servico.DataConclusao,
                Observacoes = servico.Observacoes,
                Preco = servico.Preco,
                Pago = servico.Pago
            };

            return Ok(servicoDTO);
        }

        [HttpGet("pet/{petId}")]
        public async Task<ActionResult<IEnumerable<ServicoDTO>>> GetServicosByPet(int petId)
        {
            var servicos = await _context.Servicos
                .Include(s => s.Pet)
                    .ThenInclude(p => p.Cliente)
                .Where(s => s.PetId == petId)
                .OrderByDescending(s => s.DataSolicitacao)
                .ToListAsync();

            var servicosDTO = servicos.Select(s => new ServicoDTO
            {
                Id = s.Id,
                PetId = s.PetId,
                PetNome = s.Pet.Nome,
                DonoNome = s.Pet.Cliente.Nome,
                TelefoneDono = s.Pet.Cliente.Telefone,
                Tipo = s.Tipo,
                Status = s.Status,
                DataSolicitacao = s.DataSolicitacao,
                DataConclusao = s.DataConclusao,
                Observacoes = s.Observacoes,
                Preco = s.Preco,
                Pago = s.Pago
            });

            return Ok(servicosDTO);
        }

        [HttpPost]
        public async Task<ActionResult<ServicoDTO>> PostServico(ServicoCreateDTO servicoDto)
        {

            var pet = await _context.Pets
                .Include(p => p.Cliente)
                .FirstOrDefaultAsync(p => p.Id == servicoDto.PetId);

            if (pet == null)
            {
                return BadRequest("Pet não encontrado");
            }


            var servico = new Servico
            {
                PetId = servicoDto.PetId,
                Tipo = servicoDto.Tipo,
                Status = "Aguardando", 
                Observacoes = servicoDto.Observacoes,
                Preco = 0,
                DataSolicitacao = DateTime.Now
            };

            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();


            var servicoCriado = await _context.Servicos
                .Include(s => s.Pet)
                    .ThenInclude(p => p.Cliente)
                .FirstOrDefaultAsync(s => s.Id == servico.Id);

            // Converte para DTO
            var servicoDTO = new ServicoDTO
            {
                Id = servicoCriado.Id,
                PetId = servicoCriado.PetId,
                PetNome = servicoCriado.Pet.Nome,
                DonoNome = servicoCriado.Pet.Cliente.Nome,
                TelefoneDono = servicoCriado.Pet.Cliente.Telefone,
                Tipo = servicoCriado.Tipo,
                Status = servicoCriado.Status,
                DataSolicitacao = servicoCriado.DataSolicitacao,
                DataConclusao = servicoCriado.DataConclusao,
                Observacoes = servicoCriado.Observacoes,
                Preco = servicoCriado.Preco,
                Pago = servicoCriado.Pago
            };

            return CreatedAtAction(nameof(GetServico), new { id = servico.Id }, servicoDTO);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string novoStatus)
        {
            var servico = await _context.Servicos
                .Include(s => s.Pet)
                    .ThenInclude(p => p.Cliente)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (servico == null)
            {
                return NotFound("Serviço não encontrado");
            }

            // Valida o status
            var statusValidos = new[] { "Aguardando", "EmAndamento", "Pronto", "Cancelado" };
            if (!statusValidos.Contains(novoStatus))
            {
                return BadRequest("Status inválido. Use: Aguardando, EmAndamento, Pronto ou Cancelado");
            }

            // Se status for "Pronto", registra a data de conclusão
            if (novoStatus == "Pronto" && servico.Status != "Pronto")
            {
                servico.DataConclusao = DateTime.Now;
                
                // 🔥 AQUI VAI O ENVIO DO WHATSAPP (futuro)
                // Vamos implementar depois!
                Console.WriteLine($"📲 Enviar WhatsApp para {servico.Pet.Cliente.Telefone}");
                Console.WriteLine($"📝 Mensagem: Seu pet {servico.Pet.Nome} está pronto!");
            }

            servico.Status = novoStatus;
            await _context.SaveChangesAsync();

            return Ok(new { 
                message = $"Status atualizado para {novoStatus}",
                servico = new
                {
                    id = servico.Id,
                    status = servico.Status,
                    dataConclusao = servico.DataConclusao
                }
            });
        }

        // ============================================
        // 6. DELETAR SERVIÇO (ADMIN)
        // DELETE: api/Servicos/{id}
        // ============================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServico(int id)
        {
            var servico = await _context.Servicos.FindAsync(id);
            if (servico == null)
            {
                return NotFound("Serviço não encontrado");
            }

            _context.Servicos.Remove(servico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

       
        [HttpGet("estatisticas")]
        public async Task<IActionResult> GetEstatisticas()
        {
            var total = await _context.Servicos.CountAsync();
            var aguardando = await _context.Servicos.CountAsync(s => s.Status == "Aguardando");
            var emAndamento = await _context.Servicos.CountAsync(s => s.Status == "EmAndamento");
            var pronto = await _context.Servicos.CountAsync(s => s.Status == "Pronto");
            var cancelado = await _context.Servicos.CountAsync(s => s.Status == "Cancelado");

            return Ok(new
            {
                Total = total,
                Aguardando = aguardando,
                EmAndamento = emAndamento,
                Pronto = pronto,
                Cancelado = cancelado
            });
        }
    }
}