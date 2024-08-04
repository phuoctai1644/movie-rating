import { AsyncPipe, isPlatformBrowser, NgFor, NgIf, NgStyle, SlicePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import Glide from '@glidejs/glide';
import { MovieImagePipe } from '../../../../shared/pipes/movie-image.pipe';
import { MovieListBase, MovieListType } from '../movie-list-base';

const COMMONS = [NgFor, NgStyle, NgIf];
const PIPES = [AsyncPipe, SlicePipe, MovieImagePipe];

@Component({
  selector: 'app-top-rated-movie',
  standalone: true,
  imports: [...COMMONS, ...PIPES],
  templateUrl: './top-rated-movie.component.html',
  styleUrls: ['./top-rated-movie.component.scss', '../movie-overall/movie-overall.component.scss'],
})
export class TopRatedMovieComponent extends MovieListBase implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    super(MovieListType.TOP_RATED);
  }

  override init(): void {
    this.movies$ = this.homeStore.selectors.topRatedMovies$;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Glide('.glide.cards-slide', {
        perView: 1,
        autoplay: 5000
      }).mount();
    }
  }
}
