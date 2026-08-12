import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, PetCreate } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:5206/api/Pets';

  constructor(private http: HttpClient) {}

  listarPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  buscarPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  criarPet(pet: PetCreate): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  atualizarPet(id: number, pet: Pet): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pet);
  }

  deletarPet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarPetsPorCliente(clienteId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}
