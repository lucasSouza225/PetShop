import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PetsListComponent } from '../pets/pets-list/pets-list.component';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule, PetsListComponent],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <!-- Navbar -->
          <nav class="navbar navbar-expand-lg navbar-light bg-light rounded-3 shadow-sm mb-4">
            <div class="container-fluid">
              <a class="navbar-brand fw-bold" href="#">🐾 PetShop</a>
              <div class="d-flex">
                <span class="navbar-text me-3">
                  Bem-vindo, <strong>{{ nomeUsuario }}</strong>
                </span>
                <button class="btn btn-outline-danger btn-sm" (click)="logout()">
                  Sair
                </button>
              </div>
            </div>
          </nav>

          <!-- Tabs -->
          <ul class="nav nav-tabs mb-4" id="clienteTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pets-tab" data-bs-toggle="tab" data-bs-target="#pets" type="button">
                🐕 Meus Pets
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="servicos-tab" data-bs-toggle="tab" data-bs-target="#servicos" type="button">
                📋 Meus Serviços
              </button>
            </li>
          </ul>

          <!-- Conteúdo das tabs -->
          <div class="tab-content">
            <div class="tab-pane fade show active" id="pets">
              <app-pets-list></app-pets-list>
            </div>
            <div class="tab-pane fade" id="servicos">
              <div class="card">
                <div class="card-body text-center py-5">
                  <h4>📋 Serviços</h4>
                  <p class="text-muted">Em breve você poderá ver seus serviços aqui!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .navbar { padding: 15px 20px; }
    .nav-tabs .nav-link { cursor: pointer; }
  `]
})
export class ClienteDashboardComponent {
  get nomeUsuario(): string {
    return this.authService.getCurrentUser()?.nome || 'Usuário';
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
