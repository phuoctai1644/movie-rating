import { createReducer, on } from "@ngrx/store";
import { MovieState } from "./movie.models";
import { GenreActions } from "./movie.actions";

export const movieState: MovieState = {
  genres: []
}

export const movieReducers = createReducer(
  movieState,
  on(GenreActions.getSuccess, (state, { genres }) => ({ ...state, genres }))
);
