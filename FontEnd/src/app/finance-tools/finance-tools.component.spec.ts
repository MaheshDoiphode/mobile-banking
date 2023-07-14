import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceToolsComponent } from './finance-tools.component';

describe('FinanceToolsComponent', () => {
  let component: FinanceToolsComponent;
  let fixture: ComponentFixture<FinanceToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceToolsComponent]
    });
    fixture = TestBed.createComponent(FinanceToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
