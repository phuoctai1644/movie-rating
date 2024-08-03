import { Component } from '@angular/core';
import { MovieListBase, MovieListType } from '../movie-list-base';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { TopRatedMovieComponent } from '../top-rated-movie/top-rated-movie.component';
import { PopularMovieComponent } from '../popular-movie/popular-movie.component';
import { UpComingMovieComponent } from '../up-coming-movie/up-coming-movie.component';
import { MovieShort, selectPopularMovies, selectTopRatedMovies, selectUpComingMovies } from '../../../../core/stores';
import { Observable } from 'rxjs';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';

const COMMONS = [NgSwitch, NgSwitchCase, NgIf, NgFor];
const PIPES = [AsyncPipe];
const COMPONENTS = [TopRatedMovieComponent, PopularMovieComponent, UpComingMovieComponent, MovieCardComponent];

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [...COMMONS, ...PIPES, ...COMPONENTS],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss', '../movie-overall/movie-overall.component.scss']
})
export class MovieListComponent extends MovieListBase {
  movies$!: Observable<MovieShort[]>;

  constructor(private route: ActivatedRoute) {
    super();
    this.type = this.route.snapshot.queryParams?.['type'] ?? MovieListType.TOP_RATED;
    this.movies$ = this.getMoviesBasedOnType();
  }

  getMoviesBasedOnType() {
    const movieSelectors = {
      [MovieListType.TOP_RATED]: selectTopRatedMovies,
      [MovieListType.POPULAR]: selectPopularMovies,
      [MovieListType.UP_COMING]: selectUpComingMovies
    };

    return this.store.select(movieSelectors[this.type]);
  }
}
