import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionUnoAComponent } from './opcion-uno-a.component';

describe('OpcionUnoAComponent', () => {
  let component: OpcionUnoAComponent;
  let fixture: ComponentFixture<OpcionUnoAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionUnoAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionUnoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
