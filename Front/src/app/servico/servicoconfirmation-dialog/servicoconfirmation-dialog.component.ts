import { Component, Input } from '@angular/core';
import { Servico } from '@app/models/servico.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-servicoconfirmation-dialog',
  templateUrl: './servicoconfirmation-dialog.component.html',
  styleUrls: ['./servicoconfirmation-dialog.component.less']
})
export class ServicoConfirmationDialogComponent {

  @Input() servico: Servico = new Servico();

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  confirm(): void {
    this.ref.close(true);
  }

  cancel(): void {
    this.ref.close(false);
  }

}
