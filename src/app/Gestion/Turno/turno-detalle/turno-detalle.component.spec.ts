import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoDetalleComponent } from './turno-detalle.component';

describe('TurnoDetalleComponent', () => {
  let component: TurnoDetalleComponent;
  let fixture: ComponentFixture<TurnoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
