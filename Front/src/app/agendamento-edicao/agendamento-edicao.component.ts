import { Component, Input, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Funcionario } from '@app/models/funcionario.model';
import { AgendamentoService } from '@app/services/agendamento.service';

@Component({
  selector: 'app-agendamento-edicao',
  templateUrl: './agendamento-edicao.component.html',
  styleUrls: ['./agendamento-edicao.component.less']
})
export class AgendamentoEdicaoComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  agendamentoSelecionado: Agendamento | null = null;
  agendamentoService: AgendamentoService[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  @Input() agendamento: Agendamento | null = null;

  salvarEdicao() {
    /*

    // Lógica para salvar as alterações no agendamento
    if (this.agendamentoSelecionado) {
      const agendamentoId = this.agendamentoSelecionado.id;
      // Verificar se o agendamento não é nulo
      if (agendamentoId) {
        // Lógica para salvar as alterações do agendamento
        this.agendamentoService.alterar(agendamentoId, this.agendamentoSelecionado).subscribe(
          (data) => {
            // Sucesso na edição do agendamento
            console.log('Agendamento editado com sucesso:', data);
            this.editMode = false;
            this.agendamentoSelecionado = null;
            this.carregarAgendamentos();
          },
          (error) => {
            // Erro na edição do agendamento
            console.log('Erro ao editar o agendamento:', error);
          }
        );
      }
    }
    */
  }

  cancelarEdicao() {
    // Lógica para cancelar a edição
    // ...
  }

  /*
  getLogin() {
    const funcionario = this.funcionarios.find(f => f.id === this.agendamento.funcionarioId);
    return funcionario ? funcionario.login : '';
  }
*/
}
