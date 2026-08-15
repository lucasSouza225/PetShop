import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- ==================== NAVBAR ==================== -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold text-primary" routerLink="/">
          <i class="fas fa-paw me-2"></i>Mundo Pet
        </a>
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item">
              <a class="nav-link" href="#beneficios">Benefícios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#como-funciona">Como Funciona</a>
            </li>
            <li class="nav-item">
              <a class="btn btn-outline-primary ms-0 ms-lg-2 mt-2 mt-lg-0" routerLink="/login">
                Entrar
              </a>
            </li>
            <li class="nav-item">
              <a class="btn btn-primary ms-0 ms-lg-2 mt-2 mt-lg-0" routerLink="/register">
                Criar Conta
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- ==================== BANNER HERO ==================== -->
    <section class="hero-section d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class=" text-center">
            <div class="hero-content p-4 p-lg-5 rounded-4">
              <!-- Badge -->
              <span class="badge bg-primary bg-opacity-75 mb-3 fs-6 py-2 px-3">
                🐾 Bem-vindo ao Mundo Pet
              </span>

              <!-- Título -->
              <h1 class="display-4 display-lg-2 fw-bold mb-4 text-white">
                Gestão completa do seu <br><span class="text-warning">Pet Shop</span>
              </h1>

              <!-- Subtítulo -->
              <p class="lead mb-4 text-white-50">
                Agende banho, tosa e consultas, acompanhe cada etapa do atendimento
                e receba uma notificação quando seu pet estiver pronto para retirada.
              </p>

              <!-- Botões -->
              <div class="d-flex flex-wrap justify-content-center gap-2 gap-lg-3">
                <a routerLink="/register" class="btn btn-primary btn-lg px-4">
                  <i class="fas fa-rocket me-2"></i>Começar agora
                </a>
                <a routerLink="/login" class="btn btn-outline-light btn-lg px-4">
                  <i class="fas fa-sign-in-alt me-2"></i>Já tenho conta
                </a>
              </div>

              <!-- Selos -->
              <div class="mt-4 d-flex flex-wrap justify-content-center gap-3 gap-lg-4">
                <span class="text-white-50">
                  <i class="fas fa-check-circle text-success me-1"></i> Sem custo
                </span>
                <span class="text-white-50">
                  <i class="fas fa-bell text-warning me-1"></i> Notificações
                </span>
                <span class="text-white-50">
                  <i class="fas fa-history text-info me-1"></i> Histórico completo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== BENEFÍCIOS ==================== -->
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

    <!-- ==================== COMO FUNCIONA ==================== -->
    <section id="como-funciona" class="py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Como funciona</h2>
        <div class="row g-4">
          <div class="col-6 col-lg-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-user-plus"></i></div>
            <h5>1. Crie sua conta</h5>
            <p class="text-muted small">Cadastro simples e gratuito</p>
          </div>
          <div class="col-6 col-lg-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-dog"></i></div>
            <h5>2. Cadastre seu pet</h5>
            <p class="text-muted small">Adicione informações do seu amigo</p>
          </div>
          <div class="col-6 col-lg-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-cut"></i></div>
            <h5>3. Agende serviços</h5>
            <p class="text-muted small">Escolha o que seu pet precisa</p>
          </div>
          <div class="col-6 col-lg-3 text-center">
            <div class="display-4 text-primary mb-3"><i class="fas fa-check-circle"></i></div>
            <h5>4. Acompanhe</h5>
            <p class="text-muted small">Receba notificações em tempo real</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== CALL TO ACTION ==================== -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">Pronto para cuidar melhor do seu pet?</h2>
        <p class="lead mb-4">Crie sua conta gratuita e agende o primeiro atendimento em minutos.</p>
        <a routerLink="/register" class="btn btn-light btn-lg">
          <i class="fas fa-rocket me-2"></i>Criar minha conta
        </a>
      </div>
    </section>

    <!-- ==================== FOOTER ==================== -->
    <footer class="py-4 bg-dark text-white">
      <div class="container text-center">
        <p class="mb-0">
          <i class="fas fa-paw me-2"></i> © 2026 Mundo Pet — Sistema de gestão para Pet Shops.
        </p>
      </div>
    </footer>
  `,
  styles: [`
    /* RESET E BASE */
    html {
      scroll-behavior: smooth;
    }

    /* NAVBAR FIXA */
    .navbar {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    /* ===== BANNER HERO ===== */
    .hero-section {
      min-height: 100vh;
      padding-top: 76px;
      background-image: url('/images/banner.png');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
    }

    .hero-section .container {
      position: relative;
      z-index: 2;
    }

    /* CONTEÚDO DO BANNER */
    .hero-content {
      backdrop-filter: blur(2px);
      background: rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .hero-content h1 {
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    }

    .hero-content .lead {
      text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
    }

    .text-white-50 {
      color: rgba(255, 255, 255, 0.82) !important;
    }

    .btn-outline-light {
      border-width: 2px;
    }
    .btn-outline-light:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #fff;
    }

    /* BADGE */
    .badge.bg-primary {
      background-color: rgba(13, 110, 253, 0.75) !important;
    }

    /* ===== CARDS ===== */
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 15px;
    }
    .card:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
    }

    /* ===== SCROLL MARGIN ===== */
    section {
      scroll-margin-top: 76px;
    }



    /* ===== PALETA Mundo Pet ===== */
    :host {
      --pet-teal: #147d78;
      --pet-teal-dark: #0f625e;
      --pet-orange: #f59a23;
      --pet-orange-dark: #d97d0b;
      --pet-cream: #fff4df;
      --pet-cream-light: #fffaf1;
      --pet-text: #334155;
    }

    /* Substitui visualmente o azul padrão do Bootstrap */
    .text-primary {
      color: var(--pet-teal) !important;
    }

    .bg-primary {
      background-color: var(--pet-teal) !important;
    }

    .btn-primary {
      background-color: var(--pet-teal) !important;
      border-color: var(--pet-teal) !important;
    }

    .btn-primary:hover,
    .btn-primary:focus {
      background-color: var(--pet-teal-dark) !important;
      border-color: var(--pet-teal-dark) !important;
    }

    .btn-outline-primary {
      color: var(--pet-teal) !important;
      border-color: var(--pet-teal) !important;
    }

    .btn-outline-primary:hover,
    .btn-outline-primary:focus {
      color: #fff !important;
      background-color: var(--pet-teal) !important;
      border-color: var(--pet-teal) !important;
    }

    .badge.bg-primary {
      background-color: rgba(20, 125, 120, 0.85) !important;
    }

    /* Laranja usado nos destaques */
    .text-warning {
      color: var(--pet-orange) !important;
    }

    /* Fundo claro das áreas de conteúdo */
    .bg-light {
      background-color: var(--pet-cream-light) !important;
    }

    /* Textos */
    .card,
    .hero-content {
      color: var(--pet-text);
    }

    /* Ícones de sucesso/notificação */
    .text-success {
      color: #3f9b63 !important;
    }

    .text-info {
      color: var(--pet-teal) !important;
    }

    /* Pequeno ajuste visual do conteúdo sobre o banner */
    .hero-content {
      background: rgba(20, 125, 120, 0.16);
      border-color: rgba(255, 255, 255, 0.22);
    }

    /* ===== RESPONSIVIDADE ===== */
    @media (max-width: 991.98px) {
      .navbar-nav {
        padding: 15px 0;
      }
      .navbar-nav .nav-item {
        margin: 5px 0;
      }
      .navbar-nav .btn {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 575.98px) {
      .hero-section {
        min-height: 100vh;
        padding-top: 66px;
        background-attachment: scroll;
      }
      .hero-content h1 {
        font-size: 2rem;
      }
      .hero-content .lead {
        font-size: 1rem;
      }
      .hero-content .btn {
        font-size: 0.9rem;
        padding: 10px 20px;
      }
      .hero-content {
        padding: 1.5rem !important;
      }
    }
  `]
})
export class HomeComponent {}
