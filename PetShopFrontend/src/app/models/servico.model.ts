export interface Servico {
  id: number;
  petId: number;
  petNome: string;
  donoNome: string;
  telefoneDono: string;
  tipo: string;
  status: string;
  dataSolicitacao: Date;
  dataConclusao?: Date;
  observacoes?: string;
  preco: number;
  pago: boolean;
}

export interface ServicoCreate {
  petId: number;
  tipo: string;
  observacoes?: string;
  preco: number;
}

export interface ServicoStatusUpdate {
  id: number;
  status: string;
}
