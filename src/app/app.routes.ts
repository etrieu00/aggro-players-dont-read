import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'puzzle',
    loadComponent: () => import('./pages/puzzle.page').then(c => c.PuzzlePage)
  },
  {
    path: '**',
    redirectTo: 'puzzle'
  }
];
