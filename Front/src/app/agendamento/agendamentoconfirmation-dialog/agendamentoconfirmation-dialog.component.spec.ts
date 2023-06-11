import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoconfirmationDialogComponent } from './agendamentoconfirmation-dialog.component';

describe('AgendamentoconfirmationDialogComponent', () => {
  let component: AgendamentoconfirmationDialogComponent;
  let fixture: ComponentFixture<AgendamentoconfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoconfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendamentoconfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
