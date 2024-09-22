import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'drill-sheet/:drillId',
    loadComponent: () =>
      import('./drill-sheet/drill-sheet.page').then((m) => m.DrillSheetPage),
  },
  {
    path: 'drill-sheet',
    loadComponent: () =>
      import('./drill-sheet/drill-sheet.page').then((m) => m.DrillSheetPage),
  },
  {
    path: 'drills/:characterId',
    loadComponent: () => import('./drill/drill.page').then((m) => m.DrillPage),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./character/character.page').then((m) => m.CharacterPage),
  },
  {
    path: 'combo-chart',
    loadComponent: () =>
      import('./combo-chart/combo-chart.page').then((m) => m.ComboChartPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
