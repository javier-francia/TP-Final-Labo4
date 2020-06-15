import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalHistorialComponent } from './profesional-historial.component';

describe('ProfesionalHistorialComponent', () => {
  let component: ProfesionalHistorialComponent;
  let fixture: ComponentFixture<ProfesionalHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
