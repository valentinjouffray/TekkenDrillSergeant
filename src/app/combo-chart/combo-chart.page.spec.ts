import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComboChartPage } from './combo-chart.page';

describe('ComboChartPage', () => {
  let component: ComboChartPage;
  let fixture: ComponentFixture<ComboChartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
