import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold text-primary" href="#">
          <i class="fas fa-paw me-2"></i>PetCare
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#beneficios">Benefícios</a></li>
            <li class="nav-item"><a class="nav-link" href="#como-funciona">Como Funciona</a></li>
            <li class="nav-item"><a class="nav-link" href="#depoimentos">Depoimentos</a></li>
            <li class="nav-item">
              <a class="btn btn-outline-primary ms-2" routerLink="/login">Entrar</a>
            </li>
            <li class="nav-item">
              <a class="btn btn-primary ms-2" routerLink="/register">Criar Conta</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero-section d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-3 fw-bold mb-4">
              Gestão completa do seu <span class="text-primary">Pet Shop</span>
            </h1>
            <p class="lead mb-4">
              Agende banho, tosa e consultas, acompanhe cada etapa do atendimento
              e receba uma notificação quando seu pet estiver pronto para retirada.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <a routerLink="/register" class="btn btn-primary btn-lg">
                <i class="fas fa-rocket me-2"></i>Começar agora
              </a>
              <a routerLink="/login" class="btn btn-outline-secondary btn-lg">
                Já tenho conta
              </a>
            </div>
            <div class="mt-4 d-flex gap-4">
              <span><i class="fas fa-check-circle text-success me-1"></i> Sem custo</span>
              <span><i class="fas fa-bell text-warning me-1"></i> Notificações</span>
              <span><i class="fas fa-history text-info me-1"></i> Histórico completo</span>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <img src="https://via.placeholder.com/500x400/2c3e50/ffffff?text=Pet+Shop+Illustration" class="img-fluid" alt="Pet Shop">
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section id="beneficios" class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Tudo o que seu pet shop precisa</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 text-center p-4 border-0 shadow-sm">
              <div class="card-body">
                <div class="display-4 text-primary mb-3"><i class="fas fa-paw"></i></div>
                <h5 class="card-title fw-bold">Cadastro de Pets</h5>
                <p class="card-text">Registre todos os seus pets com foto, raça, peso e observações.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center p-4 border-0 shadow-sm">
              <div class="card-body">
                <div class="display-4 text-primary mb-3"><i class="fas fa-calendar-check"></i></div>
                <h5 class="card-title fw-bold">Agendamento Online</h5>
                <p class="card-text">Escolha serviço, data e horário em poucos cliques.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center p-4 border-0 shadow-sm">
              <div class="card-body">
                <div class="display-4 text-primary mb-3"><i class="fas fa-clock"></i></div>
                <h5 class="card-title fw-bold">Acompanhamento em Tempo Real</h5>
                <p class="card-text">Timeline de status do banho até a retirada, com notificações.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section id="como-funciona" class="py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Como funciona</h2>
        <div class="row">
          <div class="col-md-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-user-plus"></i></div>
            <h5>1. Crie sua conta</h5>
            <p class="text-muted">Cadastro simples e gratuito</p>
          </div>
          <div class="col-md-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-dog"></i></div>
            <h5>2. Cadastre seu pet</h5>
            <p class="text-muted">Adicione informações do seu amigo</p>
          </div>
          <div class="col-md-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-cut"></i></div>
            <h5>3. Agende serviços</h5>
            <p class="text-muted">Escolha o que seu pet precisa</p>
          </div>
          <div class="col-md-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-check-circle"></i></div>
            <h5>4. Acompanhe</h5>
            <p class="text-muted">Receba notificações em tempo real</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">Pronto para cuidar melhor do seu pet?</h2>
        <p class="lead mb-4">Crie sua conta gratuita e agende o primeiro atendimento em minutos.</p>
        <a routerLink="/register" class="btn btn-light btn-lg">
          <i class="fas fa-rocket me-2"></i>Criar minha conta
        </a>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-4 bg-dark text-white">
      <div class="container text-center">
        <p class="mb-0">
          <i class="fas fa-paw me-2"></i> © 2026 PetCare — Sistema de gestão para Pet Shops.
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      padding-top: 80px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    .hero-section h1 span {
      color: #0d6efd;
    }
    .card {
      transition: transform 0.3s ease;
    }
    .card:hover {
      transform: translateY(-10px);
    }
    section {
      scroll-margin-top: 70px;
    }
  `]
})
export class HomeComponent {}
