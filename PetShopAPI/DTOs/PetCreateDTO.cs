namespace PetShopAPI.DTOs
{
    public class PetCreateDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Especie { get; set; } = string.Empty;
        public string Raca { get; set; } = string.Empty;
        public int Idade { get; set; }
        public string? Observacoes { get; set; }
        public int ClienteId { get; set; }
    }
}