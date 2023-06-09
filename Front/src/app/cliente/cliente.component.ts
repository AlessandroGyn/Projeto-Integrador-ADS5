import { Component, OnInit } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { ClienteService } from '@app/services/cliente.service';
import { Message, MessageService } from 'primeng/api';

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

    constructor(private api: ClienteService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.consultar();
    }
    consultar() {
        this.lista = []; // Limpar a lista existente
        this.api.consultar()
          .toPromise()
          .then((res: any) => {
              this.lista = res; // Atribuir os novos dados à lista
          });
    }



    excluir(cliente: Cliente) {
      this.api.excluir(cliente.id)
        .toPromise()
        .then(() => {
          this.mens = "Cliente excluído com sucesso!";
          this.consultar();
        });
    }


    alterar(cliente: Cliente) {
      cliente.editMode = true; // Define o modo de edição para true
    }

    salvar(cliente: Cliente) {
      cliente.editMode = false; // Desativa o modo de edição
      //this.clienteEdit = new Cliente(); // Limpa os dados de edição
      // Lógica para salvar as alterações no banco de dados


        if (this.camposValidos()) {
          this.api.consultarPorCampos(this.obj).subscribe((encontrado: boolean) => {
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
                    summary: 'Cliente Adicionado',
                    detail: cliente.nome + ' foi adicionado(a) com sucesso!'
                  });
                  console.log('Limpar campos');
                  // Limpar os campos
                  this.obj = new Cliente(); // Cria um novo objeto Cliente com a propriedade id definida como null ou undefined
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

    camposValidos(): boolean {
      return (
        this.obj.nome !== undefined &&
        this.obj.telefone !== undefined &&
        this.obj.email !== undefined &&
        this.obj.uf !== undefined &&
        this.obj.nome.trim() !== '' &&
        this.obj.telefone.trim() !== '' &&
        this.obj.email.trim() !== '' &&
        this.obj.uf.trim() !== ''
      );
    }

    cancelar(cliente: Cliente) {
      cliente.editMode = false; // Desativa o modo de edição
      //this.clienteEdit = new Cliente(); // Limpa os dados de edição
      // Lógica para cancelar as alterações
      // ...
    }




    carregarDados(p: Cliente) {
        this.obj = p;
    }

}
