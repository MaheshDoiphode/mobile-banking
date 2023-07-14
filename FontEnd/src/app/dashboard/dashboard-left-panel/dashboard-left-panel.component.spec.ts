import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeftPanelComponent } from './dashboard-left-panel.component';

describe('DashboardLeftPanelComponent', () => {
  let component: DashboardLeftPanelComponent;
  let fixture: ComponentFixture<DashboardLeftPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLeftPanelComponent]
    });
    fixture = TestBed.createComponent(DashboardLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
