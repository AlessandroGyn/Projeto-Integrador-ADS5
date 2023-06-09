import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // o método consultarPorCampos() é usado para pegar todos os clientes do
  // banco de dados e comparar com o cliente que esta sendo gravado no banco
  // se já existir um cliente com todos os dados iguais = não gravar
  // caso contrário = gravar
  consultarPorCampos(campos: any): Observable<boolean> {
    const urlConsulta = `${url}?nome=${campos.nome}&telefone=${campos.telefone}&email=${campos.email}&uf=${campos.uf}`;
    return this.http.get<Cliente[]>(urlConsulta)
      .pipe(
        map((clientes: Cliente[]) => {
          console.log('Lista de clientes:', clientes);
          return clientes.some(cliente => this.compararCampos(cliente, campos));
      })
    );
  }

  compararCampos(cliente: Cliente, campos: any): boolean {
    return cliente.nome === campos.nome &&
    cliente.telefone === campos.telefone &&
    cliente.email === campos.email &&
    cliente.uf === campos.uf;
  }

}
