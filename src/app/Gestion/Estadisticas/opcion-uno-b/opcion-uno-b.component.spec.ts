import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionUnoBComponent } from './opcion-uno-b.component';

describe('OpcionUnoBComponent', () => {
  let component: OpcionUnoBComponent;
  let fixture: ComponentFixture<OpcionUnoBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionUnoBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionUnoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
