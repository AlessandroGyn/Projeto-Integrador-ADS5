import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoEdicaoComponent } from './agendamento-edicao.component';

describe('AgendamentoEdicaoComponent', () => {
  let component: AgendamentoEdicaoComponent;
  let fixture: ComponentFixture<AgendamentoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendamentoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
