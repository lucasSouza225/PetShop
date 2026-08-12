import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico, ServicoCreate, ServicoStatusUpdate } from '../models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl = 'http://localhost:5206/api/Servicos';

  constructor(private http: HttpClient) {}

  listarServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  listarServicosPorPet(petId: number): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.apiUrl}/pet/${petId}`);
  }

  criarServico(servico: ServicoCreate): Observable<Servico> {
    return this.http.post<Servico>(this.apiUrl, servico);
  }

  atualizarStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, `"${status}"`);
  }

  deletarServico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEstatisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estatisticas`);
  }
}
