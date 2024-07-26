import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenreActions, MovieState } from '../../core/stores';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private store: Store<MovieState>) {
    this.store.dispatch(GenreActions.get());
  }
}
