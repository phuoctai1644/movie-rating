import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Genre, MovieState, selectGenres } from '../../../core/stores';

@Pipe({
  name: 'genreShortLabel',
  standalone: true
})
export class GenreShortLabelPipe implements PipeTransform {
  genres!: Genre[];  
  constructor(private store: Store<MovieState>) {
    this.store.select(selectGenres).subscribe(value => {
      this.genres = value;
    })
  }
  
  transform(genresIds: number[]): string {
    const firstGenre = this.genres.find(el => el?.id === genresIds[0])?.name;
    if (!firstGenre) {
      return '';
    }

    const remaining = genresIds.length - 1;
    return firstGenre + (remaining ? `, +${remaining}` : '');
  }
}
