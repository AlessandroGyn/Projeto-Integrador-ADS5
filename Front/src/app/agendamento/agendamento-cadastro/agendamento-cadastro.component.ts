import { Component, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Cliente } from '@app/models/cliente.model';
import { Funcionario } from '@app/models/funcionario.model';
import { Servico } from '@app/models/servico.model';
import { AgendamentoService } from '@app/services/agendamento.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-agendamento-cadastro',
  templateUrl: './agendamento-cadastro.component.html',
  styleUrls: ['./agendamento-cadastro.component.less']
})
export class AgendamentoCadastroComponent implements OnInit {

  lista: Agendamento[] = [];
  obj: Agendamento = new Agendamento();
  mens = '';
  msgs: Message[] = [];
  servicos: Servico[] = [];
  clientes: Cliente[] = [];
  funcionarios: Funcionario[] = [];

  constructor(
    private api: AgendamentoService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.carregarServicos();
    this.carregarClientes();
    this.carregarFuncionarios();
  }

  carregarServicos() {
    this.api.getServicos()
      .toPromise()
      .then((res: any) => {
        this.servicos = res;
        // Configurar valor inicial do serviço
        const servicoEncontrado = this.servicos.find(servico => servico.id === this.obj.servico.id);
        if (servicoEncontrado !== undefined) {
          this.obj.servico = servicoEncontrado;
        }
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
        // Configurar valor inicial do cliente
        const clienteEncontrado = this.clientes.find(cliente => cliente.id === this.obj.cliente.id);
        if (clienteEncontrado !== undefined) {
          this.obj.cliente = clienteEncontrado;
        }
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
        // Configurar valor inicial do funcionário
        const funcionarioEncontrado = this.funcionarios.find(funcionario => funcionario.id === this.obj.respAgendamento.id);
        if (funcionarioEncontrado !== undefined) {
          this.obj.respAgendamento = funcionarioEncontrado;
        }
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




  async adicionar() {
    if (this.camposValidos()) {
      try {
        const encontrado = await this.api.consultarPorCampos(this.obj).toPromise();

        if (encontrado) {
          console.log('Agendamento já existe');
          // Exibir mensagem de erro informando que o agendamento já existe
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao adicionar agendamento',
            detail: 'O agendamento já existe. Verifique os dados e tente novamente.'
          });
        } else {
          try {
            const dataAtual = new Date(); // Obtém a data atual
            this.obj.datas = new Date(this.obj.datas);
            // Verifica se a data do agendamento é anterior à data atual
            if (this.obj.datas < dataAtual) {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao alterar Agendamento',
                detail: 'A data do agendamento não pode ser antiga.'
              });
              //this.obj = new Agendamento(); // Cria um novo objeto agendamento com a propriedade id definida como null ou undefined // Recarrega a tabela de agendamentos
              return; // Se a data for anterior ao dia atual
            }

            const agendamento = await this.api.adicionar(this.obj).toPromise();
            if (agendamento) {
              this.mens = "Agendamento foi adicionado(a) com sucesso!";
              // Exibir o dialog de sucesso
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail:  "Agendamento  foi adicionado(a) com sucesso!"
              });
              console.log('Limpar campos');
              // Limpar os campos
              this.obj = new Agendamento(); // Cria um novo objeto agendamento com a propriedade id definida como null ou undefined
            } else {
              console.log('agendamento não retornado');
              // Exibir mensagem de erro ou realizar outra ação
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao adicionar agendamento',
                detail: 'Ocorreu um erro ao adicionar o agendamento. Verifique os dados e tente novamente.'
              });
            }
          } catch (error) {
            console.log('Erro ao adicionar agendamento', error);
            // Exibir mensagem de erro ou realizar outra ação
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao adicionar agendamento',
              detail: 'Ocorreu um erro ao adicionar o agendamento. Verifique os dados e tente novamente.'
            });
          }
        }
      } catch (error) {
        console.log('Erro ao consultar agendamento', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao consultar agendamento',
          detail: 'Ocorreu um erro ao consultar o agendamento. Verifique os dados e tente novamente.'
        });
      }
    } else {
      console.log('Campos inválidos');
      // Exibir mensagem de erro ou realizar outra ação
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao adicionar agendamento',
        detail: 'Ocorreu um erro ao adicionar o agendamento. Verifique os dados e tente novamente. Não pode ter campo vazio.'
      });
    }
  }

  camposValidos(): boolean {
    return (
      this.obj.datas !== undefined &&
      this.obj.hora !== undefined &&
      this.obj.status !== undefined &&
      this.obj.observacao !== undefined &&
      this.obj.cliente !== undefined &&
      this.obj.respAgendamento !== undefined &&
      this.obj.servico !== undefined &&
      this.obj.datas !== null &&
      this.obj.hora !== null &&
      this.obj.status !== null &&
      this.obj.observacao !== null &&
      this.obj.cliente !== null &&
      this.obj.respAgendamento !== null &&
      this.obj.servico !== null &&
      this.obj.status.trim() !== '' &&
      this.obj.observacao.trim() !== ''
    );
  }

  onServicoChange(event: Servico | null) {
    // Lógica para lidar com a alteração do valor do serviço
    console.log('Novo valor do serviço:', event);

    if (event !== null) {
      // Atualizar a lista de serviços no agendamento
      this.obj.servico = event;
    } else {
      // Serviço inválido, limpar o valor selecionado
      this.obj.servico = new Servico(); // ou null, dependendo do seu caso
    }
  }

  onClienteChange(event: Cliente | null) {
    // Lógica para lidar com a alteração do valor do cliente
    console.log('Novo valor do cliente:', event);

    if (event !== null) {
      // Atualizar a lista de clientes no agendamento
      this.obj.cliente = event;
    } else {
      // Cliente inválido, limpar o valor selecionado
      this.obj.cliente = new Cliente(); // ou null, dependendo do seu caso
    }
  }

  onFuncionarioChange(event: Funcionario | null) {
    // Lógica para lidar com a alteração do valor do funcionário
    console.log('Novo valor do funcionário:', event);

    if (event !== null) {
      // Atualizar a lista de funcionários no agendamento
      this.obj.respAgendamento = event;
    } else {
      // Funcionário inválido, limpar o valor selecionado
      this.obj.respAgendamento = new Funcionario(); // ou null, dependendo do seu caso
    }
  }

}
