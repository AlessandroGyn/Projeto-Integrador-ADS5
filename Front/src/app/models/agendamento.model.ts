import { Cliente } from "./cliente.model";
import { Funcionario } from "./funcionario.model";
import { Servico } from "./servico.model";

export class Agendamento {
  id: number = 0;
  datas: Date = new Date();
  hora: Date = new Date();
  status: string = '';
  observacao: string = '';
  cliente: Cliente = new Cliente();
  respAgendamento: Funcionario = new Funcionario();
  servico: Servico = new Servico();
  editMode: boolean = false;
}
