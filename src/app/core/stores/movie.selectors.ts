import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "./movie.models";

export const movieFeatureKey = 'movie';

const selectFeature = createFeatureSelector<MovieState>(movieFeatureKey);

export const selectGenres = createSelector(
  selectFeature,
  (state: MovieState) => state?.genres
);

export const selectSelectedGenres = createSelector(
  selectFeature,
  (state: MovieState) => state?.selectedGenres
);
