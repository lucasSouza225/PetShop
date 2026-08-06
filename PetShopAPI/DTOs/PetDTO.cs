namespace PetShopAPI.DTOs
{
    public class PetDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Especie { get; set; } = string.Empty;
        public string Raca { get; set; } = string.Empty;
        public int Idade { get; set; }
        public string? Observacoes { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNome { get; set; } = string.Empty; // Só o nome nao o objeto inteiro!
    }
}