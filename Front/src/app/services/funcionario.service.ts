import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '@app/models/funcionario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = 'http://localhost:8080/funcionarios';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private funcionarios: Funcionario[] = [];
  private apiUrl = 'http://localhost:8080/funcionarios';

  constructor(private http: HttpClient) {
    this.getFuncionarios().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
    });
   }



  /*getFuncionarioByLogin(login: string): Observable<Funcionario | undefined> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}?login=${login}`).pipe(
      map(funcionarios => funcionarios.find(funcionario => funcionario.login === login)),
      map(funcionario => funcionario !== undefined ? funcionario : undefined)
    );
  }*/

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }



  getFuncionarioByLogin(username: string): Funcionario | undefined {
      return this.funcionarios.find(funcionario => funcionario.login === username);
  }

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

  // o método consultarPorCampos() é usado para pegar todos os funcionários do
  // banco de dados e comparar com o funcionário que esta sendo gravado no banco
  // se já existir um funcionário com todos os dados iguais = não gravar
  // caso contrário = gravar
  consultarPorCampos(campos: any): Observable<boolean> {
    const urlConsulta = `${url}?login=${campos.login}&senha=${campos.senha}&email=${campos.email}&fone=${campos.fone}&comissao=${campos.comissao}`;
    return this.http.get<Funcionario[]>(urlConsulta).pipe(
      map((funcionarios: Funcionario[]) => {
        return funcionarios.some(funcionario => this.compararCampos(funcionario, campos));
      })
    );
  }

  compararCampos(funcionario: Funcionario, campos: any): boolean {
    return (
      funcionario.login === campos.login &&
      funcionario.senha === campos.senha &&
      funcionario.email === campos.email &&
      funcionario.fone === campos.fone &&
      funcionario.comissao === campos.comissao
    );
  }
}
