import { Component, OnInit } from '@angular/core';
import { Ordemservico } from '@app/models/ordemservico.model';
import { OrdemservicoService } from '@app/services/ordemservico.service';

@Component({
  selector: 'app-ordemservico',
  templateUrl: './ordemservico.component.html',
  styleUrls: ['./ordemservico.component.less']
})
export class OrdemservicoComponent implements OnInit {

  lista: Ordemservico[] = [];
    obj: Ordemservico = new Ordemservico();
    mens = '';

    constructor(private api: OrdemservicoService) { }

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
      .then((ordemservico: any) => {
          this.mens = ordemservico.servico + " foi adicionado(a) com sucesso!";
          this.consultar();
      });
    }

    excluir() {
      this.api.excluir(this.obj.id)
      .toPromise()
      .then(ordemservico => {
        this.mens = "Ordem de Serviço excluída com sucesso!";
        this.consultar();
      });
    }

    alterar() {
      this.api.alterar(this.obj.id, this.obj)
      .toPromise()
      .then(ordemservico => {
          this.mens = ordemservico.servico + " alterado(a) com sucesso!";
          this.consultar();
      });
    }

    carregarDados(p: Ordemservico) {
        this.obj = p;
    }

}
