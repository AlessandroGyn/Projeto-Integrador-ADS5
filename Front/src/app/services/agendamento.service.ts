import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/agendamentos';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private funcionarioUrl = 'http://localhost:8080/funcionarios'; // URL para obter os dados do funcionário
  constructor(private http: HttpClient) { }

  getAgendamentos(): Observable<any> {
    return this.http.get<any>(url);
  }

  obterFuncionario(funcionarioId: number): Observable<any> {
    const funcionarioUrl = `${this.funcionarioUrl}/${funcionarioId}`;
    return this.http.get<any>(funcionarioUrl);
  }



// abaixo não esta sendo usado ainda

  consultar (): Observable<Agendamento[]> {
      return this.http.get<Agendamento[]>(url);
  }

  consultaPorId(id: number): Observable<Agendamento> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<Agendamento>(urlLocal);
  }

  adicionar (Agendamento: Agendamento): Observable<Agendamento> {
      return this.http.post<Agendamento>(url, Agendamento, httpOptions);
  }

  alterar (id: number, Agendamento: Agendamento): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, Agendamento, httpOptions);
  }

  excluir (id: number): Observable<Agendamento> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<Agendamento>(urlLocal, httpOptions);
  }

}
