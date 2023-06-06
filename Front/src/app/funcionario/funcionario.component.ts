import { Component, OnInit } from '@angular/core';
import { Funcionario } from '@app/models/funcionario.model';
import { FuncionarioService } from '@app/services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.less']
})
export class FuncionarioComponent implements OnInit {

  lista: Funcionario[] = [];
    obj: Funcionario = new Funcionario();
    mens = '';

    constructor(private api: FuncionarioService) { }

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
      .then((funcionario: any) => {
          this.mens = funcionario.login + " foi adicionado(a) com sucesso!";
          this.consultar();
      });
    }

    excluir() {
      this.api.excluir(this.obj.id)
      .toPromise()
      .then(funcionario => {
        this.mens = "Funcionario excluído com sucesso!";
        this.consultar();
      });
    }

    alterar() {
      this.api.alterar(this.obj.id, this.obj)
      .toPromise()
      .then(funcionario => {
          this.mens = funcionario.login + " alterado(a) com sucesso!";
          this.consultar();
      });
    }

    carregarDados(p: Funcionario) {
        this.obj = p;
    }

}
