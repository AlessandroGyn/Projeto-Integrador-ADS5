import { Component, OnInit } from '@angular/core';
import { Funcionario } from '@app/models/funcionario.model';
import { FuncionarioService } from '@app/services/funcionario.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FuncionarioConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.less']
})
export class FuncionarioComponent implements OnInit {

    lista: Funcionario[] = [];
    obj: Funcionario = new Funcionario();
    mens = '';
    msgs: Message[] = [];

    constructor(private api: FuncionarioService, private messageService: MessageService, private dialogService: DialogService) { }

    ngOnInit(): void {
        this.consultar();
    }
    consultar() {
      this.lista = []; // Limpar a lista existente
      this.api.consultar()
        .toPromise()
        .then((res: any) => {
            this.lista = res.filter((funcionario: { id: number; }) => funcionario.id !== 3); // Remover o funcionário com ID 3
        });
    }

    // EXCLUIR FUNCIONÁRIO
    openConfirmationDialog(funcionario: Funcionario): void {
      const ref = this.dialogService.open(FuncionarioConfirmationDialogComponent, {
        header: 'Confirmar Exclusão',
        width: '400px',
        data: funcionario
      });
      ref.onClose.subscribe(result => {
        if (result) {
          // O usuário confirmou, então exclua o cliente
          this.api.excluir(funcionario.id)
            .toPromise()
            .then(() => {
              this.mens = "Funcionário excluído com sucesso!";
              this.consultar();
              this.messageService.add({
                severity: 'success',
                summary: 'Login do Funcionário: ' + funcionario.login,
                detail: 'O funcionario foi excluído com sucesso!'
              });
            });
        }
      });
    }
    // ENTRAR EM MODO DE EDIÇÃO
    alterar(funcionario: Funcionario) {
      funcionario.editMode = true; // Define o modo de edição para true
    }
    // SALVAR ALTERAÇÃO DE FUNCIONÁRIO
    salvar(funcionario: Funcionario) {
      funcionario.editMode = false; // Desativa o modo de edição
      // Lógica para salvar as alterações no banco de dados
      if (this.camposValidos(funcionario)) {
        this.api.consultarPorCampos(funcionario).subscribe((encontrado: boolean) => {
          if (encontrado) {
            console.log('Funcionário já existe');
            // Exibir mensagem de erro informando que o cliente já existe
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao alterar funcionário',
              detail: 'O funcionário já existe. Verifique os dados e tente novamente.'
            });
          } else {
            this.api.alterar(funcionario.id, funcionario) // chama o funcionario.service
              .toPromise()
              .then((funcionario: any) => {
                this.mens = funcionario.nome + " alterado(a) com sucesso!";
                // Exibir o dialog de sucesso
                this.messageService.add({
                  severity: 'success',
                  summary: 'Login: '+funcionario.login,
                  detail: 'Funcionário foi alterado com sucesso!'
                });
                this.consultar();
              });
          }
        });
      } else {
        console.log('Campos inválidos');
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar funcionário',
          detail: 'Ocorreu um erro ao alterar o funcionário. Verifique os dados e tente novamente. Não pode ter campo vazio.'
        });
      }
    }

    camposValidos(funcionario: Funcionario): boolean {
      return (
        funcionario.login !== undefined &&
        funcionario.senha !== undefined &&
        funcionario.email !== undefined &&
        funcionario.fone !== undefined &&
        funcionario.comissao !== undefined &&
        funcionario.login.trim() !== '' &&
        funcionario.senha.trim() !== '' &&
        funcionario.email.trim() !== '' &&
        funcionario.fone.trim() !== '' &&
        funcionario.comissao >= 0
      );
    }
    // CANCELAR MODO DE EDIÇÃO
    cancelar(funcionario: Funcionario) {
      funcionario.editMode = false; // Desativa o modo de edição
    }

    /*carregarDados(p: Funcionario) {
        this.obj = p;
    }*/

}
