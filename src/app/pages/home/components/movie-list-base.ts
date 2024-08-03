import { Directive, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MovieState } from "../../../core/stores";

export enum MovieListType {
  POPULAR = 'popular',
  TOP_RATED = 'top-rated',
  UP_COMING = 'up-coming',
}

@Directive()
export class MovieListBase {
  router = inject(Router);
  store = inject(Store<MovieState>);
  type!: MovieListType;
  listType = MovieListType;
  page: number = 1;

  constructor(type?: MovieListType) {
    if (type) {
      this.type = type;
    }
  }
  
  onViewMore() {
    this.router.navigateByUrl(`/movie-list?type=${this.type}`);
  }
}
