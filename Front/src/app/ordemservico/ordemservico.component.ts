import { Component, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { Funcionario } from '@app/models/funcionario.model';
import { OrdemServico } from '@app/models/ordemservico.model';
import { Servico } from '@app/models/servico.model';
import { OrdemServicoService } from '@app/services/ordemservico.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { OrdemServicoConfirmationDialogComponent } from './ordemservicoconfirmation-dialog/ordemservicoconfirmation-dialog.component';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-ordemservico',
  templateUrl: './ordemservico.component.html',
  styleUrls: ['./ordemservico.component.less']
})
export class OrdemServicoComponent implements OnInit {


    ordemServicoList: OrdemServico[] = [];
    lista: OrdemServico[] = [];
    obj: OrdemServico = new OrdemServico();
    ordemServico: OrdemServico = new OrdemServico();
    mens = '';
    msgs: Message[] = [];
    servicos: Servico[] = [];
    agendamentos: Agendamento[] = [];
    funcionarios: Funcionario[] = [];
    ordemServicoParaExcluir: any; // Variável para armazenar a ordemServico atual

    constructor(
      private api: OrdemServicoService,
      private messageService: MessageService,
      private dialogService: DialogService
      ) { }

    ngOnInit(): void {
        this.carregarServicos();
        this.carregarAgendamentos();
        this.carregarFuncionarios();
        this.consultar();
    }
    consultar() {
      this.lista = []; // Limpar a lista existente
      this.api.consultar()
      .toPromise()
      .then((res: any) => {
        this.lista = res.filter((servico: { id: number; }) => servico.id !== 29);
      })
      .catch((error: any) => {
        console.log('Erro ao consultar serviços:', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao consultar serviços',
          detail: 'Ocorreu um erro ao consultar os serviços. Verifique a conexão com o servidor e tente novamente.'
        });
      });
    }

    /*consultar() {
        this.lista = []; // Limpar a lista existente
        this.api.consultar()
        .toPromise()
        .then((res: any) => {
          const dataAtual = new Date(); // Obtém a data atual - com "dia + hora"
          this.lista = res
            .map((item: any) => {
              const ordemServico: OrdemServico = new OrdemServico();
              ordemServico.id = item.id;
              console.log(item.datahorainicio)
              console.log(item.datahoratermino)
              const datahoraini = format(parseISO(item.datahoratermino), 'dd/MM/yyyy HH:mm');
              console.log(datahoraini)
              //ordemServico.datahorainicio = new Date(item.datahorainicio.replace(/-/g, '/'));
              //ordemServico.datahoratermino = new Date(item.datahoratermino.replace(/-/g, '/'));
              console.log(ordemServico.datahorainicio)

              //ordemServico.datahorainicio = format(parseISO(item.datahorainicio), 'dd/MM/yyyy HH:mm');
              //ordemServico.datahoratermino = format(parseISO(item.datahoratermino), 'dd/MM/yyyy HH:mm');
              //ordemServico.datahorainicio = new Date(Date.parse(item.datahorainicio));
              //ordemServico.datahoratermino = new Date(Date.parse(item.datahoratermino));
              //const dateString = "2023-06-18 11:00:00";
              //const dateObject = new Date(dateString);
              console.log(item.datahorainicio)
              console.log(item.datahoratermino)
              console.log(ordemServico.datahorainicio)
              ordemServico.status = item.status;
              ordemServico.valor = item.valor;
              ordemServico.agendamento = item.agendamento;
              ordemServico.servico = item.servico;
              ordemServico.respOS = item.respOS;
              ordemServico.execServico = item.execServico;
              ordemServico.editMode = false;
              return ordemServico;
            })
            //.filter((ordemServico: OrdemServico) => ordemServico.datahorainicio >= dataAtual);


        })
        .catch((error: any) => {
          console.log('Erro ao consultar ordem de serviço:', error);
          // Exibir mensagem de erro ou realizar outra ação
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao consultar ordem de serviço',
            detail: 'Ocorreu um erro ao consultar as ordens de serviço. Verifique a conexão com o servidor e tente novamente.'
          });
        });
    }*/

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


    carregarAgendamentos() {
      this.api.getAgendamentos()
        .toPromise()
        .then((res: any) => {
          this.agendamentos = res;
        })
        .catch((error: any) => {
          console.log('Erro ao carregar os agendamentos:', error);
          // Exibir mensagem de erro ou realizar outra ação
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao carregar os agendamentos',
            detail: 'Ocorreu um erro ao carregar os agendamentos. Verifique a conexão com o servidor e tente novamente.'
          });
        });
    }

    // EXCLUIR ORDEM DE SERVIÇO
    openConfirmationDialog(ordemServico: OrdemServico): void {
      this.ordemServicoParaExcluir = ordemServico; // Armazene o agendamento atual na variável

      const ref = this.dialogService.open(OrdemServicoConfirmationDialogComponent, {
        header: 'Confirmar Exclusão',
        width: '400px',
        contentStyle: { 'text-align': 'center' },
        data: {
          ordemServico: this.ordemServicoParaExcluir // Passe a ordemServico para o componente de confirmação
        },
      });
      ref.onClose.subscribe(result => {
        if (result) {
          // O usuário confirmou, então exclua a ordemServico
          this.api.excluir(ordemServico.id)
            .toPromise()
            .then(() => {
              this.mens = "OrdemServico excluída com sucesso!";
              this.consultar();
              this.messageService.add({
                severity: 'success',
                summary: 'OrdemServico',
                detail: 'Foi excluída com sucesso!'
              });
            });
        }
      });
    }

    // ENTRAR NO "MODO DE EDIÇÃO"
    alterar(ordemServico: OrdemServico) {

      const servicoEncontrado = this.servicos.find(servico => servico.id === ordemServico.servico.id);
      if (servicoEncontrado !== undefined) {
        ordemServico.servico = servicoEncontrado;
      }
      console.log(ordemServico.respOS.id)
      const funcionarioRespOS = this.funcionarios.find(funcionario => funcionario.id === ordemServico.respOS.id);
      if (funcionarioRespOS !== undefined) {
        ordemServico.respOS = funcionarioRespOS;
      }

      const funcionarioExecServico = this.funcionarios.find(funcionario => funcionario.id === ordemServico.execServico?.id);
      if (funcionarioExecServico !== undefined) {
        ordemServico.execServico = funcionarioExecServico;
      }

      const agendamentoEncontrado = this.agendamentos.find(agendamento => agendamento.id === ordemServico.agendamento?.id);
      if (agendamentoEncontrado !== undefined) {
        ordemServico.agendamento = agendamentoEncontrado;
      }
      ordemServico.status = ordemServico.status;
      ordemServico.editMode = true; // Define o modo de edição para true
    }
    // SAIR DO "MODO DE EDIÇÃO"
    cancelar(ordemServico: OrdemServico) {
      ordemServico.editMode = false; // Desativa o modo de edição
      this.consultar(); // Recarrega a tabela de ordemServicos
    }

    // SALVAR ALTERAÇÃO DE ORDEMSERVICO
    async salvar(ordemServico: OrdemServico) {
      ordemServico.editMode = false; // Desativa o modo de edição

      if (!this.camposValidos(ordemServico)) {
        console.log('Campos inválidos');
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar OrdemServico',
          detail: 'Ocorreu um erro ao alterar o OrdemServico. Verifique os dados e tente novamente. Não pode ter campo vazio.'
        });
        this.consultar(); // Recarrega a tabela de ordemServicos
        return;
      }
      try {
          const response = await this.api.alterar(ordemServico.id, ordemServico).toPromise();
          this.mens = 'OrdemServico alterada com sucesso!';
          // Exibir o dialog de sucesso
          this.messageService.add({
            severity: 'success',
            summary: 'OrdemServico',
            detail: 'Alterado com sucesso!'
          });
          this.consultar(); // Recarrega a tabela de OrdemServicos
      } catch (error) {
        console.log('Erro ao alterar OrdemServico', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar OrdemServico',
          detail: 'Ocorreu um erro ao alterar a OrdemServico. Verifique os dados e tente novamente.'
        });
      }
    }

    camposValidos(ordemServico: OrdemServico): boolean {
      return (
        ordemServico.datahorainicio !== undefined &&
        ordemServico.datahoratermino !== undefined &&
        ordemServico.status !== undefined &&
        ordemServico.valor !== undefined &&
        ordemServico.agendamento !== undefined &&
        ordemServico.servico !== undefined &&
        ordemServico.respOS !== undefined &&
        ordemServico.execServico !== undefined &&
        ordemServico.datahorainicio !== null &&
        ordemServico.datahoratermino !== null &&
        ordemServico.status !== null &&
        ordemServico.valor !== null &&
        ordemServico.agendamento !== null &&
        ordemServico.servico !== null &&
        ordemServico.respOS !== null &&
        ordemServico.execServico !== null &&
        ordemServico.status.trim() !== ''
      );
    }


    onServicoChange(event: Servico | null) {
      // Lógica para lidar com a alteração do valor do serviço
      console.log('Novo valor do serviço:', event);

      if (event !== null) {
        // Atualizar a lista de serviços no agendamento
        this.ordemServico.servico = event;
      } else {
        // Serviço inválido, limpar o valor selecionado
        this.ordemServico.servico = new Servico();
      }
    }

    onAgendamentoChange(event: Agendamento | null) {
      // Lógica para lidar com a alteração do valor do cliente
      console.log('Novo valor do agendamento:', event);

      if (event !== null) {
        // Atualizar a lista de agendamentos na ordem de serviço
        this.ordemServico.agendamento = event;
      } else {
        // Agendamento inválido, limpar o valor selecionado
        this.ordemServico.agendamento = new Agendamento();
      }
    }

    onFuncionarioChange(event: Funcionario | null) {
      // Lógica para lidar com a alteração do valor do funcionário
      console.log('Novo valor do funcionário:', event);

      if (event !== null) {
        // Atualizar a lista de funcionários na ordem de serviço
        this.ordemServico.respOS = event;
      } else {
        // Funcionário inválido, limpar o valor selecionado
        this.ordemServico.respOS = new Funcionario();
      }
    }



}
