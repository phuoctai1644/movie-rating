import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreResponse, List2Res, MovieSort } from '../stores/movie.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get<GenreResponse>(`${environment.apiUrl}/genre/movie/list`);
  }

  getTopRatedMovies(page: number) {
    return this.http.get<List2Res<MovieSort>>(`${environment.apiUrl}/movie/top_rated?page=${page}`);
  }
}
