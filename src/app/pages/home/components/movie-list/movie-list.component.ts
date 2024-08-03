import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MovieListBase, MovieListType } from '../movie-list-base';
import { TopRatedMovieComponent } from '../top-rated-movie/top-rated-movie.component';
import { PopularMovieComponent } from '../popular-movie/popular-movie.component';
import { UpComingMovieComponent } from '../up-coming-movie/up-coming-movie.component';
import { MovieShort, PopularActions, selectPopularMovies, selectTopRatedMovies, selectUpComingMovies, TopRatedActions, UpComingActions } from '../../../../core/stores';
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
  action!: any;

  constructor(private route: ActivatedRoute) {
    super();
    this.type = this.route.snapshot.queryParams?.['type'] ?? MovieListType.TOP_RATED;
    this.movies$ = this.getMoviesBasedOnType();
    this.action = this.getAction();
  }

  getMoviesBasedOnType() {
    const movieSelectors = {
      [MovieListType.TOP_RATED]: selectTopRatedMovies,
      [MovieListType.POPULAR]: selectPopularMovies,
      [MovieListType.UP_COMING]: selectUpComingMovies
    };

    return this.store.select(movieSelectors[this.type]);
  }

  getAction() {
    const movieActions = {
      [MovieListType.TOP_RATED]: TopRatedActions.get,
      [MovieListType.POPULAR]: PopularActions.get,
      [MovieListType.UP_COMING]: UpComingActions.get
    };
    return movieActions[this.type];
  }

  override onViewMore(): void {
    this.page++;
    this.store.dispatch(this.action({ page: this.page }));
  }
}
