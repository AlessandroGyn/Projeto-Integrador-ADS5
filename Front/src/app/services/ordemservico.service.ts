import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Funcionario } from '@app/models/funcionario.model';
import { OrdemServico } from '@app/models/ordemservico.model';
import { Servico } from '@app/models/servico.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/ordemservico';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.apiUrl}/servicos`);
  }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionarios`);
  }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos`);
  }

  consultar (): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(`${this.apiUrl}/ordemservicos`);
  }

  consultaPorId(id: number): Observable<OrdemServico> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<OrdemServico>(urlLocal);
  }

  adicionar (ordemServico: OrdemServico): Observable<OrdemServico> {
      return this.http.post<OrdemServico>(url, ordemServico, httpOptions);
  }

  alterar (id: number, ordemServico: OrdemServico): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, ordemServico, httpOptions);
  }

  excluir (id: number): Observable<OrdemServico> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<OrdemServico>(urlLocal, httpOptions);
  }
}
