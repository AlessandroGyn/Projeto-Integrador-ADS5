import { Component, OnInit } from '@angular/core';
import { Servico } from '@app/models/servico.model';
import { ServicoService } from '@app/services/servico.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ServicoConfirmationDialogComponent } from './servicoconfirmation-dialog/servicoconfirmation-dialog.component';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.less']
})
export class ServicoComponent implements OnInit {

    lista: Servico[] = [];
    obj: Servico = new Servico();
    mens = '';
    msgs: Message[] = [];

    constructor(private api: ServicoService, private messageService: MessageService, private dialogService: DialogService) { }

    ngOnInit(): void {
        this.consultar();
    }
    consultar() {
        this.lista = []; // Limpar a lista existente
        this.api.consultar()
        .toPromise()
        .then((res: any) => {
            this.lista = res.filter((servico: { id: number; }) => servico.id !== 29); // Remover o serviço com ID 29
        });
    }

    // EXCLUIR SERVIÇO
    openConfirmationDialog(servico: Servico): void {
      const ref = this.dialogService.open(ServicoConfirmationDialogComponent, {
        header: 'Confirmar Exclusão',
        width: '400px',
        data: servico
      });
      ref.onClose.subscribe(result => {
        if (result) {
          // O usuário confirmou, então exclua o serviço
          this.api.excluir(servico.id)
            .toPromise()
            .then(() => {
              this.mens = "Serviço excluído com sucesso!";
              this.consultar();
              this.messageService.add({
                severity: 'success',
                summary: 'Serviço: ' + servico.nome,
                detail: 'O serviço foi excluído com sucesso!'
              });
            });
        }
      });
    }
    // ENTRAR NO "MODO DE EDIÇÃO"
    alterar(servico: Servico) {
      servico.editMode = true; // Define o modo de edição para true
    }
    // SAIR DO "MODO DE EDIÇÃO"
    cancelar(servico: Servico) {
      servico.editMode = false; // Desativa o modo de edição
    }
    // SALVAR ALTERAÇÃO DE SERVIÇO
    async salvar(servico: Servico) {
      servico.editMode = false; // Desativa o modo de edição

      if (!this.camposValidos(servico)) {
        console.log('Campos inválidos');
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar serviço',
          detail: 'Ocorreu um erro ao alterar o serviço. Verifique os dados e tente novamente. Não pode ter campo vazio.'
        });
        return;
      }

      try {
        const encontrado = await this.api.consultarPorCampos(servico).toPromise();

        if (encontrado) {
          console.log('Serviço já existe');
          // Exibir mensagem de erro informando que o serviço já existe
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao alterar serviço',
            detail: 'O serviço já existe. Verifique os dados e tente novamente.'
          });
        } else {
          const response = await this.api.alterar(servico.id, servico).toPromise();
          this.mens = servico.nome + " alterado(a) com sucesso!";
          // Exibir o dialog de sucesso
          this.messageService.add({
            severity: 'success',
            summary: 'Serviço: '+servico.nome,
            detail: 'Serviço foi alterado com sucesso!'
          });
          this.consultar();
        }
      } catch (error) {
        console.log('Erro ao alterar serviço', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar serviço',
          detail: 'Ocorreu um erro ao alterar o serviço. Verifique os dados e tente novamente.'
        });
      }
    }


    camposValidos(servico: Servico): boolean {
      return (
        servico.nome !== undefined &&
        servico.descricao !== undefined &&
        servico.precoCusto !== undefined &&
        servico.precoVenda !== undefined &&
        servico.nome.trim() !== '' &&
        servico.descricao.trim() !== '' &&
        servico.precoCusto >= 0 &&
        servico.precoVenda >= 0
      );
    }
}
