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

    constructor(private api: ClienteService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.consultar();
    }
    consultar() {
        this.api.consultar()
        .toPromise()
        .then
        ((res: any) => {
            this.lista = res;
        });
    }

    adicionar() {
      this.api.adicionar(this.obj)
      .toPromise()
      .then((cliente: any) => {
          this.mens = cliente.nome + " foi adicionado(a) com sucesso!";
          this.consultar();

          // Exibir o dialog de sucesso
          this.messageService.add({
            severity: 'success',
            summary: 'Cliente Adicionado',
            detail: cliente.nome + ' foi adicionado(a) com sucesso!'
          });

          // Limpar os campos
          this.obj = new Cliente(); // Cria um novo objeto Cliente com a propriedade id definida como null ou undefined


      });
    }

    excluir() {
      this.api.excluir(this.obj.id)
      .toPromise()
      .then(cliente => {
        this.mens = "Cliente excluído com sucesso!";
        this.consultar();
      });
    }

    alterar() {
      this.api.alterar(this.obj.id, this.obj)
      .toPromise()
      .then(cliente => {
          this.mens = cliente.nome + " alterado(a) com sucesso!";
          this.consultar();
      });
    }

    carregarDados(p: Cliente) {
        this.obj = p;
    }

}
