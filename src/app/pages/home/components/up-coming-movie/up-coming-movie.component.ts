import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { MovieListBase, MovieListType } from '../movie-list-base';

@Component({
  selector: 'app-up-coming-movie',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, MovieCardComponent],
  templateUrl: './up-coming-movie.component.html',
  styleUrls: ['./up-coming-movie.component.scss', '../movie-overall/movie-overall.component.scss'] 
})
export class UpComingMovieComponent extends MovieListBase {
  constructor() {
    super(MovieListType.UP_COMING);
  }

  override init(): void {
    this.movies$ = this.homeStore.selectors.upComingMovies$;
  }
}
