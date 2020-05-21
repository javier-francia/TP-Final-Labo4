import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalListadoComponent } from './profesional-listado.component';

describe('ProfesionalListadoComponent', () => {
  let component: ProfesionalListadoComponent;
  let fixture: ComponentFixture<ProfesionalListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
