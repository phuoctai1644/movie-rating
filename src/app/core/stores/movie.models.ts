export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface MovieState {
  genres?: Genre[]
}
