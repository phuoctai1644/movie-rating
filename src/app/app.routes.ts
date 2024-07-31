import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MovieListComponent } from './pages/home/components/movie-list/movie-list.component';
import { MovieOverallComponent } from './pages/home/components/movie-overall/movie-overall.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'top-rated',
        component: MovieListComponent
      },
      { 
        path: 'popular',
        component: MovieListComponent
      },
      {
        path: 'up-coming',
        component: MovieListComponent
      },
      {
        path: '',
        component: MovieOverallComponent
      }
    ]
  },
  {
    path: 'movie/:id',
    component: DetailComponent
  }
];
