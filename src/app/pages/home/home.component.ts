import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { GenreActions, MovieState, PopularActions, TopRatedActions, UpComingActions } from '../../core/stores';
import { HeaderComponent } from '../../core/components/header/header.component';
import { TopRatedMovieComponent } from './components/top-rated-movie/top-rated-movie.component';
import { PopularMovieComponent } from './components/popular-movie/popular-movie.component';
import { UpComingMovieComponent } from './components/up-coming-movie/up-coming-movie.component';
import { HomeStore } from './home.store';
import { provideComponentStore } from '@ngrx/component-store';

const COMPONENTS = [
  HeaderComponent,
  TopRatedMovieComponent,
  PopularMovieComponent,
  UpComingMovieComponent,
];

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideComponentStore(HomeStore)],
  imports: [...COMPONENTS, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private store: Store<MovieState>) {
    this.store.dispatch(GenreActions.get());
    this.store.dispatch(TopRatedActions.get({ page: 1 }));
    this.store.dispatch(PopularActions.get({ page: 1 }));
    this.store.dispatch(UpComingActions.get({ page: 1 }));
  }
}
