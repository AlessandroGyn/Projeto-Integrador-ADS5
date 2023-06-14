import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Funcionario } from '@app/models/funcionario.model';
import { Servico } from '@app/models/servico.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = 'http://localhost:8080/servicos';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  consultar (): Observable<Servico[]> {
      return this.http.get<Servico[]>(url);
  }

  consultaPorId(id: number): Observable<Servico> {
      const urlLocal = `${url}/${id}`;
      return this.http.get<Servico>(urlLocal);
  }

  adicionar(servico: Servico): Observable<Servico> {
    servico.precoVenda = parseFloat(servico.precoVenda.toFixed(2)); // Formata o valor para duas casas decimais
    servico.precoCusto = parseFloat(servico.precoCusto.toFixed(2)); // Formata o valor para duas casas decimais
    return this.http.post<Servico>(url, servico, httpOptions);
  }


  alterar (id: number, Servico: Servico): Observable<any> {
      const urlLocal = `${url}/${id}`;
      return this.http.put(urlLocal, Servico, httpOptions);
  }

  excluir (id: number): Observable<Servico> {
      const urlLocal = `${url}/${id}`;
      return this.http.delete<Servico>(urlLocal, httpOptions);
  }

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.apiUrl}/servicos`);
  }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionarios`);
  }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos`);
  }
  // O método consultarPorCampos() é usado para pegar todos os serviços do
  // banco de dados e comparar com o serviço que esta sendo gravado no banco.
  // Se já existir um serviço com todos os dados iguais = não gravar
  // caso contrário = gravar
  consultarPorCampos(campos: any): Observable<boolean> {
    const urlConsulta = `${url}?nome=${campos.nome}&descricao=${campos.descricao}&precoCusto=${campos.precoCusto}&precoVenda=${campos.precoVenda}`;
    return this.http.get<Servico[]>(urlConsulta).pipe(
      map((servicos: Servico[]) => {
        return servicos.some(servico => this.compararCampos(servico, campos));
      })
    );
  }

  compararCampos(servico: Servico, campos: any): boolean {
    return (
      servico.nome === campos.nome &&
      servico.descricao === campos.descricao &&
      servico.precoCusto === campos.precoCusto &&
      servico.precoVenda === campos.precoVenda
    );
  }
}
