using System;

namespace PetShopAPI.DTOs
{
    public class ServicoDTO
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public string PetNome { get; set; } = string.Empty;   
        public string DonoNome { get; set; } = string.Empty;  
        public string TelefoneDono { get; set; } = string.Empty; 
        public string Tipo { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime DataSolicitacao { get; set; }
        public DateTime? DataConclusao { get; set; }
        public string? Observacoes { get; set; }
        public decimal Preco { get; set; }
        public bool Pago { get; set; }
    }
}