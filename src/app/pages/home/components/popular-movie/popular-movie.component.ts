import { Component } from '@angular/core';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-popular-movie',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss', '../../home.component.scss']
})
export class PopularMovieComponent {

}
