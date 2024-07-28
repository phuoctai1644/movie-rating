import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MovieShort, MovieState, selectPopularMovies } from '../../../../core/stores';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-popular-movie',
  standalone: true,
  imports: [MovieCardComponent, NgFor, AsyncPipe],
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss', '../../home.component.scss']
})
export class PopularMovieComponent implements OnInit {
  movies$!: Observable<MovieShort[]>;

  constructor(private store: Store<MovieState>) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectPopularMovies);  
  }
}
