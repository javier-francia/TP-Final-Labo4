import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderPacienteComponent } from './atender-paciente.component';

describe('AtenderPacienteComponent', () => {
  let component: AtenderPacienteComponent;
  let fixture: ComponentFixture<AtenderPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
