namespace PetShopAPI.DTOs
{
    public class PrecoServicoDTO
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public decimal Preco { get; set; }
        public bool Ativo { get; set; }
    }

    public class PrecoServicoCreateDTO
    {
        public string Tipo { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public decimal Preco { get; set; }
    }

    public class PrecoServicoUpdateDTO
    {
        public decimal Preco { get; set; }
        public bool? Ativo { get; set; }
    }
}