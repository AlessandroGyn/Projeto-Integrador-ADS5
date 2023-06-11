import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoconfirmationDialogComponent } from './servicoconfirmation-dialog.component';

describe('ServicoconfirmationDialogComponent', () => {
  let component: ServicoconfirmationDialogComponent;
  let fixture: ComponentFixture<ServicoconfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoconfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoconfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
