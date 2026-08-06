using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using PetShopAPI.Data;
using PetShopAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ CONFIGURAÇÃO DO BANCO DE DADOS (MySQL)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PetShopContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 2️⃣ CONFIGURAÇÃO DOS CONTROLLERS
builder.Services.AddControllers();

// 3️⃣ CONFIGURAÇÃO DO SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "PetShop API",
        Version = "v1",
        Description = "API para gerenciamento de petshop com serviços e agendamentos"
    });

    // 🔐 Configura o Swagger para aceitar JWT
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Insira o token JWT (ex: Bearer seutoken)",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 4️⃣ CONFIGURAÇÃO DO CORS (Angular)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// 5️⃣ 🔐 AUTENTICAÇÃO JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new Exception("Jwt:Key não configurada no appsettings.json");
var key = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// 6️⃣ REGISTRA O AuthService (INJEÇÃO DE DEPENDÊNCIA)
builder.Services.AddScoped<AuthService>(); // <--- ESSA LINHA ESTAVA FALTANDO!

var app = builder.Build();

// 7️⃣ PIPELINE DE REQUISIÇÕES
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetShop API v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");

app.UseAuthentication(); // 🔐 ATIVA A AUTENTICAÇÃO
app.UseAuthorization();  // 🔐 ATIVA A AUTORIZAÇÃO

app.MapControllers();

app.Run();