import { Component, OnInit } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { ClienteService } from '@app/services/cliente.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.less']
})
export class ClienteComponent implements OnInit {

    lista: Cliente[] = [];
    obj: Cliente = new Cliente();
    mens = '';
    msgs: Message[] = [];
    //clienteEdit: Cliente = new Cliente(); // Adicione esta linha

    constructor(private api: ClienteService, private messageService: MessageService, private dialogService: DialogService) { }

    ngOnInit(): void {
        this.consultar();
    }
    consultar() {
        this.lista = []; // Limpar a lista existente
        this.api.consultar()
          .toPromise()
          .then((res: any) => {
              this.lista = res.filter((cliente: { id: number; }) => cliente.id !== 31); // Remover o cliente com ID 31
          });
    }
    // EXCLUIR CLIENTE
    openConfirmationDialog(cliente: Cliente): void {
      const ref = this.dialogService.open(ConfirmationDialogComponent, {
        header: 'Confirmar Exclusão',
        width: '400px',
        data: cliente
      });
      ref.onClose.subscribe(result => {
        if (result) {
          // O usuário confirmou, então exclua o cliente
          this.api.excluir(cliente.id)
            .toPromise()
            .then(() => {
              this.mens = "Cliente excluído com sucesso!";
              this.consultar();
              this.messageService.add({
                severity: 'success',
                summary: 'Nome do Cliente: ' + cliente.nome,
                detail: 'O cliente foi excluído com sucesso!'
              });
            });
        }
      });
    }
    // ENTRAR EM MODO DE EDIÇÃO
    alterar(cliente: Cliente) {
      cliente.editMode = true; // Define o modo de edição para true
    }
    // SALVAR ALTERAÇÃO DE CLIENTE
    salvar(cliente: Cliente) {
      cliente.editMode = false; // Desativa o modo de edição
      //this.clienteEdit = new Cliente(); // Limpa os dados de edição
      // Lógica para salvar as alterações no banco de dados
      if (this.camposValidos(cliente)) {
        this.api.consultarPorCampos(cliente).subscribe((encontrado: boolean) => {
          if (encontrado) {
            console.log('Cliente já existe');
            // Exibir mensagem de erro informando que o cliente já existe
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao adicionar cliente',
              detail: 'O cliente já existe. Verifique os dados e tente novamente.'
            });
          } else {
            this.api.alterar(cliente.id, cliente) // chama o cliente.service
              .toPromise()
              .then((cliente: any) => {
                this.mens = cliente.nome + " alterado(a) com sucesso!";
                // Exibir o dialog de sucesso
                this.messageService.add({
                  severity: 'success',
                  summary: 'Cliente Nome: '+cliente.nome,
                  detail: 'Cliente foi alterado com sucesso!'
                });
                console.log('Limpar campos');
                // não precisa Limpar os campos
                //cliente = new Cliente(); // Cria um novo objeto Cliente com a propriedade id definida como null ou undefined
                this.consultar();
              });
          }
        });
      } else {
        console.log('Campos inválidos');
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao adicionar cliente',
          detail: 'Ocorreu um erro ao adicionar o cliente. Verifique os dados e tente novamente. Não pode ter campo vazio.'
        });
      }



    }

    camposValidos(cliente: Cliente): boolean {
      return (
        cliente.nome !== undefined &&
        cliente.telefone !== undefined &&
        cliente.email !== undefined &&
        cliente.uf !== undefined &&
        cliente.nome !== null &&
        cliente.telefone !== null &&
        cliente.email !== null &&
        cliente.uf !== null &&
        cliente.nome.trim() !== '' &&
        cliente.telefone.trim() !== '' &&
        cliente.email.trim() !== '' &&
        cliente.uf.trim() !== ''
      );
    }
    // CANCELAR MODO DE EDIÇÃO
    cancelar(cliente: Cliente) {
      cliente.editMode = false; // Desativa o modo de edição
      //this.clienteEdit = new Cliente(); // Limpa os dados de edição
      // Lógica para cancelar as alterações
      // ...
    }




    /*carregarDados(p: Cliente) {
        this.obj = p;
    }*/

}
