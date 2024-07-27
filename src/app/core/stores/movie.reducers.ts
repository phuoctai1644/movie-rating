import { createReducer, on } from "@ngrx/store";
import { MovieState } from "./movie.models";
import { GenreActions, TopRatedActions } from "./movie.actions";

export const movieState: MovieState = {
  genres: [],
  selectedGenres: [],
  topRatedMovies: []
}

export const movieReducers = createReducer(
  movieState,
  on(GenreActions.getSuccess, (state, { genres }) => ({ ...state, genres })),
  on(GenreActions.getFailed, (state) => ({ ...state, genres: [] })),
  on(GenreActions.select, (state, { genre }) => {
    if (!genre) {
      return { ...state, selectedGenres: [] }
    }

    const _selectedGenres = [...state.selectedGenres ?? []];
    const genreIdx = _selectedGenres.findIndex(el => el.id === genre.id);

    if (genreIdx !== -1) {
      _selectedGenres.splice(genreIdx, 1);
    } else {
      _selectedGenres.push(genre);
    }

    return { ...state, selectedGenres: _selectedGenres };
  }),
  on(TopRatedActions.getSuccess, (state, { movies }) => ({ ...state, topRatedMovies: movies })),
  on(TopRatedActions.getFailed, (state, { error }) => ({ ...state, topRatedMovies: [] }))
);
