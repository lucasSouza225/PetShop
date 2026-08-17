import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ServicoService } from '../../services/servico.service';
import { AdminService } from '../../services/admin.service';
import { PrecoService } from '../../services/preco.service';
import { ToastService } from '../../services/toast.service';
import { Servico } from '../../models/servico.model';
import { PrecoServico } from '../../models/preco.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid p-0">
      <!-- NAVBAR DO ADMIN -->
      <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #0f625e;">
        <div class="container">
          <a class="navbar-brand fw-bold" routerLink="/">
            <i class="fas fa-paw me-2"></i>Mundo Pet - Admin
          </a>
          <div class="ms-auto d-flex align-items-center">
            <span class="text-white me-3 d-none d-sm-inline">
              <i class="fas fa-user-shield me-1"></i> {{ nomeUsuario }}
            </span>
            <button class="btn btn-outline-light btn-sm" (click)="logout()">
              <i class="fas fa-sign-out-alt me-1"></i> Sair
            </button>
          </div>
        </div>
      </nav>

      <!-- CONTEÚDO -->
      <div class="container py-4">
        <!-- Título -->
        <div class="row mb-4">
          <div class="col-12">
            <h1 class="display-6 fw-bold" style="color: #0f625e;">
              <i class="fas fa-user-shield me-2"></i>Painel Administrativo
            </h1>
            <p class="text-muted">Gerencie todos os serviços, clientes e pets do sistema.</p>
          </div>
        </div>

        <!-- CARDS DE ESTATÍSTICAS -->
        <div class="row g-4 mb-4">
          <div class="col-md-3">
            <div class="card text-white bg-primary h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-white-50">Total</h6>
                    <h2 class="mb-0">{{ estatisticas.total || 0 }}</h2>
                  </div>
                  <i class="fas fa-clipboard-list fa-3x text-white-50"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-dark bg-warning h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-dark-50">Aguardando</h6>
                    <h2 class="mb-0">{{ estatisticas.aguardando || 0 }}</h2>
                  </div>
                  <i class="fas fa-clock fa-3x text-dark-50"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-white bg-info h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-white-50">Em Andamento</h6>
                    <h2 class="mb-0">{{ estatisticas.emAndamento || 0 }}</h2>
                  </div>
                  <i class="fas fa-spinner fa-3x text-white-50"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-white bg-success h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-white-50">Prontos</h6>
                    <h2 class="mb-0">{{ estatisticas.pronto || 0 }}</h2>
                  </div>
                  <i class="fas fa-check-circle fa-3x text-white-50"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TABS -->
        <ul class="nav nav-tabs mb-4" id="adminTabs" role="tablist">
          <li class="nav-item">
            <button class="nav-link active" id="servicos-tab" data-bs-toggle="tab" data-bs-target="#servicos" type="button" style="color: #0f625e;">
              <i class="fas fa-cut me-1"></i> Serviços
              <span class="badge bg-primary ms-1" style="background-color: #0f625e;">{{ servicos.length }}</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="clientes-tab" data-bs-toggle="tab" data-bs-target="#clientes" type="button" style="color: #0f625e;">
              <i class="fas fa-users me-1"></i> Clientes
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="pets-tab" data-bs-toggle="tab" data-bs-target="#pets" type="button" style="color: #0f625e;">
              <i class="fas fa-dog me-1"></i> Pets
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="precos-tab" data-bs-toggle="tab" data-bs-target="#precos" type="button" style="color: #0f625e;">
              <i class="fas fa-tags me-1"></i> Tabela de Preços
            </button>
          </li>
        </ul>

        <div class="tab-content">
          <!-- TAB SERVIÇOS -->
          <div class="tab-pane fade show active" id="servicos">
            <div *ngIf="carregando" class="text-center py-5">
              <div class="spinner-border text-primary" style="color: #0f625e;" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>

            <div *ngIf="!carregando && servicos.length === 0" class="text-center py-5">
              <i class="fas fa-cut fa-4x text-muted mb-3"></i>
              <p class="text-muted">Nenhum serviço cadastrado ainda.</p>
            </div>

            <div *ngIf="!carregando && servicos.length > 0">
              <div class="mb-3">
                <select class="form-select w-auto d-inline-block" [(ngModel)]="filtroStatus" (change)="filtrarServicos()" style="border-color: #0f625e;">
                  <option value="">Todos os status</option>
                  <option value="Aguardando">Aguardando</option>
                  <option value="EmAndamento">Em Andamento</option>
                  <option value="Pronto">Pronto</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div class="row g-4">
                <div class="col-12" *ngFor="let servico of servicosFiltrados">
                  <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-md-2">
                          <h5 class="fw-bold mb-0" style="color: #0f625e;">{{ servico.tipo }}</h5>
                          <small class="text-muted">Pet: {{ servico.petNome }}</small>
                        </div>
                        <div class="col-md-2">
                          <small class="text-muted d-block">Cliente: {{ servico.donoNome }}</small>
                          <small class="text-muted d-block"><i class="fas fa-phone me-1"></i> {{ servico.telefoneDono }}</small>
                        </div>
                        <div class="col-md-2">
                          <select class="form-select form-select-sm" [(ngModel)]="servico.status" (change)="atualizarStatus(servico)" style="border-color: #0f625e;">
                            <option value="Aguardando">Aguardando</option>
                            <option value="EmAndamento">Em Andamento</option>
                            <option value="Pronto">Pronto</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                        </div>
                        <div class="col-md-2">
                          <div class="input-group input-group-sm">
                            <span class="input-group-text">R$</span>
                            <input type="number" class="form-control" [(ngModel)]="servico.preco" (change)="atualizarPreco(servico)" step="0.01" min="0">
                          </div>
                        </div>
                        <div class="col-md-2">
                          <small class="text-muted d-block"><i class="fas fa-calendar me-1"></i> {{ servico.dataSolicitacao | date:'dd/MM/yyyy HH:mm' }}</small>
                          <div *ngIf="servico.dataConclusao" class="small text-success"><i class="fas fa-check-circle me-1"></i> Concluído: {{ servico.dataConclusao | date:'dd/MM/yyyy' }}</div>
                        </div>
                        <div class="col-md-2 text-end">
                          <span class="fw-bold" style="color: #0f625e;">R$ {{ servico.preco | number:'1.2-2' }}</span>
                        </div>
                      </div>
                      <div *ngIf="servico.observacoes" class="mt-2">
                        <small class="text-muted"><i class="fas fa-comment me-1"></i> {{ servico.observacoes }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CLIENTES -->
          <div class="tab-pane fade" id="clientes">
            <div *ngIf="carregandoClientes" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Carregando...</span></div>
            </div>

            <div *ngIf="!carregandoClientes && clientes.length === 0" class="text-center py-5">
              <i class="fas fa-users fa-4x text-muted mb-3"></i>
              <p class="text-muted">Nenhum cliente cadastrado.</p>
            </div>

            <div *ngIf="!carregandoClientes && clientes.length > 0" class="row g-4">
              <div class="col-md-6 col-lg-4" *ngFor="let cliente of clientes">
                <div class="card border-0 shadow-sm rounded-4 h-100">
                  <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                      <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <i class="fas fa-user fa-2x" style="color: #0f625e;"></i>
                      </div>
                      <div>
                        <h5 class="fw-bold mb-0" style="color: #0f625e;">{{ cliente.nome }}</h5>
                        <small class="text-muted">{{ cliente.email }}</small>
                      </div>
                    </div>
                    <p class="card-text small">
                      <i class="fas fa-phone me-1"></i> {{ cliente.telefone }}<br>
                      <i class="fas fa-paw me-1"></i> {{ cliente.pets?.length || 0 }} pets<br>
                      <i class="fas fa-calendar me-1"></i> Cadastro: {{ cliente.dataCadastro | date:'dd/MM/yyyy' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB PETS -->
          <div class="tab-pane fade" id="pets">
            <div *ngIf="carregandoPets" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Carregando...</span></div>
            </div>

            <div *ngIf="!carregandoPets && pets.length === 0" class="text-center py-5">
              <i class="fas fa-dog fa-4x text-muted mb-3"></i>
              <p class="text-muted">Nenhum pet cadastrado.</p>
            </div>

            <div *ngIf="!carregandoPets && pets.length > 0" class="row g-4">
              <div class="col-md-6 col-lg-4" *ngFor="let pet of pets">
                <div class="card border-0 shadow-sm rounded-4 h-100">
                  <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                      <div class="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                        <i class="fas fa-dog fa-2x" style="color: #0f625e;"></i>
                      </div>
                      <div>
                        <h5 class="fw-bold mb-0" style="color: #0f625e;">{{ pet.nome }}</h5>
                        <small class="text-muted">Dono: {{ pet.cliente?.nome || 'Não informado' }}</small>
                      </div>
                    </div>
                    <p class="card-text small">
                      <i class="fas fa-paw me-1"></i> {{ pet.especie }}<br>
                      <i class="fas fa-tag me-1"></i> {{ pet.raca || 'Raça não informada' }}<br>
                      <i class="fas fa-calendar me-1"></i> {{ pet.idade }} anos
                    </p>
                    <p class="card-text small" *ngIf="pet.observacoes">
                      <i class="fas fa-comment me-1"></i> {{ pet.observacoes }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB PREÇOS -->
          <div class="tab-pane fade" id="precos">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold" style="color: #0f625e;"><i class="fas fa-tags me-2"></i> Tabela de Preços</h5>
              <button class="btn btn-primary btn-sm" style="background-color: #0f625e; border-color: #0f625e;" (click)="adicionarPreco()">
                <i class="fas fa-plus me-1"></i> Novo Serviço
              </button>
            </div>

            <div *ngIf="carregandoPrecos" class="text-center py-5">
              <div class="spinner-border text-primary" style="color: #0f625e;" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>

            <div *ngIf="!carregandoPrecos && precos.length === 0" class="text-center py-5">
              <i class="fas fa-tags fa-4x text-muted mb-3"></i>
              <p class="text-muted">Nenhum preço cadastrado.</p>
              <button class="btn btn-primary" style="background-color: #0f625e; border-color: #0f625e;" (click)="adicionarPreco()">
                <i class="fas fa-plus me-1"></i> Cadastrar Primeiro
              </button>
            </div>

            <div *ngIf="!carregandoPrecos && precos.length > 0" class="table-responsive">
              <table class="table table-hover align-middle">
                <thead style="background-color: #0f625e; color: white;">
                  <tr>
                    <th>Serviço</th>
                    <th>Descrição</th>
                    <th>Preço (R$)</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let preco of precos">
                    <td><span class="fw-bold" style="color: #0f625e;">{{ preco.tipo }}</span></td>
                    <td>
                      <input type="text" class="form-control form-control-sm" [(ngModel)]="preco.descricao" placeholder="Descrição">
                    </td>
                    <td>
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">R$</span>
                        <input type="number" class="form-control" [(ngModel)]="preco.preco" step="0.01" min="0" style="width: 100px;">
                      </div>
                    </td>
                    <td>
                      <span class="badge rounded-pill px-3 py-2" [ngClass]="{ 'bg-success': preco.ativo, 'bg-danger': !preco.ativo }">
                        {{ preco.ativo ? 'Ativo' : 'Inativo' }}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-outline-primary" style="color: #0f625e; border-color: #0f625e;" (click)="salvarPreco(preco)">
                          <i class="fas fa-save"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary" (click)="togglePrecoStatus(preco)">
                          <i class="fas" [ngClass]="{ 'fa-toggle-on': preco.ativo, 'fa-toggle-off': !preco.ativo }"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" (click)="deletarPreco(preco.id)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: NOVO PREÇO -->
    <div class="modal fade" id="precoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4">
          <div class="modal-header border-0" style="background-color: #f8f9fa;">
            <h5 class="modal-title fw-bold" style="color: #0f625e;">
              <i class="fas fa-plus me-2"></i> Novo Serviço
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form #precoForm="ngForm">
              <div class="mb-3">
                <label class="form-label fw-semibold">Tipo de Serviço *</label>
                <input type="text" class="form-control" [(ngModel)]="novoPreco.tipo" name="tipo" required placeholder="Ex: Banho">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Descrição</label>
                <input type="text" class="form-control" [(ngModel)]="novoPreco.descricao" name="descricao" placeholder="Descrição do serviço">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Preço (R$) *</label>
                <input type="number" class="form-control" [(ngModel)]="novoPreco.preco" name="preco" step="0.01" min="0" required>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" style="background-color: #0f625e; border-color: #0f625e;" (click)="criarPreco()" [disabled]="precoForm.invalid">
              <i class="fas fa-check me-1"></i> Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nav-tabs .nav-link { border: none; font-weight: 500; padding: 10px 20px; }
    .nav-tabs .nav-link.active { border-bottom: 3px solid #0f625e; background: transparent; color: #0f625e !important; }
    .nav-tabs .nav-link:hover { border-bottom: 3px solid #0f625e; }
    .card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08) !important; }
    .form-select, .form-control { border-radius: 8px; }
    .form-select:focus, .form-control:focus { border-color: #0f625e; box-shadow: 0 0 0 0.2rem rgba(15, 98, 94, 0.25); }
    .input-group-text { background-color: #f8f9fa; border-color: #dee2e6; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  servicos: Servico[] = [];
  servicosFiltrados: Servico[] = [];
  clientes: any[] = [];
  pets: any[] = [];
  estatisticas: any = {};
  precos: PrecoServico[] = [];
  carregando = false;
  carregandoClientes = false;
  carregandoPets = false;
  carregandoPrecos = false;
  filtroStatus: string = '';
  novoPreco: any = { tipo: '', descricao: '', preco: 0 };

  get nomeUsuario(): string {
    return this.authService.getCurrentUser()?.nome || 'Admin';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private servicoService: ServicoService,
    private adminService: AdminService,
    private precoService: PrecoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.carregarDados();
    this.carregarPrecos();
  }

  carregarDados() {
    this.carregarServicos();
    this.carregarEstatisticas();
    this.carregarClientes();
    this.carregarPets();
  }

  carregarServicos() {
    this.carregando = true;
    this.servicoService.listarServicos().subscribe({
      next: (data) => {
        this.servicos = data;
        this.servicosFiltrados = data;
        this.carregando = false;
      },
      error: () => {
        this.servicos = [];
        this.servicosFiltrados = [];
        this.carregando = false;
        this.toastService.error('❌ Erro', 'Erro ao carregar serviços.');
      }
    });
  }

  carregarEstatisticas() {
    this.adminService.getEstatisticas().subscribe({
      next: (data) => this.estatisticas = data,
      error: () => this.estatisticas = {}
    });
  }

  carregarClientes() {
    this.carregandoClientes = true;
    this.adminService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.carregandoClientes = false;
      },
      error: () => {
        this.clientes = [];
        this.carregandoClientes = false;
        this.toastService.error('❌ Erro', 'Erro ao carregar clientes.');
      }
    });
  }

  carregarPets() {
    this.carregandoPets = true;
    this.adminService.listarPets().subscribe({
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

  carregarPrecos() {
    this.carregandoPrecos = true;
    this.precoService.listarPrecos().subscribe({
      next: (data) => {
        this.precos = data;
        this.carregandoPrecos = false;
      },
      error: () => {
        this.precos = [];
        this.carregandoPrecos = false;
        this.toastService.error('❌ Erro', 'Erro ao carregar preços.');
      }
    });
  }

  filtrarServicos() {
    if (this.filtroStatus) {
      this.servicosFiltrados = this.servicos.filter(s => s.status === this.filtroStatus);
    } else {
      this.servicosFiltrados = this.servicos;
    }
  }

  atualizarStatus(servico: Servico) {
    this.servicoService.atualizarStatus(servico.id, servico.status).subscribe({
      next: () => {
        this.carregarEstatisticas();
        this.toastService.success('✅ Sucesso', 'Status atualizado com sucesso!');
      },
      error: () => this.toastService.error('❌ Erro', 'Erro ao atualizar status.')
    });
  }

  atualizarPreco(servico: Servico) {
    this.servicoService.atualizarPreco(servico.id, servico.preco).subscribe({
      next: () => {
        this.toastService.success('✅ Sucesso', 'Preço atualizado com sucesso!');
        this.carregarEstatisticas();
      },
      error: () => this.toastService.error('❌ Erro', 'Erro ao atualizar preço.')
    });
  }

  salvarPreco(preco: PrecoServico) {
    this.precoService.atualizarPreco(preco.id, preco).subscribe({
      next: () => {
        this.carregarPrecos();
        this.toastService.success('✅ Sucesso', 'Preço atualizado com sucesso!');
      },
      error: () => this.toastService.error('❌ Erro', 'Erro ao atualizar preço.')
    });
  }

  togglePrecoStatus(preco: PrecoServico) {
    preco.ativo = !preco.ativo;
    this.precoService.atualizarPreco(preco.id, preco).subscribe({
      next: () => {
        this.carregarPrecos();
        this.toastService.success('✅ Sucesso', `Serviço ${preco.ativo ? 'ativado' : 'desativado'} com sucesso!`);
      },
      error: () => this.toastService.error('❌ Erro', 'Erro ao alterar status.')
    });
  }

  adicionarPreco() {
    this.novoPreco = { tipo: '', descricao: '', preco: 0 };
    const modal = document.getElementById('precoModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  fecharModalPreco() {
    const modal = document.getElementById('precoModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  criarPreco() {
    if (!this.novoPreco.tipo || this.novoPreco.tipo.trim() === '') {
      this.toastService.warning('⚠️ Atenção', 'O campo "Tipo de Serviço" é obrigatório.');
      return;
    }

    if (!this.novoPreco.preco || this.novoPreco.preco <= 0) {
      this.toastService.warning('⚠️ Atenção', 'O campo "Preço" deve ser maior que zero.');
      return;
    }

    const dadosParaEnviar = {
      tipo: this.novoPreco.tipo.trim(),
      descricao: this.novoPreco.descricao?.trim() || '',
      preco: parseFloat(this.novoPreco.preco),
      ativo: true
    };

    this.precoService.criarPreco(dadosParaEnviar).subscribe({
      next: () => {
        this.fecharModalPreco();
        this.carregarPrecos();
        this.toastService.success('✅ Sucesso', 'Serviço cadastrado com sucesso!');
      },
      error: (error) => {
        this.toastService.error('❌ Erro', error.message || 'Erro ao cadastrar serviço.');
      }
    });
  }

  deletarPreco(id: number) {
    if (confirm('Tem certeza que deseja deletar este serviço?')) {
      this.precoService.deletarPreco(id).subscribe({
        next: () => {
          this.carregarPrecos();
          this.toastService.success('✅ Sucesso', 'Serviço deletado com sucesso!');
        },
        error: () => this.toastService.error('❌ Erro', 'Erro ao deletar serviço.')
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
