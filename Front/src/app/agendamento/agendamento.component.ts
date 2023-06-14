import { Component, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@app/services/agendamento.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AgendamentoConfirmationDialogComponent } from './agendamentoconfirmation-dialog/agendamentoconfirmation-dialog.component';
import { Servico } from '@app/models/servico.model';
import { Cliente } from '@app/models/cliente.model';
import { Funcionario } from '@app/models/funcionario.model';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.less']
})

export class AgendamentoComponent implements OnInit {

  agendamentoParaExcluir: any; // Variável para armazenar o agendamento atual

  lista: Agendamento[] = [];
  obj: Agendamento = new Agendamento();
  agendamento: Agendamento = new Agendamento();
  mens = '';
  msgs: Message[] = [];
  servicos: Servico[] = [];
  clientes: Cliente[] = [];
  funcionarios: Funcionario[] = [];

  constructor(
    private api: AgendamentoService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.carregarServicos();
    this.carregarClientes();
    this.carregarFuncionarios();
    this.consultar();
  }

  consultar() {
      this.lista = []; // Limpar a lista existente
      this.api.consultar()
      .toPromise()
      .then((res: any) => {
        const dataAtual = new Date(); // Obtém a data atual - com "dia + hora"
        this.lista = res
          .map((item: any) => {
            const agendamento = new Agendamento();
            agendamento.id = item.id;
            agendamento.datas = new Date(item.datas);
            agendamento.hora = new Date(item.hora);
            agendamento.status = item.status;
            agendamento.observacao = item.observacao;
            agendamento.cliente = item.cliente;
            agendamento.respAgendamento = item.respAgendamento;
            agendamento.servico = item.servico;
            agendamento.editMode = false;

            // Atualizar agendamento.datas com agendamento.hora
            agendamento.datas.setHours(agendamento.hora.getHours());
            agendamento.datas.setMinutes(agendamento.hora.getMinutes());
            agendamento.datas.setSeconds(agendamento.hora.getSeconds());

            return agendamento;
          })
          .filter((agendamento: Agendamento) => agendamento.datas >= dataAtual);
          // filter acima, retorna apenas se a data do agendamento (agendamento.datas) for igual ou posterior à dataAtual
          // Exibir valores das propriedades datas e hora
          //console.log('Valor de datas:', this.lista.map(item => item.datas));
          //console.log('Valor de hora:', this.lista.map(item => item.hora));
      })
      .catch((error: any) => {
        console.log('Erro ao consultar agendamentos:', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao consultar agendamentos',
          detail: 'Ocorreu um erro ao consultar os agendamentos. Verifique a conexão com o servidor e tente novamente.'
        });
      });
  }

  carregarServicos() {
    this.api.getServicos()
      .toPromise()
      .then((res: any) => {
        this.servicos = res;
      })
      .catch((error: any) => {
        console.log('Erro ao carregar os serviços:', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar os serviços',
          detail: 'Ocorreu um erro ao carregar os serviços. Verifique a conexão com o servidor e tente novamente.'
        });
      });
  }

  carregarClientes() {
    this.api.getClientes()
      .toPromise()
      .then((res: any) => {
        this.clientes = res;
      })
      .catch((error: any) => {
        console.log('Erro ao carregar os clientes:', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar os clientes',
          detail: 'Ocorreu um erro ao carregar os clientes. Verifique a conexão com o servidor e tente novamente.'
        });
      });
  }

  carregarFuncionarios() {
    this.api.getFuncionarios()
      .toPromise()
      .then((res: any) => {
        this.funcionarios = res;
      })
      .catch((error: any) => {
        console.log('Erro ao carregar os funcionários:', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar os funcionários',
          detail: 'Ocorreu um erro ao carregar os funcionários. Verifique a conexão com o servidor e tente novamente.'
        });
      });
  }

  // EXCLUIR AGENDAMENTO
  openConfirmationDialog(agendamento: Agendamento): void {
    this.agendamentoParaExcluir = agendamento; // Armazene o agendamento atual na variável

    const ref = this.dialogService.open(AgendamentoConfirmationDialogComponent, {
      header: 'Confirmar Exclusão',
      width: '400px',
      contentStyle: { 'text-align': 'center' },
      data: {
        agendamento: this.agendamentoParaExcluir // Passe o agendamento para o componente de confirmação
      },
    });
    ref.onClose.subscribe(result => {
      if (result) {
        // O usuário confirmou, então exclua o Agendamento
        this.api.excluir(agendamento.id)
          .toPromise()
          .then(() => {
            this.mens = "Agendamento excluído com sucesso!";
            this.consultar();
            this.messageService.add({
              severity: 'success',
              summary: 'Agendamento',
              detail: 'Foi excluído com sucesso!'
            });
          });
      }
    });
  }
  // ENTRAR NO "MODO DE EDIÇÃO"
  alterar(agendamento: Agendamento) {

    const servicoEncontrado = this.servicos.find(servico => servico.id === agendamento.servico.id);
    if (servicoEncontrado !== undefined) {
      agendamento.servico = servicoEncontrado;
    }

    const clienteEncontrado = this.clientes.find(cliente => cliente.id === agendamento.cliente.id);
    if (clienteEncontrado !== undefined) {
      agendamento.cliente = clienteEncontrado;
    }

    const funcionarioEncontrado = this.funcionarios.find(funcionario => funcionario.id === agendamento.respAgendamento.id);
    if (funcionarioEncontrado !== undefined) {
      agendamento.respAgendamento = funcionarioEncontrado;
    }

    agendamento.status = agendamento.status;

    agendamento.editMode = true; // Define o modo de edição para true
  }
  // SAIR DO "MODO DE EDIÇÃO"
  cancelar(agendamento: Agendamento) {
    agendamento.editMode = false; // Desativa o modo de edição
    this.consultar(); // Recarrega a tabela de agendamentos
  }
  // SALVAR ALTERAÇÃO DE AGENDAMENTO
  async salvar(agendamento: Agendamento) {
    agendamento.editMode = false; // Desativa o modo de edição

    if (!this.camposValidos(agendamento)) {
      console.log('Campos inválidos');
      // Exibir mensagem de erro ou realizar outra ação
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao alterar Agendamento',
        detail: 'Ocorreu um erro ao alterar o Agendamento. Verifique os dados e tente novamente. Não pode ter campo vazio.'
      });
      this.consultar(); // Recarrega a tabela de agendamentos
      return;
    }

    try {
      const encontrado = await this.api.consultarPorCampos(agendamento).toPromise();
      if (encontrado) {
        console.log('Agendamento já existe');
        // Exibir mensagem de erro informando que o Agendamento já existe
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar Agendamento',
          detail: 'O Agendamento já existe ou a data é antiga.'
        });
        this.consultar(); // Recarrega a tabela de agendamentos
      } else {
        const dataAtual = new Date(); // Obtém a data atual
        agendamento.datas = new Date(agendamento.datas);
        agendamento.hora = new Date(agendamento.hora);
        // Verifica se a data do agendamento é anterior à data atual
        if ( agendamento.hora.getTime() < dataAtual.getTime() ) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao alterar Agendamento',
            detail: 'A data do agendamento não pode ser antiga.'
          });
          this.consultar(); // Recarrega a tabela de agendamentos
          return; // Se a data for anterior ao dia atual
        }
        const response = await this.api.alterar(agendamento.id, agendamento).toPromise();
        this.mens = 'Agendamento alterado(a) com sucesso!';
        // Exibir o dialog de sucesso
        this.messageService.add({
          severity: 'success',
          summary: 'Agendamento',
          detail: 'Alterado com sucesso!'
        });
        this.consultar(); // Recarrega a tabela de agendamentos
      }
    } catch (error) {
      console.log('Erro ao alterar Agendamento', error);
      // Exibir mensagem de erro ou realizar outra ação
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao alterar Agendamento',
        detail: 'Ocorreu um erro ao alterar o Agendamento. Verifique os dados e tente novamente.'
      });
    }
  }

  camposValidos(agendamento: Agendamento): boolean {
    return (
      agendamento.datas !== undefined &&
      agendamento.hora !== undefined &&
      agendamento.status !== undefined &&
      agendamento.observacao !== undefined &&
      agendamento.cliente !== undefined &&
      agendamento.respAgendamento !== undefined &&
      agendamento.servico !== undefined &&
      agendamento.datas !== null &&
      agendamento.hora !== null &&
      agendamento.status !== null &&
      agendamento.observacao !== null &&
      agendamento.cliente !== null &&
      agendamento.respAgendamento !== null &&
      agendamento.servico !== null &&
      agendamento.status.trim() !== '' &&
      agendamento.observacao.trim() !== ''
    );
  }


  onServicoChange(event: Servico | null) {
    // Lógica para lidar com a alteração do valor do serviço
    console.log('Novo valor do serviço:', event);

    if (event !== null) {
      // Atualizar a lista de serviços no agendamento
      this.agendamento.servico = event;
    } else {
      // Serviço inválido, limpar o valor selecionado
      this.agendamento.servico = new Servico(); // ou null, dependendo do seu caso
    }
  }

  onClienteChange(event: Cliente | null) {
    // Lógica para lidar com a alteração do valor do cliente
    console.log('Novo valor do cliente:', event);

    if (event !== null) {
      // Atualizar a lista de clientes no agendamento
      this.agendamento.cliente = event;
    } else {
      // Cliente inválido, limpar o valor selecionado
      this.agendamento.cliente = new Cliente(); // ou null, dependendo do seu caso
    }
  }

  onFuncionarioChange(event: Funcionario | null) {
    // Lógica para lidar com a alteração do valor do funcionário
    console.log('Novo valor do funcionário:', event);

    if (event !== null) {
      // Atualizar a lista de funcionários no agendamento
      this.agendamento.respAgendamento = event;
    } else {
      // Funcionário inválido, limpar o valor selecionado
      this.agendamento.respAgendamento = new Funcionario(); // ou null, dependendo do seu caso
    }
  }




}
