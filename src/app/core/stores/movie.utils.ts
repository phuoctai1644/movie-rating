import { MovieShort } from "./movie.models";

export class MovieUtils {
  static filterByKeyword(movies: MovieShort[], keyword: string) {
    return movies.filter(mv => 
      mv.title.toLowerCase().includes(keyword) ||
      mv.original_title.toLowerCase().includes(keyword)
    );
  }
  static filterByGenreIds(movies: MovieShort[], genreIds: number[]) {
    return movies.filter(movie => movie.genre_ids.some(id => genreIds.includes(id)));
  }
}
