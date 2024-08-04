import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { 
  Genre, MovieShort, MovieState, selectPopularMovies, selectSelectedGenres, selectTopRatedMovies, selectUpComingMovies
} from '../../core/stores';

interface State {
  topRatedMovies: MovieShort[];
  popularMovies: MovieShort[];
  upComingMovies: MovieShort[];
}

const initialState: State = {
  topRatedMovies: [],
  popularMovies: [],
  upComingMovies: [],
}

@Injectable()
export class HomeStore extends ComponentStore<State> {
  constructor(private store: Store<MovieState>) {
    super(initialState);
    this.effects.getTopRatedMovies(this.selectTopRatedMovies$);
    this.effects.getPopularMovies(this.selectPopularMovies$);
    this.effects.getUpComingMovies(this.selectUpComingMovies$);
    this.effects.changeSelectedGenres(this.selectSelectedGenres$);
  }

  // Ngrx store > Movie selectors
  readonly selectTopRatedMovies$ = this.store.select(selectTopRatedMovies);
  readonly selectPopularMovies$ = this.store.select(selectPopularMovies);
  readonly selectUpComingMovies$ = this.store.select(selectUpComingMovies);
  readonly selectSelectedGenres$ = this.store.select(selectSelectedGenres);

  readonly getter = {
    topRatedMovies: () => this.get().topRatedMovies,
    popularMovies: () => this.get().popularMovies,
    upComingMovies: () => this.get().upComingMovies
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
  }

  readonly loadPopularMovies = this.effect(() => 
    this.store.select(selectPopularMovies).pipe(
      tap((movies: MovieShort[]) => {
        this.patchState({ popularMovies: movies });
      })
    )
  );

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
          const genreIds = genres.map(genre => genre.id);
          const updatedMovies = (movies: MovieShort[]) =>
            movies.filter(movie => movie.genre_ids.some(id => genreIds.includes(id)));

          if (genreIds.length) {
            topRated = updatedMovies(topRated);
            popular = updatedMovies(popular);
            upComing = updatedMovies(upComing);
          }

          this.actions.setTopRatedMovies(topRated);
          this.actions.setPopularMovies(popular);
          this.actions.setUpComingMovies(upComing);
        })
      )
    }),
  }
}