export interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  observacoes?: string;
  clienteId: number;
  clienteNome?: string;
}

export interface PetCreate {
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  observacoes?: string;
  clienteId: number;
}
