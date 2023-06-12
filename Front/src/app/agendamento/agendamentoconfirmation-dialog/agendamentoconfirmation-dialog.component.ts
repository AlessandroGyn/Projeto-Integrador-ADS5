import { Component, Input } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-agendamentoconfirmation-dialog',
  templateUrl: './agendamentoconfirmation-dialog.component.html',
  styleUrls: ['./agendamentoconfirmation-dialog.component.less']
})
export class AgendamentoConfirmationDialogComponent {

  @Input() agendamento: Agendamento = new Agendamento();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.agendamento = this.config.data.agendamento; // Obtenha o agendamento passado pelo componente principal
  }

  confirm(): void {
    this.ref.close(true);
  }

  cancel(): void {
    this.ref.close(false);
  }

}
