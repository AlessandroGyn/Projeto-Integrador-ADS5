import { Component } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { ClienteService } from '@app/services/cliente.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.less']
})
export class ClienteCadastroComponent {

  lista: Cliente[] = [];
  obj: Cliente = new Cliente();
  mens = '';
  msgs: Message[] = [];

  constructor(private api: ClienteService, private messageService: MessageService) { }

  adicionar() {
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
          this.api.adicionar(this.obj) // chama o cliente.service
          .toPromise()
          .then((cliente: any) => {
              this.mens = cliente.nome + " foi adicionado(a) com sucesso!";
              // Exibir o dialog de sucesso
              this.messageService.add({
                severity: 'success',
                summary: 'Cliente Adicionado',
                detail: cliente.nome + ' foi adicionado(a) com sucesso!'
              });
              console.log('Limpar campos');
              // Limpar os campos
              this.obj = new Cliente(); // Cria um novo objeto Cliente com a propriedade id definida como null ou undefined
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

}
