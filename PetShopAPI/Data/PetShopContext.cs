using Microsoft.EntityFrameworkCore;
using PetShopAPI.Models;

namespace PetShopAPI.Data 
{
    public class PetShopContext : DbContext
    {
        public PetShopContext(DbContextOptions<PetShopContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Pet> Pets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define o relacionamento
            modelBuilder.Entity<Pet>()
                .HasOne(p => p.Cliente)
                .WithMany(c => c.Pets)
                .HasForeignKey(p => p.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}