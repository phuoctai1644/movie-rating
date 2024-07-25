import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreResponse } from '../stores/movie.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get<GenreResponse>(`${environment.apiUrl}/genre/movie/list`);
  }
}
