namespace PetShopAPI.Models 
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public DateTime DataCadastro { get; set; } = DateTime.Now;

        public string Role { get; set; } = "Cliente";
        
        public List<Pet> Pets { get; set; } = new();
    }
}