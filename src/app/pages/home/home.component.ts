import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenreActions, MovieState, TopRatedActions } from '../../core/stores';
import { HeaderComponent } from '../../core/components/header/header.component';
import { TopRatedMovieComponent } from './components/top-rated-movie/top-rated-movie.component';
import { PopularMovieComponent } from './components/popular-movie/popular-movie.component';

const COMPONENTS = [
  HeaderComponent,
  TopRatedMovieComponent,
  PopularMovieComponent
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private store: Store<MovieState>) {
    this.store.dispatch(GenreActions.get());
    this.store.dispatch(TopRatedActions.get({ page: 1 }));
  }
}
