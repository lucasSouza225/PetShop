using System.ComponentModel.DataAnnotations;

namespace PetShopAPI.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Nome deve ter entre 3 e 100 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória")]
        [MinLength(6, ErrorMessage = "Senha deve ter no mínimo 6 caracteres")]
        public string SenhaHash { get; set; } = string.Empty;

        [Required(ErrorMessage = "Telefone é obrigatório")]
        [Phone(ErrorMessage = "Telefone inválido")]
        public string Telefone { get; set; } = string.Empty;

        public DateTime DataCadastro { get; set; } = DateTime.Now;
        public string Role { get; set; } = "Cliente";

        public List<Pet> Pets { get; set; } = new();
    }
}