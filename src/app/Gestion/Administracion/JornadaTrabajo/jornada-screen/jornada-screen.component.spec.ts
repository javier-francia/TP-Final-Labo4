import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadaScreenComponent } from './jornada-screen.component';

describe('JornadaScreenComponent', () => {
  let component: JornadaScreenComponent;
  let fixture: ComponentFixture<JornadaScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadaScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
