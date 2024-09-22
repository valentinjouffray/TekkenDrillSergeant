import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrillPage } from './drill.page';

describe('DrillPage', () => {
  let component: DrillPage;
  let fixture: ComponentFixture<DrillPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
