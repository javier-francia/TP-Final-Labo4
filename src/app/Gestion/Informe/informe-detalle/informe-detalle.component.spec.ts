import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDetalleComponent } from './informe-detalle.component';

describe('InformeDetalleComponent', () => {
  let component: InformeDetalleComponent;
  let fixture: ComponentFixture<InformeDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
