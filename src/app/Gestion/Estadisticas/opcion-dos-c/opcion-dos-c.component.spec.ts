import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionDosCComponent } from './opcion-dos-c.component';

describe('OpcionDosCComponent', () => {
  let component: OpcionDosCComponent;
  let fixture: ComponentFixture<OpcionDosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionDosCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionDosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
