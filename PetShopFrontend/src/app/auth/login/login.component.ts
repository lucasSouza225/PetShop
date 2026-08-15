import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-body p-5">
              <!-- Logo / Título -->
              <div class="text-center mb-4">
                <i class="fas fa-paw fa-3x" style="color: #147d78;"></i>
                <h2 class="fw-bold mt-2" style="color: #147d78;">Mundo Pet</h2>
                <p class="text-muted">Acesse sua conta</p>
              </div>

              <!-- Formulário -->
              <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                <div class="mb-3">
                  <label for="email" class="form-label fw-semibold">E-mail</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      [(ngModel)]="loginData.email"
                      name="email"
                      required
                      placeholder="seu@email.com"
                      autocomplete="email"
                    >
                  </div>
                </div>

                <div class="mb-4">
                  <label for="senha" class="form-label fw-semibold">Senha</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      id="senha"
                      [(ngModel)]="loginData.senha"
                      name="senha"
                      required
                      placeholder="Digite sua senha"
                      autocomplete="current-password"
                    >
                  </div>
                </div>

                <!-- Mensagem de erro -->
                <div *ngIf="erro" class="alert alert-danger py-2">
                  <i class="fas fa-exclamation-circle me-2"></i>{{ erro }}
                </div>

                <!-- Botão -->
                <button
                  type="submit"
                  class="btn btn-primary w-100 py-2 fw-bold"
                  style="background-color: #147d78; border-color: #147d78;"
                  [disabled]="loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Entrar
                </button>
              </form>

              <!-- Links -->
              <div class="text-center mt-4">
                <p class="mb-1">
                  <a routerLink="/register" class="text-decoration-none" style="color: #147d78;">
                    Não tem conta? <strong>Cadastre-se</strong>
                  </a>
                </p>
                <p class="mb-0">
                  <small class="text-muted">ou</small>
                </p>
                <a routerLink="/" class="text-decoration-none text-muted small">
                  <i class="fas fa-arrow-left me-1"></i> Voltar para a Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: #ffffff;
      backdrop-filter: blur(10px);
    }

    .input-group-text {
      background-color: #f8f9fa;
      border-right: none;
    }

    .form-control {
      border-left: none;
    }

    .form-control:focus {
      border-color: #147d78;
      box-shadow: 0 0 0 0.2rem rgba(20, 125, 120, 0.25);
    }

    .btn-primary:hover {
      background-color: #0f625e !important;
      border-color: #0f625e !important;
    }

    .alert-danger {
      background-color: #fde8e8;
      border-color: #f8d7da;
      color: #842029;
    }
  `]
})
export class LoginComponent {
  loginData = { email: '', senha: '' };
  erro: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.erro = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.usuario.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/cliente']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.erro = error.error || 'Email ou senha inválidos';
      }
    });
  }
}
