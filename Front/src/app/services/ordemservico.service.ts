import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ordemservico } from '@app/models/ordemservico.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/ordemservico';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrdemservicoService {

  constructor(private http: HttpClient) { }

  consultar (): Observable<Ordemservico[]> {
      return this.http.get<Ordemservico[]>(url);
  }

  consultaPorId(id: number): Observable<Ordemservico> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<Ordemservico>(urlLocal);
  }

  adicionar (Ordemservico: Ordemservico): Observable<Ordemservico> {
      return this.http.post<Ordemservico>(url, Ordemservico, httpOptions);
  }

  alterar (id: number, Ordemservico: Ordemservico): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, Ordemservico, httpOptions);
  }

  excluir (id: number): Observable<Ordemservico> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<Ordemservico>(urlLocal, httpOptions);
  }
}
