import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { MovieService } from "../services/movie.service";
import { GenreActions, TopRatedActions } from "./movie.actions";

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
