import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAltaComponent } from './informe-alta.component';

describe('InformeAltaComponent', () => {
  let component: InformeAltaComponent;
  let fixture: ComponentFixture<InformeAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
