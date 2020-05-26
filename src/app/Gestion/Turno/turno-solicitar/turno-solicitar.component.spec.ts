import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoSolicitarComponent } from './turno-solicitar.component';

describe('TurnoSolicitarComponent', () => {
  let component: TurnoSolicitarComponent;
  let fixture: ComponentFixture<TurnoSolicitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoSolicitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoSolicitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
