import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTurnosComponent } from './paciente-turnos.component';

describe('PacienteTurnosComponent', () => {
  let component: PacienteTurnosComponent;
  let fixture: ComponentFixture<PacienteTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
