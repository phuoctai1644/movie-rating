import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreResponse, MovieShort } from '../stores/movie.models';
import { environment } from '../../../environments/environment';
import { List2Res } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get<GenreResponse>(`${environment.apiUrl}/genre/movie/list`);
  }

  getTopRatedMovies(page: number) {
    return this.http.get<List2Res<MovieShort>>(`${environment.apiUrl}/movie/top_rated?page=${page}`);
  }

  getPopularMovies(page: number) {
    return this.http.get<List2Res<MovieShort>>(`${environment.apiUrl}/movie/popular?page=${page}`);
  }

  getUpComingMovies(page: number) {
    return this.http.get<List2Res<MovieShort>>(`${environment.apiUrl}/movie/upcoming?page=${page}`);
  }
}
