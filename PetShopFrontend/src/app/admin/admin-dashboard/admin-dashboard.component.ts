import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <!-- Navbar -->
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded-3 shadow-sm mb-4">
            <div class="container-fluid">
              <a class="navbar-brand fw-bold" href="#">🐾 PetShop Admin</a>
              <div class="d-flex">
                <span class="navbar-text text-white me-3">
                  Admin: <strong>{{ nomeUsuario }}</strong>
                </span>
                <button class="btn btn-outline-light btn-sm" (click)="logout()">
                  Sair
                </button>
              </div>
            </div>
          </nav>

          <!-- Cards -->
          <div class="row g-4">
            <div class="col-md-4">
              <div class="card text-white bg-primary h-100">
                <div class="card-body text-center">
                  <h1 class="display-4">📋</h1>
                  <h5 class="card-title">Serviços</h5>
                  <p class="card-text">Gerencie todos os serviços</p>
                  <button class="btn btn-light btn-sm">Ver Serviços</button>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card text-white bg-success h-100">
                <div class="card-body text-center">
                  <h1 class="display-4">🐕</h1>
                  <h5 class="card-title">Pets</h5>
                  <p class="card-text">Visualize todos os pets</p>
                  <button class="btn btn-light btn-sm">Ver Pets</button>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card text-white bg-warning h-100">
                <div class="card-body text-center">
                  <h1 class="display-4">👤</h1>
                  <h5 class="card-title">Clientes</h5>
                  <p class="card-text">Gerencie clientes</p>
                  <button class="btn btn-light btn-sm">Ver Clientes</button>
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-info mt-4">
            <h4 class="alert-heading">🛠️ Área Administrativa</h4>
            <p class="mb-0">Em breve você poderá gerenciar todos os serviços, pets e clientes aqui!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .navbar { padding: 15px 20px; }
    .card { cursor: pointer; transition: transform 0.2s; border-radius: 15px; }
    .card:hover { transform: scale(1.05); }
    .btn-light { background: rgba(255,255,255,0.9); }
  `]
})
export class AdminDashboardComponent {
  get nomeUsuario(): string {
    return this.authService.getCurrentUser()?.nome || 'Admin';
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
