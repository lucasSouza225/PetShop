import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">🐾 PetShop</h2>
              <h4 class="text-center mb-4">Criar Conta</h4>

              <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
                <div class="mb-3">
                  <label for="nome" class="form-label">Nome</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nome"
                    [(ngModel)]="registerData.nome"
                    name="nome"
                    required
                    placeholder="Seu nome completo"
                  >
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    [(ngModel)]="registerData.email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                  >
                </div>

                <div class="mb-3">
                  <label for="telefone" class="form-label">Telefone</label>
                  <input
                    type="text"
                    class="form-control"
                    id="telefone"
                    [(ngModel)]="registerData.telefone"
                    name="telefone"
                    required
                    placeholder="(11) 99999-9999"
                  >
                </div>

                <div class="mb-3">
                  <label for="senha" class="form-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    id="senha"
                    [(ngModel)]="registerData.senhaHash"
                    name="senhaHash"
                    required
                    placeholder="Mínimo 6 caracteres"
                    minlength="6"
                  >
                </div>

                <div *ngIf="mensagem" class="alert alert-success">
                  {{ mensagem }}
                </div>
                <div *ngIf="erro" class="alert alert-danger">
                  {{ erro }}
                </div>

                <button
                  type="submit"
                  class="btn btn-success w-100 mb-3"
                  [disabled]="loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Cadastrar
                </button>

                <div class="text-center">
                  <a routerLink="/login" class="text-decoration-none">
                    Já tem conta? Faça login
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
    .btn-success { background: #27ae60; border: none; }
    .btn-success:hover { background: #2ecc71; }
  `]
})
export class RegisterComponent {
  registerData = {
    nome: '',
    email: '',
    senhaHash: '',
    telefone: ''
  };
  mensagem: string = '';
  erro: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.erro = '';
    this.mensagem = '';

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.loading = false;
        this.mensagem = 'Conta criada com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.erro = error.error || 'Erro ao criar conta';
      }
    });
  }
}
