import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-top-rated-movie',
  standalone: true,
  imports: [],
  templateUrl: './top-rated-movie.component.html',
  styleUrls: ['./top-rated-movie.component.scss', '../../home.component.scss']
})
export class TopRatedMovieComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Glide('.glide.cards-slide', {
        perView: 1,
      }).mount();
    }
  }
}
