import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrillSheetPage } from './drill-sheet.page';

describe('DrillSheetPage', () => {
  let component: DrillSheetPage;
  let fixture: ComponentFixture<DrillSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
