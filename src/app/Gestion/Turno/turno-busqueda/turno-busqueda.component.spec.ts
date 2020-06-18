import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoBusquedaComponent } from './turno-busqueda.component';

describe('TurnoBusquedaComponent', () => {
  let component: TurnoBusquedaComponent;
  let fixture: ComponentFixture<TurnoBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
