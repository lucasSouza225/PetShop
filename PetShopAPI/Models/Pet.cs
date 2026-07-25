namespace PetShopAPI.Models 
{
    public class Pet
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Especie { get; set; } = string.Empty;
        public string Raca { get; set; } = string.Empty;
        public int Idade { get; set; }
        public string? Observacoes { get; set; }
        
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } = null!;
    }
}