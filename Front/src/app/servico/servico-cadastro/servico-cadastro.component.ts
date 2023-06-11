import { Component } from '@angular/core';
import { Servico } from '@app/models/servico.model';
import { ServicoService } from '@app/services/servico.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-servico-cadastro',
  templateUrl: './servico-cadastro.component.html',
  styleUrls: ['./servico-cadastro.component.less']
})
export class ServicoCadastroComponent {

  lista: Servico[] = [];
  obj: Servico = new Servico();
  mens = '';
  msgs: Message[] = [];

  constructor(private api: ServicoService, private messageService: MessageService) { }

  async adicionar() {
    if (this.camposValidos()) {
      try {
        const encontrado = await this.api.consultarPorCampos(this.obj).toPromise();

        if (encontrado) {
          console.log('Serviço já existe');
          // Exibir mensagem de erro informando que o serviço já existe
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao adicionar serviço',
            detail: 'O serviço já existe. Verifique os dados e tente novamente.'
          });
        } else {
          try {
            const servico = await this.api.adicionar(this.obj).toPromise();
            if (servico) {
              this.mens = servico.nome + " foi adicionado(a) com sucesso!";
              // Exibir o dialog de sucesso
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: servico.nome + ' foi adicionado(a) com sucesso!'
              });
              console.log('Limpar campos');
              // Limpar os campos
              this.obj = new Servico(); // Cria um novo objeto servico com a propriedade id definida como null ou undefined
            } else {
              console.log('Serviço não retornado');
              // Exibir mensagem de erro ou realizar outra ação
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao adicionar serviço',
                detail: 'Ocorreu um erro ao adicionar o serviço. Verifique os dados e tente novamente.'
              });
            }
          } catch (error) {
            console.log('Erro ao adicionar serviço', error);
            // Exibir mensagem de erro ou realizar outra ação
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao adicionar serviço',
              detail: 'Ocorreu um erro ao adicionar o serviço. Verifique os dados e tente novamente.'
            });
          }
        }
      } catch (error) {
        console.log('Erro ao consultar serviço', error);
        // Exibir mensagem de erro ou realizar outra ação
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao consultar serviço',
          detail: 'Ocorreu um erro ao consultar o serviço. Verifique os dados e tente novamente.'
        });
      }
    } else {
      console.log('Campos inválidos');
      // Exibir mensagem de erro ou realizar outra ação
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao adicionar serviço',
        detail: 'Ocorreu um erro ao adicionar o serviço. Verifique os dados e tente novamente. Não pode ter campo vazio.'
      });
    }
  }



  camposValidos(): boolean {
    return (
      this.obj.nome !== undefined &&
      this.obj.descricao !== undefined &&
      this.obj.precoCusto !== undefined &&
      this.obj.precoVenda !== undefined &&
      this.obj.nome !== null &&
      this.obj.descricao !== null &&
      this.obj.precoCusto !== null &&
      this.obj.precoVenda !== null &&
      this.obj.nome.trim() !== '' &&
      this.obj.descricao.trim() !== '' &&
      this.obj.precoCusto >= 0 &&
      this.obj.precoVenda >= 0
    );
  }

}
