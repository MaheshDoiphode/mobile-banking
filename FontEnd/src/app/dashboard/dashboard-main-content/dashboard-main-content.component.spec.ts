import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainContentComponent } from './dashboard-main-content.component';

describe('DashboardMainContentComponent', () => {
  let component: DashboardMainContentComponent;
  let fixture: ComponentFixture<DashboardMainContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMainContentComponent]
    });
    fixture = TestBed.createComponent(DashboardMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
