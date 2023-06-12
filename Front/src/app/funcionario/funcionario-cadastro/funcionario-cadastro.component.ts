import { Component } from '@angular/core';
import { Funcionario } from '@app/models/funcionario.model';
import { FuncionarioService } from '@app/services/funcionario.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.less']
})
export class FuncionarioCadastroComponent {

  lista: Funcionario[] = [];
  obj: Funcionario = new Funcionario();
  mens = '';
  msgs: Message[] = [];

  constructor(private api: FuncionarioService, private messageService: MessageService) { }

  adicionar() {
    if (this.camposValidos()) {
      this.api.consultarPorCampos(this.obj).subscribe((encontrado: boolean) => {
        if (encontrado) {
          console.log('Funcionário já existe');
          // Exibir mensagem de erro informando que o funcionário já existe
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao adicionar funcionário',
            detail: 'O funcionário já existe. Verifique os dados e tente novamente.'
          });
        } else {
          this.api.adicionar(this.obj) // chama o funcionario.service
          .toPromise()
          .then((funcionario: any) => {
              this.mens = funcionario.login + " foi adicionado(a) com sucesso!";
              // Exibir o dialog de sucesso
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: funcionario.login + ' foi adicionado(a) com sucesso!'
              });
              console.log('Limpar campos');
              // Limpar os campos
              this.obj = new Funcionario(); // Cria um novo objeto Funcionario com a propriedade id definida como null ou undefined
          });
        }
      });
    } else {
      console.log('Campos inválidos');
      // Exibir mensagem de erro ou realizar outra ação
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao adicionar funcionário',
        detail: 'Ocorreu um erro ao adicionar o funcionário. Verifique os dados e tente novamente. Não pode ter campo vazio.'
      });
    }
  }

  camposValidos(): boolean {
    return (
      this.obj.login !== undefined &&
      this.obj.senha !== undefined &&
      this.obj.email !== undefined &&
      this.obj.fone !== undefined &&
      this.obj.comissao !== undefined &&
      this.obj.login !== null &&
      this.obj.senha !== null &&
      this.obj.email !== null &&
      this.obj.fone !== null &&
      this.obj.comissao !== null &&
      this.obj.login.trim() !== '' &&
      this.obj.senha.trim() !== '' &&
      this.obj.email.trim() !== '' &&
      this.obj.fone.trim() !== '' &&
      this.obj.comissao >= 0
    );
  }


}
