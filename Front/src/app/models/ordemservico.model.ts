import { Agendamento } from "./agendamento.model";
import { Funcionario } from "./funcionario.model";
import { Servico } from "./servico.model";

export class OrdemServico {
  id: number = 0;
  datahorainicio: string = '';
  datahoratermino: string = '';
  status: string = '';
  valor: number = 0;
  agendamento: Agendamento = new Agendamento();
  servico: Servico = new Servico();
  respOS: Funcionario = new Funcionario();
  execServico: Funcionario = new Funcionario();
  editMode: boolean = false;
}
