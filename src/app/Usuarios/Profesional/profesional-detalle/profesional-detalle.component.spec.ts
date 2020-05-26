import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalDetalleComponent } from './profesional-detalle.component';

describe('ProfesionalDetalleComponent', () => {
  let component: ProfesionalDetalleComponent;
  let fixture: ComponentFixture<ProfesionalDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
