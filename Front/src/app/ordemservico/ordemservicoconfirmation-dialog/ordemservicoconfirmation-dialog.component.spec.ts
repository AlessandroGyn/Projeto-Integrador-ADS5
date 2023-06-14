import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemservicoconfirmationDialogComponent } from './ordemservicoconfirmation-dialog.component';

describe('OrdemservicoconfirmationDialogComponent', () => {
  let component: OrdemservicoconfirmationDialogComponent;
  let fixture: ComponentFixture<OrdemservicoconfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdemservicoconfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemservicoconfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
