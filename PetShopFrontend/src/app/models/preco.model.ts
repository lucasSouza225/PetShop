export interface PrecoServico {
  id: number;
  tipo: string; // "Banho", "Tosa", "Banho e Tosa", "Vacina", "Consulta"
  preco: number;
  descricao?: string;
  ativo: boolean;
}

export interface PrecoServicoUpdate {
  tipo: string;
  preco: number;
  descricao?: string;
  ativo?: boolean;
}
