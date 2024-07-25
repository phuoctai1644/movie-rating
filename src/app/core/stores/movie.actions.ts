import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Genre } from "./movie.models";

export const GenreActions = createActionGroup({
  source: 'Movie Genre',
  events: {
    'get': emptyProps(),
    'getSuccess': props<{ genres: Genre[] }>(),
    'getError': props<{ error: string }>()
  }
});
