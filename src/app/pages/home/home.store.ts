import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { 
  Genre, MovieShort, MovieState, selectPopularMovies, selectSelectedGenres, selectTopRatedMovies,
  selectUpComingMovies
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
    this.effects.getTopRatedMovies(store.select(selectTopRatedMovies));
    this.effects.getPopularMovies(store.select(selectPopularMovies));
    this.effects.getUpComingMovies(store.select(selectUpComingMovies));
    this.effects.changeSelectedGenres(store.select(selectSelectedGenres));
  }

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
    changeSelectedGenres: this.effect((genre$: Observable<Genre[]>) => {
      return genre$.pipe(tap(genres => {
        const genreIds = genres.map(genre => genre.id);
        const updatedMovies = (movies: MovieShort[]) =>
          movies.filter(movie => movie.genre_ids.some(id => genreIds.includes(id)));

        this.actions.setTopRatedMovies(updatedMovies(this.getter.topRatedMovies()));
        this.actions.setPopularMovies(updatedMovies(this.getter.popularMovies()));
        this.actions.setUpComingMovies(updatedMovies(this.getter.upComingMovies()));
      }))
    })
  }
}