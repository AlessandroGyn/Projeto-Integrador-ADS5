import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/clientes';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  consultar (): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(url);
  }

  consultaPorId(id: number): Observable<Cliente> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<Cliente>(urlLocal);
  }

  adicionar (Cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(url, Cliente, httpOptions);
  }

  alterar (id: number, Cliente: Cliente): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, Cliente, httpOptions);
  }

  excluir (id: number): Observable<Cliente> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<Cliente>(urlLocal, httpOptions);
  }
}
