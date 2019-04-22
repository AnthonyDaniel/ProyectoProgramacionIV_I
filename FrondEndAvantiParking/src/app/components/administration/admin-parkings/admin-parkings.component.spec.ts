import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParkingsComponent } from './admin-parkings.component';

describe('AdminParkingsComponent', () => {
  let component: AdminParkingsComponent;
  let fixture: ComponentFixture<AdminParkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminParkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
