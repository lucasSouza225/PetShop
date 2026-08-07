using System.ComponentModel.DataAnnotations;

namespace PetShopAPI.Models
{
    public class Pet
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome do pet é obrigatório")]
        [StringLength(50, MinimumLength = 2)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Espécie é obrigatória")]
        public string Especie { get; set; } = string.Empty;

        public string Raca { get; set; } = string.Empty;

        [Range(0, 50, ErrorMessage = "Idade deve estar entre 0 e 50 anos")]
        public int Idade { get; set; }

        public string? Observacoes { get; set; }

        [Required]
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } = null!;
    }
}