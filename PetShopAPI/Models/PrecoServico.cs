namespace PetShopAPI.Models
{
    public class PrecoServico
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty; 
        public string? Descricao { get; set; }
        public decimal Preco { get; set; }
        public bool Ativo { get; set; } = true;
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public DateTime? DataAtualizacao { get; set; }
    }
}