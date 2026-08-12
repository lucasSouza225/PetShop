import { Pet } from '../models/pet.model';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  telefone: string;
  dataCadastro: Date;
  role: string;
  pets: Pet[];
}

export interface ClienteCreate {
  nome: string;
  email: string;
  senhaHash: string;
  telefone: string;
}
