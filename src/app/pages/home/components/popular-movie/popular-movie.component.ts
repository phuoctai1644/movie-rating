import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MovieShort, MovieState, selectPopularMovies } from '../../../../core/stores';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-movie',
  standalone: true,
  imports: [MovieCardComponent, NgFor, AsyncPipe, NgIf],
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss', '../movie-overall/movie-overall.component.scss']
})
export class PopularMovieComponent implements OnInit {
  movies$!: Observable<MovieShort[]>;

  constructor(
    private store: Store<MovieState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectPopularMovies);
  }

  onLoadMore() {
    this.router.navigateByUrl('/popular');
  }
}
