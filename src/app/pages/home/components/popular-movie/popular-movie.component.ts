import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MovieShort, selectPopularMovies } from '../../../../core/stores';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { MovieListBase, MovieListType } from '../movie-list-base';

@Component({
  selector: 'app-popular-movie',
  standalone: true,
  imports: [MovieCardComponent, NgFor, AsyncPipe, NgIf],
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss', '../movie-overall/movie-overall.component.scss']
})
export class PopularMovieComponent extends MovieListBase implements OnInit {
  movies$!: Observable<MovieShort[]>;

  constructor() {
    super(MovieListType.POPULAR);
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectPopularMovies);
  }
}
