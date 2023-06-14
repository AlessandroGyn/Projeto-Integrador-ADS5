import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Servico } from '@app/models/servico.model';
import { Cliente } from '@app/models/cliente.model';
import { Funcionario } from '@app/models/funcionario.model';

const url = 'http://localhost:8080/agendamentos';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionarios`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }


  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.apiUrl}/servicos`);
  }

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
  // O método consultarPorCampos() é usado para pegar todos os agendamentos do
  // banco de dados e comparar com o agendamento que esta sendo gravado vindo da página web.
  // Se já existir um agendamento com data e hora iguais = não gravar
  // caso contrário = gravar
  consultarPorCampos(campos: any): Observable<boolean> {

    const datas = campos.datas.toISOString(); // Converte para o formato ISO8601
    const hora = campos.hora.toISOString(); // Converte para o formato ISO8601
    const cliente = encodeURIComponent(campos.cliente); // Codifica o valor do cliente para ser incluído na URL
    const urlConsulta = `${url}?datas=${datas}&hora=${hora}&cliente=${cliente}`;
    return this.http.get<Agendamento[]>(urlConsulta).pipe(
      map((agendamentos: Agendamento[]) => {
        return agendamentos.some(agendamento => this.compararCampos(agendamento, campos));
      })
    );

  }

  compararCampos(agendamento: Agendamento, campos: any): boolean {

    agendamento.datas = new Date(agendamento.datas);
    agendamento.hora = new Date(agendamento.hora);

    // abaixo junta na mesma variavel o valor "dia + hora"
    const agendamentoNovoWeb = new Date(campos.datas);  // vem da pagina web
    agendamentoNovoWeb.setHours(campos.hora.getHours());
    agendamentoNovoWeb.setMinutes(campos.hora.getMinutes());
    agendamentoNovoWeb.setSeconds(campos.hora.getSeconds());

    const agendamentoBD = new Date(agendamento.datas); // vem do banco
    agendamentoBD.setHours(agendamento.hora.getHours());
    agendamentoBD.setMinutes(agendamento.hora.getMinutes());
    agendamentoBD.setSeconds(agendamento.hora.getSeconds());

    const inicioAgendamentoBD = agendamentoBD.getTime(); // horário início agendamento gravado no BD
    const fimAgendamentoBD = agendamentoBD.getTime() + 30 * 60 * 1000; // Adiciona 30 minutos ao agendamentoBD para ter o final dele

    return (
      agendamento.cliente === campos.cliente &&
      (agendamentoNovoWeb.getTime() >= inicioAgendamentoBD &&
      agendamentoNovoWeb.getTime() <= fimAgendamentoBD )
    );
    /*
    retornará true se houver um agendamento existente
    com a mesma data e um horário que esteja dentro do
    intervalo de 30 minutos após o horário do agendamento existente,
    e o mesmo cliente
    */
  }


}
