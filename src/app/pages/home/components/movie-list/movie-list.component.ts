/** Core */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

/** Component */
import { MovieListBase, MovieListType } from '../movie-list-base';
import { TopRatedMovieComponent } from '../top-rated-movie/top-rated-movie.component';
import { PopularMovieComponent } from '../popular-movie/popular-movie.component';
import { UpComingMovieComponent } from '../up-coming-movie/up-coming-movie.component';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';

/** Ngrx Store */
import { PopularActions, TopRatedActions, UpComingActions } from '../../../../core/stores';

/** Imports */
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
  action!: any;

  constructor(private route: ActivatedRoute) {
    super();
    this.type = this.route.snapshot.queryParams?.['type'] ?? MovieListType.TOP_RATED;
  }
  
  override init() {
    this.movies$ = this.getMoviesBasedOnType();
    this.action = this.getAction();
  }

  getMoviesBasedOnType() {
    const homeStoreSelectors = this.homeStore.selectors;
    const movieSelectors = {
      [MovieListType.TOP_RATED]: homeStoreSelectors.topRatedMovies$,
      [MovieListType.POPULAR]: homeStoreSelectors.popularMovies$,
      [MovieListType.UP_COMING]: homeStoreSelectors.upComingMovies$
    };

    return movieSelectors[this.type];
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
