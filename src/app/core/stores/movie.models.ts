export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface MovieState {
  genres: Genre[];
  selectedGenres?: Genre[];
}

export const allGenre: Genre = {
  id: 0,
  name: 'All'
}
