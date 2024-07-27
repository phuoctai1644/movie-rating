import { AsyncPipe, NgFor, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Genre } from '../../models';
import { GenreComponent } from '../../../shared/components/genre/genre.component';
import { allGenre, GenreActions, MovieState, selectGenres, selectSelectedGenres } from '../../stores';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, GenreComponent, AsyncPipe, SlicePipe, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  selectedGenres!: Genre[];
  allGenre = allGenre;
  genres$!: Observable<Genre[]>;
  keywordCtrl = new FormControl;
  
  constructor(private store: Store<MovieState>) { }

  ngOnInit(): void {
    this.genres$ = this.store.select(selectGenres);
    this.registerEvents();
  }

  onSelectGenre(genre?: Genre) {
    this.store.dispatch(GenreActions.select({ genre }));
  }

  isActiveGenre(genre: Genre) {
    return !!this.selectedGenres.find(el => el.id === genre.id);
  }

  registerEvents() {
    this.store.select(selectSelectedGenres)
      .subscribe(value => {
        this.selectedGenres = value ?? [];
      });
    
    this.keywordCtrl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        // Dispatch action for searching movie...
      })
  }
}
