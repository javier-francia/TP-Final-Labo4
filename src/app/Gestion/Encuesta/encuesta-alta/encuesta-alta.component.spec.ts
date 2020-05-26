import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaAltaComponent } from './encuesta-alta.component';

describe('EncuestaAltaComponent', () => {
  let component: EncuestaAltaComponent;
  let fixture: ComponentFixture<EncuestaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
