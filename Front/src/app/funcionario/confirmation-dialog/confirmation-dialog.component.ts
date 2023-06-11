import { Component, Input } from '@angular/core';
import { Funcionario } from '@app/models/funcionario.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.less']
})
export class FuncionarioConfirmationDialogComponent {

  @Input() funcionario: Funcionario = new Funcionario();

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  confirm(): void {
    this.ref.close(true);
  }

  cancel(): void {
    this.ref.close(false);
  }

}
