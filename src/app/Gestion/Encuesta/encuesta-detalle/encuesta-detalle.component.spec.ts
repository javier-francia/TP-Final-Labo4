import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaDetalleComponent } from './encuesta-detalle.component';

describe('EncuestaDetalleComponent', () => {
  let component: EncuestaDetalleComponent;
  let fixture: ComponentFixture<EncuestaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
