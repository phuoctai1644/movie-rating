import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { MovieListBase, MovieListType } from '../movie-list-base';

@Component({
  selector: 'app-popular-movie',
  standalone: true,
  imports: [MovieCardComponent, NgFor, AsyncPipe, NgIf],
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss', '../movie-overall/movie-overall.component.scss']
})
export class PopularMovieComponent extends MovieListBase implements OnInit {
  constructor() {
    super(MovieListType.POPULAR);
  }

  override init(): void {
    this.movies$ = this.homeStore.selectors.popularMovies$;
  }
}
