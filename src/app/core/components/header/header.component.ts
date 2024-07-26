import { AsyncPipe, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Genre } from '../../models';
import { GenreComponent } from '../genre/genre.component';
import { allGenre, GenreActions, MovieState, selectGenres, selectSelectedGenres } from '../../stores';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, GenreComponent, AsyncPipe, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  genres$!: Observable<Genre[]>;
  selectedGenres!: Genre[];
  allGenre = allGenre;
  
  constructor(private store: Store<MovieState>) {
    this.genres$ = store.select(selectGenres);
    this.store.select(selectSelectedGenres)
      .subscribe(value => {
        this.selectedGenres = value ?? [];
      })
  }

  onSelectGenre(genre?: Genre) {
    this.store.dispatch(GenreActions.select({ genre }));
  }

  isActiveGenre(genre: Genre) {
    return !!this.selectedGenres.find(el => el.id === genre.id);
  }
}
