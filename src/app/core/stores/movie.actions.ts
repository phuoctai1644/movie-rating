import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Genre, MovieShort } from "./movie.models";

export const GenreActions = createActionGroup({
  source: 'Movie Genre',
  events: {
    'get': emptyProps(),
    'getSuccess': props<{ genres: Genre[] }>(),
    'getFailed': props<{ error: string }>(),
    'select': props<{ genre?: Genre }>(),
  }
});

export const TopRatedActions = createActionGroup({
  source: 'Top Rated Movie',
  events: {
    'get': props<{ page: number }>(),
    'getSuccess': props<{ movies: MovieShort[], isLoadMore: boolean }>(),
    'getFailed': props<{ error: string }>()
  }
});

export const PopularActions = createActionGroup({
  source: 'Popular Movie',
  events: {
    'get': props<{ page: number }>(),
    'getSuccess': props<{ movies: MovieShort[], isLoadMore: boolean }>(),
    'getFailed': props<{ error: string }>()
  }
});

export const UpComingActions = createActionGroup({
  source: 'Up Coming Movie',
  events: {
    'get': props<{ page: number }>(),
    'getSuccess': props<{ movies: MovieShort[], isLoadMore: boolean }>(),
    'getFailed': props<{ error: string }>()
  }
});

export const SearchMovieAction = createAction('[Movie] Search', props<{ keyword: string }>());
