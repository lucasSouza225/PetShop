import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PetService } from '../../services/pet.service';
import { ServicoService } from '../../services/servico.service';
import { PrecoService } from '../../services/preco.service';
import { ToastService } from '../../services/toast.service';
import { Pet, PetCreate } from '../../models/pet.model';
import { Servico, ServicoCreate } from '../../models/servico.model';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid p-0">
      <!-- NAVBAR DO CLIENTE -->
      <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #147d78;">
        <div class="container">
          <a class="navbar-brand fw-bold" routerLink="/">
            <i class="fas fa-paw me-2"></i>Mundo Pet
          </a>
          <div class="ms-auto d-flex align-items-center">
            <span class="text-white me-3 d-none d-sm-inline">
              <i class="fas fa-user me-1"></i> {{ nomeUsuario }}
            </span>
            <button class="btn btn-outline-light btn-sm" (click)="logout()">
              <i class="fas fa-sign-out-alt me-1"></i> Sair
            </button>
          </div>
        </div>
      </nav>

      <!-- CONTEÚDO -->
      <div class="container py-4">
        <div class="row mb-4">
          <div class="col-12">
            <h1 class="display-6 fw-bold" style="color: #147d78;">
              <i class="fas fa-paw me-2"></i>Olá, {{ nomeUsuario }}!
            </h1>
            <p class="text-muted">Aqui você gerencia seus pets e serviços.</p>
          </div>
        </div>

        <!-- TABS -->
        <ul class="nav nav-tabs mb-4" id="clienteTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pets-tab" data-bs-toggle="tab" data-bs-target="#pets" type="button" style="color: #147d78;">
              <i class="fas fa-dog me-1"></i> Meus Pets
              <span class="badge bg-primary ms-1" style="background-color: #147d78;">{{ pets.length }}</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="servicos-tab" data-bs-toggle="tab" data-bs-target="#servicos" type="button" style="color: #147d78;">
              <i class="fas fa-cut me-1"></i> Serviços
              <span class="badge bg-primary ms-1" style="background-color: #147d78;">{{ servicos.length }}</span>
            </button>
          </li>
        </ul>

        <div class="tab-content">
          <!-- TAB PETS -->
          <div class="tab-pane fade show active" id="pets">
            <div class="d-flex justify-content-end mb-3">
              <button class="btn btn-primary" style="background-color: #147d78; border-color: #147d78;" (click)="abrirModalPet()">
                <i class="fas fa-plus me-1"></i> Novo Pet
              </button>
            </div>

            <div *ngIf="carregandoPets" class="text-center py-5">
              <div class="spinner-border text-primary" style="color: #147d78;" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>

            <div *ngIf="!carregandoPets && pets.length === 0" class="text-center py-5">
              <i class="fas fa-dog fa-4x text-muted mb-3"></i>
              <p class="text-muted">Você ainda não cadastrou nenhum pet.</p>
              <button class="btn btn-primary" style="background-color: #147d78; border-color: #147d78;" (click)="abrirModalPet()">
                <i class="fas fa-plus me-1"></i> Cadastrar Primeiro Pet
              </button>
            </div>

            <div *ngIf="!carregandoPets && pets.length > 0" class="row g-4">
              <div class="col-md-6 col-lg-4" *ngFor="let pet of pets">
                <div class="card h-100 border-0 shadow-sm rounded-4">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 class="card-title fw-bold" style="color: #147d78;">{{ pet.nome }}</h5>
                        <p class="card-text text-muted small">
                          <i class="fas fa-paw me-1"></i> {{ pet.especie }}<br>
                          <i class="fas fa-tag me-1"></i> {{ pet.raca || 'Raça não informada' }}<br>
                          <i class="fas fa-calendar me-1"></i> {{ pet.idade }} anos
                        </p>
                      </div>
                      <div class="pet-avatar rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; background-color: #e8f5e9; color: #147d78;">
                        <i class="fas fa-dog fa-2x"></i>
                      </div>
                    </div>
                    <p class="card-text small" *ngIf="pet.observacoes">
                      <i class="fas fa-comment me-1 text-muted"></i> {{ pet.observacoes }}
                    </p>
                  </div>
                  <div class="card-footer bg-transparent border-0 d-flex gap-2">
                    <button class="btn btn-outline-primary btn-sm flex-fill" style="color: #147d78; border-color: #147d78;" (click)="abrirServico(pet)">
                      <i class="fas fa-cut me-1"></i> Serviço
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" (click)="editarPet(pet)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" (click)="deletarPet(pet.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB SERVIÇOS -->
          <div class="tab-pane fade" id="servicos">
            <div *ngIf="carregandoServicos" class="text-center py-5">
              <div class="spinner-border text-primary" style="color: #147d78;" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>

            <div *ngIf="!carregandoServicos && servicos.length === 0" class="text-center py-5">
              <i class="fas fa-cut fa-4x text-muted mb-3"></i>
              <p class="text-muted">Nenhum serviço agendado ainda.</p>
              <p class="text-muted small">Cadastre um pet e solicite um serviço!</p>
            </div>

            <div *ngIf="!carregandoServicos && servicos.length > 0">
              <div class="row g-4">
                <div class="col-12" *ngFor="let servico of servicos">
                  <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-md-3">
                          <h5 class="fw-bold mb-0" style="color: #147d78;">{{ servico.tipo }}</h5>
                          <small class="text-muted">Pet: {{ servico.petNome }}</small>
                        </div>
                        <div class="col-md-3">
                          <span class="badge rounded-pill px-3 py-2" [ngClass]="{
                            'bg-warning text-dark': servico.status === 'Aguardando',
                            'bg-info text-white': servico.status === 'EmAndamento',
                            'bg-success text-white': servico.status === 'Pronto',
                            'bg-danger text-white': servico.status === 'Cancelado'
                          }">
                            <i class="fas fa-circle me-1" style="font-size: 8px;"></i>
                            {{ servico.status }}
                          </span>
                        </div>
                        <div class="col-md-3">
                          <small class="text-muted">
                            <i class="fas fa-calendar me-1"></i> {{ servico.dataSolicitacao | date:'dd/MM/yyyy HH:mm' }}
                          </small>
                          <div *ngIf="servico.dataConclusao" class="small text-success">
                            <i class="fas fa-check-circle me-1"></i> Concluído: {{ servico.dataConclusao | date:'dd/MM/yyyy' }}
                          </div>
                        </div>
                        <div class="col-md-3 text-end">
                          <span *ngIf="servico.preco > 0" class="fw-bold" style="color: #147d78;">
                            R$ {{ servico.preco | number:'1.2-2' }}
                          </span>
                          <span *ngIf="servico.preco === 0" class="text-muted small">
                            <i class="fas fa-hourglass-half me-1"></i> Aguardando preço
                          </span>
                        </div>
                      </div>
                      <div *ngIf="servico.observacoes" class="mt-2">
                        <small class="text-muted">
                          <i class="fas fa-comment me-1"></i> {{ servico.observacoes }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: PET -->
    <div class="modal fade" id="petModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4">
          <div class="modal-header border-0" style="background-color: #f8f9fa;">
            <h5 class="modal-title fw-bold" style="color: #147d78;">
              <i class="fas fa-dog me-2"></i> {{ editandoPet ? 'Editar' : 'Novo' }} Pet
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form #petForm="ngForm">
              <div class="mb-3">
                <label class="form-label fw-semibold">Nome *</label>
                <input type="text" class="form-control" [(ngModel)]="petFormData.nome" name="nome" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Espécie *</label>
                <select class="form-select" [(ngModel)]="petFormData.especie" name="especie" required>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Pássaro">Pássaro</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Raça</label>
                <input type="text" class="form-control" [(ngModel)]="petFormData.raca" name="raca">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Idade</label>
                <input type="number" class="form-control" [(ngModel)]="petFormData.idade" name="idade" min="0">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Observações</label>
                <textarea class="form-control" [(ngModel)]="petFormData.observacoes" name="observacoes" rows="2"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" style="background-color: #147d78; border-color: #147d78;" (click)="salvarPet()" [disabled]="petForm.invalid">
              <i class="fas fa-save me-1"></i> Salvar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: SERVIÇO -->
    <div class="modal fade" id="servicoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4">
          <div class="modal-header border-0" style="background-color: #f8f9fa;">
            <h5 class="modal-title fw-bold" style="color: #147d78;">
              <i class="fas fa-cut me-2"></i> Solicitar Serviço
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted">Solicitando serviço para: <strong>{{ petSelecionado?.nome }}</strong></p>
            <form #servicoForm="ngForm">
              <div class="mb-3">
                <label class="form-label fw-semibold">Tipo de Serviço *</label>
                <select class="form-select" [(ngModel)]="servicoFormData.tipo" name="tipo" required (change)="buscarPrecoServico()">
                  <option value="">Selecione...</option>
                  <option value="Banho">Banho</option>
                  <option value="Tosa">Tosa</option>
                  <option value="Banho e Tosa">Banho e Tosa</option>
                  <option value="Vacina">Vacina</option>
                  <option value="Consulta">Consulta</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div *ngIf="servicoFormData.preco > 0" class="mb-3">
                <div class="alert alert-info">
                  <i class="fas fa-tag me-2"></i>
                  <strong>Preço sugerido:</strong> R$ {{ servicoFormData.preco | number:'1.2-2' }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Observações</label>
                <textarea class="form-control" [(ngModel)]="servicoFormData.observacoes" name="observacoes" rows="2"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" style="background-color: #147d78; border-color: #147d78;" (click)="salvarServico()" [disabled]="servicoForm.invalid">
              <i class="fas fa-check me-1"></i> Solicitar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nav-tabs .nav-link {
      border: none;
      font-weight: 500;
      padding: 10px 20px;
    }
    .nav-tabs .nav-link.active {
      border-bottom: 3px solid #147d78;
      background: transparent;
      color: #147d78 !important;
    }
    .nav-tabs .nav-link:hover {
      border-bottom: 3px solid #147d78;
    }
    .card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.08) !important;
    }
    .pet-avatar {
      flex-shrink: 0;
    }
    .badge {
      font-weight: 500;
    }
  `]
})
export class ClienteDashboardComponent implements OnInit {
  pets: Pet[] = [];
  servicos: Servico[] = [];
  carregandoPets = false;
  carregandoServicos = false;

  petFormData: any = { especie: 'Cachorro' };
  editandoPet = false;

  servicoFormData: any = { tipo: '', preco: 0, observacoes: '' };
  petSelecionado: Pet | null = null;

  get nomeUsuario(): string {
    return this.authService.getCurrentUser()?.nome || 'Usuário';
  }

  private get clienteId(): number | null {
    return this.authService.getClienteId();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private petService: PetService,
    private servicoService: ServicoService,
    private precoService: PrecoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.carregarPets();
    this.carregarServicos();
  }

  carregarPets() {
    if (!this.clienteId) return;
    this.carregandoPets = true;
    this.petService.listarPetsPorCliente(this.clienteId).subscribe({
      next: (data) => {
        this.pets = data;
        this.carregandoPets = false;
      },
      error: () => {
        this.pets = [];
        this.carregandoPets = false;
        this.toastService.error('❌ Erro', 'Erro ao carregar pets.');
      }
    });
  }

  carregarServicos() {
    if (!this.clienteId) return;
    this.carregandoServicos = true;
    this.petService.listarPetsPorCliente(this.clienteId).subscribe({
      next: (pets) => {
        if (pets.length === 0) {
          this.servicos = [];
          this.carregandoServicos = false;
          return;
        }
        const requests = pets.map((pet) => this.servicoService.listarServicosPorPet(pet.id));
        forkJoin(requests).subscribe({
          next: (resultados) => {
            this.servicos = resultados.filter(result => result !== null && result !== undefined).flat();
            this.carregandoServicos = false;
          },
          error: () => {
            this.servicos = [];
            this.carregandoServicos = false;
          }
        });
      },
      error: () => {
        this.servicos = [];
        this.carregandoServicos = false;
      }
    });
  }

  // ===== PET =====
  abrirModalPet() {
    this.editandoPet = false;
    this.petFormData = { nome: '', especie: 'Cachorro', raca: '', idade: 0, observacoes: '' };
    const modal = document.getElementById('petModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  editarPet(pet: Pet) {
    this.editandoPet = true;
    this.petFormData = { ...pet };
    const modal = document.getElementById('petModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  fecharModalPet() {
    const modal = document.getElementById('petModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  salvarPet() {
    const formData = { ...this.petFormData };
    formData.clienteId = this.clienteId;

    if (this.editandoPet) {
      this.petService.atualizarPet(formData.id, formData).subscribe({
        next: () => {
          this.fecharModalPet();
          this.carregarPets();
          this.toastService.success('✅ Sucesso', 'Pet atualizado com sucesso!');
        },
        error: () => {
          this.toastService.error('❌ Erro', 'Erro ao atualizar pet.');
        }
      });
    } else {
      this.petService.criarPet(formData).subscribe({
        next: () => {
          this.fecharModalPet();
          this.carregarPets();
          this.toastService.success('✅ Sucesso', 'Pet criado com sucesso!');
        },
        error: () => {
          this.toastService.error('❌ Erro', 'Erro ao criar pet.');
        }
      });
    }
  }

  deletarPet(id: number) {
    if (confirm('Tem certeza que deseja deletar este pet?')) {
      this.petService.deletarPet(id).subscribe({
        next: () => {
          this.carregarPets();
          this.toastService.success('✅ Sucesso', 'Pet deletado com sucesso!');
        },
        error: () => {
          this.toastService.error('❌ Erro', 'Erro ao deletar pet.');
        }
      });
    }
  }

  // ===== SERVIÇO =====
  abrirServico(pet: Pet) {
    this.petSelecionado = pet;
    this.servicoFormData = { tipo: '', preco: 0, observacoes: '' };
    const modal = document.getElementById('servicoModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  fecharModalServico() {
    const modal = document.getElementById('servicoModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    this.petSelecionado = null;
  }

  buscarPrecoServico() {
    const tipo = this.servicoFormData.tipo;
    if (!tipo) return;

    this.precoService.buscarPorTipo(tipo).subscribe({
      next: (preco) => {
        this.servicoFormData.preco = preco.preco;
        this.toastService.info('💰 Preço encontrado', `Valor sugerido: R$ ${preco.preco.toFixed(2)}`);
      },
      error: () => {
        this.servicoFormData.preco = 0;
        this.toastService.warning('⚠️ Atenção', 'Preço não encontrado. Aguarde o admin definir.');
      }
    });
  }

  salvarServico() {
    if (!this.petSelecionado) return;

    const formData: ServicoCreate = {
      petId: this.petSelecionado.id,
      tipo: this.servicoFormData.tipo,
      preco: this.servicoFormData.preco || 0,
      observacoes: this.servicoFormData.observacoes || ''
    };

    this.servicoService.criarServico(formData).subscribe({
      next: () => {
        this.fecharModalServico();
        this.carregarServicos();
        this.toastService.success('✅ Sucesso', 'Serviço solicitado com sucesso!');
      },
      error: () => {
        this.toastService.error('❌ Erro', 'Erro ao solicitar serviço.');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
