import { Component, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Funcionario } from '@app/models/funcionario.model';
import { AgendamentoService } from '@app/services/agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.less']
})

export class AgendamentoComponent implements OnInit {

    editMode = false; // Flag para controlar o modo de edição
    agendamentoSelecionado: Agendamento | null = null; // Agendamento selecionado para edição
    agendamentos: Agendamento[] = [];
    dialog: any;
    constructor(private agendamentoService: AgendamentoService) {}

    ngOnInit() {
      this.agendamentoService.getAgendamentos().subscribe(
        (data) => {
          this.agendamentos = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    editarAgendamento(agendamento: Agendamento) {
      this.agendamentoSelecionado = agendamento;
      this.editMode = true;


      // Obtenha os dados do funcionário a partir do ID
      const funcionarios: Funcionario[] = []; // Obtenha a lista de funcionários do serviço ou de outra fonte de dados
      /*const dialogRef = this.dialog.open(AgendamentoEdicaoComponent, {
        data: { agendamento, funcionarios },
      });*/

      /*
      this.agendamentoService.obterFuncionario(agendamento.respagendamento).subscribe(
        (funcionario) => {
          this.agendamentoSelecionado.respagendamento = funcionario; // Preencha os outros dados do funcionário
          this.agendamentoSelecionado.funcionarioId = funcionario.id; // Armazene o ID do funcionário
        },
        (error) => {
          console.log('Erro ao obter dados do funcionário:', error);
        }
      );
      */
    }



    salvarEdicao() {
      // Lógica para salvar as alterações do agendamento
      if (this.agendamentoSelecionado) {
        this.agendamentoService.alterar(this.agendamentoSelecionado.id, this.agendamentoSelecionado).subscribe(
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

    cancelarEdicao() {
      this.editMode = false;
      this.agendamentoSelecionado = null;
    }

    excluirAgendamento(agendamento: Agendamento) {
      if (confirm('Tem certeza que deseja excluir o agendamento?')) {
        this.agendamentoService.excluir(agendamento.id).subscribe(
          (data) => {
            // Sucesso na exclusão do agendamento
            console.log('Agendamento excluído com sucesso:', data);
            this.carregarAgendamentos();
          },
          (error) => {
            // Erro na exclusão do agendamento
            console.log('Erro ao excluir o agendamento:', error);
          }
        );
      }
    }

    carregarAgendamentos() {
      this.agendamentoService.getAgendamentos().subscribe(
        (data) => {
          this.agendamentos = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }

}
