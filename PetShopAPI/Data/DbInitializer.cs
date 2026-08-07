using Microsoft.EntityFrameworkCore; 
using PetShopAPI.Models;

namespace PetShopAPI.Data
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(PetShopContext context)
        {
            // Verifica se já existe algum admin
            if (await context.Clientes.AnyAsync(c => c.Role == "Admin"))
                return;

            // Cria um admin padrão
            var admin = new Cliente
            {
                Nome = "Admin PetShop",
                Email = "admin@petshop.com",
                SenhaHash = "admin123", // ⚠️ caso de venda lembrar de usar "HASH!"
                Telefone = "(11) 99999-9999",
                Role = "Admin",
                DataCadastro = DateTime.Now
            };

            await context.Clientes.AddAsync(admin);
            await context.SaveChangesAsync();

            Console.WriteLine("✅ Admin criado com sucesso!");
            Console.WriteLine("📧 Email: admin@petshop.com");
            Console.WriteLine("🔑 Senha: admin123");
        }
    }
}