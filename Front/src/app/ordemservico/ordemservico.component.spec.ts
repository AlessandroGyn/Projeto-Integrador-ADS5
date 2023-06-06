import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemservicoComponent } from './ordemservico.component';

describe('OrdemservicoComponent', () => {
  let component: OrdemservicoComponent;
  let fixture: ComponentFixture<OrdemservicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdemservicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
