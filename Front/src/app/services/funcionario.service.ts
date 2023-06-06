import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '@app/models/funcionario.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/funcionario';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  consultar (): Observable<Funcionario[]> {
      return this.http.get<Funcionario[]>(url);
  }

  consultaPorId(id: number): Observable<Funcionario> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<Funcionario>(urlLocal);
  }

  adicionar (Funcionario: Funcionario): Observable<Funcionario> {
      return this.http.post<Funcionario>(url, Funcionario, httpOptions);
  }

  alterar (id: number, Funcionario: Funcionario): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, Funcionario, httpOptions);
  }

  excluir (id: number): Observable<Funcionario> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<Funcionario>(urlLocal, httpOptions);
  }
}
