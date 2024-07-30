import { AsyncPipe, isPlatformBrowser, NgFor, NgIf, NgStyle, SlicePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import Glide from '@glidejs/glide';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MovieImagePipe } from '../../../../shared/pipes/movie-image.pipe';
import { MovieShort, MovieState, selectTopRatedMovies } from '../../../../core/stores';

const COMMONS = [NgFor, NgStyle, NgIf];
const PIPES = [AsyncPipe, SlicePipe, MovieImagePipe];

@Component({
  selector: 'app-top-rated-movie',
  standalone: true,
  imports: [...COMMONS, ...PIPES],
  templateUrl: './top-rated-movie.component.html',
  styleUrls: ['./top-rated-movie.component.scss', '../../home.component.scss']
})
export class TopRatedMovieComponent implements OnInit, AfterViewInit {
  movies$!: Observable<MovieShort[]>;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store<MovieState>
  ) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectTopRatedMovies);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Glide('.glide.cards-slide', {
        perView: 1,
        autoplay: 5000
      }).mount();
    }
  }

  onViewMore() { }
}
