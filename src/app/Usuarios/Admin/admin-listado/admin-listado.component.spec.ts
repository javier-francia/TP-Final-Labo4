import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListadoComponent } from './admin-listado.component';

describe('AdminListadoComponent', () => {
  let component: AdminListadoComponent;
  let fixture: ComponentFixture<AdminListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
