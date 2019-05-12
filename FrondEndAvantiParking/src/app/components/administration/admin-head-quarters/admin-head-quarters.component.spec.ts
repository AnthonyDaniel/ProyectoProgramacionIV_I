import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeadQuartersComponent } from './admin-head-quarters.component';

describe('AdminHeadQuartersComponent', () => {
  let component: AdminHeadQuartersComponent;
  let fixture: ComponentFixture<AdminHeadQuartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHeadQuartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeadQuartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
