using System;

namespace PetShopAPI.Models
{
    public class Servico
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public Pet Pet { get; set; } = null!;
        public string Tipo { get; set; } = string.Empty;
        public string Status { get; set; } = "Aguardando";
        public DateTime DataSolicitacao { get; set; } = DateTime.Now;
        public DateTime? DataConclusao { get; set; }
        public string? Observacoes { get; set; }
        public decimal Preco { get; set; }
        public bool Pago { get; set; } = false;
    }
}