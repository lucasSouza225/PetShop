namespace PetShopAPI.DTOs
{
    public class ServicoCreateDTO
    {
        public int PetId { get; set; }              
        public string Tipo { get; set; } = string.Empty; 
        public string? Observacoes { get; set; }    
        public decimal Preco { get; set; }          
    }
}