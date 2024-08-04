import { Directive, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Genre, MovieShort, MovieState, selectSelectedGenres } from "../../../core/stores";
import { Observable } from "rxjs";
import { HomeStore } from "../home.store";

export enum MovieListType {
  POPULAR = 'popular',
  TOP_RATED = 'top-rated',
  UP_COMING = 'up-coming',
}

@Directive()
export class MovieListBase implements OnInit {
  router = inject(Router);
  store = inject(Store<MovieState>);
  homeStore = inject(HomeStore);

  type!: MovieListType;
  listType = MovieListType;
  page: number = 1;
  movies$!: Observable<MovieShort[]>;
  selectedGenres$!: Observable<Genre[]>;

  constructor(type?: MovieListType) {
    this.type = type as MovieListType;
  }

  ngOnInit(): void {
    this.selectedGenres$ = this.store.select(selectSelectedGenres);
    this.init();
  }

  init() { }
  
  onViewMore() {
    this.router.navigateByUrl(`/movie-list?type=${this.type}`);
  }
}
