import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionDosBComponent } from './opcion-dos-b.component';

describe('OpcionDosBComponent', () => {
  let component: OpcionDosBComponent;
  let fixture: ComponentFixture<OpcionDosBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionDosBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionDosBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
