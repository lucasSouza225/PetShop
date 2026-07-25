using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PetShopAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ CONFIGURAÇÃO DO BANCO DE DADOS (MySQL)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PetShopContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 2️⃣ CONFIGURAÇÃO DOS CONTROLLERS
builder.Services.AddControllers();

// 3️⃣ CONFIGURAÇÃO DO SWAGGER (documentação da API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "PetShop API", 
        Version = "v1",
        Description = "API para gerenciamento de petshop com serviços e agendamentos"
    });
});

// 4️⃣ CONFIGURAÇÃO DO CORS (pra permitir o Angular acessar)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // URL do Angular
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// 5️⃣ PIPELINE DE REQUISIÇÕES

// Swagger (sempre disponível, mas em produção você pode restringir)
app.UseSwagger();
app.UseSwaggerUI(c => 
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetShop API v1");
});

app.UseHttpsRedirection();

// 6️⃣ ATIVA O CORS
app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();