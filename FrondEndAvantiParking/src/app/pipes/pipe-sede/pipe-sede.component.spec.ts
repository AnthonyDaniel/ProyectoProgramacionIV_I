import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeSedeComponent } from './pipe-sede.component';

describe('PipeSedeComponent', () => {
  let component: PipeSedeComponent;
  let fixture: ComponentFixture<PipeSedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeSedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
