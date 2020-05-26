import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionProfesionalesComponent } from './admision-profesionales.component';

describe('AdmisionProfesionalesComponent', () => {
  let component: AdmisionProfesionalesComponent;
  let fixture: ComponentFixture<AdmisionProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmisionProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmisionProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
