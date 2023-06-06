import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from '@app/models/servico.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/servico';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  consultar (): Observable<Servico[]> {
      return this.http.get<Servico[]>(url);
  }

  consultaPorId(id: number): Observable<Servico> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<Servico>(urlLocal);
  }

  adicionar (Servico: Servico): Observable<Servico> {
      return this.http.post<Servico>(url, Servico, httpOptions);
  }

  alterar (id: number, Servico: Servico): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, Servico, httpOptions);
  }

  excluir (id: number): Observable<Servico> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<Servico>(urlLocal, httpOptions);
  }
}
