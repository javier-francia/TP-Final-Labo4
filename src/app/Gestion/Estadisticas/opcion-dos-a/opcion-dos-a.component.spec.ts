import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionDosAComponent } from './opcion-dos-a.component';

describe('OpcionDosAComponent', () => {
  let component: OpcionDosAComponent;
  let fixture: ComponentFixture<OpcionDosAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionDosAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionDosAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
