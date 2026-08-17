import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrecoServico, PrecoServicoUpdate } from '../models/preco.model';

@Injectable({
  providedIn: 'root'
})
export class PrecoService {
  private apiUrl = 'http://localhost:5206/api/Precos';

  constructor(private http: HttpClient) {}

  // Listar todos os preços
  listarPrecos(): Observable<PrecoServico[]> {
    return this.http.get<PrecoServico[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Buscar preço por tipo de serviço
  buscarPorTipo(tipo: string): Observable<PrecoServico> {
    return this.http.get<PrecoServico>(`${this.apiUrl}/tipo/${tipo}`)
      .pipe(catchError(this.handleError));
  }

  // Criar novo preço
  criarPreco(preco: PrecoServicoUpdate): Observable<PrecoServico> {
    return this.http.post<PrecoServico>(this.apiUrl, preco)
      .pipe(catchError(this.handleError));
  }

  // Atualizar preço
  atualizarPreco(id: number, preco: PrecoServicoUpdate): Observable<PrecoServico> {
    return this.http.put<PrecoServico>(`${this.apiUrl}/${id}`, preco)
      .pipe(catchError(this.handleError));
  }

  // Atualizar preço por tipo
  atualizarPrecoPorTipo(tipo: string, preco: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/tipo/${tipo}`, { preco })
      .pipe(catchError(this.handleError));
  }

  // Deletar preço
  deletarPreco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Desativar/Reativar preço
  togglePreco(id: number, ativo: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { ativo })
      .pipe(catchError(this.handleError));
  }

  // 🔥 TRATAMENTO DE ERROS
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro ao processar sua requisição.';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`;

      // Verifica se a API retornou uma mensagem de erro
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.title) {
        errorMessage = error.error.title;
      }
    }

    console.error('❌ Erro no PrecoService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
