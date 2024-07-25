import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { MovieService } from "../services/movie.service";
import { GenreActions } from "./movie.actions";

export const genGenres$ = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(GenreActions.get),
      exhaustMap(() =>
        movieService.getGenres().pipe(
          map((response) => GenreActions.getSuccess({ genres: response.genres })),
          catchError((error: { message: string }) =>
            of(GenreActions.getError({ error: error?.message }))
          )
        )
      )
    );
  },
  { functional: true }
)
