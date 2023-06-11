import { Component, Input } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.less']
})
export class ConfirmationDialogComponent {

  @Input() cliente: Cliente = new Cliente();

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  confirm(): void {
    this.ref.close(true);
  }

  cancel(): void {
    this.ref.close(false);
  }

}
