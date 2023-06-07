import { Cliente } from "./cliente.model";
import { Funcionario } from "./funcionario.model";
import { Servico } from "./servico.model";

export class Agendamento {
  id: number = 0;
  datas: string = '';
  hora: string = '';
  status: string = '';
  observacao: string = '';
  cliente!: Cliente;
  respagendamento!: Funcionario;
  servico!: Servico;
}
