using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using PetShopAPI.Data;
using PetShopAPI.Services;
using PetShopAPI.Middleware;
using Serilog;

// 🔥 CONFIGURAÇÃO DO SERILOG
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File("logs/petshop.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// 🔥 USA O SERILOG
builder.Host.UseSerilog();

// 1️⃣ BANCO DE DADOS
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PetShopContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 2️⃣ CONTROLLERS
builder.Services.AddControllers();

// 3️⃣ SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "PetShop API",
        Version = "v1",
        Description = "API para gerenciamento de petshop com serviços e agendamentos"
    });

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

// 4️⃣ CORS
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

// 5️⃣ JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new Exception("Jwt:Key não configurada");
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

// 6️⃣ SERVIÇOS
builder.Services.AddScoped<AuthService>();

var app = builder.Build();

// 7️⃣ PIPELINE
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetShop API v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");

// 🔥 MIDDLEWARE DE EXCEÇÃO
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

// 🔥 INICIALIZADOR DO BANCO
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PetShopContext>();
    
    // Cria o banco se não existir (EQUIVALENTE AO database update)
    await context.Database.EnsureCreatedAsync();
    
    // Inicializa com admin
    await DbInitializer.InitializeAsync(context);
}

app.MapControllers();
app.Run();

// 🔥 FECHA O LOG AO FINALIZAR
Log.CloseAndFlush();


app.MapControllers();
app.Run();

// 🔥 FECHA O LOG AO FINALIZAR
Log.CloseAndFlush();