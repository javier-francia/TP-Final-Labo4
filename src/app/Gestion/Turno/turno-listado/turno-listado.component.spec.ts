import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoListadoComponent } from './turno-listado.component';

describe('TurnoListadoComponent', () => {
  let component: TurnoListadoComponent;
  let fixture: ComponentFixture<TurnoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
