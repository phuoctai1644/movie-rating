import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieShort, MovieState, selectUpComingMovies } from '../../../../core/stores';
import { AsyncPipe, NgFor } from '@angular/common';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-up-coming-movie',
  standalone: true,
  imports: [NgFor, AsyncPipe, MovieCardComponent],
  templateUrl: './up-coming-movie.component.html',
  styleUrls: ['./up-coming-movie.component.scss', '../../home.component.scss'] 
})
export class UpComingMovieComponent {
  movies$!: Observable<MovieShort[]>;

  constructor(private store: Store<MovieState>) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectUpComingMovies);  
  }
}
