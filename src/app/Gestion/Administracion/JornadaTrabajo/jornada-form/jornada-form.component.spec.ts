import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadaFormComponent } from './jornada-form.component';

describe('JornadaFormComponent', () => {
  let component: JornadaFormComponent;
  let fixture: ComponentFixture<JornadaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
