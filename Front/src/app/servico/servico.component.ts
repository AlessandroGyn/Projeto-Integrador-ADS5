import { Component, OnInit } from '@angular/core';
import { Servico } from '@app/models/servico.model';
import { ServicoService } from '@app/services/servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.less']
})
export class ServicoComponent implements OnInit {

  lista: Servico[] = [];
    obj: Servico = new Servico();
    mens = '';

    constructor(private api: ServicoService) { }

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
      .then((servico: any) => {
          this.mens = servico.nome + " foi adicionado(a) com sucesso!";
          this.consultar();
      });
    }

    excluir() {
      this.api.excluir(this.obj.id)
      .toPromise()
      .then(servico => {
        this.mens = "Serviço excluído com sucesso!";
        this.consultar();
      });
    }

    alterar() {
      this.api.alterar(this.obj.id, this.obj)
      .toPromise()
      .then(servico => {
          this.mens = servico.nome + " alterado(a) com sucesso!";
          this.consultar();
      });
    }

    carregarDados(p: Servico) {
        this.obj = p;
    }

}
