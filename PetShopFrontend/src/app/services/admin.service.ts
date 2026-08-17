import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5206/api';

  constructor(private http: HttpClient) {}

  // Estatísticas
  getEstatisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Servicos/estatisticas`);
  }

  // Listar todos os clientes (admin)
  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Clientes`);
  }

  // Listar todos os pets (admin)
  listarPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Pets`);
  }
}
