import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAdministradoresComponent } from './gestion-administradores.component';

describe('GestionAdministradoresComponent', () => {
  let component: GestionAdministradoresComponent;
  let fixture: ComponentFixture<GestionAdministradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAdministradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
