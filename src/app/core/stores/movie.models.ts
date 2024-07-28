/** Movie store */
export interface MovieState {
  genres: Genre[];
  selectedGenres?: Genre[];
  topRatedMovies: MovieShort[];
  popularMovies: MovieShort[];
  upComingMovies: MovieShort[];
}

/** Genre model */
export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

/** Movie model */
export interface MovieShort {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number
}

export interface List2Res<T> {
  page: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
  dates?: DateRange;
}

export interface DateRange {
  maximum: string;
  minimum: string;
}

export const allGenre: Genre = {
  id: 0,
  name: 'All'
}
