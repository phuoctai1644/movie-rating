import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { 
  Genre, MovieShort, MovieState, MovieUtils, selectKeyword, selectPopularMovies, selectSelectedGenres, selectTopRatedMovies,
  selectUpComingMovies
} from '../../core/stores';

interface State {
  topRatedMovies: MovieShort[];
  popularMovies: MovieShort[];
  upComingMovies: MovieShort[];
  keyword: string;
  selectedGenres: Genre[];
}

const initialState: State = {
  topRatedMovies: [],
  popularMovies: [],
  upComingMovies: [],
  keyword: '',
  selectedGenres: [],
}

@Injectable()
export class HomeStore extends ComponentStore<State> {
  constructor(private store: Store<MovieState>) {
    super(initialState);
    this.effects.getTopRatedMovies(this.selectTopRatedMovies$);
    this.effects.getPopularMovies(this.selectPopularMovies$);
    this.effects.getUpComingMovies(this.selectUpComingMovies$);
    this.effects.changeSelectedGenres(this.selectSelectedGenres$);
    this.effects.searchMovies(this.selectKeyword$);
  }

  // Ngrx store > Movie selectors
  readonly selectTopRatedMovies$ = this.store.select(selectTopRatedMovies);
  readonly selectPopularMovies$ = this.store.select(selectPopularMovies);
  readonly selectUpComingMovies$ = this.store.select(selectUpComingMovies);
  readonly selectSelectedGenres$ = this.store.select(selectSelectedGenres);
  readonly selectKeyword$ = this.store.select(selectKeyword);

  readonly getter = {
    topRatedMovies: () => this.get().topRatedMovies,
    popularMovies: () => this.get().popularMovies,
    upComingMovies: () => this.get().upComingMovies,
    keyword: () => this.get().keyword,
    selectedGenres: () => this.get().selectedGenres,
  }

  readonly selectors = {
    topRatedMovies$: this.select(state => state.topRatedMovies),
    popularMovies$: this.select(state => state.popularMovies),
    upComingMovies$: this.select(state => state.upComingMovies),
  }

  readonly actions = {
    setTopRatedMovies: (movies: MovieShort[]) => {
      this.patchState(() => ({ topRatedMovies: movies }))
    },
    setPopularMovies: (movies: MovieShort[]) => {
      this.patchState(() => ({ popularMovies: movies }))
    },
    setUpComingMovies: (movies: MovieShort[]) => {
      this.patchState(() => ({ upComingMovies: movies }))
    },
    setKeyword: (keyword: string) => {
      this.patchState(() => ({ keyword }))
    },
    setSelectedGenres: (genres: Genre[]) => {
      this.patchState(() => ({ selectedGenres: genres }))
    },
  }

  readonly effects = {
    getTopRatedMovies: this.effect((movies$: Observable<MovieShort[]>) => {
      return movies$.pipe(tap((movies: MovieShort[]) => {
        this.actions.setTopRatedMovies(movies);
      }));
    }),
    getPopularMovies: this.effect((movies$: Observable<MovieShort[]>) => {
      return movies$.pipe(tap((movies: MovieShort[]) => {
        this.actions.setPopularMovies(movies);
      }));
    }),
    getUpComingMovies: this.effect((movies$: Observable<MovieShort[]>) => {
      return movies$.pipe(tap((movies: MovieShort[]) => {
        this.actions.setUpComingMovies(movies);
      }));
    }),
    changeSelectedGenres: this.effect((genres$: Observable<Genre[]>) => {
      return genres$.pipe(
        withLatestFrom(
          this.selectTopRatedMovies$,
          this.selectPopularMovies$,
          this.selectUpComingMovies$
        ),
        tap(([genres, topRated, popular, upComing]) => {
          const genreIds = genres.map((genre) => genre.id);
          const currentKeyword = this.getter.keyword();

          this.updateMovies(topRated, popular, upComing, genreIds, currentKeyword);
          this.actions.setSelectedGenres(genres);
        })
      )
    }),
    searchMovies: this.effect((keyword$: Observable<string>) => {
      return keyword$.pipe(
        withLatestFrom(
          this.selectTopRatedMovies$,
          this.selectPopularMovies$,
          this.selectUpComingMovies$
        ),
        tap(([keyword, topRated, popular, upComing]) => {
          const selectedGenres  = this.getter.selectedGenres();
          const genreIds = selectedGenres.map((genre) => genre.id);

          this.updateMovies(topRated, popular, upComing, genreIds, keyword);
          this.actions.setKeyword(keyword);
        })
      )
    })
  }

  // Utils
  private updateMovies(
    topRated: MovieShort[],
    popular: MovieShort[],
    upComing: MovieShort[],
    genreIds: number[],
    keyword: string
  ) {
    if (genreIds.length || keyword) {
      topRated = this.getter.topRatedMovies();
      popular = this.getter.popularMovies();
      upComing = this.getter.upComingMovies();
    }
  
    const filterMovies = (movies: MovieShort[]) => {
      let filteredMovies = movies;
      if (genreIds.length) {
        filteredMovies = MovieUtils.filterByGenreIds(filteredMovies, genreIds);
      }
      return MovieUtils.filterByKeyword(filteredMovies, keyword);
    };
  
    this.actions.setTopRatedMovies(filterMovies(topRated));
    this.actions.setPopularMovies(filterMovies(popular));
    this.actions.setUpComingMovies(filterMovies(upComing));
  }
}