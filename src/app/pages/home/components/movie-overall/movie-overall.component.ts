import { Component } from '@angular/core';
import { TopRatedMovieComponent } from '../top-rated-movie/top-rated-movie.component';
import { PopularMovieComponent } from '../popular-movie/popular-movie.component';
import { UpComingMovieComponent } from '../up-coming-movie/up-coming-movie.component';

const COMPONENTS = [
  TopRatedMovieComponent,
  PopularMovieComponent,
  UpComingMovieComponent,
]

@Component({
  selector: 'app-movie-overall',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './movie-overall.component.html',
  styleUrl: './movie-overall.component.scss'
})
export class MovieOverallComponent {

}
