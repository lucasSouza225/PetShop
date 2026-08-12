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
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">🐾 PetShop</h2>
              <h4 class="text-center mb-4">Login</h4>

              <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    [(ngModel)]="loginData.email"
                    name="email"
                    required
                    placeholder="admin@petshop.com"
                  >
                </div>

                <div class="mb-3">
                  <label for="senha" class="form-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    id="senha"
                    [(ngModel)]="loginData.senha"
                    name="senha"
                    required
                    placeholder="Digite sua senha"
                  >
                </div>

                <div *ngIf="erro" class="alert alert-danger">
                  {{ erro }}
                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100 mb-3"
                  [disabled]="loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Entrar
                </button>

                <div class="text-center">
                  <a routerLink="/register" class="text-decoration-none">
                    Não tem conta? Cadastre-se
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card { border-radius: 15px; }
    .btn-primary { background: #2c3e50; border: none; }
    .btn-primary:hover { background: #34495e; }
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
