import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { MovieService } from "../services/movie.service";
import { GenreActions, PopularActions, TopRatedActions, UpComingActions } from "./movie.actions";

export const getGenres$ = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(GenreActions.get),
      exhaustMap(() =>
        movieService.getGenres().pipe(
          map((response) => GenreActions.getSuccess({ genres: response.genres })),
          catchError((error: { message: string }) =>
            of(GenreActions.getFailed({ error: error?.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getTopRatedMovies$ = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(TopRatedActions.get),
      exhaustMap(props => 
        movieService.getTopRatedMovies(props.page).pipe(
          map(res => TopRatedActions.getSuccess({ movies: res.results })),
          catchError((error: { message: string }) => 
            of(TopRatedActions.getFailed({ error: error?.message }))
          )
        )
      )
    )
  },
  { functional: true }
);

export const getPopularMovies$ = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(PopularActions.get),
      exhaustMap(props => 
        movieService.getPopularMovies(props.page).pipe(
          map(res => PopularActions.getSuccess({ movies: res.results })),
          catchError((error: { message: string }) => 
            of(PopularActions.getFailed({ error: error?.message }))
          )
        )
      )
    )
  },
  { functional: true }
);

export const getUpComingMovies$ = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(UpComingActions.get),
      exhaustMap(props => 
        movieService.getUpComingMovies(props.page).pipe(
          map(res => UpComingActions.getSuccess({ movies: res.results })),
          catchError((error: { message: string }) => 
            of(UpComingActions.getFailed({ error: error?.message }))
          )
        )
      )
    )
  },
  { functional: true }
);
