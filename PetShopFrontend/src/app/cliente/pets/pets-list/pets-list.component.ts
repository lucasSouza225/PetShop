import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">🐕 Meus Pets</h5>
        <button class="btn btn-primary btn-sm" (click)="abrirFormulario()">
          + Novo Pet
        </button>
      </div>
      <div class="card-body">
        <!-- Loading -->
        <div *ngIf="carregando" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>

        <!-- Lista de pets -->
        <div *ngIf="!carregando && pets.length > 0">
          <div class="row">
            <div class="col-md-4" *ngFor="let pet of pets">
              <div class="card pet-card">
                <div class="card-body">
                  <h5 class="card-title">{{ pet.nome }}</h5>
                  <p class="card-text">
                    <strong>Espécie:</strong> {{ pet.especie }}<br>
                    <strong>Raça:</strong> {{ pet.raca }}<br>
                    <strong>Idade:</strong> {{ pet.idade }} anos
                  </p>
                  <div class="btn-group w-100">
                    <button class="btn btn-outline-primary btn-sm" (click)="editarPet(pet)">
                      Editar
                    </button>
                    <button class="btn btn-outline-danger btn-sm" (click)="deletarPet(pet.id)">
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sem pets -->
        <div *ngIf="!carregando && pets.length === 0" class="text-center py-4">
          <p class="text-muted">Você ainda não cadastrou nenhum pet.</p>
          <button class="btn btn-primary" (click)="abrirFormulario()">
            Cadastrar Primeiro Pet
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para criar/editar pet -->
    <div class="modal fade" id="petModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editando ? 'Editar' : 'Novo' }} Pet</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form #petForm="ngForm">
              <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" class="form-control" [(ngModel)]="petFormData.nome" name="nome" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Espécie</label>
                <select class="form-select" [(ngModel)]="petFormData.especie" name="especie">
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Pássaro">Pássaro</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Raça</label>
                <input type="text" class="form-control" [(ngModel)]="petFormData.raca" name="raca">
              </div>
              <div class="mb-3">
                <label class="form-label">Idade</label>
                <input type="number" class="form-control" [(ngModel)]="petFormData.idade" name="idade">
              </div>
              <div class="mb-3">
                <label class="form-label">Observações</label>
                <textarea class="form-control" [(ngModel)]="petFormData.observacoes" name="observacoes" rows="2"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" (click)="salvarPet()" [disabled]="petForm.invalid">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pet-card {
      transition: transform 0.2s;
      margin-bottom: 15px;
    }
    .pet-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class PetsListComponent implements OnInit {
  pets: Pet[] = [];
  carregando = false;
  petFormData: any = {};
  editando = false;

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.carregarPets();
  }

  carregarPets() {
    this.carregando = true;
    this.petService.listarPets().subscribe({
      next: (data) => {
        this.pets = data;
        this.carregando = false;
      },
      error: () => this.carregando = false
    });
  }

  abrirFormulario() {
    this.editando = false;
    this.petFormData = { especie: 'Cachorro' };
    // Abrir modal com Bootstrap
    // this.modalService.show('petModal');
  }

  editarPet(pet: Pet) {
    this.editando = true;
    this.petFormData = { ...pet };
    // Abrir modal
  }

  salvarPet() {
    // Implementar salvar
  }

  deletarPet(id: number) {
    if (confirm('Tem certeza que deseja deletar este pet?')) {
      // Implementar deletar
    }
  }
}
